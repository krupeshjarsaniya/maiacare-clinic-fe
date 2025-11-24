import React, { useRef, useState } from "react";
import ContentContainer from "../ui/ContentContainer";
import Image from "next/image";
import report from "../../assets/images/medical-reports.png";
import Button from "../ui/Button";
import uplodimg from "../../assets/images/Uploadimg.png";
import Modal from "../ui/Modal";
import pdfimg from "../../assets/images/Pdfimg.png";
import Jpgimg from "../../assets/images/Jpgimg.png";
import PDFAddhar from "@/assets/images/Pdfimg.png";
import Completed from "@/assets/images/Completed.png";
import Cross from "@/assets/images/Cross.png";
import Delete from "@/assets/images/Delete.png";
import Loading from "@/assets/images/Loading.png";
import { Col, Row } from "react-bootstrap";
import GreenRight from "@/assets/images/GreenRight.png";
import { ProgressUpdatesType } from "@/utlis/types/interfaces";
import {
  IVFProgressData,
  medicationPrescriptionData,
  StatusAndUpdatesData,
} from "@/utlis/StaticData";
import { InputFieldGroup } from "../ui/InputField";
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

export default function ReportDetails() {
  const [progressUpdatesData, setProgressUpdatesData] =
    useState<ProgressUpdatesType>(ProgressUpdatesStaticData);
  const [editProgressUpdatesData, setEditProgressUpdatesData] =
    useState<ProgressUpdatesType>(initialProgressUpdatesData);
  const [showModal, setShowModal] = useState(false);
  const [fileError, setFileError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  interface FormError {
    [key: string]: string;
  }
  const initialFormError: FormError = {};
  const [formError, setFormError] = useState<FormError>(initialFormError);

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
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
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

  const handleClose = () => {
    setShowModal(false);
    setFileError(""); // file upload error reset (jo use karto hoy to)
  };
const handleSave = () => {
    let newErrors: { [key: number]: string } = {};

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

    // setCompletedFiles((prev) => [...prev, ...completed]);
    // setPatientReportData((prev: any) => [...prev, ...completed]);
    // setPatientReport((prev: any) => [...prev, ...completed]);
    setProgressUpdatesData((prev: any) => ({
      ...prev,
      report: [...prev.report, ...completed],
    }));

    setUploadedFiles([]);
    setShowModal(false);
  };

  return (
    <div>
      <ContentContainer>
        <div className="contact-details-heading m-0">Reports</div>
        {progressUpdatesData.report.length > 0 ? (
          <>
            <Row className="mt-3">
              {progressUpdatesData.report.map((item, index) => {
                return (
                  <Col key={index} >
                    <div className="d-flex justify-content-between align-items-center report-box mb-3">
                      <div className="d-flex gap-2">
                        <Image
                          src={
                            item.name?.toLowerCase().endsWith(".pdf")
                              ? pdfimg
                              : [".jpg", ".jpeg", ".png", ".gif"].some((ext) =>
                                  item.name?.toLowerCase().endsWith(ext)
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
                          <span className="select-profile-subtitle ">
                            {item.name}
                          </span>
                          <span className="select-profile-subtitle">
                            {/* {item.size} •{" "} */}
                            {item.uploadedAt
                              ? new Date(item.uploadedAt).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
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
             Upload Reports
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
                    {/* <Image src={Jpgimg} alt="pdf" width={45} height={50} /> */}
                    <Image
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
                    />

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
              Cancel
            </Button>
            <Button className="w-100" variant="default" onClick={handleSave}>
              Save
            </Button>
          </div>
        </Modal>
      </ContentContainer>
    </div>
  );
}
