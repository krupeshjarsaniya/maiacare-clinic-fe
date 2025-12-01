"use client";

import { useRef, useState } from "react";
import ContentContainer from "./ui/ContentContainer";
import CustomTabs from "./ui/CustomTabs";
import { All, IVF } from "./TreatmentHeaderComponent";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { TreatmentForm } from "./TreatmentForm";
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
} from "./form/TreatmentAllForm";
import ProfileImage from "@/assets/images/patient_profile.png";
import { ProfileCard } from "./ui/custom/ProfileCard";
import { Accordion, Col, Dropdown, Row } from "react-bootstrap";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { InputFieldGroup } from "./ui/InputField";
import {
  EditTreatmentStaticData,
  IVFProgressData,
  medicationPrescriptionData,
  StatusAndUpdatesData,
} from "../utlis/StaticData";
import toast from "react-hot-toast";
import { BsInfoCircle } from "react-icons/bs";
import TreatmentFertilityAssessment from "../components/TreatmentFertilityAssessment";
import TreatmentEditForm from "./TreatmentEditForm";
import { ProgressUpdatesEditForm } from "./ProgressUpdatesEditForm";
import PatientCalenderForm from "./form/PatientCalenderForm";
import tempPatientImg from "@/assets/images/patient-img-1.png";
import Image from "next/image";

import Jpgimg from "@/assets/images/Jpgimg.png";
import PDFAddhar from "@/assets/images/Pdfimg.png";
import pdfimg from "@/assets/images/Pdfimg.png";
import uplodimg from "@/assets/images/Uploadimg.png";
import EditProfile from "@/assets/images/EditProfile.png";
import GreenRight from "@/assets/images/GreenRight.png";
import Trash from "@/assets/images/Trash.png";
import Cross from "@/assets/images/Cross.png";
import Delete from "@/assets/images/Delete.png";
import Pluslight from "@/assets/images/Pluslight.png";
import Add from "@/assets/images/Add.png";
import Loading from "@/assets/images/Loading.png";
import Completed from "@/assets/images/Completed.png";
import { ArrowLeft, ArrowRight } from "lucide-react";

