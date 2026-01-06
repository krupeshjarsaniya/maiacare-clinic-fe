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
import {
  MedicalHistoryShow,
  MedicalHistoryType,
  OptionType,
} from "../../utlis/types/interfaces";
import {
  addMedicalHistory,
  updateMedicalHistory,
} from "@/utlis/apis/apiHelper";

interface MedicalHistoryProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: MedicalHistoryShow | null;
  patientId?: string | number | undefined;
  fetchPatientData?: () => void;
  onClose?: () => void;
}

export default function MedicalHistory({
  setShowModal,
  initialData,
  patientId,
  fetchPatientData,
  onClose,
}: MedicalHistoryProps) {
  type FormError = Partial<Record<keyof MedicalHistoryType, string>>;
  const initialFormData: MedicalHistoryType = {
    medication: initialData?.medications?.status || "No",
    medicationcontent: initialData?.medications?.medicationsDetails || "",

    surgeries: initialData?.surgeries?.status || "Yes",
    surgeriescontent: initialData?.surgeries?.surgeriesDetails || "",

    medicalCondition:
      initialData?.conditions?.map(
        (item: string): OptionType => ({ value: item, label: item })
      ) || [],
    familyMedicalHistory: initialData?.familyHistory || "",
    lifestyle:
      initialData?.lifestyle?.map(
        (item: string): OptionType => ({ value: item, label: item })
      ) || [],
    stress: initialData?.stressLevel || "high",
    exercise: initialData?.exerciseFrequency || "rarely",
  };

  const initialFormError: FormError = {};

  const [formData, setFormData] = useState<MedicalHistoryType>(initialFormData);
  const [formError, setFormError] = useState<FormError>(initialFormError);

  const validateForm = (data: MedicalHistoryType): FormError => {
    const errors: FormError = {};
    if (data.medication === "Yes" && !data.medicationcontent.trim())
      errors.medicationcontent = "Medication Content is required";
    if (data.surgeries === "Yes" && !data.surgeriescontent.trim())
      errors.surgeriescontent = "Surgeries Content is required";
    if (!data.surgeries.trim()) errors.surgeries = "Surgeries is required";

    if (!data.medicalCondition?.length)
      errors.medicalCondition = "Medical Condition is required";
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
      const normalizeEnum = (value: string | undefined, allowed: string[]) => {
        if (!value) return "";
        const match = allowed.find(
          (a) => a.toLowerCase() === value.toLowerCase()
        );
        return match || value;
      };

      const updatedFormData = {
        patientId,

        medications: {
          status: formData.medication === "Yes" ? "Yes" : "No",
          medicationsDetails:
            formData.medication === "Yes"
              ? formData.medicationcontent.trim()
              : "",
        },

        surgeries: {
          status: formData.surgeries === "Yes" ? "Yes" : "No",
          surgeriesDetails:
            formData.surgeries === "Yes" ? formData.surgeriescontent || "" : "",
        },

        conditions: Array.isArray(formData.medicalCondition)
          ? formData.medicalCondition.map((item) => item.value)
          : [],

        familyHistory: formData.familyMedicalHistory || "",

        lifestyle: Array.isArray(formData.lifestyle)
          ? formData.lifestyle.map((item) => item.value)
          : [],

        exerciseFrequency: normalizeEnum(formData.exercise, [
          "Never",
          "Rarely",
          "Regularly",
        ]),

        stressLevel: normalizeEnum(formData.stress, [
          "Low",
          "Moderate",
          "High",
        ]),
      };

      const updatedFormDataForEdit = {
        medicalHistoryId: initialData?._id,

        medications: {
          status: formData.medication === "Yes" ? "Yes" : "No",
          medicationsDetails:
            formData.medication === "Yes"
              ? formData.medicationcontent || ""
              : "", // remove if No
        },
        surgeries: {
          status: formData.surgeries === "Yes" ? "Yes" : "No",
          surgeriesDetails:
            formData.surgeries === "Yes" ? formData.surgeriescontent || "" : "", // remove if No
        },

        conditions: Array.isArray(formData.medicalCondition)
          ? formData.medicalCondition.map((item) => item.value)
          : [],

        familyHistory: formData.familyMedicalHistory || "",

        lifestyle: Array.isArray(formData.lifestyle)
          ? formData.lifestyle.map((item) => item.value)
          : [],

        exerciseFrequency: normalizeEnum(formData.exercise, [
          "Never",
          "Rarely",
          "Regularly",
        ]),

        stressLevel: normalizeEnum(formData.stress, [
          "Low",
          "Moderate",
          "High",
        ]),
      };

      if (initialData && initialData._id) {
        // If editing, update the existing entry

        // console.log("edit api call : ", updatedFormDataForEdit);

        updateMedicalHistory(updatedFormDataForEdit)
          .then((response) => {
            if (response.data.status) {
              // console.log("PUT medical history response:", response);
              setShowModal(false);
              setFormError(initialFormError);
              toast.success(response.data.message, {
                icon: <BsInfoCircle size={22} color="white" />,
              });

              fetchPatientData?.();
            } else {
              console.log("error");
            }
          })
          .catch((err) => {
            console.log("error", err?.response);

            const apiError = err?.response?.data;

            // extract dynamic error message
            const fieldError = apiError?.details?.errors
              ? Object.values(apiError.details.errors)[0] // pick first field error
              : null;

            const message =
              fieldError ||
              apiError?.details?.message ||
              apiError?.message ||
              "Something went wrong";

            toast.error(message);
          });
      } else {
        // If creating new, add to the arrayd

        // console.log("updatedFormData : ", updatedFormData);

        addMedicalHistory(updatedFormData)
          .then((response) => {
            if (response.data.status) {
              // console.log("POST medical history response:", response);

              setShowModal(false);
              setFormError(initialFormError);
              toast.success(response.data.message, {
                icon: <BsInfoCircle size={22} color="white" />,
              });

              fetchPatientData?.(); // FETCH UPDATED PATIENT DATA
            } else {
              console.log("error");
            }
          })
          .catch((err) => {
            console.log("error", err?.response);

            const apiError = err?.response?.data;

            // extract dynamic error message
            const fieldError = apiError?.details?.errors
              ? Object.values(apiError.details.errors)[0] // pick first field error
              : null;

            const message =
              fieldError ||
              apiError?.details?.message ||
              apiError?.message ||
              "Something went wrong";

            toast.error(message);
          });
      }
      // if (onClose) onClose();
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Row className="g-md-2 g-1">
          <Col md={12}>
            <RadioButtonGroup
              label="Are you currently taking any medications?"
              name="medication"
              value={formData.medication || "Yes"}
              onChange={(e) => handleChange(e)}
              required={true}
              error={formError.medication}
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />

            {formData.medication === "Yes" && (
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
              value={formData.surgeries || "Yes"}
              onChange={(e) => handleChange(e)}
              required={true}
              error={formError.surgeries}
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />
            {formData.surgeries === "Yes" && (
              <InputFieldGroup
                type="text"
                value={formData.surgeriescontent}
                name="surgeriescontent"
                onChange={handleChange}
                error={formError.surgeriescontent}
                placeholder="Enter surgeries"
                className="mt-md-3 mt-2"
              ></InputFieldGroup>
            )}
          </Col>
          <Col md={12} className="mt-md-3 mt-2">
            <InputSelectMultiSelect
              label="Do you have any medical condition?"
              name="medicalCondition"
              values={formData.medicalCondition}
              onChange={(values) => {
                setFormData((prev) => ({
                  ...prev,
                  medicalCondition: values,
                }));
                setFormError((prev) => ({
                  ...prev,
                  medicalCondition: "",
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
              error={formError.medicalCondition}
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
                { label: "Never", value: "Never" },
                { label: "Rarely", value: "Rarely" },
                { label: "Regularly", value: "Regularly" },
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
                { label: "Low", value: "Low" },
                { label: "Moderate", value: "Moderate" },
                { label: "High", value: "High" },
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
              type="submit"
            >
              Save
            </Button>
          </div>
        </Row>
      </form>
    </>
  );
}
