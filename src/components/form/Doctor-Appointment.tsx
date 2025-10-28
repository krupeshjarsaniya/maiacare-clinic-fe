"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  InputGroup,
  Button,
  Pagination,
  Dropdown,
} from "react-bootstrap";
import { useRouter } from "next/navigation";
import { appointement } from "../../utlis/StaticData";
import Image from "next/image";
import CommonTable from "@/components/ui/BaseTable";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { PiSlidersDuotone } from "react-icons/pi";
import Link from "next/link";
import search from "../../assets/images/searchlight.png";
import calendar from "../../assets/images/calendar.png";
import { HiOutlineDotsVertical } from "react-icons/hi";
import edit from "../../assets/images/edit.png";
import trash from "../../assets/images/Delete.png";
import appointmentcalander from "../../assets/images/bookappoin.png";
import { LuTrash2 } from "react-icons/lu";
import Modal from "../ui/Modal";
import { InputFieldGroup } from "../ui/InputField";
export type ConsultationStatus =
  | "Confirmed"
  | "Completed"
  | "Rejected"
  | "No Show"
  | "Upcomming"
  | "Cancelled"
  | "Rescheduled"
  | "Engaged";

export default function DoctorAppointment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const [filteredData, setFilteredData] = useState(appointement);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("All Time");

  // delete function
  const handleDelete = (id: number) => {
    const updated = filteredData.filter((item) => item.id !== id);
    setFilteredData(updated);
  };

  useEffect(() => {
    let data = appointement;

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
          item.time.toLowerCase().includes(q) ||
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
        const index = info.row.index + 1;
        return index < 10 ? `0${index}` : index;
      },
    },
    {
      header: "Name",
      cell: (info) => {
        const imgSrc = info.row.original.image;
        const name = info.row.original.name;
        const id = info.row.original.id;
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
              </div>
              <span>{name}</span>
            </div>
          </Link>
        );
      },
    },

    {
      header: "Mobile No.",
      accessorKey: "mobile",
    },
    {
      header: "Date",
      accessorKey: "date",
    },

    {
      header: "Time",
      accessorKey: "time",
    },
    {
      header: "Reason for visit",
      accessorKey: "visit",
      cell: (info) => {
        const visitArray: string[] = info.row.original.visit || [];

        if (visitArray.length === 0) return "-";

        const displayVisits = visitArray.slice(0, 1); // show first one
        const remainingCount = visitArray.length - 1;

        return (
          <div className="d-flex flex-wrap gap-1">
            {displayVisits.map((visit, i) => (
              <span key={i} className="servicename">
                {visit}
                {remainingCount > 0 && i === displayVisits.length - 1
                  ? `+${remainingCount}`
                  : ""}
              </span>
            ))}
          </div>
        );
      },
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
          <div className="text-center d-flex">
            <Button className="d-flex bg-white justify-content-center align-items-center border profile-card-boeder rounded Download-border me-2">
              <Image src={edit} alt="edit" width={20} height={20} />
            </Button>
            <Button
              className="btn profile-card-boeder border bg-white"
              onClick={() => handleDelete(id)} // <-- pass id
            >
              <Image src={trash} alt="trash" width={20} height={20} />
            </Button>
          </div>
        );
      },
    },
  ];
  // modal bookappointment
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleopen = () => {
    setShowModal(true);
  };

  return (
    <div className="mt-4">
      {/* list */}
      {/* Search and Filter */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3 searchbar-content">
        <div className="d-flex gap-3">
          {/* Search Input */}
          <div className="d-flex align-items-center gap-2 mb-1 Consultations-image">
            {/* Search Input */}
            <InputGroup className="custom-search-group">
              <Form.Control
                placeholder="Search Patients"
                className="custom-search-input ps-3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  borderRight: "none",
                  borderLeft: "1px solid #dde1e8 ",
                }}
              />
              <InputGroup.Text className="custom-search-icon">
                <Image src={search} alt="search" width={24} height={24} />
              </InputGroup.Text>
            </InputGroup>
          </div>
          {/* appointement */}
          <div
            className="border custom-filter-button  d-flex align-items-center"
            style={{ gap: "10px", padding: "10px" }}
          >
            <Image
              src={calendar}
              alt="calendar"
              className="img-fluid women-image"
              width={30}
              height={30}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="Consultations-book">98 Appointments</div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
          {/* Sort + Filter */}
          <div className="d-flex align-items-center gap-2">
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
          </div>
          {/* book appointment */}
          <Button
            className="d-flex align-items-center gap-2 common-btn-blue px-4 maiacare-button"
            variant="default"
            onClick={handleopen}
            style={{ padding: "12px" }}
          >
            <Image
              src={appointmentcalander}
              alt="appointmentcalander"
              width={22}
              height={22}
            />
            Book Appointment
          </Button>
        </div>
      </div>

      {/* Table */}
      <CommonTable data={filteredData} columns={columns} />
      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
        <small className="text-muted">
          Showing {filteredData.length} of {appointement.length} results
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

      {/* book appointment modal */}
      <Modal
        show={showModal}
        onHide={handleClose}
        header="Book Appointment"
        closeButton
        dialogClassName="custom-modal-width "
      >
        <div>
          <div className="fw-semibold">Appointment Details</div>
          <div className="mt-3">
            <InputFieldGroup
              label="Appointment ID "
              name="AppointmentID "
              type="text"
              placeholder="Appointment ID "
              required={true}
            />
          </div>
          <div>
            <Button
              variant="dark"
              className="maiacare-button common-btn-blue w-50 tetx-left fw-semibold"
              // onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
