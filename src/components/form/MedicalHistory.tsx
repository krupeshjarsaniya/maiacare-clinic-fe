import React, { ChangeEvent, FormEvent, useState } from "react";
import { RadioButtonGroup } from "../ui/RadioField";
import { InputFieldGroup } from "../ui/InputField";
import { InputSelect, InputSelectMultiSelect } from "../ui/InputSelect";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "../ui/Button";
import { MdMailOutline } from "react-icons/md";
import Textarea from "../ui/Textarea";
import toast from "react-hot-toast";
import { BsInfoCircle } from "react-icons/bs";
import { MedicalHistoryType } from "../../utlis/types/interfaces";

interface MedicalHistoryProps {
  setMedicalHistoryFormData: React.Dispatch<
    React.SetStateAction<MedicalHistoryType>
  >;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: MedicalHistoryType | null;
  onClose?: () => void;
}

export default function MedicalHistory({
  setMedicalHistoryFormData,
  setShowModal,
  initialData,
  onClose,
}: MedicalHistoryProps) {
  type FormError = Partial<Record<keyof MedicalHistoryType, string>>;
  const initialFormData: MedicalHistoryType = {
    medication: initialData?.medication || "no",
    surgeries: initialData?.surgeries || "yes",
    surgeriesContent: initialData?.surgeriesContent || "",
    MedicalconditionAllergies: initialData?.MedicalconditionAllergies || [],
    familyMedicalHistory: initialData?.familyMedicalHistory || "",
    lifestyle: initialData?.lifestyle || [],
    stress: initialData?.stress || "high",
    exercise: initialData?.exercise || "rarely",
    medicationcontent: initialData?.medicationcontent || "",
  };

  const initialFormError: FormError = {};

  const [formData, setFormData] = useState<MedicalHistoryType>(initialFormData);
  const [formError, setFormError] = useState<FormError>(initialFormError);

  const validateForm = (data: MedicalHistoryType): FormError => {
    const errors: FormError = {};
    if (data.medication === "yes" && !data.medicationcontent.trim())
      errors.medicationcontent = "Medication Content is required";
    if (data.surgeries === "yes" && !data.surgeriesContent.trim())
      errors.surgeriesContent = "Surgeries Content is required";
    if (!data.surgeries.trim()) errors.surgeries = "Surgeries is required";

    if (!data.MedicalconditionAllergies?.length)
      errors.MedicalconditionAllergies = "Medical Condition is required";
    if (!data.lifestyle?.length) errors.lifestyle = "Lifestyle is required";

    if (!data.stress.trim()) errors.stress = "Stress Level is required";

    return errors;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate the formData and return any errors found
    const errors = validateForm(formData);
    setFormError(errors);
    // console.log("errors", errors);
    if (Object.keys(errors).length === 0) {
      setShowModal(false);
      setFormError(initialFormError);
      if (initialData) {
        // If editing, update the existing entry
        setMedicalHistoryFormData(formData);
        toast.success("Changes saved successfully", {
          icon: <BsInfoCircle size={22} color="white" />,
        });
      } else {
        // If creating new, add to the arrayd

        setMedicalHistoryFormData(formData);

        toast.success("Medical history added successfully", {
          icon: <BsInfoCircle size={22} color="white" />,
        });
      }
      if (onClose) onClose();
    }
  };

  return (
    <>
      <form>
        <Row className="g-md-2 g-1">
          <Col md={12}>
            <RadioButtonGroup
              label="Are you currently taking any medications?"
              name="medication"
              value={formData.medication || "yes"}
              onChange={(e) => handleChange(e)}
              required={true}
              error={formError.medication}
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />

            {formData.medication === "yes" && (
              <InputFieldGroup
                type="text"
                value={formData.medicationcontent}
                name="medicationcontent"
                onChange={handleChange}
                error={formError.medicationcontent}
                placeholder="Enter medication"
                className="mt-md-3 mt-2"
              ></InputFieldGroup>
            )}
          </Col>
          <Col md={12} className="mt-md-3 mt-2">
            <RadioButtonGroup
              label="Have you had any surgeries?"
              name="surgeries"
              value={formData.surgeries || "yes"}
              onChange={(e) => handleChange(e)}
              required={true}
              error={formError.surgeries}
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
            {formData.surgeries === "yes" && (
              <InputFieldGroup
                type="text"
                value={formData.surgeriesContent}
                name="surgeriesContent"
                onChange={handleChange}
                error={formError.surgeriesContent}
                placeholder="Enter surgeries"
                className="mt-md-3 mt-2"
              ></InputFieldGroup>
            )}
          </Col>
          <Col md={12} className="mt-md-3 mt-2">
            <InputSelectMultiSelect
              label="Do you have any medical condition?"
              name="medicalCondition"
              values={formData.MedicalconditionAllergies}
              onChange={(values) => {
                setFormData((prev) => ({
                  ...prev,
                  MedicalconditionAllergies: values,
                }));
                setFormError((prev) => ({
                  ...prev,
                  MedicalconditionAllergies: "",
                }));
              }}
              options={[
                { id: "1", value: "PCOS", label: "PCOS" },
                {
                  id: "2",
                  value: "Thyroid Disorder",
                  label: "Thyroid Disorder",
                },
                { id: "3", value: "Diabetes", label: "Diabetes" },
                { id: "4", value: "Hypertension", label: "Hypertension" },
              ]}
              placeholder="Search Medical Condition or Allergies"
              addPlaceholder="Add Medical Condition or Allergies"
              required={true}
              dropdownHandle={false} // open close arrow icon show hide
              selectedOptionColor="var(--border-box)"
              selectedOptionBorderColor="var(--border-box)"
              error={formError.MedicalconditionAllergies}
            />
          </Col>
          <Col md={12} className="mt-md-3 mt-2">
            <InputFieldGroup
              label="Family Medical History "
              name="familyMedicalHistory"
              value={formData.familyMedicalHistory}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
              placeholder="Enter family medical history"
              required={false}
              error={formError.familyMedicalHistory}
              className="position-relative "
            ></InputFieldGroup>
          </Col>

          <Col md={12} className="mt-md-3 mt-2">
            <InputSelectMultiSelect
              label="Lifestyle"
              name="lifestyle"
              values={formData.lifestyle}
              onChange={(values) => {
                setFormData((prev) => ({ ...prev, lifestyle: values }));
                setFormError((prev) => ({ ...prev, lifestyle: "" }));
              }}
              options={[
                { id: "1", value: "Non-smoker", label: "Non-smoker" },
                {
                  id: "2",
                  value: "Occasional alcohol",
                  label: "Occasional alcohol",
                },
                { id: "3", value: "Vegetarian diet", label: "Vegetarian diet" },
              ]}
              placeholder="Select Lifestyle"
              addPlaceholder="Add Lifestyle"
              required={true}
              dropdownHandle={true} // open close arrow icon show hide
              selectedOptionColor="var(--border-box-blue)"
              selectedOptionBorderColor="var(--border-box-blue)"
              error={formError.lifestyle}
            />
          </Col>

          <Col lg={6} className="mt-md-3 mt-2">
            <RadioButtonGroup
              label="How often do you exercise?"
              name="exercise"
              value={formData.exercise || "never"}
              onChange={(e) => handleChange(e)}
              required={true}
              error={formError.exercise}
              options={[
                { label: "Never", value: "never" },
                { label: "Rarely", value: "rarely" },
                { label: "Regularly", value: "regularly" },
              ]}
            />
          </Col>
          <Col lg={6} className="mt-md-3 mt-2">
            <RadioButtonGroup
              label="How would you rate your stress levels?"
              name="stress"
              value={formData.stress || "low"}
              onChange={(e) => handleChange(e)}
              required={true}
              error={formError.stress}
              options={[
                { label: "Low", value: "low" },
                { label: "Moderate", value: "moderate" },
                { label: "High", value: "high" },
              ]}
            />
          </Col>

          <div className="d-flex gap-3 mt-3">
            <Button
              className="w-100"
              variant="outline"
              disabled={false}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="w-100"
              variant="default"
              disabled={false}
              type="button"
              onClick={(e) => handleSubmit}
            >
              Save
            </Button>
          </div>
        </Row>
      </form>
    </>
  );
}
