"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  InputGroup,
  Button,
  Pagination,
  Dropdown,
  Col,
  Row,
} from "react-bootstrap";
import { useRouter } from "next/navigation";
import { DoctorData } from "../utlis/StaticData";
import Image from "next/image";
import CommonTable from "@/components/ui/BaseTable";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import activation from "../assets/images/restricted-access.png";
import deactivation from "../assets/images/restricted-access.png";
import add from "../assets/images/plus.png";
import { PiSlidersDuotone } from "react-icons/pi";
import serchicon from "../assets/images/searchicon.png";
import Link from "next/link";
import Stethoscope from "../assets/images/doctorstethoscope.png";
import { HiOutlineDotsVertical } from "react-icons/hi";
import VerifiedIcon from "../assets/images/verifiedreview.png";
import edit from "../assets/images/edit.png";
import DoctorAddedModal from "./DoctorAddedModel";
export type ConsultationStatus = "Active" | "Inactive" | "On Leave";
import eye from "../assets/images/Eye.png";
import Poweractivate from "../assets/images/Poweractivate.png";
import DoctorImg from "../assets/images/doctor1.png";
import Arrowup from "../assets/images/ArrowUpRight.png";
import Modal from "./ui/Modal";
import phone from "../assets/images/Phone.png";
import email from "../assets/images/Email.png";
import sthetoscope from "../assets/images/Stethoscope.png";
import patient from "../assets/images/patient.png";
import { RadioButtonGroup } from "./ui/RadioField";
import { InputFieldGroup } from "./ui/InputField";

