"use client";

import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button, Pagination } from "react-bootstrap";
import { DoctorData } from "../utlis/StaticData";
// "@/utils/StaticData";
import Image from "next/image";
import CommonTable from "@/components/ui/BaseTable";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { PiSlidersDuotone } from "react-icons/pi";
// import "@/style/Consultation.css";
import { LuTrash2, LuArrowDown } from "react-icons/lu";


import Link from "next/link";
// import woman from "@/assets/images/woman.png";

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

export default function Consultation() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const [filteredData, setFilteredData] = useState(DoctorData);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("All Time");

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


  useEffect(() => {
    let data = DoctorData;

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
        const id = info.row.original.id; // <-- Make sure you have an `id`

        return (
          <Link
            href={`/patients/${id}`}
            className="text-decoration-none text-dark"
          >
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
                  className="rounded-circle border"
                />
              )}
              {name}
            </div>
          </Link>
        );
      },
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
      header: "Pin Code",
      accessorKey: "pin",
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
              size="sm"
              className="d-flex bg-white justify-content-center align-items-center border profile-card-boeder rounded Download-border me-2"
              onClick={() =>
                handleDownload(`/files/${name}.pdf`, `${name}.pdf`)
              }
            >
              <LuArrowDown className="arrow-down" />
            </Button>
            <Button
              size="sm"
              className="btn btn-sm profile-card-boeder border bg-white"
              onClick={() => handleDelete(id)} // <-- pass id
            >
              <LuTrash2 className="trash" />
            </Button>
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

          <div
            className="border custom-filter-button p-2"
            style={{ display: "flex", gap: "10px" }}
          >
            {/* <Image src={woman} alt="Total" className="img-fluid women-image" /> */}
            <div
              style={{ display: "flex", alignItems: "center", width: "190px" }}
            >
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
        </div>
      </div>

      {/* Table */}
      <CommonTable data={filteredData} columns={columns} />

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
    </div>
  );
}
