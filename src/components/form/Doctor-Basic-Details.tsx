import React, { ChangeEvent, useState } from "react";
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
import InputSelect from "../ui/InputSelect";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import cliniccard from "../../assets/images/cliniccard.png";
import Arrowup from "../../assets/images/ArrowUpRight.png";
const DoctorBasicDetails = () => {
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

  const [defaultQualifications, setDefaultQualifications] = useState<any[]>([]);
  const [showQualificationModal, setShowQualificationModal] = useState(false);

  type FormData = {
    MF: string;
    SS: string;
    Time: string;
    Timer: string;

    degree: string;
    field: string;
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
    field: "",
    university: "",
    startYear: "",
    endYear: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [qualifications, setQualifications] = useState<FormData[]>([
    { ...initialFormData },
  ]);
  const [formErrors, setFormErrors] = useState([
    { degree: "", field: "", university: "", startYear: "", endYear: "" },
  ]);
  const operationalHours = [
    { days: "Mon to Fri", time: "10 AM – 5 PM" },
    { days: "Sat & Sun", time: "10 AM – 2 PM" },
  ];
  const documents = [
    { name: "Certificate.pdf", date: "October 20, 2024" },
    { name: "Aadhar Card.pdf", date: "October 20, 2024" },
    { name: "License.pdf", date: "October 20, 2024" },
    { name: "Certificate.pdf", date: "October 20, 2024" },
  ];

  const handleDelete = (index: number) => {
    const updated = defaultQualifications.filter((_, i) => i !== index);
    setDefaultQualifications(updated);
  };

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name; // 👈 download name set
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      field: !q.field ? "Field is required" : "",
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
      { degree: "", field: "", university: "", startYear: "", endYear: "" },
    ]);
  };

  const handleRemoveQualification = (index: number) => {
    const updated = [...qualifications];
    updated.splice(index, 1);
    setQualifications(updated);
  };

  const handleSave = () => {
    // 🔹 Run validations
    const errors = validateForm(formData); // single form
    const qualErrors = validateForm1(qualifications); // multi rows

    setFormError(errors);
    setFormErrors(qualErrors); // ✅ set array

    const hasQualError = qualErrors.some((err) =>
      Object.values(err).some((msg) => msg !== "")
    );

    if (Object.keys(errors).length === 0 && !hasQualError) {
      // 🔹 Convert filled qualifications into display format
      const newItems = qualifications
        .filter(
          (q) => q.degree && q.field && q.university && q.startYear && q.endYear
        )
        .map((q) => ({
          title: `${q.degree} - ${q.field}`,
          university: q.university,
          years: `${q.startYear} - ${q.endYear}`,
          degree: q.degree,
          field: q.field,
          startYear: q.startYear,
          endYear: q.endYear,
        }));

      // 🔹 Update default qualifications
      setDefaultQualifications((prev) => [...prev, ...newItems]);

      console.log("Form submitted ✅", { formData, qualifications });

      // 🔹 Success → close modal + reset data
      setShowModal(false);
      setFormData(initialFormData);
      setFormError(initialFormError);
      setFormErrors([]);
      setQualifications([{ ...initialFormData }]); // reset one row
      toast.success("Data saved successfully!", {
        position: "top-right",
        // autoClose: 3000,
      });
    } else {
      console.log("Form has errors ⚠️", { errors, qualErrors });
    }
  };

  // + add Qualification button diable data show after unable
  const isQualificationComplete = (q: any) => {
    return q.degree && q.field && q.university && q.startYear && q.endYear;
  };

  // ===== Edit button click in modal open ================
  const openQualificationModal = (index: number) => {
    setEditIndex(index);
    setFormData(defaultQualifications[index]); // je data show thayu e prefill karo
    setShowQualificationModal(true); // modal open
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
    if (!data.field.trim()) errors.field = "Field is required";
    if (!data.university.trim()) errors.university = "University is required";
    if (!data.startYear.trim()) errors.startYear = "Start year is required";
    if (!data.endYear.trim()) errors.endYear = "End year is required";

    return errors;
  };

  const handleEditSave = () => {
    const errors = EditValidtation(formData);
    setFormError(errors);

    if (Object.keys(errors).length > 0) return; // ❌ don't save if errors

    if (editIndex !== null) {
      const updated = [...defaultQualifications];
      updated[editIndex] = {
        title: `${formData.degree} - ${formData.field}`,
        university: formData.university,
        years: `${formData.startYear} - ${formData.endYear}`,
        degree: formData.degree,
        field: formData.field,
        startYear: formData.startYear,
        endYear: formData.endYear,
      };
      setDefaultQualifications(updated);
    }

    console.log("Form updated:", formData);

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
              <div className="clinic_card">
                <div className=" mb-2 mb-md-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="clinic_card_title">Sunrise Fertility</span>
                    <Button
                      className="maiacare-button-large  default-layout profile-card-boeder  bg-transparent btn btn-primary"
                      onClick={() => router.push("/editDoctor")}
                    >
                      <Image
                        src={editprofile}
                        alt="Edittime"
                        width={17}
                        height={17}
                      />
                    </Button>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <Image src={phone} alt="phone" width={15} height={15} />
                    <span style={{ color: "#8A8D93", fontWeight: "400" }}>
                      +91 8987656874
                    </span>
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
                      2nd Floor, Lakeview Complex, Hiranandani Gardens, Powai,
                      400072 Mumbai
                    </div>
                  </div>
                  {/* Availability */}
                  <div>
                    <div className="profiledetails_heading">Availability</div>
                    {operationalHours.map((item, idx) => (
                      <p key={idx} className="mb-0">
                        <span className=" maiacare-radio-label me-1">
                          {item.days} :
                        </span>
                        <span style={{ fontSize: "14px" }}> {item.time}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 clinic_second_card ">
                <div className="d-flex align-items-center justify-content-between">
                  <div className=" mb-2 mb-md-0 d-flex align-items-center gap-3">
                    <div>
                      <Image
                        src={cliniccard}
                        alt="cliniccard"
                        width={58}
                        height={58}
                        className="rounded-circle"
                      />
                    </div>
                    <div>
                      <span className="clinic_card_title">
                        Sunrise Fertility
                      </span>
                      <span className="clinic_card_name">Self</span>
                      <div className="d-flex align-items-center gap-1">
                        <Image src={phone} alt="phone" width={15} height={15} />
                        <span style={{ color: "#8A8D93", fontWeight: "400" }}>
                          +91 8987656874
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="maiacare-button-large  default-layout profile-card-boeder  bg-transparent btn btn-primary"
                    onClick={() => router.push("/profile")}
                  >
                    <Image src={Arrowup} alt="Arrow" width={17} height={17} />
                  </Button>
                </div>
                <div className="d-flex  mt-3 flex-column flex-sm-row">
                  {/* Address */}
                  <div className="w-50">
                    <div className="profiledetails_heading">Address</div>
                    <div
                      style={{ width: "70%" }}
                      className="profiledetails_text"
                    >
                      2nd Floor, Lakeview Complex, Hiranandani Gardens, Powai,
                      400072 Mumbai
                    </div>
                  </div>
                  {/* Availability */}
                  <div>
                    <div className="profiledetails_heading">Availability</div>
                    {operationalHours.map((item, idx) => (
                      <p key={idx} className="mb-0">
                        <span className=" maiacare-radio-label me-1">
                          {item.days} :
                        </span>
                        <span style={{ fontSize: "14px" }}> {item.time}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </ContentContainer>
          </div>
          {/* Qualification */}
          <div>
            <ContentContainer className="mt-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="profile-card-main-titile">Qualification</h5>
                <Button
                  onClick={handleOpen}
                  className="profile-card-boeder profile-card-button bg-transparent"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 9C18 9.19891 17.921 9.38968 17.7803 9.53033C17.6397 9.67098 17.4489 9.75 17.25 9.75H9.75V17.25C9.75 17.4489 9.67098 17.6397 9.53033 17.7803C9.38968 17.921 9.19891 18 9 18C8.80109 18 8.61032 17.921 8.46967 17.7803C8.32902 17.6397 8.25 17.4489 8.25 17.25V9.75H0.75C0.551088 9.75 0.360322 9.67098 0.21967 9.53033C0.0790178 9.38968 0 9.19891 0 9C0 8.80109 0.0790178 8.61032 0.21967 8.46967C0.360322 8.32902 0.551088 8.25 0.75 8.25H8.25V0.75C8.25 0.551088 8.32902 0.360322 8.46967 0.21967C8.61032 0.0790178 8.80109 0 9 0C9.19891 0 9.38968 0.0790178 9.53033 0.21967C9.67098 0.360322 9.75 0.551088 9.75 0.75V8.25H17.25C17.4489 8.25 17.6397 8.32902 17.7803 8.46967C17.921 8.61032 18 8.80109 18 9Z"
                      fill="#2B4360"
                    />
                  </svg>
                </Button>

                <Modal
                  show={showModal}
                  onHide={handleClose}
                  dialogClassName="custom-modal-width"
                  header="Qualification Details"
                  centered
                >
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
                                      name="field"
                                      type="text"
                                      value={q.field}
                                      onChange={(e) => {
                                        const updated = [...qualifications];
                                        updated[index].field = e.target.value;
                                        setQualifications(updated);

                                        const updatedErrors = [...formErrors];
                                        if (updatedErrors[index]) {
                                          updatedErrors[index].field = "";
                                        }
                                        setFormErrors(updatedErrors);
                                      }}
                                      placeholder="Select Field"
                                      required={true}
                                      error={formErrors[index]?.field}
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
                      disabled={
                        qualifications.length > 0 &&
                        !isQualificationComplete(
                          qualifications[qualifications.length - 1]
                        )
                      }
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

              {defaultQualifications.length === 0 ? (
                <div className="text-center text-muted p-4 border rounded-4">
                  "Data not found. Please Add Data"
                </div>
              ) : (
                defaultQualifications.map((item, idx) => (
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
                        onClick={() => openQualificationModal(idx)}
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
                        dialogClassName="custom-modal-width"
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
                                name="field"
                                type="text"
                                value={formData.field}
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
                                error={formError.field}
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

                      <Button
                        className="border p-2 rounded-2 edit-del-btn  bg-transparent"
                        onClick={() => handleDelete(idx)} // 👈 click par delete
                      >
                        <Image
                          src={Delete}
                          alt="Specialization"
                          width={18}
                          height={18}
                        />
                      </Button>
                    </div>
                  </div>
                ))
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
              <p className="mb-0 about-text">
                I'm Dr. Riya Dharang, a fertility specialist with over 12 years
                of experience in reproductive medicine. I specialize in IVF,
                IUI, and fertility preservation, providing personalized,
                compassionate care to help individuals and couples achieve their
                parenthood dreams. Your well-being and trust are my top
                priorities.
              </p>
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
                    {services.map((servicename: Service) => (
                      <div key={servicename.id} className="servicename">
                        {servicename.service}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3">
                  <span className="service_text">Fees</span>
                  <p className="mb-0 fw-semibold fs-5">₹800</p>
                </div>
              </div>
            </ContentContainer>
          </div>
          {/* Documents */}
          <div>
            <ContentContainer className="mt-4">
              <div>
                <h5 className="mb-4 profile-card-main-titile">Documents</h5>

                {documents.map((doc, index) => (
                  <div
                    className="d-flex justify-content-between align-items-center border profile-card-boeder p-3 mb-3 document-main-border"
                    key={index}
                  >
                    <div className="d-flex align-items-center">
                      <Image
                        src={Pdfimg}
                        alt="pdf"
                        width="40"
                        className="me-3"
                      />
                      <div>
                        <div className="card-feild">{doc.name}</div>
                        <div className="card-year">{doc.date}</div>
                      </div>
                    </div>

                    <button
                      className="d-flex  bg-white justify-content-center align-items-center border profile-card-boeder rounded Download-border"
                      onClick={() =>
                        handleDownload(`/files/${doc.name}.pdf`, doc.name)
                      }
                    >
                      <Image
                        src={Download}
                        alt="experience"
                        width={25}
                        height={25}
                      />
                    </button>
                  </div>
                ))}
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
