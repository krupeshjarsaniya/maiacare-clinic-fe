"use client";
// import { useState } from "react";
import { Form, Row, Col, Button, Card, Badge } from "react-bootstrap";
import Simpleeditpro from "../../assets/images/Simpleeditpro.png";
import Image, { StaticImageData } from "next/image";
import cameraicon from "../../assets/images/editlogobtn.png";
import { InputFieldGroup } from "../ui/InputField";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ContentContainer from "../ui/ContentContainer";
import { ArrowRight } from "lucide-react";
import Modal from "../ui/Modal";
import LightTrush from "../../assets/images/LightTrush.png";
import ImageSquare from "../../assets/images/ImageSquare.png";
import Camera from "../../assets/images/Camera.png";
import { PhoneNumberInput } from "../ui/PhoneNumberInput";
import cross from "../../assets/images/crossedit.png";
import "../../style/ui.css";
import photo1 from "../../assets/images/profilephoto1.png";
import photo2 from "../../assets/images/profilephoto2.png";
import photo3 from "../../assets/images/profilephoto3.png";
import photo4 from "../../assets/images/profilephoto4.png";
import Download from "../../assets/images/Uploadimg.png";
import { useDoctorData } from "@/utlis/hooks/DoctorData";
import AddDoctor from "../AddDoctor";
import { clinicProfileData } from "@/utlis/StaticData";
import { clinicData } from "@/utlis/types/interfaces";

