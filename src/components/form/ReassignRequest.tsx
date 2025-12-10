"use client";
import React, { useRef, useState } from "react";
import Modal from "../ui/Modal";
import {
  InputFieldError,
  InputFieldGroup,
  InputFieldLabel,
} from "../ui/InputField";
import Button from "../ui/Button";
import { Col, Dropdown, Form, Row } from "react-bootstrap";
import Image from "next/image";
import SuccessImageRescheduleAppointment from "../../assets/images/ReschedulingRequest.png";
import doctor from "../../assets/images/doctor1.png";
import patient from "./../../assets/images/Img-1.png";
import Arrowup from "../../assets/images/ArrowUpRight.png";
import temppatientImg1 from "../../assets/images/patient1.png";
import doctor1 from "../../assets/images/doctor1.png";
import doctor2 from "../../assets/images/doctor2.png";
import doctor3 from "../../assets/images/doctor3.png";
import doctor4 from "../../assets/images/doctor4.jpg";
import doctor5 from "../../assets/images/doctor5.png";
import { InputSelect } from "../ui/InputSelect";
import Textarea from "../ui/Textarea";
interface RescheduleAppointmentRequestProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: { date: string; time: string; reason: string }) => void;
  setShowSuccessModalBook: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
}
interface Doctor {
  id: number;
  name: string;
  ProfilePhoto?: {
    src: string;
  };
}

interface FormData {
  additionalNote: string;
  name: "" | Doctor;
  type: string;
  reason: string;
}

