"use client";
// import { useState } from "react";
import { Form, Row, Col, Button, Card, Badge } from "react-bootstrap";
import Simpleeditpro from "../../assets/images/Simpleeditpro.png";
import Image, { StaticImageData } from "next/image";
import cameraicon from "../../assets/images/Cameraicon.png";
import { InputFieldGroup } from "../ui/InputField";
import { useEffect, useRef, useState } from "react";
import ContentContainer from "../ui/ContentContainer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Modal from "../ui/Modal";
import LightTrush from "../../assets/images/LightTrush.png";
import ImageSquare from "../../assets/images/ImageSquare.png";
import Camera from "../../assets/images/Camera.png";
import { PhoneNumberInput } from "../ui/PhoneNumberInput";
import "../../style/ui.css";
import { TimePickerFieldGroup } from "../ui/CustomTimePicker";
import { useDoctor } from "../DoctorContext";
import clinicimage from "../../assets/images/cliniccard.png";
const convertTo24Hour = (time12h: string): string => {
  if (!time12h) return "";
  const match = time12h.match(/(\d+)(?::(\d+))?\s*(AM|PM)/i);
  if (!match) return "";
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2] || "0", 10);
  const ampm = match[3].toUpperCase();
  if (ampm === "PM" && hours < 12) hours += 12;
  if (ampm === "AM" && hours === 12) hours = 0;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};
