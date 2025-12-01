import { Col, Row } from "react-bootstrap";
import { InputSelect } from "../ui/InputSelect";
import { TempTreatmentSteps } from "../../utlis/StaticData";
import Button from "../ui/Button";
import {
  EditTreatmentPlanType,
  FollowUpActionFromType,
  MedicationPrescriptionType,
  TreatmentPlan,
} from "../../utlis/types/interfaces";
import { ChangeEvent, useState } from "react";
import { InputFieldGroup } from "../ui/InputField";
import {
  QuantityNumber,
  TimeSlotCheckBox,
} from "../../components/TempUiComponent";
import { RadioButtonGroup } from "../ui/RadioField";
import Textarea from "../ui/Textarea";
import { DatePickerFieldGroup } from "../ui/CustomDatePicker";
import { TimePickerFieldGroup } from "../ui/CustomTimePicker";
import toast from "react-hot-toast";
import { BsInfoCircle } from "react-icons/bs";

export function TreatmentPlanForm({
  setStep,
  setStepper,
}: {
  setStep: React.Dispatch<React.SetStateAction<number | undefined>>;
  setStepper: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  const initialFormData: TreatmentPlan = {
    treatment: "",
    duration: "",
  };

  type FormError = Partial<Record<keyof TreatmentPlan, string>>;

  const initialFormError: FormError = {};
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [formData, setFormData] = useState<TreatmentPlan>(initialFormData);

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

  const validateForm = (data: TreatmentPlan): FormError => {
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

interface MedicationPrescriptionFormProps {
  setStep?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setStepper?: React.Dispatch<React.SetStateAction<number | undefined>>;
  step?: number | undefined;
  stepper?: number | undefined;
  setMedicalPrescription?: React.Dispatch<
    React.SetStateAction<MedicationPrescriptionType[]>
  >;
  editForm?: MedicationPrescriptionType;
  setShowEditFormShowModel?: React.Dispatch<React.SetStateAction<boolean>>;
  setTreatmentPlanModel?: React.Dispatch<React.SetStateAction<boolean>>;
  medicalPrescription: MedicationPrescriptionType[];
  medicalPrescriptionDataShowHide?: boolean;
  setMedicalPrescriptionDataShowHide?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  saveBtnShow?: string;
  setMedicationAndTestsModel?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MedicationPrescriptionForm({
  setStep,
  setStepper,
  step,
  stepper,
  setMedicalPrescription,
  editForm,
  setShowEditFormShowModel,
  setTreatmentPlanModel,
  medicalPrescription,
  medicalPrescriptionDataShowHide,
  setMedicalPrescriptionDataShowHide,
  saveBtnShow,
  setMedicationAndTestsModel,
}: MedicationPrescriptionFormProps) {
  // console.log("editFormWithTests", editForm);

  const initialFormData: MedicationPrescriptionType = {
    id: editForm?.id || "",
    medicineName: editForm?.medicineName || "",
    type: editForm?.type || "",
    typeQuantity: editForm?.typeQuantity || "",
    duration: editForm?.duration || "",
    quantity: editForm?.quantity || 0,
    timeslot: editForm?.timeslot || ["morning"],
    meal: editForm?.meal || "Before",
    intake: editForm?.intake || "",
    description: editForm?.description || "",
  };

  type FormError = Partial<Record<keyof MedicationPrescriptionType, string>>;

  const initialFormError: FormError = {};
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [formData, setFormData] =
    useState<MedicationPrescriptionType>(initialFormData);

  const generateRandomId = (): string => {
    return Math.random().toString(36).substr(2, 9);
  };
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

  const validateForm = (data: MedicationPrescriptionType): FormError => {
    const errors: FormError = {};
    if (!data.medicineName.trim()) {
      errors.medicineName = "Medicine Name is required";
    }
    if (!data.type) {
      errors.type = "Type is required";
    }

    if (!data.typeQuantity.trim()) {
      errors.typeQuantity = "Quantity is required";
    }

    if (!data.duration) {
      errors.duration = "Duration is required";
    }

    if (!data.quantity) {
      errors.quantity = "Quantity is required";
    }

    if (!data.timeslot || data.timeslot.length === 0) {
      errors.timeslot = "Select at least one timeslot";
    }

    if (!data.intake.trim()) {
      errors.intake = "Intake is required";
    }

    return errors;
  };

  const handelNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("medical prescription add succesfully to open next step");
    setStep?.((prev: number | undefined) => (prev ?? 0) + 1);
    setStepper?.((prev: number | undefined) => (prev ?? 0) + 1);
    setFormError(initialFormError);
  };

  const handleAddNewMedication = (e: React.FormEvent) => {
    e.preventDefault();

    const tryAddMedication = () => {
      const errors = validateForm(formData);
      setFormError(errors);

      if (Object.keys(errors).length === 0) {
        const newMedication = {
          ...formData,
          id: generateRandomId(),
        };
        // console.log("newMedication", newMedication);
        setMedicalPrescription?.((prev) => [...prev, newMedication]);
        setFormData(initialFormData);
        setFormError(initialFormError);

        console.log("New medication added");
        return true;
      }
      return false;
    };

    if (medicalPrescriptionDataShowHide) {
      if (tryAddMedication()) {
        setMedicalPrescriptionDataShowHide?.(false); // hide form after successful add
      }
    } else if (medicalPrescription.length < 2) {
      tryAddMedication(); // directly add if < 2
    } else {
      setMedicalPrescriptionDataShowHide?.(true); // show extra form
    }
  };

  const handleSaveMedication = () => {
    // e.preventDefault();
    const errors = validateForm(formData);
    setFormError(errors);
    // console.log("errors", errors);

    if (Object.keys(errors).length === 0) {
      if (editForm) {
        setMedicalPrescription?.((prev) =>
          prev.map((item) =>
            item.id === editForm.id ? { ...formData, id: editForm.id } : item
          )
        );
        setMedicalPrescriptionDataShowHide?.(false);
        setShowEditFormShowModel?.(false);
        setStep?.(2);
        setStepper?.(2);
        setTreatmentPlanModel?.(true);
      }
      if (saveBtnShow == "addNewSave") {
        const newMedication = {
          ...formData,
          id: generateRandomId(),
        };
        setMedicalPrescription?.((prev) => [...prev, newMedication]);
        setFormData(initialFormData);
        setFormError(initialFormError);
        setShowEditFormShowModel?.(false);
      }
    }
    if (saveBtnShow == "save") {
      // const newMedication = {
      //     ...formData,
      //     id: generateRandomId(),
      // };
      // setMedicalPrescription?.((prev) => [...prev, newMedication]);
      // setFormData(initialFormData);
      // setFormError(initialFormError);

      setMedicationAndTestsModel?.(false);
      toast.success("Medication added successfully", {
        icon: <BsInfoCircle size={22} color="white" />,
      });
    }
  };

  // console.log("test" , formData);

  return (
    <>
      <form onSubmit={handelNext}>
        {(medicalPrescription.length < 2 ||
          medicalPrescriptionDataShowHide == true) && (
          <div className="Medication-form-Prescription-wrapper">
            <Row className="g-3">
              <Col md={12}>
                <InputFieldGroup
                  label="Medicine Name"
                  name="medicineName"
                  type="text"
                  className=""
                  placeholder="Enter Medicine Name"
                  required
                  disabled={false}
                  readOnly={false}
                  value={formData.medicineName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                  error={formError.medicineName}
                />
              </Col>
              <Col md={6}>
                <InputSelect
                  label="Type"
                  name="type"
                  value={formData.type}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    handleChange(e);
                  }}
                  onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {}}
                  required={true}
                  disabled={false}
                  placeholder="Select Type"
                  error={formError.type}
                  options={[
                    { id: "1", value: "Tablet", label: "Tablet" },
                    { id: "2", value: "Capsule", label: "Capsule" },
                    { id: "3", value: "Syrup", label: "Syrup" },
                  ]}
                />
              </Col>
              <Col md={6}>
                <InputFieldGroup
                  label="Quantity"
                  name="typeQuantity"
                  type="text"
                  className=""
                  placeholder="Enter Quantity"
                  required
                  disabled={false}
                  readOnly={false}
                  value={formData.typeQuantity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                  error={formError.typeQuantity}
                />
              </Col>

              <Col md={6}>
                <InputSelect
                  label="Duration"
                  name="duration"
                  value={formData.duration}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    handleChange(e);
                  }}
                  onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {}}
                  required={true}
                  disabled={false}
                  placeholder="Select Duration"
                  error={formError.duration}
                  options={[
                    { id: "1", value: "1 Days", label: "1 Day" },
                    { id: "2", value: "2 Days", label: "2 Days" },
                    { id: "3", value: "3 Days", label: "3 Days" },
                    { id: "4", value: "4 Days", label: "4 Days" },
                    { id: "5", value: "5 Days", label: "5 Days" },
                    { id: "6", value: "6 Days", label: "6 Days" },
                    { id: "7", value: "7 Days", label: "7 Days" },
                    { id: "8", value: "8 Days", label: "8 Days" },
                    { id: "9", value: "9 Days", label: "9 Days" },
                    { id: "10", value: "10 Days", label: "10 Days" },
                  ]}
                />
              </Col>
              <Col md={6}>
                <QuantityNumber
                  label="Quantity"
                  name="quantity"
                  required={true}
                  value={formData.quantity}
                  error={formError.quantity}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    handleChange(e);
                  }}
                />
              </Col>
              <Col md={12}>
                <TimeSlotCheckBox
                  name="timeslot"
                  value={formData.timeslot}
                  error={formError.timeslot}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e)
                  }
                />
              </Col>

              <Col md={6}>
                <RadioButtonGroup
                  label="Meal"
                  name="meal"
                  value={formData.meal}
                  onChange={(e) => handleChange(e)}
                  required
                  options={[
                    { label: "Before", value: "Before" },
                    { label: "After", value: "After" },
                  ]}
                />
              </Col>
              <Col md={6}>
                <InputFieldGroup
                  label="Intake"
                  name="intake"
                  type="text"
                  className=""
                  placeholder="Enter Intake"
                  required
                  disabled={false}
                  readOnly={false}
                  value={formData.intake}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                  error={formError.intake}
                />
              </Col>

              <Col md={12}>
                <Textarea
                  label="Additional Note"
                  name="description"
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    handleChange(e);
                  }}
                  onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {}}
                  required={false}
                  disabled={false}
                  error={formError.description}
                  maxLength={100}
                />
              </Col>
            </Row>
          </div>
        )}

        {saveBtnShow == "addNewSave" ? (
          <Button
            variant="outline"
            className="mt-3"
            onClick={handleSaveMedication}
          >
            Save
          </Button>
        ) : (
          <>
            {editForm ? (
              <Button
                variant="outline"
                className="mt-3"
                onClick={handleSaveMedication}
              >
                Save
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="mt-3"
                  onClick={handleAddNewMedication}
                >
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H10.9375V16.875C10.9375 17.1236 10.8387 17.3621 10.6629 17.5379C10.4871 17.7137 10.2486 17.8125 10 17.8125C9.75136 17.8125 9.5129 17.7137 9.33709 17.5379C9.16127 17.3621 9.0625 17.1236 9.0625 16.875V10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H9.0625V3.125C9.0625 2.87636 9.16127 2.6379 9.33709 2.46209C9.5129 2.28627 9.75136 2.1875 10 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z"
                        fill="#2B4360"
                      />
                    </svg>
                    Add New Medication
                  </div>
                </Button>

                <div className="d-flex mt-3 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStep?.(1);
                      setStepper?.(1);
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

                  {saveBtnShow == "save" ? (
                    <Button
                      variant="default"
                      className="w-100"
                      onClick={handleSaveMedication}
                    >
                      Save
                    </Button>
                  ) : (
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
                  )}
                </div>
              </>
            )}
          </>
        )}
      </form>
    </>
  );
}

