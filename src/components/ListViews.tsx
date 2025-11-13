"use client";

import React, { useEffect, useState } from "react";
import {
    Form,
    InputGroup,

    Pagination,
} from "react-bootstrap";
import { inventoryData } from "../utlis/StaticData";
import Image from "next/image";
import CommonTable from "@/components/ui/BaseTable";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { PiSlidersDuotone } from "react-icons/pi";
// import "@/style/consultation.css";
import { LuTrash2, LuArrowDown } from "react-icons/lu";
// import AppointmentSummaryCards from "@/components/layout/AppointmentSummaryCards";
import Link from "next/link";
// import woman from "@/assets/images/woman.png";
import Button from "./ui/Button";
import Modal from './ui/Modal';
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
    const [BookAppointmentModal, setBookAppointmentModal] = useState(false);
    const [showSuccessModalBook, setShowSuccessModalBook] = useState(false);
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
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M16.6167 6.91806C16.346 6.76072 16.1028 6.56032 15.8967 6.32473C15.9175 5.99674 15.9956 5.67494 16.1275 5.3739C16.37 4.68973 16.6442 3.91473 16.2042 3.31223C15.7642 2.70973 14.9333 2.7289 14.2042 2.74556C13.882 2.77872 13.5565 2.75673 13.2417 2.68056C13.0739 2.40765 12.9542 2.10805 12.8875 1.79473C12.6808 1.09056 12.445 0.294731 11.7208 0.0563974C11.0225 -0.168603 10.3758 0.326397 9.80417 0.761397C9.55749 0.986663 9.27167 1.16488 8.96083 1.28723C8.64674 1.16587 8.35774 0.987613 8.10833 0.761397C7.53833 0.328897 6.89417 -0.171103 6.1925 0.0572308C5.47 0.292231 5.23417 1.09056 5.02583 1.79473C4.95928 2.10703 4.84068 2.40592 4.675 2.6789C4.3596 2.75486 4.03369 2.7774 3.71083 2.74556C2.97917 2.72556 2.155 2.7039 1.71083 3.31223C1.26667 3.92056 1.54417 4.68973 1.7875 5.37306C1.9212 5.67366 2.00049 5.99559 2.02167 6.3239C1.8159 6.55979 1.57298 6.76049 1.3025 6.91806C0.6925 7.33473 0 7.8089 0 8.5789C0 9.3489 0.6925 9.8214 1.3025 10.2397C1.57292 10.3971 1.81583 10.5975 2.02167 10.8331C2.00271 11.1612 1.92569 11.4835 1.79417 11.7847C1.5525 12.4681 1.27917 13.2431 1.71833 13.8456C2.1575 14.4481 2.98583 14.4289 3.71833 14.4122C4.04081 14.3791 4.36657 14.401 4.68167 14.4772C4.84865 14.7504 4.96812 15.0499 5.035 15.3631C5.24167 16.0672 5.4775 16.8631 6.20167 17.1014C6.31777 17.1386 6.43891 17.1577 6.56083 17.1581C7.14684 17.074 7.69149 16.8075 8.1175 16.3964C8.36417 16.1711 8.64999 15.9929 8.96083 15.8706C9.27492 15.9919 9.56392 16.1702 9.81333 16.3964C10.3842 16.8322 11.0308 17.3297 11.73 17.1006C12.4525 16.8656 12.6883 16.0672 12.8967 15.3639C12.9634 15.051 13.0829 14.7517 13.25 14.4789C13.5642 14.4024 13.8891 14.3799 14.2108 14.4122C14.9425 14.4297 15.7667 14.4539 16.2108 13.8456C16.655 13.2372 16.3775 12.4681 16.1342 11.7839C16.0014 11.4836 15.9221 11.1624 15.9 10.8347C16.1059 10.5986 16.3491 10.3979 16.62 10.2406C17.23 9.8239 17.9225 9.3489 17.9225 8.5789C17.9225 7.8089 17.2275 7.33556 16.6167 6.91806Z" fill="#E29578" />
                                <path d="M8.12752 10.8711C8.04543 10.8713 7.96414 10.8551 7.88832 10.8237C7.81251 10.7922 7.74369 10.746 7.68585 10.6878L6.01918 9.0211C5.90878 8.90262 5.84868 8.74591 5.85154 8.58399C5.85439 8.42208 5.91999 8.26759 6.0345 8.15308C6.14901 8.03857 6.3035 7.97297 6.46542 7.97012C6.62733 7.96726 6.78404 8.02736 6.90252 8.13776L8.18585 9.4211L11.0859 7.2461C11.2185 7.14664 11.3851 7.10394 11.5492 7.12738C11.7133 7.15082 11.8614 7.23849 11.9609 7.3711C12.0603 7.5037 12.103 7.67039 12.0796 7.83448C12.0561 7.99858 11.9685 8.14664 11.8359 8.2461L8.50252 10.7461C8.3943 10.8272 8.26274 10.871 8.12752 10.8711Z" fill="white" />
                            </svg> */}
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



        // {
        //     header: "Pin Code",
        //     accessorKey: "pin",
        // },



        {
            header: "Status",
            cell: (info) => {
                const row = info.row.original;
                const status = row.status;
                const statusClass = `status-${status.toLowerCase().replace(/\s/g, "")}`;

                return (
                    <div className="flex items-center gap-2">
                        <span className={`status-pill ${statusClass}`}>{status}</span>

                        {/* 👇 Show 2 SVGs only for "Rani Desai" */}
                        {row.name === "Himari Roy" && (
                            <div className="text-center d-flex">
                                {/* SVG 1 */}

                                <Button
                                    variant="light"
                                    size="sm"
                                    className="d-flex bg-white justify-content-center align-items-center border profile-card-boeder rounded Download-border me-2"
                                    onClick={() => handleDownload(`/files/${name}.pdf`, `${name}.pdf`)}
                                >


                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M17.9422 6.06754L7.9422 16.0675C7.88415 16.1256 7.81522 16.1717 7.73935 16.2032C7.66348 16.2347 7.58215 16.2508 7.50001 16.2508C7.41788 16.2508 7.33655 16.2347 7.26067 16.2032C7.1848 16.1717 7.11587 16.1256 7.05782 16.0675L2.68282 11.6925C2.56555 11.5753 2.49966 11.4162 2.49966 11.2503C2.49966 11.0845 2.56555 10.9254 2.68282 10.8082C2.8001 10.6909 2.95916 10.625 3.12501 10.625C3.29086 10.625 3.44992 10.6909 3.5672 10.8082L7.50001 14.7418L17.0578 5.18316C17.1751 5.06588 17.3342 5 17.5 5C17.6659 5 17.8249 5.06588 17.9422 5.18316C18.0595 5.30044 18.1254 5.4595 18.1254 5.62535C18.1254 5.7912 18.0595 5.95026 17.9422 6.06754Z" fill="#2ECF98" />
                                    </svg>

                                </Button>
                                <Button
                                    variant="light"
                                    size="sm"
                                    className="btn btn-sm profile-card-boeder border bg-white"

                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M16.0672 15.1832C16.1252 15.2412 16.1713 15.3102 16.2027 15.386C16.2342 15.4619 16.2503 15.5432 16.2503 15.6253C16.2503 15.7075 16.2342 15.7888 16.2027 15.8647C16.1713 15.9405 16.1252 16.0095 16.0672 16.0675C16.0091 16.1256 15.9402 16.1717 15.8643 16.2031C15.7884 16.2345 15.7071 16.2507 15.625 16.2507C15.5429 16.2507 15.4615 16.2345 15.3857 16.2031C15.3098 16.1717 15.2409 16.1256 15.1828 16.0675L9.99998 10.8839L4.81717 16.0675C4.69989 16.1848 4.54083 16.2507 4.37498 16.2507C4.20913 16.2507 4.05007 16.1848 3.93279 16.0675C3.81552 15.9503 3.74963 15.7912 3.74963 15.6253C3.74963 15.4595 3.81552 15.3004 3.93279 15.1832L9.11639 10.0003L3.93279 4.81753C3.81552 4.70026 3.74963 4.5412 3.74963 4.37535C3.74963 4.2095 3.81552 4.05044 3.93279 3.93316C4.05007 3.81588 4.20913 3.75 4.37498 3.75C4.54083 3.75 4.69989 3.81588 4.81717 3.93316L9.99998 9.11675L15.1828 3.93316C15.3001 3.81588 15.4591 3.75 15.625 3.75C15.7908 3.75 15.9499 3.81588 16.0672 3.93316C16.1844 4.05044 16.2503 4.2095 16.2503 4.37535C16.2503 4.5412 16.1844 4.70026 16.0672 4.81753L10.8836 10.0003L16.0672 15.1832Z" fill="#E85966" />
                                    </svg>
                                </Button>

                            </div>


                        )}
                    </div>
                );
            },
        }
        ,
        {
            header: "Actions",
            cell: (info) => {
                const id = info.row.original.id; // <-- use id directly
                return (
                    <div className="text-center d-flex">
                        <Button
                            variant="light"
                            size="sm"
                            className="d-flex bg-white justify-content-center align-items-center border profile-card-boeder rounded Download-border me-2"
                            onClick={() => handleDownload(`/files/${name}.pdf`, `${name}.pdf`)}
                        >
                            {/* <LuArrowDown className="arrow-down" /> */}
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.2594 3.85684L11.768 0.366217C11.6519 0.250114 11.5141 0.158014 11.3624 0.0951779C11.2107 0.0323417 11.0482 0 10.884 0C10.7198 0 10.5572 0.0323417 10.4056 0.0951779C10.2539 0.158014 10.1161 0.250114 10 0.366217L0.366412 9.99981C0.249834 10.1155 0.157407 10.2531 0.0945056 10.4048C0.0316038 10.5565 -0.000518312 10.7192 6.32418e-06 10.8834V14.3748C6.32418e-06 14.7063 0.131702 15.0243 0.366123 15.2587C0.600543 15.4931 0.918486 15.6248 1.25001 15.6248H14.375C14.5408 15.6248 14.6997 15.559 14.8169 15.4418C14.9342 15.3245 15 15.1656 15 14.9998C15 14.8341 14.9342 14.6751 14.8169 14.5579C14.6997 14.4407 14.5408 14.3748 14.375 14.3748H6.50938L15.2594 5.62481C15.3755 5.50873 15.4676 5.37092 15.5304 5.21925C15.5933 5.06757 15.6256 4.905 15.6256 4.74083C15.6256 4.57665 15.5933 4.41408 15.5304 4.26241C15.4676 4.11073 15.3755 3.97292 15.2594 3.85684ZM4.74141 14.3748H1.25001V10.8834L8.12501 4.0084L11.6164 7.49981L4.74141 14.3748ZM12.5 6.61622L9.00938 3.12481L10.8844 1.24981L14.375 4.74122L12.5 6.61622Z" fill="#2B4360" />
                            </svg>

                        </Button>
                        <Button
                            variant="light"
                            size="sm"
                            className="btn btn-sm profile-card-boeder border bg-white"
                            onClick={() => handleDelete(id)} // <-- pass id
                        >
                            <LuTrash2 className="trash" />
                        </Button>
                    </div>
                );
            },
        }
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
                    <Button variant="default" onClick={() => { setBookAppointmentModal(true) }}>
                        <div className="d-flex justify-content-center align-items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path d="M19.8016 3.42969H17.9266V3.05469C17.9266 2.75632 17.8081 2.47017 17.5971 2.25919C17.3862 2.04821 17.1 1.92969 16.8016 1.92969C16.5033 1.92969 16.2171 2.04821 16.0061 2.25919C15.7952 2.47017 15.6766 2.75632 15.6766 3.05469V3.42969H8.92664V3.05469C8.92664 2.75632 8.80811 2.47017 8.59713 2.25919C8.38615 2.04821 8.1 1.92969 7.80164 1.92969C7.50327 1.92969 7.21712 2.04821 7.00614 2.25919C6.79516 2.47017 6.67664 2.75632 6.67664 3.05469V3.42969H4.80164C4.30435 3.42969 3.82744 3.62723 3.47581 3.97886C3.12418 4.33049 2.92664 4.80741 2.92664 5.30469V20.3047C2.92664 20.802 3.12418 21.2789 3.47581 21.6305C3.82744 21.9821 4.30435 22.1797 4.80164 22.1797H19.8016C20.2989 22.1797 20.7758 21.9821 21.1275 21.6305C21.4791 21.2789 21.6766 20.802 21.6766 20.3047V5.30469C21.6766 4.80741 21.4791 4.33049 21.1275 3.97886C20.7758 3.62723 20.2989 3.42969 19.8016 3.42969ZM6.67664 5.67969C6.67664 5.97806 6.79516 6.2642 7.00614 6.47518C7.21712 6.68616 7.50327 6.80469 7.80164 6.80469C8.1 6.80469 8.38615 6.68616 8.59713 6.47518C8.80811 6.2642 8.92664 5.97806 8.92664 5.67969H15.6766C15.6766 5.97806 15.7952 6.2642 16.0061 6.47518C16.2171 6.68616 16.5033 6.80469 16.8016 6.80469C17.1 6.80469 17.3862 6.68616 17.5971 6.47518C17.8081 6.2642 17.9266 5.97806 17.9266 5.67969H19.4266V7.92969H5.17664V5.67969H6.67664ZM5.17664 19.9297V10.1797H19.4266V19.9297H5.17664Z" fill="white" />
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