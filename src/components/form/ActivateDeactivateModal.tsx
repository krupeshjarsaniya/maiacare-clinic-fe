"use client";
import React, { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { Col, Form, Row } from "react-bootstrap";
import Image, { StaticImageData } from "next/image";
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
import toast from "react-hot-toast";
import { getProfileStatus } from "@/utlis/apis/apiHelper";
import { Doctor } from "../Doctor";
import { GetAllPatient } from "@/utlis/types/interfaces";

interface ActivateDeactivateProfileProps {
  show: boolean;
  onClose: () => void;
  setShowSuccessModal?: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  initialStatus?: "deactivate" | "activate";
  doctor?: Doctor | null;
  patient?: GetAllPatient | null;
  onStatusChange?: (status: "Active" | "Deactive") => void;
}
// doctor details interface

// form
interface ProfileStatusForm {
  profile: "Active" | "Deactive";
  reason: string;
  note: string;
  notifyAdmin: boolean;
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
  doctor,
  patient,
  title = "Profile Activation/Deactivation",
  onStatusChange,
}: ActivateDeactivateProfileProps) {
  const isDoctor = !!doctor;
  const isPatient = !!patient;
  const profileId = isDoctor ? doctor?.id : patient?._id;
  const name = isDoctor ? doctor?.name : patient?.name;
  const emailValue = isDoctor ? doctor?.email : patient?.email;
  const mobileValue = isDoctor ? undefined : patient?.contactNumber;

  const imageSrc = isDoctor ? doctor?.image : patient?.profileImage;
  const [formData, setFormData] = useState<ProfileStatusForm>({
    profile: "Active",
    reason: "",
    note: "",
    notifyAdmin: false,
  });
  console.log("modal:", doctor);

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

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCancel = () => {
    setShowSuccessModal?.(false);
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
  const doctorIdShow = doctor?.id;
  const validateForm = (data: ProfileStatusForm) => {
    const errors: FormError = {};

    if (!data.profile) {
      errors.profile = "Action is required";
    }

    if (!data.reason) {
      errors.reason = "Reason is required";
    }

    // note is optional → no validation required

    return errors;
  };
  const handleSubmit = async () => {
    const errors = validateForm(formData);
    setFormError(errors);

    if (Object.keys(errors).length !== 0) return;

    try {
      await getProfileStatus({
        doctorId: doctorIdShow,
        status: formData.profile, // ✅ Active | Deactive
        reason: formData.reason,
        notes: formData.note,
        notifyAdmin: formData.notifyAdmin,
      });

      onStatusChange?.(formData.profile);
      setShowSuccessModal?.(true);
      onClose();
    } catch (error) {
      console.error("Profile status error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal show={show} onHide={onClose} header={title} closeButton>
      <Form>
        <div className="kycmodal_info">
          <div className="d-flex align-items-center justify-content-between">
            <div className="kycmodal_profile">
              <Image
                src={
                  typeof imageSrc === "string" && imageSrc.trim() !== ""
                    ? imageSrc
                    : temppatientImg1
                }
                alt={name || "profile"}
                width={50}
                height={50}
                className="rounded-circle"
              />

              <h6 className="mb-0 fw-semibold">{name || "—"}</h6>

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
            {mobileValue && (
              <div>
                <Image src={phone} alt="phone" width={18} height={18} />
                <span>{mobileValue}</span>
              </div>
            )}

            {emailValue && (
              <div>
                <Image src={email} alt="email" width={18} height={18} />
                <span>{emailValue}</span>
              </div>
            )}
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
              {/* <img
                src={patient}
                alt="patient"
                width={18}
                height={13}
                className="me-1"
              /> */}
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
                { label: "Activate", value: "Active" },
                { label: "Deactivate", value: "Deactive" },
              ]}
            />
          </Col>
        </div>
        <div className="mt-3">
          <label className="maiacare-input-field-label">Reason</label>
          <Form.Select
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="radio_options form-select"
          >
            <option value="" disabled>
              Select
            </option>
            {reason.map((r) => (
              <option key={r.id} value={r.reason}>
                {r.reason}
              </option>
            ))}
          </Form.Select>
          {formError.reason && (
            <div className="text-danger small">{formError.reason}</div>
          )}
        </div>
        <div className="mt-3">
          <Form.Check
            type="checkbox"
            label="Notify admin via email"
            checked={formData.notifyAdmin}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                notifyAdmin: e.target.checked,
              }))
            }
            className="text-nowrap check-box input"
            style={{ fontSize: "13px", color: "#3E4A57" }}
          />
        </div>
        <div>
          <InputFieldGroup
            label="Any additional note"
            name="note"
            type="text"
            value={formData.note}
            onChange={handleChange}
            placeholder="Placeholder Text"
            disabled={false}
            readOnly={false}
          ></InputFieldGroup>
        </div>
        <div className="mt-3">
          <Row>
            <Col md={6} className="pe-md-0 ">
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
                className="maiacare-button common-btn-blue w-100 fw-semibold mt-2 mt-md-0"
                onClick={handleSubmit}
                type="button"
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
