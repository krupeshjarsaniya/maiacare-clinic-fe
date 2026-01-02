"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  InputGroup,
  Button,
  Pagination,
  Dropdown,
  Col,
  Row,
} from "react-bootstrap";
import { useRouter } from "next/navigation";
import { DoctorData } from "../utlis/StaticData";
import Image, { StaticImageData } from "next/image";
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
import DoctorAddedModal from "./DoctorAddedModel";
import eye from "../assets/images/Eye.png";
import Poweractivate from "../assets/images/Poweractivate.png";
import DummyProfile from "@/assets/images/dummyimage.png";
import { setHeaderData } from "@/utlis/redux/slices/headerSlice";
import { AppDispatch } from "@/utlis/redux/store";

import { useDispatch } from "react-redux";
import {
  ActivateDeactivateProfile,
  SuccessModalActivateDeactivate,
} from "./form/ActivateDeactivateModal";
import { getDoctorsList } from "@/utlis/apis/apiHelper";
import { formatDateTime, formatDate } from "@/utlis/Helper";
import Skeleton from "react-loading-skeleton";
export type ConsultationStatus = "Active" | "Deactive" | "On Leave";

export type Doctor = {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  image: string | StaticImageData;
  date: string;
  specialisation: string;
  pin: string;
  status: ConsultationStatus;
  verified?: boolean;
};
export default function Doctor() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "Doctors", subtitle: "Doctors" }));
  }, []);
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const [filteredData, setFilteredData] = useState(DoctorData);
  const [doctorTotal, setDoctorTotal] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(1);
  const start = (activePage - 1) * 10;
  const end = start + 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [showActivateDeactivateModal, setShowActivateDeactivateModal] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const limit = 10;
  const fetchDoctors = async () => {
    try {
      setLoading(true);

      const response = await getDoctorsList({
        limit,
        page,
        search: searchQuery || undefined,
        status:
          filter === "active"
            ? "Active"
            : filter === "cancelled"
            ? "Deactive"
            : undefined,
      });

      const apiDoctors = response.data.data.doctors;

      const mappedDoctors: Doctor[] = apiDoctors.map((doc: any) => ({
        id: doc._id,
        name: doc.name,
        email: doc.email,
        mobile: doc.contactNumber,
        image: doc.profilePicture,
        date: formatDate(doc.memberSince),
        specialisation: doc.specialty,
        status: doc.status,
        verified: doc.verified,
      }));

      setDoctors(mappedDoctors);
    } catch (error) {
      console.error("Failed to fetch doctors", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [page, searchQuery, filter]);

  const columns: ColumnDef<Doctor>[] = [
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

               
                {isVerified && (
                  <Image
                    src={VerifiedIcon}
                    alt="Verified"
                    width={17}
                    height={17}
                    className="verified-badge"
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
                    className="rounded-circle position-relative border"
                    width={40}
                    height={40}
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
    // {
    //   header: "Status",
    //   cell: (info) => {
    //     const status = info.row.original.status;
    //     const statusClass = `status-${status.toLowerCase().replace(/\s/g, "")}`;
    //     return <span className={`status-pill ${statusClass}`}>{status}</span>;
    //   },
    // },
    {
      header: "Status",
      cell: (info) => {
        const status = info.row.original.status;
        const statusClass = `status-${status.toLowerCase()}`;
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
                <Dropdown.Item
                  onClick={() => router.push(`/doctors/editdoctor/${id}`)}
                  //  onClick={() => router.push(`/doctors/${id}`)}
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
                {/* <Dropdown.Item
                  onClick={() => setShowActivateDeactivateModal(true)}
                >
                  <Image
                    src={Poweractivate}
                    alt="Poweractivate"
                    width={18}
                    height={18}
                    className="me-2"
                  />
                  Activate/Deactivate
                </Dropdown.Item> */}
                <Dropdown.Item
                  onClick={() => {
                    setSelectedDoctorId(id!);
                    setShowActivateDeactivateModal(true);
                  }}
                >
                  <Image
                    src={Poweractivate}
                    alt="Poweractivate"
                    width={18}
                    height={18}
                    className="me-2"
                  />
                  Activate / Deactivate
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
          {loading ? (
            <div className="d-flex align-items-center gap-2">
              <Skeleton circle height={40} width={40} />
              <Skeleton height={20} width={120} />
            </div>
          ) : (
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
          )}

          {/* Search Input */}
          <div className="d-flex align-items-center gap-2 mb-1 Consultations-image">
            {loading ? (
              <Skeleton width={350} height={45} />
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
                  placeholder="Search Doctors"
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
              </Form.Select>{" "}
            </>
          )}
          {loading ? (
            <Skeleton width={45} height={45} />
          ) : (
            <Button variant="light" className="border custom-filter-button">
              <PiSlidersDuotone />
            </Button>
          )}
          {loading ? (
            <Skeleton width={130} height={45} />
          ) : (
            <Button
              onClick={() => router.push("/addDoctor")}
              className="d-flex align-items-center gap-2 add_doctor common-btn-blue"
            >
              <Image src={add} alt="add" width={15} height={15} />
              Add New Doctor
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <CommonTable
        data={doctors}
        columns={columns}
        tableTotal={doctorTotal}
        totalPages={Math.ceil(doctorTotal / 10)}
        loading={loading}
        setActivePage={setActivePage}
        activePage={activePage}
      />

      <DoctorAddedModal />
      {/* <ActivateDeactivateProfile
        show={showActivateDeactivateModal}
        onClose={() => setShowActivateDeactivateModal(false)}
        setShowSuccessModal={setShowSuccessModal}
        doctorIdShow={doctorIdShow} // pass real doctor id
        title="Activate / Deactivate Profile"
      /> */}
      <ActivateDeactivateProfile
        show={showActivateDeactivateModal}
        onClose={() => setShowActivateDeactivateModal(false)}
        doctorIdShow={selectedDoctorId}
        setShowSuccessModal={setShowSuccessModal}
        onStatusChange={(newStatus) => {
          setDoctors((prev) =>
            prev.map((doc) =>
              doc.id === selectedDoctorId ? { ...doc, status: newStatus } : doc
            )
          );
        }}
      />
      <SuccessModalActivateDeactivate
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
      />
    </div>
  );
}