interface FollowUpActionFormProps {
  setStep: React.Dispatch<React.SetStateAction<number | undefined>>;
  setStepper: React.Dispatch<React.SetStateAction<number | undefined>>;
  step: number | undefined;
  stepper: number | undefined;
  setTreatmentPlanModel: React.Dispatch<React.SetStateAction<boolean>>;
  setTreatmentDetailsTempShow?: React.Dispatch<React.SetStateAction<unknown[]>>;
  setSuccessModal?: React.Dispatch<React.SetStateAction<boolean>>;
  editTreatmentData?: EditTreatmentPlanType;
}

export function FollowUpActionForm({
  setStep,
  setStepper,
  step,
  stepper,
  setTreatmentPlanModel,
  setTreatmentDetailsTempShow,
  setSuccessModal,
  editTreatmentData,
}: FollowUpActionFormProps) {
  const initialFormData: FollowUpActionFromType = {
    nextStep: editTreatmentData?.followUpAction?.nextStep || "",
    appointmentDate: editTreatmentData?.followUpAction?.appointmentDate || "",
    appointmentTime: editTreatmentData?.followUpAction?.appointmentTime || "",
    forTime: editTreatmentData?.followUpAction?.forTime || "",
    instructionsForPatient:
      editTreatmentData?.followUpAction?.instructionsForPatient || "",
  };
  type FormError = Partial<Record<keyof FollowUpActionFromType, string>>;

  const initialFormError: FormError = {};
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [formData, setFormData] =
    useState<FollowUpActionFromType>(initialFormData);

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

  const validateForm = (data: FollowUpActionFromType): FormError => {
    const errors: FormError = {};
    if (!data.nextStep) {
      errors.nextStep = "Next Step is required";
    }
    if (!data.appointmentDate) {
      errors.appointmentDate = "Appointment Date is required";
    }
    if (!data.appointmentTime) {
      errors.appointmentTime = "Appointment Time is required";
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm(formData);
    setFormError(errors);
    if (Object.keys(errors).length === 0) {
      setFormError(initialFormError);
      setTreatmentPlanModel(false);
      setTreatmentDetailsTempShow?.([formData]); // show static data state

      setSuccessModal?.(true); // show suceess model
      toast.success("Treatment Plan added successfully", {
        icon: <BsInfoCircle size={22} color="white" />,
      });

      if (editTreatmentData?.followUpAction) {
        setStep?.(1); // only when Treatment edit steps
        setStepper?.(1);
        setFormData(initialFormData);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Row className="g-3">
          <h6 className="dashboard-chart-heading mb-0">Follow up action</h6>
          <Col md={12}>
            <InputSelect
              label="Next Step"
              name="nextStep"
              value={formData.nextStep}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {}}
              required={true}
              disabled={false}
              placeholder="Select Next Step"
              error={formError.nextStep}
              options={[
                {
                  id: "1",
                  value: "1 Ovarian Stimulation",
                  label: "1 Ovarian Stimulation",
                },
                { id: "2", value: "2 Step-2", label: "2 Step-2" },
                { id: "3", value: "3 Step-3", label: "3 Step-3" },
                { id: "4", value: "4 Step-4", label: "4 Step-4" },
              ]}
            />
          </Col>

          {formData.nextStep && (
            <>
              <Col md={4}>
                <DatePickerFieldGroup
                  label="Appointment Date"
                  name="appointmentDate"
                  placeholder="Select Date"
                  value={formData.appointmentDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                  }}
                  required={true}
                  error={formError.appointmentDate}
                  iconColor="var(--color-radio)"
                />
              </Col>
              <Col md={4}>
                <TimePickerFieldGroup
                  label="Appointment Time"
                  name="appointmentTime"
                  placeholder="Select Time"
                  value={formData.appointmentTime}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                  }}
                  required={true}
                  error={formError.appointmentTime}
                />
              </Col>
              <Col md={4}>
                <InputSelect
                  label="For"
                  name="forTime"
                  value={formData.forTime}
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
            </>
          )}

          <Col md={12}>
            <Textarea
              label="Instructions for patient"
              name="instructionsForPatient"
              value={formData.instructionsForPatient}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {}}
              required={false}
              disabled={false}
              error={formError.instructionsForPatient}
              maxLength={100}
            />
          </Col>

          <div className="d-flex mt-3 gap-3">
            <Button
              variant="outline"
              className="w-100"
              onClick={() => {
                setStep(step ? step - 1 : step);
                setStepper(stepper ? stepper - 1 : stepper);
              }}
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
              Create Plan
            </Button>
          </div>
        </Row>
      </form>
    </>
  );
}
