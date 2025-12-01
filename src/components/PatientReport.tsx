"use client";

import Image from "next/image";
import { Col, Row } from "react-bootstrap";

import { patientReport } from "../utlis/StaticData";
import { ChangeEvent, useRef, useState } from "react";
import { InputFieldGroup } from "./ui/InputField";
import { InputSelect } from "./ui/InputSelect";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { useRouter } from "next/navigation";

import Jpgimg from "@/assets/images/Jpgimg.png";
import PDFAddhar from "@/assets/images/Pdfimg.png";
import pdfimg from "@/assets/images/Pdfimg.png";
import uplodimg from "@/assets/images/Uploadimg.png";
import GreenRight from "@/assets/images/GreenRight.png";
import Trash from "@/assets/images/Trash.png";
import Cross from "@/assets/images/Cross.png";
import Delete from "@/assets/images/Delete.png";
import Loading from "@/assets/images/Loading.png";
import Completed from "@/assets/images/Completed.png";
import { PatientReportType } from "../utlis/types/interfaces";
interface UploadedFile {
  reportName: string;
  file: File;
}

const PatientReport = () => {
  const [patientReportData, setPatientReportData] =
    useState<PatientReportType[]>(patientReport);
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [fileError, setFileError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  };

  interface FormError {
    [key: string]: string;
  }
  const initialFormError: FormError = {};
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [completedFiles, setCompletedFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [aadharFile, setAadharFile] = useState<UploadedFile | null>(null);
  const [panFile, setPanFile] = useState<UploadedFile | null>(null);
  const [licenceFile, setLicenceFile] = useState<UploadedFile | null>(null);
  // const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // const [fileError, setFileError] = useState<string>("");

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
    const reportNames: string[] = [];

    uploadedFiles.forEach((file, index) => {
      const trimmedName = file.reportName.trim();

      if (!trimmedName) {
        newErrors[index] = "Report Name is required";
      } else if (reportNames.includes(trimmedName)) {
        newErrors[index] = "Report Name must be unique";
      } else {
        reportNames.push(trimmedName);
      }
    });

    setErrors(newErrors);

    // If there are no errors, proceed
    if (Object.keys(newErrors).length === 0) {
      console.log("All files are valid, proceed with save:", uploadedFiles);
       return; 
      // Do your save/upload logic here
    }
  };
  // const handleSave = () => {
  //   const newErrors: { [key: number]: string } = {};

  //   // ✅ Validation: Required + unique report names
  //   const reportNames: string[] = [];
  //   uploadedFiles.forEach((file, index) => {
  //     if (!file.reportName.trim()) {
  //       newErrors[index] = "Report Name is required";
  //     } else if (reportNames.includes(file.reportName.trim())) {
  //       newErrors[index] = "Report Name must be unique";
  //     } else {
  //       reportNames.push(file.reportName.trim());
  //     }
  //   });

  //   setErrors(newErrors);

  //   if (Object.keys(newErrors).length > 0) {
  //     return; // stop saving
  //   }

  //   const completed = uploadedFiles.filter((f) => f.status === "completed");
  //   setPatientReportData((prev:any) => [...prev, ...completed]);
  //   setUploadedFiles([]);
  //   setShowModal(false);
  // };

  const handleClose = () => {
    setShowModal(false);
    setFileError("");
  };

  return (
    <>
      <div className="d-md-flex d-sm-none justify-content-between  mb-4">
        <InputFieldGroup
          name="search"
          type="text"
          // value={formData.name}
          // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          //     setSearchTerm(e.target.value); /
          // }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
          placeholder="search"
          required={false}
          disabled={false}
          readOnly={false}
          // error={formError.name}
          className="position-relative blood-test-search patient-header-search patient-header-search-width "
        >
          <div className="blood-test-search-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <path
                d="M18.5677 16.8364L14.8576 13.1246C15.97 11.675 16.4893 9.85652 16.3103 8.03804C16.1312 6.21956 15.2672 4.53728 13.8934 3.33245C12.5196 2.12762 10.7389 1.49047 8.91264 1.55024C7.08635 1.61001 5.35117 2.36223 4.05909 3.65431C2.76702 4.94638 2.0148 6.68156 1.95503 8.50785C1.89526 10.3341 2.53241 12.1148 3.73724 13.4886C4.94207 14.8624 6.62435 15.7264 8.44283 15.9055C10.2613 16.0846 12.0798 15.5652 13.5294 14.4528L17.2427 18.1668C17.3299 18.254 17.4335 18.3232 17.5474 18.3704C17.6613 18.4176 17.7835 18.4419 17.9068 18.4419C18.0301 18.4419 18.1522 18.4176 18.2662 18.3704C18.3801 18.3232 18.4836 18.254 18.5708 18.1668C18.658 18.0796 18.7272 17.9761 18.7744 17.8622C18.8216 17.7482 18.8459 17.6261 18.8459 17.5028C18.8459 17.3794 18.8216 17.2573 18.7744 17.1434C18.7272 17.0294 18.658 16.9259 18.5708 16.8387L18.5677 16.8364ZM3.84193 8.74965C3.84193 7.69894 4.15351 6.67182 4.73725 5.79818C5.321 4.92455 6.1507 4.24363 7.12143 3.84154C8.09216 3.43945 9.16033 3.33424 10.1909 3.53923C11.2214 3.74421 12.168 4.25018 12.9109 4.99314C13.6539 5.73611 14.1599 6.68271 14.3649 7.71323C14.5698 8.74376 14.4646 9.81192 14.0625 10.7827C13.6605 11.7534 12.9795 12.5831 12.1059 13.1668C11.2323 13.7506 10.2051 14.0621 9.15444 14.0621C7.74592 14.0607 6.3955 13.5005 5.39953 12.5046C4.40356 11.5086 3.84338 10.1582 3.84193 8.74965Z"
                fill="#B0B4C1"
              />
            </svg>
          </div>
        </InputFieldGroup>

        <div className="d-flex flex-sm-row align-items-center gap-sm-3 gap-2 flex-column flex-column-revserse mt-sm-0 mt-2">
          <div className="d-flex align-items-center gap-2">
            <span className="sort-by-lable">Sort by:</span>
            <InputSelect
              label=""
              name="tests"
              // value={formData.tests}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {}}
              required={true}
              disabled={false}
              placeholder="All Time"
              className="patient-header-select-filter"
              // error={formError.tests}
              options={[
                { id: "1", value: "Today", label: "Today" },
                { id: "2", value: "Yesterday", label: "Yesterday" },
                { id: "3", value: "tomorrow", label: "tomorrow" },
              ]}
            />
            <div className="patient-header-filter-icon-box ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  d="M6.30166 10.6484V4.55469C6.30166 4.35578 6.22264 4.16501 6.08199 4.02436C5.94134 3.88371 5.75057 3.80469 5.55166 3.80469C5.35275 3.80469 5.16198 3.88371 5.02133 4.02436C4.88068 4.16501 4.80166 4.35578 4.80166 4.55469V10.6484C4.15635 10.8137 3.58438 11.189 3.17593 11.7152C2.76748 12.2414 2.54578 12.8886 2.54578 13.5547C2.54578 14.2208 2.76748 14.868 3.17593 15.3942C3.58438 15.9204 4.15635 16.2957 4.80166 16.4609V21.0547C4.80166 21.2536 4.88068 21.4444 5.02133 21.585C5.16198 21.7257 5.35275 21.8047 5.55166 21.8047C5.75057 21.8047 5.94134 21.7257 6.08199 21.585C6.22264 21.4444 6.30166 21.2536 6.30166 21.0547V16.4609C6.94697 16.2957 7.51894 15.9204 7.92739 15.3942C8.33584 14.868 8.55754 14.2208 8.55754 13.5547C8.55754 12.8886 8.33584 12.2414 7.92739 11.7152C7.51894 11.189 6.94697 10.8137 6.30166 10.6484ZM5.55166 15.0547C5.25499 15.0547 4.96498 14.9667 4.7183 14.8019C4.47163 14.6371 4.27937 14.4028 4.16584 14.1287C4.05231 13.8546 4.0226 13.553 4.08048 13.2621C4.13836 12.9711 4.28122 12.7038 4.491 12.494C4.70078 12.2842 4.96805 12.1414 5.25902 12.0835C5.54999 12.0256 5.8516 12.0553 6.12568 12.1689C6.39977 12.2824 6.63404 12.4747 6.79886 12.7213C6.96369 12.968 7.05166 13.258 7.05166 13.5547C7.05166 13.9525 6.89362 14.334 6.61232 14.6153C6.33101 14.8967 5.94948 15.0547 5.55166 15.0547ZM13.0517 6.14844V4.55469C13.0517 4.35578 12.9726 4.16501 12.832 4.02436C12.6913 3.88371 12.5006 3.80469 12.3017 3.80469C12.1027 3.80469 11.912 3.88371 11.7713 4.02436C11.6307 4.16501 11.5517 4.35578 11.5517 4.55469V6.14844C10.9063 6.31366 10.3344 6.68896 9.92593 7.21517C9.51748 7.74138 9.29578 8.38856 9.29578 9.05469C9.29578 9.72082 9.51748 10.368 9.92593 10.8942C10.3344 11.4204 10.9063 11.7957 11.5517 11.9609V21.0547C11.5517 21.2536 11.6307 21.4444 11.7713 21.585C11.912 21.7257 12.1027 21.8047 12.3017 21.8047C12.5006 21.8047 12.6913 21.7257 12.832 21.585C12.9726 21.4444 13.0517 21.2536 13.0517 21.0547V11.9609C13.697 11.7957 14.2689 11.4204 14.6774 10.8942C15.0858 10.368 15.3075 9.72082 15.3075 9.05469C15.3075 8.38856 15.0858 7.74138 14.6774 7.21517C14.2689 6.68896 13.697 6.31366 13.0517 6.14844ZM12.3017 10.5547C12.005 10.5547 11.715 10.4667 11.4683 10.3019C11.2216 10.1371 11.0294 9.9028 10.9158 9.62871C10.8023 9.35462 10.7726 9.05302 10.8305 8.76205C10.8884 8.47108 11.0312 8.20381 11.241 7.99403C11.4508 7.78425 11.7181 7.64139 12.009 7.58351C12.3 7.52563 12.6016 7.55534 12.8757 7.66887C13.1498 7.7824 13.384 7.97466 13.5489 8.22133C13.7137 8.46801 13.8017 8.75802 13.8017 9.05469C13.8017 9.45251 13.6436 9.83404 13.3623 10.1153C13.081 10.3967 12.6995 10.5547 12.3017 10.5547ZM22.0517 16.5547C22.051 15.8896 21.8298 15.2435 21.4227 14.7176C21.0155 14.1917 20.4454 13.8156 19.8017 13.6484V4.55469C19.8017 4.35578 19.7226 4.16501 19.582 4.02436C19.4413 3.88371 19.2506 3.80469 19.0517 3.80469C18.8527 3.80469 18.662 3.88371 18.5213 4.02436C18.3807 4.16501 18.3017 4.35578 18.3017 4.55469V13.6484C17.6563 13.8137 17.0844 14.189 16.6759 14.7152C16.2675 15.2414 16.0458 15.8886 16.0458 16.5547C16.0458 17.2208 16.2675 17.868 16.6759 18.3942C17.0844 18.9204 17.6563 19.2957 18.3017 19.4609V21.0547C18.3017 21.2536 18.3807 21.4444 18.5213 21.585C18.662 21.7257 18.8527 21.8047 19.0517 21.8047C19.2506 21.8047 19.4413 21.7257 19.582 21.585C19.7226 21.4444 19.8017 21.2536 19.8017 21.0547V19.4609C20.4454 19.2937 21.0155 18.9177 21.4227 18.3918C21.8298 17.8659 22.051 17.2198 22.0517 16.5547ZM19.0517 18.0547C18.755 18.0547 18.465 17.9667 18.2183 17.8019C17.9716 17.6371 17.7794 17.4028 17.6658 17.1287C17.5523 16.8546 17.5226 16.553 17.5805 16.2621C17.6384 15.9711 17.7812 15.7038 17.991 15.494C18.2008 15.2842 18.4681 15.1414 18.759 15.0835C19.05 15.0256 19.3516 15.0553 19.6257 15.1689C19.8998 15.2824 20.134 15.4747 20.2989 15.7213C20.4637 15.968 20.5517 16.258 20.5517 16.5547C20.5517 16.9525 20.3936 17.334 20.1123 17.6153C19.831 17.8967 19.4495 18.0547 19.0517 18.0547Z"
                  fill="#2B4360"
                />
              </svg>
            </div>
          </div>

          <Button variant="default" onClick={handleOpenModal}>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  d="M21.6766 13.7665V19.7665C21.6766 20.0649 21.5581 20.351 21.3471 20.562C21.1362 20.773 20.85 20.8915 20.5516 20.8915H4.05164C3.75327 20.8915 3.46712 20.773 3.25614 20.562C3.04516 20.351 2.92664 20.0649 2.92664 19.7665V13.7665C2.92664 13.4681 3.04516 13.182 3.25614 12.971C3.46712 12.76 3.75327 12.6415 4.05164 12.6415C4.35 12.6415 4.63615 12.76 4.84713 12.971C5.05811 13.182 5.17664 13.4681 5.17664 13.7665V18.6415H19.4266V13.7665C19.4266 13.4681 19.5452 13.182 19.7561 12.971C19.9671 12.76 20.2533 12.6415 20.5516 12.6415C20.85 12.6415 21.1362 12.76 21.3471 12.971C21.5581 13.182 21.6766 13.4681 21.6766 13.7665ZM9.34757 7.81245L11.1766 5.98526V13.7665C11.1766 14.0649 11.2952 14.351 11.5061 14.562C11.7171 14.773 12.0033 14.8915 12.3016 14.8915C12.6 14.8915 12.8862 14.773 13.0971 14.562C13.3081 14.351 13.4266 14.0649 13.4266 13.7665V5.98526L15.2557 7.81526C15.3603 7.91991 15.4846 8.00292 15.6213 8.05955C15.758 8.11619 15.9046 8.14534 16.0526 8.14534C16.2006 8.14534 16.3471 8.11619 16.4838 8.05955C16.6206 8.00292 16.7448 7.91991 16.8494 7.81526C16.9541 7.71061 17.0371 7.58638 17.0937 7.44965C17.1504 7.31292 17.1795 7.16638 17.1795 7.01839C17.1795 6.87039 17.1504 6.72385 17.0937 6.58712C17.0371 6.45039 16.9541 6.32616 16.8494 6.22151L13.0994 2.47151C12.9949 2.36663 12.8707 2.28342 12.734 2.22663C12.5972 2.16985 12.4506 2.14063 12.3026 2.14062C12.1545 2.14063 12.0079 2.16985 11.8712 2.22663C11.7344 2.28342 11.6102 2.36663 11.5057 2.47151L7.7557 6.22151C7.65105 6.32616 7.56804 6.45039 7.51141 6.58712C7.45477 6.72385 7.42562 6.87039 7.42562 7.01839C7.42562 7.31727 7.54435 7.60392 7.7557 7.81526C7.96704 8.02661 8.25369 8.14534 8.55257 8.14534C8.85146 8.14534 9.1381 8.02661 9.34945 7.81526L9.34757 7.81245Z"
                  fill="white"
                />
              </svg>
              Upload Report
            </div>
          </Button>
        </div>
      </div>

      <div className="d-md-none d-sm-flex d-none flex-column align-items-sm-start align-items-center gap-3 mb-3">
        <div className="d-flex align-items-center justify-content-sm-start justify-content-center flex-wrap gap-3 w-100">
          <div className="patient-header-search-width">
            <InputFieldGroup
              name="search"
              type="text"
              // value={formData.name}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              //     setSearchTerm(e.target.value); /
              // }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
              placeholder="search"
              required={false}
              disabled={false}
              readOnly={false}
              // error={formError.name}
              className="position-relative blood-test-search patient-header-search w-100"
            >
              <div className="blood-test-search-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <path
                    d="M18.5677 16.8364L14.8576 13.1246C15.97 11.675 16.4893 9.85652 16.3103 8.03804C16.1312 6.21956 15.2672 4.53728 13.8934 3.33245C12.5196 2.12762 10.7389 1.49047 8.91264 1.55024C7.08635 1.61001 5.35117 2.36223 4.05909 3.65431C2.76702 4.94638 2.0148 6.68156 1.95503 8.50785C1.89526 10.3341 2.53241 12.1148 3.73724 13.4886C4.94207 14.8624 6.62435 15.7264 8.44283 15.9055C10.2613 16.0846 12.0798 15.5652 13.5294 14.4528L17.2427 18.1668C17.3299 18.254 17.4335 18.3232 17.5474 18.3704C17.6613 18.4176 17.7835 18.4419 17.9068 18.4419C18.0301 18.4419 18.1522 18.4176 18.2662 18.3704C18.3801 18.3232 18.4836 18.254 18.5708 18.1668C18.658 18.0796 18.7272 17.9761 18.7744 17.8622C18.8216 17.7482 18.8459 17.6261 18.8459 17.5028C18.8459 17.3794 18.8216 17.2573 18.7744 17.1434C18.7272 17.0294 18.658 16.9259 18.5708 16.8387L18.5677 16.8364ZM3.84193 8.74965C3.84193 7.69894 4.15351 6.67182 4.73725 5.79818C5.321 4.92455 6.1507 4.24363 7.12143 3.84154C8.09216 3.43945 9.16033 3.33424 10.1909 3.53923C11.2214 3.74421 12.168 4.25018 12.9109 4.99314C13.6539 5.73611 14.1599 6.68271 14.3649 7.71323C14.5698 8.74376 14.4646 9.81192 14.0625 10.7827C13.6605 11.7534 12.9795 12.5831 12.1059 13.1668C11.2323 13.7506 10.2051 14.0621 9.15444 14.0621C7.74592 14.0607 6.3955 13.5005 5.39953 12.5046C4.40356 11.5086 3.84338 10.1582 3.84193 8.74965Z"
                    fill="#B0B4C1"
                  />
                </svg>
              </div>
            </InputFieldGroup>
          </div>
          <Button variant="default" onClick={handleOpenModal}>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  d="M21.6766 13.7665V19.7665C21.6766 20.0649 21.5581 20.351 21.3471 20.562C21.1362 20.773 20.85 20.8915 20.5516 20.8915H4.05164C3.75327 20.8915 3.46712 20.773 3.25614 20.562C3.04516 20.351 2.92664 20.0649 2.92664 19.7665V13.7665C2.92664 13.4681 3.04516 13.182 3.25614 12.971C3.46712 12.76 3.75327 12.6415 4.05164 12.6415C4.35 12.6415 4.63615 12.76 4.84713 12.971C5.05811 13.182 5.17664 13.4681 5.17664 13.7665V18.6415H19.4266V13.7665C19.4266 13.4681 19.5452 13.182 19.7561 12.971C19.9671 12.76 20.2533 12.6415 20.5516 12.6415C20.85 12.6415 21.1362 12.76 21.3471 12.971C21.5581 13.182 21.6766 13.4681 21.6766 13.7665ZM9.34757 7.81245L11.1766 5.98526V13.7665C11.1766 14.0649 11.2952 14.351 11.5061 14.562C11.7171 14.773 12.0033 14.8915 12.3016 14.8915C12.6 14.8915 12.8862 14.773 13.0971 14.562C13.3081 14.351 13.4266 14.0649 13.4266 13.7665V5.98526L15.2557 7.81526C15.3603 7.91991 15.4846 8.00292 15.6213 8.05955C15.758 8.11619 15.9046 8.14534 16.0526 8.14534C16.2006 8.14534 16.3471 8.11619 16.4838 8.05955C16.6206 8.00292 16.7448 7.91991 16.8494 7.81526C16.9541 7.71061 17.0371 7.58638 17.0937 7.44965C17.1504 7.31292 17.1795 7.16638 17.1795 7.01839C17.1795 6.87039 17.1504 6.72385 17.0937 6.58712C17.0371 6.45039 16.9541 6.32616 16.8494 6.22151L13.0994 2.47151C12.9949 2.36663 12.8707 2.28342 12.734 2.22663C12.5972 2.16985 12.4506 2.14063 12.3026 2.14062C12.1545 2.14063 12.0079 2.16985 11.8712 2.22663C11.7344 2.28342 11.6102 2.36663 11.5057 2.47151L7.7557 6.22151C7.65105 6.32616 7.56804 6.45039 7.51141 6.58712C7.45477 6.72385 7.42562 6.87039 7.42562 7.01839C7.42562 7.31727 7.54435 7.60392 7.7557 7.81526C7.96704 8.02661 8.25369 8.14534 8.55257 8.14534C8.85146 8.14534 9.1381 8.02661 9.34945 7.81526L9.34757 7.81245Z"
                  fill="white"
                />
              </svg>
              Upload Report
            </div>
          </Button>
        </div>
        <div className="d-flex flex-wrap align-items-center gap-3">
          <span className="sort-by-lable">Sort by:</span>
          <InputSelect
            label=""
            name="tests"
            // value={formData.tests}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handleChange(e);
            }}
            onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {}}
            required={true}
            disabled={false}
            placeholder="All Time"
            className="patient-header-select-filter"
            // error={formError.tests}
            options={[
              { id: "1", value: "Today", label: "Today" },
              { id: "2", value: "Yesterday", label: "Yesterday" },
              { id: "3", value: "tomorrow", label: "tomorrow" },
            ]}
          />

          <div className="patient-header-filter-icon-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M6.30166 10.6484V4.55469C6.30166 4.35578 6.22264 4.16501 6.08199 4.02436C5.94134 3.88371 5.75057 3.80469 5.55166 3.80469C5.35275 3.80469 5.16198 3.88371 5.02133 4.02436C4.88068 4.16501 4.80166 4.35578 4.80166 4.55469V10.6484C4.15635 10.8137 3.58438 11.189 3.17593 11.7152C2.76748 12.2414 2.54578 12.8886 2.54578 13.5547C2.54578 14.2208 2.76748 14.868 3.17593 15.3942C3.58438 15.9204 4.15635 16.2957 4.80166 16.4609V21.0547C4.80166 21.2536 4.88068 21.4444 5.02133 21.585C5.16198 21.7257 5.35275 21.8047 5.55166 21.8047C5.75057 21.8047 5.94134 21.7257 6.08199 21.585C6.22264 21.4444 6.30166 21.2536 6.30166 21.0547V16.4609C6.94697 16.2957 7.51894 15.9204 7.92739 15.3942C8.33584 14.868 8.55754 14.2208 8.55754 13.5547C8.55754 12.8886 8.33584 12.2414 7.92739 11.7152C7.51894 11.189 6.94697 10.8137 6.30166 10.6484ZM5.55166 15.0547C5.25499 15.0547 4.96498 14.9667 4.7183 14.8019C4.47163 14.6371 4.27937 14.4028 4.16584 14.1287C4.05231 13.8546 4.0226 13.553 4.08048 13.2621C4.13836 12.9711 4.28122 12.7038 4.491 12.494C4.70078 12.2842 4.96805 12.1414 5.25902 12.0835C5.54999 12.0256 5.8516 12.0553 6.12568 12.1689C6.39977 12.2824 6.63404 12.4747 6.79886 12.7213C6.96369 12.968 7.05166 13.258 7.05166 13.5547C7.05166 13.9525 6.89362 14.334 6.61232 14.6153C6.33101 14.8967 5.94948 15.0547 5.55166 15.0547ZM13.0517 6.14844V4.55469C13.0517 4.35578 12.9726 4.16501 12.832 4.02436C12.6913 3.88371 12.5006 3.80469 12.3017 3.80469C12.1027 3.80469 11.912 3.88371 11.7713 4.02436C11.6307 4.16501 11.5517 4.35578 11.5517 4.55469V6.14844C10.9063 6.31366 10.3344 6.68896 9.92593 7.21517C9.51748 7.74138 9.29578 8.38856 9.29578 9.05469C9.29578 9.72082 9.51748 10.368 9.92593 10.8942C10.3344 11.4204 10.9063 11.7957 11.5517 11.9609V21.0547C11.5517 21.2536 11.6307 21.4444 11.7713 21.585C11.912 21.7257 12.1027 21.8047 12.3017 21.8047C12.5006 21.8047 12.6913 21.7257 12.832 21.585C12.9726 21.4444 13.0517 21.2536 13.0517 21.0547V11.9609C13.697 11.7957 14.2689 11.4204 14.6774 10.8942C15.0858 10.368 15.3075 9.72082 15.3075 9.05469C15.3075 8.38856 15.0858 7.74138 14.6774 7.21517C14.2689 6.68896 13.697 6.31366 13.0517 6.14844ZM12.3017 10.5547C12.005 10.5547 11.715 10.4667 11.4683 10.3019C11.2216 10.1371 11.0294 9.9028 10.9158 9.62871C10.8023 9.35462 10.7726 9.05302 10.8305 8.76205C10.8884 8.47108 11.0312 8.20381 11.241 7.99403C11.4508 7.78425 11.7181 7.64139 12.009 7.58351C12.3 7.52563 12.6016 7.55534 12.8757 7.66887C13.1498 7.7824 13.384 7.97466 13.5489 8.22133C13.7137 8.46801 13.8017 8.75802 13.8017 9.05469C13.8017 9.45251 13.6436 9.83404 13.3623 10.1153C13.081 10.3967 12.6995 10.5547 12.3017 10.5547ZM22.0517 16.5547C22.051 15.8896 21.8298 15.2435 21.4227 14.7176C21.0155 14.1917 20.4454 13.8156 19.8017 13.6484V4.55469C19.8017 4.35578 19.7226 4.16501 19.582 4.02436C19.4413 3.88371 19.2506 3.80469 19.0517 3.80469C18.8527 3.80469 18.662 3.88371 18.5213 4.02436C18.3807 4.16501 18.3017 4.35578 18.3017 4.55469V13.6484C17.6563 13.8137 17.0844 14.189 16.6759 14.7152C16.2675 15.2414 16.0458 15.8886 16.0458 16.5547C16.0458 17.2208 16.2675 17.868 16.6759 18.3942C17.0844 18.9204 17.6563 19.2957 18.3017 19.4609V21.0547C18.3017 21.2536 18.3807 21.4444 18.5213 21.585C18.662 21.7257 18.8527 21.8047 19.0517 21.8047C19.2506 21.8047 19.4413 21.7257 19.582 21.585C19.7226 21.4444 19.8017 21.2536 19.8017 21.0547V19.4609C20.4454 19.2937 21.0155 18.9177 21.4227 18.3918C21.8298 17.8659 22.051 17.2198 22.0517 16.5547ZM19.0517 18.0547C18.755 18.0547 18.465 17.9667 18.2183 17.8019C17.9716 17.6371 17.7794 17.4028 17.6658 17.1287C17.5523 16.8546 17.5226 16.553 17.5805 16.2621C17.6384 15.9711 17.7812 15.7038 17.991 15.494C18.2008 15.2842 18.4681 15.1414 18.759 15.0835C19.05 15.0256 19.3516 15.0553 19.6257 15.1689C19.8998 15.2824 20.134 15.4747 20.2989 15.7213C20.4637 15.968 20.5517 16.258 20.5517 16.5547C20.5517 16.9525 20.3936 17.334 20.1123 17.6153C19.831 17.8967 19.4495 18.0547 19.0517 18.0547Z"
                fill="#2B4360"
              />
            </svg>
          </div>
        </div>
      </div>

      <div>
        {/* Add New File */}

        {/* modal save button click in add data  */}
        <div className="d-flex gap-3 flex-wrap ">
          {completedFiles.map((file, idx) => (
            <div
              key={idx}
              className="qualification-certificates rounded-3 p-4 text-center position-relative bg-white qualification-certificates-data"
            >
              {/* Delete Icon */}
              <button
                className="btn p-0 position-absolute top-0 end-0 m-2 qualification-certificates-btn"
                onClick={() =>
                  setCompletedFiles((prev) => prev.filter((_, i) => i !== idx))
                }
              >
                <div className=" profile-card-boeder rounded-2 d-inline-flex p-1">
                  <Image src={Trash} alt="delete" width={18} height={18} />
                </div>
              </button>
              {/* File Icon (PDF or Image) */}
              <Image
                src={
                  file.name?.toLowerCase().endsWith(".pdf")
                    ? pdfimg
                    : [".jpg", ".jpeg", ".png", ".gif"].some((ext) =>
                        file.name?.toLowerCase().endsWith(ext)
                      )
                    ? Jpgimg
                    : pdfimg
                }
                alt={file.name}
                width={40}
                height={40}
              />

              {/* File Title */}
              <div
                className="mt-2 card-feild text-truncate d-block qualification-certificates-file-title"
                title={file.reportName || file.name}
              >
                {file.reportName || file.name}
              </div>

              {/* File Name */}
              <div className="card-year text-truncate d-block qualification-certificates-file-title">
                {file.name}
              </div>

              {/* File Size & Date */}
              <div className="card-year">
                {file.size} •{" "}
                {file.uploadedAt
                  ? new Date(file.uploadedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : ""}
              </div>
            </div>
          ))}
        </div>

        <Modal
          show={showModal}
          onHide={handleClose}
          header="Upload Documents"
          closeButton
          // dialogClassName="custom-modal-width"
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
      </div>

      <Row className="g-3 row-cols-1 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">
        {/* {patientReportData.map((item, index) => (
                    <Col key={index}>
                        <div className="patient-report-box">
                            <Image src={item.img} width={90} height={90} alt="report" className="patient-report-img" />

                            <h6 className="patient-report-box-title mt-2 m-0">{item.title}</h6>
                            <p className="patient-report-box-subtitle m-0">{item.subtitle}</p>
                            <p className="patient-report-box-fileInfo m-0">{item.fileInfo}</p>


                            <div className="icons-wrapper d-flex gap-2 align-items-center mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                    <path d="M21.875 13.5V19.5C21.875 19.7984 21.7565 20.0845 21.5455 20.2955C21.3345 20.5065 21.0484 20.625 20.75 20.625H4.25C3.95163 20.625 3.66548 20.5065 3.4545 20.2955C3.24353 20.0845 3.125 19.7984 3.125 19.5V13.5C3.125 13.2016 3.24353 12.9155 3.4545 12.7045C3.66548 12.4935 3.95163 12.375 4.25 12.375C4.54837 12.375 4.83452 12.4935 5.0455 12.7045C5.25647 12.9155 5.375 13.2016 5.375 13.5V18.375H19.625V13.5C19.625 13.2016 19.7435 12.9155 19.9545 12.7045C20.1655 12.4935 20.4516 12.375 20.75 12.375C21.0484 12.375 21.3345 12.4935 21.5455 12.7045C21.7565 12.9155 21.875 13.2016 21.875 13.5ZM11.7041 14.2959C11.8086 14.4008 11.9328 14.484 12.0695 14.5408C12.2063 14.5976 12.3529 14.6268 12.5009 14.6268C12.649 14.6268 12.7956 14.5976 12.9324 14.5408C13.0691 14.484 13.1933 14.4008 13.2978 14.2959L17.0478 10.5459C17.2592 10.3346 17.3779 10.0479 17.3779 9.74906C17.3779 9.45018 17.2592 9.16353 17.0478 8.95219C16.8365 8.74084 16.5498 8.62211 16.2509 8.62211C15.9521 8.62211 15.6654 8.74084 15.4541 8.95219L13.625 10.7812V3C13.625 2.70163 13.5065 2.41548 13.2955 2.2045C13.0845 1.99353 12.7984 1.875 12.5 1.875C12.2016 1.875 11.9155 1.99353 11.7045 2.2045C11.4935 2.41548 11.375 2.70163 11.375 3V10.7812L9.54594 8.95406C9.44129 8.84942 9.31706 8.7664 9.18033 8.70977C9.0436 8.65314 8.89706 8.62399 8.74906 8.62399C8.45018 8.62399 8.16353 8.74272 7.95219 8.95406C7.84754 9.05871 7.76453 9.18294 7.7079 9.31967C7.65126 9.4564 7.62211 9.60294 7.62211 9.75094C7.62211 10.0498 7.74084 10.3365 7.95219 10.5478L11.7041 14.2959Z" fill="#2B4360" />
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
                                    <rect x="1.3457" y="1.44141" width="39" height="39" rx="7.5" fill="white" />
                                    <rect x="1.3457" y="1.44141" width="39" height="39" rx="7.5" stroke="#DDE1E8" />
                                    <path d="M30.1668 20.6883C30.1394 20.6266 29.4777 19.1586 28.0066 17.6875C26.0465 15.7273 23.5707 14.6914 20.8457 14.6914C18.1207 14.6914 15.6449 15.7273 13.6848 17.6875C12.2137 19.1586 11.5488 20.6289 11.5246 20.6883C11.4891 20.7682 11.4707 20.8547 11.4707 20.9422C11.4707 21.0297 11.4891 21.1162 11.5246 21.1961C11.5519 21.2578 12.2137 22.725 13.6848 24.1961C15.6449 26.1555 18.1207 27.1914 20.8457 27.1914C23.5707 27.1914 26.0465 26.1555 28.0066 24.1961C29.4777 22.725 30.1394 21.2578 30.1668 21.1961C30.2023 21.1162 30.2207 21.0297 30.2207 20.9422C30.2207 20.8547 30.2023 20.7682 30.1668 20.6883ZM20.8457 25.9414C18.441 25.9414 16.3402 25.0672 14.6012 23.3438C13.8876 22.6341 13.2805 21.825 12.7988 20.9414C13.2804 20.0578 13.8875 19.2486 14.6012 18.5391C16.3402 16.8156 18.441 15.9414 20.8457 15.9414C23.2504 15.9414 25.3512 16.8156 27.0902 18.5391C27.8052 19.2484 28.4136 20.0576 28.8965 20.9414C28.3332 21.993 25.8793 25.9414 20.8457 25.9414ZM20.8457 17.1914C20.104 17.1914 19.379 17.4113 18.7623 17.8234C18.1456 18.2355 17.665 18.8211 17.3811 19.5063C17.0973 20.1916 17.0231 20.9456 17.1678 21.673C17.3124 22.4004 17.6696 23.0686 18.194 23.5931C18.7185 24.1175 19.3867 24.4747 20.1141 24.6194C20.8415 24.764 21.5955 24.6898 22.2808 24.406C22.966 24.1221 23.5517 23.6415 23.9637 23.0248C24.3758 22.4081 24.5957 21.6831 24.5957 20.9414C24.5947 19.9472 24.1992 18.9939 23.4962 18.2909C22.7932 17.5879 21.8399 17.1924 20.8457 17.1914ZM20.8457 23.4414C20.3512 23.4414 19.8679 23.2948 19.4568 23.0201C19.0456 22.7454 18.7252 22.3549 18.536 21.8981C18.3468 21.4413 18.2973 20.9386 18.3937 20.4537C18.4902 19.9687 18.7283 19.5233 19.0779 19.1736C19.4276 18.824 19.873 18.5859 20.358 18.4894C20.8429 18.393 21.3456 18.4425 21.8024 18.6317C22.2592 18.8209 22.6497 19.1414 22.9244 19.5525C23.1991 19.9636 23.3457 20.447 23.3457 20.9414C23.3457 21.6044 23.0823 22.2403 22.6135 22.7092C22.1446 23.178 21.5087 23.4414 20.8457 23.4414Z" fill="#2B4360" />
                                </svg>
                            </div>
                        </div>
                    </Col>
                ))} */}

        {patientReportData.map((item, index) => (
          <Col key={index}>
            <div className="patient-report-box">
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
                width={90}
                height={90}
                alt="report"
                className="patient-report-img"
              />
              <h6 className="patient-report-box-title mt-2 m-0">
                {item.reportName}
              </h6>
              <p className="patient-report-box-subtitle m-0">{item.name}</p>
              <p className="patient-report-box-fileInfo m-0">
                {item.size} •{" "}
                {item.uploadedAt
                  ? new Date(item.uploadedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : ""}
              </p>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default PatientReport;
