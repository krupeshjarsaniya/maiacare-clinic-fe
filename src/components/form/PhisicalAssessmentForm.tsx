"use client";

import { AppDispatch } from "../../utlis/redux/store";
import { useDispatch } from "react-redux";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { setHeaderData } from "../../utlis/redux/slices/headerSlice";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { InputFieldGroup } from "@/components/ui/InputField";
import { Col, Row } from "react-bootstrap";
import { InputSelect } from "@/components/ui/InputSelect";
import { PhysicalAssessment, PhysicalAssessmentDataModel } from "../../utlis/types/interfaces";
import toast from "react-hot-toast";
import { BsInfoCircle } from "react-icons/bs";

interface PropsPhisicalAssessmentForm {
  setShowPhisicalAssessment: React.Dispatch<React.SetStateAction<boolean>>;
  setModalFormPhisicalData: React.Dispatch<
    React.SetStateAction<PhysicalAssessmentDataModel[]>
  >;
  editPhysicalAssessment?: PhysicalAssessmentDataModel;
  setEditPhysicalAssessment?: React.Dispatch<
    React.SetStateAction<PhysicalAssessmentDataModel>
  >;
  modalFormPhisicalData?: PhysicalAssessment[] | null;
  patientId?: string;
   fetchPatientData?: () => void;
}

// React.Dispatch<React.SetStateAction<PhysicalAssessmentDataModel>>  PhysicalAssessmentDataModel

