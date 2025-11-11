"use client";
import React, { useEffect, useState } from "react";
import { Dropdown, Form, InputGroup, Pagination } from "react-bootstrap";
import { consultationData } from "../utlis/StaticData";
import Image from "next/image";
import CommonTable from "@/components/ui/BaseTable";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { PiSlidersDuotone } from "react-icons/pi";
import patient from "../assets/images/patientcomponent.png";
import eye from "../assets/images/eyenotification.png";
import Reassign from "../assets/images/Reassigndoctor.png";
import active_deactive from "../assets/images/Poweractivate.png";
import edit from "../assets/images/edit.png";
import Link from "next/link";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";
import { HiOutlineDotsVertical } from "react-icons/hi";

export type ConsultationStatus = "Active" | "Deactivated" | "Discontinued";

export default function Consultation() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const [filteredData, setFilteredData] = useState(consultationData);
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

  const router = useRouter();

  const handleAddPatient = () => {
    router.push("/addpatient"); // 👈 navigate to /addpatient page
  };

  // delete function
  const handleDelete = (id: number) => {
    const updated = filteredData.filter((item) => item.id !== id);
    setFilteredData(updated);
  };
  useEffect(() => {
    let data = consultationData;

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
                  className="rounded"
                />
              )}
              {name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M16.6167 6.91806C16.346 6.76072 16.1028 6.56032 15.8967 6.32473C15.9175 5.99674 15.9956 5.67494 16.1275 5.3739C16.37 4.68973 16.6442 3.91473 16.2042 3.31223C15.7642 2.70973 14.9333 2.7289 14.2042 2.74556C13.882 2.77872 13.5565 2.75673 13.2417 2.68056C13.0739 2.40765 12.9542 2.10805 12.8875 1.79473C12.6808 1.09056 12.445 0.294731 11.7208 0.0563974C11.0225 -0.168603 10.3758 0.326397 9.80417 0.761397C9.55749 0.986663 9.27167 1.16488 8.96083 1.28723C8.64674 1.16587 8.35774 0.987613 8.10833 0.761397C7.53833 0.328897 6.89417 -0.171103 6.1925 0.0572308C5.47 0.292231 5.23417 1.09056 5.02583 1.79473C4.95928 2.10703 4.84068 2.40592 4.675 2.6789C4.3596 2.75486 4.03369 2.7774 3.71083 2.74556C2.97917 2.72556 2.155 2.7039 1.71083 3.31223C1.26667 3.92056 1.54417 4.68973 1.7875 5.37306C1.9212 5.67366 2.00049 5.99559 2.02167 6.3239C1.8159 6.55979 1.57298 6.76049 1.3025 6.91806C0.6925 7.33473 0 7.8089 0 8.5789C0 9.3489 0.6925 9.8214 1.3025 10.2397C1.57292 10.3971 1.81583 10.5975 2.02167 10.8331C2.00271 11.1612 1.92569 11.4835 1.79417 11.7847C1.5525 12.4681 1.27917 13.2431 1.71833 13.8456C2.1575 14.4481 2.98583 14.4289 3.71833 14.4122C4.04081 14.3791 4.36657 14.401 4.68167 14.4772C4.84865 14.7504 4.96812 15.0499 5.035 15.3631C5.24167 16.0672 5.4775 16.8631 6.20167 17.1014C6.31777 17.1386 6.43891 17.1577 6.56083 17.1581C7.14684 17.074 7.69149 16.8075 8.1175 16.3964C8.36417 16.1711 8.64999 15.9929 8.96083 15.8706C9.27492 15.9919 9.56392 16.1702 9.81333 16.3964C10.3842 16.8322 11.0308 17.3297 11.73 17.1006C12.4525 16.8656 12.6883 16.0672 12.8967 15.3639C12.9634 15.051 13.0829 14.7517 13.25 14.4789C13.5642 14.4024 13.8891 14.3799 14.2108 14.4122C14.9425 14.4297 15.7667 14.4539 16.2108 13.8456C16.655 13.2372 16.3775 12.4681 16.1342 11.7839C16.0014 11.4836 15.9221 11.1624 15.9 10.8347C16.1059 10.5986 16.3491 10.3979 16.62 10.2406C17.23 9.8239 17.9225 9.3489 17.9225 8.5789C17.9225 7.8089 17.2275 7.33556 16.6167 6.91806Z"
                  fill="#E29578"
                />
                <path
                  d="M8.12752 10.8711C8.04543 10.8713 7.96414 10.8551 7.88832 10.8237C7.81251 10.7922 7.74369 10.746 7.68585 10.6878L6.01918 9.0211C5.90878 8.90262 5.84868 8.74591 5.85154 8.58399C5.85439 8.42208 5.91999 8.26759 6.0345 8.15308C6.14901 8.03857 6.3035 7.97297 6.46542 7.97012C6.62733 7.96726 6.78404 8.02736 6.90252 8.13776L8.18585 9.4211L11.0859 7.2461C11.2185 7.14664 11.3851 7.10394 11.5492 7.12738C11.7133 7.15082 11.8614 7.23849 11.9609 7.3711C12.0603 7.5037 12.103 7.67039 12.0796 7.83448C12.0561 7.99858 11.9685 8.14664 11.8359 8.2461L8.50252 10.7461C8.3943 10.8272 8.26274 10.871 8.12752 10.8711Z"
                  fill="white"
                />
              </svg>
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
      header: "Pin Code",
      accessorKey: "pin",
    },
    {
      header: "Treatment",
      cell: (info) => (
        <span className="box-border-orange ">
          {info.row.original.treatment}
        </span>
      ),
    },
    {
      header: "Doctor",
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
            Meera Joshi
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M16.6167 6.91806C16.346 6.76072 16.1028 6.56032 15.8967 6.32473C15.9175 5.99674 15.9956 5.67494 16.1275 5.3739C16.37 4.68973 16.6442 3.91473 16.2042 3.31223C15.7642 2.70973 14.9333 2.7289 14.2042 2.74556C13.882 2.77872 13.5565 2.75673 13.2417 2.68056C13.0739 2.40765 12.9542 2.10805 12.8875 1.79473C12.6808 1.09056 12.445 0.294731 11.7208 0.0563974C11.0225 -0.168603 10.3758 0.326397 9.80417 0.761397C9.55749 0.986663 9.27167 1.16488 8.96083 1.28723C8.64674 1.16587 8.35774 0.987613 8.10833 0.761397C7.53833 0.328897 6.89417 -0.171103 6.1925 0.0572308C5.47 0.292231 5.23417 1.09056 5.02583 1.79473C4.95928 2.10703 4.84068 2.40592 4.675 2.6789C4.3596 2.75486 4.03369 2.7774 3.71083 2.74556C2.97917 2.72556 2.155 2.7039 1.71083 3.31223C1.26667 3.92056 1.54417 4.68973 1.7875 5.37306C1.9212 5.67366 2.00049 5.99559 2.02167 6.3239C1.8159 6.55979 1.57298 6.76049 1.3025 6.91806C0.6925 7.33473 0 7.8089 0 8.5789C0 9.3489 0.6925 9.8214 1.3025 10.2397C1.57292 10.3971 1.81583 10.5975 2.02167 10.8331C2.00271 11.1612 1.92569 11.4835 1.79417 11.7847C1.5525 12.4681 1.27917 13.2431 1.71833 13.8456C2.1575 14.4481 2.98583 14.4289 3.71833 14.4122C4.04081 14.3791 4.36657 14.401 4.68167 14.4772C4.84865 14.7504 4.96812 15.0499 5.035 15.3631C5.24167 16.0672 5.4775 16.8631 6.20167 17.1014C6.31777 17.1386 6.43891 17.1577 6.56083 17.1581C7.14684 17.074 7.69149 16.8075 8.1175 16.3964C8.36417 16.1711 8.64999 15.9929 8.96083 15.8706C9.27492 15.9919 9.56392 16.1702 9.81333 16.3964C10.3842 16.8322 11.0308 17.3297 11.73 17.1006C12.4525 16.8656 12.6883 16.0672 12.8967 15.3639C12.9634 15.051 13.0829 14.7517 13.25 14.4789C13.5642 14.4024 13.8891 14.3799 14.2108 14.4122C14.9425 14.4297 15.7667 14.4539 16.2108 13.8456C16.655 13.2372 16.3775 12.4681 16.1342 11.7839C16.0014 11.4836 15.9221 11.1624 15.9 10.8347C16.1059 10.5986 16.3491 10.3979 16.62 10.2406C17.23 9.8239 17.9225 9.3489 17.9225 8.5789C17.9225 7.8089 17.2275 7.33556 16.6167 6.91806Z"
                fill="#E29578"
              />
              <path
                d="M8.12752 10.8711C8.04543 10.8713 7.96414 10.8551 7.88832 10.8237C7.81251 10.7922 7.74369 10.746 7.68585 10.6878L6.01918 9.0211C5.90878 8.90262 5.84868 8.74591 5.85154 8.58399C5.85439 8.42208 5.91999 8.26759 6.0345 8.15308C6.14901 8.03857 6.3035 7.97297 6.46542 7.97012C6.62733 7.96726 6.78404 8.02736 6.90252 8.13776L8.18585 9.4211L11.0859 7.2461C11.2185 7.14664 11.3851 7.10394 11.5492 7.12738C11.7133 7.15082 11.8614 7.23849 11.9609 7.3711C12.0603 7.5037 12.103 7.67039 12.0796 7.83448C12.0561 7.99858 11.9685 8.14664 11.8359 8.2461L8.50252 10.7461C8.3943 10.8272 8.26274 10.871 8.12752 10.8711Z"
                fill="white"
              />
            </svg>
          </div>
          // </Link>
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
                <Dropdown.Item >
                  <Image
                    src={active_deactive}
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

          // <div className="dot-image rounded border p-1 action_component">
          //   <svg
          //     xmlns="http://www.w3.org/2000/svg"
          //     width="20"
          //     height="20"
          //     viewBox="0 0 20 20"
          //     fill="none"
          //   >
          //     <path
          //       d="M10.9375 10C10.9375 10.1854 10.8825 10.3667 10.7795 10.5208C10.6765 10.675 10.5301 10.7952 10.3588 10.8661C10.1875 10.9371 9.99896 10.9557 9.8171 10.9195C9.63525 10.8833 9.4682 10.794 9.33709 10.6629C9.20598 10.5318 9.11669 10.3648 9.08051 10.1829C9.04434 10.001 9.06291 9.81254 9.13386 9.64123C9.20482 9.46993 9.32498 9.32351 9.47915 9.2205C9.63332 9.11748 9.81458 9.0625 10 9.0625C10.2486 9.0625 10.4871 9.16127 10.6629 9.33709C10.8387 9.5129 10.9375 9.75136 10.9375 10ZM10 5.625C10.1854 5.625 10.3667 5.57002 10.5208 5.467C10.675 5.36399 10.7952 5.21757 10.8661 5.04627C10.9371 4.87496 10.9557 4.68646 10.9195 4.5046C10.8833 4.32275 10.794 4.1557 10.6629 4.02459C10.5318 3.89348 10.3648 3.80419 10.1829 3.76801C10.001 3.73184 9.81254 3.75041 9.64123 3.82136C9.46993 3.89232 9.32351 4.01248 9.2205 4.16665C9.11748 4.32082 9.0625 4.50208 9.0625 4.6875C9.0625 4.93614 9.16127 5.1746 9.33709 5.35041C9.5129 5.52623 9.75136 5.625 10 5.625ZM10 14.375C9.81458 14.375 9.63332 14.43 9.47915 14.533C9.32498 14.636 9.20482 14.7824 9.13386 14.9537C9.06291 15.125 9.04434 15.3135 9.08051 15.4954C9.11669 15.6773 9.20598 15.8443 9.33709 15.9754C9.4682 16.1065 9.63525 16.1958 9.8171 16.232C9.99896 16.2682 10.1875 16.2496 10.3588 16.1786C10.5301 16.1077 10.6765 15.9875 10.7795 15.8333C10.8825 15.6792 10.9375 15.4979 10.9375 15.3125C10.9375 15.0639 10.8387 14.8254 10.6629 14.6496C10.4871 14.4738 10.2486 14.375 10 14.375Z"
          //       fill="#2B4360"
          //     />
          //   </svg>
          // </div>
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
        <div className="d-flex align-items-center  mb-1 Consultations-image gap-3 justify-content-between">
          {/* Search Input */}
          <InputGroup
            className="custom-search-group"
            style={{ width: "350px" }}
          >
            <Form.Control
              placeholder="Search"
              className="custom-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                borderRight: "none",
                borderLeft: "1px solid rgb(221, 225, 232)",
              }}
            />
            <InputGroup.Text className="custom-search-icon">
              <IoSearch className="search-icon" />
            </InputGroup.Text>
          </InputGroup>

          <div
            className="border custom-filter-button p-2 patient-card consultations-image-summary-cards"
            style={{ width: "35%", height: "fit-content" }}
          >
            <div className="consultations-image-book d-flex align-items-center">
              <Image src={patient} alt="patients" width={40} height={40} />
              <div className="Consultations-book">98 Patients</div>
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

          <Button variant="default" onClick={handleAddPatient}>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
              >
                <path
                  d="M18.75 9.375C18.75 9.67337 18.6315 9.95952 18.4205 10.1705C18.2095 10.3815 17.9234 10.5 17.625 10.5H10.5V17.625C10.5 17.9234 10.3815 18.2095 10.1705 18.4205C9.95952 18.6315 9.67337 18.75 9.375 18.75C9.07663 18.75 8.79048 18.6315 8.5795 18.4205C8.36853 18.2095 8.25 17.9234 8.25 17.625V10.5H1.125C0.826631 10.5 0.540483 10.3815 0.329505 10.1705C0.118526 9.95952 0 9.67337 0 9.375C0 9.07663 0.118526 8.79048 0.329505 8.5795C0.540483 8.36853 0.826631 8.25 1.125 8.25H8.25V1.125C8.25 0.826631 8.36853 0.540483 8.5795 0.329505C8.79048 0.118526 9.07663 0 9.375 0C9.67337 0 9.95952 0.118526 10.1705 0.329505C10.3815 0.540483 10.5 0.826631 10.5 1.125V8.25H17.625C17.9234 8.25 18.2095 8.36853 18.4205 8.5795C18.6315 8.79048 18.75 9.07663 18.75 9.375Z"
                  fill="white"
                />
              </svg>
              Add Patient
            </div>
          </Button>
        </div>
      </div>

      {/* Table */}
      <CommonTable data={filteredData} columns={columns} />

      {/* Pagination */}
      {/* <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                <small className="text-muted">Showing {filteredData.length} of {consultationData.length} results</small>
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
