"use client";

import { FormEvent, useState } from "react";
import CustomTabs from "./ui/CustomTabs";
import {
  BasicDetailsForm,
  FertilityAssessment,
  MedicalHistoryForm,
  PhysicalAssessment,
} from "../components/form/AddPartnerDetailsForm";
import { Accordion } from "react-bootstrap";
import Button from "./ui/Button";
// import '../style/fertilityassessment.css'
import {
  FertilityAssessmentPartner,
  FertilityAssessmentType,
  MedicalHistoryType,
  PartnerBasicDetailsForm,
  partnerMedicalHistory,
  PhysicalAssessmentDataModel,
} from "../utlis/types/interfaces";
import toast from "react-hot-toast";
import { BsInfoCircle } from "react-icons/bs";
import { PartnerDetailData } from "@/utlis/StaticData";
import { StaticImageData } from "next/image";
import {
  addPatientPartnerBasicDetails,
  addPatientPartnerFertilityAssessment,
  addPatientPartnerMedicalHistory,
  addPatientPartnerPhysicalAssessment,
} from "@/utlis/apis/apiHelper";
interface ProfileType {
  // define the fields, for example:
  name?: string;
  age?: number;
  avatar?: string | StaticImageData;
  // etc...
}
export interface ProfileDetails {
  basic_detail_name: string;
  basic_detail_gender: string;
  basic_detail_age: string;
  basic_detail_phone: string;
  basic_detail_email: string;
  profileImage?: string;
}
export interface PartnerDetailsData {
  profile?: string | StaticImageData | ProfileType | ProfileDetails;
  medicalHistory?: MedicalHistoryType;
  fertilityAssessment?: FertilityAssessmentType;
  PhysicalAssessmentData: PhysicalAssessmentDataModel[];
}

interface AddPartnerDetailsProps {
  setAddPartner: (value: boolean) => void;
  patientId: string | number | undefined;
  fetchPatientData?: () => void;
  setPartnerBasicDetails?: React.Dispatch<
    React.SetStateAction<PartnerBasicDetailsForm | null>
  >;
  setPartnerMedicalHistory?: React.Dispatch<
    React.SetStateAction<partnerMedicalHistory | null>
  >;
  partnerBasicDetails?: PartnerBasicDetailsForm | null;
  partnerMedicalHistory?: partnerMedicalHistory | null;
}
interface PhysicalFertilityAssessmentAccordionProps {
  setAddPartner: (value: boolean) => void;
  patientId: string | number | undefined;
  fetchPatientData?: () => void;
  partnerBasicDetails?: PartnerBasicDetailsForm | null;
  partnerMedicalHistory?: partnerMedicalHistory | null;
}
export function AddPartnerDetails({
  setAddPartner,
  patientId,
  fetchPatientData,
  setPartnerBasicDetails,
  setPartnerMedicalHistory,
  partnerBasicDetails,
  partnerMedicalHistory,
}: AddPartnerDetailsProps) {
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [completedStep, setCompletedStep] = useState(0);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const tabOptions = [
    {
      key: "basic",
      label: "Basic Details",
      content: (
        <div>
          <BasicDetailsForm
            setAddPartner={setAddPartner}
            setActiveTab={setActiveTab}
            patientId={patientId}
            setPartnerBasicDetails={setPartnerBasicDetails}
            onSuccess={() => setCompletedStep(1)}
          />
        </div>
      ),
    },
    {
      key: "medical history",
      label: "Medical History",
      content: (
        <MedicalHistoryForm
          setAddPartner={setAddPartner}
          setActiveTab={setActiveTab}
          patientId={patientId}
          setPartnerMedicalHistory={setPartnerMedicalHistory}
          onSuccess={() => setCompletedStep(2)}
        />
        // <h6>Medical History</h6>
      ),
    },
    {
      key: "physical & fertility assessment",
      label: "Physical & Fertility Assessment",
      content: (
        <PhysicalFertilityAssessmentAccordion
          setAddPartner={setAddPartner}
          patientId={patientId}
          fetchPatientData={fetchPatientData}
          partnerBasicDetails={partnerBasicDetails}
          partnerMedicalHistory={partnerMedicalHistory}
        />
      ),
    },
  ];

  return (
    <>
      <CustomTabs
        tabOptions={tabOptions}
        className="mb-3"
        activeKey={activeTab}
        setActiveKey={handleTabChange}
      />
    </>
  );
}

