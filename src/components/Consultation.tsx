"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Col,
  Dropdown,
  Form,
  InputGroup,
  Pagination,
  Row,
} from "react-bootstrap";
import { consultationData } from "../utlis/StaticData";
import Skeleton from "react-loading-skeleton";
import DummyProfile from "@/assets/images/patient_profile.png";
import DummyDoctor from "@/assets/images/dummyimage.png";
import VerifiedIcon from "@/assets/images/verifiedreview.png";
import Image, { StaticImageData } from "next/image";
import CommonTable from "@/components/ui/BaseTable";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { PiSlidersDuotone } from "react-icons/pi";
import patient from "../assets/images/patientcomponent.png";
import eye from "../assets/images/Eye.png";
import Reassign from "../assets/images/Reassigndoctor.png";
import active_deactive from "../assets/images/Poweractivate.png";
import edit from "../assets/images/edit.png";
import Link from "next/link";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Delete from "../assets/images/Delete.png";
import { AppDispatch } from "@/utlis/redux/store";
import { useDispatch } from "react-redux";
import { setHeaderData } from "@/utlis/redux/slices/headerSlice";
import PatientAddedModal from "./PatientAddedModal";
export type ConsultationStatus = "Activate" | "Deactivated" | "Discontinued";

import {
  ReassignRequest,
  SuccessModalReassignAppointment,
} from "./form/ReassignRequest";
import {
  ActivateDeactivateProfile,
  SuccessModalActivateDeactivate,
} from "./form/ActivateDeactivateModal";
import toast from "react-hot-toast";
import { getAll } from "@/utlis/apis/apiHelper";
import { GetAllPatient } from "@/utlis/types/interfaces";
import DeleteConfirmModal from "./ui/DeleteConfirmModal";
export interface ConsultationInfo {
  id: number; // <-- ADD ID
  name: string;
  mobile: string;
  treatment: string;
  pin: string;
  status: string;
  image: string | StaticImageData;
  date?: string; // ✅ optional date field
}
export default function Consultation() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "Patients", subtitle: "Patients" }));
  }, []);
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const doctorIdShow = "6943a7e6a55e888c3f9fa264";
  const [filteredData, setFilteredData] = useState(consultationData);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [showModal, setShowModal] = useState(false);
  const [patientTotal, setPatientTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(1);
  const start = (activePage - 1) * 10;
  const end = start + 10;

  const router = useRouter();
  // const [selectedPatient, setSelectedPatient] = useState<ConsultationInfo | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<GetAllPatient | null>(
    null
  );
  // derive default activate/deactivate status
  interface FormData {
    profile: string;
    actionType: string;
    reason: string;
    additionalNote: string;
  }

  const initialFormData: FormData = {
    profile: "", // default value
    actionType: "",
    reason: "",
    additionalNote: "",
  };
  interface FormError {
    [key: string]: string;
  }
  const initialFormError: FormError = {};

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showSuccessModalBook, setShowSuccessModalBook] = useState(false);
  const [showActivedeactive, setActivedeactive] = useState(false);
  const [showactivesuccess, setShowactivesuccess] = useState(false);
  const [patientCoute, setPatientCoute] = useState<number>(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePatientId, setDeletePatientId] = useState<string | null>(null);

  const [getAllPatients, setGetAllPatients] = useState<GetAllPatient[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const handleOpenDeleteModal = (id: string) => {
    setDeletePatientId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletePatientId(null);
  };

  const handleDeletePatient = async () => {
    if (!deletePatientId) return;

    try {
      // 🔥 Call your delete API here
      // await deletePatient(deletePatientId);

      toast.success("Patient deleted successfully");
      fetchallDoctor(); // refresh table
    } catch (error) {
      toast.error("Failed to delete patient");
    } finally {
      handleCloseDeleteModal();
    }
  };

  const handleAddPatient = () => {
    router.push("/addpatient"); // Route to your Add Patient screen
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
  // delete function
  const paginatedData = getAllPatients.slice(start, end);

  const handleClose = () => setShowModal(false);
  const handleresultclose = () => {
    setShowResultModal(false);
  };
  const handleRescheduleClose = () => setShowRescheduleModal(false);
  const handleActive = (patient: GetAllPatient) => {
    setSelectedPatient(patient);
    const newProfileState: "activate" | "deactivate" =
      patient.status === "Active" ? "deactivate" : "activate";

    setFormData({
      profile: newProfileState,
      actionType: "",
      reason: "",
      additionalNote: "",
    });

    setActivedeactive(true); // 🔥 opens modal
  };

  const columns: ColumnDef<GetAllPatient>[] = [
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
        const imgSrc = info.row.original.profileImage;
        const name = info.row.original.name;
        const id = info.row.original._id; // <-- Make sure you have an `id`
        const verified = info.row.original.verified; // <-- Make sure you have a `verified` field
        const resolvedImgSrc =
          typeof imgSrc === "string" && imgSrc.trim() !== ""
            ? imgSrc
            : DummyProfile;
        return (
          <Link
            href={`/patients/${id}`}
            className="text-decoration-none text-dark"
          >
            {/* <div className="d-flex align-items-center gap-2">
              {imgSrc ? (
                typeof imgSrc === "string" ? (
                  <img
                    src={imgSrc}
                    alt={name}
                    className="rounded object-fit-cover"
                    width="40"
                    height="40"
                  />
                ) : (
                  <Image
                    src={imgSrc}
                    alt={name}
                    width={40}
                    height={40}
                    className="rounded object-fit-cover"
                  />
                )
              ) : (
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: "#ddd",
                    borderRadius: 6,
                  }}
                />
              )}
              {name}

              {verified && (
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
              )}
            </div> */}
            <div className="d-flex align-items-center gap-2">
              {typeof resolvedImgSrc === "string" ? (
                <img
                  src={resolvedImgSrc}
                  alt={name}
                  width={40}
                  height={40}
                  className="rounded object-fit-cover"
                  onError={(e) => {
                    // ✅ fallback if image fails to load
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

              <span>{name}</span>

              {verified && (
                <Image
                  src={VerifiedIcon}
                  alt="Verified"
                  width={17}
                  height={17}
                  // className="verified-badge"
                />
              )}
            </div>
          </Link>
        );
      },
    },
    {
      header: "Mobile No",
      accessorKey: "contactNumber",
    },
    {
      header: "Pincode",
      accessorKey: "pincode",
    },
    {
      header: "Treatment Plan",
      cell: (info) => <span> - </span>,
    },
    {
      header: "Doctor",
      cell: (info) => {
        const imgSrc = info.row.original.doctor?.profilePicture;
        const name = info.row.original.doctor?.name || "—";

        const verified = info.row.original.doctor?.verified;
        const resolvedImgSrc =
          typeof imgSrc === "string" && imgSrc.trim() !== ""
            ? imgSrc
            : DummyDoctor;
        return (
          <div className="d-flex align-items-center gap-2">
            {typeof resolvedImgSrc === "string" ? (
              <img
                src={resolvedImgSrc}
                alt={name}
                width={40}
                height={40}
                className="rounded object-fit-cover"
                onError={(e) => {
                  // ✅ fallback if image fails to load
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

            <span>{name}</span>

            {verified && (
              <Image
                src={VerifiedIcon}
                alt="Verified"
                width={20}
                height={20}
                // className="verified-badge"
              />
            )}
          </div>
        );
      },
    },
    {
      header: "Status",
      cell: (info) => {
        return <span> - </span>;
      },
    },
    {
      header: "Actions",
      cell: (info) => {
        const id = info.row.original._id; // <-- use id directly
        return (
          <div className="d-flex align-items-center">
            <Dropdown align="end" className="d-flex align-items-center">
              <Dropdown.Toggle
                as="button"
                id="dropdown-basic"
                className="bg-transparent border-0 p-1 no-caret "
              >
                <div className="patient-profile-dot bg-white">
                  <HiOutlineDotsVertical />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-end">
                <Dropdown.Item onClick={() => router.push(`/patients/${id}`)}>
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
                  onClick={() => router.push(`/patients/editPatient/${id}`)}
                >
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
                onClick={() => handleOpenDeleteModal(id)}
              >
                <Image src={Delete} alt="Delete" width={20} height={20} />
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  const fetchallDoctor = () => {
    const tableobj = {
      limit: 10,
      page: activePage,
    };

    setLoading(true); // start loader
    setTimeout(() => {
      getAll(tableobj)
        .then((response) => {
          if (response.data.status) {
            // console.log("response: ", response.data);
            setGetAllPatients(response.data.data);
            setPatientTotal(response.data.total);
            setTotalPages(response.data.pages);
          } else {
            console.log("Error...");
          }
        })
        .catch((err) => {
          console.log("error", err?.response);

          const apiError = err?.response?.data;

          // extract dynamic error message
          const fieldError = apiError?.details?.errors
            ? Object.values(apiError.details.errors)[0] // pick first field error
            : null;

          const message =
            fieldError ||
            apiError?.details?.message ||
            apiError?.message ||
            "Something went wrong";

          toast.error(message);
        })
        .finally(() => {
          setLoading(false); // stop loader
        });
    }, 500);
  };
  useEffect(() => {
    fetchallDoctor();
  }, []);
  useEffect(() => {
    fetchallDoctor();
  }, [activePage]);

  return (
    <div className="">
      {/* Summary Cards */}
      {/* <AppointmentSummaryCards target="patients" /> */}

      {/* Search and Filter */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3 searchbar-content">
        {/* Search Input */}
        <div className="d-flex align-items-center  mb-1 Consultations-image gap-3 justify-content-between">
          {/* Search Input */}
          {loading ? (
            <Skeleton width={350} height={45} />
          ) : (
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
          )}
          {loading ? (
            <div className="d-flex align-items-center gap-2">
              <Skeleton circle height={40} width={40} />
              <Skeleton height={20} width={120} />
            </div>
          ) : (
            <div
              className="border custom-filter-button p-2 patient-card consultations-image-summary-cards"
              style={{ width: "35%", height: "fit-content" }}
            >
              <div className="consultations-image-book d-flex align-items-center">
                <Image src={patient} alt="patients" width={40} height={40} />
                <div className="Consultations-book">
                  {patientTotal} Patients
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sort + Filter */}
        <div className="d-flex align-items-center gap-2 mb-2">
          {loading ? (
            <>
              <Skeleton width={80} />
              <Skeleton width={120} height={45} />
            </>
          ) : (
            <>
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
            </>
          )}
          {loading ? (
            <Skeleton width={45} height={45} />
          ) : (
            <div className="patient-header-filter-icon-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  d="M6.30166 10.6484V4.55469C6.30166 4.35578 6.22264 4.16501 6.08199 4.02436C5.94134 3.88371 5.75057 3.80469 5.55166 3.80469C5.35275 3.80469 5.16198 3.88371 5.02133 4.02436C4.88068 4.16501 4.80166 4.35578 4.80166 4.55469V10.6484C4.15635 10.8137 3.58438 11.189 3.17593 11.7152C2.76748 12.2414 2.54578 12.8886 2.54578 13.5547C2.54578 14.2208 2.76748 14.868 3.17593 15.3942C3.58438 15.9204 4.15635 16.2957 4.80166 16.4609V21.0547C4.80166 21.2536 4.88068 21.4444 5.02133 21.585C5.16198 21.7257 5.35275 21.8047 5.55166 21.8047C5.75057 21.8047 5.94134 21.7257 6.08199 21.585C6.22264 21.4444 6.30166 21.2536 6.30166 21.0547V16.4609C6.94697 16.2957 7.51894 15.9204 7.92739 15.3942C8.33584 14.868 8.55754 14.2208 8.55754 13.5547C8.55754 12.8886 8.33584 12.2414 7.92739 11.7152C7.51894 11.189 6.94697 10.8137 6.30166 10.6484ZM5.55166 15.0547C5.25499 15.0547 4.96498 14.9667 4.7183 14.8019C4.47163 14.6371 4.27937 14.4028 4.16584 14.1287C4.05231 13.8546 4.0226 13.553 4.08048 13.2621C4.13836 12.9711 4.28122 12.7038 4.491 12.494C4.70078 12.2842 4.96805 12.1414 5.25902 12.0835C5.54999 12.0256 5.8516 12.0553 6.12568 12.1689C6.39977 12.2824 6.63404 12.4747 6.79886 12.7213C6.96369 12.968 7.05166 13.258 7.05166 13.5547C7.05166 13.9525 6.89362 14.334 6.61232 14.6153C6.33101 14.8967 5.94948 15.0547 5.55166 15.0547ZM13.0517 6.14844V4.55469C13.0517 4.35578 12.9726 4.16501 12.832 4.02436C12.6913 3.88371 12.5006 3.80469 12.3017 3.80469C12.1027 3.80469 11.912 3.88371 11.7713 4.02436C11.6307 4.16501 11.5517 4.35578 11.5517 4.55469V6.14844C10.9063 6.31366 10.3344 6.68896 9.92593 7.21517C9.51748 7.74138 9.29578 8.38856 9.29578 9.05469C9.29578 9.72082 9.51748 10.368 9.92593 10.8942C10.3344 11.4204 10.9063 11.7957 11.5517 11.9609V21.0547C11.5517 21.2536 11.6307 21.4444 11.7713 21.585C11.912 21.7257 12.1027 21.8047 12.3017 21.8047C12.5006 21.8047 12.6913 21.7257 12.832 21.585C12.9726 21.4444 13.0517 21.2536 13.0517 21.0547V11.9609C13.697 11.7957 14.2689 11.4204 14.6774 10.8942C15.0858 10.368 15.3075 9.72082 15.3075 9.05469C15.3075 8.38856 15.0858 7.74138 14.6774 7.21517C14.2689 6.68896 13.697 6.31366 13.0517 6.14844ZM12.3017 10.5547C12.005 10.5547 11.715 10.4667 11.4683 10.3019C11.2216 10.1371 11.0294 9.9028 10.9158 9.62871C10.8023 9.35462 10.7726 9.05302 10.8305 8.76205C10.8884 8.47108 11.0312 8.20381 11.241 7.99403C11.4508 7.78425 11.7181 7.64139 12.009 7.58351C12.3 7.52563 12.6016 7.55534 12.8757 7.66887C13.1498 7.7824 13.384 7.97466 13.5489 8.22133C13.7137 8.46801 13.8017 8.75802 13.8017 9.05469C13.8017 9.45251 13.6436 9.83404 13.3623 10.1153C13.081 10.3967 12.6995 10.5547 12.3017 10.5547ZM22.0517 16.5547C22.051 15.8896 21.8298 15.2435 21.4227 14.7176C21.0155 14.1917 20.4454 13.8156 19.8017 13.6484V4.55469C19.8017 4.35578 19.7226 4.16501 19.582 4.02436C19.4413 3.88371 19.2506 3.80469 19.0517 3.80469C18.8527 3.80469 18.662 3.88371 18.5213 4.02436C18.3807 4.16501 18.3017 4.35578 18.3017 4.55469V13.6484C17.6563 13.8137 17.0844 14.189 16.6759 14.7152C16.2675 15.2414 16.0458 15.8886 16.0458 16.5547C16.0458 17.2208 16.2675 17.868 16.6759 18.3942C17.0844 18.9204 17.6563 19.2957 18.3017 19.4609V21.0547C18.3017 21.2536 18.3807 21.4444 18.5213 21.585C18.662 21.7257 18.8527 21.8047 19.0517 21.8047C19.2506 21.8047 19.4413 21.7257 19.582 21.585C19.7226 21.4444 19.8017 21.2536 19.8017 21.0547V19.4609C20.4454 19.2937 21.0155 18.9177 21.4227 18.3918C21.8298 17.8659 22.051 17.2198 22.0517 16.5547ZM19.0517 18.0547C18.755 18.0547 18.465 17.9667 18.2183 17.8019C17.9716 17.6371 17.7794 17.4028 17.6658 17.1287C17.5523 16.8546 17.5226 16.553 17.5805 16.2621C17.6384 15.9711 17.7812 15.7038 17.991 15.494C18.2008 15.2842 18.4681 15.1414 18.759 15.0835C19.05 15.0256 19.3516 15.0553 19.6257 15.1689C19.8998 15.2824 20.134 15.4747 20.2989 15.7213C20.4637 15.968 20.5517 16.258 20.5517 16.5547C20.5517 16.9525 20.3936 17.334 20.1123 17.6153C19.831 17.8967 19.4495 18.0547 19.0517 18.0547Z"
                  fill="#2B4360"
                />
              </svg>
            </div>
          )}
          {loading ? (
            <Skeleton width={130} height={45} />
          ) : (
            <Button
              variant="default"
              onClick={handleAddPatient}
              className="common-btn-blue"
            >
              <div className="d-flex justify-content-center  align-items-center gap-2">
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
          )}
        </div>
      </div>

      {/* Table */}
      {/* <CommonTable
        data={getAllPatients}
        columns={columns}
        tableTotal={patientTotal}
        totalPages={totalPages}
        loading={loading}
        setActivePage={setActivePage}
        activePage={activePage}
      /> */}
      <CommonTable
        data={paginatedData}
        columns={columns}
        tableTotal={patientTotal}
        totalPages={Math.ceil(patientTotal / 10)}
        loading={loading}
        setActivePage={setActivePage}
        activePage={activePage}
      />
      <PatientAddedModal />
      {/* activate_deactivate_modal */}
      {showActivedeactive && (
        <ActivateDeactivateProfile
          show={showActivedeactive}
          onClose={() => setActivedeactive(false)}
          setShowSuccessModal={setShowactivesuccess}
          title="Profile Activation/Deactivation"
          initialStatus={
            selectedPatient?.status === "Active"
              ? "deactivate"
              : selectedPatient?.status === "Deactivated"
              ? "activate"
              : "activate"
          }
          doctorIdShow={selectedPatient?.doctor?._id ?? null}
        />
      )}

      {/* success modal */}
      <SuccessModalActivateDeactivate
        setShowSuccessModal={setShowactivesuccess}
        showSuccessModal={showactivesuccess}
      />

      {/* reschedule modal */}
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

      {/* delete modal */}
      <DeleteConfirmModal
        show={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeletePatient}
        title="Delete"
        message="Are you sure you want to delete this patient? This action cannot be undone."
      />
    </div>
  );
}
