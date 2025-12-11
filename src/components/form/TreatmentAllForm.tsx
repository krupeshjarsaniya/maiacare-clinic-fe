"use client";

import {
  EditTreatmentPlanType,
  FertilityAssessmentFormType,
  FertilityAssessmentHistory,
  MedicationPrescriptionType,
  PatientType,
  ProgressUpdatesType,
  TreatmentFertilityAssessmentFormType,
  TreatmentForm,
  TreatmentPlanEditType,
  TreatmentProgressStatusType,
  TreatmentTerminationType,
} from "../../utlis/types/interfaces";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Accordion, Col, Dropdown, Form, Row } from "react-bootstrap";
import { InputSelect } from "../ui/InputSelect";
import { PatientsDetails, TempTreatmentSteps } from "../../utlis/StaticData";
import Button from "../ui/Button";
import {
  InputFieldError,
  InputFieldGroup,
  InputFieldLabel,
} from "../ui/InputField";
import Image from "next/image";
import temppatientImg1 from "@/assets/images/patient1.png";
import Modal from "../ui/Modal";
import TreatmentSuccessImage from "@/assets/images/TreatmentAddedSuccess.png";
import TerminationSuccessImage from "@/assets/images/TreatmentTermination.png";
import { DatePickerFieldGroup } from "../ui/CustomDatePicker";
import { RadioButtonGroup } from "../ui/RadioField";
import toast from "react-hot-toast";
import { BsInfoCircle } from "react-icons/bs";
import Textarea from "../ui/Textarea";

