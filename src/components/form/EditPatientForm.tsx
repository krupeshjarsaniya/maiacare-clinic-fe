"use client";

import { Col, Row } from "react-bootstrap";
import ContentContainer from "../ui/ContentContainer";
import Image from "next/image";
import Modal from "../ui/Modal";
import Simpleeditpro from "../../assets/images/Simpleeditpro.png";
import cameraicon from "../../assets/images/Cameraicon.png";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Camera from "../../assets/images/Camera.png";
import ImageSquare from "../../assets/images/ImageSquare.png";
import Button from "../ui/Button";
import { InputFieldGroup } from "../ui/InputField";
import { RadioButtonGroup } from "../ui/RadioField";
import LightTrush from "../../assets/images/LightTrush.png";
import { DatePickerFieldGroup } from "../ui/CustomDatePicker";
import { InputSelect } from "../ui/InputSelect";
import { PhoneNumberInput } from "../ui/PhoneNumberInput";
import {
  AddPatientFormData,
  AddPatientFormObjType,
} from "../../utlis/types/interfaces";
import dummyPatientImg from "../../assets/images/dummy-patient-sucess.png";
import { useRouter } from "next/navigation";
import { addPatient } from "@/utlis/apis/apiHelper";
import toast from "react-hot-toast";
import { formatDateTime } from "@/utlis/Helper";

type FormError = Partial<Record<keyof AddPatientFormData, string>>;

const initialFormData: AddPatientFormData = {
  name: "",
  patientId: "",
  gender: "Male", // default to male if you want
  date: "",
  age: "",
  phone: "",
  email: "",
  address: "",
  pincode: "",
  city: "",
  state: "",
  bloodGroup: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  emergencyContactRelation: "",
  profileImage: "",
};

const initialFormError: FormError = {};

