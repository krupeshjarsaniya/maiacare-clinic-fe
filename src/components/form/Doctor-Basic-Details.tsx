import React, { ChangeEvent, useEffect, useState } from "react";
import { Container, Row, Col, Form, Table, Accordion } from "react-bootstrap";

import Delete from "../../assets/images/Delete.png";
import LightEditimg from "../../assets/images/LightEditimg.png";
import Pdfimg from "../../assets/images/Pdfimg.png";
import Download from "../../assets/images/Download.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import phone from "../../assets/images/Phone.png";
import ContentContainer from "../ui/ContentContainer";
import EditProfile from "../assets/images/LightEditimg.png";

import editprofile from "../../assets/images/EditProfile.png";
import Modal from "../ui/Modal";
import { InputFieldGroup } from "../ui/InputField";
import { InputSelect } from "../../components/ui/InputSelect";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import DummyPatientImage from "../../assets/images/cliniccard.png";
import Arrowup from "../../assets/images/ArrowUpRight.png";
import {
  ClinicDetails,
  DoctorDetails,
  Qualification,
} from "@/utlis/types/interfaces";
import {
  addQualifications,
  deleteQualifications,
  editQualifications,
} from "@/utlis/apis/apiHelper";
import DeleteConfirmModal from "../ui/DeleteConfirmModal";
import { AxiosResponse } from "axios";
import { LuPlus } from "react-icons/lu";
import { doctorlistingModalData } from "@/utlis/StaticData";
type DocumentItem = {
  name: string;
  file: string;
  date: string | number | Date;
};
export interface DoctorQualification {
  _id?: string;
  degree: string;
  fieldOfStudy: string;
  university: string;
  startYear: number | string;
  endYear: number | string;
}
export interface OperationalHour {
  _id?: string;
  day: string;
  openTime: string;
  closeTime: string;
}
export interface QualificationUI {
  _id?: string;
  title: string;
  university: string;
  years: string;
  degree: string;
  fieldofstudy: string; // UI-only
  startYear: string;
  endYear: string;
}

