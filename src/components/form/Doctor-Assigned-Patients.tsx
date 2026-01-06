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
import { AssignedPatients } from "../../utlis/StaticData";
import Image from "next/image";
import CommonTable from "@/components/ui/BaseTable";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { PiSlidersDuotone } from "react-icons/pi";
import serchicon from "../../assets/images/searchicon.png";
import Link from "next/link";
import patient from "../../assets/images/patient.png";
import { HiOutlineDotsVertical } from "react-icons/hi";
import edit from "../../assets/images/edit.png";
import trash from "../../assets/images/Delete.png";
import { getAssigned } from "@/utlis/apis/apiHelper";
import toast from "react-hot-toast";
export type ConsultationStatus = "Active" | "Inactive" | "On Leave";
import dummyPatient from "@/assets/images/patient_profile.png";
import Skeleton from "react-loading-skeleton";
export default function DoctorAssignedPatients({
  doctorIdShow,
}: {
  doctorIdShow: string | number | undefined;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const [filteredData, setFilteredData] = useState<AssignedPatients[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [assignedTotal, setAssignedTotal] = useState<number>(0);
  const [allPatients, setAllPatients] = useState<AssignedPatients[]>([]);

  // delete function
  const handleDelete = (id: number) => {
    const updated = filteredData.filter((item) => item.id !== id);
    setFilteredData(updated);
  };

  const fetchallassignedpatients = async (): Promise<void> => {
    if (!doctorIdShow) return;

    setLoading(true);

    try {
      const response = await getAssigned({
        doctorId: doctorIdShow,
        limit: 10,
        page: activePage,
      });

      const apiData = response.data;

      console.log("FULL RESPONSE:", apiData);

      if (apiData.success && Array.isArray(apiData.data)) {
        const normalized: AssignedPatients[] = apiData.data.map(
          (item: any): AssignedPatients => ({
            id: item.id,
            name: item.patient.name,
            mobile: String(item.patient.contactNumber),
            email: item.patient.email,
            pin: item.patient.pincode,
            image: item.patient.profileImage || patient,
            status: item.status === 1 ? "Active" : "Inactive",
            visit: item.appointmentDate ?? "--",
            treatmenttype: item.reason ?? [],
            date: item.appointmentDate ?? "",
          })
        );
        setAllPatients(normalized);
        setTotalPages(apiData.totalPages);
        setAssignedTotal(apiData.total);
      } else {
        setAllPatients([]);
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let data = [...allPatients];

    // Filter by query param status
    if (filter === "active") {
      data = data.filter((item) => item.status === "Active");
    } else if (filter === "cancelled") {
      data = data.filter((item) => item.status === "Inactive");
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          item.mobile.toLowerCase().includes(q)
      );
    }

    // Filter by time
    if (timeFilter !== "All Time") {
      const now = new Date();

      data = data.filter((item) => {
        if (!item.date) return false;
        const itemDate = new Date(item.date);
        if (isNaN(itemDate.getTime())) return false;

        if (timeFilter === "Today") {
          return itemDate.toDateString() === now.toDateString();
        }

        if (timeFilter === "This Week") {
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - now.getDay());
          weekStart.setHours(0, 0, 0, 0);

          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 7);

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
  }, [allPatients, filter, searchQuery, timeFilter]);

  useEffect(() => {
    if (doctorIdShow) {
      fetchallassignedpatients();
    }
  }, [doctorIdShow, activePage]);

  const columns: ColumnDef<AssignedPatients>[] = [
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

        const finalImg =
          typeof imgSrc === "string" && imgSrc.trim() !== ""
            ? imgSrc
            : dummyPatient.src;
        return (
          <Link
            href={`/patients/${id}`}
            className="text-decoration-none text-dark"
          >
            <div className="d-flex align-items-center gap-2">
              <div style={{ width: "36px", height: "36px" }}>
                <img
                  src={finalImg}
                  alt={name}
                  width={36}
                  height={36}
                  className="rounded-circle border object-fit-cover"
                  onError={(e) => {
                    e.currentTarget.src = dummyPatient.src;
                  }}
                />
              </div>

              <span>{name}</span>
            </div>
          </Link>
        );
      },
    },
    {
      header: "Pincode",
      accessorKey: "pin",
    },
    {
      header: "Mobile No.",
      accessorKey: "mobile",
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: (info) => (
        <span className="text-decoration-underline">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      header: "Treatment Type",
      accessorKey: "treatmenttype",
      cell: (info) => {
        // const treatments = info.getValue() as string[];
        // // array of strings
        const treatments = (info.getValue() ?? []) as string[];
        return (
          <div className="d-flex align-items-center gap-1">
            {treatments.map((treat, index) => (
              <span
                key={index}
                className="servicename"
                style={{
                  fontSize: "12px",
                  paddingRight: "9px",
                  paddingLeft: "9px",
                }}
              >
                {treat}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      header: "Last Visit",
      accessorKey: "visit",
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
                <Dropdown.Item>
                  <Image
                    src={edit}
                    alt="edit"
                    width={18}
                    height={18}
                    className="me-1"
                  />
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-danger"
                  onClick={() => handleDelete(id)}
                >
                  <Image
                    src={trash}
                    alt="trash"
                    width={18}
                    height={18}
                    className="me-1"
                  />
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  return (
    <div className="mt-4">
      {/* list */}
      {/* Search and Filter */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3 searchbar-content">
        <div className="d-flex gap-3">
          {/* doctors */}
          {loading ? (
            <Skeleton width={150} height={35} />
          ) : (
            <div
              className="border custom-filter-button  d-flex align-items-center"
              style={{ gap: "10px" }}
            >
              <Image
                src={patient}
                alt="patient"
                className="img-fluid women-image"
                width={20}
                height={20}
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="Consultations-book">
                  {assignedTotal} Patients
                </div>
              </div>
            </div>
          )}

          {/* Search Input */}
          <div className="d-flex align-items-center gap-2 mb-1 Consultations-image">
            {/* Search Input */}
            {loading ? (
              <Skeleton width={200} height={35} />
            ) : (
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
                  placeholder="Search Patients"
                  className="custom-search-input ps-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
            )}
          </div>
        </div>

        {/* Sort + Filter */}
        <div className="d-flex align-items-center gap-2 mb-2">
          {loading ? (
            <Skeleton width={70} height={20} />
          ) : (
            <span className="text-muted small short-by">Sort by:</span>
          )}
          {loading ? (
            <Skeleton width={180} height={35} />
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
            <Skeleton width={35} height={35} />
          ) : (
            <Button variant="light" className="border custom-filter-button">
              <PiSlidersDuotone />
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <CommonTable
        data={filteredData}
        columns={columns}
        activePage={activePage}
        setActivePage={setActivePage}
        tableTotal={assignedTotal}
        totalPages={Math.ceil(assignedTotal / 10)}
        loading={loading}
      />
    </div>
  );
}