function EditPatientForm() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState<AddPatientFormData>(initialFormData);
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const router = useRouter();
  // Handle form field change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  //********* EDIT PROFILE MODAL *********//
  const fileInputRef = useRef<HTMLInputElement>(null); // file input programmatically open

  const [previewImage, setPreviewImage] = useState<string | null>(null); //previewImage
  const [selectedImage, setSelectedImage] = useState<string | null>(null); //selectedImage

  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleOpenModal = () => {
    setPreviewImage(selectedImage || Simpleeditpro.src); // show image in modal
    setShowModal(true);
  };

  const handleEditClick = () => {
    fileInputRef.current?.click(); //Edit btn click in file chhose
  };

  const cameraInputRef = useRef<HTMLInputElement>(null); // camera image select
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
      setPreviewImage(null); // remove previous preview
      event.target.value = ""; // reset input
      return;
    }

    // ✅ 2. Max size 5MB check
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (selectedFile.size > maxSize) {
      setErrorMessage("File size must be less than 5MB.");
      setPreviewImage(null); // remove previous preview
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

    if (!file) return;

    // Allowed image types
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    // Max file size = 5MB
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    // Type validation
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("Only JPG and PNG images are allowed.");
      setPreviewImage(null); // remove previous preview
      event.target.value = ""; // Reset input
      return;
    }

    // Size validation
    if (file.size > maxSize) {
      setErrorMessage("File size must be less than 5MB.");
      setPreviewImage(null); // remove previous preview
      event.target.value = ""; // Reset input
      return;
    }

    // ✅ If valid image
    setErrorMessage(""); // Clear error
    const imageURL = URL.createObjectURL(file);
    setPreviewImage(imageURL); // Show preview
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

  const validateForm = (data: AddPatientFormData): FormError => {
    const errors: FormError = {};
    if (!data.name.trim()) errors.name = "Name is required";
    if (!data.patientId.trim()) errors.patientId = "Patient ID is required";
    if (!data.date) errors.date = "Date of birth is required";

    if (!data.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    if (!data.email.trim()) errors.email = "Email is required";

    if (!data.address.trim()) errors.address = "Address is required";

    if (!data.city.trim()) errors.city = "City is required";
    if (!data.state.trim()) errors.state = "State is required";
    if (!data.pincode.trim()) errors.pincode = "Pincode is required";

    if (!data.emergencyContactName.trim())
      errors.emergencyContactName = "Emergency Contact Name is required";
    if (!data.emergencyContactPhone.trim())
      errors.emergencyContactPhone = "Emergency Contact Phone is required";
    if (!data.emergencyContactRelation.trim())
      errors.emergencyContactRelation =
        "Emergency Contact Relation is required";

    return errors;
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const profile = selectedImage || "";
    const errors = validateForm(formData);
    setFormError(errors);
    // console.log("errors", errors);
    if (Object.keys(errors).length === 0) {
      const data: AddPatientFormObjType = {
        personalDetails: {
          profileImage: profile,
          name: formData.name,
          email: formData.email,
          gender: formData.gender,
          dob: formatDateTime(formData.date),
          contactNumber: formData.phone,
          address: formData.address,
          pincode: formData.pincode,
          city: formData.city,
          state: formData.state,
        },
        emergencyContact: {
          name: formData.emergencyContactName,
          contactNumber: formData.emergencyContactPhone,
          relation: formData.emergencyContactRelation,
        },
   
        type: "clinic",
      };
  
      console.log("patient add data ", data);

      addPatient(data)
        .then((response) => {
          console.log("response : ", response);

          router.push("/patients");
          localStorage.setItem("patientAddedSuccess", "true");
          if (response.data.status) {
            setShowSuccessModal(true);
            setFormError(initialFormError);
          } else {
            console.log("Error");
          }
        })
        .catch((err) => {
          console.log("error", err?.response);

          const apiError = err?.response?.data;

          // extract dynamic error message
          const fieldError = apiError?.details?.errors
            ? Object.values(apiError.details.errors)[0] // pick first field error
            : null;

          const message =
            fieldError ||
            apiError?.details?.message ||
            apiError?.message ||
            "Something went wrong";

          toast.error(message);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ContentContainer>
          <Row className="mt-1 g-3">
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
                  >
                    <Image
                      src={cameraicon}
                      alt="Upload"
                      width={44}
                      height={44}
                    />
                  </div>
                </div>

                {/* Edit Profile click in Modal */}

                <Modal
                  show={showModal}
                  onHide={() => {
                    setShowModal(false);
                    setErrorMessage(""); //🔹Reset error msg on modal close
                  }}
                  // size="md"
                  header="Profile Photo"
                  closeButton={true}
                  className="text-pink"
                  dialogClassName="custom-modal-width"
                >
                  <div className="d-flex flex-column align-items-center">
                    <div className="rounded overflow-hidden mb-3 mx-auto position-relative edit-basic-details-modal">
                      {/* Defult Profile Image */}
                      <Image
                        src={previewImage ? previewImage : Simpleeditpro}
                        alt="Simpleeditpro"
                        width={160}
                        height={160}
                        className="edit-basic-details-image"
                      />
                    </div>
                    {errorMessage && ( // error msg only jpg/png image allow
                      <div className="text-danger mb-2 edit-basic-details-error-font">
                        {errorMessage}
                      </div>
                    )}

                    <div className="w-100 border-top pt-3 d-flex justify-content-between align-items-center flex-wrap">
                      <div className="d-flex gap-3 align-items-center flex-wrap">
                        {/* Edit button  */}

                        {/* <div className="text-center" style={{ cursor: 'pointer' }} onClick={handleEditClick}>
                          <Image src={EditProfile} alt="Edit" width={18} height={18} />
                          <div className="kyc-details">Edit</div>
                          <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                          />
                        </div> */}

                        <div
                          className="text-center edit-basic-details-edit-button"
                          onClick={handleEditClick}
                        >
                          <Image
                            src={ImageSquare}
                            alt="Add Photo"
                            width={21}
                            height={21}
                          />
                          <div className="small">Add Photo</div>

                          <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="edit-basic-details-edit-input"
                          />
                        </div>

                        <div className="text-center edit-basic-camera-icon">
                          {/* Camera button */}
                          <Image
                            src={Camera}
                            alt="Take Photo"
                            width={21}
                            height={21}
                            onClick={openCamera}
                          />
                          <div className="small">Take Photo</div>

                          {/* Hidden input for camera */}
                          <input
                            type="file"
                            accept="image/*"
                            capture="user" // front camera
                            ref={cameraInputRef}
                            className="edit-basic-details-edit-input"
                            onChange={handleFileCamera}
                          />
                        </div>
                      </div>

                      <div className="d-flex gap-3 mt-md-0 align-items-center">
                        <button className="btn p-0" onClick={handleDelete}>
                          <Image
                            src={LightTrush}
                            alt="Trash"
                            width={21}
                            height={21}
                          />
                          <div className="maiacare-input-field-helper-text">
                            Delete
                          </div>
                        </button>

                        <Button
                          variant="default"
                          contentSize="small"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
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

            <Col md={12} sm={12}>
              <InputFieldGroup
                label="Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Enter Name"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.name}
              />
            </Col>
            <Col md={6}>
              <InputFieldGroup
                label="Patient ID"
                name="patientId"
                type="text"
                value={formData.patientId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Enter patientId"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.patientId}
              />
            </Col>
            <Col md={6}>
              <RadioButtonGroup
                label="Gender"
                name="gender"
                value={formData.gender || ""}
                defaultValue="Male"
                onChange={(e) => handleChange(e)}
                required
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                ]}
              />
            </Col>

            <Col md={3}>
              <DatePickerFieldGroup
                label="DOB"
                name="date"
                placeholder="Enter DOB"
                value={formData.date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                required={true}
                disabled={false}
                error={formError.date}
              />
            </Col>
            <Col md={3}>
              <InputSelect
                label="Age"
                name="age"
                value={formData.age}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {}}
                required={true}
                disabled={false}
                error={formError.age}
                placeholder="Select Age"
                options={[
                  { id: "1", value: "1", label: "1" },
                  { id: "2", value: "2", label: "2" },
                  { id: "3", value: "3", label: "3" },
                ]}
              />
            </Col>
            <Col md={6}>
              <InputSelect
                label="Blood Group"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {}}
                required={true}
                // disabled={
                //     modalFormPhisicalData.includes(editPhysicalAssessment)
                //     ? false : modalFormPhisicalData.length == 0 ? false : true
                //     }

                // disabled={modalFormPhisicalData?.length == 0 ? false : true}
                error={formError.bloodGroup}
                placeholder="Select Blood Group"
                options={[
                  { id: "1", value: "A+", label: "A+" },
                  { id: "2", value: "A-", label: "A-" },
                  { id: "3", value: "B+", label: "B+" },
                  { id: "4", value: "B-", label: "B-" },
                  { id: "5", value: "AB+", label: "AB+" },
                  { id: "6", value: "AB-", label: "AB-" },
                  { id: "7", value: "O+", label: "O+" },
                  { id: "8", value: "O-", label: "O-" },
                ]}
              />
            </Col>

            <Col md={6}>
              <PhoneNumberInput
                label="Contact Number"
                name="phone"
                value={formData.phone}
                onChange={(phone: string) => {
                  handleChange({
                    target: { name: "phone", value: phone },
                  } as React.ChangeEvent<HTMLInputElement>);
                }}
                placeholder="1212"
                required
                error={formError.phone}
              />
            </Col>
            <Col md={6}>
              <InputFieldGroup
                label="Email ID"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Enter Email ID"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.email}
              />
            </Col>

            <Col md={6}>
              <InputFieldGroup
                label="Address"
                name="address"
                type="text"
                value={formData.address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Enter Address"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.address}
              />
            </Col>
            <Col md={6}>
              <InputFieldGroup
                label="Pincode"
                name="pincode"
                type="text"
                value={formData.pincode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Enter Pincode"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.pincode}
              />
            </Col>

            <Col md={6}>
              <InputFieldGroup
                label="City"
                name="city"
                type="text"
                value={formData.city}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Enter City"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.city}
              />
            </Col>
            <Col md={6}>
              <InputFieldGroup
                label="State"
                name="state"
                type="text"
                value={formData.state}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Enter State"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.state}
              />
            </Col>
          </Row>
        </ContentContainer>

        <ContentContainer className="mt-3">
          <Row className="g-3">
            <h3 className="add-patient-form-title">
              Emergency Contact Details
            </h3>
            <Col md={6}>
              <InputFieldGroup
                label="Name"
                name="emergencyContactName"
                type="text"
                value={formData.emergencyContactName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Enter Name"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.emergencyContactName}
              />
            </Col>
            <Col md={6}>
              <PhoneNumberInput
                label="Contact Number"
                value={formData.emergencyContactPhone}
                onChange={(phone: string) => {
                  handleChange({
                    target: { name: "emergencyContactPhone", value: phone },
                  } as React.ChangeEvent<HTMLInputElement>);
                }}
                placeholder="1212"
                required
                error={formError.emergencyContactPhone}
              />
            </Col>
            <Col md={6}>
              <InputSelect
                label="Relation"
                name="emergencyContactRelation"
                value={formData.emergencyContactRelation}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {}}
                required={true}
                disabled={false}
                error={formError.emergencyContactRelation}
                placeholder="Select Relation"
                options={[
                  { id: "1", value: "Father", label: "Father" },
                  { id: "2", value: "Mother", label: "Mother" },
                  { id: "3", value: "Brother", label: "Brother" },
                ]}
              />
            </Col>
          </Row>
        </ContentContainer>

        <div className="d-flex justify-content-end gap-3 my-4">
          <Button variant="default" disabled={false} type="submit">
            Update Patient
          </Button>
        </div>
      </form>
    </>
  );
}

export default EditPatientForm;
