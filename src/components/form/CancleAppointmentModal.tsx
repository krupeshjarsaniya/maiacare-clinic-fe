import React, { ChangeEvent, useState } from "react";
import { InputSelect } from "../ui/InputSelect";
import { CancelAppointmentForm, CancelAppointmentPayload } from "@/utlis/types/interfaces";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Image from "next/image";
import SuccessImage from "../../assets/images/ReschedulingRequest.png";
import { addCancelAppointment } from "@/utlis/apis/apiHelper";
interface CancleAppointmentModalProps {
  setCancleModal?: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
  showSuccessModal?: boolean;
  appointmentId: string  ;
  setShowSuccessModal?: React.Dispatch<React.SetStateAction<boolean>>;
}
type FormError = Partial<Record<keyof CancelAppointmentForm, string>>;
const initialFormData: CancelAppointmentForm = {
  additionalNote: "",
  reasonForCancel: "",
};
const initialFormError: FormError = {};
export function CancleAppointmentModal({
  setCancleModal,
  setShowSuccessModal,
  appointmentId,
}: CancleAppointmentModalProps) {
  const [formData, setFormData] =
    useState<CancelAppointmentForm>(initialFormData);
  const [formError, setFormError] = useState<FormError>(initialFormError);
 
  
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
  const validateForm = (formData: CancelAppointmentForm): FormError => {
    const errors: FormError = {};
    if (!formData.reasonForCancel) {
      errors.reasonForCancel = "Reason for visit is required";
    }
    return errors;
  };
 
  const handleCancle = async () => {
  const errors = validateForm(formData);
  setFormError(errors);

  if (Object.keys(errors).length > 0) return;

  const payload: CancelAppointmentPayload = {
    appointmentId,
    reason: formData.reasonForCancel,
    additionalNote: formData.additionalNote || undefined,
  };

  try {
    await addCancelAppointment(payload);

    // SUCCESS
    setCancleModal?.(false);
    setShowSuccessModal?.(true);
  } catch (error) {
    console.error("Cancel appointment failed:", error);
    // optionally show toast / error message here
  }
};
  return (
    <div>
      <div className="fw-semibold fs-6">
        Are you sure you want to cancel the appointment?
      </div>
      <div className="mt-3">
        <InputSelect
          label="Reason of Rescheduling Appointment"
          className="input-select"
          name="reasonForCancel"
          value={formData.reasonForCancel}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            handleChange(e);
          }}
          required={true}
          error={formError.reasonForCancel}
          placeholder="Select reason for visit"
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
      </div>
      <div className="my-3">
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
          placeholder="Enter your addition details"
          maxLength={100}
        />
      </div>
      <div>
        <Button className="w-100" onClick={handleCancle}>
          Request Cancle Appointment
        </Button>
      </div>
    </div>
  );
}
export function SuccessModalCancle({
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
        <h3 className="modal-custom-header mt-2">Cancellation Request Sent!</h3>
        <p className="modal-custom-content">
          Maiacare will contact you shortly to confirm your request
        </p>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <Button
          variant="outline"
          className="w-50"
          onClick={() => setShowSuccessModal(false)}
        >
          Okay
        </Button>
        <Button className="w-50">Book New Appointment</Button>
      </div>
    </Modal>
  );
}