const PhisicalAssessmentForm = ({
  setShowPhisicalAssessment,
  setModalFormPhisicalData,
  editPhysicalAssessment,
  setEditPhysicalAssessment,
  modalFormPhisicalData,
  fetchPatientData,
  patientId
}: PropsPhisicalAssessmentForm) => {
  type FormError = Partial<Record<keyof PhysicalAssessmentDataModel, string>>;
  const initialFormError: FormError = {};
  const initialFormData: PhysicalAssessmentDataModel = {
    patientId: editPhysicalAssessment?.patientId || "",
    height: editPhysicalAssessment?.height || "",
    weight: editPhysicalAssessment?.weight || "",
    bmi: editPhysicalAssessment?.bmi || "",
    bloodGroup: editPhysicalAssessment?.bloodGroup || "",
    bloodPressureSystolic: editPhysicalAssessment?.bloodPressureSystolic || "",
    bloodPressureDiastolic: editPhysicalAssessment?.bloodPressureDiastolic || "",
    heartRate: editPhysicalAssessment?.heartRate || "",
  
  };
  const initialFormDataForClear: PhysicalAssessmentDataModel = {
    patientId: "",
    height: "",
    weight: "",
    bmi: "",
    bloodGroup: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    heartRate: "",
  
  };
  const [formData, setFormData] =
    useState<PhysicalAssessmentDataModel>(initialFormData);
  const [formError, setFormError] = useState<FormError>(initialFormError);

  const generateRandomId = (): string => {
    return Math.random().toString(36).substr(2, 9);
  };

  const validateForm = (data: PhysicalAssessmentDataModel): FormError => {
    const errors: FormError = {};

    if (!data.height.trim()) errors.height = "Height is required";
    if (!data.weight.trim()) errors.weight = "Weight is required";
    if (!data.bmi.trim()) errors.bmi = "BMI is required";

    if (modalFormPhisicalData?.length === 0) {
      if (!data.bloodGroup.trim())
        errors.bloodGroup = "Blood group is required";
    }

    if (!data.bloodPressureSystolic.trim() && !data.bloodPressureDiastolic.trim()) {
      errors.bloodPressureSystolic = " systolic is required";

      // errors.diastolic = "At least one of systolic or diastolic is required";
    }
    if (!data.heartRate?.trim()) errors.heartRate = "Heart rate is required";

    return errors;
  };

  // Handle form field change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  // Submit Handler
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormError(errors);
    console.log("errors", errors);

    if (Object.keys(errors).length === 0) {
      const formattedDate = new Date()
        .toLocaleDateString("en-GB", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .replace(/^(\w+)/, "$1"); // Adds comma after weekday

      const updatedFormData = {
        ...formData,
        date: formattedDate,
        id: generateRandomId(),
      };

      if (editPhysicalAssessment && editPhysicalAssessment.patientId) {
        setModalFormPhisicalData((prev) =>
          prev.map((item) =>
            item.patientId === editPhysicalAssessment.patientId
              ? { ...item, ...formData }
              : item
          )
        );
        setShowPhisicalAssessment(false);
        setFormError(initialFormError);
        setEditPhysicalAssessment?.(initialFormDataForClear);
        toast.success("Changes saved successfully", {
          icon: <BsInfoCircle size={22} color="white" />,
        });
      } else {
        setModalFormPhisicalData((prev) => [...prev, updatedFormData]);
        setShowPhisicalAssessment(false);
        setFormError(initialFormError);
        setFormData(initialFormData);
        toast.success("Physical assessment added successfully", {
          icon: <BsInfoCircle size={22} color="white" />,
        });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Row className="g-md-4 g-2 accordion-form-physical-assessment">
          <Col md={6}>
            <InputFieldGroup
              label="Height"
              name="height"
              type="text"
              value={formData.height}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = e.target.value;

                // Allow only digits, single quote, double quote
                if (/^[0-9'"]*$/.test(newValue)) {
                  handleChange(e);
                }
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
              placeholder="Enter height "
              required={true}
              disabled={false}
              readOnly={false}
              error={formError.height}
            />
          </Col>
          <Col md={6}>
            <InputFieldGroup
              label="Weight"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
              placeholder="Enter weight(kg)"
              required={true}
              disabled={false}
              readOnly={false}
              error={formError.weight}
            />
          </Col>

          <Col md={6}>
            <InputFieldGroup
              label="BMI"
              name="bmi"
              type="number"
              value={formData.bmi}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
              placeholder="Enter BMI"
              required={true}
              disabled={false}
              readOnly={false}
              error={formError.bmi}
            />
          </Col>
          <Col md={6}>
            <InputSelect
              label="Blood Group"
              name="bloodGroup"
              value={
                formData.bloodGroup || modalFormPhisicalData?.[0]?.bloodGroup
              }
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {}}
              required={true}
              // disabled={
              //     modalFormPhisicalData.includes(editPhysicalAssessment)
              //     ? false : modalFormPhisicalData.length == 0 ? false : true
              //     }

              disabled={modalFormPhisicalData?.length == 0 ? false : true}
              error={formError.bloodGroup}
              placeholder="Select Blood Group"
              options={[
                { id: "1", value: "A+", label: "A+" },
                { id: "2", value: "A-", label: "A-" },
                { id: "3", value: "B+", label: "B+" },
                { id: "4", value: "B-", label: "B-" },
                { id: "5", value: "AB+", label: "AB+" },
                { id: "6", value: "AB-", label: "AB-" },
                { id: "7", value: "O+", label: "O+" },
                { id: "8", value: "O-", label: "O-" },
              ]}
            />
          </Col>

          <Col md={5} className="input-custom-width">
            <InputFieldGroup
              label="Blood Pressure"
              name="bloodPressureSystolic"
              type="number"
              placeholder="Systolic(mmHg)"
              required={true}
              disabled={false}
              readOnly={false}
              value={formData.bloodPressureSystolic}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              error={formError.bloodPressureSystolic}
            />
          </Col>

          <Col
            md={1}
            className={
              formError.bloodPressureSystolic
                ? "or-custom-width d-flex justify-content-center align-items-center mt-md-4 "
                : "or-custom-width d-flex justify-content-center align-items-center mt-5"
            }
          >
            {/* <span className="or-custom-slash">/</span> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="28"
              viewBox="0 0 10 28"
              fill="none"
            >
              <path
                d="M9.45417 0.843998L2.92617 27.7H0.23817L6.74217 0.843998H9.45417Z"
                fill="#3E4A57"
              />
            </svg>
          </Col>

          <Col md={5} className="input-custom-width ">
            <InputFieldGroup
              label="" // No label here to match the design
              name="bloodPressureDiastolic"
              type="number"
              className="input-custom-data "
              placeholder="Diastolic(mmHg)"
              required={false}
              disabled={false}
              readOnly={false}
              value={formData.bloodPressureDiastolic}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              // error={formError.diastolic}
            />
          </Col>

          <Col md={12}>
            <InputFieldGroup
              label="Heart Rate"
              name="heartRate"
              type="number"
              value={formData.heartRate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
              placeholder="Enter Rate(bpm)"
              required={true}
              disabled={false}
              readOnly={false}
              error={formError.heartRate}
            />
          </Col>

          <div className="d-flex gap-3">
            <Button
              className="w-100"
              variant="outline"
              disabled={false}
              onClick={() => {
                setShowPhisicalAssessment(false);
                setEditPhysicalAssessment?.(initialFormDataForClear);
              }}
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
};

export default PhisicalAssessmentForm;
