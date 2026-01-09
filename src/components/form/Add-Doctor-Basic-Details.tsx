"use client";
// import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import Simpleeditpro from "../../assets/images/Simpleeditpro.png";
import Image from "next/image";
import cameraicon from "../../assets/images/Cameraicon.png";
import { InputFieldGroup } from "../ui/InputField";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { DatePickerFieldGroup } from "../ui/CustomDatePicker";
import { RadioButtonGroup } from "../ui/RadioField";
import Textarea from "../ui/Textarea";
import ContentContainer from "../ui/ContentContainer";
import { ArrowRight } from "lucide-react";
import Modal from "../ui/Modal";
import LightTrush from "../../assets/images/LightTrush.png";
import ImageSquare from "../../assets/images/ImageSquare.png";
import Camera from "../../assets/images/Camera.png";
import { PhoneNumberInput } from "../ui/PhoneNumberInput";
import cross from "../../assets/images/crossedit.png";
import { InputSelect } from "../ui/InputSelect";
import { DoctorDetails, Qualification } from "@/utlis/types/interfaces";
export default function AddDoctorBasicDetails({
  data,
  onNext,
}: // onSaveDoctor,
// onUpdate,
{
  data: DoctorDetails;
  onNext: (data: Partial<DoctorDetails>) => void;
  // onSaveDoctor: (doctorData: unknown) => void;
  // onUpdate: (data: FormData) => void;
}) {
  // Personal Details
  interface FormError {
    [key: string]: string;
  }
  const initialFormError: FormError = {};
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [errorMessage, setErrorMessage] = useState<string>("");
  type FormData = {
    Name: string;
    Speciality: string;
    Experience: string;
    date: string;
    gender: string; // default will be "female"
    Contact: string;
    Email: string;
    Fees: string;
    About: string;
    degree: string;
    field: string;
    university: string;
    startYear: string;
    endYear: string;
  };

  const initialFormData: FormData = {
    Name: "",
    Speciality: "",
    Experience: "",
    date: "",
    gender: "female", // default value
    Contact: "",
    Email: "",
    Fees: "",
    About: "",
    // qualifications
    degree: "",
    field: "",
    university: "",
    startYear: "",
    endYear: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  // All Validatation
  const [qualifications, setQualifications] = useState([
    { degree: "", field: "", university: "", startYear: "", endYear: "" },
  ]);
  const [formErrors, setFormErrors] = useState([
    { degree: "", field: "", university: "", startYear: "", endYear: "" },
  ]);
  ``;
  const handleAddQualification = () => {
    setQualifications([
      ...qualifications,
      { degree: "", field: "", university: "", startYear: "", endYear: "" },
    ]);
    setFormErrors([
      ...formErrors,
      { degree: "", field: "", university: "", startYear: "", endYear: "" },
    ]);
  };
  const validateForm = (data: FormData): FormError => {
    const errors: FormError = {};

    if (!data.Name.trim()) errors.Name = "Name is required";
    if (!data.Speciality.trim()) errors.Speciality = "Speciality is required";
    if (!data.Experience.trim()) errors.Experience = "Experience is required";
    if (!data.date.trim()) errors.date = "Date is required";
    if (!data.gender.trim()) errors.gender = "Gender is required";
    if (!data.Fees?.trim()) errors.Fees = "Fees is required";
    if (!data.Experience?.trim()) errors.Experience = "Experience is required";
    if (!data.About?.trim()) errors.About = "About is required";
    const contactRegex = /^[0-9]{10}$/;
    if (!data.Contact.trim()) {
      errors.Contact = "Contact number is required";
    } else if (!contactRegex.test(data.Contact)) {
      errors.Contact = "Please enter a valid 10-digit number";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.Email.trim()) {
      errors.Email = "Email is required";
    } else if (!emailRegex.test(data.Email)) {
      errors.Email = "Enter a valid email address";
    }

    return errors;
  };
  const validateQualifications = () => {
    let isValid = true;

    const updatedErrors = qualifications.map((q) => {
      const err = {
        degree: "",
        field: "",
        university: "",
        startYear: "",
        endYear: "",
      };

      if (!q.degree.trim()) {
        err.degree = "Degree is required";
        isValid = false;
      }
      if (!q.field.trim()) {
        err.field = "Field is required";
        isValid = false;
      }
      if (!q.university.trim()) {
        err.university = "University is required";
        isValid = false;
      }
      if (!q.startYear) {
        err.startYear = "Start Year is required";
        isValid = false;
      }
      if (!q.endYear) {
        err.endYear = "End Year is required";
        isValid = false;
      }

      return err;
    });

    setFormErrors(updatedErrors);
    return isValid;
  };

  const buildDoctorPayload = (): Partial<DoctorDetails> => {
    return {
      profilePicture: selectedImage || "",
      name: formData.Name,
      specialty: formData.Speciality,
      yearsOfExperience: Number(formData.Experience),
      dob: formData.date,
      gender: formData.gender,
      fees: Number(formData.Fees),
      about: formData.About,
      servicesOffered: selectedServices.map((s) => s.service),
      contactNumber: formData.Contact,
      email: formData.Email,
      qualifications: qualifications.map<Qualification>((q) => ({
        degree: q.degree,
        fieldOfStudy: q.field,
        university: q.university,
        startYear: Number(q.startYear), // ✅ FIX
        endYear: Number(q.endYear),
      })),
    };
  };
  const handleNextClick = () => {
    const errors = validateForm(formData);
    setFormError(errors);

    const isQualificationValid = validateQualifications();

    if (Object.keys(errors).length === 0 && isQualificationValid) {
      const payload = buildDoctorPayload();
      console.log("Doctor Basic Payload:", payload);
      onNext(payload);
    }
  };

  // const handleNextClick = () => {
  //   const errors = validateForm(formData);
  //   setFormError(errors);
  //   if (Object.keys(errors).length === 0) {
  //     const newDoctor = {
  //       name: formData.Name,
  //       email: formData.Email,
  //       specialization: formData.Speciality,
  //       contact: formData.Contact,
  //       image: selectedImage || "",
  //     };

  //     console.log(newDoctor);

  //     onNext();
  //   } else {
  //     console.log("Form has errors:", { errors });
  //   }
  // };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  const yearOptions = Array.from({ length: 51 }, (_, i) => {
    const year = 2000 + i;
    return {
      id: year.toString(),
      value: year.toString(),
      label: year.toString(),
    };
  });

  //********* EDIT PROFILE MODAL *********//
  const fileInputRef = useRef<HTMLInputElement>(null); // file input programmatically open
  const cameraInputRef = useRef<HTMLInputElement>(null); // camera image select

  const [previewImage, setPreviewImage] = useState<string | null>(null); //previewImage
  const [selectedImage, setSelectedImage] = useState<string | null>(null); //selectedImage

  const handleOpenModal = () => {
    setPreviewImage(selectedImage || Simpleeditpro.src); // show image in modal
    setShowModal(true);
  };

  const handleEditClick = () => {
    fileInputRef.current?.click(); //Edit btn click in file chhose
  };

  const openCamera = () => {
    cameraInputRef.current?.click();
  };

  //  modal open and seletc image jpg/png image allow

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    // ✅ 1. Only allow JPG and PNG
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setErrorMessage("Only JPG and PNG images are allowed.");
      event.target.value = ""; // reset input
      return;
    }

    // ✅ 2. Max size 5MB check
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (selectedFile.size > maxSize) {
      setErrorMessage("File size must be less than 5MB.");
      event.target.value = ""; // reset input
      return;
    }

    // ✅ 3. If valid → set preview & clear error
    const imageURL = URL.createObjectURL(selectedFile);
    setPreviewImage(imageURL);
    setErrorMessage(""); // clear previous error
  };

  // camera image select
  const handleFileCamera = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Allowed image types
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

      if (!allowedTypes.includes(file.type)) {
        setErrorMessage("Only JPG and PNG images are allowed.");
        setPreviewImage(null);
        event.target.value = ""; // Reset input
        return;
      }

      setErrorMessage(""); // clear error if valid
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL); // show preview
    }
  };

  const handleSave = () => {
    setSelectedImage(previewImage); // save modal preview to actual profile
    setShowModal(false);
  };

  const handleDelete = () => {
    setPreviewImage(null); // delete only in modal
  };
  //modal  image delete click in save btn click image set.
  useEffect(() => {
    if (showModal) {
      setPreviewImage(selectedImage);
    }
  }, [showModal]);

  //   services
  type Service = {
    id: number;
    service: string;
  };
  const services: Service[] = [
    {
      id: 1,
      service: "Fertility Support",
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
    {
      id: 5,
      service: "ICSI",
    },
    {
      id: 6,
      service: "Sperm Freezing",
    },
    {
      id: 7,
      service: "Preimplantation Genetic Testing",
    },
    {
      id: 8,
      service: "Laparoscopy",
    },
    {
      id: 9,
      service: "Hysteroscopy",
    },
    {
      id: 10,
      service: "Tubal Surgery",
    },
    {
      id: 11,
      service: "Endometrial Biposy",
    },
    {
      id: 12,
      service: "Immunological Testing",
    },
  ];

  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const serviceId = Number(e.target.value);
    const service = services.find((s) => s.id === serviceId);
    if (service && !selectedServices.some((s) => s.id === serviceId)) {
      setSelectedServices([...selectedServices, service]);
    }
  };
  const removeService = (id: number) => {
    setSelectedServices(selectedServices.filter((s) => s.id !== id));
  };
  return (
    <div>
      <ContentContainer className="mt-3">
        <Row>
          <Col>
            <h5 className="profile-card-main-titile">Personal Details</h5>
            <div className="d-flex align-items-center gap-4 mt-3 flex-wrap justify-content-center justify-content-sm-start text-center text-md-start">
              <div className="profile-wrapper">
                {/* Profile image */}
                <Image
                  src={selectedImage ? selectedImage : Simpleeditpro}
                  alt="Profile"
                  className="profile-image"
                  width={160}
                  height={160}
                />
                {/* Camera Icon */}
                <div
                  className="camera-icon"
                  // onClick={() => setShowModal(true)}  onClick={handleOpenModal} style={{ cursor: "pointer" }}
                  onClick={handleOpenModal}
                  style={{ cursor: "pointer" }}
                >
                  <Image src={cameraicon} alt="Upload" width={40} height={40} />
                </div>
              </div>

              {/* Edit Profile click in Modal */}

              <Modal
                show={showModal}
                onHide={() => {
                  setShowModal(false);
                  setErrorMessage(""); //🔹Reset error msg on modal close
                }}
                header="Profile Photo"
                closeButton={true}
                className="text-pink"
                dialogClassName="custom-modal-width"
              >
                <div className="d-flex flex-column align-items-center">
                  <div
                    className="rounded overflow-hidden mb-3 mx-auto position-relative"
                    style={{ width: 160, height: 160, borderRadius: "16px" }}
                  >
                    {/* Defult Profile Image */}
                    <Image
                      src={previewImage ? previewImage : Simpleeditpro}
                      alt="Simpleeditpro"
                      width={160}
                      height={160}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  {errorMessage && ( // error msg only jpg/png image allow
                    <div
                      className="text-danger mb-2"
                      style={{ fontSize: "14px" }}
                    >
                      {errorMessage}
                    </div>
                  )}

                  <div className="w-100 border-top pt-3 d-flex justify-content-between align-items-center flex-wrap">
                    <div className="d-flex gap-3 align-items-center flex-wrap">
                      {/* Edit button  */}

                      <div
                        className="text-center"
                        style={{ cursor: "pointer" }}
                        onClick={handleEditClick}
                      >
                        <Image
                          src={ImageSquare}
                          alt="Add Photo"
                          width={18}
                          height={18}
                        />
                        <div className="Profilephoto-save-take">Add Photo</div>

                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                      </div>

                      <div
                        className="text-center"
                        style={{ cursor: "pointer" }}
                      >
                        {/* Camera button */}
                        <Image
                          src={Camera}
                          alt="Take Photo"
                          width={18}
                          height={18}
                          onClick={openCamera}
                        />
                        <div className="Profilephoto-save-take">Take Photo</div>

                        {/* Hidden input for camera */}
                        <input
                          type="file"
                          accept="image/*"
                          capture="user" // front camera
                          ref={cameraInputRef}
                          style={{ display: "none" }}
                          onChange={handleFileCamera}
                        />
                      </div>
                    </div>

                    <div className="d-flex gap-3 mt-md-0 align-items-center">
                      <button className="btn p-0" onClick={handleDelete}>
                        <Image
                          src={LightTrush}
                          alt="Trash"
                          width={22}
                          height={22}
                        />
                        <div className="maiacare-input-field-helper-text">
                          Delete
                        </div>
                      </button>

                      <button
                        className="btn px-4 py-2 common-btn-blue maiacare-button"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>

              <div>
                <div className="fw-semibold">Add Profile Picture</div>
                <div className="text-muted small">
                  Allowed Jpg, png of max size 5MB
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <div>
          <Row>
            <Col className="mt-3 ">
              <InputFieldGroup
                label="Name"
                name="Name"
                type="text"
                value={formData.Name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Name: e.target.value });
                  if (formError.Name) {
                    // typing in hide error
                    setFormError({ ...formError, Name: "" });
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Name"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.Name}
                className="position-relative "
              ></InputFieldGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mt-3">
              <InputFieldGroup
                label="Speciality"
                name="Speciality"
                type="text"
                value={formData.Speciality}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Speciality: e.target.value });
                  if (formError.Speciality) {
                    // typing in hide error
                    setFormError({ ...formError, Speciality: "" });
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Speciality"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.Speciality}
                className="position-relative"
              ></InputFieldGroup>
            </Col>

            <Col md={6} className="mt-3">
              <InputFieldGroup
                label="Year Of Experience"
                name="Experience"
                type="text"
                value={formData.Experience}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Experience: e.target.value });
                  if (formError.Experience) {
                    // typing in hide error
                    setFormError({ ...formError, Experience: "" });
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Year Of Experience"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.Experience}
                className="position-relative"
              ></InputFieldGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mt-3">
              <DatePickerFieldGroup
                label="DOB"
                name="date"
                value={formData.date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  if (formError.date) {
                    // typing in hide error
                    setFormError({ ...formError, date: "" });
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                required={true}
                disabled={false}
                error={formError.date}
              />
            </Col>
            <Col md={6} className="mt-3 ">
              <RadioButtonGroup
                label="Gender"
                name="gender"
                value={formData.gender}
                // defaultValue="female"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  if (formError.gender) {
                    // typing in hide error
                    setFormError({ ...formError, gender: "" });
                  }
                }}
                error={formError.gender}
                required
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mt-3">
              <PhoneNumberInput
                label="Contact Number"
                value={formData.Contact}
                inputMode="numeric"
                onChange={(phone: string) => {
                  // ✅ Remove any non-digit character
                  let value = phone.replace(/\D/g, "");

                  // ✅ Allow only max 10 digits
                  if (value.length > 10) {
                    value = value.slice(0, 10);
                  }

                  // ✅ Update formData
                  setFormData({ ...formData, Contact: value });

                  // ✅ Hide error while typing
                  if (formError.Contact) {
                    setFormError({ ...formError, Contact: "" });
                  }
                }}
                required
                error={formError.Contact}
              />
            </Col>

            <Col md={6} className="mt-3">
              <InputFieldGroup
                label="Email ID"
                name="Email"
                type="text"
                value={formData.Email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Email: e.target.value });
                  if (formError.Email) {
                    // typing in hide error
                    setFormError({ ...formError, Email: "" });
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Email"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.Email}
                className="position-relative"
              ></InputFieldGroup>
            </Col>
          </Row>
          <Row>
            <Col className="mt-3">
              <Textarea
                label="About"
                name="About"
                value={formData.About}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  handleChange(e);
                  if (formError.About) {
                    // typing in hide error
                    setFormError({ ...formError, About: "" });
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {}}
                // placeholder="About"
                required={true}
                disabled={false}
                error={formError.About}
                maxLength={500}
              />
            </Col>
          </Row>
        </div>
      </ContentContainer>

      {/* services offered & Fee */}
      <ContentContainer className="mt-3">
        <Row>
          <Col md={6}>
            <div>
              <h5 className="profile-card-main-titile">Services Offered</h5>
              <Form.Select onChange={handleSelect} defaultValue="">
                <option value="" disabled>
                  Select Services
                </option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.service}
                  </option>
                ))}
              </Form.Select>
              {selectedServices.length > 0 && (
                <div
                  className="mt-2 mb-3  "
                  style={{
                    color: "rgba(138, 141, 147, 1)",
                    fontSize: "14px",
                  }}
                >
                  {selectedServices.length} Services selected
                </div>
              )}
              <div className="mt-2 d-flex flex-wrap">
                {selectedServices.map((s) => (
                  <div
                    key={s.id}
                    className="me-2 mb-2 servicename d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeService(s.id)}
                  >
                    {s.service}
                    <Image src={cross} alt="cross" className="editcross" />
                  </div>
                ))}
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div>
              <InputFieldGroup
                label="Fees"
                name="Fees"
                type="text"
                value={formData.Fees}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Fees: e.target.value });
                  if (formError.Fees) {
                    // typing in hide error
                    setFormError({ ...formError, Fees: "" });
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Enter Amount"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.Fees}
                className="position-relative"
              ></InputFieldGroup>
            </div>
          </Col>
        </Row>
      </ContentContainer>

      {/* qualifications */}
      <ContentContainer className="mt-3">
        <h5 className="profile-card-main-titile mb-4">Qualification Details</h5>

        {qualifications.map((q, index) => (
          <div key={index} className="position-relative mb-4">
            {/* Remove Button */}
            {index > 0 && (
              <div className="d-flex justify-content-end mb-1">
                <Button
                  variant="danger"
                  size="sm"
                  className="d-flex align-items-center justify-content-center edit-basic-qualification-button"
                  onClick={() => {
                    const updatedQuals = qualifications.filter(
                      (_, i) => i !== index
                    );
                    const updatedErrors = formErrors.filter(
                      (_, i) => i !== index
                    ); // keep errors in sync
                    setQualifications(updatedQuals);
                    setFormErrors(updatedErrors);
                  }}
                >
                  -
                </Button>
              </div>
            )}

            {/* Qualification Box */}
            <div
              className=" p-3"
              style={{
                borderRadius: "12px",
                border: "1px dashed #DDE1E8",
              }}
            >
              <Row className="g-3">
                <Col md={6} className="">
                  <InputFieldGroup
                    label="Degree"
                    name="degree"
                    type="text"
                    value={q.degree}
                    onChange={(e) => {
                      const updatedQuals = [...qualifications];
                      updatedQuals[index].degree = e.target.value;
                      setQualifications(updatedQuals);

                      // clear error only for this field/index
                      const updatedErrors = [...formErrors];
                      updatedErrors[index].degree = "";
                      setFormErrors(updatedErrors);
                    }}
                    placeholder="Degree"
                    required
                    error={formErrors[index]?.degree}
                  />
                </Col>

                <Col md={6} className="">
                  <InputFieldGroup
                    label="Field of study"
                    name="field"
                    type="text"
                    value={q.field}
                    onChange={(e) => {
                      const updatedQuals = [...qualifications];
                      updatedQuals[index].field = e.target.value;
                      setQualifications(updatedQuals);

                      const updatedErrors = [...formErrors];
                      updatedErrors[index].field = "";
                      setFormErrors(updatedErrors);
                    }}
                    placeholder="Field"
                    required
                    error={formErrors[index]?.field}
                  />
                </Col>

                <Col className="" md={12}>
                  <InputFieldGroup
                    label="University"
                    name="university"
                    type="text"
                    value={q.university}
                    onChange={(e) => {
                      const updatedQuals = [...qualifications];
                      updatedQuals[index].university = e.target.value;
                      setQualifications(updatedQuals);

                      const updatedErrors = [...formErrors];
                      updatedErrors[index].university = "";
                      setFormErrors(updatedErrors);
                    }}
                    placeholder="University"
                    required
                    error={formErrors[index]?.university}
                  />
                </Col>

                <Col md={6} className="">
                  <InputSelect
                    label="Start Year"
                    name="startYear"
                    value={q.startYear}
                    onChange={(e) => {
                      const updatedQuals = [...qualifications];
                      updatedQuals[index].startYear = e.target.value;
                      setQualifications(updatedQuals);

                      const updatedErrors = [...formErrors];
                      updatedErrors[index].startYear = "";
                      setFormErrors(updatedErrors);
                    }}
                    options={yearOptions}
                    error={formErrors[index]?.startYear}
                    required
                  />
                </Col>

                <Col md={6} className="">
                  <InputSelect
                    label="End Year"
                    name="endYear"
                    value={q.endYear}
                    onChange={(e) => {
                      const updatedQuals = [...qualifications];
                      updatedQuals[index].endYear = e.target.value;
                      setQualifications(updatedQuals);

                      const updatedErrors = [...formErrors];
                      updatedErrors[index].endYear = "";
                      setFormErrors(updatedErrors);
                    }}
                    options={yearOptions.filter((year) => {
                      if (!q.startYear) return true;
                      return Number(year.value) >= Number(q.startYear) + 1;
                    })}
                    error={formErrors[index]?.endYear}
                    required
                  />
                </Col>
              </Row>
            </div>
          </div>
        ))}

        <Button
          variant="default"
          className="maiacare-button common-btn-blue "
          onClick={handleAddQualification}
        >
          + Add Qualification
        </Button>
      </ContentContainer>

      <div className="d-flex justify-content-end mt-4">
        <Button
          variant="dark"
          className="maiacare-button common-btn-blue"
          onClick={handleNextClick} // navigate
        >
          Next <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