const DoctorBasicDetails = ({
  DoctorData,
  fetchPatientData,
  doctorIdShow,
}: {
  DoctorData?: DoctorDetails | null;
  fetchPatientData?: () => void;
  doctorIdShow: string | number | undefined;
}) => {
  interface FormError {
    [key: string]: string;
  }

  const router = useRouter();

  const initialFormError: FormError = {};

  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [activeTab] = useState("basic");
  const [startTime, setStartTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [endTime, setEndTime] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAllQualifications, setShowAllQualifications] = useState(false);
  const [showAllDocuments, setShowAllDocuments] = useState(false);
  const [showFullAbout, setShowFullAbout] = useState(false);

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedId(null);
  };

  const openDeleteModal = (id?: string) => {
    if (!id) {
      toast.error("Invalid qualification ID");
      return;
    }
    setSelectedId(id);
    setShowDeleteModal(true);
  };
  const [defaultQualifications, setDefaultQualifications] = useState<
    QualificationUI[]
  >([]);
  const [showQualificationModal, setShowQualificationModal] = useState(false);
  const visibleQualifications = showAllQualifications
    ? defaultQualifications
    : defaultQualifications.slice(0, 2);

  type FormData = {
    MF: string;
    SS: string;
    Time: string;
    Timer: string;

    degree: string;
    fieldofstudy: string;
    university: string;
    startYear: string;
    endYear: string;
  };

  const initialFormData: FormData = {
    MF: "",
    SS: "",
    Time: "",
    Timer: "",

    degree: "",
    fieldofstudy: "",
    university: "",
    startYear: "",
    endYear: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [qualifications, setQualifications] = useState<FormData[]>([
    { ...initialFormData },
  ]);
  const [formErrors, setFormErrors] = useState([
    {
      degree: "",
      fieldofstudy: "",
      university: "",
      startYear: "",
      endYear: "",
    },
  ]);

  const handleDelete = () => {
    if (!selectedId) return;

    deleteQualifications({
      qualificationId: selectedId,
      doctorId: DoctorData?._id!,
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Qualification deleted");

          closeDeleteModal();
          fetchPatientData?.();
        }
      })
      .catch((err) => {
        console.log("Qualification deleting error", err);
        toast.error("Delete failed");
      });
  };

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name; // 👈 download name set
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    if (DoctorData?.qualifications?.length) {
      const mapped: QualificationUI[] = DoctorData.qualifications.map((q) => ({
        _id: q._id?.toString(),
        title: `${q.degree} - ${q.fieldOfStudy}`,
        university: q.university,
        years: `${q.startYear} - ${q.endYear}`,
        degree: q.degree,
        fieldofstudy: q.fieldOfStudy, // UI name
        startYear: q.startYear.toString(),
        endYear: q.endYear.toString(),
      }));

      setDefaultQualifications(mapped);
    }
  }, [DoctorData]);

  //================  + add  Modal all data below ============= //

  const handleOpen = () => {
    // modal open in clean state and clear data
    setFormData(initialFormData);
    setFormError(initialFormError);
    setFormErrors([]);
    setQualifications([{ ...initialFormData }]); // one  blank qualification row

    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);

    // Modal close par data clear karo
    setFormData(initialFormData);
    setFormError(initialFormError);
    setFormErrors([]);
    setQualifications([{ ...initialFormData }]); // reset to 1 blank
  };

  const yearOptions = Array.from({ length: 51 }, (_, i) => {
    const year = 2000 + i;
    return {
      id: year.toString(),
      value: year.toString(),
      label: year.toString(),
    };
  });

  const validateForm = (data: FormData): FormError => {
    const errors: FormError = {};

    return errors;
  };

  const validateForm1 = (quals: typeof qualifications) => {
    const errors = quals.map((q) => ({
      degree: !q.degree ? "Degree is required" : "",
      fieldofstudy: !q.fieldofstudy ? "Field is required" : "",
      university: !q.university ? "University is required" : "",
      startYear: !q.startYear ? "Start Year is required" : "",
      endYear: !q.endYear ? "End Year is required" : "",
    }));
    return errors;
  };

  // ✅ Function to add data
  const handleAddQualification = () => {
    setQualifications([...qualifications, { ...initialFormData }]);
    // ADDD Qualifications validtation msg
    setFormErrors([
      ...formErrors,
      {
        degree: "",
        fieldofstudy: "",
        university: "",
        startYear: "",
        endYear: "",
      },
    ]);
  };

  const handleRemoveQualification = (index: number) => {
    const updated = [...qualifications];
    updated.splice(index, 1);
    setQualifications(updated);
  };
  const payload = {
    qualifications: qualifications.map((q) => ({
      degree: q.degree,
      fieldOfStudy: q.fieldofstudy,
      university: q.university,
      startYear: Number(q.startYear),
      endYear: Number(q.endYear),
    })),
  };

  const handleSave = async () => {
    // 1️⃣ Validate all rows
    const qualErrors = validateForm1(qualifications);
    setFormErrors(qualErrors);

    const hasError = qualErrors.some((err) => Object.values(err).some(Boolean));
    if (hasError) return;

    // 2️⃣ Prepare payload
    const payload = qualifications.map((q) => ({
      degree: q.degree.trim(),
      fieldOfStudy: q.fieldofstudy.trim(),
      university: q.university.trim(),
      startYear: Number(q.startYear),
      endYear: Number(q.endYear),
    }));

    try {
      if (!doctorIdShow) {
        toast.error("Doctor ID not found");
        return;
      }

      // 3️⃣ API Call - note swapped args to (id, data)
      const response = await addQualifications(payload, String(doctorIdShow));

      // 4️⃣ Success
      toast.success("Qualification added successfully");

      setShowModal(false);
      setFormData(initialFormData);
      setFormErrors([]);
      setQualifications([{ ...initialFormData }]);

      fetchPatientData?.(); // refresh profile
    } catch (error) {
      console.error("Add qualification error:", error);
      toast.error("Failed to add qualification");
    }
  };

  // + add Qualification button diable data show after unable

  // ===== Edit button click in modal open ================
  const [selectedQualificationId, setSelectedQualificationId] = useState<
    string | null
  >(null);

  const openQualificationModal = (index: number, _id: string | undefined) => {
    setEditIndex(index);
    setFormData(defaultQualifications[index] as unknown as FormData); // je data show thayu e prefill karo
    setShowQualificationModal(true); // modal open
    setSelectedQualificationId(_id ?? null);
  };

  const closeQualificationModal = () => setShowQualificationModal(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  const EditValidtation = (data: FormData): FormError => {
    const errors: FormError = {};

    if (!data.degree.trim()) errors.degree = "Degree is required";
    if (!data.fieldofstudy.trim()) errors.fieldofstudy = "Field is required";
    if (!data.university.trim()) errors.university = "University is required";
    if (!data.startYear.trim()) errors.startYear = "Start year is required";
    if (!data.endYear.trim()) errors.endYear = "End year is required";

    return errors;
  };

  const handleEditSave = async () => {
    const errors = EditValidtation(formData);
    setFormError(errors);

    if (Object.keys(errors).length > 0) return;

    if (!selectedQualificationId) {
      toast.error("Qualification ID not found");
      return;
    }

    // ✅ Convert FormData → Qualification
    const payload: Qualification = {
      doctorId: doctorIdShow ? String(doctorIdShow) : undefined,
      degree: formData.degree.trim(),
      fieldOfStudy: formData.fieldofstudy.trim(), // 👈 mapping fixed
      university: formData.university.trim(),
      startYear: Number(formData.startYear),
      endYear: Number(formData.endYear),
    };

    try {
      const response = await editQualifications(
        payload,
        selectedQualificationId
      );

      if (response.status === 200) {
        toast.success("Qualification updated");
        fetchPatientData?.(); // ✅ correct refresh
      }
    } catch (err) {
      console.error("Qualification edit error", err);
      toast.error("Update failed");
    }

    closeQualificationModal();
    setEditIndex(null);
  };

  type Service = {
    id: number;
    service: string;
  };
  const services: Service[] = [
    {
      id: 1,
      service: "ICSI",
    },
    {
      id: 2,
      service: "IUI",
    },
    {
      id: 3,
      service: "IVF",
    },
    {
      id: 4,
      service: "Egg Freezing",
    },
  ];
  const [editIndex, setEditIndex] = useState<number | null>(null); // track current editing row
  const [navigateToEditClinic, setNavigateToEditClinic] = useState(false);
  useEffect(() => {
    if (navigateToEditClinic) {
      router.push("/editDoctor?tab=Clinic"); // ✅ inner route path
      setNavigateToEditClinic(false); // reset state after navigation
    }
  }, [navigateToEditClinic, router]);

  const kyc = DoctorData?.kycDetails;

  const documents: DocumentItem[] = [];

  DoctorData?.documents?.forEach((doc) => {
    const date = doc.updatedAt ?? DoctorData?.updatedAt; // fallback safety

    if (doc.aadharNumber && doc.filePath) {
      documents.push({
        name: "Aadhar Card",
        file: doc.filePath,
        date,
      });
    }

    if (doc.panNumber && doc.filePath) {
      documents.push({
        name: "PAN Card",
        file: doc.filePath,
        date,
      });
    }

    if (doc.licenceNumber && doc.filePath) {
      documents.push({
        name: "Medical Licence",
        file: doc.filePath,
        date,
      });
    }

    if (doc.reportName && doc.filePath) {
      documents.push({
        name: doc.reportName,
        file: doc.filePath,
        date,
      });
    }
  });
  const visibleDocuments = showAllDocuments ? documents : documents.slice(0, 4);
  return (
    // <Container fluid className="mt-3">
    <div>
      <Row>
        {/* =====LEFT COLUMN PART ======== */}

        <Col lg={8}>
          {/* Clinic Details */}
          <div>
            <ContentContainer className="mt-4">
              {/* edit clinic details */}
              <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center text-center text-md-start mb-3">
                <h5 className="profile-card-main-titile mb-2 mb-md-0">
                  Clinic Details
                </h5>
              </div>
              {DoctorData?.clinics?.map((clinic: ClinicDetails) => (
                <div className="clinic_second_card mb-3" key={clinic._id}>
                  <div className=" mb-2 mb-md-0">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className=" mb-2 mb-md-0 d-flex align-items-center gap-3">
                        <div>
                          <img
                            src={clinic?.clinicLogo || DummyPatientImage.src}
                            alt="Profile"
                            width={58}
                            height={58}
                            // className="profile-img"
                            onError={({ currentTarget }) =>
                              (currentTarget.src = DummyPatientImage.src)
                            }
                          />
                        </div>
                        <div>
                          <span className="clinic_card_title">
                            Sunrise Fertility
                          </span>
                          <span className="clinic_card_name">Self</span>
                          <div className="d-flex align-items-center gap-1">
                            <Image
                              src={phone}
                              alt="phone"
                              width={15}
                              height={15}
                            />
                            <span
                              style={{ color: "#8A8D93", fontWeight: "400" }}
                            >
                              {clinic.contactNumber}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        className="maiacare-button-large   profile-card-boeder  bg-transparent btn btn-primary"
                        onClick={() => router.push("/profile")}
                        variant="dark"
                      >
                        <Image
                          src={Arrowup}
                          alt="Arrow"
                          width={17}
                          height={17}
                        />
                      </Button>
                    </div>
                  </div>
                  <div className="d-flex  mt-3 flex-column flex-sm-row">
                    {/* Address */}
                    <div className="w-50">
                      <div className="profiledetails_heading">Address</div>
                      <div
                        style={{ width: "70%" }}
                        className="profiledetails_text"
                      >
                        {clinic.address}
                      </div>
                    </div>
                    {/* Availability */}
                    <div>
                      <div className="profiledetails_heading">Availability</div>
                      {clinic.operationalHours?.map((item: OperationalHour) => (
                        <p key={item._id} className="mb-0">
                          <span
                            className="maiacare-radio-label me-1"
                            style={{ fontSize: "14px" }}
                          >
                            {item.day} :
                          </span>
                          <span style={{ fontSize: "13px" }}>
                            {item.openTime} – {item.closeTime}
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </ContentContainer>
          </div>
          {/* Qualification */}
          <div>
            <ContentContainer className="mt-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="profile-card-main-titile">Qualification</h5>
                <Button
                  onClick={handleOpen}
                  className="profile-card-boeder bg-transparent"
                  variant="dark"
                >
                  <LuPlus color="#2B4360" />
                </Button>

                <Modal
                  show={showModal}
                  onHide={handleClose}
                  // dialogClassName="custom-modal-width"
                  header="Qualification Details"
                  centered
                >
                  {/* delete modal  */}

                  <div>
                    {/* 🔁 Loop through all qualifications */}
                    <Accordion defaultActiveKey="0" alwaysOpen>
                      {qualifications.map((q, index) => (
                        <div key={index} className="mb-4">
                          {/* ← Add margin-bottom here for spacing */}
                          <Accordion.Item eventKey={index.toString()}>
                            <Accordion.Header>
                              Qualification {index + 1}
                            </Accordion.Header>

                            <Accordion.Body>
                              <div className="position-relative pt-3 p-3 modal-border-dashed">
                                {/* ❌ Remove button - show only if NOT first item */}
                                {index !== 0 && (
                                  <button
                                    type="button"
                                    className="btn-close position-absolute profile-basic-details-remove-button"
                                    style={{ top: "10px", right: "10px" }}
                                    onClick={() =>
                                      handleRemoveQualification(index)
                                    }
                                  />
                                )}

                                <Row>
                                  <Col md={6} className="mt-3">
                                    <InputFieldGroup
                                      label="Degree"
                                      name="degree"
                                      type="text"
                                      value={q.degree}
                                      onChange={(e) => {
                                        const updated = [...qualifications];
                                        updated[index].degree = e.target.value;
                                        setQualifications(updated);

                                        const updatedErrors = [...formErrors];
                                        if (updatedErrors[index]) {
                                          updatedErrors[index].degree = "";
                                        }
                                        setFormErrors(updatedErrors);
                                      }}
                                      placeholder="Enter Degree"
                                      required={true}
                                      error={formErrors[index]?.degree}
                                    />
                                  </Col>

                                  <Col md={6} className="mt-3">
                                    <InputFieldGroup
                                      label="Field of study"
                                      name="fieldofstudy"
                                      type="text"
                                      value={q.fieldofstudy}
                                      onChange={(e) => {
                                        const updated = [...qualifications];
                                        updated[index].fieldofstudy =
                                          e.target.value;
                                        setQualifications(updated);

                                        const updatedErrors = [...formErrors];
                                        if (updatedErrors[index]) {
                                          updatedErrors[index].fieldofstudy =
                                            "";
                                        }
                                        setFormErrors(updatedErrors);
                                      }}
                                      placeholder="Select Field"
                                      required={true}
                                      error={formErrors[index]?.fieldofstudy}
                                    />
                                  </Col>

                                  <Col md={12} className="mt-3">
                                    <InputFieldGroup
                                      label="University"
                                      name="university"
                                      type="text"
                                      value={q.university}
                                      onChange={(e) => {
                                        const updated = [...qualifications];
                                        updated[index].university =
                                          e.target.value;
                                        setQualifications(updated);

                                        const updatedErrors = [...formErrors];
                                        if (updatedErrors[index]) {
                                          updatedErrors[index].university = "";
                                        }
                                        setFormErrors(updatedErrors);
                                      }}
                                      placeholder="University"
                                      required={true}
                                      error={formErrors[index]?.university}
                                    />
                                  </Col>

                                  <Col md={6} className="mt-3">
                                    <InputSelect
                                      label="Start Year"
                                      name="startYear"
                                      value={q.startYear}
                                      onChange={(e) => {
                                        const updated = [...qualifications];
                                        updated[index].startYear =
                                          e.target.value;
                                        setQualifications(updated);

                                        const updatedErrors = [...formErrors];
                                        if (updatedErrors[index]) {
                                          updatedErrors[index].startYear = "";
                                        }
                                        setFormErrors(updatedErrors);
                                      }}
                                      required={true}
                                      error={formErrors[index]?.startYear}
                                      options={yearOptions}
                                    />
                                  </Col>

                                  <Col md={6} className="mt-3">
                                    <InputSelect
                                      label="End Year"
                                      name="endYear"
                                      value={q.endYear}
                                      onChange={(e) => {
                                        const updated = [...qualifications];
                                        updated[index].endYear = e.target.value;
                                        setQualifications(updated);

                                        const updatedErrors = [...formErrors];
                                        if (updatedErrors[index]) {
                                          updatedErrors[index].endYear = "";
                                        }
                                        setFormErrors(updatedErrors);
                                      }}
                                      required={true}
                                      error={formErrors[index]?.endYear}
                                      options={yearOptions.filter((year) => {
                                        if (!q.startYear) return true;
                                        return (
                                          Number(year.value) >=
                                          Number(q.startYear) + 1
                                        );
                                      })}
                                    />
                                  </Col>
                                </Row>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </div>
                      ))}
                    </Accordion>
                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    {/* Add Qualification Button */}
                    <Button
                      onClick={handleAddQualification}
                      variant="default"
                      // disabled={
                      //   qualifications.length > 0 &&
                      //   !isQualificationComplete(
                      //     qualifications[qualifications.length - 1]
                      //   )
                      // }
                    >
                      + Add Qualification
                    </Button>

                    {/* Save Button */}
                    <Button onClick={handleSave} variant="default">
                      Save
                    </Button>
                  </div>
                </Modal>
              </div>
              <DeleteConfirmModal
                show={showDeleteModal}
                onClose={closeDeleteModal}
                onDelete={handleDelete}
                title="Delete"
                message="Are you sure you want to delete this qualification?"
              />
              {defaultQualifications.length === 0 ? (
                <div className="text-center text-muted p-4 border rounded-4">
                  Data not found. Please Add Data
                </div>
              ) : (
                visibleQualifications.map((item, idx) => (
                  <div
                    key={idx}
                    className="d-flex justify-content-between align-items-start p-3 mb-3 bg-white border rounded-4 profile-card-boeder"
                  >
                    <div>
                      <div className="card-feild">{item.title}</div>
                      <div className="card-university-text">
                        {item.university}
                      </div>
                      <div className="card-year">{item.years}</div>
                    </div>

                    <div className="d-flex gap-2">
                      <Button
                        onClick={() => openQualificationModal(idx, item._id)}
                        className="border p-2 rounded-3 edit-del-btn  bg-transparent"
                      >
                        <Image
                          src={LightEditimg}
                          alt="Specialization"
                          width={18}
                          height={18}
                        />
                      </Button>

                      <Modal
                        show={showQualificationModal}
                        onHide={closeQualificationModal}
                        centered
                        // dialogClassName="custom-modal-width"
                        header="Qualification Details"
                      >
                        <div>
                          <Row>
                            <Col md={6} className="mt-3">
                              <InputFieldGroup
                                label="Degree"
                                name="degree"
                                type="text"
                                value={formData.degree}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  handleChange(e);
                                }}
                                onBlur={(
                                  e: React.FocusEvent<HTMLInputElement>
                                ) => {}}
                                placeholder="Enter degree"
                                required={true}
                                disabled={false}
                                readOnly={false} // ✅ remove or set false
                                error={formError.degree}
                              />
                            </Col>

                            <Col md={6} className="mt-3">
                              <InputFieldGroup
                                label="Field of study"
                                name="fieldofstudy"
                                type="text"
                                value={formData.fieldofstudy}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  handleChange(e);
                                }}
                                onBlur={(
                                  e: React.FocusEvent<HTMLInputElement>
                                ) => {}}
                                placeholder="Enter field"
                                required={true}
                                disabled={false}
                                readOnly={false} // ✅ remove or set false
                                error={formError.fieldofstudy}
                              />
                            </Col>

                            <Col md={12} className="mt-3">
                              <InputFieldGroup
                                label="University"
                                name="university"
                                type="text"
                                value={formData.university}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  handleChange(e);
                                }}
                                onBlur={(
                                  e: React.FocusEvent<HTMLInputElement>
                                ) => {}}
                                placeholder="Enter university"
                                required={true}
                                disabled={false}
                                readOnly={false} // ✅ remove or set false
                                error={formError.university}
                              />
                            </Col>

                            <Col md={6} className="mt-3">
                              <InputSelect
                                label="Start Year"
                                name="startYear"
                                value={formData.startYear}
                                onChange={(
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                  handleChange(e);
                                }}
                                onBlur={(
                                  e: React.FocusEvent<HTMLSelectElement>
                                ) => {}}
                                required={true}
                                disabled={false}
                                error={formError.startYear}
                                options={yearOptions}
                              />
                            </Col>

                            <Col md={6} className="mt-3">
                              <InputSelect
                                label="End Year"
                                name="endYear"
                                value={formData.endYear}
                                onChange={(
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                  handleChange(e);
                                }}
                                onBlur={(
                                  e: React.FocusEvent<HTMLSelectElement>
                                ) => {}}
                                required={true}
                                disabled={false}
                                error={formError.endYear}
                                options={yearOptions}
                              />
                            </Col>
                          </Row>

                          {/* Save Button */}
                          <Button
                            onClick={handleEditSave}
                            className="maiacare-button mt-4"
                          >
                            Save
                          </Button>
                        </div>
                      </Modal>
                      {/* deletebutton */}

                      <Button
                        className="border p-2 rounded-2 edit-del-btn bg-transparent"
                        variant="outline"
                        // onClick={() => openDeleteModal(item._id!)}
                        onClick={() => {
                          if (!item._id) {
                            toast.error("Qualification ID not found");
                            return;
                          }
                          openDeleteModal(item._id);
                        }}
                      >
                        <Image
                          src={Delete}
                          alt="delete"
                          width={18}
                          height={18}
                        />
                      </Button>
                    </div>
                  </div>
                ))
              )}
              {defaultQualifications.length > 2 && (
                <div
                  className=" mt-3 allreviews"
                  onClick={() =>
                    setShowAllQualifications(!showAllQualifications)
                  }
                >
                  {showAllQualifications ? "Show less" : "Show more"}
                </div>
              )}
            </ContentContainer>
          </div>
        </Col>

        {/* ======RIGHT COLUMN =========== */}
        {/* About */}

        <Col lg={4}>
          {/* about */}
          <div>
            <ContentContainer className="mt-4">
              <h5 className="profile-card-main-titile">About</h5>
              <p
                className={`mb-0 about-text ${
                  !showFullAbout ? "about-clamp" : ""
                }`}
              >
                {DoctorData?.about ? DoctorData?.about : ""}
              </p>
              <div
                className="mt-2 allreviews"
                onClick={() => setShowFullAbout(!showFullAbout)}
              >
                {showFullAbout ? "Show less" : "Show more"}
              </div>
            </ContentContainer>
          </div>
          {/* services provides */}
          <div>
            <ContentContainer className="mt-4">
              <div>
                <h5 className="mb-4 profile-card-main-titile">
                  Service Offered & Fees
                </h5>
                <div>
                  <span className="service_text">Services</span>
                  <div className="d-flex gap-2 flex-wrap mt-1">
                    {DoctorData?.servicesOffered.map(
                      (serviceName: string, index: number) => (
                        <div key={index} className="servicename">
                          {serviceName}
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <span className="service_text">Fees</span>
                  <p className="mb-0 fw-semibold fs-5">
                    {DoctorData?.fees ? "₹" : ""}
                    {DoctorData?.fees}
                  </p>
                </div>
              </div>
            </ContentContainer>
          </div>
          {/* Documents */}
          <div>
            <ContentContainer className="mt-4">
              <div>
                <h5 className="mb-4 profile-card-main-titile">Documents</h5>

                {visibleDocuments.map((doc, index) => (
                  <div
                    className="d-flex justify-content-between align-items-center border profile-card-boeder p-3 mb-3 document-main-border"
                    key={index}
                  >
                    <div className="d-flex align-items-center">
                      <Image
                        src={Pdfimg}
                        alt="pdf"
                        width={40}
                        className="me-3"
                      />
                      <div>
                        <div className="card-feild">{doc.name}</div>
                        <div className="card-year">
                          {new Date(doc.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <button
                      className="d-flex bg-white justify-content-center align-items-center border profile-card-boeder rounded Download-border"
                      onClick={() =>
                        handleDownload(`/uploads/${doc.file}`, doc.name)
                      }
                    >
                      <Image
                        src={Download}
                        alt="download"
                        width={25}
                        height={25}
                      />
                    </button>
                  </div>
                ))}
                {documents.length > 4 && (
                  <div
                    className="mt-2 allreviews"
                    onClick={() => setShowAllDocuments(!showAllDocuments)}
                  >
                    {showAllDocuments ? "Show less" : "Show more"}
                  </div>
                )}
              </div>
            </ContentContainer>
          </div>
        </Col>
      </Row>
    </div>
    // </Container>
  );
};

export default DoctorBasicDetails;
