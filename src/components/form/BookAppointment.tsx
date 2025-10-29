"use client";

import {
  Col,
  Dropdown,
  Form,
  ProgressBar,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import {
  InputFieldError,
  InputFieldGroup,
  InputFieldLabel,
} from "../ui/InputField";
import {
  InputSelect,
  InputSelectMultiSelect,
} from "../../components/ui/InputSelect";
import { DatePickerFieldGroup } from "../ui/CustomDatePicker";
import { TimePickerFieldGroup } from "../ui/CustomTimePicker";
import Textarea from "../ui/Textarea";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../ui/Button";
import { BookAppointmentForm } from "../../utlis/types/interfaces";
import { PhoneNumberInput } from "../ui/PhoneNumberInput";
import { RadioButtonGroup } from "../ui/RadioField";
import Image from "next/image";
import Modal from "../ui/Modal";
import SuccessImageBookAppointment from "../../assets/images/appointmentrequest.png";
// import { PatientAutocomplete, PatientShow, SelecteAgeBox } from "../TempPatientAutocomplete";
import { PatientsDetails } from "../../utlis/StaticData";
import temppatientImg1 from "@/assets/images/patient1.png";

interface BookAppointmentProps {
  setBookAppointmentModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSuccessModalBook: React.Dispatch<React.SetStateAction<boolean>>;
  editData?: any;
  onSave?: (updatedData: any) => void;
}

type FormError = Partial<Record<keyof BookAppointmentForm, string>>;

const initialFormData: BookAppointmentForm = {
  appointmentId: "",
  type: "",
  reasonForVisit: [],
  appointmentDate: "",
  appointmentTime: "",
  forTime: "",
  additionalNote: "",
  patientName: [],
  phone: "",
  email: "",
  patientAge: "25-35",
  gender: "male",
  map: function (arg0: (item: any) => number): unknown {
    throw new Error("Function not implemented.");
  },
  length: 0,
};

export function BookAppointment({
  setBookAppointmentModal,
  setShowSuccessModalBook,
  editData,
  onSave,
}: BookAppointmentProps) {
  // ✅ initialize form data with editData if provided
  const [formData, setFormData] = useState<BookAppointmentForm>(
    editData ? { ...initialFormData, ...editData } : initialFormData
  );

  const [formError, setFormError] = useState<FormError>({});
  const [step, setStep] = useState<number>(1);
  const [stepper, setStepper] = useState(1);
  const totalSteps = 2;

  const [txtPatinetName, setTxtPatinetName] = useState("");
  const [open, setOpen] = useState(false);

  const patientData = PatientsDetails;

  // ✅ Refill form when new editData is passed
  useEffect(() => {
    if (editData) {
      setFormData({ ...initialFormData, ...editData });
    }
  }, [editData]);

  const filtered = (() => {
    if (txtPatinetName.trim().length === 0) return [];
    const matches = patientData.filter((item) =>
      item.name.toLowerCase().includes(txtPatinetName.toLowerCase())
    );
    return matches.length > 0 ? matches : patientData;
  })();

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (data: BookAppointmentForm): FormError => {
    const errors: FormError = {};
    if (!data.type.trim()) errors.type = "Type is required";
    if (!data.reasonForVisit.length)
      errors.reasonForVisit = "Reason for visit is required";
    if (!data.appointmentDate.trim())
      errors.appointmentDate = "Appointment Date is required";
    if (!data.appointmentTime.trim())
      errors.appointmentTime = "Appointment Time is required";
    return errors;
  };

  const validateForm2 = (data: BookAppointmentForm): FormError => {
    const errors: FormError = {};
    if (Object.keys(formData?.patientName).length == 0)
      errors.patientName = "Patient is required";
    if (!data.phone.trim()) errors.phone = "Phone is required";
    if (!data.email.trim()) errors.email = "Email is required";
    if (!data.patientAge.trim()) errors.patientAge = "Patient Age is required";
    return errors;
  };

  const handelNext = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormError(errors);
    if (Object.keys(errors).length === 0) {
      setStep(2);
      setStepper((prev) => Math.max(1, prev + 1));
    }
  };

  // ✅ handleSubmit updated to support edit mode
  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm2(formData);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      if (editData && onSave) {
        onSave(formData); // send updated data back to parent
      } else {
        setShowSuccessModalBook?.(true); // normal booking flow
      }
      setBookAppointmentModal?.(false);
    }
  };

  return (
    <>
      {/* Progress */}
      <div className="d-flex align-items-center mb-4">
        <div className="flex-grow-1 d-flex">
          {[...Array(totalSteps)].map((_, index) => (
            <div key={index} className="flex-fill mx-1">
              <ProgressBar
                now={100}
                className={
                  index < stepper
                    ? "progress-bar progressbar-step-success"
                    : "progress-bar progressbar-step-secondary"
                }
              />
            </div>
          ))}
        </div>
        <span className="ms-2 progressbar-step">
          {step} of {totalSteps}
        </span>
      </div>

      {step === 1 && (
        <form onSubmit={handelNext}>
          <Row className="g-3">
            <h6 className="doctor-profile-heading m-0">Appointment Details</h6>
            <Col md={12}>
              <InputFieldGroup
                label="Appointment ID"
                name="appointmentId"
                type="text"
                value={formData.appointmentId || "#1234"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Enter Appointment ID"
                required={true}
                disabled={true}
                readOnly={false}
                error={formError.appointmentId}
              ></InputFieldGroup>
            </Col>
            <Col md={12}>
              <InputSelect
                label="Type"
                name="type"
                value={formData.type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleChange(e);
                }}
                required={true}
                error={formError.type}
                placeholder="Select Appointment Type"
                options={[
                  { id: "1", value: "Follow - Up", label: "Follow - Up" },
                  { id: "2", value: "other", label: "other" },
                ]}
              />
            </Col>
            <Col md={12}>
              <InputSelectMultiSelect
                label="Reason for visit"
                name="reasonForVisit"
                values={formData.reasonForVisit}
                onChange={(values) => {
                  setFormData((prev: any) => ({
                    ...prev,
                    reasonForVisit: values,
                  }));
                  setFormError((prev) => ({ ...prev, reasonForVisit: "" }));
                }}
                options={[
                  {
                    id: "1",
                    value: "Fertility Support",
                    label: "Fertility Support",
                  },
                  { id: "2", value: "IUI", label: "IUI" },
                  { id: "3", value: "IVF", label: "IVF" },
                  { id: "4", value: "ICSI", label: "ICSI" },
                  { id: "5", value: "Other", label: "Other" },
                ]}
                placeholder="Select Lifestyle"
                addPlaceholder="Add Lifestyle"
                required={true}
                dropdownHandle={false} // open close arrow icon show hide
                error={formError.reasonForVisit}
              />
            </Col>
            <Col md={4}>
              <DatePickerFieldGroup
                label="Appointment Date"
                name="appointmentDate"
                placeholder="Select Date"
                value={formData.appointmentDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
                required={true}
                error={formError.appointmentDate}
                iconColor="var(--color-radio)"
                min={new Date().toISOString().split("T")[0]}
              />
            </Col>
            <Col md={4}>
              <TimePickerFieldGroup
                label="Appointment Time"
                name="appointmentTime"
                placeholder="Select Time"
                value={formData.appointmentTime}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
                required={true}
                error={formError.appointmentTime}
              />
            </Col>
            <Col md={4}>
              <InputSelect
                label="For"
                name="forTime"
                value={formData.forTime}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleChange(e);
                }}
                required={false}
                placeholder="Select duration"
                options={[
                  { id: "1", value: "30minutes", label: "30minutes" },
                  { id: "2", value: "1hour", label: "1hour" },
                  { id: "3", value: "2hours", label: "2hours" },
                ]}
              />
            </Col>
            <Col md={12}>
              <Textarea
                label="Additional Note"
                name="additionalNote"
                value={formData.additionalNote}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {}}
                required={false}
                error={formError.additionalNote}
                placeholder="Enter any additional details"
                maxLength={100}
              />
            </Col>

            <Col md={12}>
              <div className="d-flex justify-content-end">
                <Button variant="default" type="submit" className="w-50">
                  Next
                </Button>
              </div>
            </Col>
          </Row>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handelSubmit}>
          <Row className="g-3">
            <h6 className="doctor-profile-heading m-0">Patient’s Details</h6>
            {/* <Col md={12}>
                            <PatientAutocomplete
                                data={PatientsDetails}
                                placeholder="Type patient name..."
                                onChange={(selected) => {
                                    console.log("Selected:", selected);
                                }}
                            />

                        </Col> */}

            {/* {Object.keys(formData?.patientName).length > 0 */}
            <Col md={12}>
              {Object.keys(formData?.patientName).length > 0 ? (
                <div className="show-patient-box d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <Image
                      className="show-patient-img"
                      src={
                        formData.patientName?.ProfilePhoto?.src ||
                        temppatientImg1
                      }
                      alt="doctor"
                      width={48}
                      height={48}
                    />
                    <span className="patient-treatment-box-subtitle-desc">
                      {formData.patientName?.name}
                    </span>
                  </div>
                  <div
                    onClick={() => {
                      setFormData({ ...formData, patientName: {} });
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
                <div className={`maiacare-input-field-container`}>
                  <InputFieldLabel label="Name" required={true} />
                  <Form.Control
                    type="text"
                    name="patientName"
                    className="maiacare-input-field w-100"
                    placeholder="Type patient name"
                    value={txtPatinetName}
                    onChange={(e) => {
                      setTxtPatinetName(e.target.value);
                      setOpen(true);
                      // onChange?.(null);
                      setFormError((prev) => ({ ...prev, patientName: "" }));
                    }}
                    onFocus={() => {
                      if (txtPatinetName.trim().length > 0) setOpen(true);
                    }}
                    onBlur={() => setTimeout(() => setOpen(false), 150)}
                  />
                  <InputFieldError error={formError.patientName} />

                  <Dropdown
                    className="custome-patient-dropdown"
                    show={open && filtered.length > 0}
                  >
                    <Dropdown.Menu className="w-100 mt-1 shadow">
                      {filtered.map((item) => (
                        <Dropdown.Item
                          key={item.id}
                          onClick={() => {
                            setOpen(false);

                            // update formData using handleChange
                            handleChange({
                              target: { name: "patientName", value: item },
                            } as React.ChangeEvent<HTMLInputElement | any>);
                          }}
                          className="d-flex align-items-center gap-2"
                        >
                          {item.ProfilePhoto && (
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
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </Col>
            <Col md={6}>
              <PhoneNumberInput
                label="Phone"
                value={formData.phone}
                onChange={(phone: any) => {
                  // setFormData((prev) => ({ ...prev, phone }));
                  setFormError((prev) => ({ ...prev, phone: "" }));
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
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                placeholder="Enter Email"
                required={true}
                disabled={false}
                readOnly={false}
                error={formError.email}
              ></InputFieldGroup>
            </Col>
            <Col md={12}>
              <div className={`maiacare-input-field-container`}>
                <InputFieldLabel label="Age" required={false} />

                <ToggleButtonGroup
                  type="radio"
                  name="patientAge"
                  value={formData.patientAge}
                  onChange={(value: string) => {
                    handleChange({
                      target: { name: "patientAge", value },
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                  className="d-flex gap-2 flex-wrap age-select-field"
                >
                  <ToggleButton
                    id="age-1"
                    value="below18"
                    variant="link"
                    className="age-select-item"
                  >
                    Below 18
                  </ToggleButton>
                  <ToggleButton
                    id="age-2"
                    value="18-24"
                    variant="link"
                    className="age-select-item"
                  >
                    18 – 24
                  </ToggleButton>
                  <ToggleButton
                    id="age-3"
                    value="25-35"
                    variant="link"
                    className="age-select-item"
                  >
                    25 – 35
                  </ToggleButton>
                  <ToggleButton
                    id="age-4"
                    value="36-40"
                    variant="link"
                    className="age-select-item"
                  >
                    36 – 40
                  </ToggleButton>
                  <ToggleButton
                    id="age-5"
                    value="41-50"
                    variant="link"
                    className="age-select-item"
                  >
                    41 – 50
                  </ToggleButton>
                  <ToggleButton
                    id="age-6"
                    value="50+"
                    variant="link"
                    className="age-select-item"
                  >
                    50+
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </Col>

            <Col md={12}>
              <RadioButtonGroup
                label="Gender"
                name="gender"
                value={formData.gender || ""}
                onChange={(e) => handleChange(e)}
                required
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "Other" },
                ]}
              />
            </Col>
            <div className="d-flex gap-3 mt-3">
              <Button
                variant="outline"
                className="w-100"
                type="button"
                onClick={() => {
                  setStep(step - 1);
                  setStepper((prev) => Math.max(1, prev - 1));
                }}
              >
                Previous
              </Button>
              <Button variant="default" type="submit" className="w-100">
                {editData ? "Update" : "Submit"}
              </Button>
            </div>
          </Row>
        </form>
      )}
    </>
  );
}

export function SuccessModalBookAppointment({
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
      closeButton={true}
    >
      <div className="text-center">
        <Image
          src={SuccessImageBookAppointment}
          alt="successImg"
          width={200}
          height={240}
        />
        <h3 className="modal-custom-header mt-2">
          Appointment Request Submitted!
        </h3>
        <p className="modal-custom-content">
          Maicare will contact you shortly to confirm your request
        </p>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <Button
          variant="outline"
          className="w-100"
          onClick={() => setShowSuccessModalBook(false)}
        >
          Okay
        </Button>
        <Button
          variant="default"
          className="w-100"
          onClick={() => setShowSuccessModalBook(false)}
        >
          View Details
        </Button>
      </div>
    </Modal>
  );
}
