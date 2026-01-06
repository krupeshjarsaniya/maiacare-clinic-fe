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
import { AppointmentData } from "../../utlis/types/interfaces";
import DummyProfile from "@/assets/images/patient_profile.png";
import {
  BookAppointment,
  SuccessModalBookAppointment,
} from "./BookAppointment";
import DeleteConfirmModal from "../ui/DeleteConfirmModal";
import { getAppointments } from "@/utlis/apis/apiHelper";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export type ConsultationStatus =
  | "Confirmed"
  | "Completed"
  | "Rejected"
  | "No Show"
  | "Upcomming"
  | "Cancelled"
  | "Rescheduled"
  | "Engaged";

export default function DoctorAppointment({
  doctorIdShow,
}: {
  doctorIdShow: string | number | undefined;
}) {
  const initialAppointments: AppointmentData[] = appointement.map((item) => ({
    status: item.status,
    visit: item.visit ?? [], // fallback to empty array if undefined
    name: item.name,
    image: item.image,
    id: item.id,
    appointmentId: String(item.id),
    type: item.type ?? "",
    reasonForVisit: item.visit ?? [],
    appointmentDate: item.date ?? "",
    appointmentTime: item.time ?? "",
    forTime: item.for ?? "",
    additionalNote: item.additionalNote ?? "",
    patientName: item.name,
    phone: item.mobile,
    email: item.email ?? "",
  }));
  console.log("doctorIdShow", doctorIdShow);

  const [totalPages, setTotalPages] = useState<number>(0);
  const [appointmentsTotal, setAppointmentsTotal] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const start = (activePage - 1) * 10;
  const end = start + 10;
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  //   const [filteredData, setFilteredData] = useState(appointement);
  // const [filteredData, setFilteredData] =
  //   useState<AppointmentData[]>(initialAppointments);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [BookAppointmentModal, setBookAppointmentModal] = useState(false);
  const [showSuccessModalBook, setShowSuccessModalBook] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [filteredData, setFilteredData] = useState<AppointmentData[]>([]);

  const [editData, setEditData] = useState<AppointmentData | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editingAppointment, setEditingAppointment] =
    useState<AppointmentData | null>(null);

  const handleDelete = () => {
    if (selectedId === null) return;

    setFilteredData((prev) => prev.filter((item) => item.id !== selectedId));

    // close modal after delete
    setShowDeleteModal(false);
    setSelectedId(null);
  };
  useEffect(() => {
    let data = appointments;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.phone.toLowerCase().includes(q)
      );
    }

    if (timeFilter !== "All Time") {
      const now = new Date();

      data = data.filter((item) => {
        const itemDate = new Date(item.appointmentDate);
        if (isNaN(itemDate.getTime())) return false;

        if (timeFilter === "Today") {
          return itemDate.toDateString() === now.toDateString();
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
  }, [appointments, searchQuery, timeFilter]);

  const fetchAppointments = async () => {
    try {
      const res = await getAppointments({
        view: "list",
        page: activePage,
        doctorId: doctorIdShow,
      });
      setAppointmentsTotal(res.data.total);

      setTotalPages(res.data.totalPages);
      const mappedData: AppointmentData[] = res.data.data.map(
        (item: any): AppointmentData => ({
          id: item.appointId,
          appointmentId: String(item.appointId),

          status: item.status,
          visit: item.reason ?? [],

          name: item.patient.name,
          patientName: item.patient.name,
          phone: item.patient.contactNumber,
          email: item.patient.contactEmail,

          // image: item.patient.profileImage || "",
          image: item.patient.profileImage?.trim() || null,

          appointmentDate: item.appointmentDate,
          appointmentTime: item.appointmentTime,

          type: "",
          forTime: "",
          additionalNote: item.additionalNote ?? "",
          reasonForVisit: [],
        })
      );

      setAppointments(mappedData);

      setFilteredData(mappedData);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   fetchAppointments();
  // }, []);
  useEffect(() => {
    fetchAppointments();
  }, [activePage]);
  const openDeleteModal = (id: number) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };
  // Check if string is a valid non-empty URL or path
  const isValidImageSrc = (src: unknown): src is string => {
    return typeof src === "string" && src.trim() !== "";
  };

  const columns: ColumnDef<AppointmentData>[] = [
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
        const resolvedImgSrc =
          typeof imgSrc === "string" && imgSrc.trim() !== ""
            ? imgSrc
            : DummyProfile;
        return (
          <Link
            href={`/doctors/${id}`}
            className="text-decoration-none text-dark"
          >
            <div className="d-flex align-items-center gap-2">
              {/* Profile image wrapper */}
              {/* <div
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
              </div> */}
              <div
                className="position-relative"
                style={{ width: "36px", height: "36px" }}
              >
                {typeof resolvedImgSrc === "string" ? (
                  <img
                    src={resolvedImgSrc}
                    alt={name}
                    width={40}
                    height={40}
                    className="rounded object-fit-cover"
                    onError={(e) => {
                      e.currentTarget.src = DummyProfile.src;
                    }}
                  />
                ) : (
                  <Image
                    src={resolvedImgSrc}
                    alt={name}
                    width={40}
                    height={40}
                    className="rounded object-fit-cover"
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
      accessorKey: "phone",
    },
    {
      header: "Date",
      accessorKey: "appointmentDate",
    },

    {
      header: "Time",
      accessorKey: "appointmentTime",
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
            <Button
              className="d-flex bg-white justify-content-center align-items-center border profile-card-boeder rounded Download-border me-2"
              onClick={() => {
                setEditData(info.row.original); // store row data
                setBookAppointmentModal(true); // open modal
              }}
            >
              <Image src={edit} alt="edit" width={20} height={20} />
            </Button>
            <Button
              className="btn profile-card-boeder border bg-white"
              // onClick={() => handleDelete(id)} // <-- pass id
              onClick={() => openDeleteModal(id)}
            >
              <Image src={trash} alt="trash" width={20} height={20} />
            </Button>
          </div>
        );
      },
    },
  ];
  // modal bookappointment

  const handleClose = () => {
    setShowModal(false);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedId(null);
  };
  const handleAddAppointment = (newAppointment: AppointmentData) => {
    setAppointments((prev) => [...prev, newAppointment]);
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
            {loading ? (
              <Skeleton width={250} height={35} />
            ) : (
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
            )}
          </div>
          {/* appointement */}
          {loading ? (
            <Skeleton width={150} height={40} />
          ) : (
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
                <div className="Consultations-book">
                  {appointmentsTotal} Appointments
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="d-flex align-items-center gap-3">
          {/* Sort + Filter */}
          <div className="d-flex align-items-center gap-2">
            {loading ? (
              <Skeleton width={40} height={20} />
            ) : (
              <span className="text-muted small short-by">Sort by:</span>
            )}
            {loading ? (
              <Skeleton width={150} height={40} />
            ) : (
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
            )}
            {loading ? (
              <Skeleton width={40} height={40} />
            ) : (
              <Button variant="light" className="border custom-filter-button">
                <PiSlidersDuotone />
              </Button>
            )}
          </div>
          {/* book appointment */}
          {loading ? (
            <Skeleton width={200} height={40} />
          ) : (
            <Button
              className="d-flex align-items-center gap-2 common-btn-blue px-4 maiacare-button"
              variant="default"
              onClick={() => {
                setBookAppointmentModal(true);
              }}
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
          )}
        </div>
      </div>

      {/* Table */}
      <CommonTable<AppointmentData>
        data={filteredData}
        columns={columns}
        activePage={activePage}
        loading={loading}
        tableTotal={appointmentsTotal}
        totalPages={Math.ceil(appointmentsTotal / 10)}
        setActivePage={setActivePage}
      />

      {/* book appointment modal */}
      <>
        <Modal
          show={BookAppointmentModal}
          onHide={() => {
            setBookAppointmentModal(false);
            setEditData(null);
          }}
          header={editData ? "Edit Appointment" : "Book Appointment"}
          closeButton={true}
        >
          <BookAppointment
            setBookAppointmentModal={setBookAppointmentModal}
            setShowSuccessModalBook={setShowSuccessModalBook}
            onAddAppointment={handleAddAppointment}
            editData={editData}
            onSave={(updatedData: { id: number }) => {
              setFilteredData((prev) =>
                prev.map((item) =>
                  item.id === updatedData.id
                    ? { ...item, ...updatedData }
                    : item
                )
              );
              setEditData(null);
            }}
          />
        </Modal>

        <SuccessModalBookAppointment
          showSuccessModalBook={showSuccessModalBook}
          setShowSuccessModalBook={setShowSuccessModalBook}
        />
      </>
      {/* Delete Modal */}
      <DeleteConfirmModal
        show={showDeleteModal}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
        title="Delete"
        message="Are you sure you want to delete this qualification?"
      />
    </div>
  );
}
