"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Form,
  InputGroup,
  Button,
  Pagination,
  Dropdown,
  Col,
  Row,
  ProgressBar,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import SuccessImageBookAppointment from "../../assets/images/doctor-success.png";
import { useRouter } from "next/navigation";
import { appointement, PatientsDetails } from "../../utlis/StaticData";
import Image, { StaticImageData } from "next/image";
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
import {
  InputFieldError,
  InputFieldGroup,
  InputFieldLabel,
} from "../ui/InputField";
import { appointement as defaultAppointmentData } from "../../utlis/StaticData";
import { InputSelect, InputSelectMultiSelect } from "../ui/InputSelect";
import { DatePickerFieldGroup } from "../ui/CustomDatePicker";
import { TimePickerFieldGroup } from "../ui/CustomTimePicker";
import temppatientImg1 from "@/assets/images/patient1.png";

import Textarea from "../ui/Textarea";
import { PhoneNumberInput } from "../ui/PhoneNumberInput";
import { RadioButtonGroup } from "../ui/RadioField";
export type ConsultationStatus =
  | "Confirmed"
  | "Completed"
  | "Rejected"
  | "No Show"
  | "Upcomming"
  | "Cancelled"
  | "Rescheduled"
  | "Engaged";
type AppointmentRow = {
  ProfilePhoto: { src: string } | undefined;
  id: number; // <-- ADD ID
  name: string;
  mobile: string;
  status: string;
  image: string | StaticImageData;
  time: string;
  date?: string;
  visit?: string[];
  type?: string;
  additionalNote?: string;
  for?: string;
  age?: string;
  email?: string;
};
interface Appointment extends FormData {
   ProfilePhoto: { src: string } | undefined;
  id: number; // <-- ADD ID
  name: string;
  mobile: string;
  status: string;
  image: string | StaticImageData;
  time: string;
  date?: string;
  visit?: string[];
  type?: string;
  additionalNote?: string;
  for?: string;
  age?: string;
  email?: string;
}
export default function DoctorBookAppointment() {
  const [appointmentData, setAppointmentData] = useState<appointement[]>(
    defaultAppointmentData
  );
  if (appointmentData) {
    console.log(appointmentData);
  }
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const [filteredData, setFilteredData] =
    useState<AppointmentRow[]>(appointement);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [BookAppointmentModal, setBookAppointmentModal] = useState(false);
  const [showSuccessModalBook, setShowSuccessModalBook] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<AppointmentRow | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  //   const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  // delete function
  interface FormError {
    [key: string]: string;
  }
  const initialFormError: FormError = {};

  const handleDelete = (id: number) => {
    const updated = filteredData.filter((item) => item.id !== id);
    setFilteredData(updated);
  };

  useEffect(() => {
    let data = appointement;

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
          item.time.toLowerCase().includes(q) ||
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

  const columns: ColumnDef<AppointmentRow>[] = [
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
        return (
          <Link
            href={`/doctors/${id}`}
            className="text-decoration-none text-dark"
          >
            <div className="d-flex align-items-center gap-2">
              <div
                className="position-relative"
                style={{ width: "36px", height: "36px" }}
              >
                {typeof imgSrc === "string" ? (
                  <img
                    src={imgSrc}
                    alt={typeof name === "object" ? name.name : name}
                    className="rounded-circle border"
                    width="40"
                    height="40"
                  />
                ) : (
                  <Image
                    src={imgSrc}
                    alt={typeof name === "object" ? name.name : name}
                    width={40}
                    height={40}
                    className="rounded-circle border"
                  />
                )}
              </div>
              <span>{typeof name === "object" ? name.name : name}</span>
            </div>
          </Link>
        );
      },
    },

    {
      header: "Mobile No.",
      accessorKey: "mobile",
    },
    {
      header: "Date",
      accessorKey: "date",
    },

    {
      header: "Time",
      accessorKey: "time",
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
              onClick={() => handleDelete(id)} // <-- pass id
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
  type FormData = {
    patientName(patientName: string): unknown;
    id: string; // <-- ADD ID
    name: string | { name: string; ProfilePhoto?: { src: string } };
    // name: string;
    mobile: string;
    status: string;
    image: string | StaticImageData;
    time: string;
    date?: string;
    visit?: string[];
    type?: string;
    additionalNote?: string;
    for?: string;
    email?: string;
    age?: string;
    gender?: string;
  };

  const initialFormData: FormData = {
    id: "", // <-- ADD ID
    name: "",
    mobile: "",
    status: "",
    image: "",
    time: "",
    date: "",
    visit: [],
    type: "",
    additionalNote: "",
    for: "",
    email: "",
    age: "",
    gender: "",
    patientName: function (patientName: string): unknown {
      throw new Error("Function not implemented.");
    },
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [formError, setFormError] = useState<FormError>({});
  const [step, setStep] = useState<number>(1);
  const [stepper, setStepper] = useState(1);
  const totalSteps = 2;

  const [txtPatinetName, setTxtPatinetName] = useState("");
  const [open, setOpen] = useState(false);

  const patientData = PatientsDetails;

  //  Refill form when new editData is passed
  useEffect(() => {
    if (editData) {
      setFormData({ ...initialFormData, ...editData });
    }
  }, [editData]);

  const filtered = (() => {
    if (txtPatinetName.trim().length === 0) return [];
    const matches = patientData.filter((item) =>
      item.name.toLowerCase().includes(txtPatinetName.toLowerCase())
    );
    return matches.length > 0 ? matches : patientData;
  })();

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (data: FormData): FormError => {
    const errors: FormError = {};
    if (!data.type?.trim()) errors.type = "Type is required";
    if (!data.visit?.length)
      errors.reasonForVisit = "Reason for visit is required";
    if (!data.date?.trim())
      errors.appointmentDate = "Appointment Date is required";
    if (!data.time.trim())
      errors.appointmentTime = "Appointment Time is required";
    return errors;
  };

  const validateForm2 = (data: FormData): FormError => {
    const errors: FormError = {};
    if (
      !data.name ||
      (typeof data.name === "object" && Object.keys(data.name).length === 0)
    )
      errors.patientName = "Patient is required";

    if (!data.mobile?.trim()) errors.mobile = "Phone is required"; // ✅ must match input name
    if (!data.email?.trim()) errors.email = "Email is required";
    if (!data.age?.trim()) errors.patientAge = "Patient Age is required";

    return errors;
  };

  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  const selectItem = (item: AppointmentRow) => {
    setFormData((prev: FormData) => ({
      ...prev,
      name: { name: item.name, ProfilePhoto: item.ProfilePhoto },
    }));
    setTxtPatinetName(item.name);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < filtered.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      selectItem(filtered[highlightIndex]);
    }
  };

  const handelNext = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(formData);

    setFormError(errors);
    if (Object.keys(errors).length === 0) {
      setStep(2);
      setStepper((prev) => Math.max(1, prev + 1));
    }
  };

  const handelSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const errors = validateForm2(formData);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      if (editData) {
        const updatedList: Appointment[] = appointmentData.map((item) =>
          item.id === editData.id ? { ...item, ...formData } : item
        );
        setAppointmentData(updatedList);
        setFilteredData(updatedList);
        console.log(" Appointment Updated:", formData);
      } else {
        // ✅ ADD NEW APPOINTMENT
        const nextNumericId =
          appointmentData.length > 0
            ? Math.max(...appointmentData.map((item) => Number(item.id))) + 1
            : 1;

        const nextId = nextNumericId.toString().padStart(2, "0");

        const newAppointment = {
          id: nextId, // <-- ADD ID
          name: formData.name,
          mobile: formData.mobile,
          status: "Confirmed",
          image:
            typeof formData.name === "object" && formData.name.ProfilePhoto
              ? formData.name.ProfilePhoto.src
              : temppatientImg1,
          time: formData.time,
          date: formData.date,
          visit: formData.visit,
          type: formData.type,
          additionalNote: formData.additionalNote,
          for: formData.for,
          email: formData.email,
          age: formData.age,
          gender: formData.gender,
        };

        const updatedList: Appointment[] = [...appointmentData, newAppointment];
        setAppointmentData(updatedList);
        setFilteredData(updatedList);
        console.log("✅ New Appointment Added:", newAppointment);
      }

      // ✅ Reset UI and close modal
      setFormData(initialFormData);
      setEditData(null);
      setShowSuccessModalBook(true);
      setBookAppointmentModal(false);
      setStep(1);
      setStepper(1);
    } else {
      console.warn("❌ Form validation failed:", errors);
    }
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
          {/* appointement */}
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
              <div className="Consultations-book">98 Appointments</div>
            </div>
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
            <Button variant="light" className="border custom-filter-button">
              <PiSlidersDuotone />
            </Button>
          </div>
          {/* book appointment */}
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
        </div>
      </div>

      {/* Table */}
      <CommonTable data={filteredData} columns={columns} />
      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
        <small className="text-muted">
          Showing {filteredData.length} of {appointement.length} results
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
          <>
            <div className="d-flex align-items-center mb-4">
              <div className="flex-grow-1 d-flex">
                {[...Array(totalSteps)].map((_, index) => (
                  <div key={index} className="flex-fill mx-1">
                    <ProgressBar
                      now={100}
                      className={
                        index < stepper
                          ? "progress-bar progressbar-step-success"
                          : "progress-bar progressbar-step-secondary"
                      }
                    />
                  </div>
                ))}
              </div>
              <span className="ms-2 progressbar-step">
                {step} of {totalSteps}
              </span>
            </div>

            {step === 1 && (
              <form onSubmit={handelNext}>
                <Row className="g-3">
                  <h6 className="doctor-profile-heading m-0">
                    Appointment Details
                  </h6>
                  <Col md={12}>
                    <InputFieldGroup
                      label="Appointment ID"
                      name="appointmentId"
                      type="text"
                      value={formData.id || "#1234"}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                      }}
                      onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                      placeholder="Enter Appointment ID"
                      required={true}
                      disabled={true}
                      readOnly={false}
                      error={formError.appointmentId}
                    ></InputFieldGroup>
                  </Col>
                  <Col md={12}>
                    <InputSelect
                      label="Type"
                      name="type"
                      value={formData.type}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        handleChange(e);
                      }}
                      required={true}
                      error={formError.type}
                      placeholder="Select Appointment Type"
                      options={[
                        { id: "1", value: "Follow - Up", label: "Follow - Up" },
                        { id: "2", value: "other", label: "other" },
                      ]}
                    />
                  </Col>
                  <Col md={12}>
                    <InputSelectMultiSelect
                      label="Reason for visit"
                      name="visit"
                      values={formData.visit || []}
                      onChange={(values) => {
                        setFormData((prev: FormData) => ({
                          ...prev,
                          visit: values,
                        }));
                        setFormError((prev: FormError) => ({
                          ...prev,
                          visit: "",
                        }));
                      }}
                      options={[
                        {
                          id: "1",
                          value: "Fertility Support",
                          label: "Fertility Support",
                        },
                        { id: "2", value: "IUI", label: "IUI" },
                        { id: "3", value: "IVF", label: "IVF" },
                        { id: "4", value: "ICSI", label: "ICSI" },
                        { id: "5", value: "Other", label: "Other" },
                      ]}
                      placeholder="Select Lifestyle"
                      addPlaceholder="Add Lifestyle"
                      required={true}
                      dropdownHandle={false}
                      error={formError.visit}
                    />
                  </Col>
                  <Col md={4}>
                    <DatePickerFieldGroup
                      label="Appointment Date"
                      name="date"
                      placeholder="Select Date"
                      value={formData.date}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                      }}
                      required={true}
                      error={formError.appointmentDate}
                      iconColor="var(--color-radio)"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </Col>
                  <Col md={4}>
                    <TimePickerFieldGroup
                      label="Appointment Time"
                      name="time"
                      placeholder="Select Time"
                      value={formData.time}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                      }}
                      required={true}
                      error={formError.time}
                    />
                  </Col>
                  <Col md={4}>
                    <InputSelect
                      label="For"
                      name="for"
                      value={formData.for}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        handleChange(e);
                      }}
                      required={false}
                      placeholder="Select duration"
                      options={[
                        { id: "1", value: "30minutes", label: "30minutes" },
                        { id: "2", value: "1hour", label: "1hour" },
                        { id: "3", value: "2hours", label: "2hours" },
                      ]}
                    />
                  </Col>
                  <Col md={12}>
                    <Textarea
                      label="Additional Note"
                      name="additionalNote"
                      value={formData.additionalNote ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        handleChange(e);
                      }}
                      onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {}}
                      required={false}
                      error={formError.additionalNote}
                      placeholder="Enter any additional details"
                      maxLength={100}
                    />
                  </Col>

                  <Col md={12}>
                    <div className="d-flex justify-content-end  ">
                      <Button
                        variant="default"
                        type="submit"
                        className="w-50 gap-2 common-btn-blue px-4 maiacare-button btn "
                      >
                        Next
                      </Button>
                    </div>
                  </Col>
                </Row>
              </form>
            )}

            {step === 2 && (
              <form>
                <Row className="g-3">
                  <h6 className="doctor-profile-heading m-0">
                    Patient’s Details
                  </h6>
                  <Col md={12}>
                    {formData.name && typeof formData.name === "object" ? (
                      <div className="show-patient-box d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <Image
                            className="show-patient-img"
                            src={
                              formData.name?.ProfilePhoto?.src ||
                              temppatientImg1
                            }
                            alt="doctor"
                            width={48}
                            height={48}
                          />
                          <span className="patient-treatment-box-subtitle-desc">
                            {typeof formData.name === "object"
                              ? formData.name.name
                              : formData.name}
                          </span>
                        </div>
                        <div
                          className="cursor-pointer-custom"
                          onClick={() => {
                            setFormData({ ...formData, name: {} });
                            setTxtPatinetName("");
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="29"
                            height="28"
                            viewBox="0 0 29 28"
                            fill="none"
                          >
                            <path
                              d="M23.3035 20.9465C23.5501 21.193 23.6886 21.5275 23.6886 21.8762C23.6886 22.2249 23.5501 22.5593 23.3035 22.8059C23.057 23.0524 22.7226 23.1909 22.3739 23.1909C22.0252 23.1909 21.6907 23.0524 21.4442 22.8059L14.5 15.8594L7.55355 22.8037C7.30698 23.0502 6.97256 23.1888 6.62386 23.1888C6.27516 23.1888 5.94074 23.0502 5.69417 22.8037C5.4476 22.5571 5.30908 22.2227 5.30908 21.874C5.30908 21.5253 5.4476 21.1909 5.69417 20.9443L12.6406 14.0001L5.69636 7.05366C5.44979 6.80709 5.31127 6.47268 5.31127 6.12398C5.31127 5.77528 5.44979 5.44086 5.69636 5.19429C5.94293 4.94772 6.27735 4.8092 6.62605 4.8092C6.97475 4.8092 7.30917 4.94772 7.55573 5.19429L14.5 12.1407L21.4464 5.19319C21.6929 4.94663 22.0273 4.80811 22.376 4.80811C22.7247 4.80811 23.0592 4.94663 23.3057 5.19319C23.5523 5.43976 23.6908 5.77418 23.6908 6.12288C23.6908 6.47158 23.5523 6.806 23.3057 7.05257L16.3593 14.0001L23.3035 20.9465Z"
                              fill="#B0B4C1"
                            />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="maiacare-input-field-container"
                        ref={dropdownRef}
                      >
                        <InputFieldLabel label="Name" required={true} />
                        <Form.Control
                          type="text"
                          name="patientName"
                          className="maiacare-input-field w-100"
                          placeholder="Type patient name"
                          value={txtPatinetName}
                          onChange={(e) => {
                            setTxtPatinetName(e.target.value);
                            setOpen(true);
                            setFormError((prev: FormError) => ({
                              ...prev,
                              patientName: "",
                            }));
                          }}
                          onFocus={() => {
                            if (txtPatinetName.trim().length > 0) setOpen(true);
                          }}
                          onBlur={() => setTimeout(() => setOpen(false), 150)}
                          //   onKeyDown={handleKeyDown}
                          //   onClick={() => selectItem(item)}
                        />
                        <InputFieldError error={formError.patientName} />
                        <Dropdown
                          className="custome-patient-dropdown"
                          show={open}
                        >
                          <Dropdown.Menu className="w-100 mt-1 shadow">
                            {filtered.length > 0 ? (
                              filtered.map((item, index) => (
                                <Dropdown.Item
                                  key={item.id}
                                  onClick={() => selectItem(item)} // ✅ correct place
                                  className={`d-flex align-items-center gap-2 ${
                                    index === highlightIndex ? "active" : ""
                                  }`}
                                >
                                  {item.ProfilePhoto?.src && (
                                    <Image
                                      className="show-patient-img"
                                      src={item.ProfilePhoto.src}
                                      alt={item.name}
                                      width={48}
                                      height={48}
                                    />
                                  )}
                                  <span className="settings-accordion-subtitle">
                                    {item.name}
                                  </span>
                                </Dropdown.Item>
                              ))
                            ) : (
                              <Dropdown.Item
                                disabled
                                className="text-center settings-accordion-subtitle"
                              >
                                No records found
                              </Dropdown.Item>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    )}
                  </Col>
                  <Col md={6}>
                    <PhoneNumberInput
                      label="Phone"
                      name="mobile"
                      value={formData.mobile}
                      onChange={(value: string) => {
                        setFormData((prev) => ({ ...prev, mobile: value }));
                        setFormError((prev) => ({ ...prev, mobile: "" }));
                      }}
                      required
                      error={formError.mobile}
                    />
                  </Col>
                  <Col md={6}>
                    <InputFieldGroup
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                      }}
                      onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                      placeholder="Enter Email"
                      required={true}
                      disabled={false}
                      readOnly={false}
                      error={formError.email}
                    ></InputFieldGroup>
                  </Col>
                  <Col md={12}>
                    <div className={`maiacare-input-field-container`}>
                      <InputFieldLabel label="Age" required={false} />

                      <ToggleButtonGroup
                        type="radio"
                        name="age"
                        value={formData.age}
                        onChange={(value: string) => {
                          handleChange({
                            target: { name: "age", value },
                          } as React.ChangeEvent<HTMLInputElement>);
                        }}
                        className="d-flex gap-2 flex-wrap age-select-field"
                      >
                        <ToggleButton
                          id="age-1"
                          value="below18"
                          variant="link"
                          className="age-select-item"
                        >
                          Below 18
                        </ToggleButton>
                        <ToggleButton
                          id="age-2"
                          value="18-24"
                          variant="link"
                          className="age-select-item"
                        >
                          18 – 24
                        </ToggleButton>
                        <ToggleButton
                          id="age-3"
                          value="25-35"
                          variant="link"
                          className="age-select-item"
                        >
                          25 – 35
                        </ToggleButton>
                        <ToggleButton
                          id="age-4"
                          value="36-40"
                          variant="link"
                          className="age-select-item"
                        >
                          36 – 40
                        </ToggleButton>
                        <ToggleButton
                          id="age-5"
                          value="41-50"
                          variant="link"
                          className="age-select-item"
                        >
                          41 – 50
                        </ToggleButton>
                        <ToggleButton
                          id="age-6"
                          value="50+"
                          variant="link"
                          className="age-select-item"
                        >
                          50+
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                  </Col>

                  <Col md={12}>
                    <RadioButtonGroup
                      label="Gender"
                      name="gender"
                      value={formData.gender || ""}
                      onChange={(e) => handleChange(e)}
                      required
                      options={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                        { label: "Other", value: "Other" },
                      ]}
                    />
                  </Col>
                  <div className="d-flex gap-3 mt-3">
                    <Button
                      variant="outline"
                      className="w-50 maiacare-button edit-profile-btn btn btn-dark"
                      type="button"
                      onClick={() => {
                        setStep(step - 1);
                        setStepper((prev) => Math.max(1, prev - 1));
                      }}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="default"
                      type="submit"
                      className="w-50 common-btn-blue px-4 maiacare-button btn"
                      onClick={handelSubmit}
                    >
                      {editData ? "Update" : "Submit"}
                    </Button>
                  </div>
                </Row>
              </form>
            )}
          </>
        </Modal>
        <Modal
          show={showSuccessModalBook}
          onHide={() => setShowSuccessModalBook(false)}
          closeButton={true}
        >
          <div className="text-center">
            <Image
              src={SuccessImageBookAppointment}
              alt="successImg"
              width={200}
              height={240}
            />
            <h3 className="modal-custom-header mt-2">
              Appointment Request Submitted!
            </h3>
            <p className="modal-custom-content">
              Maicare will contact you shortly to confirm your request
            </p>
          </div>

          <div className="d-flex justify-content-center gap-3">
            <Button
              variant="outline"
              className="w-100"
              onClick={() => setShowSuccessModalBook(false)}
            >
              Okay
            </Button>
            <Button
              variant="default"
              className="w-100"
              onClick={() => setShowSuccessModalBook(false)}
            >
              View Details
            </Button>
          </div>
        </Modal>
        {/* <SuccessModalBookAppointment
          showSuccessModalBook={showSuccessModalBook}
          setShowSuccessModalBook={setShowSuccessModalBook}
        /> */}
      </>
    </div>
  );
}
