"use client";
import React, { ChangeEvent, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import BookCalendar from "../../assets/images/BookCalendar.png";
import Image from "next/image";
import {
  leaveData as defaultLeaveData,
  leaveColumns as defaultLeaveColumns,
  LeaveEntry,
} from "../../utlis/StaticData";
import BaseTable from "@/components/ui/BaseTable";
import Trash from "../../assets/images/Trash.png";
import LightEditimg from "../../assets/images/LightEditimg.png";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import DoctorImg from "../../assets/images/Profile-doctor.png";
import Verified from "../../assets/images/verifiedreview.png";
import phone from "../../assets/images/Phone.png";
import email from "../../assets/images/Email.png";
import { InputFieldGroup } from "../ui/InputField";
import { DatePickerFieldGroup } from "../ui/CustomDatePicker";
import leavesubmit from "../../assets/images/leavesubmit.png";

// ✅ formatDate helper — converts "2025-10-31" → "31/10/25"
const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
};
const convertToISODate = (dateString: string): string => {
  if (!dateString) return "";
  // Check if already in ISO (YYYY-MM-DD)
  if (dateString.includes("-")) return dateString;

  // Convert from DD/MM/YY → YYYY-MM-DD
  const [day, month, year] = dateString.split("/");
  const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;
  return `${fullYear}-${month}-${day}`;
};
const DoctorManageLeave = () => {
  const [leaveData, setLeaveData] = useState<LeaveEntry[]>(defaultLeaveData);

  interface FormError {
    [key: string]: string;
  }
  const [formError, setFormError] = useState<FormError>({});
  const [showModal, setShowModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleopen = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setShowEdit(false);
  };
  const handleResultClose = () => setShowResultModal(false);
  const handleCancel = () => {
    setShowModal(false);
    setShowResultModal(false);
  };

  type Reason = {
    id: number;
    reason: string;
  };
  const reason: Reason[] = [
    { id: 1, reason: "Holi" },
    { id: 2, reason: "Family reasons" },
    { id: 3, reason: "Casual leave" },
    { id: 4, reason: "Vacation" },
    { id: 5, reason: "Sick leave" },
    { id: 6, reason: "Family Thing" },
  ];

  type Days = {
    id: number;
    days: string;
  };
  const days: Days[] = [
    { id: 1, days: "1" },
    { id: 2, days: "2" },
    { id: 3, days: "3" },
    { id: 4, days: "4" },
    { id: 5, days: "5" },
  ];

  type FormData = {
    id: string;
    startDate: string;
    endDate: string;
    days: string;
    type: string;
  };

  const initialFormData: FormData = {
    id: "",
    startDate: "",
    endDate: "",
    days: "",
    type: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (data: FormData): FormError => {
    const errors: FormError = {};
    if (!data.days.trim()) errors.days = "Days is required";
    if (!data.endDate.trim()) errors.endDate = "End Date is required";
    if (!data.startDate.trim()) errors.startDate = "Start Date is required";
    return errors;
  };

  // ✅ handleSubmit with formatted date + padded ID
  const handleSubmit = () => {
    const errors = validateForm(formData);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      const nextNumericId =
        leaveData.length > 0
          ? Math.max(...leaveData.map((item) => Number(item.id))) + 1
          : 1;

      const nextId = nextNumericId.toString().padStart(2, "0");

      const newLeave: LeaveEntry = {
        id: nextId,
        startDate: formatDate(formData.startDate),
        endDate: formatDate(formData.endDate),
        days: formData.days,
        type: formData.type,
      };

      setLeaveData((prev) => [...prev, newLeave]);
      setFormData(initialFormData);
      setShowModal(false);
      setShowResultModal(true);
    } else {
      console.log("Form has errors:", { errors });
    }
  };

  const [editLeave, setEditLeave] = useState<LeaveEntry | null>(null);

  // ✅ handle edit
  const handleEdit = (leave: LeaveEntry) => {
    setEditLeave(leave);
    setFormData({
      id: leave.id.toString(),
      startDate: convertToISODate(leave.startDate),
      endDate: convertToISODate(leave.endDate),
      days: leave.days.toString(),
      type: leave.type,
    });

    setShowEdit(true);
  };

  const handleDelete = (id: string) => {
    const updated = leaveData.filter((item) => item.id !== id);
    setLeaveData(updated);
  };

  // ✅ handle update with formatted date
  const handleUpdate = () => {
    if (!editLeave) return;

    const errors = validateForm(formData);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      const updatedLeaves = leaveData.map((leave) =>
        leave.id === editLeave.id
          ? {
              ...leave,
              ...formData,
              startDate: formatDate(formData.startDate),
              endDate: formatDate(formData.endDate),
            }
          : leave
      );
      setLeaveData(updatedLeaves);
      setShowEdit(false);
      setEditLeave(null);
    }
  };

  const leaveColumns = [
    ...defaultLeaveColumns,
    {
      header: "Action",
      cell: ({ row }: any) => (
        <div className="d-flex gap-2">
          <button
            className="btn  profile-card-boeder rounded-2"
            onClick={() => handleEdit(row.original)}
          >
            <Image src={LightEditimg} alt="Edit" width={18} height={20} />
          </button>
          <button
            className="btn profile-card-boeder rounded-2"
            onClick={() => handleDelete(row.original.id)}
          >
            <Image src={Trash} alt="Delete" width={18} height={20} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mt-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <h4 className="mb-2 mb-md-0 profile-card-main-titile">
            Leave History
          </h4>
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="d-flex align-items-center gap-2">
              <span className="about-text ">Sort by:</span>
              <Button className="last-month " variant="outline">
                Last 6 Months
              </Button>
            </div>
            <Button
              className="d-flex align-items-center border-none gap-2 px-2 py-2 maiacare-button"
              variant="default"
              onClick={handleopen}
            >
              <Image
                src={BookCalendar}
                alt="Specialization"
                width={22}
                height={22}
              />
              Block Calendar
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <BaseTable data={leaveData} columns={leaveColumns} />
        </div>
      </div>

      {/* Add Leave Modal */}
      <Modal
        show={showModal}
        onHide={handleClose}
        header="Schedule time off"
        closeButton
        dialogClassName="custom-modal-width leave_modal"
      >
        <div className="leavemodal_info">
          <div className="d-flex align-items-center gap-3">
            <Image
              src={DoctorImg}
              alt="doctor"
              width={50}
              height={50}
              className="rounded"
            />
            <div>
              <div className="d-flex gap-2">
                <h6 className="mb-0 fw-semibold">Dr.Riya Dharang</h6>
                <Image src={Verified} alt="Verified" width={20} height={20} />
              </div>
              <div className="kycmodal_info_text mt-1 gap-3">
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
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="mt-3">
          <Row className="gap-3">
            <Col md={4} className="pe-0">
              <DatePickerFieldGroup
                label="Starting From Date"
                name="startDate"
                placeholder="Select Start Date"
                value={formData.startDate}
                onChange={handleChange}
                required
                disabled={false}
                error={formError.startDate}
              />
            </Col>
            <Col md={4} className="p-0">
              <DatePickerFieldGroup
                label="To Date"
                name="endDate"
                placeholder="Select End Date"
                value={formData.endDate}
                onChange={handleChange}
                required
                disabled={false}
                error={formError.endDate}
              />
            </Col>
            <Col md={3} className="p-0">
              <label className="maiacare-input-field-label mb-2">
                No. of Days <span className="text-danger">*</span>
              </label>
              <Form.Select
                className={`radio_options form-select fw-bold ${
                  formError.days ? "is-invalid" : ""
                }`}
                name="days"
                value={formData.days}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                {days.map((d) => (
                  <option key={d.id} value={d.days}>
                    {d.days}
                  </option>
                ))}
              </Form.Select>
              {formError.days && (
                <div className="text-danger mt-1 small">{formError.days}</div>
              )}
            </Col>
          </Row>
        </div>

        <div className="mt-3">
          <label className="maiacare-input-field-label mb-2">Reason</label>
          <Form.Select
            className="radio_options form-select"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
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
        </div>

        <div className="mt-3">
          <label className="maiacare-input-field-label mb-2">
            Any additional note
          </label>
          <InputFieldGroup
            name="note"
            type="text"
            placeholder="Placeholder Text"
            required={false}
          />
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
      </Modal>

      {/* ✅ Success Modal */}
      <Modal
        show={showResultModal}
        onHide={handleResultClose}
        closeButton
        dialogClassName="custom-modal-width leavesubmit"
      >
        <div className="mx-auto">
          <Image src={leavesubmit} alt="leavesubmit" width={200} height={200} />
        </div>
        <div className="text-center modal-custom-header mt-3 fs-5">
          Schedule time off request Successfully!!
        </div>
        <div>
          <Button
            variant="dark"
            className="maiacare-button edit-profile-btn w-100 mt-3"
            onClick={handleCancel}
          >
            Okay
          </Button>
        </div>
      </Modal>

      {/* ✅ Edit Modal */}
      <Modal
        show={showEdit}
        onHide={handleClose}
        header="Schedule time off"
        closeButton
        dialogClassName="custom-modal-width leave_modal"
      >
        <div className="leavemodal_info">
          <div className="d-flex align-items-center gap-3">
            <Image
              src={DoctorImg}
              alt="doctor"
              width={50}
              height={50}
              className="rounded"
            />
            <div>
              <div className="d-flex gap-2">
                <h6 className="mb-0 fw-semibold">Dr.Riya Dharang</h6>
                <Image src={Verified} alt="Verified" width={20} height={20} />
              </div>
              <div className="kycmodal_info_text mt-1 gap-3">
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
            </div>
          </div>
        </div>

        {/* ✅ Edit Form */}
        <div className="mt-3">
          <Row className="gap-3">
            <Col md={4} className="pe-0">
              <DatePickerFieldGroup
                label="Starting From Date"
                name="startDate"
                placeholder="Select Start Date"
                value={formData.startDate}
                onChange={handleChange}
                required
                error={formError.startDate}
              />
            </Col>
            <Col md={4} className="p-0">
              <DatePickerFieldGroup
                label="To Date"
                name="endDate"
                placeholder="Select End Date"
                value={formData.endDate}
                onChange={handleChange}
                required
                error={formError.endDate}
              />
            </Col>
            <Col md={3} className="p-0">
              <label className="maiacare-input-field-label mb-2">
                No. of Days <span className="text-danger">*</span>
              </label>
              <Form.Select
                className={`radio_options form-select fw-bold ${
                  formError.days ? "is-invalid" : ""
                }`}
                name="days"
                value={formData.days}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                {days.map((d) => (
                  <option key={d.id} value={d.days}>
                    {d.days}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </div>

        <div className="mt-3">
          <label className="maiacare-input-field-label mb-2">Reason</label>
          <Form.Select
            className="radio_options form-select"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
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
        </div>

        <div className="mt-3">
          <label className="maiacare-input-field-label mb-2">
            Any additional note
          </label>
          <InputFieldGroup
            name="note"
            type="text"
            placeholder="Placeholder Text"
            required={false}
          />
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
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default DoctorManageLeave;
