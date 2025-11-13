"use client"

import { Col, Form, Row } from "react-bootstrap";
import { DatePickerFieldGroup } from "../ui/CustomDatePicker";
import { ChangeEvent, useState } from "react";
import {InputSelect} from "../ui/InputSelect";
import { InputFieldGroup } from "../ui/InputField";
import Button from "../ui/Button";
import { ScheduleTimeOff } from "../../utlis/types/interfaces";

function ScheduleTimeOffForm({
    setBlockCalendarModal,
}: {
    setBlockCalendarModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {

    const initialFormData: ScheduleTimeOff = {
        startDate: "",
        toDate: "",
        noOfDays: "",
        reason: "",
        checkbox1: false,
        additionalNote: "",
    };

    type FormError = Partial<Record<keyof ScheduleTimeOff, string>>;

    const initialFormError: FormError = {};
    const [formError, setFormError] = useState<FormError>(initialFormError);
    const [formData, setFormData] = useState<ScheduleTimeOff>(initialFormData);

    // const handleChange = (
    //     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    // ) => {
    //     const { name, value } = e.target;
    //     setFormData((prev) => ({ ...prev, [name]: value }));
    //     setFormError((prev) => ({ ...prev, [name]: "" }));
    // };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        // Narrow type for checkbox
        const checked = (e.target as HTMLInputElement).checked;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        setFormError((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validateForm = (data: ScheduleTimeOff): FormError => {
        const errors: FormError = {};
        if (!data.startDate) errors.startDate = "Start date is required";
        if (!data.toDate) errors.toDate = "To date is required";
        if (!data.noOfDays) errors.noOfDays = "No. of days is required";

        return errors;
    };

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = validateForm(formData);
        setFormError(errors);

        if (Object.keys(errors).length === 0) {
            console.log("Schedule time off sucess", formData);
            setFormError(initialFormError);
            setBlockCalendarModal(false);
        }
    };

    return (
        <>
            <form onSubmit={handelSubmit}>
                <Row className="g-3">
                    <Col md={4}>
                        <DatePickerFieldGroup
                            label="Starting from Date"
                            name="startDate"
                            placeholder="Select Start Date"
                            value={formData.startDate}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChange(e);
                            }}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                            required={true}
                            disabled={false}
                            error={formError.startDate}

                        />
                    </Col>
                    <Col md={4}>
                        <DatePickerFieldGroup
                            label="To Date"
                            name="toDate"
                            placeholder="Select Start Date"
                            value={formData.toDate}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChange(e);
                            }}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                            required={true}
                            disabled={false}
                            error={formError.toDate}

                        />
                    </Col>
                    <Col md={4}>
                        <InputSelect
                            label="No. of Days"
                            name="noOfDays"
                            value={formData.noOfDays}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                handleChange(e);
                            }}
                            onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                            required={true}
                            disabled={false}
                            error={formError.noOfDays}

                            options={[
                                { id: "1", value: "1", label: "1" },
                                { id: "2", value: "2", label: "2" },
                                { id: "3", value: "3", label: "3" },
                            ]}
                        />
                    </Col>
                    <Col md={12}>
                        <InputSelect
                            label="Reason"
                            name="reason"
                            value={formData.reason}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                handleChange(e);
                            }}
                            onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                            required={false}
                            disabled={false}
                            // error={formError.doctor}

                            options={[
                                { id: "1", value: "1", label: "Holi" },
                                { id: "2", value: "2", label: "Family reasons" },
                                { id: "3", value: "3", label: "Casual Leave" },
                                { id: "4", value: "4", label: "Sick leave" },
                                { id: "5", value: "5", label: "Other" },
                            ]}
                        />
                    </Col>
                    <Col md={12}>
                        <div className="schedule-time-off-check-box">
                            <div className="form-check d-flex gap-2 align-items-center ">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="checkbox1"
                                    id="NotifyClinicEmail"
                                    checked={formData.checkbox1}
                                    onChange={handleChange}
                                />
                                <label
                                    className="form-check-label user-select-none blood-test-box-labe mt-1"
                                    htmlFor="NotifyClinicEmail"
                                    style={{ cursor: "pointer" }}
                                >
                                    Notify clinic via email
                                </label>
                            </div>
                        </div>
                    </Col>

                    <Col md={12}>
                        <InputFieldGroup
                            label="Any additional note"
                            name="additionalNote"
                            type="text"
                            value={formData.additionalNote}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChange(e);
                            }}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                            placeholder="Enter any additional note"
                            required={false}
                            disabled={false}
                            readOnly={false}

                        />

                    </Col>
                    <div className="d-flex gap-3">
                        <Button className="w-100" variant="outline" disabled={false} onClick={() => setBlockCalendarModal(false)}>
                            Cancel
                        </Button>
                        <Button className="w-100" variant="default" disabled={false} type="submit">
                            Submit
                        </Button>
                    </div>
                </Row>
            </form>
        </>
    );
}

export default ScheduleTimeOffForm;