interface TreatmentPatientFormProps {
  setStep: React.Dispatch<React.SetStateAction<number | undefined>>;
  setStepper: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface FertilityAssessmentFormProps {
  setShowFertilityAssessment?: React.Dispatch<React.SetStateAction<boolean>>;
  setModalFormFertilityData?: React.Dispatch<
    React.SetStateAction<ProgressUpdatesType>
  >;
  setActiveTab?: React.Dispatch<React.SetStateAction<string>>;
  editProgressUpdatesData?: ProgressUpdatesType;
}

export function TreatmentPatientForm({
  setStep,
  setStepper,
}: TreatmentPatientFormProps) {
  const initialFormData: TreatmentForm = {
    patientName: null,
    treatment: "",
    duration: "",
  };

  type FormError = Partial<Record<keyof TreatmentForm, string>>;
  const initialFormError: FormError = {};

  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [formData, setFormData] = useState<TreatmentForm>(initialFormData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  const [txtPatinetName, setTxtPatinetName] = useState("");
  const [open, setOpen] = useState(false);

  const patientData = PatientsDetails;
  const filtered = (() => {
    if (txtPatinetName.trim().length === 0) return [];
    const matches = patientData.filter((item) =>
      item.name.toLowerCase().includes(txtPatinetName.toLowerCase())
    );
    return matches.length > 0 ? matches : patientData;
  })();

  const validateForm = (data: TreatmentForm): FormError => {
    const errors: FormError = {};

    if (!data.patientName) {
      errors.patientName = "Patient is required";
    }

    if (!data.treatment || data.treatment.trim() === "") {
      errors.treatment = "Treatment is required";
    }
    if (!data.duration || data.duration.trim() === "") {
      errors.duration = "Duration is required";
    }
    return errors;
  };

  const handlePatientNameSelect = (item: PatientType) => {
    setFormData((prev) => ({
      ...prev,
      patientName: item,
    }));
    setFormError((prev) => ({ ...prev, patientName: "" }));
  };
  const handelNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm(formData);
    setFormError(errors);
    // console.log("errors", errors);

    if (Object.keys(errors).length === 0) {
      // setStep((prev: number ) => prev + 1);
      setStep((prev) => (prev ?? 0) + 1);
      setStepper((prev) => (prev ?? 0) + 1);
      setFormError(initialFormError);
    }
  };

  return (
    <>
      <form onSubmit={handelNext}>
        <Row className="g-3">
          <h6 className="dashboard-chart-heading mb-0">Treatment Plan</h6>

          <Col md={12}>
            {formData.patientName ? (
              <div className="show-patient-box d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <Image
                    className="show-patient-img"
                    src={
                      formData.patientName?.ProfilePhoto?.src || temppatientImg1
                    }
                    alt="doctor"
                    width={48}
                    height={48}
                  />
                  <span className="patient-treatment-box-subtitle-desc">
                    {formData.patientName?.name}
                  </span>
                </div>
                <div
                  onClick={() => {
                    setFormData({
                      ...formData,
                      patientName: {
                        id: "",
                        name: "",
                      },
                    });
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
              <div className={`maiacare-input-field-container`}>
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
                    // onChange?.(null);
                    setFormError((prev) => ({ ...prev, patientName: "" }));
                  }}
                  onFocus={() => {
                    if (txtPatinetName.trim().length > 0) setOpen(true);
                  }}
                  onBlur={() => setTimeout(() => setOpen(false), 150)}
                />
                <InputFieldError error={formError.patientName} />

                <Dropdown
                  className="custome-patient-dropdown"
                  show={open && filtered.length > 0}
                >
                  <Dropdown.Menu className="w-100 mt-1 shadow">
                    {filtered.map((item) => (
                      <Dropdown.Item
                        key={item.id}
                        onClick={() => {
                          setOpen(false);

                          // update formData using handleChange
                          handlePatientNameSelect(item);
                        }}
                        className="d-flex align-items-center gap-2"
                      >
                        {item.ProfilePhoto && (
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
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </Col>
          <Col md={6}>
            <InputSelect
              label="Select Treatment"
              name="treatment"
              value={formData.treatment}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {}}
              required={true}
              disabled={false}
              placeholder="Select Treatment"
              error={formError.treatment}
              options={[
                { id: "1", value: "Treatment 1", label: "Treatment 1" },
                { id: "2", value: "Treatment 2", label: "Treatment 2" },
                { id: "3", value: "Treatment 3", label: "Treatment 3" },
              ]}
            />
          </Col>
          <Col md={6}>
            <InputSelect
              label="Select Duration "
              name="duration"
              value={formData.duration}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {}}
              required={true}
              disabled={false}
              error={formError.duration}
              placeholder="Select Duration"
              options={[
                { id: "1", value: "1", label: "Duration 1" },
                { id: "2", value: "2", label: "Duration 2" },
                { id: "3", value: "3", label: "Duration 3" },
              ]}
            />
          </Col>
          <Col md={12}>
            {formData.treatment && (
              <Row className="g-2">
                {TempTreatmentSteps.map((item) => (
                  <Col md={6} key={item.id}>
                    <div className="treatment-steps-box d-flex gap-2 ps-4">
                      <span className="treatment-steps-box-item ">
                        {item.id}.
                      </span>
                      <p className="treatment-steps-box-item m-0">
                        {item.step}
                      </p>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
          </Col>

          <div className="d-flex justify-content-end">
            <Button variant="default" type="submit" className="w-50">
              <div className="d-flex justify-content-center align-items-center gap-2">
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="15"
                  viewBox="0 0 20 16"
                  fill="none"
                >
                  <path
                    d="M19.2959 8.79592L12.5459 15.5459C12.3346 15.7573 12.0479 15.876 11.7491 15.876C11.4502 15.876 11.1635 15.7573 10.9522 15.5459C10.7408 15.3346 10.6221 15.0479 10.6221 14.749C10.6221 14.4502 10.7408 14.1635 10.9522 13.9522L15.7812 9.12498H2C1.70163 9.12498 1.41548 9.00645 1.2045 8.79548C0.993526 8.5845 0.875 8.29835 0.875 7.99998C0.875 7.70161 0.993526 7.41546 1.2045 7.20449C1.41548 6.99351 1.70163 6.87498 2 6.87498H15.7812L10.9541 2.04498C10.7427 1.83364 10.624 1.54699 10.624 1.24811C10.624 0.94922 10.7427 0.662575 10.9541 0.451231C11.1654 0.239887 11.4521 0.121155 11.7509 0.121155C12.0498 0.121155 12.3365 0.239887 12.5478 0.451231L19.2978 7.20123C19.4027 7.30589 19.4859 7.43024 19.5426 7.56714C19.5993 7.70403 19.6284 7.85079 19.6282 7.99896C19.6281 8.14714 19.5986 8.29383 19.5416 8.43059C19.4846 8.56736 19.4011 8.69151 19.2959 8.79592Z"
                    fill="white"
                  />
                </svg>
              </div>
            </Button>
          </div>
        </Row>
      </form>
    </>
  );
}

export function TreatmentFertilityAssessmentPatient({
  setShowFertilityAssessment,
  setModalFormFertilityData,
  setActiveTab,
  editProgressUpdatesData,
}: FertilityAssessmentFormProps) {
  type FormError = Partial<Record<keyof FertilityAssessmentFormType, string>>;
  const initialFormError: FormError = {};

  const initialFormData: FertilityAssessmentFormType = {
    ageAtFirstMenstruation:
      editProgressUpdatesData?.patient?.ageAtFirstMenstruation || "",
    cycleLength: editProgressUpdatesData?.patient?.cycleLength || "",
    periodLength: editProgressUpdatesData?.patient?.periodLength || "",
    lastPeriodDate: editProgressUpdatesData?.patient?.lastPeriodDate || "",
    date: editProgressUpdatesData?.patient?.date || "",
    isCycleRegular:
      editProgressUpdatesData?.patient?.isCycleRegular || "Regular",
    menstrualIssues: editProgressUpdatesData?.patient?.menstrualIssues || "yes",
    menstrualIssuesDetails:
      editProgressUpdatesData?.patient?.menstrualIssuesDetails || "",
    pregnantBefore: editProgressUpdatesData?.patient?.pregnantBefore || "yes",
    pregnantBeforeDetails:
      editProgressUpdatesData?.patient?.pregnantBeforeDetails || "",
    tryingToConceiveDuration:
      editProgressUpdatesData?.patient?.tryingToConceiveDuration || "",
    miscarriageOrEctopicHistory:
      editProgressUpdatesData?.patient?.miscarriageOrEctopicHistory || "no",
    miscarriageOrEctopicDetails:
      editProgressUpdatesData?.patient?.miscarriageOrEctopicDetails || "",
    pregnancy: editProgressUpdatesData?.patient?.pregnancy || "yes",
    timeduration: editProgressUpdatesData?.patient?.timeduration || "",
    ectopicpregnancy:
      editProgressUpdatesData?.patient?.ectopicpregnancy || "yes",
  };

  const [formData, setFormData] =
    useState<FertilityAssessmentFormType>(initialFormData);
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const validateForm = (data: FertilityAssessmentFormType): FormError => {
    const errors: FormError = {};

    if (!data.ageAtFirstMenstruation.trim())
      errors.ageAtFirstMenstruation = "Age at first menstruation is required";
    if (!data.cycleLength.trim())
      errors.cycleLength = "Cycle length is required";
    if (!data.periodLength.trim())
      errors.periodLength = "Period length is required";
    if (!data.date) errors.date = "Date is required";
    if (!data.isCycleRegular)
      errors.isCycleRegular = "Is cycle regular is required";
    if (!data.menstrualIssues)
      errors.menstrualIssues = "Menstrual issues is required";
    if (!data.pregnancy) errors.pregnancy = "Pregnancy is required";
    if (!data.timeduration) errors.timeduration = "Duration is required";
    if (!data.ectopicpregnancy)
      errors.ectopicpregnancy = "Ectopic pregnancy is required";

    return errors;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: FertilityAssessmentFormType) => ({
      ...prev,
      [name]: value,
    }));
    setFormError((prev: FormError) => ({ ...prev, [name]: "" }));
  };
  const defaultProgressUpdate: ProgressUpdatesType = {
    patient: {
      ageAtFirstMenstruation: "",
      cycleLength: "",
      periodLength: "",
      lastPeriodDate: "",
      date: "",
      isCycleRegular: "Regular",
      menstrualIssues: "yes",
      menstrualIssuesDetails: "",
      pregnantBefore: "yes",
      pregnantBeforeDetails: "",
      tryingToConceiveDuration: "",
      miscarriageOrEctopicHistory: "no",
      miscarriageOrEctopicDetails: "",
      pregnancy: "yes",
      timeduration: "",
      ectopicpregnancy: "yes",
    },
    partner: {
      semenAnalysis: "no",
      semenAnalysisContent: "",
      fertilityIssues: "no",
      fertilityIssuesContent: "",
      fertilityTreatment: "no",
      fertilityTreatmentContent: "",
      surgeries: "no",
      surgeriesContent: "",
    },
    medicalPrescription: [],
    report: [],
    StatusAndUpdates: {
      status: "", // fill these with whatever fields your type requires
      updates: "",
      stepName: "",
      notes: "",
    },
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm(formData);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      setModalFormFertilityData?.((prev) => {
        const safePrev = prev ?? defaultProgressUpdate;
        return {
          ...safePrev,
          patient: formData,
        };
      });
      setFormError(initialFormError);
      setActiveTab?.("partner");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Accordion defaultActiveKey="0">
          <Accordion.Item
            eventKey="0"
            className="fertilitiy-assement-accodion-item mb-3"
          >
            <Accordion.Header>
              <div className="fertilitiy-assement-accodion-title">
                Menstrual Cycle
              </div>
            </Accordion.Header>
            <Accordion.Body className="custom-accordion-body">
              <Row className="g-md-3 g-1">
                <Col md={6}>
                  <InputSelect
                    label="Age at first menstruation"
                    name="ageAtFirstMenstruation"
                    value={formData.ageAtFirstMenstruation}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      handleChange(e);
                    }}
                    error={formError.ageAtFirstMenstruation}
                    onBlur={() => {}}
                    required
                    disabled={false}
                    placeholder="Select Age"
                    options={[
                      { id: "1", value: "1", label: "1" },
                      { id: "2", value: "2", label: "2" } /* ... */,
                    ]}
                  />
                </Col>

                <Col md={6}>
                  <InputSelect
                    label="Cycle Length"
                    name="cycleLength"
                    value={formData.cycleLength}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      handleChange(e);
                    }}
                    error={formError.cycleLength}
                    onBlur={() => {}}
                    required
                    disabled={false}
                    placeholder="Select Cycle Length"
                    options={[
                      { id: "1", value: "1", label: "1" },
                      { id: "2", value: "2", label: "2" } /* ... */,
                    ]}
                  />
                </Col>

                <Col md={6}>
                  <InputSelect
                    label="Period Length"
                    name="periodLength"
                    value={formData.periodLength}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      handleChange(e);
                    }}
                    error={formError.periodLength}
                    onBlur={() => {}}
                    required
                    disabled={false}
                    placeholder="Select Period Length"
                    options={[
                      { id: "1", value: "1", label: "1" },
                      { id: "2", value: "2", label: "2" } /* ... */,
                    ]}
                  />
                </Col>

                <Col md={6}>
                  <DatePickerFieldGroup
                    label="Last Period Date"
                    name="date"
                    value={formData.date}
                    placeholder="Enter last period date"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                    error={formError.date}
                    onBlur={() => {}}
                    required
                    disabled={false}
                    helperText=""
                    max={new Date().toISOString().split("T")[0]} // future date is disabled
                  />
                </Col>

                <Col md={12}>
                  <RadioButtonGroup
                    label="Is your cycle regular?"
                    name="isCycleRegular"
                    value={formData.isCycleRegular || "Regular"}
                    onChange={handleChange}
                    required
                    options={[
                      { label: "Regular", value: "Regular" },
                      {
                        label: "Sometimes Irregular",
                        value: "Sometimes Irregular",
                      },
                      { label: "Irregular", value: "Irregular" },
                    ]}
                  />

                  <RadioButtonGroup
                    label="Do you experience menstrual issues?"
                    name="menstrualIssues"
                    className="mt-2"
                    value={formData.menstrualIssues || "yes"}
                    onChange={handleChange}
                    required
                    options={[
                      { label: "Yes", value: "yes" },
                      { label: "No", value: "no" },
                    ]}
                  />
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item
            eventKey="1"
            className="fertilitiy-assement-accodion-item"
          >
            <Accordion.Header>
              <div className="fertilitiy-assement-accodion-title">
                Pregnancy
              </div>
            </Accordion.Header>
            <Accordion.Body className="custom-accordion-body">
              <Row className="g-md-3 g-2">
                <Col md={12}>
                  <RadioButtonGroup
                    label="Have you been pregnant before?"
                    name="pregnancy"
                    className="mt-2"
                    value={formData.pregnancy || "yes"}
                    onChange={handleChange}
                    required
                    options={[
                      { label: "Yes", value: "yes" },
                      { label: "No", value: "no" },
                    ]}
                  />
                </Col>
                <Col md={12}>
                  <InputFieldGroup
                    label="How long have you been trying to conceive?"
                    name="timeduration"
                    type="text"
                    placeholder="Enter Duration"
                    required
                    disabled={false}
                    readOnly={false}
                    value={formData.timeduration}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                    error={formError.timeduration}
                  />
                </Col>
                <Col md={12}>
                  <RadioButtonGroup
                    label="Any history of miscarriage or ectopic pregnancy?"
                    name="ectopicpregnancy"
                    value={formData.ectopicpregnancy || "yes"}
                    onChange={handleChange}
                    required
                    options={[
                      { label: "Yes", value: "yes" },
                      { label: "No", value: "no" },
                    ]}
                  />
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* Submit buttons */}
        <div className="d-flex gap-3 mt-3">
          <Button
            className="w-100"
            variant="outline"
            type="button"
            onClick={() => {
              setShowFertilityAssessment?.(false);
            }}
          >
            Cancel
          </Button>
          {editProgressUpdatesData?.patient ? (
            <Button className="w-100" variant="default" type="submit">
              <div className="d-flex justify-content-center align-items-center gap-2">
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="15"
                  viewBox="0 0 20 16"
                  fill="none"
                >
                  <path
                    d="M19.2959 8.79592L12.5459 15.5459C12.3346 15.7573 12.0479 15.876 11.7491 15.876C11.4502 15.876 11.1635 15.7573 10.9522 15.5459C10.7408 15.3346 10.6221 15.0479 10.6221 14.749C10.6221 14.4502 10.7408 14.1635 10.9522 13.9522L15.7812 9.12498H2C1.70163 9.12498 1.41548 9.00645 1.2045 8.79548C0.993526 8.5845 0.875 8.29835 0.875 7.99998C0.875 7.70161 0.993526 7.41546 1.2045 7.20449C1.41548 6.99351 1.70163 6.87498 2 6.87498H15.7812L10.9541 2.04498C10.7427 1.83364 10.624 1.54699 10.624 1.24811C10.624 0.94922 10.7427 0.662575 10.9541 0.451231C11.1654 0.239887 11.4521 0.121155 11.7509 0.121155C12.0498 0.121155 12.3365 0.239887 12.5478 0.451231L19.2978 7.20123C19.4027 7.30589 19.4859 7.43024 19.5426 7.56714C19.5993 7.70403 19.6284 7.85079 19.6282 7.99896C19.6281 8.14714 19.5986 8.29383 19.5416 8.43059C19.4846 8.56736 19.4011 8.69151 19.2959 8.79592Z"
                    fill="white"
                  />
                </svg>
              </div>
            </Button>
          ) : (
            <Button className="w-100" variant="default" type="submit">
              Save
            </Button>
          )}
        </div>
      </form>
    </>
  );
}

export function TreatmentFertilityAssessmentPartner({
  setShowFertilityAssessment,
  setModalFormFertilityData,
  editProgressUpdatesData,
  setStep,
  setStepper,
}: {
  setShowFertilityAssessment?: React.Dispatch<React.SetStateAction<boolean>>;
  setModalFormFertilityData?: React.Dispatch<
    React.SetStateAction<ProgressUpdatesType>
  >;
  editProgressUpdatesData?: ProgressUpdatesType;
  setStep?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setStepper?: React.Dispatch<React.SetStateAction<number | undefined>>;
  // setStep?: React.Dispatch<React.SetStateAction<number | undefined>>;
  // setStepper?: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  type FormError = Partial<Record<keyof FertilityAssessmentHistory, string>>;
  const initialFormError: FormError = {};

  const initialFormData: FertilityAssessmentHistory = {
    semenAnalysis: editProgressUpdatesData?.partner?.semenAnalysis || "yes",
    semenAnalysisContent:
      editProgressUpdatesData?.partner?.semenAnalysisContent || "",
    fertilityIssues: editProgressUpdatesData?.partner?.fertilityIssues || "no",
    fertilityIssuesContent:
      editProgressUpdatesData?.partner?.fertilityIssuesContent || "",
    fertilityTreatment:
      editProgressUpdatesData?.partner?.fertilityTreatment || "no",
    fertilityTreatmentContent:
      editProgressUpdatesData?.partner?.fertilityTreatmentContent || "",
    surgeries: editProgressUpdatesData?.partner?.surgeries || "no",
    surgeriesContent: editProgressUpdatesData?.partner?.surgeriesContent || "",
  };
  const defaultPartnerValue: FertilityAssessmentHistory = {
    semenAnalysis: "no",
    semenAnalysisContent: "",
    fertilityIssues: "no",
    fertilityIssuesContent: "",
    fertilityTreatment: "no",
    fertilityTreatmentContent: "",
    surgeries: "no",
    surgeriesContent: "",
  };
  const [formData, setFormData] =
    useState<FertilityAssessmentHistory>(initialFormData);
  const [formError, setFormError] = useState<FormError>(initialFormError);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (data: FertilityAssessmentHistory): FormError => {
    const errors: FormError = {};

    if (!data.semenAnalysis.trim())
      errors.semenAnalysis = "Seminal Analysis is required";
    if (data.semenAnalysis === "yes" && !data.semenAnalysisContent?.trim())
      errors.semenAnalysisContent = "Seminal Analysis Content is required";
    if (!data.fertilityIssues.trim())
      errors.fertilityIssues = "Fertility Issues is required";
    if (data.fertilityIssues === "yes" && !data.fertilityIssuesContent?.trim())
      errors.fertilityIssuesContent = "Fertility Issues Content is required";
    if (!data.fertilityTreatment.trim())
      errors.fertilityTreatment = "Fertility Treatment is required";
    if (
      data.fertilityTreatment === "yes" &&
      !data.fertilityTreatmentContent?.trim()
    )
      errors.fertilityTreatmentContent =
        "Fertility Treatment Content is required";
    if (!data.surgeries.trim()) errors.surgeries = "Surgeries is required";
    if (data.surgeries === "yes" && !data.surgeriesContent?.trim())
      errors.surgeriesContent = "Surgeries Content is required";

    return errors;
  };
  const handleSubmitData = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormError(errors);
    if (Object.keys(errors).length === 0) {
      setModalFormFertilityData?.((prev) => {
        const safePrev: ProgressUpdatesType = prev ?? {
          patient: {} as FertilityAssessmentFormType, // or provide default patient if needed
          partner: defaultPartnerValue,
          medicalPrescription: [],
          report: [],
          StatusAndUpdates: {} as TreatmentProgressStatusType,
        };

        return {
          ...safePrev,
          partner: formData,
        };
      });
      setFormError(initialFormError);
      setShowFertilityAssessment?.(false);

      if (editProgressUpdatesData) {
        setStep?.((prev) => (prev !== undefined ? prev + 1 : 1));
        setStepper?.((prev) => (prev !== undefined ? prev + 1 : 1));
      } else {
        toast.success("Fertility assessment saved", {
          icon: <BsInfoCircle size={22} color="white" />,
        });
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmitData}>
        <Row className="g-md-3 g-2">
          <Col md={12}>
            <RadioButtonGroup
              label="Have you ever had a semen analysis?"
              name="semenAnalysis"
              value={formData.semenAnalysis}
              onChange={(e) => handleChange(e)}
              required={true}
              error={formError.semenAnalysis}
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />

            {formData.semenAnalysis === "yes" && (
              <InputFieldGroup
                type="text"
                value={formData.semenAnalysisContent}
                name="semenAnalysisContent"
                onChange={handleChange}
                error={formError.semenAnalysisContent}
                placeholder="If yes, provide details if available"
                className={`mt-2`}
              ></InputFieldGroup>
            )}
          </Col>
          <Col md={12}>
            <RadioButtonGroup
              label="Have you experienced any fertility issues?"
              name="fertilityIssues"
              value={formData.fertilityIssues}
              onChange={(e) => handleChange(e)}
              required={true}
              error={formError.fertilityIssues}
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />

            {formData.fertilityIssues === "yes" && (
              <InputFieldGroup
                type="text"
                value={formData.fertilityIssuesContent}
                name="fertilityIssuesContent"
                onChange={handleChange}
                error={formError.fertilityIssuesContent}
                placeholder="If yes, provide details if available"
                className={`mt-2`}
              ></InputFieldGroup>
            )}
          </Col>
          <Col md={12}>
            <RadioButtonGroup
              label="Have you previously undergone fertility treatments?"
              name="fertilityTreatment"
              value={formData.fertilityTreatment}
              onChange={(e) => handleChange(e)}
              required={true}
              error={formError.fertilityTreatment}
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />

            {formData.fertilityTreatment === "yes" && (
              <InputFieldGroup
                type="text"
                value={formData.fertilityTreatmentContent}
                name="fertilityTreatmentContent"
                onChange={handleChange}
                error={formError.fertilityTreatmentContent}
                placeholder="If yes, provide details if available"
                className={`mt-2`}
              ></InputFieldGroup>
            )}
          </Col>
          <Col md={12}>
            <RadioButtonGroup
              label="Any history of surgeries?"
              name="surgeries"
              value={formData.surgeries}
              onChange={(e) => handleChange(e)}
              required={true}
              error={formError.surgeries}
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />

            {formData.surgeries === "yes" && (
              <InputFieldGroup
                type="text"
                value={formData.surgeriesContent}
                name="surgeriesContent"
                onChange={handleChange}
                error={formError.surgeriesContent}
                placeholder="If yes, provide details if available"
                className={`mt-2`}
              />
            )}
          </Col>
          <div className="d-flex gap-3 mt-3">
            <Button
              className="w-100"
              variant="outline"
              type="button"
              onClick={() => {
                setShowFertilityAssessment?.(false);
              }}
            >
              Cancel
            </Button>
            {editProgressUpdatesData?.patient ? (
              <Button className="w-100" variant="default" type="submit">
                <div className="d-flex justify-content-center align-items-center gap-2">
                  Next
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="15"
                    viewBox="0 0 20 16"
                    fill="none"
                  >
                    <path
                      d="M19.2959 8.79592L12.5459 15.5459C12.3346 15.7573 12.0479 15.876 11.7491 15.876C11.4502 15.876 11.1635 15.7573 10.9522 15.5459C10.7408 15.3346 10.6221 15.0479 10.6221 14.749C10.6221 14.4502 10.7408 14.1635 10.9522 13.9522L15.7812 9.12498H2C1.70163 9.12498 1.41548 9.00645 1.2045 8.79548C0.993526 8.5845 0.875 8.29835 0.875 7.99998C0.875 7.70161 0.993526 7.41546 1.2045 7.20449C1.41548 6.99351 1.70163 6.87498 2 6.87498H15.7812L10.9541 2.04498C10.7427 1.83364 10.624 1.54699 10.624 1.24811C10.624 0.94922 10.7427 0.662575 10.9541 0.451231C11.1654 0.239887 11.4521 0.121155 11.7509 0.121155C12.0498 0.121155 12.3365 0.239887 12.5478 0.451231L19.2978 7.20123C19.4027 7.30589 19.4859 7.43024 19.5426 7.56714C19.5993 7.70403 19.6284 7.85079 19.6282 7.99896C19.6281 8.14714 19.5986 8.29383 19.5416 8.43059C19.4846 8.56736 19.4011 8.69151 19.2959 8.79592Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </Button>
            ) : (
              <Button className="w-100" variant="default" type="submit">
                Save
              </Button>
            )}
          </div>
        </Row>
      </form>
    </>
  );
}

export function TreatmentPlanEditForm({
  setStep,
  setStepper,
  editTreatmentData,
  setEditTreatmentData,
}: {
  setStep: React.Dispatch<React.SetStateAction<number | undefined>>;
  setStepper: React.Dispatch<React.SetStateAction<number | undefined>>;
  editTreatmentData?: EditTreatmentPlanType;
  setEditTreatmentData?: React.Dispatch<
    React.SetStateAction<EditTreatmentPlanType>
  >;
}) {
  const initialFormData: TreatmentPlanEditType = {
    selectpatient: editTreatmentData?.treatmentplan?.selectpatient || "partner",
    treatment: editTreatmentData?.treatmentplan?.treatment || "",
    duration: editTreatmentData?.treatmentplan?.duration || "",
  };

  type FormError = Partial<Record<keyof TreatmentPlanEditType, string>>;
  const initialFormError: FormError = {};

  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [formData, setFormData] =
    useState<TreatmentPlanEditType>(initialFormData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (data: TreatmentPlanEditType): FormError => {
    const errors: FormError = {};

    if (!data.treatment) {
      errors.treatment = "Treatment is required";
    }
    if (!data.duration) {
      errors.duration = "Duration is required";
    }
    return errors;
  };

  const handelNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm(formData);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      setStep?.((prev: number | undefined) => (prev ?? 0) + 1);
      setStepper?.((prev: number | undefined) => (prev ?? 0) + 1);

      setFormError(initialFormError);
    }
  };

  return (
    <>
      <form onSubmit={handelNext}>
        <Row className="g-3">
          <h6 className="dashboard-chart-heading mb-0">Treatment Plan</h6>
          <Col md={12}>
            <RadioButtonGroup
              label="select"
              name="selectpatient"
              value={formData.selectpatient}
              onChange={(e) => handleChange(e)}
              required
              options={[
                { label: "Partner", value: "partner" },
                { label: "Donor", value: "donor" },
                { label: "Individual", value: "individual" },
              ]}
            />
          </Col>
          <Col md={6}>
            <InputSelect
              label="Select Treatment"
              name="treatment"
              value={formData.treatment}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {}}
              required={true}
              disabled={false}
              placeholder="Select Treatment"
              error={formError.treatment}
              options={[
                { id: "1", value: "Embryo Transfer", label: "Embryo Transfer" },
                { id: "2", value: "Treatment 2", label: "Treatment 2" },
                { id: "3", value: "Treatment 3", label: "Treatment 3" },
              ]}
            />
          </Col>
          <Col md={6}>
            <InputSelect
              label="Select Duration "
              name="duration"
              value={formData.duration}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {}}
              required={true}
              disabled={false}
              error={formError.duration}
              placeholder="Select Duration"
              options={[
                { id: "1", value: "1 Months", label: "1 Months" },
                { id: "2", value: "3 Months", label: "3 Months" },
                { id: "3", value: "6 Months", label: "6 Months" },
              ]}
            />
          </Col>
          <Col md={12}>
            {formData.treatment && (
              <Row className="g-2">
                {TempTreatmentSteps.map((item) => (
                  <Col md={6} key={item.id}>
                    <div className="treatment-steps-box d-flex gap-2 ps-4">
                      <span className="treatment-steps-box-item ">
                        {item.id}.
                      </span>
                      <p className="treatment-steps-box-item m-0">
                        {item.step}
                      </p>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
          <div className="d-flex gap-3 mt-3">
            <Button variant="outline" onClick={() => {}} className="w-100">
              <div className="d-flex justify-content-center align-items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="15"
                  viewBox="0 0 20 16"
                  fill="none"
                >
                  <path
                    d="M19.1249 8.00001C19.1249 8.29838 19.0064 8.58452 18.7954 8.7955C18.5844 9.00648 18.2983 9.12501 17.9999 9.12501H4.21866L9.04866 13.9541C9.26 14.1654 9.37874 14.4521 9.37874 14.7509C9.37874 15.0498 9.26 15.3365 9.04866 15.5478C8.83732 15.7592 8.55067 15.8779 8.25179 15.8779C7.9529 15.8779 7.66625 15.7592 7.45491 15.5478L0.704911 8.79782C0.600031 8.6933 0.516814 8.56911 0.460033 8.43237C0.403252 8.29562 0.374023 8.14901 0.374023 8.00094C0.374023 7.85288 0.403252 7.70627 0.460033 7.56952C0.516814 7.43278 0.600031 7.30859 0.704911 7.20407L7.45491 0.454069C7.55956 0.349422 7.68379 0.266411 7.82052 0.209777C7.95725 0.153142 8.10379 0.123993 8.25179 0.123993C8.39978 0.123993 8.54632 0.153142 8.68305 0.209777C8.81978 0.266411 8.94401 0.349422 9.04866 0.454069C9.15331 0.558716 9.23632 0.68295 9.29295 0.819679C9.34959 0.956407 9.37874 1.10295 9.37874 1.25094C9.37874 1.39894 9.34959 1.54548 9.29295 1.68221C9.23632 1.81894 9.15331 1.94317 9.04866 2.04782L4.21866 6.87501H17.9999C18.2983 6.87501 18.5844 6.99353 18.7954 7.20451C19.0064 7.41549 19.1249 7.70164 19.1249 8.00001Z"
                    fill="#2B4360"
                  />
                </svg>
                Previous
              </div>
            </Button>

            <Button variant="default" type="submit" className="w-100">
              <div className="d-flex justify-content-center align-items-center gap-2">
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="15"
                  viewBox="0 0 20 16"
                  fill="none"
                >
                  <path
                    d="M19.2959 8.79592L12.5459 15.5459C12.3346 15.7573 12.0479 15.876 11.7491 15.876C11.4502 15.876 11.1635 15.7573 10.9522 15.5459C10.7408 15.3346 10.6221 15.0479 10.6221 14.749C10.6221 14.4502 10.7408 14.1635 10.9522 13.9522L15.7812 9.12498H2C1.70163 9.12498 1.41548 9.00645 1.2045 8.79548C0.993526 8.5845 0.875 8.29835 0.875 7.99998C0.875 7.70161 0.993526 7.41546 1.2045 7.20449C1.41548 6.99351 1.70163 6.87498 2 6.87498H15.7812L10.9541 2.04498C10.7427 1.83364 10.624 1.54699 10.624 1.24811C10.624 0.94922 10.7427 0.662575 10.9541 0.451231C11.1654 0.239887 11.4521 0.121155 11.7509 0.121155C12.0498 0.121155 12.3365 0.239887 12.5478 0.451231L19.2978 7.20123C19.4027 7.30589 19.4859 7.43024 19.5426 7.56714C19.5993 7.70403 19.6284 7.85079 19.6282 7.99896C19.6281 8.14714 19.5986 8.29383 19.5416 8.43059C19.4846 8.56736 19.4011 8.69151 19.2959 8.79592Z"
                    fill="white"
                  />
                </svg>
              </div>
            </Button>
          </div>
        </Row>
      </form>
    </>
  );
}

export function TreatmentProgressStatus({
  editProgressUpdatesData,
  setEditProgressUpdatesModel,
  setStep,
  setStepper,
}: {
  editProgressUpdatesData: ProgressUpdatesType;
  setEditProgressUpdatesModel: React.Dispatch<React.SetStateAction<boolean>>;
  setStep?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setStepper?: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  const initialFormData: TreatmentProgressStatusType = {
    stepName: editProgressUpdatesData.StatusAndUpdates.stepName || "",
    status: editProgressUpdatesData.StatusAndUpdates.status || "",
    notes: editProgressUpdatesData.StatusAndUpdates.notes || "",
    updates: editProgressUpdatesData.StatusAndUpdates.updates || "",
  };

  type FormError = Partial<Record<keyof TreatmentProgressStatusType, string>>;
  const initialFormError: FormError = {};

  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [formData, setFormData] =
    useState<TreatmentProgressStatusType>(initialFormData);

  const [statusClass, setStatusClass] = useState<string>("");
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  useEffect(() => {
    if (!formData.status) {
      setStatusClass("");
      return;
    }
    const newClass =
      formData.status === "Success"
        ? "patient-journey-badge-success"
        : formData.status === "Pending"
        ? "patient-journey-badge-pending"
        : formData.status === "InProgress"
        ? "patient-journey-badge-InProgress"
        : "";

    setStatusClass(newClass);
  }, [formData.status]);

  const validateForm = (data: TreatmentProgressStatusType): FormError => {
    const errors: FormError = {};

    if (!data.stepName) {
      errors.stepName = "Step Name is required";
    }
    if (!data.status) {
      errors.status = "Status is required";
    }
    if (!data.notes) {
      errors.notes = "Notes is required";
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm(formData);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      // console.log("Form Data : ", formData);
      setFormError(initialFormError);
      setStep?.(1);
      setStepper?.(1);
      setEditProgressUpdatesModel(false);
    }
  };

  return (
    <>
      <h6 className="dashboard-chart-heading pb-2">Status & Updates</h6>
      <form onSubmit={handleSubmit}>
        <Row className="g-3">
          <Col md={6}>
            <InputFieldGroup
              label="Step Name"
              name="stepName"
              type="text"
              value={formData.stepName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
              placeholder="Enter step name"
              required={false}
              disabled={false}
              readOnly={false}
              error={formError.stepName}
            />
          </Col>
          <Col sm={6} className="position-relative">
            <InputSelect
              label="Status"
              name="status"
              value={formData.status}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {}}
              required={true}
              disabled={false}
              error={formError.status}
              options={[
                { id: "1", value: "Success", label: "Success" },
                { id: "2", value: "Pending", label: "Pending" },
                { id: "3", value: "InProgress", label: "InProgress" },
              ]}
            />

            <span
              className={`${
                formError.stepName
                  ? "payment-status-error-time"
                  : "payment-status"
              } ${statusClass}`}
            >
              {formData.status}
            </span>
          </Col>
          <Col md={12}>
            <Textarea
              label="Notes / Updates"
              name="notes"
              value={formData.notes}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {}}
              required={true}
              disabled={false}
              error={formError.notes}
              maxLength={100}
            />
          </Col>

          <div className="d-flex gap-3 mt-3">
            <Button
              variant="outline"
              onClick={() => {
                setStep?.((prev) => (prev !== undefined ? prev + 1 : 1));
                setStepper?.((prev) => (prev !== undefined ? prev + 1 : 1));
              }}
              className="w-100"
            >
              <div className="d-flex justify-content-center align-items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="15"
                  viewBox="0 0 20 16"
                  fill="none"
                >
                  <path
                    d="M19.1249 8.00001C19.1249 8.29838 19.0064 8.58452 18.7954 8.7955C18.5844 9.00648 18.2983 9.12501 17.9999 9.12501H4.21866L9.04866 13.9541C9.26 14.1654 9.37874 14.4521 9.37874 14.7509C9.37874 15.0498 9.26 15.3365 9.04866 15.5478C8.83732 15.7592 8.55067 15.8779 8.25179 15.8779C7.9529 15.8779 7.66625 15.7592 7.45491 15.5478L0.704911 8.79782C0.600031 8.6933 0.516814 8.56911 0.460033 8.43237C0.403252 8.29562 0.374023 8.14901 0.374023 8.00094C0.374023 7.85288 0.403252 7.70627 0.460033 7.56952C0.516814 7.43278 0.600031 7.30859 0.704911 7.20407L7.45491 0.454069C7.55956 0.349422 7.68379 0.266411 7.82052 0.209777C7.95725 0.153142 8.10379 0.123993 8.25179 0.123993C8.39978 0.123993 8.54632 0.153142 8.68305 0.209777C8.81978 0.266411 8.94401 0.349422 9.04866 0.454069C9.15331 0.558716 9.23632 0.68295 9.29295 0.819679C9.34959 0.956407 9.37874 1.10295 9.37874 1.25094C9.37874 1.39894 9.34959 1.54548 9.29295 1.68221C9.23632 1.81894 9.15331 1.94317 9.04866 2.04782L4.21866 6.87501H17.9999C18.2983 6.87501 18.5844 6.99353 18.7954 7.20451C19.0064 7.41549 19.1249 7.70164 19.1249 8.00001Z"
                    fill="#2B4360"
                  />
                </svg>
                Previous
              </div>
            </Button>

            <Button variant="default" type="submit" className="w-100">
              Save
            </Button>
          </div>
        </Row>
      </form>
    </>
  );
}

export function TreatmentTerminate({
  setSuccessModal,
  setTreatmentTerminateModel,
}: {
  setSuccessModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setTreatmentTerminateModel: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const initialFormData: TreatmentTerminationType = {
    reasonForTermination: "",
    additionalNote: "",
  };

  type FormError = Partial<Record<keyof TreatmentTerminationType, string>>;
  const initialFormError: FormError = {};

  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [formData, setFormData] =
    useState<TreatmentTerminationType>(initialFormData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (data: TreatmentTerminationType): FormError => {
    const errors: FormError = {};

    if (!data.reasonForTermination) {
      errors.reasonForTermination = "Reason for Termination is required";
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm(formData);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      // console.log("Form Data : ", formData);
      setFormError(initialFormError);
      setTreatmentTerminateModel(false);
      setSuccessModal?.(true);
      // console.log("click");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputSelect
          label="Reason for Termination"
          name="reasonForTermination"
          className="mb-md-3 mb-2"
          value={formData.reasonForTermination}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            handleChange(e);
          }}
          onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {}}
          required={true}
          disabled={false}
          error={formError.reasonForTermination}
          options={[
            { id: "1", value: "1", label: "Reason 1" },
            { id: "2", value: "2", label: "Reason 2" },
            { id: "3", value: "3", label: "Reason 3" },
          ]}
        />
        <Textarea
          label="Additional Note"
          name="additionalNote"
          value={formData.additionalNote}
          className="mb-md-3 mb-2"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleChange(e);
          }}
          placeholder="Enter any additional details"
          onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {}}
          required={true}
          disabled={false}
          error={formError.additionalNote}
          maxLength={100}
        />
        <div className="d-flex gap-3">
          <Button
            className="w-100"
            variant="outline"
            type="button"
            onClick={() => {
              setTreatmentTerminateModel(false);
            }}
          >
            Cancel
          </Button>

          <Button className="w-100" variant="default" type="submit">
            Send
          </Button>
        </div>
      </form>
    </>
  );
}

export function TreatmentSuccessModal({
  successModal,
  setSuccessModal,
  setStep,
  setStepper,
  setMedicalPrescription,
  setShowContent,
}: {
  successModal: boolean;
  setSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  setStep?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setStepper?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setMedicalPrescription?: React.Dispatch<
    React.SetStateAction<MedicationPrescriptionType[]>
  >;
  setShowContent?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Modal
      show={successModal}
      onHide={() => {
        setSuccessModal(false);
        setStep?.(1);
        setStepper?.(1);
        setMedicalPrescription?.([]);
        setShowContent?.(true); // show patient content
      }}
      header=""
      closeButton={true}
    >
      <div className="text-center">
        <Image
          src={TreatmentSuccessImage}
          alt="successImg"
          width={290}
          height={240}
        />
        <h3 className="modal-custom-header mt-4">Treatment Added Submitted!</h3>
        <p className="modal-custom-content">Manage treatment seamlesly</p>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <Button
          variant="outline"
          className="w-100"
          onClick={() => {
            setSuccessModal(false);
            setStep?.(1);
            setStepper?.(1);
            setMedicalPrescription?.([]);
            setShowContent?.(true); // show patient content
          }}
        >
          Okay
        </Button>
        <Button variant="default" className="w-100">
          View Details
        </Button>
      </div>
    </Modal>
  );
}

export function TerminationSuccessModal({
  successModal,
  setSuccessModal,
}: {
  successModal: boolean;
  setSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <Modal
        show={successModal}
        onHide={() => {
          setSuccessModal(false);
        }}
        header=""
        closeButton={true}
      >
        <div className="text-center">
          <Image
            src={TerminationSuccessImage}
            alt="successImg"
            width={290}
            height={240}
          />
          <h3 className="modal-custom-header mt-4">
            Termination Request Submitted!
          </h3>
          <p className="modal-custom-content">
            Maicare will contact you shortly to confirm your request
          </p>
        </div>

        <Button
          variant="outline"
          className="w-100"
          onClick={() => {
            setSuccessModal(false);
          }}
        >
          Okay
        </Button>
      </Modal>
    </>
  );
}
