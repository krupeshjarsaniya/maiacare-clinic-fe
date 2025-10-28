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
import { DoctorData } from "../utlis/StaticData";
import Image from "next/image";
import CommonTable from "@/components/ui/BaseTable";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import add from "../assets/images/plus.png";
import { PiSlidersDuotone } from "react-icons/pi";
import serchicon from "../assets/images/searchicon.png";
import Link from "next/link";
import Stethoscope from "../assets/images/doctorstethoscope.png";
import { HiOutlineDotsVertical } from "react-icons/hi";
import VerifiedIcon from "../assets/images/verifiedreview.png";
import edit from "../assets/images/edit.png";
import trash from "../assets/images/Delete.png";
import DoctorAddedModal from "./DoctorAddedModel";
export type ConsultationStatus = "Active" | "Inactive" | "On Leave";

export default function Doctor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const [filteredData, setFilteredData] = useState(DoctorData);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("All Time");

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
    </div>
  );
}
