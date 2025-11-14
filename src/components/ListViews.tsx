"use client";

import React, { useEffect, useState } from "react";
import { Dropdown, Form, InputGroup, Pagination } from "react-bootstrap";
import { inventoryData } from "../utlis/StaticData";
import Image from "next/image";
import CommonTable from "@/components/ui/BaseTable";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { PiSlidersDuotone } from "react-icons/pi";
import eye from "../assets/images/Eye.png";
import active_deactive from "../assets/images/Poweractivate.png";
import Reassign from "../assets/images/Reassigndoctor.png";
import Link from "next/link";
import Delete from "../assets/images/Delete.png";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import RescheduleAppointmentimg from "../assets/images/Rescheduleimg.png";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  ReassignRequest,
  SuccessModalReassignAppointment,
} from "./form/ReassignRequest";
import {
  ActivateDeactivateProfile,
  SuccessModalActivateDeactivate,
} from "./form/ActivateDeactivateModal";
import {
  RescheduleAppointment,
  SuccessModalReschedule,
} from "./form/RescheduleAppointment";

// import { BookAppointment, SuccessModalBookAppointment } from './form/BookAppointment';

// const statusColor: Record<string, string> = {
//     Completed: "success",
//     Pending: "primary",
//     Scheduled: "info",
//     "No Response": "danger",
//     Rescheduled: "warning",
// };

export type ConsultationStatus =
  | "Completed"
  | "Pending"
  | "Scheduled"
  | "No Response"
  | "Rescheduled"
  | "Cancelled";

