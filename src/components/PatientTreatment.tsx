"use client"

import { patientTreatmentData } from "../utlis/StaticData";
import { ChangeEvent, useState } from "react";
import { Col, Row } from "react-bootstrap"
import { BsThreeDots } from "react-icons/bs";
import { InputFieldGroup } from "./ui/InputField";
import {InputSelect} from "./ui/InputSelect";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { MedicationPrescriptionForm } from "../components/form/TreatmentPlanForm";
import { MedicationPrescriptionType } from "../utlis/types/interfaces";
import TreatmentPlan from "./TreatmentPlan";

const PatientTreatment = () => {

    const [TreatmentPlanModel, setTreatmentPlanModel] = useState(false);
    const [showEditFormShowModel, setShowEditFormShowModel] = useState<boolean>(false);
    const [medicalPrescription, setMedicalPrescription] = useState<MedicationPrescriptionType[]>([]);
    const [TreatmentDetailsTempShow, setTreatmentDetailsTempShow] = useState<unknown[]>([]);
    const [medicalPrescriptionDataShowHide, setMedicalPrescriptionDataShowHide] = useState<boolean>(false);

    const [step, setStep] = useState<number | undefined>(1);
    const [stepper, setStepper] = useState<number | undefined>(1);
    const totalSteps = 3;

    const [editForm, setEditForm] = useState<MedicationPrescriptionType>({
        id: "",
        medicineName: "",
        type: "",
        typeQuantity: "",
        duration: "",
        quantity: 0,
        timeslot: ["morning"],
        meal: "Before",
        intake: "",
        description: "",
    });


    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        // setFormData((prev) => ({
        //     ...prev,
        //     [name]: value,
        // }));
        // setFormError((prev) => ({ ...prev, [name]: "" }));
    };

    return (
        <>
            <div className="d-md-flex d-sm-none justify-content-between  mb-4 mt-4">
                <InputFieldGroup
                    name="search"
                    type="text"
                    // value={formData.name}
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    //     setSearchTerm(e.target.value); /
                    // }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                    placeholder="search"
                    required={false}
                    disabled={false}
                    readOnly={false}
                    // error={formError.name}
                    className="position-relative blood-test-search patient-header-search patient-header-search-width "
                >
                    <div className="blood-test-search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <path d="M18.5677 16.8364L14.8576 13.1246C15.97 11.675 16.4893 9.85652 16.3103 8.03804C16.1312 6.21956 15.2672 4.53728 13.8934 3.33245C12.5196 2.12762 10.7389 1.49047 8.91264 1.55024C7.08635 1.61001 5.35117 2.36223 4.05909 3.65431C2.76702 4.94638 2.0148 6.68156 1.95503 8.50785C1.89526 10.3341 2.53241 12.1148 3.73724 13.4886C4.94207 14.8624 6.62435 15.7264 8.44283 15.9055C10.2613 16.0846 12.0798 15.5652 13.5294 14.4528L17.2427 18.1668C17.3299 18.254 17.4335 18.3232 17.5474 18.3704C17.6613 18.4176 17.7835 18.4419 17.9068 18.4419C18.0301 18.4419 18.1522 18.4176 18.2662 18.3704C18.3801 18.3232 18.4836 18.254 18.5708 18.1668C18.658 18.0796 18.7272 17.9761 18.7744 17.8622C18.8216 17.7482 18.8459 17.6261 18.8459 17.5028C18.8459 17.3794 18.8216 17.2573 18.7744 17.1434C18.7272 17.0294 18.658 16.9259 18.5708 16.8387L18.5677 16.8364ZM3.84193 8.74965C3.84193 7.69894 4.15351 6.67182 4.73725 5.79818C5.321 4.92455 6.1507 4.24363 7.12143 3.84154C8.09216 3.43945 9.16033 3.33424 10.1909 3.53923C11.2214 3.74421 12.168 4.25018 12.9109 4.99314C13.6539 5.73611 14.1599 6.68271 14.3649 7.71323C14.5698 8.74376 14.4646 9.81192 14.0625 10.7827C13.6605 11.7534 12.9795 12.5831 12.1059 13.1668C11.2323 13.7506 10.2051 14.0621 9.15444 14.0621C7.74592 14.0607 6.3955 13.5005 5.39953 12.5046C4.40356 11.5086 3.84338 10.1582 3.84193 8.74965Z" fill="#B0B4C1" />
                        </svg>
                    </div>
                </InputFieldGroup>

                <div className="d-flex flex-sm-row align-items-center gap-sm-3 gap-2 flex-column flex-column-revserse mt-sm-0 mt-2">
                    <div className="d-flex align-items-center gap-2">

                        <span className="sort-by-lable">Sort by:</span>
                        <InputSelect
                            label=""
                            name="tests"
                            // value={formData.tests}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                handleChange(e);
                            }}
                            onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                            required={true}
                            disabled={false}
                            placeholder="All Time"
                            className="patient-header-select-filter"
                            // error={formError.tests}
                            options={[
                                { id: "1", value: "Today", label: "Today" },
                                { id: "2", value: "Yesterday", label: "Yesterday" },
                                { id: "3", value: "tomorrow", label: "tomorrow" },
                            ]}
                        />
                        <div className="patient-header-filter-icon-box ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path d="M6.30166 10.6484V4.55469C6.30166 4.35578 6.22264 4.16501 6.08199 4.02436C5.94134 3.88371 5.75057 3.80469 5.55166 3.80469C5.35275 3.80469 5.16198 3.88371 5.02133 4.02436C4.88068 4.16501 4.80166 4.35578 4.80166 4.55469V10.6484C4.15635 10.8137 3.58438 11.189 3.17593 11.7152C2.76748 12.2414 2.54578 12.8886 2.54578 13.5547C2.54578 14.2208 2.76748 14.868 3.17593 15.3942C3.58438 15.9204 4.15635 16.2957 4.80166 16.4609V21.0547C4.80166 21.2536 4.88068 21.4444 5.02133 21.585C5.16198 21.7257 5.35275 21.8047 5.55166 21.8047C5.75057 21.8047 5.94134 21.7257 6.08199 21.585C6.22264 21.4444 6.30166 21.2536 6.30166 21.0547V16.4609C6.94697 16.2957 7.51894 15.9204 7.92739 15.3942C8.33584 14.868 8.55754 14.2208 8.55754 13.5547C8.55754 12.8886 8.33584 12.2414 7.92739 11.7152C7.51894 11.189 6.94697 10.8137 6.30166 10.6484ZM5.55166 15.0547C5.25499 15.0547 4.96498 14.9667 4.7183 14.8019C4.47163 14.6371 4.27937 14.4028 4.16584 14.1287C4.05231 13.8546 4.0226 13.553 4.08048 13.2621C4.13836 12.9711 4.28122 12.7038 4.491 12.494C4.70078 12.2842 4.96805 12.1414 5.25902 12.0835C5.54999 12.0256 5.8516 12.0553 6.12568 12.1689C6.39977 12.2824 6.63404 12.4747 6.79886 12.7213C6.96369 12.968 7.05166 13.258 7.05166 13.5547C7.05166 13.9525 6.89362 14.334 6.61232 14.6153C6.33101 14.8967 5.94948 15.0547 5.55166 15.0547ZM13.0517 6.14844V4.55469C13.0517 4.35578 12.9726 4.16501 12.832 4.02436C12.6913 3.88371 12.5006 3.80469 12.3017 3.80469C12.1027 3.80469 11.912 3.88371 11.7713 4.02436C11.6307 4.16501 11.5517 4.35578 11.5517 4.55469V6.14844C10.9063 6.31366 10.3344 6.68896 9.92593 7.21517C9.51748 7.74138 9.29578 8.38856 9.29578 9.05469C9.29578 9.72082 9.51748 10.368 9.92593 10.8942C10.3344 11.4204 10.9063 11.7957 11.5517 11.9609V21.0547C11.5517 21.2536 11.6307 21.4444 11.7713 21.585C11.912 21.7257 12.1027 21.8047 12.3017 21.8047C12.5006 21.8047 12.6913 21.7257 12.832 21.585C12.9726 21.4444 13.0517 21.2536 13.0517 21.0547V11.9609C13.697 11.7957 14.2689 11.4204 14.6774 10.8942C15.0858 10.368 15.3075 9.72082 15.3075 9.05469C15.3075 8.38856 15.0858 7.74138 14.6774 7.21517C14.2689 6.68896 13.697 6.31366 13.0517 6.14844ZM12.3017 10.5547C12.005 10.5547 11.715 10.4667 11.4683 10.3019C11.2216 10.1371 11.0294 9.9028 10.9158 9.62871C10.8023 9.35462 10.7726 9.05302 10.8305 8.76205C10.8884 8.47108 11.0312 8.20381 11.241 7.99403C11.4508 7.78425 11.7181 7.64139 12.009 7.58351C12.3 7.52563 12.6016 7.55534 12.8757 7.66887C13.1498 7.7824 13.384 7.97466 13.5489 8.22133C13.7137 8.46801 13.8017 8.75802 13.8017 9.05469C13.8017 9.45251 13.6436 9.83404 13.3623 10.1153C13.081 10.3967 12.6995 10.5547 12.3017 10.5547ZM22.0517 16.5547C22.051 15.8896 21.8298 15.2435 21.4227 14.7176C21.0155 14.1917 20.4454 13.8156 19.8017 13.6484V4.55469C19.8017 4.35578 19.7226 4.16501 19.582 4.02436C19.4413 3.88371 19.2506 3.80469 19.0517 3.80469C18.8527 3.80469 18.662 3.88371 18.5213 4.02436C18.3807 4.16501 18.3017 4.35578 18.3017 4.55469V13.6484C17.6563 13.8137 17.0844 14.189 16.6759 14.7152C16.2675 15.2414 16.0458 15.8886 16.0458 16.5547C16.0458 17.2208 16.2675 17.868 16.6759 18.3942C17.0844 18.9204 17.6563 19.2957 18.3017 19.4609V21.0547C18.3017 21.2536 18.3807 21.4444 18.5213 21.585C18.662 21.7257 18.8527 21.8047 19.0517 21.8047C19.2506 21.8047 19.4413 21.7257 19.582 21.585C19.7226 21.4444 19.8017 21.2536 19.8017 21.0547V19.4609C20.4454 19.2937 21.0155 18.9177 21.4227 18.3918C21.8298 17.8659 22.051 17.2198 22.0517 16.5547ZM19.0517 18.0547C18.755 18.0547 18.465 17.9667 18.2183 17.8019C17.9716 17.6371 17.7794 17.4028 17.6658 17.1287C17.5523 16.8546 17.5226 16.553 17.5805 16.2621C17.6384 15.9711 17.7812 15.7038 17.991 15.494C18.2008 15.2842 18.4681 15.1414 18.759 15.0835C19.05 15.0256 19.3516 15.0553 19.6257 15.1689C19.8998 15.2824 20.134 15.4747 20.2989 15.7213C20.4637 15.968 20.5517 16.258 20.5517 16.5547C20.5517 16.9525 20.3936 17.334 20.1123 17.6153C19.831 17.8967 19.4495 18.0547 19.0517 18.0547Z" fill="#2B4360" />
                            </svg>
                        </div>
                    </div>

                    <Button variant="default" onClick={() => { setTreatmentPlanModel(true) }}>
                        <div className="d-flex justify-content-center align-items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H10.9375V16.875C10.9375 17.1236 10.8387 17.3621 10.6629 17.5379C10.4871 17.7137 10.2486 17.8125 10 17.8125C9.75136 17.8125 9.5129 17.7137 9.33709 17.5379C9.16127 17.3621 9.0625 17.1236 9.0625 16.875V10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H9.0625V3.125C9.0625 2.87636 9.16127 2.6379 9.33709 2.46209C9.5129 2.28627 9.75136 2.1875 10 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z" fill="#FFFFFF" />
                            </svg>
                            Start New Treatment
                        </div>

                    </Button>
                </div>
            </div>

            <div className="d-md-none d-sm-flex d-none flex-column align-items-sm-start align-items-center gap-3 mt-3 mb-3">
                <div className="d-flex align-items-center justify-content-sm-start justify-content-center flex-wrap gap-3 w-100">
                    <div className="patient-header-search-width">
                        <InputFieldGroup
                            name="search"
                            type="text"
                            // value={formData.name}
                            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            //     setSearchTerm(e.target.value); /
                            // }}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                            placeholder="search"
                            required={false}
                            disabled={false}
                            readOnly={false}
                            // error={formError.name}
                            className="position-relative blood-test-search patient-header-search w-100"
                        >
                            <div className="blood-test-search-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                    <path d="M18.5677 16.8364L14.8576 13.1246C15.97 11.675 16.4893 9.85652 16.3103 8.03804C16.1312 6.21956 15.2672 4.53728 13.8934 3.33245C12.5196 2.12762 10.7389 1.49047 8.91264 1.55024C7.08635 1.61001 5.35117 2.36223 4.05909 3.65431C2.76702 4.94638 2.0148 6.68156 1.95503 8.50785C1.89526 10.3341 2.53241 12.1148 3.73724 13.4886C4.94207 14.8624 6.62435 15.7264 8.44283 15.9055C10.2613 16.0846 12.0798 15.5652 13.5294 14.4528L17.2427 18.1668C17.3299 18.254 17.4335 18.3232 17.5474 18.3704C17.6613 18.4176 17.7835 18.4419 17.9068 18.4419C18.0301 18.4419 18.1522 18.4176 18.2662 18.3704C18.3801 18.3232 18.4836 18.254 18.5708 18.1668C18.658 18.0796 18.7272 17.9761 18.7744 17.8622C18.8216 17.7482 18.8459 17.6261 18.8459 17.5028C18.8459 17.3794 18.8216 17.2573 18.7744 17.1434C18.7272 17.0294 18.658 16.9259 18.5708 16.8387L18.5677 16.8364ZM3.84193 8.74965C3.84193 7.69894 4.15351 6.67182 4.73725 5.79818C5.321 4.92455 6.1507 4.24363 7.12143 3.84154C8.09216 3.43945 9.16033 3.33424 10.1909 3.53923C11.2214 3.74421 12.168 4.25018 12.9109 4.99314C13.6539 5.73611 14.1599 6.68271 14.3649 7.71323C14.5698 8.74376 14.4646 9.81192 14.0625 10.7827C13.6605 11.7534 12.9795 12.5831 12.1059 13.1668C11.2323 13.7506 10.2051 14.0621 9.15444 14.0621C7.74592 14.0607 6.3955 13.5005 5.39953 12.5046C4.40356 11.5086 3.84338 10.1582 3.84193 8.74965Z" fill="#B0B4C1" />
                                </svg>
                            </div>
                        </InputFieldGroup>
                    </div>
                    <Button variant="default" onClick={() => { setTreatmentPlanModel }}>
                        <div className="d-flex justify-content-center align-items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H10.9375V16.875C10.9375 17.1236 10.8387 17.3621 10.6629 17.5379C10.4871 17.7137 10.2486 17.8125 10 17.8125C9.75136 17.8125 9.5129 17.7137 9.33709 17.5379C9.16127 17.3621 9.0625 17.1236 9.0625 16.875V10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H9.0625V3.125C9.0625 2.87636 9.16127 2.6379 9.33709 2.46209C9.5129 2.28627 9.75136 2.1875 10 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z" fill="#FFFFFF" />
                            </svg>
                            Start New Treatment
                        </div>
                    </Button>
                </div>
                <div className="d-flex flex-wrap align-items-center gap-3">
                    <span className="sort-by-lable">Sort by:</span>
                    <InputSelect
                        label=""
                        name="tests"
                        // value={formData.tests}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            handleChange(e);
                        }}
                        onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                        required={true}
                        disabled={false}
                        placeholder="All Time"
                        className="patient-header-select-filter"
                        // error={formError.tests}
                        options={[
                            { id: "1", value: "Today", label: "Today" },
                            { id: "2", value: "Yesterday", label: "Yesterday" },
                            { id: "3", value: "tomorrow", label: "tomorrow" },
                        ]}
                    />
                    <div className="patient-header-filter-icon-box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M6.30166 10.6484V4.55469C6.30166 4.35578 6.22264 4.16501 6.08199 4.02436C5.94134 3.88371 5.75057 3.80469 5.55166 3.80469C5.35275 3.80469 5.16198 3.88371 5.02133 4.02436C4.88068 4.16501 4.80166 4.35578 4.80166 4.55469V10.6484C4.15635 10.8137 3.58438 11.189 3.17593 11.7152C2.76748 12.2414 2.54578 12.8886 2.54578 13.5547C2.54578 14.2208 2.76748 14.868 3.17593 15.3942C3.58438 15.9204 4.15635 16.2957 4.80166 16.4609V21.0547C4.80166 21.2536 4.88068 21.4444 5.02133 21.585C5.16198 21.7257 5.35275 21.8047 5.55166 21.8047C5.75057 21.8047 5.94134 21.7257 6.08199 21.585C6.22264 21.4444 6.30166 21.2536 6.30166 21.0547V16.4609C6.94697 16.2957 7.51894 15.9204 7.92739 15.3942C8.33584 14.868 8.55754 14.2208 8.55754 13.5547C8.55754 12.8886 8.33584 12.2414 7.92739 11.7152C7.51894 11.189 6.94697 10.8137 6.30166 10.6484ZM5.55166 15.0547C5.25499 15.0547 4.96498 14.9667 4.7183 14.8019C4.47163 14.6371 4.27937 14.4028 4.16584 14.1287C4.05231 13.8546 4.0226 13.553 4.08048 13.2621C4.13836 12.9711 4.28122 12.7038 4.491 12.494C4.70078 12.2842 4.96805 12.1414 5.25902 12.0835C5.54999 12.0256 5.8516 12.0553 6.12568 12.1689C6.39977 12.2824 6.63404 12.4747 6.79886 12.7213C6.96369 12.968 7.05166 13.258 7.05166 13.5547C7.05166 13.9525 6.89362 14.334 6.61232 14.6153C6.33101 14.8967 5.94948 15.0547 5.55166 15.0547ZM13.0517 6.14844V4.55469C13.0517 4.35578 12.9726 4.16501 12.832 4.02436C12.6913 3.88371 12.5006 3.80469 12.3017 3.80469C12.1027 3.80469 11.912 3.88371 11.7713 4.02436C11.6307 4.16501 11.5517 4.35578 11.5517 4.55469V6.14844C10.9063 6.31366 10.3344 6.68896 9.92593 7.21517C9.51748 7.74138 9.29578 8.38856 9.29578 9.05469C9.29578 9.72082 9.51748 10.368 9.92593 10.8942C10.3344 11.4204 10.9063 11.7957 11.5517 11.9609V21.0547C11.5517 21.2536 11.6307 21.4444 11.7713 21.585C11.912 21.7257 12.1027 21.8047 12.3017 21.8047C12.5006 21.8047 12.6913 21.7257 12.832 21.585C12.9726 21.4444 13.0517 21.2536 13.0517 21.0547V11.9609C13.697 11.7957 14.2689 11.4204 14.6774 10.8942C15.0858 10.368 15.3075 9.72082 15.3075 9.05469C15.3075 8.38856 15.0858 7.74138 14.6774 7.21517C14.2689 6.68896 13.697 6.31366 13.0517 6.14844ZM12.3017 10.5547C12.005 10.5547 11.715 10.4667 11.4683 10.3019C11.2216 10.1371 11.0294 9.9028 10.9158 9.62871C10.8023 9.35462 10.7726 9.05302 10.8305 8.76205C10.8884 8.47108 11.0312 8.20381 11.241 7.99403C11.4508 7.78425 11.7181 7.64139 12.009 7.58351C12.3 7.52563 12.6016 7.55534 12.8757 7.66887C13.1498 7.7824 13.384 7.97466 13.5489 8.22133C13.7137 8.46801 13.8017 8.75802 13.8017 9.05469C13.8017 9.45251 13.6436 9.83404 13.3623 10.1153C13.081 10.3967 12.6995 10.5547 12.3017 10.5547ZM22.0517 16.5547C22.051 15.8896 21.8298 15.2435 21.4227 14.7176C21.0155 14.1917 20.4454 13.8156 19.8017 13.6484V4.55469C19.8017 4.35578 19.7226 4.16501 19.582 4.02436C19.4413 3.88371 19.2506 3.80469 19.0517 3.80469C18.8527 3.80469 18.662 3.88371 18.5213 4.02436C18.3807 4.16501 18.3017 4.35578 18.3017 4.55469V13.6484C17.6563 13.8137 17.0844 14.189 16.6759 14.7152C16.2675 15.2414 16.0458 15.8886 16.0458 16.5547C16.0458 17.2208 16.2675 17.868 16.6759 18.3942C17.0844 18.9204 17.6563 19.2957 18.3017 19.4609V21.0547C18.3017 21.2536 18.3807 21.4444 18.5213 21.585C18.662 21.7257 18.8527 21.8047 19.0517 21.8047C19.2506 21.8047 19.4413 21.7257 19.582 21.585C19.7226 21.4444 19.8017 21.2536 19.8017 21.0547V19.4609C20.4454 19.2937 21.0155 18.9177 21.4227 18.3918C21.8298 17.8659 22.051 17.2198 22.0517 16.5547ZM19.0517 18.0547C18.755 18.0547 18.465 17.9667 18.2183 17.8019C17.9716 17.6371 17.7794 17.4028 17.6658 17.1287C17.5523 16.8546 17.5226 16.553 17.5805 16.2621C17.6384 15.9711 17.7812 15.7038 17.991 15.494C18.2008 15.2842 18.4681 15.1414 18.759 15.0835C19.05 15.0256 19.3516 15.0553 19.6257 15.1689C19.8998 15.2824 20.134 15.4747 20.2989 15.7213C20.4637 15.968 20.5517 16.258 20.5517 16.5547C20.5517 16.9525 20.3936 17.334 20.1123 17.6153C19.831 17.8967 19.4495 18.0547 19.0517 18.0547Z" fill="#2B4360" />
                        </svg>
                    </div>
                </div>

            </div>

            <div className="mt-4">
                <Row className="g-3">
                    {patientTreatmentData.map((item, index) => (
                        <Col lg={4} md={6} key={index}>
                            <div className={item.status === "Ongoing" ? "patient-treatment-box" : "patient-treatment-status-completed-box"}>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex gap-3">
                                        <h6 className="patient-treatment-box-title">{item.title}</h6>
                                        <span className={item.status === "Ongoing" ? "patient-treatment-status-Ongoing" : "patient-treatment-status-Completed"}>{item.status}</span>
                                    </div>

                                    <div className="patient-treatment-box-dot-btn">
                                        <BsThreeDots />
                                    </div>

                                </div>
                                <Row className="mt-1 g-3 ">

                                    <Col sm={6} className="col-6 col-sm-6">
                                        <div>
                                            <p className="patient-treatment-box-subtitle m-0 mb-1">Start Date</p>
                                            <p className="patient-treatment-box-subtitle-desc m-0">{item.startDate}</p>
                                        </div>
                                        <div className="mt-3">
                                            <p className="patient-treatment-box-subtitle m-0 mt-2 mb-1">Fees</p>
                                            <p className="patient-treatment-box-subtitle-desc-fees m-0">{item.fees}</p>
                                        </div>
                                    </Col>
                                    <Col sm={6} className="col-6 col-sm-6">
                                        <div>
                                            <p className="patient-treatment-box-subtitle m-0 mb-1">Expected End Date</p>
                                            <p className="patient-treatment-box-subtitle-desc m-0">{item.endDate}</p>
                                        </div>
                                        <div className="mt-3">
                                            <p className="patient-treatment-box-subtitle m-0 mb-1">Amount Status</p>
                                            <span className={item.amountStatus === "Half Paid" ? "patient-treatment-box-subtitle-desc-half-paid m-0" : "patient-treatment-box-subtitle-desc-paid m-0"}>{item.amountStatus}</span>
                                        </div>
                                    </Col>

                                </Row>
                            </div>
                        </Col>
                    ))}
                </Row>


            </div>



            <Modal
                show={TreatmentPlanModel}
                onHide={() => { setTreatmentPlanModel(false); setStep(1); setStepper(1); setMedicalPrescription([]); }}
                header="Treatment Plan"
                closeButton={true}
            >
                <TreatmentPlan
                    setEditForm={setEditForm}
                    editForm={editForm}
                    setTreatmentPlanModel={setTreatmentPlanModel}
                    setShowEditFormShowModel={setShowEditFormShowModel}
                    showEditFormShowModel={showEditFormShowModel}
                    setStep={setStep}
                    setStepper={setStepper}
                    step={step}
                    stepper={stepper}
                    totalSteps={totalSteps}
                    setMedicalPrescription={setMedicalPrescription}
                    medicalPrescription={medicalPrescription}
                    setTreatmentDetailsTempShow={setTreatmentDetailsTempShow}
                    setMedicalPrescriptionDataShowHide={setMedicalPrescriptionDataShowHide}
                    medicalPrescriptionDataShowHide={medicalPrescriptionDataShowHide}
                />
            </Modal>

            {/* edit time show model for Medication & Tests */}
            <Modal
                show={showEditFormShowModel}
                onHide={() => { setShowEditFormShowModel(false); setTreatmentPlanModel(true); setMedicalPrescriptionDataShowHide(false); }}
                header="Edit Medication Prescription"
                closeButton={true}
            >
                <MedicationPrescriptionForm
                    setShowEditFormShowModel={setShowEditFormShowModel}
                    editForm={editForm}
                    setTreatmentPlanModel={setTreatmentPlanModel}
                    setMedicalPrescription={setMedicalPrescription}
                    medicalPrescription={medicalPrescription}
                    setMedicalPrescriptionDataShowHide={setMedicalPrescriptionDataShowHide}
                    medicalPrescriptionDataShowHide={medicalPrescriptionDataShowHide}
                />
            </Modal>
        </>
    )
}

export default PatientTreatment