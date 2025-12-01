// "use client";
// import { setHeaderData } from "@/utlis/redux/slices/headerSlice";
// import { AppDispatch } from "@/utlis/redux/store";
// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";

// export default function Treatment() {
//   const dispatch: AppDispatch = useDispatch();
//   useEffect(() => {
//     dispatch(
//       setHeaderData({ title: "Treatment Plan", subtitle: "Treatment Plan" })
//     );
//   }, []);
//   return <div>hy</div>;
// }
"use client";
import { setHeaderData } from "@/utlis/redux/slices/headerSlice";
import { AppDispatch } from "@/utlis/redux/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import ContentContainer from "./ui/ContentContainer";
import CustomTabs from "./ui/CustomTabs";
import { All, IVF } from "../components/TreatmentHeaderComponent";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { TreatmentForm } from "../components/TreatmentForm";
import {
  EditTreatmentPlanType,
  MedicationPrescriptionType,
  PatientReportType,
  ProgressUpdatesType,
  TreatmentFertilityAssessmentFormType,
} from "../utlis/types/interfaces";
import { MedicationPrescriptionForm } from "./form/TreatmentPlanForm";
import {
  TerminationSuccessModal,
  TreatmentSuccessModal,
  TreatmentTerminate,
} from "../components/form/TreatmentAllForm";
import ProfileImage from "@/assets/images/Profile-doctor.png";
import {
  EditTreatmentStaticData,
  IVFProgressData,
  medicationPrescriptionData,
  StatusAndUpdatesData,
} from "../utlis/StaticData";
import toast from "react-hot-toast";
import { BsInfoCircle } from "react-icons/bs";