function TreatmentPatient() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [treatmentModel, setTreatmentModel] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [terminationSuccessModal, setTerminationSuccessModal] =
    useState<boolean>(false);
  // console.log("terminationSuccessModal", terminationSuccessModal);

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

  const isFertilityDataEmpty = (data: TreatmentFertilityAssessmentFormType) => {
    const defaultValues = ["", "yes", "no", "Regular"];

    const isSectionEmpty = (section: object) =>
      Object.values(section as Record<string, unknown>).every((value) =>
        defaultValues.includes(String(value ?? ""))
      );

    const isPatientFilled = !isSectionEmpty(data.patient);
    const isPartnerFilled = !isSectionEmpty(data.partner);

    return !(isPatientFilled && isPartnerFilled);
  };

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

    if (Object.keys(newErrors).length > 0) return;

    const completed = uploadedFiles.filter((f) => f.status === "completed");

    setProgressUpdatesData((prev: ProgressUpdatesDataType) => ({
      ...prev,
      report: [...prev.report, ...completed],
    }));

    setUploadedFiles([]);
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
    setFileError(""); // file upload error reset (jo use karto hoy to)
  };

  return (
    <>
      <ProfileCard
        name={profileData.name}
        image={profileData.image}
        id={profileData.id}
        gender={profileData.gender}
        dob={profileData.dob}
        age={profileData.age}
        joinDate={profileData.joinDate}
        status={profileData.status}
      />

      <Row className="g-3 mt-0">
        <Col lg={5}>
          <ContentContainer>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6 className="accordion-title m-0">IVF progress</h6>
              <Dropdown align="end" className="d-flex align-items-center">
                <Dropdown.Toggle
                  as="button"
                  id="dropdown-basic"
                  className="bg-transparent border-0 p-1 no-caret"
                >
                  <div className="patient-profile-dot">
                    <HiOutlineDotsHorizontal />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dots-open">
                  <Dropdown.Item className="no-hover">
                    <div
                      className="d-flex align-items-center gap-2"
                      onClick={() => {
                        setEditTreatmentModel(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M13.5484 3.40848L10.7553 0.615983C10.5209 0.381644 10.203 0.25 9.87157 0.25C9.54011 0.25 9.22223 0.381644 8.98782 0.615983L1.28032 8.32286C1.16385 8.43861 1.0715 8.57633 1.00863 8.72803C0.945765 8.87973 0.913622 9.0424 0.914067 9.20661V11.9997C0.914067 12.3313 1.04576 12.6492 1.28018 12.8836C1.5146 13.118 1.83255 13.2497 2.16407 13.2497H12.6641C12.863 13.2497 13.0537 13.1707 13.1944 13.0301C13.3351 12.8894 13.4141 12.6986 13.4141 12.4997C13.4141 12.3008 13.3351 12.1101 13.1944 11.9694C13.0537 11.8288 12.863 11.7497 12.6641 11.7497H6.97657L13.5484 5.17661C13.6646 5.06053 13.7567 4.92271 13.8195 4.77102C13.8824 4.61933 13.9147 4.45674 13.9147 4.29255C13.9147 4.12835 13.8824 3.96576 13.8195 3.81407C13.7567 3.66238 13.6646 3.52456 13.5484 3.40848ZM4.85157 11.7497H2.41407V9.31223L7.66407 4.06223L10.1016 6.49973L4.85157 11.7497ZM11.1641 5.43723L8.72657 2.99973L9.87282 1.85348L12.3103 4.29098L11.1641 5.43723Z"
                          fill="#2B4360"
                        />
                      </svg>
                      <span className="settings-accordion-subtitle m-0">
                        Edit
                      </span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className="no-hover">
                    <div
                      className="d-flex align-items-center gap-2"
                      onClick={() => {
                        setTreatmentTerminateModel(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M11.4018 10.4735C11.5251 10.5968 11.5943 10.764 11.5943 10.9383C11.5943 11.1127 11.5251 11.2799 11.4018 11.4032C11.2785 11.5265 11.1113 11.5957 10.9369 11.5957C10.7626 11.5957 10.5954 11.5265 10.4721 11.4032L6.99998 7.92997L3.52677 11.4021C3.40349 11.5254 3.23628 11.5946 3.06193 11.5946C2.88758 11.5946 2.72037 11.5254 2.59709 11.4021C2.4738 11.2788 2.40454 11.1116 2.40454 10.9372C2.40454 10.7629 2.4738 10.5957 2.59709 10.4724L6.07029 7.00028L2.59818 3.52708C2.4749 3.40379 2.40563 3.23658 2.40563 3.06223C2.40563 2.88788 2.4749 2.72067 2.59818 2.59739C2.72146 2.4741 2.88867 2.40484 3.06302 2.40484C3.23737 2.40484 3.40458 2.4741 3.52787 2.59739L6.99998 6.07059L10.4732 2.59684C10.5965 2.47356 10.7637 2.4043 10.938 2.4043C11.1124 2.4043 11.2796 2.47356 11.4029 2.59684C11.5262 2.72013 11.5954 2.88733 11.5954 3.06169C11.5954 3.23604 11.5262 3.40324 11.4029 3.52653L7.92966 7.00028L11.4018 10.4735Z"
                          fill="#E85966"
                        />
                      </svg>
                      <span className="appoiment-dots-open-danger m-0">
                        Terminate
                      </span>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Modal
                show={editTreatmentModel}
                onHide={() => {
                  setEditTreatmentModel(false);
                  setEditTreatmentData(EditTreatmentStaticData);
                  setStepsTreatment(1);
                  setStepperTreatment(1);
                }}
                header="Treatment Plan"
                closeButton={true}
              >
                <TreatmentEditForm
                  setStep={setStepsTreatment}
                  step={stepsTreatment}
                  setStepper={setStepperTreatment}
                  stepper={stepperTreatment}
                  totalSteps={totalTreatmentSteps}
                  editTreatmentData={editTreatmentData}
                  setEditTreatmentData={setEditTreatmentData}
                  medicalPrescriptionDataShowHide={
                    editMedicalPrescriptionDataShowHide
                  }
                  setMedicalPrescriptionDataShowHide={
                    setEditMedicalPrescriptionDataShowHide
                  }
                  setEditForm={setEditForm}
                  setShowEditFormShowModel={setShowEditFormShowModel}
                  setTreatmentPlanModel={setEditTreatmentModel}
                />
              </Modal>

              <Modal
                show={TreatmentTerminateModel}
                onHide={() => {
                  setTreatmentTerminateModel(false);
                }}
                header="Request to Terminate Treatment"
                closeButton={true}
              >
                <TreatmentTerminate
                  setSuccessModal={setTerminationSuccessModal}
                  setTreatmentTerminateModel={setTreatmentTerminateModel}
                />
              </Modal>

              {/* success modal Termination */}
              <TerminationSuccessModal
                successModal={terminationSuccessModal}
                setSuccessModal={setTerminationSuccessModal}
              />

              {/* edit time show model for IVF progress */}
              <Modal
                show={showEditFormShowModel}
                onHide={() => {
                  setShowEditFormShowModel(false);
                  setEditTreatmentModel(true);
                  setMedicalPrescriptionDataShowHide(false);
                }}
                header="Edit Medication Prescription"
                closeButton={true}
              >
                <MedicationPrescriptionForm
                  setShowEditFormShowModel={setShowEditFormShowModel}
                  editForm={editForm}
                  setTreatmentPlanModel={setEditTreatmentModel}
                  setMedicalPrescription={(newPrescriptions) =>
                    setEditTreatmentData((prev) => ({
                      ...prev,
                      medicalPrescription:
                        typeof newPrescriptions === "function"
                          ? newPrescriptions(prev.medicalPrescription)
                          : newPrescriptions,
                    }))
                  }
                  medicalPrescription={medicalPrescription}
                  setMedicalPrescriptionDataShowHide={
                    setMedicalPrescriptionDataShowHide
                  }
                  medicalPrescriptionDataShowHide={
                    medicalPrescriptionDataShowHide
                  }
                />
              </Modal>
            </div>

            {ivfProgressData.map((item, index) => {
              const isLastItem = index === ivfProgressData.length - 1;

              return (
                <div
                  className={`position-relative ${
                    !isLastItem ? "patient-journey-box-wrapper" : ""
                  }`}
                  key={item.id}
                >
                  <div
                    className={`patient-journey-box shadow-sm ms-5 mb-3  ${
                      item.status == "Success"
                        ? "patient-journey-success-box"
                        : "patient-journey-other-box"
                    } `}
                    key={item.id}
                  >
                    <div className="patient-journey-box-item d-flex align-items-start justify-content-between">
                      <div>
                        <h6 className="doctor-listing-modal-patient-name mb-1">
                          {item.title}
                        </h6>
                        {(item.date || item.time) && (
                          <p className="patient-journey-box-subtitle mb-0">
                            {item.date} , {item.time}
                          </p>
                        )}
                        {item.Complete && (
                          <span className="ivf-progress-completed">
                            {item.Complete}% Completed
                          </span>
                        )}
                      </div>
                      <div>
                        <span className={getStatusBadgeClass(item.status)}>
                          {item.status}
                        </span>
                      </div>
                    </div>

                    <div className="position-absolute start-0 patient-journey-dot">
                      {item.status == "Success" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="29"
                          height="29"
                          viewBox="0 0 29 29"
                          fill="none"
                        >
                          <g filter="url(#filter0_d_2106_90109)">
                            <rect
                              x="2.16406"
                              y="1.33984"
                              width="24"
                              height="24"
                              rx="12"
                              fill="white"
                            />
                            <rect
                              x="2.66406"
                              y="1.83984"
                              width="23"
                              height="23"
                              rx="11.5"
                              stroke="#DDE1E8"
                            />
                            <circle
                              cx="14.1641"
                              cy="13.3398"
                              r="4"
                              fill="#2ECF98"
                            />
                          </g>
                          <defs>
                            <filter
                              id="filter0_d_2106_90109"
                              x="0.164062"
                              y="0.339844"
                              width="28"
                              height="28"
                              filterUnits="userSpaceOnUse"
                              colorInterpolationFilters="sRGB"
                            >
                              <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset dy="1" />
                              <feGaussianBlur stdDeviation="1" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_2106_90109"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_2106_90109"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </svg>
                      ) : item.status == "In Progress" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="29"
                          height="29"
                          viewBox="0 0 29 29"
                          fill="none"
                        >
                          <g filter="url(#filter0_d_2290_224549)">
                            <rect
                              x="2.50317"
                              y="1.70312"
                              width="24"
                              height="24"
                              rx="12"
                              fill="white"
                            />
                            <rect
                              x="3.00317"
                              y="2.20312"
                              width="23"
                              height="23"
                              rx="11.5"
                              stroke="#DDE1E8"
                            />
                            <circle
                              cx="14.5032"
                              cy="13.7031"
                              r="4"
                              fill="#F4C47E"
                            />
                          </g>
                          <defs>
                            <filter
                              id="filter0_d_2290_224549"
                              x="0.503174"
                              y="0.703125"
                              width="28"
                              height="28"
                              filterUnits="userSpaceOnUse"
                              colorInterpolationFilters="sRGB"
                            >
                              <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset dy="1" />
                              <feGaussianBlur stdDeviation="1" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_2290_224549"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_2290_224549"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="29"
                          height="29"
                          viewBox="0 0 29 29"
                          fill="none"
                        >
                          <g filter="url(#filter0_d_2290_224554)">
                            <rect
                              x="2.50317"
                              y="1.70312"
                              width="24"
                              height="24"
                              rx="12"
                              fill="white"
                            />
                            <rect
                              x="3.00317"
                              y="2.20312"
                              width="23"
                              height="23"
                              rx="11.5"
                              stroke="#DDE1E8"
                            />
                            <circle
                              cx="14.5032"
                              cy="13.7031"
                              r="4"
                              fill="#DDE1E8"
                            />
                          </g>
                          <defs>
                            <filter
                              id="filter0_d_2290_224554"
                              x="0.503174"
                              y="0.703125"
                              width="28"
                              height="28"
                              filterUnits="userSpaceOnUse"
                              colorInterpolationFilters="sRGB"
                            >
                              <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset dy="1" />
                              <feGaussianBlur stdDeviation="1" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_2290_224554"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_2290_224554"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Add new step form */}
            {isAddingStep ? (
              <div className="position-relative patient-journey-add-steps-box-wrapper">
                <div className="patient-journey-box shadow-sm ms-5 mb-3 patient-journey-other-box">
                  <InputFieldGroup
                    label="Treatment Steps"
                    name="treatmentSteps"
                    type="text"
                    value={newStepName}
                    onChange={(e) => {
                      setNewStepName(e.target.value);
                      setNewStepError("");
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                    placeholder="Enter treament steps"
                    required={true}
                    disabled={false}
                    readOnly={false}
                    error={newStepError}
                  />

                  <div className="d-flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      className="w-100"
                      contentSize="small"
                      onClick={() => {
                        setIsAddingStep(false);
                        setNewStepName("");
                        setNewStepError("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="default"
                      className="w-100"
                      contentSize="small"
                      type="submit"
                      onClick={handleSaveStep}
                    >
                      Save
                    </Button>
                  </div>

                  <div className="position-absolute start-0 patient-journey-dot-add-steps">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="29"
                      viewBox="0 0 29 29"
                      fill="none"
                    >
                      <g filter="url(#filter0_d_2290_224554)">
                        <rect
                          x="2.50317"
                          y="1.70312"
                          width="24"
                          height="24"
                          rx="12"
                          fill="white"
                        />
                        <rect
                          x="3.00317"
                          y="2.20312"
                          width="23"
                          height="23"
                          rx="11.5"
                          stroke="#DDE1E8"
                        />
                        <circle
                          cx="14.5032"
                          cy="13.7031"
                          r="4"
                          fill="#DDE1E8"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <Button
                variant="default"
                type="submit"
                className="mt-3"
                onClick={() => setIsAddingStep(true)}
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
                  Add New Step
                </div>
              </Button>
            )}
          </ContentContainer>
        </Col>
        <Col lg={7}>
          <ContentContainer>
            <h6 className="accordion-title m-0">Progress Updates</h6>
            <div className="progressUpdates-border-box mt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="d-flex gap-2">
                    <h6 className="doctor-listing-modal-profile-title m-0">
                      Fertility Assessment
                    </h6>
                    <span className="patient-journey-badge-InProgress">
                      In Progress
                    </span>
                  </div>
                  <p className="patient-journey-box-subtitle m-0">
                    09 Jul 2024 , 12:11 PM
                  </p>
                </div>
                <Button
                  variant="outline"
                  contentSize="small"
                  onClick={() => {
                    setEditProgressUpdatesModel(true);
                    setEditProgressUpdatesData(progressUpdatesData);
                  }}
                >
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M13.5484 3.40848L10.7553 0.615983C10.5209 0.381644 10.203 0.25 9.87157 0.25C9.54011 0.25 9.22223 0.381644 8.98782 0.615983L1.28032 8.32286C1.16385 8.43861 1.0715 8.57633 1.00863 8.72803C0.945765 8.87973 0.913622 9.0424 0.914067 9.20661V11.9997C0.914067 12.3313 1.04576 12.6492 1.28018 12.8836C1.5146 13.118 1.83255 13.2497 2.16407 13.2497H12.6641C12.863 13.2497 13.0537 13.1707 13.1944 13.0301C13.3351 12.8894 13.4141 12.6986 13.4141 12.4997C13.4141 12.3008 13.3351 12.1101 13.1944 11.9694C13.0537 11.8288 12.863 11.7497 12.6641 11.7497H6.97657L13.5484 5.17661C13.6646 5.06053 13.7567 4.92271 13.8195 4.77102C13.8824 4.61933 13.9147 4.45674 13.9147 4.29255C13.9147 4.12835 13.8824 3.96576 13.8195 3.81407C13.7567 3.66238 13.6646 3.52456 13.5484 3.40848ZM4.85157 11.7497H2.41407V9.31223L7.66407 4.06223L10.1016 6.49973L4.85157 11.7497ZM11.1641 5.43723L8.72657 2.99973L9.87282 1.85348L12.3103 4.29098L11.1641 5.43723Z"
                        fill="#2B4360"
                      />
                    </svg>
                    Edit
                  </div>
                </Button>

                <Modal
                  show={editProgressUpdatesModel}
                  onHide={() => {
                    setEditProgressUpdatesModel(false);
                    setStepProgressUpdates(1);
                    setStepperProgressUpdates(1);
                  }}
                  header="Edit Fertility Assessment"
                  closeButton={true}
                >
                  <ProgressUpdatesEditForm
                    setStep={setStepProgressUpdates}
                    setStepper={setStepperProgressUpdates}
                    step={stepProgressUpdates}
                    stepper={stepperProgressUpdates}
                    totalSteps={totalProgressUpdatesSteps}
                    editProgressUpdatesData={editProgressUpdatesData}
                    setModalFormFertilityData={setProgressUpdatesData}
                    progressUpdatesData={progressUpdatesData}
                    medicalPrescriptionDataShowHide={
                      medicalPrescriptionDataShowHide
                    }
                    setMedicalPrescriptionDataShowHide={
                      setMedicalPrescriptionDataShowHide
                    }
                    setEditProgressUpdatesModel={setEditProgressUpdatesModel}
                    setEditForm={setEditForm}
                    setShowEditFormShowModel={setEditFormShowModel}
                    setTreatmentPlanModel={setEditProgressUpdatesModel}
                  />
                </Modal>

                {/* edit time show model for Progress Updates */}
                <Modal
                  show={EditFormShowModel}
                  onHide={() => {
                    setEditFormShowModel(false);
                    setEditProgressUpdatesModel(true);
                    setMedicalPrescriptionDataShowHide(false);
                  }}
                  header="Edit Medication Prescription"
                  closeButton={true}
                >
                  <MedicationPrescriptionForm
                    setShowEditFormShowModel={setEditFormShowModel}
                    editForm={editForm}
                    setTreatmentPlanModel={setEditProgressUpdatesModel}
                    setMedicalPrescription={(newPrescriptions) =>
                      setProgressUpdatesData((prev) => ({
                        ...prev,
                        medicalPrescription:
                          typeof newPrescriptions === "function"
                            ? newPrescriptions(prev.medicalPrescription)
                            : newPrescriptions,
                      }))
                    }
                    medicalPrescription={medicalPrescription}
                    setMedicalPrescriptionDataShowHide={
                      setMedicalPrescriptionDataShowHide
                    }
                    medicalPrescriptionDataShowHide={
                      medicalPrescriptionDataShowHide
                    }
                  />
                </Modal>
              </div>

              {isFertilityDataEmpty(progressUpdatesData) ? (
                <div className="progressUpdates-border-box text-center mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="65"
                    height="64"
                    viewBox="0 0 65 64"
                    fill="none"
                  >
                    <path
                      d="M59.748 31.7903C58.778 30.3103 58.768 28.3903 59.728 26.9003L59.758 26.8603C61.918 23.5103 60.438 19.0203 56.708 17.6103H56.678C55.008 16.9703 53.878 15.4103 53.788 13.6303V13.5803C53.588 9.58029 49.738 6.80029 45.878 7.86029C44.168 8.33029 42.338 7.74029 41.218 6.37029L41.168 6.31029C38.658 3.22029 33.938 3.23029 31.448 6.33029L31.408 6.39029C30.298 7.77029 28.478 8.36029 26.768 7.90029L26.708 7.88029C22.848 6.84029 19.018 9.64029 18.838 13.6303V13.6603C18.758 15.4403 17.628 17.0003 15.958 17.6403H15.928C12.198 19.0803 10.738 23.5903 12.928 26.9303C13.898 28.4103 13.908 30.3303 12.948 31.8203L12.918 31.8603C10.758 35.2103 12.238 39.7003 15.968 41.1103H15.998C17.668 41.7503 18.798 43.3103 18.888 45.0903V45.1403C19.088 49.1403 22.938 51.9203 26.798 50.8603C28.508 50.3903 30.338 50.9803 31.458 52.3503L31.508 52.4103C34.018 55.5003 38.738 55.4903 41.228 52.3903L41.268 52.3303C42.378 50.9503 44.198 50.3603 45.908 50.8203L45.968 50.8403C49.828 51.8803 53.658 49.0803 53.838 45.0903V45.0603C53.918 43.2803 55.048 41.7203 56.718 41.0803H56.748C60.478 39.6403 61.938 35.1303 59.748 31.7903Z"
                      fill="#B0B4C1"
                    />
                    <path
                      d="M36.3279 47.0499C46.0979 47.0499 54.0179 39.1298 54.0179 29.3599C54.0179 19.59 46.0979 11.6699 36.3279 11.6699C26.558 11.6699 18.6379 19.59 18.6379 29.3599C18.6379 39.1298 26.558 47.0499 36.3279 47.0499Z"
                      fill="#DDE1E8"
                    />
                    <path
                      d="M41.7479 28.5096C44.4265 28.5096 46.5979 26.3382 46.5979 23.6596C46.5979 20.981 44.4265 18.8096 41.7479 18.8096C39.0694 18.8096 36.8979 20.981 36.8979 23.6596C36.8979 26.3382 39.0694 28.5096 41.7479 28.5096Z"
                      fill="#B0B4C1"
                    />
                    <path
                      d="M35.6381 17.1904H34.2481C33.6981 17.1904 33.2481 16.7404 33.2481 16.1904C33.2481 15.6404 33.6981 15.1904 34.2481 15.1904H35.6381C36.1881 15.1904 36.6381 15.6404 36.6381 16.1904C36.6381 16.7404 36.1881 17.1904 35.6381 17.1904ZM28.7581 21.0504H27.3681C26.8181 21.0504 26.3681 20.6004 26.3681 20.0504C26.3681 19.5004 26.8181 19.0504 27.3681 19.0504H28.7581C29.3081 19.0504 29.7581 19.5004 29.7581 20.0504C29.7581 20.6004 29.3081 21.0504 28.7581 21.0504ZM32.7481 26.8104H31.3581C30.8081 26.8104 30.3581 26.3604 30.3581 25.8104C30.3581 25.2604 30.8081 24.8104 31.3581 24.8104H32.7481C33.2981 24.8104 33.7481 25.2604 33.7481 25.8104C33.7481 26.3604 33.2981 26.8104 32.7481 26.8104ZM24.4281 29.5204H23.0381C22.4881 29.5204 22.0381 29.0704 22.0381 28.5204C22.0381 27.9704 22.4881 27.5204 23.0381 27.5204H24.4281C24.9781 27.5204 25.4281 27.9704 25.4281 28.5204C25.4281 29.0704 24.9781 29.5204 24.4281 29.5204ZM41.2381 42.8604H39.8481C39.2981 42.8604 38.8481 42.4104 38.8481 41.8604C38.8481 41.3104 39.2981 40.8604 39.8481 40.8604H41.2381C41.7881 40.8604 42.2381 41.3104 42.2381 41.8604C42.2381 42.4104 41.7881 42.8604 41.2381 42.8604ZM43.5281 35.6404H42.1381C41.5881 35.6404 41.1381 35.1904 41.1381 34.6404C41.1381 34.0904 41.5881 33.6404 42.1381 33.6404H43.5281C44.0781 33.6404 44.5281 34.0904 44.5281 34.6404C44.5281 35.1904 44.0781 35.6404 43.5281 35.6404ZM50.7081 30.3604H49.3181C48.7681 30.3604 48.3181 29.9104 48.3181 29.3604C48.3181 28.8104 48.7681 28.3604 49.3181 28.3604H50.7081C51.2581 28.3604 51.7081 28.8104 51.7081 29.3604C51.7081 29.9104 51.2581 30.3604 50.7081 30.3604Z"
                      fill="#B0B4C1"
                    />
                    <path
                      d="M35.1381 31.3099C33.0181 29.1899 26.7481 32.0399 24.6281 34.1499C23.0881 35.6899 22.6881 37.9199 23.3781 39.8299H23.2881C23.0281 40.5099 22.6581 41.1299 22.0981 41.5999C20.8081 42.6799 19.3681 43.3399 18.0881 43.9199C16.4881 44.6399 15.1081 45.2699 14.5681 46.4799C14.3581 46.9499 13.9581 48.1799 13.5581 49.3599C12.8781 51.3999 12.1881 53.4999 11.7281 54.2599C11.1081 55.2899 9.67807 56.0199 8.16807 56.7899C6.84807 57.4599 4.62807 58.5899 4.73807 59.5099C4.73807 59.5399 4.74807 59.5999 4.85807 59.7499C7.79807 60.6799 13.2381 58.9299 14.7081 57.3699C15.2781 56.7599 16.1481 54.4799 16.8381 52.6399C17.5381 50.7899 18.1381 49.1999 18.6781 48.4499C19.4281 47.3999 20.9681 46.7799 22.5881 46.1299C23.7581 45.6599 24.9481 45.1899 25.8781 44.5399C26.2681 44.2699 26.5381 43.8199 26.7381 43.2799L26.7081 43.0999C28.5981 43.7399 30.7781 43.3299 32.2781 41.8199C34.3981 39.6999 37.2381 33.4299 35.1181 31.3199L35.1381 31.3099Z"
                      fill="#9296A3"
                    />
                  </svg>
                  <p className="medication-prescription-accordion-subtitle mb-2">
                    No fertility assessment
                  </p>
                  <Button
                    variant="default"
                    type="submit"
                    contentSize="small"
                    onClick={() => {
                      setTreatmentFertilityAssessmentModel(true);
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
                      Start Assesment
                    </div>
                  </Button>

                  <Modal
                    show={treatmentFertilityAssessmentModel}
                    onHide={() => {
                      setTreatmentFertilityAssessmentModel(false);
                    }}
                    header="Fertility Assessment"
                    closeButton={true}
                  >
                    <TreatmentFertilityAssessment
                      setTreatmentFertilityAssessmentModel={
                        setTreatmentFertilityAssessmentModel
                      }
                      setTreatmentFertilityAssessmentData={
                        setProgressUpdatesData
                      }
                    />
                  </Modal>
                </div>
              ) : (
                <Row className="g-3 mt-2">
                  <Col md={6}>
                    <p className="patient-treatment-box-subtitle mb-2">
                      Patient
                    </p>
                    <Accordion>
                      <Accordion.Item
                        eventKey="0"
                        className="phisical-assessment-accordion-item mb-2"
                      >
                        <Accordion.Header>
                          <div className="d-flex justify-content-center align-items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0 0 35 35"
                              fill="none"
                            >
                              <rect
                                x="0.399414"
                                y="0.5"
                                width="34"
                                height="34"
                                rx="6"
                                fill="#0062D2"
                                fillOpacity="0.2"
                              />
                              <path
                                d="M25.7697 9.79492H25.3824C25.2609 9.79492 25.1624 9.89346 25.1624 10.0149C25.1624 10.1364 25.2609 10.2349 25.3824 10.2349H25.7697C26.0911 10.2349 26.3523 10.4962 26.3523 10.8176V26.0852C26.3523 26.4058 26.0916 26.6665 25.7711 26.6665H9.02904C8.70849 26.6665 8.44781 26.4058 8.44781 26.0852V10.8176C8.44781 10.4962 8.70906 10.2349 9.03047 10.2349H9.41776C9.53922 10.2349 9.63776 10.1364 9.63776 10.0149C9.63776 9.89346 9.53922 9.79492 9.41776 9.79492H9.03047C8.46643 9.79492 8.00781 10.2535 8.00781 10.8176V26.0852C8.00781 26.6484 8.46586 27.1065 9.02904 27.1065H25.7711C26.3343 27.1065 26.7923 26.6484 26.7923 26.0852V10.8176C26.7923 10.2535 26.3337 9.79492 25.7697 9.79492Z"
                                fill="#0062D2"
                                stroke="#0062D2"
                                strokeWidth="0.289362"
                              />
                              <path
                                d="M11.1893 11.7314C11.3108 11.7314 11.4093 11.6329 11.4093 11.5114C11.4093 11.3899 11.3108 11.2914 11.1893 11.2914C10.7708 11.2914 10.4039 10.5999 10.4039 9.81185C10.4039 9.0238 10.7708 8.33258 11.1893 8.33258C11.4271 8.33258 11.6683 8.56661 11.8187 8.94331C11.8639 9.05617 11.9917 9.11232 12.1046 9.06591C12.2174 9.02094 12.2724 8.89289 12.2272 8.78003C12.0055 8.2243 11.6173 7.89258 11.1893 7.89258C10.5021 7.89258 9.96387 8.73563 9.96387 9.81185C9.96387 10.8884 10.5021 11.7314 11.1893 11.7314ZM14.5535 8.33258C14.7913 8.33258 15.0325 8.56661 15.1829 8.94331C15.2278 9.05617 15.3556 9.11232 15.4687 9.06591C15.5816 9.02094 15.6366 8.89289 15.5913 8.78003C15.3696 8.2243 14.9815 7.89258 14.5535 7.89258C13.8663 7.89258 13.328 8.73563 13.328 9.81185C13.328 10.8884 13.8663 11.7314 14.5535 11.7314C14.675 11.7314 14.7735 11.6329 14.7735 11.5114C14.7735 11.3899 14.675 11.2914 14.5535 11.2914C14.135 11.2914 13.768 10.5999 13.768 9.81185C13.768 9.0238 14.135 8.33258 14.5535 8.33258ZM17.9177 7.89258C17.2305 7.89258 16.6922 8.73563 16.6922 9.81185C16.6922 10.8884 17.2305 11.7314 17.9177 11.7314C18.0391 11.7314 18.1377 11.6329 18.1377 11.5114C18.1377 11.3899 18.0391 11.2914 17.9177 11.2914C17.4992 11.2914 17.1322 10.5999 17.1322 9.81185C17.1322 9.0238 17.4992 8.33258 17.9177 8.33258C18.1554 8.33258 18.3966 8.56661 18.5473 8.94331C18.5926 9.05617 18.7212 9.11089 18.8332 9.06591C18.9461 9.02094 19.0011 8.89289 18.9558 8.78003C18.7335 8.2243 18.3456 7.89258 17.9177 7.89258ZM21.2818 7.89258C20.5949 7.89258 20.0567 8.73563 20.0567 9.81185C20.0567 10.8884 20.5949 11.7314 21.2818 11.7314C21.4033 11.7314 21.5018 11.6329 21.5018 11.5114C21.5018 11.3899 21.4033 11.2914 21.2818 11.2914C20.8636 11.2914 20.4967 10.5999 20.4967 9.81185C20.4967 9.0238 20.8636 8.33258 21.2818 8.33258C21.5196 8.33258 21.7608 8.56661 21.9115 8.94331C21.9564 9.05617 22.0851 9.11089 22.1974 9.06591C22.3102 9.02094 22.3652 8.89289 22.32 8.78003C22.0977 8.2243 21.7098 7.89258 21.2818 7.89258ZM24.6463 7.89258C23.9591 7.89258 23.4208 8.73563 23.4208 9.81185C23.4208 10.8884 23.9591 11.7314 24.6463 11.7314C24.7677 11.7314 24.8663 11.6329 24.8663 11.5114C24.8663 11.3899 24.7677 11.2914 24.6463 11.2914C24.2278 11.2914 23.8608 10.5999 23.8608 9.81185C23.8608 9.0238 24.2278 8.33258 24.6463 8.33258C24.8838 8.33258 25.125 8.56661 25.2756 8.94331C25.3209 9.05617 25.4498 9.11089 25.5615 9.06591C25.6744 9.02094 25.7294 8.89289 25.6841 8.78003C25.4618 8.2243 25.074 7.89258 24.6463 7.89258Z"
                                fill="#0062D2"
                                stroke="#0062D2"
                                strokeWidth="0.289362"
                              />
                              <path
                                d="M12.7851 10.0149C12.7851 9.89346 12.6865 9.79492 12.5651 9.79492H11.4041C11.2826 9.79492 11.1841 9.89346 11.1841 10.0149C11.1841 10.1364 11.2826 10.2349 11.4041 10.2349H12.5651C12.6865 10.2349 12.7851 10.1364 12.7851 10.0149ZM15.9674 10.2349C16.0888 10.2349 16.1874 10.1364 16.1874 10.0149C16.1874 9.89346 16.0888 9.79492 15.9674 9.79492H14.8063C14.6849 9.79492 14.5863 9.89346 14.5863 10.0149C14.5863 10.1364 14.6849 10.2349 14.8063 10.2349H15.9674ZM17.9296 10.0149C17.9296 10.1364 18.0281 10.2349 18.1496 10.2349H19.3109C19.4324 10.2349 19.5309 10.1364 19.5309 10.0149C19.5309 9.89346 19.4324 9.79492 19.3109 9.79492H18.1496C18.0281 9.79492 17.9296 9.89346 17.9296 10.0149ZM22.533 9.79492H21.372C21.2505 9.79492 21.152 9.89346 21.152 10.0149C21.152 10.1364 21.2505 10.2349 21.372 10.2349H22.533C22.6544 10.2349 22.753 10.1364 22.753 10.0149C22.753 9.89346 22.6544 9.79492 22.533 9.79492ZM12.1437 13.3567C11.4413 13.3567 10.8701 13.9279 10.8701 14.6301V23.3533C10.8701 24.0418 11.4271 24.6266 12.1437 24.6266H20.7071C20.8286 24.6266 20.9271 24.528 20.9271 24.4066C20.9271 24.2851 20.8286 24.1866 20.7071 24.1866H12.1437C11.6716 24.1866 11.3101 23.8009 11.3101 23.3533V14.6301C11.3101 14.1706 11.6839 13.7967 12.1437 13.7967H23.0887C23.5482 13.7967 23.922 14.1706 23.922 14.6301V21.6577C23.922 21.748 23.8879 21.8336 23.8263 21.8989L22.1251 23.6999C22.0671 23.7613 21.9666 23.7233 21.9543 23.667L21.7298 21.652C21.7175 21.59 21.7652 21.5314 21.8292 21.5314H22.3817C22.5032 21.5314 22.6017 21.4329 22.6017 21.3114C22.6017 21.1899 22.5032 21.0914 22.3817 21.0914H21.8292C21.4804 21.0914 21.235 21.417 21.2952 21.7182L21.5198 23.7328C21.6042 24.1707 22.1454 24.3192 22.4448 24.0021L24.146 22.2011C24.2852 22.0539 24.362 21.8608 24.362 21.6577V14.6301C24.362 13.9279 23.7908 13.3567 23.0887 13.3567H12.1437Z"
                                fill="#0062D2"
                                stroke="#0062D2"
                                strokeWidth="0.289362"
                              />
                              <path
                                d="M17.6503 17.6144C17.7079 17.7212 17.8411 17.7622 17.9482 17.7043C18.0554 17.6468 18.0955 17.5136 18.0382 17.4064C17.6019 16.594 17.0774 15.7911 16.8717 15.4834C16.7307 15.2734 16.4235 15.274 16.2839 15.4837C15.7185 16.3296 14.4033 18.3996 14.4033 19.3535C14.4033 20.5526 15.3787 21.528 16.5778 21.528C16.6993 21.528 16.7978 21.4295 16.7978 21.308C16.7978 21.1865 16.6993 21.088 16.5778 21.088C15.6213 21.088 14.8433 20.31 14.8433 19.3535C14.8433 18.6915 15.7259 17.1237 16.5778 15.8364C16.813 16.1924 17.2673 16.9005 17.6503 17.6144Z"
                                fill="#0062D2"
                                stroke="#0062D2"
                                strokeWidth="0.289362"
                              />
                              <path
                                d="M18.7704 21.8644C19.555 21.8644 20.1933 21.2261 20.1933 20.4414C20.1933 19.8576 19.4588 18.6645 19.0211 18.0053C18.9091 17.8368 18.6318 17.8368 18.5199 18.0053C18.0821 18.6645 17.3477 19.8576 17.3477 20.4414C17.3477 21.2261 17.986 21.8644 18.7704 21.8644ZM18.7704 18.3045C19.2887 19.0957 19.8194 20.0456 19.8194 20.4414C19.8194 21.0199 19.3488 21.4904 18.7704 21.4904C18.1922 21.4904 17.7216 21.0199 17.7216 20.4414C17.7216 20.0456 18.2523 19.0954 18.7704 18.3045Z"
                                fill="#0062D2"
                                stroke="#0062D2"
                                strokeWidth="0.245915"
                              />
                            </svg>
                            <span className="Quantity-box-show">
                              Menstrual Cycle
                            </span>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body className="pt-0">
                          <Row className="g-2">
                            <Col xl={6} lg={12} sm={6}>
                              <div className="d-flex flex-column gap-1">
                                <span className="contact-details-emergency">
                                  Age at first menstruation
                                </span>
                                <span className="accordion-title-detail">
                                  {
                                    progressUpdatesData.patient
                                      .ageAtFirstMenstruation
                                  }
                                </span>
                              </div>
                            </Col>
                            <Col xl={6} lg={12} sm={6}>
                              <div className="d-flex flex-column gap-1">
                                <span className="contact-details-emergency">
                                  Cycle Length
                                </span>
                                <span className="accordion-title-detail">
                                  {progressUpdatesData.patient.cycleLength}
                                </span>
                              </div>
                            </Col>

                            <Col xl={6} lg={12} sm={6}>
                              <div className="d-flex flex-column gap-1">
                                <span className="contact-details-emergency">
                                  Period Length
                                </span>
                                <span className="accordion-title-detail">
                                  {progressUpdatesData.patient.periodLength}
                                </span>
                              </div>
                            </Col>
                            <Col xl={6} lg={12} sm={6}>
                              <div className="d-flex flex-column gap-1">
                                <span className="contact-details-emergency">
                                  Last Period Date
                                </span>
                                <span className="accordion-title-detail">
                                  {progressUpdatesData.patient.date}
                                </span>
                              </div>
                            </Col>
                            <Col xl={6} lg={12} sm={6}>
                              <div className="d-flex flex-column gap-1">
                                <span className="contact-details-emergency">
                                  Is your cycle regular?
                                </span>
                                <span className="accordion-title-detail">
                                  {progressUpdatesData.patient.isCycleRegular}
                                </span>
                              </div>
                            </Col>
                            <Col xl={6} lg={12} sm={6}>
                              <div className="d-flex flex-column gap-1">
                                <span className="contact-details-emergency">
                                  Do you experience menstrual issues?
                                </span>
                                <span className="accordion-title-detail">
                                  {progressUpdatesData.patient.menstrualIssues}
                                </span>
                              </div>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>

                      <Accordion.Item
                        eventKey="1"
                        className="phisical-assessment-accordion-item mb-2"
                      >
                        <Accordion.Header>
                          <div className="d-flex justify-content-center align-items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0 0 35 35"
                              fill="none"
                            >
                              <rect
                                x="0.399414"
                                y="0.5"
                                width="34"
                                height="34"
                                rx="6"
                                fill="#FFE3E8"
                              />
                              <g clipPath="url(#clip0_7367_52089)">
                                <path
                                  d="M20.3179 27.9273C20.2581 27.9953 20.2276 28.0843 20.233 28.1747C20.2384 28.2652 20.2793 28.3498 20.3469 28.4103C20.4144 28.4707 20.503 28.5021 20.5935 28.4975C20.684 28.4929 20.7691 28.4528 20.8301 28.3858L20.914 28.2923C21.9573 27.1294 23.703 25.1833 23.374 22.9224C23.3168 22.5414 23.2057 22.1704 23.044 21.8206C23.0385 21.8042 23.0317 21.7883 23.0238 21.7729C22.666 21.0105 22.0649 20.2799 21.2203 19.581C21.2106 19.5724 21.2005 19.5643 21.1899 19.5568C20.8761 19.3004 20.5493 19.0605 20.2107 18.838C20.3822 18.7121 20.5254 18.5517 20.6312 18.3671C20.7369 18.1825 20.8029 17.9778 20.8248 17.7662C20.9085 16.6328 19.5374 15.6255 19.0868 15.2945L19.0602 15.2749C18.6875 15.0004 18.3651 14.785 18.0805 14.5948C17.1503 13.9726 16.8818 13.7646 16.9129 13.1151C17.5389 13.2785 18.1539 13.1708 18.5378 12.7871C19.7227 11.6029 19.1679 9.00246 18.9697 8.23401C18.7418 7.35074 17.7771 6.58315 16.8191 6.52299C14.8623 6.39958 13.5027 6.77221 12.6619 7.65994C11.3371 9.05935 11.6135 11.4015 11.8806 13.6665C12.1057 15.5743 12.3182 17.376 11.5396 18.304C11.4702 18.3871 11.4219 18.4858 11.399 18.5916C11.376 18.6974 11.3791 18.8072 11.4079 18.9116C11.4378 19.0204 11.4937 19.1203 11.5707 19.2027C11.6478 19.2852 11.7436 19.3477 11.8502 19.3849C12.1935 19.5041 12.5545 19.5643 12.9179 19.5628C13.537 19.5643 14.1457 19.4037 14.6835 19.097C14.7054 20.0191 14.2709 20.6676 13.7743 21.4079C12.8699 22.7564 11.7445 24.4346 13.0043 28.264C13.034 28.3491 13.0959 28.4191 13.1767 28.459C13.2575 28.4988 13.3507 28.5054 13.4363 28.4773C13.5219 28.4491 13.593 28.3884 13.6343 28.3084C13.6757 28.2283 13.6839 28.1352 13.6573 28.0491C12.5023 24.5388 13.4814 23.079 14.3453 21.791C15.0109 20.7984 15.6484 19.8462 15.2588 18.2445L16.5669 19.5949C16.7319 19.7657 16.9303 19.9006 17.1498 19.9913L22.4567 22.1935C22.5708 22.4582 22.6503 22.7365 22.6934 23.0214C22.9762 24.9636 21.4272 26.6906 20.4022 27.8333L20.3179 27.9273ZM14.5378 18.3435C14.3853 18.568 13.2174 19.1364 12.0662 18.7461C13.0358 17.5905 12.8063 15.6454 12.5634 13.586C12.3146 11.478 12.0574 9.29826 13.1612 8.1326C13.8529 7.40179 15.0352 7.10015 16.7759 7.20911C17.1056 7.24014 17.4199 7.36345 17.6827 7.5649C17.2039 8.67177 16.658 9.28915 15.3774 9.3799C15.3758 9.38024 15.3745 9.38076 15.3731 9.38076C15.3671 9.3811 15.3611 9.38007 15.355 9.38076C15.2643 9.38929 15.1806 9.43352 15.1225 9.50372C15.0643 9.57392 15.0365 9.66434 15.045 9.7551C15.1258 10.62 14.8202 11.4928 14.5103 12.2328C14.3972 12.5027 14.2648 12.7679 14.1368 13.0242C13.6765 13.9461 13.2006 14.8997 13.606 16.1265C13.6712 16.3185 13.7555 16.5035 13.8575 16.6787C14.1555 17.1792 14.3899 17.7149 14.5555 18.2734C14.5472 18.2961 14.5411 18.3196 14.5378 18.3435ZM17.4136 19.3562C17.2809 19.3015 17.1609 19.22 17.0611 19.1168L14.568 16.5431C14.531 16.4746 14.4933 16.4064 14.4549 16.3386C14.3755 16.2029 14.3098 16.0596 14.2588 15.9108C13.9424 14.9531 14.3174 14.2015 14.7521 13.3311C14.885 13.0647 15.0225 12.7894 15.1443 12.4984C15.4485 11.7719 15.7481 10.9228 15.745 10.0308C17.1235 9.82901 17.7634 9.00263 18.1856 8.11954C18.2372 8.20939 18.277 8.30551 18.3041 8.40554C18.7578 10.1652 18.6588 11.6942 18.0518 12.3009C17.7841 12.5683 17.1351 12.6012 16.5126 12.1921C16.4749 12.1673 16.4326 12.1502 16.3883 12.1418C16.3439 12.1334 16.2984 12.1337 16.2542 12.1429C16.21 12.1521 16.168 12.1699 16.1307 12.1952C16.0933 12.2206 16.0614 12.2531 16.0366 12.2909C16.0118 12.3286 15.9947 12.3708 15.9863 12.4152C15.9779 12.4595 15.9782 12.5051 15.9874 12.5493C15.9966 12.5935 16.0144 12.6355 16.0397 12.6728C16.0651 12.7101 16.0976 12.7421 16.1354 12.7669C16.1733 12.7918 16.212 12.8143 16.2505 12.8372C16.2466 12.8516 16.2436 12.8662 16.2416 12.881C16.1123 14.1059 16.7094 14.5049 17.6984 15.1662C17.9768 15.3522 18.2922 15.5633 18.6525 15.8285L18.68 15.8486C19.9319 16.7685 20.1644 17.3716 20.1392 17.7153C20.1161 18.0264 19.8578 18.3143 19.3709 18.5713C19.3358 18.5902 19.3042 18.6153 19.2777 18.6452L18.0901 18.083C17.9645 18.0237 17.8521 17.94 17.7592 17.8368L15.6572 15.5031C15.627 15.4696 15.5904 15.4423 15.5497 15.4229C15.5089 15.4035 15.4647 15.3923 15.4197 15.3899C15.3746 15.3876 15.3295 15.3941 15.2869 15.4092C15.2444 15.4243 15.2052 15.4476 15.1716 15.4778C15.1381 15.5081 15.1109 15.5446 15.0914 15.5854C15.072 15.6261 15.0608 15.6703 15.0585 15.7154C15.0561 15.7605 15.0627 15.8056 15.0778 15.8481C15.0928 15.8907 15.1162 15.9299 15.1464 15.9634L17.2484 18.2973C17.402 18.4681 17.5882 18.6065 17.796 18.7045L20.8035 20.1284C21.1944 20.4476 21.5498 20.8078 21.8636 21.203L17.4136 19.3562Z"
                                  fill="#FF768C"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_7367_52089">
                                  <rect
                                    width="22"
                                    height="22"
                                    fill="white"
                                    transform="translate(6.39941 6.5)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <span className="Quantity-box-show">Pregnancy</span>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body className="pt-0">
                          <Row className="g-3">
                            <Col xl={6} lg={12} sm={6}>
                              <div className="d-flex flex-column gap-1">
                                <span className="contact-details-emergency">
                                  Have you been pregnant before?
                                </span>
                                <span className="accordion-title-detail">
                                  {progressUpdatesData.patient.pregnancy}
                                </span>
                              </div>
                            </Col>
                            <Col xl={6} lg={12} sm={6}>
                              <div className="d-flex flex-column gap-1">
                                <span className="contact-details-emergency">
                                  How long have you been trying to conceive?
                                </span>
                                <span className="accordion-title-detail">
                                  {progressUpdatesData.patient.timeduration}
                                </span>
                              </div>
                            </Col>
                            <Col xl={6} lg={12} sm={6}>
                              <div className="d-flex flex-column gap-1">
                                <span className="contact-details-emergency">
                                  Any history of miscarriage or ectopic
                                  pregnancy?
                                </span>
                                <span className="accordion-title-detail">
                                  {progressUpdatesData.patient.ectopicpregnancy}
                                </span>
                              </div>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>

                  <Col md={6}>
                    <p className="patient-treatment-box-subtitle mb-2">
                      Partner
                    </p>
                    <div className="progressUpdates-border-Partner-box">
                      <Row>
                        <Col xl={6} lg={12} sm={6}>
                          <div className="mb-3">
                            <h6 className="mb-1 contact-details-emergency">
                              Semen Analysis
                            </h6>
                            <p className="mb-2 settings-accordion-subtitle">
                              {progressUpdatesData.partner.semenAnalysis ===
                              "yes"
                                ? progressUpdatesData.partner
                                    .semenAnalysisContent
                                  ? `Yes | ${progressUpdatesData.partner.semenAnalysisContent}`
                                  : "Yes"
                                : "No"}
                            </p>
                          </div>
                        </Col>

                        <Col xl={6} lg={12} sm={6}>
                          <div className="mb-3">
                            <h6 className="mb-1 contact-details-emergency">
                              Fertility Issues
                            </h6>
                            <p className="mb-2 settings-accordion-subtitle">
                              {progressUpdatesData.partner.fertilityIssues ===
                              "yes"
                                ? progressUpdatesData.partner
                                    .fertilityIssuesContent
                                  ? `Yes, ${progressUpdatesData.partner.fertilityIssuesContent}`
                                  : "Yes"
                                : "No"}
                            </p>
                          </div>
                        </Col>

                        <Col xl={6} lg={12} sm={6}>
                          <div className="mb-2">
                            <h6 className="mb-1 contact-details-emergency">
                              Surgeries
                            </h6>
                            <p className="mb-0 settings-accordion-subtitle">
                              {progressUpdatesData.partner.surgeries === "yes"
                                ? progressUpdatesData.partner.surgeriesContent
                                  ? `Yes, ${progressUpdatesData.partner.surgeriesContent}`
                                  : "Yes"
                                : "No"}
                            </p>
                          </div>
                        </Col>

                        <Col xl={6} lg={12} sm={6}>
                          <div className="mb-2">
                            <h6 className="mb-1 contact-details-emergency">
                              Fertility Treatment
                            </h6>
                            <p className="mb-0 settings-accordion-subtitle">
                              {progressUpdatesData.partner
                                .fertilityTreatment === "yes"
                                ? progressUpdatesData.partner
                                    .fertilityTreatmentContent
                                  ? `Yes, ${progressUpdatesData.partner.fertilityTreatmentContent}`
                                  : "Yes"
                                : "No"}
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              )}

              <div>
                <h6 className="patient-treatment-box-subtitle my-2">
                  Medication
                </h6>
                <Accordion>
                  <Row className="g-3">
                    {progressUpdatesData?.medicalPrescription?.map(
                      (item, index) => {
                        return (
                          <Col md={6} key={item.id}>
                            <Accordion.Item
                              eventKey={index.toString()}
                              className="medication-prescription-accordion-item-main"
                            >
                              <Accordion.Header className="phisical-assessment-accordion-title-showData">
                                <div className="d-flex align-items-center gap-3">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="45"
                                    height="44"
                                    viewBox="0 0 45 44"
                                    fill="none"
                                  >
                                    <rect
                                      x="0.904297"
                                      width="44"
                                      height="44"
                                      rx="6"
                                      fill="#FBEFEB"
                                    />
                                    <path
                                      d="M34.1114 11.2954C32.9019 10.0859 31.2615 9.40643 29.551 9.40643C27.8405 9.40643 26.2001 10.0859 24.9906 11.2954L12.6996 23.5852C11.5154 24.7998 10.8575 26.4322 10.8683 28.1285C10.8791 29.8249 11.5579 31.4486 12.7575 32.6481C13.9571 33.8475 15.5809 34.5261 17.2773 34.5367C18.9736 34.5473 20.6059 33.8891 21.8204 32.7048L34.1126 20.4149C35.3201 19.2045 35.9981 17.5646 35.9978 15.8549C35.9976 14.1452 35.3192 12.5055 34.1114 11.2954ZM20.4508 31.3352C19.6047 32.1814 18.4571 32.6569 17.2604 32.657C16.0637 32.6572 14.916 32.1819 14.0698 31.3358C13.2235 30.4897 12.748 29.3421 12.7479 28.1454C12.7478 26.9487 13.2231 25.801 14.0692 24.9547L19.5293 19.4946L25.9109 25.8751L20.4508 31.3352ZM32.7418 19.0454L27.2793 24.5055L20.9001 18.1251L26.3614 12.6649C27.2108 11.8351 28.3532 11.3736 29.5407 11.3806C30.7282 11.3875 31.8651 11.8623 32.7048 12.702C33.5445 13.5417 34.0193 14.6786 34.0262 15.8661C34.0331 17.0536 33.5717 18.1959 32.7418 19.0454ZM30.8734 16.4709C30.9634 16.5609 31.0349 16.6677 31.0836 16.7853C31.1324 16.9029 31.1575 17.029 31.1575 17.1563C31.1575 17.2836 31.1324 17.4097 31.0836 17.5273C31.0349 17.6449 30.9634 17.7517 30.8734 17.8417L27.9671 20.748C27.8771 20.8379 27.7703 20.9092 27.6527 20.9578C27.5351 21.0065 27.4091 21.0315 27.2819 21.0314C27.1547 21.0314 27.0287 21.0062 26.9112 20.9575C26.7936 20.9088 26.6869 20.8374 26.5969 20.7473C26.507 20.6573 26.4357 20.5505 26.387 20.4329C26.3384 20.3154 26.3134 20.1894 26.3135 20.0621C26.3135 19.9349 26.3386 19.8089 26.3874 19.6914C26.4361 19.5739 26.5075 19.4671 26.5975 19.3772L29.5038 16.4709C29.6854 16.2894 29.9317 16.1874 30.1886 16.1874C30.4454 16.1874 30.6917 16.2894 30.8734 16.4709Z"
                                      fill="#E29578"
                                    />
                                  </svg>
                                  <div className="d-flex flex-column hap-2">
                                    <p className="treatment-steps-box-item m-0">
                                      {item.medicineName}
                                    </p>
                                    <p className="medication-prescription-accordion-subtitle m-0">
                                      {item.typeQuantity} | {item.type} | Twice
                                      a day
                                    </p>
                                  </div>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body className="pt-0">
                                <div className="d-flex flex-column gap-3">
                                  <div className="d-flex gap-3">
                                    <p className="medication-prescription-accordion-item m-0">
                                      Duration - {item.duration} Days{" "}
                                    </p>
                                    <p className="medication-prescription-accordion-item m-0">
                                      Meal - {item.meal}{" "}
                                    </p>
                                  </div>
                                  <div className="medication-prescription-accordion-hr-row"></div>
                                  <div className="d-flex align-items-center gap-3">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="17"
                                      height="16"
                                      viewBox="0 0 17 16"
                                      fill="none"
                                    >
                                      <path
                                        d="M8.4043 2.5V1C8.4043 0.867392 8.45698 0.740215 8.55074 0.646447C8.64451 0.552678 8.77169 0.5 8.9043 0.5C9.03691 0.5 9.16408 0.552678 9.25785 0.646447C9.35162 0.740215 9.4043 0.867392 9.4043 1V2.5C9.4043 2.63261 9.35162 2.75979 9.25785 2.85355C9.16408 2.94732 9.03691 3 8.9043 3C8.77169 3 8.64451 2.94732 8.55074 2.85355C8.45698 2.75979 8.4043 2.63261 8.4043 2.5ZM8.9043 4C8.11317 4 7.33981 4.2346 6.68202 4.67412C6.02422 5.11365 5.51153 5.73836 5.20878 6.46927C4.90603 7.20017 4.82681 8.00444 4.98116 8.78036C5.1355 9.55628 5.51646 10.269 6.07587 10.8284C6.63528 11.3878 7.34801 11.7688 8.12394 11.9231C8.89986 12.0775 9.70413 11.9983 10.435 11.6955C11.1659 11.3928 11.7906 10.8801 12.2302 10.2223C12.6697 9.56448 12.9043 8.79113 12.9043 8C12.9031 6.93949 12.4813 5.92275 11.7314 5.17285C10.9816 4.42296 9.96481 4.00116 8.9043 4ZM4.55055 4.35375C4.64437 4.44757 4.77161 4.50028 4.9043 4.50028C5.03698 4.50028 5.16423 4.44757 5.25805 4.35375C5.35187 4.25993 5.40457 4.13268 5.40457 4C5.40457 3.86732 5.35187 3.74007 5.25805 3.64625L4.25805 2.64625C4.16423 2.55243 4.03698 2.49972 3.9043 2.49972C3.77161 2.49972 3.64437 2.55243 3.55055 2.64625C3.45673 2.74007 3.40402 2.86732 3.40402 3C3.40402 3.13268 3.45673 3.25993 3.55055 3.35375L4.55055 4.35375ZM4.55055 11.6462L3.55055 12.6462C3.45673 12.7401 3.40402 12.8673 3.40402 13C3.40402 13.1327 3.45673 13.2599 3.55055 13.3538C3.64437 13.4476 3.77161 13.5003 3.9043 13.5003C4.03698 13.5003 4.16423 13.4476 4.25805 13.3538L5.25805 12.3538C5.3045 12.3073 5.34135 12.2521 5.36649 12.1914C5.39163 12.1308 5.40457 12.0657 5.40457 12C5.40457 11.9343 5.39163 11.8692 5.36649 11.8086C5.34135 11.7479 5.3045 11.6927 5.25805 11.6462C5.21159 11.5998 5.15644 11.5629 5.09575 11.5378C5.03505 11.5127 4.96999 11.4997 4.9043 11.4997C4.8386 11.4997 4.77355 11.5127 4.71285 11.5378C4.65215 11.5629 4.597 11.5998 4.55055 11.6462ZM12.9043 4.5C12.97 4.50005 13.035 4.48716 13.0957 4.46207C13.1564 4.43697 13.2116 4.40017 13.258 4.35375L14.258 3.35375C14.3519 3.25993 14.4046 3.13268 14.4046 3C14.4046 2.86732 14.3519 2.74007 14.258 2.64625C14.1642 2.55243 14.037 2.49972 13.9043 2.49972C13.7716 2.49972 13.6444 2.55243 13.5505 2.64625L12.5505 3.64625C12.4805 3.71618 12.4329 3.8053 12.4135 3.90235C12.3942 3.99939 12.4041 4.09998 12.442 4.1914C12.4799 4.28281 12.544 4.36092 12.6263 4.41586C12.7086 4.4708 12.8053 4.50008 12.9043 4.5ZM13.258 11.6462C13.1642 11.5524 13.037 11.4997 12.9043 11.4997C12.7716 11.4997 12.6444 11.5524 12.5505 11.6462C12.4567 11.7401 12.404 11.8673 12.404 12C12.404 12.1327 12.4567 12.2599 12.5505 12.3538L13.5505 13.3538C13.597 13.4002 13.6522 13.4371 13.7128 13.4622C13.7735 13.4873 13.8386 13.5003 13.9043 13.5003C13.97 13.5003 14.035 13.4873 14.0957 13.4622C14.1564 13.4371 14.2116 13.4002 14.258 13.3538C14.3045 13.3073 14.3414 13.2521 14.3665 13.1914C14.3916 13.1308 14.4046 13.0657 14.4046 13C14.4046 12.9343 14.3916 12.8692 14.3665 12.8086C14.3414 12.7479 14.3045 12.6927 14.258 12.6462L13.258 11.6462ZM3.9043 8C3.9043 7.86739 3.85162 7.74021 3.75785 7.64645C3.66408 7.55268 3.53691 7.5 3.4043 7.5H1.9043C1.77169 7.5 1.64451 7.55268 1.55074 7.64645C1.45698 7.74021 1.4043 7.86739 1.4043 8C1.4043 8.13261 1.45698 8.25979 1.55074 8.35355C1.64451 8.44732 1.77169 8.5 1.9043 8.5H3.4043C3.53691 8.5 3.66408 8.44732 3.75785 8.35355C3.85162 8.25979 3.9043 8.13261 3.9043 8ZM8.9043 13C8.77169 13 8.64451 13.0527 8.55074 13.1464C8.45698 13.2402 8.4043 13.3674 8.4043 13.5V15C8.4043 15.1326 8.45698 15.2598 8.55074 15.3536C8.64451 15.4473 8.77169 15.5 8.9043 15.5C9.03691 15.5 9.16408 15.4473 9.25785 15.3536C9.35162 15.2598 9.4043 15.1326 9.4043 15V13.5C9.4043 13.3674 9.35162 13.2402 9.25785 13.1464C9.16408 13.0527 9.03691 13 8.9043 13ZM15.9043 7.5H14.4043C14.2717 7.5 14.1445 7.55268 14.0507 7.64645C13.957 7.74021 13.9043 7.86739 13.9043 8C13.9043 8.13261 13.957 8.25979 14.0507 8.35355C14.1445 8.44732 14.2717 8.5 14.4043 8.5H15.9043C16.0369 8.5 16.1641 8.44732 16.2579 8.35355C16.3516 8.25979 16.4043 8.13261 16.4043 8C16.4043 7.86739 16.3516 7.74021 16.2579 7.64645C16.1641 7.55268 16.0369 7.5 15.9043 7.5Z"
                                        fill="#B0B4C1"
                                      />
                                    </svg>
                                    <p className="medication-prescription-accordion-item m-0">
                                      Morning - 1 Tab
                                    </p>
                                  </div>
                                  <div className="medication-prescription-accordion-hr-row"></div>
                                  <div className="d-flex align-items-center gap-3">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="17"
                                      height="16"
                                      viewBox="0 0 17 16"
                                      fill="none"
                                    >
                                      <path
                                        d="M15.6256 9.38814C15.2218 10.7062 14.4126 11.8634 13.3131 12.695C12.3477 13.4216 11.199 13.8647 9.99585 13.9746C8.79267 14.0846 7.58266 13.857 6.50163 13.3175C5.4206 12.7779 4.51134 11.9478 3.87591 10.9202C3.24049 9.89257 2.90403 8.70821 2.90433 7.50001C2.89998 6.0898 3.35843 4.7171 4.20933 3.59251C5.04091 2.49301 6.19809 1.68379 7.5162 1.28001C7.60308 1.25326 7.6956 1.2507 7.78382 1.27261C7.87204 1.29451 7.95262 1.34004 8.0169 1.40432C8.08117 1.4686 8.12671 1.54918 8.14861 1.6374C8.17051 1.72562 8.16795 1.81814 8.1412 1.90501C7.85298 2.85841 7.82881 3.87214 8.07128 4.83818C8.31375 5.80422 8.81376 6.68639 9.51805 7.39067C10.2223 8.09496 11.1045 8.59497 12.0705 8.83744C13.0366 9.0799 14.0503 9.05574 15.0037 8.76751C15.0906 8.74076 15.1831 8.7382 15.2713 8.76011C15.3595 8.78201 15.4401 8.82754 15.5044 8.89182C15.5687 8.9561 15.6142 9.03668 15.6361 9.1249C15.658 9.21312 15.6555 9.30564 15.6287 9.39251L15.6256 9.38814Z"
                                        fill="#B0B4C1"
                                      />
                                    </svg>
                                    <p className="medication-prescription-accordion-item m-0">
                                      Night - 1 Tab
                                    </p>
                                  </div>
                                </div>

                                {/* <Button
                                                                              className="mt-3"
                                                                              variant="outline"
                                                                              disabled={false}
                                                                              contentSize="small"
                                                                          >
                                                                              <svg
                                                                                  width="16"
                                                                                  height="16"
                                                                                  viewBox="0 0 14 14"
                                                                                  className="me-1"
                                                                                  fill="none"
                                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                              >
                                                                                  <path
                                                                                      d="M13.5484 3.40848L10.7553 0.615983C10.5209 0.381644 10.203 0.25 9.87157 0.25C9.54011 0.25 9.22223 0.381644 8.98782 0.615983L1.28032 8.32286C1.16385 8.43861 1.0715 8.57633 1.00863 8.72803C0.945765 8.87973 0.913622 9.0424 0.914067 9.20661V11.9997C0.914067 12.3313 1.04576 12.6492 1.28018 12.8836C1.5146 13.118 1.83255 13.2497 2.16407 13.2497H12.6641C12.863 13.2497 13.0537 13.1707 13.1944 13.0301C13.3351 12.8894 13.4141 12.6986 13.4141 12.4997C13.4141 12.3008 13.3351 12.1101 13.1944 11.9694C13.0537 11.8288 12.863 11.7497 12.6641 11.7497H6.97657L13.5484 5.17661C13.6646 5.06053 13.7567 4.92271 13.8195 4.77102C13.8824 4.61933 13.9147 4.45674 13.9147 4.29255C13.9147 4.12835 13.8824 3.96576 13.8195 3.81407C13.7567 3.66238 13.6646 3.52456 13.5484 3.40848ZM4.85157 11.7497H2.41407V9.31223L7.66407 4.06223L10.1016 6.49973L4.85157 11.7497ZM11.1641 5.43723L8.72657 2.99973L9.87282 1.85348L12.3103 4.29098L11.1641 5.43723Z"
                                                                                      fill="#2B4360"
                                                                                  />
                                                                              </svg>
                                                                              Edit
                                                                          </Button> */}
                              </Accordion.Body>
                            </Accordion.Item>
                          </Col>
                        );
                      }
                    )}
                  </Row>
                </Accordion>
              </div>

              <div>
                <h6 className="patient-treatment-box-subtitle my-2">
                  Test Reports
                </h6>

                {progressUpdatesData.report.length > 0 ? (
                  <>
                    <Row className="g-3">
                      {progressUpdatesData.report.map((item, index) => {
                        return (
                          <Col key={index} md={6}>
                            <div className="d-flex justify-content-between align-items-center report-box mb-3">
                              <div className="d-flex gap-2">
                                <Image
                                  src={
                                    item.name?.toLowerCase().endsWith(".pdf")
                                      ? pdfimg
                                      : [".jpg", ".jpeg", ".png", ".gif"].some(
                                          (ext) =>
                                            item.name
                                              ?.toLowerCase()
                                              .endsWith(ext)
                                        )
                                      ? Jpgimg
                                      : pdfimg
                                  }
                                  width={44}
                                  height={44}
                                  alt="report"
                                />
                                <div className="d-flex flex-column">
                                  <span className="patient-treatment-box-subtitle-desc mb-1">
                                    {item.reportName}
                                  </span>
                                  <span className="select-profile-subtitle report_text">
                                    {item.name}
                                  </span>
                                  <span className="select-profile-subtitle">
                                    {/* {item.size} •{" "} */}
                                    {item.uploadedAt
                                      ? new Date(
                                          item.uploadedAt
                                        ).toLocaleDateString("en-GB", {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                        })
                                      : ""}
                                  </span>
                                </div>
                              </div>
                              <div className="patient-profile-dot">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="24"
                                  viewBox="0 0 25 24"
                                  fill="none"
                                >
                                  <path
                                    d="M21.875 13.5V19.5C21.875 19.7984 21.7565 20.0845 21.5455 20.2955C21.3345 20.5065 21.0484 20.625 20.75 20.625H4.25C3.95163 20.625 3.66548 20.5065 3.4545 20.2955C3.24353 20.0845 3.125 19.7984 3.125 19.5V13.5C3.125 13.2016 3.24353 12.9155 3.4545 12.7045C3.66548 12.4935 3.95163 12.375 4.25 12.375C4.54837 12.375 4.83452 12.4935 5.0455 12.7045C5.25647 12.9155 5.375 13.2016 5.375 13.5V18.375H19.625V13.5C19.625 13.2016 19.7435 12.9155 19.9545 12.7045C20.1655 12.4935 20.4516 12.375 20.75 12.375C21.0484 12.375 21.3345 12.4935 21.5455 12.7045C21.7565 12.9155 21.875 13.2016 21.875 13.5ZM11.7041 14.2959C11.8086 14.4008 11.9328 14.484 12.0695 14.5408C12.2063 14.5976 12.3529 14.6268 12.5009 14.6268C12.649 14.6268 12.7956 14.5976 12.9324 14.5408C13.0691 14.484 13.1933 14.4008 13.2978 14.2959L17.0478 10.5459C17.2592 10.3346 17.3779 10.0479 17.3779 9.74906C17.3779 9.45018 17.2592 9.16353 17.0478 8.95219C16.8365 8.74084 16.5498 8.62211 16.2509 8.62211C15.9521 8.62211 15.6654 8.74084 15.4541 8.95219L13.625 10.7812V3C13.625 2.70163 13.5065 2.41548 13.2955 2.2045C13.0845 1.99353 12.7984 1.875 12.5 1.875C12.2016 1.875 11.9155 1.99353 11.7045 2.2045C11.4935 2.41548 11.375 2.70163 11.375 3V10.7812L9.54594 8.95406C9.44129 8.84942 9.31706 8.7664 9.18033 8.70977C9.0436 8.65314 8.89706 8.62399 8.74906 8.62399C8.45018 8.62399 8.16353 8.74272 7.95219 8.95406C7.84754 9.05871 7.76453 9.18294 7.7079 9.31967C7.65126 9.4564 7.62211 9.60294 7.62211 9.75094C7.62211 10.0498 7.74084 10.3365 7.95219 10.5478L11.7041 14.2959Z"
                                    fill="#2B4360"
                                  />
                                </svg>
                              </div>
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    type="submit"
                    contentSize="small"
                    onClick={handleOpenModal}
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
                          fill="#2B4360"
                        />
                      </svg>
                      Add Reports
                    </div>
                  </Button>
                )}

                <Modal
                  show={showModal}
                  onHide={handleClose}
                  header="Upload Report"
                  closeButton
                  dialogClassName="custom-modal-width"
                >
                  {/* Always show Browse UI */}
                  <div className=" modal-border-color rounded-4 p-4 text-center mb-4 upload-report-data">
                    <div className="mb-2">
                      <Image
                        src={uplodimg}
                        alt="upload"
                        width={35}
                        height={35}
                        className="modal-bg p-1 rounded-2"
                      />
                    </div>
                    <div>Click here to upload your file or drag.</div>
                    <small className="kyc-modal-subheading">
                      Supported Format: SVG, JPG, PNG (10mb each)
                    </small>
                    <div className="mt-3">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                        className="kyc-edit-aadhar-photo"
                      />
                      <Button variant="outline" onClick={handleButtonClick}>
                        Browse File
                      </Button>
                    </div>
                    {fileError && (
                      <div className="text-danger mt-2">{fileError}</div>
                    )}
                  </div>

                  {/* Uploaded files list (below browse) */}
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="p-3 mb-4 bg-white modal-border-color rounded-4 border"
                    >
                      <div className="modal-bg p-3 rounded-3 ">
                        <div className="d-flex justify-content-between align-items-start">
                          {/* File Info */}
                          <div className="d-flex align-items-center gap-3">
                            {/* <Image src={Jpgimg} alt="pdf" width={45} height={50} /> */}
                            <Image
                              src={
                                file.name.toLowerCase().endsWith(".pdf")
                                  ? PDFAddhar
                                  : [".jpg", ".jpeg", ".png", ".gif"].some(
                                      (ext) =>
                                        file.name.toLowerCase().endsWith(ext)
                                    )
                                  ? Jpgimg
                                  : PDFAddhar // fallback = pdf icon
                              }
                              alt={file.name}
                              width={45}
                              height={50}
                            />

                            <div>
                              <div className="fw-semibold file-name-ellipsis">
                                {file.name}
                              </div>
                              <div className="d-flex align-items-center gap-2">
                                <span className="profile-sub-title">
                                  {file.size}
                                </span>
                                <span>•</span>
                                {file.status === "uploading" ? (
                                  <span className="d-flex align-items-center gap-1 upload-text">
                                    <Image
                                      src={Loading}
                                      alt="loading"
                                      width={20}
                                      height={20}
                                    />
                                    Uploading...
                                  </span>
                                ) : (
                                  <span className="d-flex align-items-center gap-1 text-success">
                                    <Image
                                      src={Completed}
                                      alt="completed"
                                      width={20}
                                      height={20}
                                    />
                                    Completed
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Close/Delete Icon */}
                          <button
                            className="btn border-0 bg-transparent"
                            onClick={() => {
                              setUploadedFiles((prev) =>
                                prev.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            {file.status === "uploading" ? (
                              <Image
                                src={Cross}
                                alt="edit"
                                width={22}
                                height={22}
                              />
                            ) : (
                              <Image
                                src={Delete}
                                alt="edit"
                                width={22}
                                height={22}
                              />
                            )}
                          </button>
                        </div>

                        {/* Progress Bar */}
                        {file.status === "uploading" && (
                          <div className="mt-3">
                            <div className="progress rounded-pill qualification-certificates-progress-bar">
                              <div
                                className="progress-bar rounded-pill custom-progress"
                                role="progressbar"
                                style={{ width: `${file.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Report Name Input */}
                      <div className="mt-4 mb-3">
                        <div className="d-flex align-items-center gap-2">
                          <InputFieldGroup
                            label="Report Name"
                            name="university"
                            className="w-100"
                            type="text"
                            value={file.reportName}
                            onChange={(e) => {
                              const value = e.target.value;
                              setUploadedFiles((prev) =>
                                prev.map((f, i) =>
                                  i === index ? { ...f, reportName: value } : f
                                )
                              );
                              setErrors((prev) => {
                                const updated = { ...prev };
                                delete updated[index];
                                return updated;
                              });
                            }}
                            onBlur={(
                              e: React.FocusEvent<HTMLInputElement>
                            ) => {}}
                            placeholder="Enter Report Name"
                            required={true}
                            disabled={false}
                            readOnly={false} // ✅ remove or set false
                            error={formError.university}
                          />
                          <div className="d-flex align-items-center justify-content-center border rounded-3 p-2 bg-white qualification-certificates-edit-btn">
                            {file.status === "completed" ? (
                              // <Image src={EditProfile} alt="edit" width={20} height={20} />
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.2594 4.23184L11.768 0.741217C11.6519 0.625114 11.5141 0.533014 11.3624 0.470178C11.2107 0.407342 11.0482 0.375 10.884 0.375C10.7198 0.375 10.5572 0.407342 10.4056 0.470178C10.2539 0.533014 10.1161 0.625114 10 0.741217L0.366412 10.3748C0.249834 10.4905 0.157407 10.6281 0.0945056 10.7798C0.0316038 10.9315 -0.000518312 11.0942 6.32418e-06 11.2584V14.7498C6.32418e-06 15.0813 0.131702 15.3993 0.366123 15.6337C0.600543 15.8681 0.918486 15.9998 1.25001 15.9998H14.375C14.5408 15.9998 14.6997 15.934 14.8169 15.8168C14.9342 15.6995 15 15.5406 15 15.3748C15 15.2091 14.9342 15.0501 14.8169 14.9329C14.6997 14.8157 14.5408 14.7498 14.375 14.7498H6.50938L15.2594 5.99981C15.3755 5.88373 15.4676 5.74592 15.5304 5.59425C15.5933 5.44257 15.6256 5.28 15.6256 5.11583C15.6256 4.95165 15.5933 4.78908 15.5304 4.63741C15.4676 4.48573 15.3755 4.34792 15.2594 4.23184ZM4.74141 14.7498H1.25001V11.2584L8.12501 4.3834L11.6164 7.87481L4.74141 14.7498ZM12.5 6.99122L9.00938 3.49981L10.8844 1.62481L14.375 5.11622L12.5 6.99122Z"
                                  fill="#2B4360"
                                />
                              </svg>
                            ) : (
                              <Image
                                src={GreenRight}
                                alt="editing"
                                width={20}
                                height={20}
                              />
                            )}
                          </div>
                        </div>

                        {/* Error Message */}
                        {errors[index] && (
                          <div className="text-danger mt-1">
                            {errors[index]}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {/* Action Buttons */}

                  <div className="d-flex mt-3 gap-3">
                    <Button
                      variant="outline"
                      className="w-100"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="w-100"
                      variant="default"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </div>
                </Modal>
              </div>

              <div>
                <h6 className="patient-treatment-box-subtitle mt-3 mb-2">
                  Test Reports
                </h6>

                <p className="patient-treatment-box-subtitle-desc m-0">
                  Cycle is normal, no fertility related issue
                </p>
              </div>
            </div>
          </ContentContainer>
        </Col>
      </Row>
    </>
  );
}

export default TreatmentPatient;