export default function Doctor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const [filteredData, setFilteredData] = useState(DoctorData);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);

  // delete function
  const handleDelete = (id: number) => {
    const updated = filteredData.filter((item) => item.id !== id);
    setFilteredData(updated);
  };

  useEffect(() => {
    let data = DoctorData;

    // 🔹 filter by status (query param)
    if (filter === "active") {
      data = data.filter((item) => item.status === "Active");
    } else if (filter === "cancelled") {
      data = data.filter((item) => item.status === "Inactive");
    }

    // 🔹 filter by search
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          item.mobile.toLowerCase().includes(q)
      );
    }

    // 🔹 filter by time
    if (timeFilter !== "All Time") {
      const now = new Date();

      data = data.filter((item) => {
        if (!item.date) return false; // skip if no date
        const itemDate = new Date(item.date);
        if (isNaN(itemDate.getTime())) return false;

        if (timeFilter === "Today") {
          return itemDate.toDateString() === now.toDateString();
        }

        if (timeFilter === "This Week") {
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - now.getDay()); // Sunday
          weekStart.setHours(0, 0, 0, 0);

          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 7); // Next Sunday

          return itemDate >= weekStart && itemDate < weekEnd;
        }

        if (timeFilter === "This Month") {
          return (
            itemDate.getMonth() === now.getMonth() &&
            itemDate.getFullYear() === now.getFullYear()
          );
        }

        return true;
      });
    }

    setFilteredData(data);
  }, [filter, searchQuery, timeFilter]);

  const columns: ColumnDef<any>[] = [
    {
      header: "#",
      cell: (info) => {
        const index = info.row.index + 1; // row number start from 1
        return index < 10 ? `0${index}` : index; // format 01,02,03
      },
    },
    {
      header: "Name",
      cell: (info) => {
        const imgSrc = info.row.original.image;
        const name = info.row.original.name;
        const id = info.row.original.id;
        const isVerified = info.row.original.verified; // ✅ matches your data key!

        return (
          <Link
            href={`/doctors/${id}`}
            
            className="text-decoration-none text-dark"
          >
            <div className="d-flex align-items-center gap-2">
              {/* Profile image wrapper */}
              <div
                className="position-relative"
                style={{ width: "36px", height: "36px" }}
              >
                {typeof imgSrc === "string" ? (
                  <img
                    src={imgSrc}
                    alt={name}
                    className="rounded-circle position-relative border"
                    width="40"
                    height="auto"
                  />
                ) : (
                  <Image
                    src={imgSrc}
                    alt={name}
                    width={40}
                    height={40}
                    className="rounded-circle position-relative border"
                  />
                )}

                {/* ✅ Verified badge overlay */}
                {isVerified && (
                  <Image
                    src={VerifiedIcon}
                    alt="Verified"
                    width={17}
                    height={17}
                    className="verified-badge"
                  />
                )}
              </div>
              <span>{name}</span>
            </div>
          </Link>
        );
      },
    },
    {
      header: "Member Since",
      accessorKey: "date",
    },
    {
      header: "Specialisation",
      accessorKey: "specialisation",
    },
    {
      header: "Mobile No",
      accessorKey: "mobile",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Status",
      cell: (info) => {
        const status = info.row.original.status;
        const statusClass = `status-${status.toLowerCase().replace(/\s/g, "")}`;
        return <span className={`status-pill ${statusClass}`}>{status}</span>;
      },
    },
    {
      header: "Actions",
      cell: (info) => {
        const id = info.row.original.id; // <-- use id directly
        return (
          <div>
            <Dropdown align="end" className="d-flex align-items-center">
              <Dropdown.Toggle
                as="button"
                id="dropdown-basic"
                className="bg-transparent border-0 p-1 no-caret"
              >
                <div className="patient-profile-dot">
                  <HiOutlineDotsVertical />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-end">
                <Dropdown.Item onClick={() => router.push(`/doctors/${id}`)}>
                  <img
                    src={eye.src}
                    alt="eye"
                    width={18}
                    height={18}
                    className="me-2"
                  />
                  View Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => router.push(`/doctors/${id}`)}>
                  <Image
                    src={edit}
                    alt="edit"
                    width={18}
                    height={18}
                    className="me-2"
                  />
                  Edit Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleActive(info.row.original)}>
                  <Image
                    src={Poweractivate}
                    alt="Poweractivate"
                    width={18}
                    height={18}
                    className="me-2"
                  />
                  Activate/Deactivate
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  // modal

  type FormData = {
    profile: string; // default will be "female"
  };

  const initialFormData: FormData = {
    profile: "activate", // default value
  };
  interface FormError {
    [key: string]: string;
  }
  const initialFormError: FormError = {};

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const [showResultModal, setShowResultModal] = useState(false);

  const handleActive = (doctor: any) => {
    const newProfileState =
      doctor.status === "Active" ? "deactivate" : "activate";

    setSelectedDoctor(doctor); // store doctor
    setFormData({ profile: newProfileState }); // set initial radio button
    setShowModal(true);
  };

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
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setShowModal(false);
  //   setShowResultModal(true);
  // };

  // handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDoctor) return;

    const updatedData = filteredData.map((doc) =>
      doc.id === selectedDoctor.id
        ? {
            ...doc,
            status: formData.profile === "activate" ? "Active" : "Inactive",
          }
        : doc
    );

    setFilteredData(updatedData); // update state (table refreshes)
    setShowModal(false);
    setShowResultModal(true);
  };

  const handleresultclose = () => {
    setShowResultModal(false);
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  return (
    <div className="">
      {/* list */}
      {/* Search and Filter */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3 searchbar-content">
        <div className="d-flex gap-3">
          {/* doctors */}
          <div
            className="border custom-filter-button  d-flex align-items-center"
            style={{ gap: "10px" }}
          >
            <Image
              src={Stethoscope}
              alt="Stethoscope"
              className="img-fluid women-image"
              width={20}
              height={20}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="Consultations-book">98 Doctors</div>
            </div>
          </div>
          {/* Search Input */}
          <div className="d-flex align-items-center gap-2 mb-1 Consultations-image">
            {/* Search Input */}
            <InputGroup className="custom-search-group">
              <InputGroup.Text className="custom-search-icon">
                <Image
                  src={serchicon}
                  alt="serchicon"
                  className="search-icon"
                />
                {/* <IoSearch  /> */}
              </InputGroup.Text>
              <Form.Control
                placeholder="Search Doctors"
                className="custom-search-input ps-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>

        {/* Sort + Filter */}
        <div className="d-flex align-items-center gap-2 mb-2">
          <span className="text-muted small short-by">Sort by:</span>
          <Form.Select
            className="custom-sort-select"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)} // ✅ update state
          >
            <option>All Time</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </Form.Select>
          <Button variant="light" className="border custom-filter-button">
            <PiSlidersDuotone />
          </Button>
          <Button
            onClick={() => router.push("/addDoctor")}
            className="d-flex align-items-center gap-2 add_doctor common-btn-blue"
          >
            <Image src={add} alt="add" width={15} height={15} />
            Add New Doctor
          </Button>
        </div>
      </div>

      {/* Table */}
      <CommonTable data={filteredData} columns={columns} />
      <DoctorAddedModal />
      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
        <small className="text-muted">
          Showing {filteredData.length} of {DoctorData.length} results
        </small>
        <Pagination size="sm" className="mb-0">
          <Pagination.Prev disabled />
          {[1, 2, 3, 4, 5].map((p) => (
            <Pagination.Item key={p} active={p === 1}>
              {p}
            </Pagination.Item>
          ))}
          <Pagination.Ellipsis disabled />
          <Pagination.Item>99</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </div>

      {/* ✅ Modal placed outside Dropdown */}
      <Modal
        show={showModal}
        onHide={handleClose}
        header={
          formData.profile === "activate"
            ? "Activate Profile Request"
            : "Deactivate Profile Request"
        }
        closeButton
        // dialogClassName="custom-modal-width"
      >
        <div className="kycmodal_info">
          <div className="d-flex align-items-center justify-content-between">
            <div className="kycmodal_profile">
              <Image src={DoctorImg} alt="doctor" width={50} height={50} />
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
      </Modal>

      {/* --- Result Modal (After Submit) --- */}
      <Modal
        show={showResultModal}
        onHide={handleresultclose}
        centered
        className="activateModal"
      >
        <div className="text-center ">
          <Image
            src={formData.profile === "activate" ? activation : deactivation}
            alt="Result Image"
            width={200}
            height={150}
          />
          <h6 className="mt-3 modal-custom-header">
            {formData.profile === "activate"
              ? "Activation request sent"
              : "Deactivation request sent"}
          </h6>
          <p style={{ fontSize: "14px", color: "#3E4A57" }}>
            The Admin will be informed about your request and will react out to
            you for confirmation.
          </p>
          <Button
            className="maiacare-button common-btn-blue w-100"
            onClick={() => {
              setShowResultModal(false);
              setShowModal(false);
            }}
          >
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
}