export default function Editbasicdetails({
  onNext,
  onChange,
  data,
}: {
  data: clinicData | null;
  onChange: (data: Partial<clinicData>) => void;
  onNext: () => void;
}) {
  // Personal Details
  interface FormError {
    [key: string]: string;
  }
  console.log("clinicBasic:", data);

  const initialFormError: FormError = {};
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [errorMessage, setErrorMessage] = useState<string>("");

  type FormData = {
    Name: string;
    MapLink: string;
    City: string;
    State: string;
    NumberofBeds: string;
    doctorsonboard: string;
    Pincode: string;
    Address: string;
    Contact: string;
    SecondaryNumber: string;
    Email: string;
  };

  const initialFormData: FormData = {
    Name: "",
    MapLink: "",
    City: "",
    NumberofBeds: "",
    doctorsonboard: "",
    State: "",
    Pincode: "",
    Address: "",
    Contact: "",
    SecondaryNumber: "",
    Email: "",
  };
  const clinicprofie = clinicProfileData;
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // All Validatation

  const validateForm = (data: FormData): FormError => {
    const errors: FormError = {};

    if (!data.Name.trim()) errors.Name = "Name is required";
    if (!data.Pincode.trim()) errors.Pincode = "Pincode is required";
    if (!data.City.trim()) errors.City = "City is required";
    if (!data.State.trim()) errors.State = "State is required";
    if (!data.NumberofBeds.trim())
      errors.NumberofBeds = "Number of Beds is required";
    if (!data.doctorsonboard.trim())
      errors.doctorsonboard = "Doctors Onboard is required";
    if (!data.MapLink.trim()) errors.MapLink = "Map Link is required";
    if (!data.Address.trim()) errors.Address = "Address is required";
    const contactRegex = /^[0-9]{10}$/;
    if (!data.Contact.trim()) {
      errors.Contact = "Contact number is required";
    } else if (!contactRegex.test(data.Contact)) {
      errors.Contact = "Please enter a valid 10-digit number";
    }
    const SecondarycontactRegex = /^[0-9]{10}$/;
    if (!data.SecondaryNumber.trim()) {
      errors.SecondaryNumber = "Secondary number is required";
    } else if (!SecondarycontactRegex.test(data.SecondaryNumber)) {
      errors.SecondaryNumber = "Please enter a valid 10-digit number";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.Email.trim()) {
      errors.Email = "Email is required";
    } else if (!emailRegex.test(data.Email)) {
      errors.Email = "Enter a valid email address";
    }
    return errors;
  };
  // nextpage
  // const handleNextClick = () => {
  //   const errors = validateForm(formData);
  //   setFormError(errors);
  //   if (Object.keys(errors).length === 0) {
  //     onNext();
  //   } else {
  //     console.log("Form has errors:", errors);
  //   }
  // };
  const handleNextClick = () => {
    const errors = validateForm(formData);
    setFormError(errors);

    if (Object.keys(errors).length !== 0) {
      console.log("Form has errors:", errors);
      return;
    }

    // ✅ Map form data → clinicData structure
    const updatedClinicData: Partial<clinicData> = {
      clinicName: formData.Name,
      email: formData.Email,
      contactNumber: formData.Contact,
      address: formData.Address,
      city: formData.City,
      state: formData.State,
      pincode: formData.Pincode,
      mapLink: formData.MapLink,
      beds: Number(formData.NumberofBeds),
      doctorOnboard: Number(formData.doctorsonboard),

      clinicLogo: selectedImage || "",

      servicesOffered: selectedServices.map((s) => s.service),

      photos: uploadedImages.map((url) => ({
        url,
        logo: false,
      })),
    };
    console.log("editedBasicdat:-", updatedClinicData);

    onChange(updatedClinicData);

    onNext();
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

  // upload photo
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [tempSelectedImages, setTempSelectedImages] = useState<string[]>([]);
  const [showuploadModal, setShowUploadModal] = useState(false);

  // const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Open Modal
  const handleUploadOpenModal = () => {
    setTempSelectedImages([]); // reset temporary images
    setShowUploadModal(true);
  };

  // ✅ File input trigger
  const handleUploadEditClick = () => {
    fileInputRef.current?.click();
  };

  // ✅ Handle file selection (multi-upload)
  const handleUploadFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const newImages: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!allowedTypes.includes(file.type)) {
        setErrorMessage("Only JPG and PNG images are allowed.");
        continue;
      }
      if (file.size > maxSize) {
        setErrorMessage("File size must be less than 5MB.");
        continue;
      }
      const imageURL = URL.createObjectURL(file);
      newImages.push(imageURL);
    }

    setTempSelectedImages((prev) => [...prev, ...newImages]);
    setErrorMessage("");
  };

  // ✅ Save selected images to main list
  const handleUploadSave = () => {
    setUploadedImages((prev) => [...prev, ...tempSelectedImages]);
    setTempSelectedImages([]);
    setShowUploadModal(false);
  };

  // ✅ Delete all selected from modal preview
  const handleUploadDelete = () => {
    setTempSelectedImages([]);
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

  // clinic data
  useEffect(() => {
    if (!data) return;

    setFormData({
      Name: data.clinicName || "",
      MapLink: data.mapLink || "",
      City: data.city || "",
      State: data.state || "",
      NumberofBeds: data.beds?.toString() || "",
      doctorsonboard: data.doctorOnboard?.toString() || "",
      Pincode: data.pincode || "",
      Address: data.address || "",
      Contact: data.contactNumber?.replace(/\D/g, "") || "",
      SecondaryNumber: data.contactNumber?.replace(/\D/g, "") || "",
      Email: data.email || "",
    });

    // Clinic logo
    if (data.clinicLogo) {
      setSelectedImage(data.clinicLogo);
    }
  }, [data]);
  useEffect(() => {
    if (!data?.servicesOffered) return;

    const mappedServices = data.servicesOffered.map((service, index) => ({
      id: index + 1,
      service,
    }));

    setSelectedServices(mappedServices);
  }, [data]);
  useEffect(() => {
    if (!data?.photos) return;

    const photoUrls = data.photos.map((p: any) => p.url);
    setUploadedImages(photoUrls);
  }, [data]);
  //  servicess
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
      {/* clinic details */}
      <ContentContainer className="mt-3">
        <Row>
          <Col>
            <h5 className="profile-card-main-titile">Clinic Details</h5>
            <div className="d-flex align-items-center gap-4 mt-3 flex-wrap justify-content-center justify-content-sm-start text-center text-md-start">
              <div className="profile-wrapper">
                {/* Profile image */}
                <Image
                  src={Simpleeditpro}
                  // src={selectedImage ? selectedImage : Simpleeditpro}

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
            <Col className="mt-3 " md={6}>
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
              <PhoneNumberInput
                label="Secondary Number"
                value={formData.SecondaryNumber}
                inputMode="numeric"
                onChange={(phone: string) => {
                  // ✅ Remove any non-digit character
                  let value = phone.replace(/\D/g, "");

                  // ✅ Allow only max 10 digits
                  if (value.length > 10) {
                    value = value.slice(0, 10);
                  }

                  // ✅ Update formData
                  setFormData({ ...formData, SecondaryNumber: value });

                  // ✅ Hide error while typing
                  if (formError.Contact) {
                    setFormError({ ...formError, SecondaryNumber: "" });
                  }
                }}
                required
                error={formError.SecondaryNumber}
              />
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

          {/* beds & doctorsonboard */}
          <Row>
            <Col md={6} className="mt-3">
              <InputFieldGroup
                label="Number of Beds"
                name="NumberofBeds"
                type="text"
                value={formData.NumberofBeds}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, NumberofBeds: e.target.value });
                  if (formError.NumberofBeds) {
                    // typing in hide error
                    setFormError({ ...formError, NumberofBeds: "" });
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Number of Beds"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.NumberofBeds}
                className="position-relative"
              ></InputFieldGroup>
            </Col>
            <Col md={6} className="mt-3">
              <InputFieldGroup
                label="Doctors Onboard"
                name="doctorsonboard"
                type="text"
                value={formData.doctorsonboard}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, doctorsonboard: e.target.value });
                  if (formError.doctorsonboard) {
                    // typing in hide error
                    setFormError({ ...formError, doctorsonboard: "" });
                  }
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Doctors Onboard"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.doctorsonboard}
                className="position-relative"
              ></InputFieldGroup>
            </Col>
          </Row>
        </div>
      </ContentContainer>
      {/* services offered */}
      <ContentContainer className="mt-3">
        <div>
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
                style={{ color: "rgba(138, 141, 147, 1)", fontSize: "14px" }}
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
        </div>
      </ContentContainer>

      {/* clinic photos */}
      <ContentContainer className="mt-3">
        <div>
          <h5 className="profile-card-main-titile">Clinic Photos</h5>
          <div className="d-flex gap-3 flex-wrap">
            {/* <Image src={photo1} alt="1" width={100} height={100} />
            <Image src={photo2} alt="2" width={100} height={100} />
            <Image src={photo3} alt="3" width={100} height={100} />
            <Image src={photo4} alt="4" width={100} height={100} />
            <Image src={photo1} alt="5" width={100} height={100} /> */}

            <div className="d-flex gap-3 flex-wrap">
              {/* {uploadedImages.map((img, idx) => (
                <Image
                  key={`uploaded-${idx}`}
                  src={img}
                  alt={`uploaded-${idx}`}
                  width={100}
                  height={100}
                  style={{ objectFit: "cover", borderRadius: "7px" }}
                />
              ))} */}
              {uploadedImages.length > 0 ? (
                uploadedImages.map((img, idx) => (
                  <Image
                    key={`clinic-photo-${idx}`}
                    src={img}
                    alt={`clinic-photo-${idx}`}
                    width={100}
                    height={100}
                    style={{
                      objectFit: "cover",
                      borderRadius: "7px",
                    }}
                  />
                ))
              ) : (
                <div className="text-muted small">
                  No clinic photos uploaded
                </div>
              )}
              <div
                className="text-center uploadbtn"
                onClick={handleUploadOpenModal}
              >
                <div className="upload_bg">
                  <Image
                    src={Download}
                    alt="Add Photo"
                    width={27}
                    height={27}
                  />
                </div>
                <span className="Profilephoto-save-take">Add More</span>
              </div>

              {/* Modal */}
              <Modal
                show={showuploadModal}
                onHide={() => {
                  setShowUploadModal(false);
                  setErrorMessage(""); // Reset error msg on modal close
                }}
                header="Clinic Photos"
                closeButton={true}
                className="text-pink"
                dialogClassName="custom-modal-width"
              >
                <div className="d-flex flex-column align-items-center">
                  {/* Preview section */}
                  <div
                    className="rounded overflow-hidden mb-3 mx-auto position-relative"
                    style={{ width: 160, height: 160, borderRadius: "16px" }}
                  >
                    {tempSelectedImages.length > 0 ? (
                      <Image
                        src={tempSelectedImages[0]} // show first image as main preview
                        alt="preview"
                        width={160}
                        height={160}
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <Image
                        src={Simpleeditpro}
                        alt="default"
                        width={160}
                        height={160}
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </div>

                  {/* Thumbnail preview below main */}
                  {tempSelectedImages.length > 1 && (
                    <div className="d-flex gap-2 flex-wrap justify-content-center mb-3">
                      {tempSelectedImages.map((img, idx) => (
                        <Image
                          key={idx}
                          src={img}
                          alt={`preview-${idx}`}
                          width={70}
                          height={70}
                          style={{ objectFit: "cover", borderRadius: "8px" }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Error message */}
                  {errorMessage && (
                    <div
                      className="text-danger mb-2"
                      style={{ fontSize: "14px" }}
                    >
                      {errorMessage}
                    </div>
                  )}

                  {/* Bottom Section */}
                  <div className="w-100 border-top pt-3 d-flex justify-content-between align-items-center flex-wrap">
                    <div className="d-flex gap-3 align-items-center flex-wrap">
                      {/* Add Photo */}
                      <div
                        className="text-center"
                        style={{ cursor: "pointer" }}
                        onClick={handleUploadEditClick}
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
                          multiple
                          ref={fileInputRef}
                          onChange={handleUploadFileChange}
                          style={{ display: "none" }}
                        />
                      </div>

                      {/* Take Photo */}
                      <div
                        className="text-center"
                        style={{ cursor: "pointer" }}
                      >
                        <Image
                          src={Camera}
                          alt="Take Photo"
                          width={18}
                          height={18}
                          onClick={openCamera}
                        />
                        <div className="Profilephoto-save-take">Take Photo</div>

                        {/* Hidden camera input */}
                        <input
                          type="file"
                          accept="image/*"
                          capture="user"
                          ref={cameraInputRef}
                          style={{ display: "none" }}
                          onChange={handleFileCamera}
                        />
                      </div>
                    </div>

                    <div className="d-flex gap-3 mt-md-0 align-items-center">
                      <button className="btn p-0" onClick={handleUploadDelete}>
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
                        onClick={handleUploadSave}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
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
