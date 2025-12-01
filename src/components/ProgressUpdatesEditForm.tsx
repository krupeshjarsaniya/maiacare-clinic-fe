"use client";

import {
  MedicationPrescriptionType,
  ProgressUpdatesType,
} from "../utlis/types/interfaces";
import { Accordion, ProgressBar } from "react-bootstrap";
import {
  TreatmentFertilityAssessmentPartner,
  TreatmentFertilityAssessmentPatient,
  TreatmentProgressStatus,
} from "./form/TreatmentAllForm";
import { useRef, useState } from "react";
import CustomTabs from "./ui/CustomTabs";
import Button from "./ui/Button";
import { MedicationPrescriptionForm } from "./form/TreatmentPlanForm";
import Image from "next/image";
import uplodimg from "@/assets/images/Uploadimg.png";
import GreenRight from "@/assets/images/GreenRight.png";
import Cross from "@/assets/images/Cross.png";
import Delete from "@/assets/images/Delete.png";
import Loading from "@/assets/images/Loading.png";
import Completed from "@/assets/images/Completed.png";
import { InputFieldGroup } from "./ui/InputField";
export function ProgressUpdatesEditForm({
  setStep,
  setStepper,
  step,
  stepper,
  totalSteps,
  editProgressUpdatesData,
  setModalFormFertilityData,
  progressUpdatesData,
  medicalPrescriptionDataShowHide,
  setMedicalPrescriptionDataShowHide,
  setEditProgressUpdatesModel,
  setEditForm,
  setShowEditFormShowModel,
  setTreatmentPlanModel,
}: {
  setStep: React.Dispatch<React.SetStateAction<number | undefined>>;
  setStepper: React.Dispatch<React.SetStateAction<number | undefined>>;
  step: number | undefined;
  stepper: number | undefined;
  totalSteps: number;
  editProgressUpdatesData: ProgressUpdatesType;
  setModalFormFertilityData: React.Dispatch<
    React.SetStateAction<ProgressUpdatesType>
  >;
  progressUpdatesData: ProgressUpdatesType;
  medicalPrescriptionDataShowHide: boolean;
  setMedicalPrescriptionDataShowHide: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setEditProgressUpdatesModel: React.Dispatch<React.SetStateAction<boolean>>;
  setEditForm: React.Dispatch<React.SetStateAction<MedicationPrescriptionType>>;
  setShowEditFormShowModel: React.Dispatch<React.SetStateAction<boolean>>;
  setTreatmentPlanModel: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [activeTab, setActiveTab] = useState<string>("patient");
  const tabOptions = [
    {
      key: "patient",
      label: "Patient",
      content: (
        <>
          <TreatmentFertilityAssessmentPatient
            setModalFormFertilityData={setModalFormFertilityData}
            setActiveTab={setActiveTab}
            editProgressUpdatesData={editProgressUpdatesData}
          />
        </>
      ),
    },
    {
      key: "partner",
      label: "Partner",
      content: (
        <>
          <TreatmentFertilityAssessmentPartner
            setModalFormFertilityData={setModalFormFertilityData}
            editProgressUpdatesData={editProgressUpdatesData}
            setStep={setStep}
            setStepper={setStepper}
          />
        </>
      ),
    },
  ];

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

  // Validate report names
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

  const completedFiles = uploadedFiles.filter(f => f.status === "completed");

  setModalFormFertilityData((prev: ProgressUpdatesType) => ({
    ...prev,
    report: [...(prev.report ?? []), ...completedFiles],
  }));

  setUploadedFiles([]);
  setShowModal(false);
  setStep?.((prev) => (prev ?? 0) + 1);
  setStepper?.((prev) => (prev ?? 0) + 1);
};
  const handleClose = () => {
    setShowModal(false);
    setFileError(""); // file upload error reset (jo use karto hoy to)
    setStep?.((prev: number | undefined) => (prev ?? 0) - 1);
    setStepper?.((prev: number | undefined) => (prev ?? 0) - 1);
  };

  // console.log("test", patientReport);

  return (
    <>
      <div className="d-flex align-items-center mb-4">
        <div className="flex-grow-1 d-flex">
          {[...Array(totalSteps)].map((_, index) => (
            <div key={index} className="flex-fill mx-1">
              <ProgressBar
                now={100}
                className={
                  index < (stepper || 0)
                    ? "progress-bar progressbar-step-success"
                    : "progress-bar progressbar-step-secondary"
                }
              />
            </div>
          ))}
        </div>
        <span className="ms-2 progressbar-step">
          {step} of {totalSteps}
        </span>
      </div>

      {step == 1 && (
        <>
          <h6 className="dashboard-chart-heading pb-2">Fertility Assessment</h6>
          <CustomTabs
            tabOptions={tabOptions}
            className="mb-3"
            activeKey={activeTab}
            setActiveKey={setActiveTab}
          />
        </>
      )}

      {step == 2 && (
        <>
          <h6 className="dashboard-chart-heading pb-2">
            Medication Prescription
          </h6>

          {progressUpdatesData?.medicalPrescription?.length > 0 &&
            medicalPrescriptionDataShowHide == false && (
              <>
                <Accordion defaultActiveKey="0">
                  {progressUpdatesData?.medicalPrescription?.map(
                    (item, index) => {
                      return (
                        <Accordion.Item
                          eventKey={index.toString()}
                          className="medication-prescription-accordion-item-main mb-3 shadow-sm"
                          key={index}
                        >
                          <Accordion.Header className="phisical-assessment-accordion-title-showData">
                            <div className="d-flex align-items-center gap-2">
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
                                  {item.typeQuantity} | {item.type} | Twice a
                                  day
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

                            <Button
                              className="mt-3"
                              variant="outline"
                              disabled={false}
                              contentSize="small"
                              onClick={() => {
                                setEditForm(item);
                                setShowEditFormShowModel(true);
                                setTreatmentPlanModel(false);
                                setMedicalPrescriptionDataShowHide(true);
                              }}
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
                            </Button>
                          </Accordion.Body>
                        </Accordion.Item>
                      );
                    }
                  )}
                </Accordion>
              </>
            )}

          <MedicationPrescriptionForm
            setStep={setStep}
            setStepper={setStepper}
            // setMedicalPrescription={setEditTreatmentData?.medicalPrescription}
            setMedicalPrescription={(newPrescriptions) =>
              setModalFormFertilityData((prev) => ({
                ...prev,
                medicalPrescription:
                  typeof newPrescriptions === "function"
                    ? newPrescriptions(prev.medicalPrescription)
                    : newPrescriptions,
              }))
            }
            // setShowEditFormShowModel={setShowEditFormShowModel}

            medicalPrescription={progressUpdatesData?.medicalPrescription}
            medicalPrescriptionDataShowHide={medicalPrescriptionDataShowHide}
            setMedicalPrescriptionDataShowHide={
              setMedicalPrescriptionDataShowHide
            }
          />
        </>
      )}

      {step == 3 && (
        <>
          <h6 className="dashboard-chart-heading pb-2">Upload Reports</h6>
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
            {fileError && <div className="text-danger mt-2">{fileError}</div>}
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
                    {/* <Image
                                                src={
                                                    file.name.toLowerCase().endsWith(".pdf")
                                                        ? PDFAddhar
                                                        : [".jpg", ".jpeg", ".png", ".gif"].some((ext) =>
                                                            file.name.toLowerCase().endsWith(ext)
                                                        )
                                                            ? Jpgimg
                                                            : PDFAddhar // fallback = pdf icon
                                                }
                                                alt={file.name}
                                                width={45}
                                                height={50}
                                            /> */}

                    <div>
                      <div className="fw-semibold file-name-ellipsis">
                        {file.name}
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="profile-sub-title">{file.size}</span>
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
                      <Image src={Cross} alt="edit" width={22} height={22} />
                    ) : (
                      <Image src={Delete} alt="edit" width={22} height={22} />
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
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
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
                  <div className="text-danger mt-1">{errors[index]}</div>
                )}
              </div>
            </div>
          ))}
          {/* Action Buttons */}

          <div className="d-flex mt-3 gap-3">
            <Button variant="outline" className="w-100" onClick={handleClose}>
              <div className="d-flex justify-content-center align-items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="15"
                  viewBox="0 0 20 16"
                  fill="none"
                >
                  <path
                    d="M19.1249 8.00001C19.1249 8.29838 19.0064 8.58452 18.7954 8.7955C18.5844 9.00648 18.2983 9.12501 17.9999 9.12501H4.21866L9.04866 13.9541C9.26 14.1654 9.37874 14.4521 9.37874 14.7509C9.37874 15.0498 9.26 15.3365 9.04866 15.5478C8.83732 15.7592 8.55067 15.8779 8.25179 15.8779C7.9529 15.8779 7.66625 15.7592 7.45491 15.5478L0.704911 8.79782C0.600031 8.6933 0.516814 8.56911 0.460033 8.43237C0.403252 8.29562 0.374023 8.14901 0.374023 8.00094C0.374023 7.85288 0.403252 7.70627 0.460033 7.56952C0.516814 7.43278 0.600031 7.30859 0.704911 7.20407L7.45491 0.454069C7.55956 0.349422 7.68379 0.266411 7.82052 0.209777C7.95725 0.153142 8.10379 0.123993 8.25179 0.123993C8.39978 0.123993 8.54632 0.153142 8.68305 0.209777C8.81978 0.266411 8.94401 0.349422 9.04866 0.454069C9.15331 0.558716 9.23632 0.68295 9.29295 0.819679C9.34959 0.956407 9.37874 1.10295 9.37874 1.25094C9.37874 1.39894 9.34959 1.54548 9.29295 1.68221C9.23632 1.81894 9.15331 1.94317 9.04866 2.04782L4.21866 6.87501H17.9999C18.2983 6.87501 18.5844 6.99353 18.7954 7.20451C19.0064 7.41549 19.1249 7.70164 19.1249 8.00001Z"
                    fill="#2B4360"
                  />
                </svg>
                Previous
              </div>
            </Button>
            <Button className="w-100" variant="default" onClick={handleSave}>
              <div className="d-flex justify-content-center align-items-center gap-2">
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="15"
                  viewBox="0 0 20 16"
                  fill="none"
                >
                  <path
                    d="M19.2959 8.79592L12.5459 15.5459C12.3346 15.7573 12.0479 15.876 11.7491 15.876C11.4502 15.876 11.1635 15.7573 10.9522 15.5459C10.7408 15.3346 10.6221 15.0479 10.6221 14.749C10.6221 14.4502 10.7408 14.1635 10.9522 13.9522L15.7812 9.12498H2C1.70163 9.12498 1.41548 9.00645 1.2045 8.79548C0.993526 8.5845 0.875 8.29835 0.875 7.99998C0.875 7.70161 0.993526 7.41546 1.2045 7.20449C1.41548 6.99351 1.70163 6.87498 2 6.87498H15.7812L10.9541 2.04498C10.7427 1.83364 10.624 1.54699 10.624 1.24811C10.624 0.94922 10.7427 0.662575 10.9541 0.451231C11.1654 0.239887 11.4521 0.121155 11.7509 0.121155C12.0498 0.121155 12.3365 0.239887 12.5478 0.451231L19.2978 7.20123C19.4027 7.30589 19.4859 7.43024 19.5426 7.56714C19.5993 7.70403 19.6284 7.85079 19.6282 7.99896C19.6281 8.14714 19.5986 8.29383 19.5416 8.43059C19.4846 8.56736 19.4011 8.69151 19.2959 8.79592Z"
                    fill="white"
                  />
                </svg>
              </div>
            </Button>
          </div>
        </>
      )}

      {step == 4 && (
        <TreatmentProgressStatus
          editProgressUpdatesData={editProgressUpdatesData}
          setEditProgressUpdatesModel={setEditProgressUpdatesModel}
          setStep={setStep}
          setStepper={setStepper}
        />
      )}
    </>
  );
}