export default function ListView() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const [filteredData, setFilteredData] = useState(inventoryData);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showActiveDeactiveModal, setShowActiveDeactiveModal] = useState(false);
  const [BookAppointmentModal, setBookAppointmentModal] = useState(false);
  const [showSuccessModalBook, setShowSuccessModalBook] = useState(false);
  const [showSuccessActivate, setShowSuccessActivate] = useState(false);
  const [showRescheduleAppointmentModal, setRescheduleAppointmentModal] =
    useState(false);
  // const [leaveData, setLeaveData] = useState<LeaveEntry[]>(defaultLeaveData);
  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // delete function
  const handleDelete = (id: number) => {
    const updated = filteredData.filter((item) => item.id !== id);
    setFilteredData(updated);
  };

  // useEffect(() => {
  //     if (filter === "completed") {
  //         setFilteredData(consultationData.filter(item => item.status === "Completed"));
  //     } else if (filter === "cancelled") {
  //         setFilteredData(consultationData.filter(item => item.status === "Cancelled"));
  //     } else {
  //         setFilteredData(consultationData);
  //     }
  // }, [filter]);
  useEffect(() => {
    let data = inventoryData;

    // 🔹 filter by status (query param)
    if (filter === "completed") {
      data = data.filter((item) => item.status === "Completed");
    } else if (filter === "cancelled") {
      data = data.filter((item) => item.status === "Cancelled");
    }

    // 🔹 filter by search
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.treatment.toLowerCase().includes(q) ||
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
        const id = info.row.original.id; // <-- Make sure you have an `id`

        return (
          // <Link href={`/patients/${id}`} className="text-decoration-none text-dark">
          <div className="d-flex align-items-center gap-2">
            {typeof imgSrc === "string" ? (
              <img
                src={imgSrc}
                alt={name}
                className="rounded-circle border"
                width="36"
                height="36"
              />
            ) : (
              <Image
                src={imgSrc}
                alt={name}
                width={36}
                height={36}
                className="rounded"
              />
            )}
            {name}
          </div>
          // </Link>
        );
      },
    },
    {
      header: "Mobile No",
      accessorKey: "mobile",
    },
    {
      header: "Date",
      accessorKey: "Date",
    },
    {
      header: "Time",
      accessorKey: "Time",
    },
    {
      header: "Reason for visit",
      cell: (info) => (
        <span className="box-border-orange ">
          {info.row.original.treatment}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (info) => {
        const row = info.row.original;
        const status = row.status;
        const statusClass = `status-${status.toLowerCase().replace(/\s/g, "")}`;

        return (
          <div className="d-flex items-center gap-2">
            {status && (
              <span className={`status-pill ${statusClass}`}>{status}</span>
            )}
            {/* <span className={`status-pill ${statusClass}`}>{status}</span> */}

            {/* 👇 Show 2 SVGs only for "Rani Desai" */}
            {row.name === "Himari Roy" && (
              <div className="text-center d-flex">
                {/* SVG 1 */}

                <Button
                  variant="light"
                  className="d-flex bg-white justify-content-center align-items-center action_btn border profile-card-boeder rounded  me-2"
                  //   onClick={() =>
                  //     handleDownload(`/files/${name}.pdf`, `${name}.pdf`)
                  //   }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M17.9422 6.06754L7.9422 16.0675C7.88415 16.1256 7.81522 16.1717 7.73935 16.2032C7.66348 16.2347 7.58215 16.2508 7.50001 16.2508C7.41788 16.2508 7.33655 16.2347 7.26067 16.2032C7.1848 16.1717 7.11587 16.1256 7.05782 16.0675L2.68282 11.6925C2.56555 11.5753 2.49966 11.4162 2.49966 11.2503C2.49966 11.0845 2.56555 10.9254 2.68282 10.8082C2.8001 10.6909 2.95916 10.625 3.12501 10.625C3.29086 10.625 3.44992 10.6909 3.5672 10.8082L7.50001 14.7418L17.0578 5.18316C17.1751 5.06588 17.3342 5 17.5 5C17.6659 5 17.8249 5.06588 17.9422 5.18316C18.0595 5.30044 18.1254 5.4595 18.1254 5.62535C18.1254 5.7912 18.0595 5.95026 17.9422 6.06754Z"
                      fill="#2ECF98"
                    />
                  </svg>
                </Button>
                <Button
                  variant="light"
                  // size="sm"
                  className="btn profile-card-boeder action_btn border bg-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M16.0672 15.1832C16.1252 15.2412 16.1713 15.3102 16.2027 15.386C16.2342 15.4619 16.2503 15.5432 16.2503 15.6253C16.2503 15.7075 16.2342 15.7888 16.2027 15.8647C16.1713 15.9405 16.1252 16.0095 16.0672 16.0675C16.0091 16.1256 15.9402 16.1717 15.8643 16.2031C15.7884 16.2345 15.7071 16.2507 15.625 16.2507C15.5429 16.2507 15.4615 16.2345 15.3857 16.2031C15.3098 16.1717 15.2409 16.1256 15.1828 16.0675L9.99998 10.8839L4.81717 16.0675C4.69989 16.1848 4.54083 16.2507 4.37498 16.2507C4.20913 16.2507 4.05007 16.1848 3.93279 16.0675C3.81552 15.9503 3.74963 15.7912 3.74963 15.6253C3.74963 15.4595 3.81552 15.3004 3.93279 15.1832L9.11639 10.0003L3.93279 4.81753C3.81552 4.70026 3.74963 4.5412 3.74963 4.37535C3.74963 4.2095 3.81552 4.05044 3.93279 3.93316C4.05007 3.81588 4.20913 3.75 4.37498 3.75C4.54083 3.75 4.69989 3.81588 4.81717 3.93316L9.99998 9.11675L15.1828 3.93316C15.3001 3.81588 15.4591 3.75 15.625 3.75C15.7908 3.75 15.9499 3.81588 16.0672 3.93316C16.1844 4.05044 16.2503 4.2095 16.2503 4.37535C16.2503 4.5412 16.1844 4.70026 16.0672 4.81753L10.8836 10.0003L16.0672 15.1832Z"
                      fill="#E85966"
                    />
                  </svg>
                </Button>
              </div>
            )}
          </div>
        );
      },
    },
    {
      header: "Actions",
      cell: (info) => {
        const id = info.row.original.id; // <-- use id directly
        return (
          <div className="d-flex align-items-center">
            <Dropdown align="end" className="d-flex align-items-center">
              <Dropdown.Toggle
                as="button"
                id="dropdown-basic"
                className="bg-transparent border-0 p-1 no-caret "
              >
                <div className="patient-profile-dot bg-white">
                  <HiOutlineDotsVertical fontSize={20} />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-end">
                <Dropdown.Item
                //   onClick={() => router.push(`/patients/${id}`)}
                >
                  <img
                    src={eye.src}
                    alt="eye"
                    width={19}
                    height={20}
                    className="me-2"
                  />
                  View Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setRescheduleAppointmentModal(true)}
                >
                  <Image
                    src={RescheduleAppointmentimg}
                    alt="RescheduleAppointment"
                    width={18}
                    height={18}
                    className="me-2"
                  />
                  Reschedule Appointment
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setShowActiveDeactiveModal(true)}>
                  <Image
                    src={active_deactive}
                    alt="Poweractivate"
                    width={18}
                    height={18}
                    className="me-2"
                  />
                  Activate/Deactivate
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setShowRescheduleModal(true)}>
                  <Image
                    src={Reassign}
                    alt="Poweractivate"
                    width={18}
                    height={18}
                    className="me-2"
                  />
                  Reassign Doctor
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div>
              <Button
                className="profile-card-boeder delete_btn rounded-2 patient-profile-dot "
                variant="dark"
                onClick={() => handleDelete(id)}
              >
                <Image src={Delete} alt="Delete" width={24} height={24} />
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="">
      {/* Summary Cards */}
      {/* <AppointmentSummaryCards target="patients" /> */}

      {/* Search and Filter */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3 searchbar-content">
        {/* Search Input */}
        <div className="d-flex align-items-center gap-2 mb-1 Consultations-image">
          {/* Search Input */}
          <InputGroup className="custom-search-group">
            <Form.Control
              placeholder="Search"
              className="custom-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputGroup.Text className="custom-search-icon">
              <IoSearch className="search-icon" />
            </InputGroup.Text>
          </InputGroup>

          <div className="border custom-filter-button p-2 consultations-image-summary-cards">
            {/* <Image src={woman} alt="Total" className="img-fluid women-image" /> */}
            <div className="consultations-image-book">
              <div className="Consultations-book">98 Consultations</div>
            </div>
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

          {/* <Button variant="default">
                                  <div className="d-flex justify-content-center align-items-center gap-2">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                          <path d="M18.75 9.375C18.75 9.67337 18.6315 9.95952 18.4205 10.1705C18.2095 10.3815 17.9234 10.5 17.625 10.5H10.5V17.625C10.5 17.9234 10.3815 18.2095 10.1705 18.4205C9.95952 18.6315 9.67337 18.75 9.375 18.75C9.07663 18.75 8.79048 18.6315 8.5795 18.4205C8.36853 18.2095 8.25 17.9234 8.25 17.625V10.5H1.125C0.826631 10.5 0.540483 10.3815 0.329505 10.1705C0.118526 9.95952 0 9.67337 0 9.375C0 9.07663 0.118526 8.79048 0.329505 8.5795C0.540483 8.36853 0.826631 8.25 1.125 8.25H8.25V1.125C8.25 0.826631 8.36853 0.540483 8.5795 0.329505C8.79048 0.118526 9.07663 0 9.375 0C9.67337 0 9.95952 0.118526 10.1705 0.329505C10.3815 0.540483 10.5 0.826631 10.5 1.125V8.25H17.625C17.9234 8.25 18.2095 8.36853 18.4205 8.5795C18.6315 8.79048 18.75 9.07663 18.75 9.375Z" fill="white" />
                                      </svg>
                                      Add Patient
                                  </div>
          
                              </Button> */}
          <Button
            variant="default"
            onClick={() => {
              setBookAppointmentModal(true);
            }}
          >
            <div className="d-flex justify-content-center align-items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  d="M19.8016 3.42969H17.9266V3.05469C17.9266 2.75632 17.8081 2.47017 17.5971 2.25919C17.3862 2.04821 17.1 1.92969 16.8016 1.92969C16.5033 1.92969 16.2171 2.04821 16.0061 2.25919C15.7952 2.47017 15.6766 2.75632 15.6766 3.05469V3.42969H8.92664V3.05469C8.92664 2.75632 8.80811 2.47017 8.59713 2.25919C8.38615 2.04821 8.1 1.92969 7.80164 1.92969C7.50327 1.92969 7.21712 2.04821 7.00614 2.25919C6.79516 2.47017 6.67664 2.75632 6.67664 3.05469V3.42969H4.80164C4.30435 3.42969 3.82744 3.62723 3.47581 3.97886C3.12418 4.33049 2.92664 4.80741 2.92664 5.30469V20.3047C2.92664 20.802 3.12418 21.2789 3.47581 21.6305C3.82744 21.9821 4.30435 22.1797 4.80164 22.1797H19.8016C20.2989 22.1797 20.7758 21.9821 21.1275 21.6305C21.4791 21.2789 21.6766 20.802 21.6766 20.3047V5.30469C21.6766 4.80741 21.4791 4.33049 21.1275 3.97886C20.7758 3.62723 20.2989 3.42969 19.8016 3.42969ZM6.67664 5.67969C6.67664 5.97806 6.79516 6.2642 7.00614 6.47518C7.21712 6.68616 7.50327 6.80469 7.80164 6.80469C8.1 6.80469 8.38615 6.68616 8.59713 6.47518C8.80811 6.2642 8.92664 5.97806 8.92664 5.67969H15.6766C15.6766 5.97806 15.7952 6.2642 16.0061 6.47518C16.2171 6.68616 16.5033 6.80469 16.8016 6.80469C17.1 6.80469 17.3862 6.68616 17.5971 6.47518C17.8081 6.2642 17.9266 5.97806 17.9266 5.67969H19.4266V7.92969H5.17664V5.67969H6.67664ZM5.17664 19.9297V10.1797H19.4266V19.9297H5.17664Z"
                  fill="white"
                />
              </svg>
              Book Appointment
            </div>
          </Button>
          {/* <Modal
                        show={BookAppointmentModal}
                        onHide={() => setBookAppointmentModal(false)}
                        header="Book Appointment"
                        closeButton={true}
                    >
                        <BookAppointment
                            setBookAppointmentModal={setBookAppointmentModal}
                            setShowSuccessModalBook={setShowSuccessModalBook}
                        />
                    </Modal>
                    <SuccessModalBookAppointment
                        showSuccessModalBook={showSuccessModalBook}
                        setShowSuccessModalBook={setShowSuccessModalBook}
                    /> */}
        </div>
      </div>

      {/* Table */}
      <CommonTable data={filteredData} columns={columns} />
      {/* reassign_modal */}
      <ReassignRequest
        show={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        onSubmit={(data) => console.log(data)}
        setShowSuccessModalBook={setShowSuccessModalBook}
      />

      <SuccessModalReassignAppointment
        showSuccessModalBook={showSuccessModalBook}
        setShowSuccessModalBook={setShowSuccessModalBook}
      />

      {/* active_modal */}
      <ActivateDeactivateProfile
        show={showActiveDeactiveModal}
        onClose={() => setShowActiveDeactiveModal(false)}
        setShowSuccessModal={setShowSuccessActivate}
      />
      <SuccessModalActivateDeactivate
        showSuccessModal={showSuccessActivate}
        setShowSuccessModal={setShowSuccessActivate}
      />

      {/* RescheduleAppointment */}
      <Modal
        show={showRescheduleAppointmentModal}
        onHide={() => setRescheduleAppointmentModal(false)}
        closeButton
      >
        <RescheduleAppointment
          // onClose={() => setRescheduleAppointmentModal(false)}
          setRescheduleModal={setRescheduleAppointmentModal}
        />
      </Modal>
      {/* <SuccessModalReschedule /> */}

      {/* Pagination */}
      {/* <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                <small className="text-muted">Showing {filteredData.length} of {inventoryData.length} results</small>
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
            </div> */}
    </div>
  );
}
