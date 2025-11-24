import React, { useState } from "react";
import ContentContainer from "../ui/ContentContainer";
import Image from "next/image";
import payment from "../../assets/images/payment.png";
import Button from "../ui/Button";
import { InputFieldGroup } from "../ui/InputField";
import { Col, InputGroup, Row } from "react-bootstrap";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { InputSelect } from "../ui/InputSelect";

export default function PaymentPatientProfileDetails() {
  const [step, setStep] = useState(0);

  const [formError, setFormError] = useState({
    amount: "",
    status: "",
    mode: "",
  });
  // Saved payment data
  const [paymentData, setPaymentData] = useState({
    amount: "",
    status: "",
    mode: "",
  });
  const validateForm = () => {
    const errors: any = {};

    if (!paymentData.amount) errors.amount = "Amount is required";
    if (!paymentData.status) errors.status = "Status is required";
    if (!paymentData.mode) errors.mode = "Mode is required";

    setFormError(errors);

    return Object.keys(errors).length === 0; // returns true when no errors
  };
  const handleBill = () => {
    setStep(1);
  };

  const handleSave = () => {
    if (!validateForm()) return;

    setStep(2); // paymentData already contains values
  };
  const handleCancle = () => {
    setStep(0);
  };

  return (
    <ContentContainer>
      <div className="contact-details-heading m-0">Payment Details</div>

      {/* STEP 0 – No bill */}
      {step === 0 && (
        <div className="d-flex flex-column justify-content-center align-items-center my-4">
          <Image src={payment} alt="Payment" width={80} height={80} />
          <span className="doctor-profile-subheading fst-italic mt-2">
            No bills generated
          </span>
          <Button
            className="maiacare-button maiacare-button-medium outline-layout mt-4"
            onClick={handleBill}
          >
            Generate Bill
          </Button>
        </div>
      )}

      {/* STEP 1 – Bill form */}
      {step === 1 && (
        <div className="amount-class">
          <InputFieldGroup
            label="Amount"
            name="amount"
            type="text"
            value={paymentData.amount}
            onChange={(e) => {
              setPaymentData({ ...paymentData, amount: e.target.value });
              if (formError.amount) setFormError({ ...formError, amount: "" });
            }}
            error={formError.amount}
            placeholder="Amount"
            className="amount position-relative"
          >
            <InputGroup.Text className="custom-Rupee-icon">
              <LiaRupeeSignSolid className="Rupee-icon" />
            </InputGroup.Text>
          </InputFieldGroup>

          <Row className="mt-3">
            <Col md={6}>
              <InputSelect
                label="Status"
                name="status"
                value={paymentData.status}
                onChange={(e) => {
                  setPaymentData({ ...paymentData, status: e.target.value });
                  if (formError.status)
                    setFormError({ ...formError, status: "" });
                }}
                required
                error={formError.status}
                placeholder="Select Status"
                options={[
                  { id: "1", value: "Paid", label: "Paid" },
                  { id: "2", value: "Unpaid", label: "Unpaid" },
                ]}
              />
            </Col>

            <Col md={6}>
              <InputSelect
                label="Mode"
                name="mode"
                value={paymentData.mode}
                onChange={(e) => {
                  setPaymentData({ ...paymentData, mode: e.target.value });
                  if (formError.mode) setFormError({ ...formError, mode: "" });
                }}
                required
                error={formError.mode}
                placeholder="Select Mode"
                options={[
                  { id: "1", value: "Cash", label: "Cash" },
                  { id: "2", value: "Online", label: "Online" },
                ]}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Button className="w-100 outline-layout" onClick={handleCancle}>
                Cancel
              </Button>
            </Col>
            <Col md={6}>
              <Button className="w-100" onClick={handleSave}>
                Save
              </Button>
            </Col>
          </Row>
        </div>
      )}

      {/* STEP 2 – Show saved payment details */}
      {step === 2 && (
        <div className="payment-card mt-4">
          <div className="mt-3">
            <div className="appointment-reschedule-profile-detail fw-semibold">
              Amount
            </div>
            <div className="fw-bold fs-5">₹{paymentData.amount}</div>
          </div>

          <Row className=" mt-3">
            <Col md={6}>
              <div className="appointment-reschedule-profile-detail fw-semibold">
                Status
              </div>
              <span
                className={`status-pill  ${
                  paymentData.status === "Paid"
                    ? "status-completed"
                    : "status-completed"
                }`}
              >
                {paymentData.status}
              </span>
            </Col>
            <Col md={6}>
              <div className="appointment-reschedule-profile-detail fw-semibold">
                Mode
              </div>
              <div className="fw-semibold modal-custom-content">
                {paymentData.mode}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </ContentContainer>
  );
}