export function PhysicalFertilityAssessmentAccordion({
  setAddPartner,
  patientId,
  fetchPatientData,
  partnerBasicDetails,
  partnerMedicalHistory,
}: PhysicalFertilityAssessmentAccordionProps) {
  type FormError = Partial<
    Record<
      keyof FertilityAssessmentPartner | keyof PhysicalAssessmentDataModel,
      string
    >
  >;
  const initialFormErrorPhysical: FormError = {};
  const [formErrorPhysical, setFormErrorPhysical] = useState<FormError>(
    initialFormErrorPhysical
  );
  const initialFormErrorFertility: FormError = {};
  const [formErrorFertility, setFormErrorFertility] = useState<FormError>(
    initialFormErrorFertility
  );
  const initialFormDataPhysical: PhysicalAssessmentDataModel = {
    patientId: "",
    height: "",
    weight: "",
    bmi: "",
    bloodGroup: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    heartRate: "",
  };

  const initialFormDataFertility: FertilityAssessmentPartner = {
    semenAnalysis: "Yes",
    semenAnalysisDetails: "",
    fertilityIssues: "No",
    fertilityIssuesDetails: "",
    fertilityTreatments: "No",
    fertilityTreatmentsDetails: "",
    surgeries: "No",
    surgeriesDetails: "",
  };

  const [formDataPhysical, setFormDataPhysical] =
    useState<PhysicalAssessmentDataModel>(initialFormDataPhysical);
  const [formDataFertility, setFormDataFertility] =
    useState<FertilityAssessmentPartner>(initialFormDataFertility);

  const initialFormError: FormError = {};
  const [formError, setFormError] = useState<FormError>(initialFormError);

  const validateFormPhysical = (
    data: PhysicalAssessmentDataModel
  ): FormError => {
    const errors: FormError = {};

    if (!data.height.trim()) errors.height = "Height is required";
    if (!data.weight.trim()) errors.weight = "Weight is required";
    if (!data.bmi.trim()) errors.bmi = "BMI is required";

    if (!data.bloodGroup.trim()) errors.bloodGroup = "Blood group is required";

    if (
      !data.bloodPressureSystolic.trim() ||
      !data.bloodPressureDiastolic.trim()
    ) {
      errors.bloodPressureSystolic = "Systolic & Diastolic are required";
    }

    if (!data.heartRate.trim()) errors.heartRate = "Heart rate is required";

    return errors;
  };

  const validateFormPhysicalFertility = (
    data: FertilityAssessmentPartner
  ): FormError => {
    const errors: FormError = {};
    if (!data.semenAnalysis.trim())
      errors.semenAnalysis = "Seminal Analysis is required";
    if (data.semenAnalysis === "Yes" && !data.semenAnalysisDetails.trim())
      errors.semenAnalysisDetails = "Seminal Analysis Details is required";
    if (!data.fertilityIssues.trim())
      errors.fertilityIssues = "Fertility Issues is required";
    if (data.fertilityIssues === "Yes" && !data.fertilityIssuesDetails.trim())
      errors.fertilityIssuesDetails = "Fertility Issues Details is required";
    if (!data.fertilityTreatments.trim())
      errors.fertilityTreatments = "Fertility Treatments is required";
    if (
      data.fertilityTreatments === "Yes" &&
      !data.fertilityTreatmentsDetails.trim()
    )
      errors.fertilityTreatmentsDetails =
        "Fertility Treatments Details is required";
    if (!data.surgeries.trim()) errors.surgeries = "Surgeries is required";
    if (data.surgeries === "Yes" && !data.surgeriesDetails.trim())
      errors.surgeriesDetails = "Surgeries Details is required";

    return errors;
  };
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const errorsPhysical = validateFormPhysical(formDataPhysical);
    const errorsFertility = validateFormPhysicalFertility(formDataFertility);

    setFormErrorPhysical(errorsPhysical);
    setFormErrorFertility(errorsFertility);

    if (
      Object.keys(errorsPhysical).length === 0 &&
      Object.keys(errorsFertility).length === 0
    ) {
      // Handle form submission

      const updatedFormDataPhysical = {
        ...formDataPhysical,
        patientId,
      };

      const updatedFormDataFertility = {
        patientId: patientId,
        semenAnalysis: {
          status: formDataFertility.semenAnalysis,
          semenAnalysisDetails: formDataFertility.semenAnalysisDetails,
        },

        fertilityIssues: {
          status: formDataFertility.fertilityIssues,
          fertilityIssuesDetails: formDataFertility.fertilityIssuesDetails,
        },

        fertilityTreatments: {
          status: formDataFertility.fertilityTreatments,
          fertilityTreatmentsDetails:
            formDataFertility.fertilityTreatmentsDetails,
        },

        surgeries: {
          status: formDataFertility.surgeries,
          surgeriesDetails: formDataFertility.surgeriesDetails,
        },
      };

      if (!partnerBasicDetails) return;
      if (!partnerMedicalHistory) return;

      Promise.all([
        addPatientPartnerBasicDetails(partnerBasicDetails),
        addPatientPartnerMedicalHistory(partnerMedicalHistory),
        addPatientPartnerPhysicalAssessment(updatedFormDataPhysical),
        addPatientPartnerFertilityAssessment(updatedFormDataFertility),
      ])
        .then(
          ([basicDetailRes, medicalHistoryRes, physicalRes, fertilityRes]) => {
            const basicDetailOk = basicDetailRes?.data?.status;
            const medicalHistory = medicalHistoryRes?.data?.status;
            const physicalOK = physicalRes?.data?.status;
            const fertilityOK = fertilityRes?.data?.status;

            if (basicDetailOk && medicalHistory && physicalOK && fertilityOK) {
              toast.success("Partner added successfully", {
                icon: <BsInfoCircle size={22} color="white" />,
              });
              setFormErrorPhysical(initialFormErrorPhysical);
              setFormErrorFertility(initialFormErrorFertility);
              setAddPartner(false); // CLOSE MODAL HERE
              fetchPatientData?.(); // FETCH NEW DATA
            } else {
              console.log("One of the APIs returned status false");
            }
          }
        )
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
  };

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item
          eventKey="0"
          className="fertilitiy-assement-accodion-item mb-3 mt-3"
        >
          <Accordion.Header>
            <div className="fertilitiy-assement-accodion-title">
              Physical Assessment
            </div>
          </Accordion.Header>
          <Accordion.Body className="pt-0">
            <PhysicalAssessment
              setFormError={setFormErrorPhysical}
              formError={formErrorPhysical}
              formData={formDataPhysical}
              setFormData={setFormDataPhysical}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item
          eventKey="1"
          className="fertilitiy-assement-accodion-item mb-3 mt-3"
        >
          <Accordion.Header>
            <div className="fertilitiy-assement-accodion-title">
              Fertility Assessment
            </div>
          </Accordion.Header>
          <Accordion.Body className="pt-0">
            <FertilityAssessment
              formData={formDataFertility}
              setFormData={setFormDataFertility}
              setFormError={setFormErrorFertility}
              formError={formErrorFertility}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="d-flex gap-3">
        <Button
          className="w-100 mt-3"
          variant="outline"
          disabled={false}
          onClick={() => setAddPartner(false)}
        >
          Cancel
        </Button>
        <Button
          className="w-100 mt-3"
          variant="default"
          disabled={false}
          type="button"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </>
  );
}
