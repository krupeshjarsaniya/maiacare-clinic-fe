"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { InputSelect } from "../ui/InputSelect";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import AppointmentProfile from "../ui/custom/AppointmentProfile";
import { tempAppointmentProfileData } from "./../../utlis/StaticData";
import Modal from "../ui/Modal";
import Image from "next/image";
import SuccessImageCancel from "../../assets/images/rescheduleAppointment.png";
import { CancelAppointmentForm } from "../../utlis/types/interfaces";

type FormError = Partial<Record<keyof CancelAppointmentForm, string>>;

// Initial state
const initialFormData: CancelAppointmentForm = {
  reasonForCancel: "",
  additionalNote: "",
};

const initialFormError: FormError = {};

export function CancelAppointment({
  setCancelModal,
  setShowSuccessModalCancel,
}: {
  setCancelModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSuccessModalCancel: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [formData, setFormData] =
    useState<CancelAppointmentForm>(initialFormData);
  const [formError, setFormError] = useState<FormError>(initialFormError);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (formData: CancelAppointmentForm) => {
    const errors: FormError = {};
    if (!formData.reasonForCancel) {
      errors.reasonForCancel = "Reason for cancelling appointment is required";
    }
    return errors;
  };

  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormError(errors);
    if (Object.keys(errors).length === 0) {
      console.log("form submit sucess", formData);

      setCancelModal(false);
      setShowSuccessModalCancel(true);
    }
  };

  return (
    <>
      <form onSubmit={handelSubmit}>
        <div className="d-flex flex-column gap-3">
          <h6 className="dashboard-chart-heading">
            Are you sure you want to cancel the appointment?
          </h6>
          <AppointmentProfile tempProfileData={tempAppointmentProfileData} />

          <InputSelect
            label="Reason for Cancelling Appointment "
            name="reasonForCancel"
            value={formData.reasonForCancel}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handleChange(e);
            }}
            onBlur={() => {}}
            required={true}
            disabled={false}
            error={formError.reasonForCancel}
            placeholder="Select reason for visit"
            options={[
              { id: "1", value: "reason-1", label: "reason-1" },
              { id: "2", value: "reason-2", label: "reason-2" },
              { id: "3", value: "reason-3", label: "reason-3" },
              { id: "4", value: "other", label: "other" },
            ]}
          />
          <Textarea
            label="Additional Note"
            name="additionalNote"
            value={formData.additionalNote}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              handleChange(e);
            }}
            onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {}}
            required={false}
            disabled={false}
            error={formError.additionalNote}
            maxLength={100}
          />

          <Button
            variant="default"
            disabled={false}
            type="submit"
            className="w-100"
          >
            Request Cancel Appointment
          </Button>
        </div>
      </form>

      {/* <Modal
                show={showSuccessModal}
                onHide={() => setShowSuccessModal(false)}
                closeButton={true}
            >
                <div className="text-center">
                    <Image src={SuccessImageCancel} alt="dummyPatientImg" width={200} height={200} />

                    <h3 className="modal-custom-header mt-2">Cancellation Request Sent!</h3>
                    <p className="modal-custom-content">Maiacare will contact you shortly to confirm your request</p>
                </div>

                <div className="d-flex justify-content-center gap-3">
                    <Button variant="outline" disabled={false} className="w-100" >
                        Okay
                    </Button>
                    <Button variant="default" disabled={false} className="w-100" >
                        Book New Appointment
                    </Button>

                </div>
            </Modal> */}
    </>
  );
}

export function SuccessModalCancel({
  showSuccessModalCancel,
  setShowSuccessModalCancel,
}: {
  showSuccessModalCancel: boolean;
  setShowSuccessModalCancel: (show: boolean) => void;
}) {
  return (
    <Modal
      show={showSuccessModalCancel}
      onHide={() => setShowSuccessModalCancel(false)}
      closeButton={true}
    >
      <div className="text-center">
        <Image
          src={SuccessImageCancel}
          alt="dummyPatientImg"
          width={200}
          height={200}
        />

        <h3 className="modal-custom-header mt-2">Cancellation Request Sent!</h3>
        <p className="modal-custom-content">
          Maiacare will contact you shortly to confirm your request
        </p>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <Button variant="outline" disabled={false} className="w-100">
          Okay
        </Button>
        <Button variant="default" disabled={false} className="w-100">
          Book New Appointment
        </Button>
      </div>
    </Modal>
  );
}

// export function SuccessModal
