"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { InputSelect, InputSelectMultiSelect } from "../ui/InputSelect";
import Button from "../ui/Button";
import { Col, ProgressBar, Row } from "react-bootstrap";
import { DatePickerFieldGroup } from "../ui/CustomDatePicker";
import { TimePickerFieldGroup } from "../ui/CustomTimePicker";
import { OptionType } from "../../components/ui/InputSelect"; // adjust path if needed
import AppointmentProfile from "../ui/custom/AppointmentProfile";
import { tempAppointmentProfileData } from "../../utlis/StaticData";
import Modal from "../ui/Modal";
import Image from "next/image";
import SuccessImage from "@/assets/images/rescheduleAppointment.png";
import Textarea from "../ui/Textarea";
import { addRescheduleAppointment } from "@/utlis/apis/apiHelper";

interface RescheduleAppointmentProps {
  setRescheduleModal?: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
  showSuccessModal?: boolean;
  setShowSuccessModal?: React.Dispatch<React.SetStateAction<boolean>>;
  appointmentId?: string;
}

type FormError = Partial<Record<keyof RescheduleAppointmentForm, string>>;

const initialFormError: FormError = {};
interface RescheduleAppointmentForm {
  id: string;
  reason: string;
  type: string;
  reasonForVisit: OptionType[];
  appointmentDate: string;
  appointmentTime: string;
  forTime: string;
  additionalNote: string;
}
const initialFormData: RescheduleAppointmentForm = {
  id: "",
  reason: "",
  type: "",
  reasonForVisit: [],
  appointmentDate: "",
  appointmentTime: "",
  forTime: "",
  additionalNote: "",
};

export function RescheduleAppointment({
  setRescheduleModal,
  setShowSuccessModal,
  appointmentId,
}: RescheduleAppointmentProps) {
  const [formData, setFormData] =
    useState<RescheduleAppointmentForm>(initialFormData);
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [step, setStep] = useState<number>(1);
  const [stepper, setStepper] = useState(1);
  const totalSteps = 2;

  
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

  const validateForm = (data: RescheduleAppointmentForm): FormError => {
    const errors: FormError = {};
    if (!data.reason.trim()) errors.reason = "Reason is required";
    return errors;
  };

  const validateForm2 = (data: RescheduleAppointmentForm): FormError => {
    const errors: FormError = {};
    if (!data.type.trim()) errors.type = "Type is required";
    if (!data.reasonForVisit.length)
      errors.reasonForVisit = "Reason for visit is required";
    if (!data.appointmentDate.trim())
      errors.appointmentDate = "Appointment date is required";
    if (!data.appointmentTime.trim())
      errors.appointmentTime = "Appointment time is required";
    return errors;
  };

  const handelNext = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormError(errors);
    if (Object.keys(errors).length === 0) {
      setStep(2);
    }
  };

  // const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const errors = validateForm2(formData);
  //   setFormError(errors);
  //   if (Object.keys(errors).length === 0) {
  //     console.log("form submit success");

  //     // stepper
  //     setStepper((prev) => Math.max(1, prev + 1));

  //     // close main modal
  //     setRescheduleModal?.(false);

  //     // show success modal
  //     setShowSuccessModal?.(true);
  //   }
  // };
const handelSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const errors = validateForm2(formData);
  setFormError(errors);

  if (Object.keys(errors).length !== 0) return;

  try {
    const payload = {
      appointmentId: appointmentId, // coming from props
      newDate: formData.appointmentDate, // "2025-12-06"
      newTime: formData.appointmentTime, // "10:40 AM"
      reason: formData.reason, // Step 1 reason
    };

    await addRescheduleAppointment(payload);

    // stepper
    setStepper((prev) => Math.min(prev + 1, totalSteps));

    // close main modal
    setRescheduleModal?.(false);

    // show success modal
    setShowSuccessModal?.(true);
  } catch (error) {
    console.error("Reschedule failed:", error);
    // optional: show toast / error modal
  }
};

  const handelPrevious = () => {
    setStep(1);
    setStepper((prev) => Math.max(1, prev - 1));
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

      {/* Appointment Info */}
      <AppointmentProfile
        tempProfileData={{
          ...tempAppointmentProfileData,
          id: Number(tempAppointmentProfileData.id),
        }}
      />

      {/* Step 1 */}
      {step === 1 && (
        <form className="mt-3" onSubmit={handelNext}>
          <InputSelect
            label="Reason of Rescheduling Appointment"
            className="input-select"
            name="reason"
            value={formData.reason}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handleChange(e);
            }}
            required={true}
            error={formError.reason}
            placeholder="Select reason"
            options={[
              {
                id: "1",
                value: "Doctor Unavailability",
                label: "Doctor Unavailability",
              },
              { id: "2", value: "Patient Request", label: "Patient Request" },
              { id: "3", value: "Clinic Emergency", label: "Clinic Emergency" },
              {
                id: "4",
                value: "Scheduling Conflicts",
                label: "Scheduling Conflicts",
              },
              { id: "5", value: "Cycle changes", label: "Cycle changes" },
              { id: "6", value: "Other", label: "Other" },
            ]}
          />

          <div className="d-flex gap-3 mt-4">
            <Button variant="outline" className="w-100" type="button">
              Previous
            </Button>
            <Button variant="default" type="submit" className="w-100">
              Next
            </Button>
          </div>
        </form>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <>
          <form className="mt-3" onSubmit={handelSubmit}>
            <Row className="g-3">
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
                  placeholder="Select type"
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
                    setFormData((prev: RescheduleAppointmentForm) => ({
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
                    { id: "4", value: "Egg Freezing", label: "Egg Freezing" },
                    { id: "5", value: "other", label: "other" },
                  ]}
                  placeholder="Select Services"
                  addPlaceholder="Add Services"
                  required={true}
                  dropdownHandle={false} // open close arrow icon show hide
                  selectedOptionColor="var(--border-box)"
                  selectedOptionBorderColor="var(--border-box)"
                  error={formError.reasonForVisit}
                />

                {/* <InputSelect
                                    label="Reason for visit"
                                    name="reasonForVisit"
                                    value={formData.reasonForVisit}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        handleChange(e);
                                    }}
                                    required={true}
                                    error={formError.reasonForVisit}
                                    placeholder="Select Services"
                                    options={[
                                        { id: "1", value: "Fertility Support", label: "Fertility Support" },
                                        { id: "2", value: "IUI", label: "IUI" },
                                        { id: "3", value: "IVF", label: "IVF" },
                                        { id: "4", value: "Egg Freezing", label: "Egg Freezing" },
                                        { id: "5", value: "other", label: "other" },
                                    ]}
                                /> */}
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
                  error={formError.forTime}
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
                  maxLength={100}
                />
              </Col>
            </Row>
            <div className="d-flex gap-3 mt-3">
              <Button
                variant="outline"
                className="w-100"
                type="button"
                onClick={handelPrevious}
              >
                Previous
              </Button>
              <Button variant="default" type="submit" className="w-100">
                Submit
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
}

export function SuccessModalReschedule({
  showSuccessModal,
  setShowSuccessModal,
}: {
  showSuccessModal: boolean;
  setShowSuccessModal: (show: boolean) => void;
}) {
  return (
    <Modal
      show={showSuccessModal}
      onHide={() => setShowSuccessModal(false)}
      closeButton={true}
    >
      <div className="text-center">
        <Image src={SuccessImage} alt="successImg" width={200} height={200} />
        <h3 className="modal-custom-header mt-2">
          Reschedule Request Submitted!
        </h3>
        <p className="modal-custom-content">
          Maicare will contact you shortly to confirm your request
        </p>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <Button
          variant="outline"
          className="w-100"
          onClick={() => setShowSuccessModal(false)}
        >
          Okay
        </Button>
      </div>
    </Modal>
  );
}