export default function EditDoctorClinicdetails({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) {
  // Personal Details
  interface FormError {
    [key: string]: string;
  }
  const initialFormError: FormError = {};
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { doctor } = useDoctor();

  type FormData = {
    Name: string;
    MapLink: string;
    City: string;
    State: string;
    Pincode: string;
    Address: string;
    Contact: string;
    Email: string;

    MF: string;
    SS: string;
    Time: string;
    Timer: string;

    M: string;
    T: string;
    W: string;
    Th: string;
    F: string;
    S: string;
    Sun: string;
    imageclinic: string | StaticImageData;

    ContactName: string;
    ContactNo: string;
    ContactEmail: string;
    Adcard: string;
  };

  const initialFormData: FormData = {
    Name: "",
    MapLink: "",
    City: "",
    State: "",
    Pincode: "",
    Address: "",
    Contact: "",
    Email: "",

    MF: "",
    SS: "",
    Time: "",
    Timer: "",

    M: "",
    T: "",
    W: "",
    Th: "",
    F: "",
    S: "",
    Sun: "",

    imageclinic: "",

    ContactName: "",
    ContactNo: "",
    ContactEmail: "",
    Adcard: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
useEffect(() => {
  if (doctor && Array.isArray(doctor.clinic) && doctor.clinic.length > 0) {
    const clinic = doctor.clinic[0];
    console.log("Loaded clinic:", clinic);

    setFormData((prev) => ({
      ...prev,
      Name: clinic.name || "",
      Contact: clinic.contact || "",
      Email: clinic.email || "",
      MapLink: clinic.map || "",
      Pincode: clinic.pin || "",
      City: clinic.city || "",
      State: clinic.state || "",
      Address: clinic.address || "",
      MF: clinic.MF || "",
      SS: clinic.SS || "",
      imageclinic: clinic.imageclinic || "",
      Time: clinic.Time || "",
      Timer: clinic.Timer || "",
    }));

    if (clinic.imageclinic) {
      const imageSrc =
        typeof clinic.imageclinic === "string"
          ? clinic.imageclinic
          : clinic.imageclinic.src;
      setSelectedImage(imageSrc);
    }
  } else {
    // fallback for demo
    const demoClinic = {
      name: "Sunrise Fertility",
      contact: "+91 8987656874",
      email: "goodhealth@gmail.com",
      map: "https://www.google.com/maps/place/Mumbai,+India",
      pin: "380003",
      city: "Mumbai",
      state: "Maharashtra",
      address: "2nd Floor, Lakeview Complex, Hiranandani Gardens, Powai",
      MF: "10:00",
      SS: "10:00",
      Time: "17:00",
      Timer: "15:00",
      imageclinic: clinicimage,
    };

    setFormData((prev) => ({
      ...prev,
      Name: demoClinic.name,
      Contact: demoClinic.contact,
      Email: demoClinic.email,
      MapLink: demoClinic.map,
      Pincode: demoClinic.pin,
      City: demoClinic.city,
      State: demoClinic.state,
      Address: demoClinic.address,
      MF: demoClinic.MF,
      SS: demoClinic.SS,
      imageclinic: demoClinic.imageclinic,
      Time: demoClinic.Time,
      Timer: demoClinic.Timer,
    }));

    setSelectedImage(demoClinic.imageclinic.src);
  }
}, [doctor]);





















  
  const formatAadhaar = (value: string) => {
    return value
      .replace(/\D/g, "") // remove non-digits
      .slice(0, 12) // max 12 digits
      .replace(/(\d{4})(?=\d)/g, "$1 "); // add space after every 4 digits
  };
  // All Validatation

  const validateForm = (data: FormData): FormError => {
    const errors: FormError = {};

    if (!data.Name.trim()) errors.Name = "Name is required";
    if (!data.Pincode.trim()) errors.Pincode = "Pincode is required";
    if (!data.City.trim()) errors.City = "City is required";
    if (!data.State.trim()) errors.State = "State is required";
    if (!data.MapLink.trim()) errors.MapLink = "Map Link is required";
    if (!data.Address.trim()) errors.Address = "Address is required";
    if (!data.ContactName?.trim()) errors.ContactName = "Name is required";
    if (!data.Adcard.trim()) {
      errors.Adcard = "Aadhar  card number is required";
    } else {
      const rawValue = data.Adcard.replace(/\s/g, ""); // remove spaces

      if (rawValue.length < 12) {
        errors.Adcard = "Aadhar card number must be 12 digits";
      }
    }
    const contactnoRegex = /^[0-9]{10}$/;
    if (!data.ContactNo.trim()) {
      errors.ContactNo = "Contact number is required";
    } else if (!contactnoRegex.test(data.ContactNo)) {
      errors.ContactNo = "Please enter a valid 10-digit number";
    }
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
    const ContactEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.ContactEmail?.trim()) {
      errors.ContactEmail = "Email is required";
    } else if (!ContactEmailRegex.test(data.ContactEmail)) {
      errors.ContactEmail = "Enter a valid email address";
    }
    return errors;
  };
  // nextpage
  const handleNextClick = () => {
    const errors = validateForm(formData);
    setFormError(errors);
    if (Object.keys(errors).length === 0) {
      onNext();
    } else {
      console.log("Form has errors:", errors);
    }
  };

  //   operational component
  const [custome, setCustome] = useState(0);
  const handleSelect = () => {
    setCustome(custome === 0 ? 1 : 0);
  };

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

  // image change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setErrorMessage("Only JPG and PNG images are allowed.");
      event.target.value = ""; // reset input
      return;
    }
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (selectedFile.size > maxSize) {
      setErrorMessage("File size must be less than 5MB.");
      event.target.value = ""; // reset input
      return;
    }
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

  return (
    <div>
      {/* clinic details */}
      <ContentContainer className="mt-3">
        <Row>
          <Col>
            <h5 className="profile-card-main-titile">Clinic Details</h5>
            <div className="d-flex align-items-center gap-4 mt-3 flex-wrap justify-content-center justify-content-sm-start text-center text-md-start">
              <div className="profile-wrapper ">
                {/* Profile image */}
                <Image
                  src={selectedImage ? selectedImage : Simpleeditpro}
                  alt="Profile"
                  className="profile-image rounded-circle"
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
                        className="btn px-4 py-2 maiacare-button common-btn-blue"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>

              <div>
                <div className="fw-semibold">Add Clinic Logo</div>
                <div className="text-muted small">
                  Allowed Jpg, png of max size 5MB
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <div>
          {/* clinic name & email ID */}
          <Row>
            <Col className="mt-3 ">
              <InputFieldGroup
                label="Clinic Name"
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
          {/* phone number */}
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
          {/* address */}
          <Row>
            <Col className="mt-3">
              <InputFieldGroup
                label="Address"
                name="Address"
                type="text"
                value={formData.Address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Address: e.target.value });
                  if (formError.Address) {
                    // typing in hide error
                    setFormError({ ...formError, Address: "" });
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Address"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.Address}
                className="position-relative"
              ></InputFieldGroup>
            </Col>
          </Row>

          {/* Map Link & pincode */}
          <Row>
            <Col md={6} className="mt-3">
              <InputFieldGroup
                label="Map Link"
                name="MapLink"
                type="text"
                value={formData.MapLink}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, MapLink: e.target.value });
                  if (formError.MapLink) {
                    // typing in hide error
                    setFormError({ ...formError, MapLink: "" });
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Add Link"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.MapLink}
                className="position-relative"
              ></InputFieldGroup>
            </Col>
            <Col md={6} className="mt-3">
              <InputFieldGroup
                label="Pincode"
                name="Pincode"
                type="text"
                value={formData.Pincode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, Pincode: e.target.value });
                  if (formError.Pincode) {
                    // typing in hide error
                    setFormError({ ...formError, Pincode: "" });
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Pincode"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.Pincode}
                className="position-relative"
              ></InputFieldGroup>
            </Col>
          </Row>

          {/* city & state */}
          <Row>
            <Col md={6} className="mt-3">
              <InputFieldGroup
                label="City"
                name="City"
                type="text"
                value={formData.City}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, City: e.target.value });
                  if (formError.City) {
                    // typing in hide error
                    setFormError({ ...formError, City: "" });
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="City"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.City}
                className="position-relative"
              ></InputFieldGroup>
            </Col>
            <Col md={6} className="mt-3">
              <InputFieldGroup
                label="State"
                name="State"
                type="text"
                value={formData.State}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, State: e.target.value });
                  if (formError.State) {
                    // typing in hide error
                    setFormError({ ...formError, State: "" });
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="State"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.State}
                className="position-relative"
              ></InputFieldGroup>
            </Col>
          </Row>
        </div>
      </ContentContainer>
      {/* operational details */}
      <ContentContainer className="mt-4">
        <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center text-center text-md-start mb-3">
          <h5 className="profile-card-main-titile mb-2 mb-md-0">
            Operational hours & Days
          </h5>

          <Form.Check
            type="checkbox"
            label="Select custom Hours and Days?"
            onClick={handleSelect}
            className="text-nowrap check-box input"
          />
        </div>
        {custome === 0 ? (
          <>
            {/* monday-friday */}
            <Row className="mb-3">
              <Col md={6}>
                <TimePickerFieldGroup
                  label="Monday–Friday"
                  name="MF"
                  value={formData.MF}
                  onChange={(e) => {
                    setFormData({ ...formData, MF: e.target.value });
                  }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Time"
                  value={formData.Time}
                  onChange={(e) => {
                    setFormData({ ...formData, Time: e.target.value });
                  }}
                />
              </Col>
            </Row>
            {/* saturday-sunday */}
            <Row className="mb-3">
              <Col md={6}>
                <TimePickerFieldGroup
                  label="Saturday–Sunday"
                  name="SS"
                  value={formData.SS}
                  onChange={(e) => {
                    setFormData({ ...formData, SS: e.target.value });
                  }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Timer"
                  value={formData.Timer}
                  onChange={(e) => {
                    setFormData({ ...formData, Timer: e.target.value });
                  }}
                />
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row className="mb-3">
              <Col md={6}>
                {/* <Form.Check
                                    type="checkbox"
                                    className="text-nowrap check-box input"
                                  /> */}

                <TimePickerFieldGroup
                  label="Monday"
                  name="M"
                  value={formData.M}
                  onChange={(e: { target: { value: any } }) => {
                    setFormData({ ...formData, M: e.target.value });
                  }}
                  style={{ margintop: "8px" }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Time"
                  value={formData.Time}
                  onChange={(e) => {
                    setFormData({ ...formData, Time: e.target.value });
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                {/* <Form.Check
                              type="checkbox"
                              className="text-nowrap check-box input"
                            /> */}

                <TimePickerFieldGroup
                  label="Tuesday"
                  name="T"
                  value={formData.T}
                  onChange={(e: { target: { value: any } }) => {
                    setFormData({ ...formData, T: e.target.value });
                  }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Time"
                  value={formData.Time}
                  onChange={(e) => {
                    setFormData({ ...formData, Time: e.target.value });
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                {/* <Form.Check
                              type="checkbox"
                              className="text-nowrap check-box input"
                            /> */}

                <TimePickerFieldGroup
                  label="Wednesday"
                  name="W"
                  value={formData.W}
                  onChange={(e: { target: { value: any } }) => {
                    setFormData({ ...formData, W: e.target.value });
                  }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Time"
                  value={formData.Time}
                  onChange={(e) => {
                    setFormData({ ...formData, Time: e.target.value });
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                {/* <Form.Check
                              type="checkbox"
                              className="text-nowrap check-box input"
                            /> */}

                <TimePickerFieldGroup
                  label="Thursday"
                  name="Th"
                  value={formData.Th}
                  onChange={(e: { target: { value: any } }) => {
                    setFormData({ ...formData, Th: e.target.value });
                  }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Time"
                  value={formData.Time}
                  onChange={(e) => {
                    setFormData({ ...formData, Time: e.target.value });
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                {/* <Form.Check
                              type="checkbox"
                              className="text-nowrap check-box input"
                            /> */}

                <TimePickerFieldGroup
                  label="Friday"
                  name="F"
                  value={formData.F}
                  onChange={(e: { target: { value: any } }) => {
                    setFormData({ ...formData, F: e.target.value });
                  }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Time"
                  value={formData.Time}
                  onChange={(e) => {
                    setFormData({ ...formData, Time: e.target.value });
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                {/* <Form.Check
                              type="checkbox"
                              className="text-nowrap check-box input"
                            /> */}

                <TimePickerFieldGroup
                  label="Saturday"
                  name="S"
                  value={formData.S}
                  onChange={(e: { target: { value: any } }) => {
                    setFormData({ ...formData, S: e.target.value });
                  }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Time"
                  value={formData.Time}
                  onChange={(e) => {
                    setFormData({ ...formData, Time: e.target.value });
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                {/* <Form.Check
                              type="checkbox"
                              className="text-nowrap check-box input"
                            /> */}

                <TimePickerFieldGroup
                  label="Sunday"
                  name="Sun"
                  value={formData.Sun}
                  onChange={(e: { target: { value: any } }) => {
                    setFormData({ ...formData, Sun: e.target.value });
                  }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Time"
                  value={formData.Time}
                  onChange={(e) => {
                    setFormData({ ...formData, Time: e.target.value });
                  }}
                />
              </Col>
            </Row>
          </>
        )}
      </ContentContainer>
      {/* contact details */}
      <ContentContainer className="mt-3">
        <div>
          <h5 className="profile-card-main-titile">Contact Person Details</h5>
          <Row>
            <Col className="mt-3 " md={6}>
              <InputFieldGroup
                label="Name"
                name="ContactName"
                type="text"
                value={formData.ContactName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, ContactName: e.target.value });
                  if (formError.ContactName) {
                    // typing in hide error
                    setFormError({ ...formError, ContactName: "" });
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Name"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.ContactName}
                className="position-relative "
              ></InputFieldGroup>
            </Col>
            <Col md={6} className="mt-3">
              <PhoneNumberInput
                label="Contact Number"
                value={formData.ContactNo}
                inputMode="numeric"
                onChange={(phone: string) => {
                  // ✅ Remove any non-digit character
                  let value = phone.replace(/\D/g, "");

                  // ✅ Allow only max 10 digits
                  if (value.length > 10) {
                    value = value.slice(0, 10);
                  }

                  // ✅ Update formData
                  setFormData({ ...formData, ContactNo: value });

                  // ✅ Hide error while typing
                  if (formError.ContactNo) {
                    setFormError({ ...formError, ContactNo: "" });
                  }
                }}
                required
                error={formError.ContactNo}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mt-3">
              <InputFieldGroup
                label="Email ID"
                name="ContactEmail"
                type="text"
                value={formData.ContactEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, ContactEmail: e.target.value });
                  if (formError.ContactEmail) {
                    setFormError({ ...formError, ContactEmail: "" });
                  }
                }}
                placeholder="Email"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.ContactEmail} // ✅ fixed here
                className="position-relative"
              />
            </Col>
            <Col md={6} sm={12} className="mt-3">
              <InputFieldGroup
                label="Aadhar Number"
                name="Aadhar"
                type="text"
                value={formatAadhaar(formData.Adcard)} // Aadhaar formatting (xxxx xxxx xxxx)
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const rawValue = e.target.value;

                  // only didgit type
                  let value = rawValue.replace(/\D/g, "");

                  // only 12 digit enter
                  if (value.length > 12) {
                    value = value.slice(0, 12);
                  }

                  setFormData({ ...formData, Adcard: value });

                  // only digit type validtation msg hide
                  if (/^\d+$/.test(rawValue)) {
                    if (formError.Adcard) {
                      setFormError({ ...formError, Adcard: "" });
                    }
                  }
                }}
                placeholder="Aadhar Number"
                required
                error={formError.Adcard}
                className="position-relative"
              />
            </Col>
          </Row>
        </div>
      </ContentContainer>
      <div className="d-flex justify-content-end mt-4 gap-3">
        <Button
          variant="dark"
          className="maiacare-button edit-profile-btn"
          onClick={onPrevious}
        >
          <ArrowLeft size={16} /> Previous
        </Button>
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
