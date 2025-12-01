"use client"

import { ChangeEvent, useState } from "react";
import { Col, Row } from "react-bootstrap"
import { InputFieldGroup } from "../ui/InputField";
import { MultiSelectWithCheckbox } from "../ui/InputSelect";
import Button from "../ui/Button";
import { PatientCalenderFormType } from "@/utlis/types/interfaces";

function PatientCalenderForm({
    setPatientCalendarModel
}: {
    setPatientCalendarModel: React.Dispatch<React.SetStateAction<boolean>>
}) {

    const initialFormData: PatientCalenderFormType = {
        tests: [],
        status: [],
        symptoms: [],
        additionalNote: ""
    };

    type FormError = Partial<Record<keyof PatientCalenderFormType, string>>;
    const initialFormError: FormError = {};

    const [formData, setFormData] = useState<PatientCalenderFormType>(initialFormData);
    const [formError, setFormError] = useState<FormError>(initialFormError);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormError((prev) => ({ ...prev, [name]: "" }));

        // console.log("formData : ", formData.status);
    };

    const validateForm = (data: PatientCalenderFormType): FormError => {
        const errors: FormError = {};

        // if (!data.tests.length) {
        //     errors.tests = "Tests is required";
        // }
        // if (!data.status.length) {
        //     errors.status = "Status is required";
        // }
        // if (!data.symptoms.length) {
        //     errors.symptoms = "Symptoms is required";
        // }
        // if (!data.additionalNote.trim()) {
        //     errors.additionalNote = "Additional note is required";
        // }

        return errors;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormError(errors);

        if (Object.keys(errors).length === 0) {
            
            // console.log("Form submitted:", formData);
            setPatientCalendarModel(false);
            setFormError(initialFormError);

        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Row className="g-3">
                    <Col md={12}>
                        <InputFieldGroup
                            name="searchTags"
                            type="text"
                            // value={formData.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChange(e);
                            }}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                            placeholder="Search tags"
                            required={false}
                            disabled={false}
                            readOnly={false}
                            className="position-relative blood-test-search"
                        >
                            <div className="blood-test-search-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                    <path d="M18.5677 16.8364L14.8576 13.1246C15.97 11.675 16.4893 9.85652 16.3103 8.03804C16.1312 6.21956 15.2672 4.53728 13.8934 3.33245C12.5196 2.12762 10.7389 1.49047 8.91264 1.55024C7.08635 1.61001 5.35117 2.36223 4.05909 3.65431C2.76702 4.94638 2.0148 6.68156 1.95503 8.50785C1.89526 10.3341 2.53241 12.1148 3.73724 13.4886C4.94207 14.8624 6.62435 15.7264 8.44283 15.9055C10.2613 16.0846 12.0798 15.5652 13.5294 14.4528L17.2427 18.1668C17.3299 18.254 17.4335 18.3232 17.5474 18.3704C17.6613 18.4176 17.7835 18.4419 17.9068 18.4419C18.0301 18.4419 18.1522 18.4176 18.2662 18.3704C18.3801 18.3232 18.4836 18.254 18.5708 18.1668C18.658 18.0796 18.7272 17.9761 18.7744 17.8622C18.8216 17.7482 18.8459 17.6261 18.8459 17.5028C18.8459 17.3794 18.8216 17.2573 18.7744 17.1434C18.7272 17.0294 18.658 16.9259 18.5708 16.8387L18.5677 16.8364ZM3.84193 8.74965C3.84193 7.69894 4.15351 6.67182 4.73725 5.79818C5.321 4.92455 6.1507 4.24363 7.12143 3.84154C8.09216 3.43945 9.16033 3.33424 10.1909 3.53923C11.2214 3.74421 12.168 4.25018 12.9109 4.99314C13.6539 5.73611 14.1599 6.68271 14.3649 7.71323C14.5698 8.74376 14.4646 9.81192 14.0625 10.7827C13.6605 11.7534 12.9795 12.5831 12.1059 13.1668C11.2323 13.7506 10.2051 14.0621 9.15444 14.0621C7.74592 14.0607 6.3955 13.5005 5.39953 12.5046C4.40356 11.5086 3.84338 10.1582 3.84193 8.74965Z" fill="#B0B4C1" />
                                </svg>
                            </div>
                        </InputFieldGroup>
                    </Col>

                    <Col md={6}>
                        <MultiSelectWithCheckbox
                            label="Tests"
                            name="tests"
                            placeholder="Select"
                            values={formData.tests}
                            options={[
                                { id: "1", value: "Ultrasound", label: "Ultrasound" },
                                { id: "2", value: "Blood test", label: "Blood test" },
                                { id: "3", value: "Start stimulation", label: "Start stimulation" },
                                { id: "4", value: "HCG Trigger shot", label: "HCG Trigger shot" },
                                { id: "5", value: "status 5", label: "Egg Freezing" },
                                { id: "6", value: "status 6", label: "Egg Freezing" },
                                { id: "7", value: "status 7", label: "Egg Freezing" },
                                { id: "8", value: "status 8", label: "Egg Freezing" },

                            ]}
                            required={false}

                            onChange={(tests: unknown) => {
                                handleChange({
                                    target: { name: "tests", value: tests },
                                } as React.ChangeEvent<HTMLInputElement>);
                            }}

                            dropdownHandle={false}
                            disabled={false}
                            error={formError.tests}

                        />
                    </Col>
                    <Col md={6}>
                        <MultiSelectWithCheckbox
                            label="Status"
                            name="status"
                            placeholder="Select"
                            values={formData.status}
                            options={[
                                { id: "1", value: "Ultrasound", label: "Medication changed" },
                                { id: "2", value: "Blood test", label: "Medication start" },
                                { id: "3", value: "Start stimulation", label: "Medication added" },
                                { id: "4", value: "HCG Trigger shot", label: "Medication completed" },
                                { id: "5", value: "status 5", label: "Medication reacted" },

                            ]}
                            required={false}

                            onChange={(status: unknown) => {
                                handleChange({
                                    target: { name: "status", value: status },
                                } as React.ChangeEvent<HTMLInputElement>);
                            }}

                            dropdownHandle={false}
                            disabled={false}
                            error={formError.status}

                        />
                    </Col>
                    <Col md={12}>
                        <MultiSelectWithCheckbox
                            label="Symptoms"
                            name="symptoms"
                            placeholder="Select Symptoms"
                            values={formData.symptoms}
                            options={[
                                { id: "1", value: "Ultrasound", label: "Coughing" },
                                { id: "2", value: "Blood test", label: "Cramping" },
                                { id: "3", value: "Start stimulation", label: "Spotting" },
                                { id: "4", value: "HCG Trigger shot", label: "Discharge" },
                                { id: "5", value: "status 5", label: "Bloating" },

                            ]}
                            required={false}

                            onChange={(symptoms: unknown) => {
                                handleChange({
                                    target: { name: "symptoms", value: symptoms },
                                } as React.ChangeEvent<HTMLInputElement>);
                            }}

                            dropdownHandle={false}
                            disabled={false}
                            error={formError.symptoms}

                        />
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
                            error={formError.additionalNote}
                        />
                    </Col>

                    <div className='d-flex gap-3 mt-3'>
                        <Button className="w-100" contentSize="small" variant="outline" disabled={false} onClick={() => {setPatientCalendarModel(false)}}>
                            Cancel
                        </Button>
                        <Button className="w-100" contentSize="small" variant="default" disabled={false} type="submit">
                            Save
                        </Button>
                    </div>

                </Row>
            </form>
        </>
    )
}

export default PatientCalenderForm
