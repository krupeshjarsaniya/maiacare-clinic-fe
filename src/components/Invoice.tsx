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
import { invoice } from "../utlis/StaticData";
import Image from "next/image";
import CommonTable from "@/components/ui/BaseTable";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { PiSlidersDuotone } from "react-icons/pi";
import Link from "next/link";
import search from "../assets/images/searchlight.png";
import add from "../assets/images/addlight.png";
import { IoEyeOutline } from "react-icons/io5";
import download from "../assets/images/invoicedownload.png";
import { setHeaderData } from "@/utlis/redux/slices/headerSlice";
import { AppDispatch } from "@/utlis/redux/store";

import { useDispatch } from "react-redux";
export default function Invoice() {
   const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
      dispatch(setHeaderData({ title: "Invoice", subtitle: "Invoice" }));
    }, []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const [filteredData, setFilteredData] = useState(invoice);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("All Time");
  useEffect(() => {
    let data = invoice;

    // 🔹 Filter by search (Patient name, doctor, invoice, service)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (item) =>
          item.PatientName.toLowerCase().includes(q) ||
          item.Doctor.toLowerCase().includes(q) ||
          item.Invoice.toLowerCase().includes(q) ||
          item.Service.toLowerCase().includes(q)
      );
    }

    // 🔹 Filter by time (Date field in "8 Jul, 2024" format)
    if (timeFilter !== "All Time") {
      const now = new Date();

      data = data.filter((item) => {
        if (!item.Date) return false;
        const itemDate = new Date(item.Date);
        if (isNaN(itemDate.getTime())) return false;

        if (timeFilter === "Today") {
          return itemDate.toDateString() === now.toDateString();
        }

        if (timeFilter === "This Week") {
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - now.getDay()); // Sunday
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
  }, [searchQuery, timeFilter]);
  // Handle download
  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const columns: ColumnDef<invoice>[] = [
    {
      header: "#",
      cell: (info) => {
        const index = info.row.index + 1;
        return index < 10 ? `0${index}` : index;
      },
    },
    {
      header: "Invoice",
      accessorKey: "Invoice",
    },
    {
      header: "Doctor",
      cell: (info) => {
        const imgSrc = info.row.original.image;
        const name = info.row.original.PatientName;
        const id = info.row.original.id;
        return (
          <Link
            href={`/invoice/${id}`}
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
      header: "Patient Name",
      cell: (info) => {
        const imgSrc = info.row.original.image;
        const name = info.row.original.PatientName;
        const id = info.row.original.id;
        return (
          <Link
            href={`/invoice/${id}`}
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
      header: "Amount",
      accessorKey: "Amount",
    },
    {
      header: "Date",
      accessorKey: "Date",
    },
    {
      header: "Service",
      accessorKey: "Service",
    },
    {
      header: "Actions",
      cell: (info) => {
        const id = info.row.original.id; // <-- use id directly
        return (
          <div className="text-center d-flex">
            <Button
              className="d-flex bg-white justify-content-center view-container   align-items-center border profile-card-boeder rounded Download-border me-2"
              onClick={() => router.push(`/invoice/${id}`)}
            >
              <IoEyeOutline />
            </Button>
            <Button
              className="btn profile-card-boeder border bg-white"
              onClick={() =>
                handleDownload(`/files/${name}.pdf`, `${name}.pdf`)
              }
            >
              <Image src={download} alt="download" width={23} height={23} />
            </Button>
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
            <Button
              variant="light"
              className="border custom-filter-button"
              style={{ paddingLeft: "15px" }}
            >
              <PiSlidersDuotone />
            </Button>
          </div>
          {/* book appointment */}
          <Button
            className="d-flex align-items-center gap-2 common-btn-blue px-4 maiacare-button"
            variant="default"
            // onClick={() => {
            //   setBookAppointmentModal(true);
            // }}
            style={{ padding: "12px" }}
          >
            <Image src={add} alt="addimage" width={18} height={18} />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Table */}
      <CommonTable data={filteredData} columns={columns} />
      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
        <small className="text-muted">
          Showing {filteredData.length} of {invoice.length} results
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
