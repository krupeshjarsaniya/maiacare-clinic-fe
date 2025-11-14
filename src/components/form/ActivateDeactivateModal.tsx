"use client";
import React, { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { Col, Form, Row } from "react-bootstrap";
import Image from "next/image";
import { InputSelect } from "../ui/InputSelect";
import Textarea from "../ui/Textarea";
import restricted_access from "../../assets/images/restricted-access.png";
import {
  InputFieldError,
  InputFieldLabel,
  InputFieldGroup,
} from "../ui/InputField";
import phone from "../../assets/images/Phone.png";
import email from "../../assets/images/Email.png";
import sthetoscope from "../../assets/images/Stethoscope.png";
import Arrowup from "../../assets/images/ArrowUpRight.png";
import patient from "../../assets/images/patient.png";
import temppatientImg1 from "../../assets/images/patient1.png";
import { RadioButtonGroup } from "../ui/RadioField";

// pass props
interface ActivateDeactivateProfileProps {
  show: boolean;
  onClose: () => void;
  setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
}

// doctor details interface
interface DoctorInfo {
  name: string;
  image: any;
  phone: string;
  email: string;
  specialization: string;
  patients: number;
}

// form
interface FormData {
  profile: string;
  actionType: string;
  reason: string;
  additionalNote: string;
}

interface FormError {
  profile?: string | undefined;
  actionType?: string;
  reason?: string;
  additionalNote?: string;
}

export function ActivateDeactivateProfile({
  show,
  onClose,
  setShowSuccessModal,
  title = "Profile Activation/Deactivation",
}: ActivateDeactivateProfileProps) {
  const [formData, setFormData] = useState<FormData>({
    profile: "",
    actionType: "",
    reason: "",
    additionalNote: "",
  });

  const [formError, setFormError] = useState<FormError>({});
  type Reason = {
    id: number;
    reason: string;
  };
  const reason: Reason[] = [
    {
      id: 1,
      reason: "Resignation/Termination",
    },
    {
      id: 2,
      reason: "Retirement",
    },
    {
      id: 3,
      reason: "Decseased",
    },
    {
      id: 4,
      reason: "Change in specialisation",
    },
  ];
  // doctor sample data
  const doctorInfo: DoctorInfo = {
    name: "Dr. Riya Sharma",
    image: temppatientImg1,
    phone: "+91 90920 38491",
    email: "riya.sharma@example.com",
    specialization: "Fertility Specialist",
    patients: 22,
  };
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCancel = () => {
    setShowSuccessModal(false);
    onClose();
  };
  // update input fields
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // validation
  const validate = (): boolean => {
    const errors: FormError = {};

    if (!formData.actionType.trim()) {
      errors.actionType = "Please select profile action.";
    }

    if (!formData.reason.trim()) {
      errors.reason = "Please select a reason.";
    }
    if (
      formData.additionalNote.trim().length > 0 &&
      formData.additionalNote.trim().length < 5
    ) {
      errors.additionalNote = "Note must be minimum 5 characters.";
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  // final submit
  const handleSubmit = () => {
    setFormError({});
    setShowSuccessModal(true);
    setFormData({
      profile: "",
      actionType: "",
      reason: "",
      additionalNote: "",
    });
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} header={title} closeButton>
      <Form onSubmit={handleSubmit}>
        <div className="kycmodal_info">
          <div className="d-flex align-items-center justify-content-between">
            <div className="kycmodal_profile">
              <Image
                src={temppatientImg1}
                alt="doctor"
                width={50}
                height={50}
              />
              <h6 className="mb-0 fw-semibold">Dr.Riya Dharang</h6>
              {/* <Image src={Verified} alt="Verified" width={22} height={22} /> */}
            </div>
            <Button
              className="maiacare-button-large  default-layout profile-card-boeder  bg-transparent btn btn-primary"
              // onClick={() => router.push("/profile")}
            >
              <Image src={Arrowup} alt="Arrow" width={12} height={12} />
            </Button>
          </div>
          <div className="kycmodal_info_text mt-3">
            <div>
              <Image
                src={phone}
                alt="phone"
                width={18}
                height={18}
                className="me-1"
              />
              <span>+91 12345 67890</span>
            </div>
            <div>
              <Image
                src={email}
                alt="email"
                width={18}
                height={18}
                className="me-1"
              />
              <span>riyadharang@miacare.com</span>
            </div>
          </div>
          <div className="kycmodal_info_text mt-2 gap-5">
            <div>
              <Image
                src={sthetoscope}
                alt="sthetoscope"
                width={18}
                height={18}
                className="me-1"
              />
              <span>Gynecologist</span>
            </div>
            <div>
              <Image
                src={patient}
                alt="patient"
                width={18}
                height={13}
                className="me-1"
              />
              <span>22 Patients</span>
            </div>
          </div>
        </div>
        <div>
          <Col md={6} className="mt-3 ">
            <RadioButtonGroup
              label="Select Action"
              name="profile"
              value={formData.profile}
              onChange={handleRadioChange} // ✅ now the correct type
              error={formError.profile}
              required
              options={[
                { label: "Activate", value: "activate" },
                { label: "Deactivate", value: "deactivate" },
              ]}
            />
          </Col>
        </div>
        <div className="mt-3">
          <label className="maiacare-input-field-label">Reason</label>
          <Form.Select defaultValue="" className="radio_options form-select">
            <option value="" disabled>
              Select
            </option>
            {reason.map((r) => (
              <option key={r.id} value={r.id}>
                {r.reason}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="mt-3">
          <Form.Check
            type="checkbox"
            label="Notify admin via email"
            className="text-nowrap check-box input "
            style={{ fontSize: "13px", color: "#3E4A57" }}
          />
        </div>
        <div>
          <InputFieldGroup
            label=" Any additional note"
            name=" Any additional note"
            type="text"
            // value={formData.Name}
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //   setFormData({ ...formData, Name: e.target.value });
            //   if (formError.Name) {
            //     // typing in hide error
            //     setFormError({ ...formError, Name: "" });
            //   }
            // }}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
            placeholder="Placeholder Text"
            required={true}
            disabled={false}
            readOnly={false}
            // error={formError.Name}
            className="position-relative "
          ></InputFieldGroup>
        </div>
        <div className="mt-3">
          <Row>
            <Col md={6} className="pe-0">
              <Button
                variant="outline"
                className="edit-profile-btn w-100 fw-semibold"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Col>
            <Col md={6}>
              <Button
                variant="dark"
                className="maiacare-button common-btn-blue w-100 fw-semibold"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>
  );
}

export function SuccessModalActivateDeactivate({
  showSuccessModal,
  setShowSuccessModal,
}: {
  showSuccessModal: boolean;
  setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Modal
      show={showSuccessModal}
      onHide={() => setShowSuccessModal(false)}
      closeButton
    >
      <div className="text-center">
        <Image src={restricted_access} alt="success" width={280} height={230} />
        <h3 className="modal-custom-header mt-2">
          Deactivation Sent Successfully
        </h3>
        <p className="modal-custom-content">
          The admin will be informed about your request shortly.
        </p>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <Button
          variant="default"
          className="w-100"
          onClick={() => setShowSuccessModal(false)}
        >
          Done
        </Button>
      </div>
    </Modal>
  );
}