interface FormError {
  name?: string;
  additionalNote?: string | undefined;
  type?: string | undefined;
  patientName?: string;
  reason?: string;
}
export function ReassignRequest({
  show,
  onClose,
  onSubmit,
  title = "Reassign Appointment",
  setShowSuccessModalBook,
}: RescheduleAppointmentRequestProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "",
    additionalNote: "",
    reason: "",
  });
  const [txtPatinetName, setTxtPatinetName] = useState<string>("");
  const [formError, setFormError] = useState<FormError>({});
  const [open, setOpen] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<Doctor[]>([]);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const [step, setStep] = useState(0);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Mock patient data (replace with API data if needed)
  const Doctors: Doctor[] = [
    { id: 1, name: "Dr. Milind Gaba", ProfilePhoto: doctor1 },
    { id: 2, name: "Dr. Sonia Advani", ProfilePhoto: doctor2 },
    { id: 3, name: "Dr. Meena Neema", ProfilePhoto: doctor3 },
    {
      id: 4,
      name: "Dr. Sushant Patil",
      ProfilePhoto: doctor4,
    },
    {
      id: 5,
      name: "Dr. Harpreet Bedi",
      ProfilePhoto: doctor5,
    },
  ];
  const handleFilter = (value: string) => {
    const results = Doctors.filter((p) =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(results);
  };
  const selectItem = (item: Doctor) => {
    setFormData({ ...formData, name: item });
    setTxtPatinetName(item.name);
    setOpen(false);
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // const validateForm1 = () => {};

  const validateForm = (step: number): boolean => {
    const errors: FormError = {};

    if (step === 0) {
      if (!formData.type.trim()) {
        errors.type = "Please select a reason for reassigning.";
      }
    } else if (step === 1) {
      if (!formData.name || typeof formData.name !== "object") {
        errors.patientName = "Please select a doctor.";
      }
      if (
        formData.additionalNote.trim().length > 0 &&
        formData.additionalNote.trim().length < 5
      ) {
        errors.additionalNote =
          "Additional note must be at least 5 characters long.";
      }
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm(0)) {
      setFormError({});
      setStep(1);
    }
    // setStep(1);
  };
  const handleData = () => {
    if (validateForm(1)) {
      setShowSuccessModalBook(true);
      setFormData({ name: "", type: "", additionalNote: "", reason: "" });
      setTxtPatinetName("");
      setStep(0);
      onClose();
      setFormError({});
    }
  };
  return (
    <Modal show={show} onHide={onClose} header={title} closeButton>
      <Form onSubmit={handleSubmit}>
        <div>
          <h6 className="fw-semibold" style={{ color: "#2B4360" }}>
            Basic Details
          </h6>
          <Row className="mb-4">
            <Col md={6}>
              <div className="reassign_cards">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Image src={doctor} alt="doctor" width={43} height={43} />
                    <span className="reassign_text">Dr. Ashok Kumar</span>
                  </div>
                  <Button
                    className="maiacare-button-large   profile-card-boeder  bg-transparent btn btn-primary"
                    variant="dark"
                  >
                    <Image src={Arrowup} alt="Arrow" width={14} height={14} />
                  </Button>
                </div>
                <div className="reassign_card_text">
                  <div className="mt-2">
                    Phone no :<span className="ms-1">+91 9092038491</span>
                  </div>
                  <div className="mt-1">
                    Email :<span className="ms-1">ashok.kumar@gmail.com</span>
                  </div>
                  <div className="mt-1">
                    Specialisation :
                    <span className="ms-1">Fertility Specialist</span>
                  </div>
                  <div className="mt-1">
                    No. of Patients :<span className="ms-1">18</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="reassign_cards">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Image src={patient} alt="doctor" width={43} height={43} />
                    <span className="reassign_text">Rani Desai</span>
                  </div>
                  <Button
                    className="maiacare-button-large   profile-card-boeder  bg-transparent btn btn-primary"
                    variant="dark"
                  >
                    <Image src={Arrowup} alt="Arrow" width={14} height={14} />
                  </Button>
                </div>
                <div className="reassign_card_text">
                  <div className="mt-2">
                    Phone no :<span className="ms-1">+91 9092038491</span>
                  </div>
                  <div className="mt-1">
                    Email :
                    <span className="ms-1">ranidesai@protonmail.com</span>
                  </div>
                  <div className="mt-1">
                    Specialisation :
                    <span className="ms-1">Fertility Support</span>
                  </div>
                  <div className="mt-1">
                    Stage :
                    <span className="reassign_stage ms-1">
                      Fertility assessment
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {step === 0 ? (
            <>
              {/* select reason */}
              <div>
                <InputSelect
                  label="Reason of Reassgning Appointment"
                  name="type"
                  value={formData.type}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    handleChange(e);
                  }}
                  required={true}
                  error={formError.type}
                  placeholder="Select Reason"
                  options={[
                    {
                      id: "1",
                      value: "Patient Condition",
                      label: "Patient Condition",
                    },
                    {
                      id: "2",
                      value: "Leave of absence",
                      label: "Leave of absence",
                    },
                    {
                      id: "3",
                      value: "Doctor patient load",
                      label: "Doctor patient load",
                    },
                    {
                      id: "4",
                      value: "Patient Request",
                      label: "Patient Request",
                    },
                  ]}
                />
                {/* checkbox */}
                <div className="mt-2">
                  <Form.Check
                    type="checkbox"
                    label="Please select if the reassigning is going to be temporary?"
                    className="text-nowrap check-box input"
                    style={{ fontSize: "13px" }}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* select doctor */}
              <div>
                {formData.name && typeof formData.name === "object" ? (
                  <div className="show-patient-box d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <Image
                        className="show-patient-img"
                        src={
                          formData.name?.ProfilePhoto?.src || temppatientImg1
                        }
                        alt="patient"
                        width={48}
                        height={48}
                      />
                      <span className="patient-treatment-box-subtitle-desc">
                        {formData.name.name}
                      </span>
                    </div>
                    {formError.name && (
                      <Form.Text className="text-danger">
                        {formError.name}
                      </Form.Text>
                    )}
                    <div
                      className="cursor-pointer-custom"
                      onClick={() => {
                        setFormData({ ...formData, name: "" });
                        setTxtPatinetName("");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="29"
                        height="28"
                        viewBox="0 0 29 28"
                        fill="none"
                      >
                        <path
                          d="M23.3035 20.9465C23.5501 21.193 23.6886 21.5275 23.6886 21.8762C23.6886 22.2249 23.5501 22.5593 23.3035 22.8059C23.057 23.0524 22.7226 23.1909 22.3739 23.1909C22.0252 23.1909 21.6907 23.0524 21.4442 22.8059L14.5 15.8594L7.55355 22.8037C7.30698 23.0502 6.97256 23.1888 6.62386 23.1888C6.27516 23.1888 5.94074 23.0502 5.69417 22.8037C5.4476 22.5571 5.30908 22.2227 5.30908 21.874C5.30908 21.5253 5.4476 21.1909 5.69417 20.9443L12.6406 14.0001L5.69636 7.05366C5.44979 6.80709 5.31127 6.47268 5.31127 6.12398C5.31127 5.77528 5.44979 5.44086 5.69636 5.19429C5.94293 4.94772 6.27735 4.8092 6.62605 4.8092C6.97475 4.8092 7.30917 4.94772 7.55573 5.19429L14.5 12.1407L21.4464 5.19319C21.6929 4.94663 22.0273 4.80811 22.376 4.80811C22.7247 4.80811 23.0592 4.94663 23.3057 5.19319C23.5523 5.43976 23.6908 5.77418 23.6908 6.12288C23.6908 6.47158 23.5523 6.806 23.3057 7.05257L16.3593 14.0001L23.3035 20.9465Z"
                          fill="#B0B4C1"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div
                    className="maiacare-input-field-container"
                    ref={dropdownRef}
                  >
                    <InputFieldLabel label="Select Doctor" required={true} />
                    <Form.Control
                      type="text"
                      name="patientName"
                      className="maiacare-input-field w-100"
                      placeholder="Select"
                      value={txtPatinetName}
                      onChange={(e) => {
                        const value = e.target.value;
                        setTxtPatinetName(value);
                        setOpen(true);
                        handleFilter(value);
                        setFormError((prev) => ({ ...prev, patientName: "" }));
                      }}
                      onFocus={() => {
                        if (txtPatinetName.trim().length > 0) setOpen(true);
                      }}
                      onBlur={() => setTimeout(() => setOpen(false), 150)}
                    />
                    <InputFieldError error={formError.patientName} />

                    <Dropdown className="custome-patient-dropdown" show={open}>
                      <Dropdown.Menu className="w-100 mt-1 shadow">
                        {filtered.length > 0 ? (
                          filtered.map((item, index) => (
                            <Dropdown.Item
                              key={item.id}
                              onClick={() => selectItem(item)}
                              className={`d-flex align-items-center gap-2 ${
                                index === highlightIndex ? "active" : ""
                              }`}
                            >
                              {item.ProfilePhoto?.src && (
                                <Image
                                  className="show-patient-img"
                                  src={item.ProfilePhoto.src}
                                  alt={item.name}
                                  width={48}
                                  height={48}
                                />
                              )}
                              <span className="settings-accordion-subtitle">
                                {item.name}
                              </span>
                            </Dropdown.Item>
                          ))
                        ) : (
                          <Dropdown.Item
                            disabled
                            className="text-center settings-accordion-subtitle"
                          >
                            No records found
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                )}
                <div className="mt-2">
                  <Form.Check
                    type="checkbox"
                    label="Notify admin via email"
                    className="text-nowrap check-box input"
                    style={{ fontSize: "13px" }}
                  />
                </div>
                <div>
                  <Textarea
                    label="Additional Note"
                    name="additionalNote"
                    value={formData.additionalNote ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      handleChange(e);
                    }}
                    onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {}}
                    required={false}
                    error={formError.additionalNote}
                    placeholder="Enter any additional details"
                    maxLength={100}
                  />
                  {formError.additionalNote && (
                    <Form.Text className="text-danger">
                      {formError.additionalNote}
                    </Form.Text>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        {/* button */}
        <div className="d-flex justify-content-center gap-3 mt-3">
          <Button
            variant="dark"
            className="px-4 maiacare-button edit-profile-btn w-50"
            onClick={onClose}
          >
            Cancel
          </Button>
          {step === 0 ? (
            <Button
              variant="dark"
              className="px-4 maiacare-button common-btn-blue w-50"
              type="submit"
            >
              Save and Next
            </Button>
          ) : (
            <>
              <Button
                variant="dark"
                className="px-4 maiacare-button common-btn-blue w-50"
                type="submit"
                onClick={handleData}
              >
                Save
              </Button>
            </>
          )}
        </div>
      </Form>
    </Modal>
  );
}

export function SuccessModalReassignAppointment({
  showSuccessModalBook,
  setShowSuccessModalBook,
}: {
  showSuccessModalBook: boolean;
  setShowSuccessModalBook: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Modal
      show={showSuccessModalBook}
      onHide={() => setShowSuccessModalBook(false)}
      closeButton
      // className="custom-modal-width"
    >
      <div className="text-center">
        <Image
          src={SuccessImageRescheduleAppointment}
          alt="successImg"
          width={290}
          height={250}
        />
        <h3 className="modal-custom-header mt-2">Reassign Request Sent</h3>
        <p className="modal-custom-content">
          The Admin will be informed about your request and will react out to to
          you for confirmation
        </p>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <Button
          variant="default"
          className="w-100"
          onClick={() => setShowSuccessModalBook(false)}
        >
          Done
        </Button>
      </div>
    </Modal>
  );
}
