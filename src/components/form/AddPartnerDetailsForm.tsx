"use client";
import React, {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Modal from "../ui/Modal";
import { InputField, InputFieldGroup } from "../ui/InputField";
import { Accordion, Col, Row } from "react-bootstrap";
import { RadioButtonGroup } from "../ui/RadioField";
import { InputSelect, InputSelectMultiSelect } from "../ui/InputSelect";
import { PhoneNumberInput } from "../ui/PhoneNumberInput";
import Button from "../ui/Button";
import Simpleeditpro from "../../assets/images/Simpleeditpro.png";
import cameraicon from "../../assets/images/Cameraicon.png";
import { log, profile } from "console";
import {
  EditFertilityAssessment,
  FertilityAssessmentPartner,
  FertilityAssessmentType,
  MedicalHistoryShow,
  MedicalHistoryType,
  PartnerBasicDetailsForm,
  partnerMedicalHistory,
  PhysicalAssessmentDataModel,
} from "../../utlis/types/interfaces";
// import { partnerDetailData } from '@/utils/StaticData';
import toast from "react-hot-toast";
import { BsInfoCircle } from "react-icons/bs";
import { PartnerDetailData } from "@/utlis/StaticData";
import { Dispatch } from "@reduxjs/toolkit";
import { PartnerDetailsData } from "../AddPartnerDetails";
import PhisicalAssessmentForm from "./PhisicalAssessmentForm";
import {
  addPatientPartnerMedicalHistory,
  updatePatientPartnerMedicalHistory,
} from "@/utlis/apis/apiHelper";
// export interface PartnerDetailsData extends PartnerDetailData {}
type PhysicalAssessmentProps = {
  // formError?: Partial<Record<keyof PhysicalAssessmentDataModel, string>>;
  // setFormError?: React.Dispatch<
  //   React.SetStateAction<
  //     Partial<Record<keyof PhysicalAssessmentDataModel, string>>
  //   >
  // >;
  // // formData: PhysicalAssessmentDataModel | FertilityAssessmentType;
  // setFormData: React.Dispatch<
  //   React.SetStateAction<PhysicalAssessmentDataModel>
  // >;

  // setShowContent?: (value: boolean) => void;
  // setShowPartnerDetail?: (value: boolean) => void;
  // setShowData: React.Dispatch<React.SetStateAction<PartnerDetailsData>>;
  // showData: PartnerDetailsData;

  formError?: Partial<Record<keyof PhysicalAssessmentDataModel, string>>;
  setFormError?: React.Dispatch<
    React.SetStateAction<
      Partial<Record<keyof PhysicalAssessmentDataModel, string>>
    >
  >;
  formData: PhysicalAssessmentDataModel;
  setFormData: React.Dispatch<
    React.SetStateAction<PhysicalAssessmentDataModel>
  >;
};
type MedicalHistoryFormProps = {
  setAddPartner: (value: boolean) => void;
  setActiveTab: (tab: string) => void;
  setEditMedicalHistory?: React.Dispatch<React.SetStateAction<boolean>>;
  formDataMedicalHistory?: MedicalHistoryShow | null;
  patientId: string | number | undefined;
  fetchPatientData?: () => void;
  setPartnerMedicalHistory?: React.Dispatch<
    React.SetStateAction<partnerMedicalHistory | null>
  >;
  onSuccess?: () => void;
};
type FormError = Partial<Record<keyof FertilityAssessmentType, string>>;

type FertilityAssessmentProps = {
  formData: FertilityAssessmentPartner | EditFertilityAssessment;
  setFormData:
    | React.Dispatch<React.SetStateAction<FertilityAssessmentPartner>>
    | React.Dispatch<React.SetStateAction<EditFertilityAssessment>>
    | ((
        value: React.SetStateAction<
          FertilityAssessmentPartner | EditFertilityAssessment
        >
      ) => void);
  setFormError: React.Dispatch<React.SetStateAction<FormError>>;
  formError?: FormError;
};

export function BasicDetailsForm({
  setAddPartner,
  setActiveTab,
  patientId,
  setPartnerBasicDetails,
  onSuccess,
}: {
  setAddPartner: (value: boolean) => void;
  setActiveTab: (tab: string) => void;
  patientId: string | number | undefined;
  setPartnerBasicDetails?: React.Dispatch<
    React.SetStateAction<PartnerBasicDetailsForm | null>
  >;
  onSuccess?: () => void;
}) {
  const initialFormError: FormError = {};
  type FormData = {
    basic_detail_name: string;
    basic_detail_gender: string;
    basic_detail_age: string;
    basic_detail_phone: string;
    basic_detail_email: string;
    profileImage: string;
  };

  type FormError = Partial<Record<keyof FormData, string>>;

  const initialFormData: FormData = {
    basic_detail_name: "",
    basic_detail_gender: "Male",
    basic_detail_age: "",
    basic_detail_phone: "",
    basic_detail_email: "",
    profileImage: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  // console.log("formData", formData);
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "basic_detail_phone") {
      // Allow only digits
      const isOnlyNumbers = /^[0-9]*$/.test(value);

      if (isOnlyNumbers) {
        // clear error only when it's numeric
        setFormError((prev) => ({ ...prev, [name]: "" }));
      } else {
        // keep "required" style error if invalid
        setFormError((prev) => ({
          ...prev,
          [name]: "Phone number is required",
        }));
      }
    } else {
      // for other fields, clear error on any change
      setFormError((prev) => ({ ...prev, [name]: "" }));
    }

    console.log("value", value);
  };

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement> | undefined
  ) => {
    if (event) {
      const file = event.target.files?.[0];
      if (file) {
        const allowedTypes = ["image/jpeg", "image/png"];

        if (!allowedTypes.includes(file.type)) {
          setFormData((prev) => ({
            ...prev,
            profileImage: "",
          }));
          setFormError((prev) => ({
            ...prev,
            profileImage: "Only JPG and PNG files are allowed",
          }));
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          setFormData((prev) => ({
            ...prev,
            profileImage: "",
          }));
          setFormError((prev) => ({
            ...prev,
            profileImage: "File size must be less than 5MB",
          }));
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          setProfileImage(reader.result as string);
          setFormData((prev) => ({
            ...prev,
            profileImage: reader.result as string,
          }));
          setFormError((prev) => ({
            ...prev,
            profileImage: "",
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const validateForm = (data: FormData): FormError => {
    const errors: FormError = {};

    if (!data.basic_detail_name.trim())
      errors.basic_detail_name = "Name is required";
    if (!data.basic_detail_age.trim())
      errors.basic_detail_age = "Age is required";
    if (!data.basic_detail_phone.trim())
      errors.basic_detail_phone = "Phone number is required";

    // Only check required here
    // if (!data.profileImage.trim()) {
    //     errors.profileImage = "Profile Image is required";
    // }

    if (!data.basic_detail_email.trim())
      errors.basic_detail_email = "Email is required";

    return errors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm(formData);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      const updatedFormData: PartnerBasicDetailsForm = {
        patientId,
        partnerName: formData.basic_detail_name,
        partnerGender: formData.basic_detail_gender,
        partnerAge: formData.basic_detail_age,
        partnerContactNumber: formData.basic_detail_phone,
        partnerEmail: formData.basic_detail_email,
        partnerImage: formData.profileImage,
      };

      console.log("Partner Basic Details:", updatedFormData);

      setPartnerBasicDetails?.(updatedFormData);
      setFormError(initialFormError);
      setActiveTab("medical history");
      onSuccess?.();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Row className="g-md-3 g-1">
          <Col md={12}>
            <div className="d-flex align-items-center gap-4  flex-wrap justify-content-center justify-content-sm-start text-center text-md-start">
              <div className="profile-wrapper position-relative">
                <Image
                  src={profileImage || Simpleeditpro}
                  alt="Profile"
                  className="object-fit-cover rounded-2"
                  width={100}
                  height={100}
                />
                <div
                  className="camera-icon position-absolute bottom-0 end-0 cursor-pointer"
                  onClick={handleImageClick}
                >
                  <Image src={cameraicon} alt="Upload" width={48} height={48} />
                </div>
                <InputFieldGroup
                  type="file"
                  accept="image/png, image/jpeg"
                  ref={fileInputRef}
                  className="image-formate"
                  onChange={(event) => handleFileChange(event)}
                  name="profileImage"
                />
              </div>

              <div>
                <div className="accordion-title-detail">
                  Add Profile Picture
                </div>
                <div className="select-profile-subtitle">
                  Allowed Jpg, png of max size 5MB
                </div>
                <small className="text-danger maiacare-input-field-error form-text ">
                  {formError.profileImage}
                </small>
              </div>
            </div>
          </Col>
          <Col md={12}>
            <InputFieldGroup
              label="Name"
              name="basic_detail_name"
              type="text"
              value={formData.basic_detail_name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
              placeholder="Enter name"
              required={true}
              error={formError.basic_detail_name}
              className="position-relative "
            ></InputFieldGroup>
          </Col>
          <Col md={6}>
            <RadioButtonGroup
              label="Gender"
              name="basic_detail_gender"
              value={formData.basic_detail_gender || ""}
              // defaultValue="male"
              onChange={(e) => handleChange(e)}
              required
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
            />
          </Col>

          <Col md={6}>
            <InputSelect
              label="age"
              name="basic_detail_age"
              value={formData.basic_detail_age}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {}}
              required={true}
              disabled={false}
              error={formError.basic_detail_age}
              options={[
                { id: "1", value: "1", label: "1" },
                { id: "2", value: "2", label: "2" },
                { id: "3", value: "3", label: "3" },
                { id: "4", value: "4", label: "4" },
                { id: "5", value: "5", label: "5" },
                { id: "6", value: "6", label: "6" },
                { id: "7", value: "7", label: "7" },
                { id: "8", value: "8", label: "8" },
                { id: "9", value: "9", label: "9" },
                { id: "10", value: "10", label: "10" },
                { id: "11", value: "11", label: "11" },
                { id: "12", value: "12", label: "12" },
                { id: "13", value: "13", label: "13" },
                { id: "14", value: "14", label: "14" },
                { id: "15", value: "15", label: "15" },
                { id: "16", value: "16", label: "16" },
                { id: "17", value: "17", label: "17" },
                { id: "18", value: "18", label: "18" },
                { id: "19", value: "19", label: "19" },
                { id: "20", value: "20", label: "20" },
                { id: "21", value: "21", label: "21" },
                { id: "22", value: "22", label: "22" },
                { id: "23", value: "23", label: "23" },
                { id: "24", value: "24", label: "24" },
                { id: "25", value: "25", label: "25" },
              ]}
            />
          </Col>

          <Col md={6}>
            <PhoneNumberInput
              label="Contact Number"
              value={formData.basic_detail_phone}
              onChange={(phone: string) => {
                // setFormData((prev) => ({ ...prev, phone }));
                // setFormError((prev) => ({ ...prev, phone: "" }));
                handleChange({
                  target: { name: "basic_detail_phone", value: phone },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
              placeholder="(000) 000-0000"
              required
              error={formError.basic_detail_phone}
            />
          </Col>

          <Col md={6}>
            <InputFieldGroup
              label="Email ID"
              name="basic_detail_email"
              type="email"
              value={formData.basic_detail_email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
              placeholder="Enter Email ID"
              required={true}
              error={formError.basic_detail_email}
              className="position-relative "
            ></InputFieldGroup>
          </Col>
          <div className="d-flex gap-3">
            <Button
              className="w-100"
              variant="outline"
              disabled={false}
              onClick={() => setAddPartner(false)}
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

export function MedicalHistoryForm({
  setAddPartner,
  setActiveTab,
  setEditMedicalHistory,
  formDataMedicalHistory,
  patientId,
  fetchPatientData,
  setPartnerMedicalHistory,
  onSuccess,
}: MedicalHistoryFormProps) {
  const medicalConditionOptions = [
    { id: "1", value: "PCOS", label: "PCOS" },
    { id: "2", value: "Thyroid Disorder", label: "Thyroid Disorder" },
    { id: "3", value: "Diabetes", label: "Diabetes" },
    { id: "4", value: "Hypertension", label: "Hypertension" },
  ];

  const lifestyleOptions = [
    { id: "1", value: "Non-smoker", label: "Non-smoker" },
    { id: "2", value: "Occasional alcohol", label: "Occasional alcohol" },
    { id: "3", value: "Vegetarian diet", label: "Vegetarian diet" },
  ];
  type FormError = Partial<Record<keyof MedicalHistoryType, string>>;

  const initialFormData: MedicalHistoryType = {
    medication: formDataMedicalHistory?.medications?.status || "No",
    medicationcontent:
      formDataMedicalHistory?.medications?.medicationsDetails || "",
    surgeries: formDataMedicalHistory?.surgeries?.status || "No",
    surgeriescontent: formDataMedicalHistory?.surgeries?.surgeriesDetails || "",

    medicalCondition: Array.isArray(formDataMedicalHistory?.conditions)
      ? formDataMedicalHistory.conditions.map((item: string) => ({
          id:
            medicalConditionOptions.find((opt) => opt.value === item)?.id ??
            item,
          value: item,
          label: item,
        }))
      : [],

    familyMedicalHistory: formDataMedicalHistory?.familyHistory || "",
    // lifestyle: initialData?.lifestyle || [],
    lifestyle: Array.isArray(formDataMedicalHistory?.lifestyle)
      ? formDataMedicalHistory.lifestyle.map((item: string) => ({
          id: lifestyleOptions.find((opt) => opt.value === item)?.id ?? item,
          value: item,
          label: item,
        }))
      : [],

    stress: formDataMedicalHistory?.stressLevel || "High",
    exercise: formDataMedicalHistory?.exerciseFrequency || "Rarely",
  };

  const MedicalHistoryFormError: FormError = {};

  const [FormData, setFormData] = useState<MedicalHistoryType>(initialFormData);
  const [medicalHistoryFormError, setMedicalHistoryFormError] =
    useState<FormError>(MedicalHistoryFormError);

  const validateForm = (data: MedicalHistoryType): FormError => {
    const errors: FormError = {};

    if (data.medication === "Yes" && !data.medicationcontent.trim()) {
      errors.medicationcontent = "Medication Content is required";
    }

    if (data.surgeries === "Yes" && !data.surgeriescontent.trim()) {
      errors.surgeriescontent = "Surgeries Content is required";
    }
    if (!data.medicalCondition.length)
      errors.medicalCondition = "Medical Condition is required";
    if (!data.lifestyle.length) errors.lifestyle = "Lifestyle is required";
    return errors;
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setMedicalHistoryFormError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(FormData);
    setMedicalHistoryFormError(errors);

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
          status: FormData.medication?.toLowerCase() === "yes" ? "Yes" : "No",
          medicationsDetails:
            FormData.medication?.toLowerCase() === "yes"
              ? FormData.medicationcontent || ""
              : "", // remove if No
        },

        surgeries: {
          status: FormData.surgeries?.toLowerCase() === "yes" ? "Yes" : "No",
          surgeriesDetails:
            FormData.surgeries?.toLowerCase() === "yes"
              ? FormData.surgeriescontent || ""
              : "", // remove if No
        },

        conditions: Array.isArray(FormData.medicalCondition)
          ? FormData.medicalCondition.map((item) => item.value)
          : [],

        familyHistory: FormData.familyMedicalHistory || "",

        lifestyle: Array.isArray(FormData.lifestyle)
          ? FormData.lifestyle.map((item) => item.value)
          : [],

        exerciseFrequency: normalizeEnum(FormData.exercise, [
          "Never",
          "Rarely",
          "Regularly",
        ]),

        stressLevel: normalizeEnum(FormData.stress, [
          "Low",
          "Moderate",
          "High",
        ]),
      };

      const updatedFormDataForEdit = {
        patientId: patientId,

        medications: {
          status: FormData.medication?.toLowerCase() === "yes" ? "Yes" : "No",
          medicationsDetails:
            FormData.medication?.toLowerCase() === "yes"
              ? FormData.medicationcontent || ""
              : "", // remove if No
        },

        surgeries: {
          status: FormData.surgeries?.toLowerCase() === "yes" ? "Yes" : "No",
          surgeriesDetails:
            FormData.surgeries?.toLowerCase() === "yes"
              ? FormData.surgeriescontent || ""
              : "", // remove if No
        },

        conditions: Array.isArray(FormData.medicalCondition)
          ? FormData.medicalCondition.map((item) => item.value)
          : [],

        familyHistory: FormData.familyMedicalHistory || "",

        lifestyle: Array.isArray(FormData.lifestyle)
          ? FormData.lifestyle.map((item) => item.value)
          : [],

        exerciseFrequency: normalizeEnum(FormData.exercise, [
          "Never",
          "Rarely",
          "Regularly",
        ]),

        stressLevel: normalizeEnum(FormData.stress, [
          "Low",
          "Moderate",
          "High",
        ]),
      };

      const isEditMode = Boolean(formDataMedicalHistory);

      if (isEditMode) {
        // ✅ EDIT MEDICAL HISTORY
        updatePatientPartnerMedicalHistory(updatedFormDataForEdit)
          .then((response) => {
            console.log("Edit:-", response);

            if (response.data.status) {
              toast.success(response.data.message, {
                icon: <BsInfoCircle size={22} color="white" />,
              });

              fetchPatientData?.();
              setEditMedicalHistory?.(false);
            }
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message || "Something went wrong");
          });
      } else {
        addPatientPartnerMedicalHistory(updatedFormData)
          .then((response) => {
            console.log("Add:-", response);
            if (response.data.status) {
              toast.success(response.data.message);

              fetchPatientData?.();
              setEditMedicalHistory?.(false);
              onSuccess?.();
            }
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message || "Something went wrong");
          });
      }
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
              value={FormData.medication || "Yes"}
              onChange={(e) => handleChange(e)}
              required={true}
              error={medicalHistoryFormError.medication}
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />

            {FormData.medication === "Yes" && (
              <InputFieldGroup
                type="text"
                value={FormData.medicationcontent}
                name="medicationcontent"
                onChange={handleChange}
                error={medicalHistoryFormError.medicationcontent}
                placeholder="Enter medication"
                className={`mt-md-3 mt-2`}
              ></InputFieldGroup>
            )}
          </Col>
          <Col md={12} className="mt-md-3 mt-2 ">
            <RadioButtonGroup
              label="Have you had any surgeries?"
              name="surgeries"
              value={FormData.surgeries}
              // value={FormData.surgeries || "Yes"}
              onChange={(e) => handleChange(e)}
              required={true}
              error={medicalHistoryFormError.surgeries}
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />

            {FormData.surgeries === "Yes" && (
              <InputFieldGroup
                type="text"
                value={FormData.surgeriescontent}
                name="surgeriescontent"
                onChange={handleChange}
                error={medicalHistoryFormError.surgeriescontent}
                placeholder="Enter surgeries"
                className={`mt-md-3 mt-2`}
              ></InputFieldGroup>
            )}
          </Col>
          <Col md={12} className="mt-md-3 mt-2">
            {/* <InputSelectMultiSelect
              label="Do you have any medical condition?"
              name="MedicalconditionAllergies"
              values={FormData.medicalCondition}
              onChange={(values) => {
                setFormData((prev) => ({
                  ...prev,
                  MedicalconditionAllergies: values, // FIXED
                }));

                setMedicalHistoryFormError((prev) => ({
                  ...prev,
                  MedicalconditionAllergies: "", // FIXED
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
              dropdownHandle={false}
              selectedOptionColor="var(--border-box)"
              selectedOptionBorderColor="var(--border-box)"
              error={medicalHistoryFormError.medicalCondition}
            /> */}
            <InputSelectMultiSelect
              label="Do you have any medical condition?"
              name="medicalCondition"
              values={FormData.medicalCondition}
              onChange={(values) => {
                setFormData((prev) => ({ ...prev, medicalCondition: values }));
                setMedicalHistoryFormError((prev) => ({
                  ...prev,
                  medicalCondition: "",
                }));
              }}
              options={medicalConditionOptions}
              placeholder="Search Medical Condition or Allergies"
              addPlaceholder="Add Medical Condition or Allergies"
              required={true}
              dropdownHandle={false} // open close arrow icon show hide
              selectedOptionColor="var(--border-box)"
              selectedOptionBorderColor="var(--border-box)"
              error={medicalHistoryFormError.medicalCondition}
            />
          </Col>
          <Col md={12} className="mt-md-3 mt-2">
            <InputFieldGroup
              label="Family Medical History "
              name="familyMedicalHistory"
              values={FormData.familyMedicalHistory}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
              placeholder="Enter family medical history"
              required={false}
              error={medicalHistoryFormError.familyMedicalHistory}
              className="position-relative "
            ></InputFieldGroup>
          </Col>
          <Col md={12} className="mt-md-3 mt-2">
            <InputSelectMultiSelect
              label="Lifestyle"
              name="lifestyle"
              values={FormData.lifestyle}
              onChange={(values) => {
                setFormData((prev) => ({ ...prev, lifestyle: values }));
                setMedicalHistoryFormError((prev) => ({
                  ...prev,
                  lifestyle: "",
                }));
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
              error={medicalHistoryFormError.lifestyle}
            />
          </Col>

          <Col md={6} className="mt-md-3 mt-2">
            <RadioButtonGroup
              label="How often do you exercise?"
              name="exercise"
              value={FormData.exercise || "never"}
              onChange={(e) => handleChange(e)}
              required={true}
              error={medicalHistoryFormError.exercise}
              options={[
                { label: "Never", value: "Never" },
                { label: "Rarely", value: "Rarely" },
                { label: "Regularly", value: "Regularly" },
              ]}
            />
          </Col>
          <Col md={6} className="mt-md-3 mt-2">
            <RadioButtonGroup
              label="How would you rate your stress levels?"
              name="stress"
              value={FormData.stress || "low"}
              onChange={(e) => handleChange(e)}
              required={true}
              error={medicalHistoryFormError.stress}
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
              onClick={() => {
                setAddPartner(false);
                setEditMedicalHistory?.(false);
              }}
            >
              Cancel
            </Button>

            <Button
              className="w-100"
              variant="default"
              disabled={false}
              type="submit"
              // onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              //   e.preventDefault();
              //   handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
              // }}
            >
              Save
            </Button>
          </div>
        </Row>
      </form>
    </>
  );
}

export function PhysicalAssessment({
  formError,
  setFormError,
  formData,
  setFormData,
}: PhysicalAssessmentProps) {
  type FormError = Partial<Record<keyof FertilityAssessmentType, string>>;

  const initialFormError: FormError = {};
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log("e value", name, value);
    // console.log("teast", [name]: value);

    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError?.((prev) => ({ ...prev, [name]: "" }));
  };

  const initialFormData: PhysicalAssessmentDataModel = {
    patientId: "",
    height: "",
    weight: "",
    bmi: "",
    bloodGroup: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    heartRate: "",
  };
  const [showPhisicalAssessment, setShowPhisicalAssessment] =
    useState<boolean>(true);
  const [editPhysicalAssessment, setEditPhysicalAssessment] =
    useState<PhysicalAssessmentDataModel>(initialFormData);
  const [modalFormPhisicalData, setModalFormPhisicalData] = useState<
    PhysicalAssessmentDataModel[]
  >([]);

  return (
    <>
      <form>
        <Row className="g-3 accordion-form-physical-assessment">
          <Col md={6}>
            <InputFieldGroup
              label="Height"
              name="height"
              type="text"
              className="setting-password-input"
              value={formData.height}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = e.target.value;

                // Allow only digits, single quote, double quote
                if (/^[0-9'"]*$/.test(newValue)) {
                  handleChange(e);
                }
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
              placeholder="Enter height (in)"
              required={true}
              disabled={false}
              readOnly={false}
              error={formError?.height}
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
              error={formError?.weight}
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
              error={formError?.bmi}
            />
          </Col>
          <Col md={6}>
            <InputSelect
              label="Blood Group"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {}}
              required={true}
              disabled={false}
              error={formError?.bloodGroup}
              placeholder="Select Blood Group"
              // helperText="Select doctor"
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
              value={formData?.bloodPressureSystolic}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              error={formError?.bloodPressureSystolic}
            />
          </Col>

          <Col
            md={1}
            className={
              formError?.bloodPressureSystolic
                ? "or-custom-width d-flex justify-content-center align-items-center mt-4"
                : "or-custom-width d-flex justify-content-center align-items-center mt-5 "
            }
          >
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

          <Col md={5} className="input-custom-width">
            <InputFieldGroup
              label="" // No label here to match the design
              name="bloodPressureDiastolic"
              type="number"
              className="input-custom-data"
              placeholder="Diastolic(mmHg)"
              required={false}
              disabled={false}
              readOnly={false}
              value={formData.bloodPressureDiastolic}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              error={formError?.bloodPressureDiastolic}
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
              error={formError?.heartRate}
            />
          </Col>
        </Row>
      </form>
    </>
  );
}

export function FertilityAssessment({
  formData,
  setFormData,
  setFormError,
  formError,
}: FertilityAssessmentProps) {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };
  const handleSubmitData = (e: React.FormEvent) => {
    console.log(formData);
  };

  return (
    <>
      <form onClick={handleSubmitData}>
        <Row className="g-md-3 g-2">
          <Col md={12}>
            <RadioButtonGroup
              label="Have you ever had a semen analysis?"
              name="semenAnalysis"
              value={formData.semenAnalysis || "yes"}
              onChange={(e) => handleChange(e)}
              required={true}
              error={formError?.semenAnalysis}
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />

            {formData.semenAnalysis === "Yes" && (
              <InputFieldGroup
                type="text"
                value={formData.semenAnalysisDetails}
                name="semenAnalysisDetails"
                onChange={handleChange}
                error={formError?.semenAnalysisContent}
                placeholder="If yes, provide details if available"
                className={`mt-2`}
              ></InputFieldGroup>
            )}
          </Col>
          <Col md={12}>
            <RadioButtonGroup
              label="Have you experienced any fertility issues?"
              name="fertilityIssues"
              value={formData.fertilityIssues || "Yes"}
              onChange={(e) => handleChange(e)}
              required={true}
              error={formError?.fertilityIssues}
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />

            {formData.fertilityIssues === "Yes" && (
              <InputFieldGroup
                type="text"
                value={formData.fertilityIssuesDetails}
                name="fertilityIssuesDetails"
                onChange={handleChange}
                error={formError?.fertilityIssuesContent}
                placeholder="If yes, provide details if available"
                className={`mt-2`}
              ></InputFieldGroup>
            )}
          </Col>
          <Col md={12}>
            <RadioButtonGroup
              label="Have you previously undergone fertility treatments?"
              name="fertilityTreatment"
              value={formData.fertilityTreatment || "Yes"}
              onChange={(e) => handleChange(e)}
              required={true}
              error={formError?.fertilityTreatment}
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />

            {formData.fertilityTreatment === "Yes" && (
              <InputFieldGroup
                type="text"
                value={formData.fertilityTreatmentsDetails}
                name="fertilityTreatmentsDetails"
                onChange={handleChange}
                error={formError?.fertilityTreatmentContent}
                placeholder="If yes, provide details if available"
                className={`mt-2`}
              ></InputFieldGroup>
            )}
          </Col>
          <Col md={12}>
            <RadioButtonGroup
              label="Any history of surgeries?"
              name="surgeries"
              value={formData.surgeries || "Yes"}
              onChange={(e) => handleChange(e)}
              required={true}
              error={formError?.surgeries}
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />

            {formData.surgeries === "Yes" && (
              <InputFieldGroup
                type="text"
                value={formData.surgeriesDetails}
                name="surgeriesDetails"
                onChange={handleChange}
                error={formError?.surgeriesContent}
                placeholder="If yes, provide details if available"
                className={`mt-2`}
              ></InputFieldGroup>
            )}
          </Col>
        </Row>
      </form>
    </>
  );
}