import PatientCalenderForm from "../components/form/PatientCalenderForm";
import tempPatientImg from "@/assets/images/patient1.png";
import Image from "next/image";
function Treatment() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setHeaderData({ title: "Treatment Plan", subtitle: "Treatment Plan" })
    );
  }, []);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [treatmentModel, setTreatmentModel] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [terminationSuccessModal, setTerminationSuccessModal] =
    useState<boolean>(false);

  const [ivfProgressData, setIvfProgressData] = useState(IVFProgressData);

  const tabOptions = [
    {
      key: "all",
      label: "All",
      content: (
        <div className="mt-3">
          <All />
        </div>
      ),
    },
    {
      key: "ivf",
      label: "IVF",
      content: (
        <div className="mt-3">
          <IVF />
        </div>
      ),
    },
    {
      key: "iui",
      label: "IUI",
      content: <div className="mt-3">IUI components</div>,
    },
    {
      key: "icsi",
      label: "ICSI",
      content: <div className="mt-3">ICSI components</div>,
    },
    {
      key: "gamete freezing",
      label: "Gamete Freezing",
      content: <div className="mt-3">Gamete Freezing components</div>,
    },
  ];

  const ProgressUpdatesStaticData = {
    patient: {
      ageAtFirstMenstruation: "",
      cycleLength: "",
      periodLength: "",
      date: "",
      isCycleRegular: "Regular",
      menstrualIssues: "yes",
      pregnancy: "yes",
      timeduration: "",
      ectopicpregnancy: "yes",
    },
    partner: {
      semenAnalysis: "yes",
      semenAnalysisContent: "",
      fertilityIssues: "no",
      fertilityIssuesContent: "",
      fertilityTreatment: "no",
      fertilityTreatmentContent: "",
      surgeries: "no",
      surgeriesContent: "",
    },
    medicalPrescription: medicationPrescriptionData,
    report: [],
    StatusAndUpdates: StatusAndUpdatesData,
  };

  const initialProgressUpdatesData = {
    patient: {
      ageAtFirstMenstruation: "",
      cycleLength: "",
      periodLength: "",
      date: "",
      isCycleRegular: "Regular",
      menstrualIssues: "yes",
      pregnancy: "yes",
      timeduration: "",
      ectopicpregnancy: "yes",
    },
    partner: {
      semenAnalysis: "yes",
      semenAnalysisContent: "",
      fertilityIssues: "no",
      fertilityIssuesContent: "",
      fertilityTreatment: "no",
      fertilityTreatmentContent: "",
      surgeries: "no",
      surgeriesContent: "",
    },
    medicalPrescription: [],
    report: [],
    StatusAndUpdates: {
      stepName: "",
      status: "",
      notes: "",
    },
  };

  const profileData = {
    name: "Rani Desai",
    image: ProfileImage.src,
    id: "PTS-874562",
    gender: "Female",
    dob: "7 Jan 1999",
    age: 31,
    joinDate: "7 Jan 2025",
    status: "Active" as const,
  };

  const [step, setStep] = useState<number | undefined>(1);
  const [stepper, setStepper] = useState<number | undefined>(1);
  const totalSteps = 3;

  const [stepsTreatment, setStepsTreatment] = useState<number | undefined>(1);
  const [stepperTreatment, setStepperTreatment] = useState<number | undefined>(
    1
  );
  const totalTreatmentSteps = 4;

  const [stepProgressUpdates, setStepProgressUpdates] = useState<
    number | undefined
  >(1);
  const [stepperProgressUpdates, setStepperProgressUpdates] = useState<
    number | undefined
  >(1);
  const totalProgressUpdatesSteps = 4;

  const [medicalPrescription, setMedicalPrescription] = useState<
    MedicationPrescriptionType[]
  >([]);
  const [medicalPrescriptionDataShowHide, setMedicalPrescriptionDataShowHide] =
    useState<boolean>(false);
  const [showEditFormShowModel, setShowEditFormShowModel] =
    useState<boolean>(false);
  const [EditFormShowModel, setEditFormShowModel] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<MedicationPrescriptionType>({
    id: "",
    medicineName: "",
    type: "",
    typeQuantity: "",
    duration: "",
    quantity: 0,
    timeslot: ["morning"],
    meal: "Before",
    intake: "",
    description: "",
  });
  const [showContent, setShowContent] = useState<boolean>(false); // for show content

  const [isAddingStep, setIsAddingStep] = useState(false);
  const [newStepName, setNewStepName] = useState("");
  const [newStepError, setNewStepError] = useState("");

  const [
    treatmentFertilityAssessmentModel,
    setTreatmentFertilityAssessmentModel,
  ] = useState<boolean>(false);
  const [editTreatmentModel, setEditTreatmentModel] = useState<boolean>(false);
  const [TreatmentTerminateModel, setTreatmentTerminateModel] =
    useState<boolean>(false);
  const [editProgressUpdatesModel, setEditProgressUpdatesModel] =
    useState<boolean>(false);
  const [patientCalendarModel, setPatientCalendarModel] =
    useState<boolean>(false);

  const [
    editMedicalPrescriptionDataShowHide,
    setEditMedicalPrescriptionDataShowHide,
  ] = useState<boolean>(false);
  const [editTreatmentData, setEditTreatmentData] =
    useState<EditTreatmentPlanType>(EditTreatmentStaticData);

  const [progressUpdatesData, setProgressUpdatesData] =
    useState<ProgressUpdatesType>(ProgressUpdatesStaticData);
  const [editProgressUpdatesData, setEditProgressUpdatesData] =
    useState<ProgressUpdatesType>(initialProgressUpdatesData);

  // const isFertilityDataEmpty = (data: TreatmentFertilityAssessmentFormType) => {
  //   const defaultValues = ["", "yes", "no", "Regular"];

    
  //   const isSectionEmpty = (section: Record<string, string>) =>
  //     Object.values(section).every((value) => defaultValues.includes(value));

  
  //   const isPatientFilled = !isSectionEmpty(data.patient as any);
  //   const isPartnerFilled = !isSectionEmpty(data.partner as any);


  //   return !(isPatientFilled && isPartnerFilled);
  // };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Success":
        return "patient-journey-badge-success";
      case "Pending":
        return "patient-journey-badge-pending";
      case "In Progress":
        return "patient-journey-badge-InProgress";
      default:
        return "badge bg-secondary";
    }
  };

  const handleSaveStep = () => {
    if (!newStepName.trim()) {
      setNewStepError("Step name is required");
      return;
    }
    const newStep = {
      id: ivfProgressData.length + 1,
      title: newStepName,
      status: "Pending" as const,
    };

    setIvfProgressData([...ivfProgressData, newStep]);
    setNewStepName("");
    setIsAddingStep(false);
    toast.success("Step added", {
      icon: <BsInfoCircle size={22} color="white" />,
    });
  };

  interface FormError {
    [key: string]: string;
  }
  const initialFormError: FormError = {};

  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [fileError, setFileError] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const panFileRef = useRef<HTMLInputElement | null>(null);
  const aadharFileRef = useRef<HTMLInputElement>(null);
  const licenceFileRef = useRef<HTMLInputElement>(null);

  interface UploadedFile {
    name: string;
    size: string;
    progress?: number;
    status: "uploading" | "completed";
    reportName: string;
    uploadedAt?: number; // timestamp (new Date().getTime())
    // KYC ADHAR,PAN,LICEN CARD
    date?: string; // For uploaded date
    preview?: string; // For preview URL or icon
    actualSize?: string; // For original file size
  }

  // Add Button click in modal open //
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      name: "MD_Gynaecologist_Certificate.pdf",
      size: "60 KB of 120 KB",
      progress: 50,
      status: "uploading",
      reportName: "",
    },
    {
      name: "MBBS_Certificate.pdf",
      size: "60 KB",
      status: "completed",
      reportName: "MBBS Certificate",
    },
  ]);

  const handleOpenModal = () => {
    setUploadedFiles([]); // reset every time modal opens
    setShowModal(true);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  //file size , file name / select file

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation rules
    const allowedTypes = [
      "image/svg+xml",
      "image/png",
      "image/jpeg",
      "application/pdf",
    ];
    const maxSize = 10 * 1024 * 1024; // 10 MB

    if (!allowedTypes.includes(file.type)) {
      setFileError(`Only SVG, PNG, JPG Allowed.`);
      return;
    }

    if (file.size > maxSize) {
      setFileError(`Exceeds 10MB limit.`);
      return;
    }

    setFileError("");

    // Check if file already uploaded

    const exists = uploadedFiles.some(
      (f) =>
        f.name === file.name && f.size === `${Math.round(file.size / 1024)} KB`
    );
    if (exists) {
      setFileError("This file is already uploaded.");
      return;
    }

    const sizeInKB = `${Math.round(file.size / 1024)} KB`;
    const fileURL = URL.createObjectURL(file);

    const newFile: UploadedFile = {
      name: file.name,
      size: sizeInKB,
      progress: 0,
      status: "uploading",
      reportName: "",
      preview: fileURL,
      uploadedAt: Date.now(), // 👈 upload date store
    };

    setSelectedFile(newFile);
    setUploadedFiles((prev) => [...prev, newFile]);
    simulateUpload(file, sizeInKB);

    e.target.value = "";
  };

  // MODAL DATA SHOW IN PERVIOUS PAGE  Qualificataion
  const simulateUpload = (file: File, totalSize: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;

      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.name === file.name
            ? {
                ...f,
                progress: Math.min(progress, 100),
                size:
                  progress < 100
                    ? `${Math.floor(
                        (progress / 100) * parseInt(totalSize)
                      )} KB of ${totalSize}`
                    : `${totalSize}`,
                status: progress >= 100 ? "completed" : "uploading",
              }
            : f
        )
      );

      if (progress >= 100) clearInterval(interval);
    }, 300);
  };

  const handleSave = () => {
    const newErrors: { [key: number]: string } = {};

    // ✅ Validation: Required + unique report names
    const reportNames: string[] = [];
    uploadedFiles.forEach((file, index) => {
      if (!file.reportName.trim()) {
        newErrors[index] = "Report Name is required";
      } else if (reportNames.includes(file.reportName.trim())) {
        newErrors[index] = "Report Name must be unique";
      } else {
        reportNames.push(file.reportName.trim());
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // stop saving
    }

    // ✅ Move completed files
    const completed = uploadedFiles.filter((f) => f.status === "completed");

    // setProgressUpdatesData((prev: any) => ({
    //   ...prev,
    //   report: [...prev.report, ...completed],
    // }));

    setUploadedFiles([]);
    setShowModal(false);
  };
  const handleClose = () => {
    setShowModal(false);
    setFileError(""); // file upload error reset (jo use karto hoy to)
  };

  // console.log("test", patientReport);

  return (
    <>
      {/* <Button
                variant="default"
                className="mx-5 my-3"
                contentSize="small"
                onClick={() => {
                    setPatientCalendarModel(true);
                }}
            >
                calender patient
            </Button> */}

      <Modal
        show={patientCalendarModel}
        onHide={() => {
          setPatientCalendarModel(false);
        }}
        header={
          <>
            <div className="d-flex gap-3">
              <Image
                src={tempPatientImg}
                className="rounded-circle"
                width={40}
                height={40}
                alt="patientimg"
              />
              <div>
                <h6 className="appointment-reschedule-profile-name mb-1">
                  Riya Gupta
                </h6>
                <div className="d-flex align-items-center gap-1">
                  <div className="d-flex align-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <path
                        d="M15.8112 13.9495C15.9151 13.8803 16.0346 13.8382 16.1588 13.8269C16.2831 13.8156 16.4082 13.8355 16.5228 13.8848L20.944 15.8657C21.093 15.9294 21.2174 16.0396 21.2985 16.1799C21.3796 16.3202 21.4132 16.4829 21.394 16.6438C21.2484 17.7323 20.7124 18.7309 19.8857 19.4537C19.059 20.1766 17.9978 20.5747 16.8997 20.5738C13.5182 20.5738 10.2751 19.2305 7.88405 16.8394C5.49296 14.4484 4.14966 11.2053 4.14966 7.82383C4.14882 6.72565 4.54686 5.66453 5.26975 4.83783C5.99264 4.01113 6.99118 3.47511 8.07966 3.32946C8.24057 3.31034 8.40334 3.34385 8.54361 3.42497C8.68388 3.50609 8.7941 3.63046 8.85779 3.77946L10.8387 8.20446C10.8874 8.31811 10.9072 8.44203 10.8964 8.56519C10.8856 8.68836 10.8445 8.80694 10.7768 8.91039L8.77341 11.2926C8.70234 11.3998 8.66032 11.5237 8.65145 11.652C8.64257 11.7803 8.66715 11.9088 8.72278 12.0248C9.4981 13.612 11.1387 15.2329 12.7306 16.0007C12.8472 16.0561 12.9762 16.0801 13.105 16.0704C13.2337 16.0607 13.3577 16.0176 13.4647 15.9454L15.8112 13.9495Z"
                        stroke="#869BB5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="patient-calendar-modal-subtitle">
                      +91 12345 67890
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <path
                        d="M15.8112 13.9495C15.9151 13.8803 16.0346 13.8382 16.1588 13.8269C16.2831 13.8156 16.4082 13.8355 16.5228 13.8848L20.944 15.8657C21.093 15.9294 21.2174 16.0396 21.2985 16.1799C21.3796 16.3202 21.4132 16.4829 21.394 16.6438C21.2484 17.7323 20.7124 18.7309 19.8857 19.4537C19.059 20.1766 17.9978 20.5747 16.8997 20.5738C13.5182 20.5738 10.2751 19.2305 7.88405 16.8394C5.49296 14.4484 4.14966 11.2053 4.14966 7.82383C4.14882 6.72565 4.54686 5.66453 5.26975 4.83783C5.99264 4.01113 6.99118 3.47511 8.07966 3.32946C8.24057 3.31034 8.40334 3.34385 8.54361 3.42497C8.68388 3.50609 8.7941 3.63046 8.85779 3.77946L10.8387 8.20446C10.8874 8.31811 10.9072 8.44203 10.8964 8.56519C10.8856 8.68836 10.8445 8.80694 10.7768 8.91039L8.77341 11.2926C8.70234 11.3998 8.66032 11.5237 8.65145 11.652C8.64257 11.7803 8.66715 11.9088 8.72278 12.0248C9.4981 13.612 11.1387 15.2329 12.7306 16.0007C12.8472 16.0561 12.9762 16.0801 13.105 16.0704C13.2337 16.0607 13.3577 16.0176 13.4647 15.9454L15.8112 13.9495Z"
                        stroke="#869BB5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="patient-calendar-modal-subtitle">
                      riya@gmail.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
        closeButton={true}
      >
        <PatientCalenderForm
          setPatientCalendarModel={setPatientCalendarModel}
        />
      </Modal>

      <>
        <div className="position-relative">
          <CustomTabs
            className="w-50"
            activeKey={activeTab}
            setActiveKey={setActiveTab}
            tabOptions={tabOptions}
          />

          <div className="position-absolute top-0 end-0">
            <Button
              variant="default"
              type="submit"
              onClick={() => {
                setTreatmentModel(true);
              }}
            >
              <div className="d-flex justify-content-center align-items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H10.9375V16.875C10.9375 17.1236 10.8387 17.3621 10.6629 17.5379C10.4871 17.7137 10.2486 17.8125 10 17.8125C9.75136 17.8125 9.5129 17.7137 9.33709 17.5379C9.16127 17.3621 9.0625 17.1236 9.0625 16.875V10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H9.0625V3.125C9.0625 2.87636 9.16127 2.6379 9.33709 2.46209C9.5129 2.28627 9.75136 2.1875 10 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z"
                    fill="#FFFFFF"
                  />
                </svg>
                Add Treatment
              </div>
            </Button>
          </div>
        </div>

        <Modal
          show={treatmentModel}
          onHide={() => {
            setTreatmentModel(false);
            setStep(1);
            setStepper(1);
            setMedicalPrescription([]);
          }}
          header="Treatment Plan"
          closeButton={true}
        >
          <TreatmentForm
            setStep={setStep}
            setStepper={setStepper}
            step={step}
            stepper={stepper}
            totalSteps={totalSteps}
            medicalPrescription={medicalPrescription}
            setMedicalPrescription={setMedicalPrescription}
            medicalPrescriptionDataShowHide={medicalPrescriptionDataShowHide}
            setMedicalPrescriptionDataShowHide={
              setMedicalPrescriptionDataShowHide
            }
            showEditFormShowModel={showEditFormShowModel}
            setShowEditFormShowModel={setShowEditFormShowModel}
            setTreatmentPlanModel={setTreatmentModel}
            setEditForm={setEditForm}
            editForm={editForm}
            setSuccessModal={setSuccessModal}
          />
        </Modal>

        {/* edittime show model for Medication & Tests */}
        <Modal
          show={showEditFormShowModel}
          onHide={() => {
            setShowEditFormShowModel(false);
            setTreatmentModel(true);
            setMedicalPrescriptionDataShowHide(false);
          }}
          header="Edit Medication Prescription"
          closeButton={true}
        >
          <MedicationPrescriptionForm
            setShowEditFormShowModel={setShowEditFormShowModel}
            editForm={editForm}
            setTreatmentPlanModel={setTreatmentModel}
            setMedicalPrescription={setMedicalPrescription}
            medicalPrescription={medicalPrescription}
            setMedicalPrescriptionDataShowHide={
              setMedicalPrescriptionDataShowHide
            }
            medicalPrescriptionDataShowHide={medicalPrescriptionDataShowHide}
          />
        </Modal>

        {/* success modal add treatment*/}
        <TreatmentSuccessModal
          successModal={successModal}
          setSuccessModal={setSuccessModal}
          setStep={setStep}
          setStepper={setStepper}
          setMedicalPrescription={setMedicalPrescription}
          setShowContent={setShowContent}
        />
      </>
    </>
  );
}

export default Treatment;
