"use client";

import { Accordion, Col, Row } from "react-bootstrap";
import { InputSelect, InputSelectMultiSelect } from "../ui/InputSelect";
import { ChangeEvent, useState } from "react";
import Button from "../ui/Button";
import {
  EditTreatmentPlanType,
  MedicationTests,
} from "../../utlis/types/interfaces";
import { InputFieldGroup } from "../ui/InputField";

const bloodTestTemp = [
  { id: "cbc", name: "CBC", checked: true },
  { id: "cmp", name: "CMP", checked: false },
  { id: "hiv", name: "HIV Test", checked: false },
  { id: "pt", name: "PT", checked: false },
  { id: "iron", name: "Iron Studies", checked: false },
  { id: "crp", name: "CRP", checked: false },
  { id: "lipid", name: "Lipid Panel", checked: false },
  { id: "lft", name: "LFT", checked: false },
  { id: "bmp", name: "BMP", checked: false },
  { id: "hemo", name: "Hemoglobin A1c", checked: false },
  { id: "vitd", name: "Vitamin D Test", checked: false },
  { id: "bnp", name: "BNP", checked: false },
  { id: "vitb12", name: "Vitamin B12 Test", checked: false },
  { id: "tsh", name: "TSH", checked: false },
  { id: "folate", name: "Folate Test", checked: false },
  { id: "coag", name: "Coagulation Panel", checked: false },
  { id: "cortisol", name: "Cortisol Test", checked: false },
  { id: "ddimer", name: "D-dimer Test", checked: false },
];

export function TestsForm({
  setStep,
  setStepper,
  setMedicationAndTestsModel,
  editTreatmentData,
}: {
  setStep: React.Dispatch<React.SetStateAction<number | undefined>>;
  setStepper: React.Dispatch<React.SetStateAction<number | undefined>>;
  setMedicationAndTestsModel?: React.Dispatch<React.SetStateAction<boolean>>;
  editTreatmentData?: EditTreatmentPlanType;
}) {
  const initialFormData: MedicationTests = {
    tests: editTreatmentData?.tests || [],
  };

  type FormError = Partial<Record<keyof MedicationTests, string>>;

  const initialFormError: FormError = {};
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [formData, setFormData] = useState<MedicationTests>(initialFormData);

  const [bloodTest, setBloodTest] = useState(bloodTestTemp);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const validateForm = (data: MedicationTests): FormError => {
    const errors: FormError = {};
    if (data.tests.length == 0) {
      errors.tests = "Tests is required";
    }
    return errors;
  };

  const handelNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm(formData);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      setStep((prev) => (prev ?? 0) + 1);
      setStepper((prev) => (prev ?? 0) + 1);

      setFormError(initialFormError);
    }
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

  const handleTestChange = (id: string) => {
    setBloodTest((prev) =>
      prev.map((test) =>
        test.id === id ? { ...test, checked: !test.checked } : test
      )
    );
  };

  return (
    <>
      <form onSubmit={handelNext}>
        <Row className="g-3">
          <h6 className="dashboard-chart-heading mb-0">Tests</h6>
          <Col md={12}>
            <InputSelectMultiSelect
              label="Select Tests"
              name="tests"
              values={formData.tests}
              onChange={(values) => {
                setFormData((prev) => ({ ...prev, tests: values }));
                setFormError((prev) => ({ ...prev, tests: "" }));
              }}
              options={[
                { id: "1", value: "Blood Test", label: "Blood Test" },
                { id: "2", value: "Sonography", label: "Sonography" },
                { id: "3", value: "other", label: "other" },
              ]}
              placeholder="Select Treatment"
              addPlaceholder="Add Treatment"
              required={true}
              dropdownHandle={false} // open close arrow icon show hide
              selectedOptionColor="var(--border-box)"
              selectedOptionBorderColor="var(--border-box)"
              error={formError.tests}
            />

            {formData.tests.length > 0 && (
              <Accordion defaultActiveKey="0" className="mt-md-4 mt-2">
                <Accordion.Item
                  eventKey="0"
                  className="phisical-assessment-accordion-item mb-3"
                >
                  <Accordion.Header className="phisical-assessment-accordion-title-showData">
                    <h6 className="doctor-listing-modal-profile-title m-0">
                      Blood Test
                    </h6>
                  </Accordion.Header>
                  <Accordion.Body className="pt-0">
                    <div>
                      <InputFieldGroup
                        name="search"
                        type="text"
                        // value={formData.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setSearchTerm(e.target.value); // update search term
                        }}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                        placeholder="search"
                        required={false}
                        disabled={false}
                        readOnly={false}
                        // error={formError.name}
                        className="position-relative blood-test-search"
                      >
                        <div className="blood-test-search-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                          >
                            <path
                              d="M18.5677 16.8364L14.8576 13.1246C15.97 11.675 16.4893 9.85652 16.3103 8.03804C16.1312 6.21956 15.2672 4.53728 13.8934 3.33245C12.5196 2.12762 10.7389 1.49047 8.91264 1.55024C7.08635 1.61001 5.35117 2.36223 4.05909 3.65431C2.76702 4.94638 2.0148 6.68156 1.95503 8.50785C1.89526 10.3341 2.53241 12.1148 3.73724 13.4886C4.94207 14.8624 6.62435 15.7264 8.44283 15.9055C10.2613 16.0846 12.0798 15.5652 13.5294 14.4528L17.2427 18.1668C17.3299 18.254 17.4335 18.3232 17.5474 18.3704C17.6613 18.4176 17.7835 18.4419 17.9068 18.4419C18.0301 18.4419 18.1522 18.4176 18.2662 18.3704C18.3801 18.3232 18.4836 18.254 18.5708 18.1668C18.658 18.0796 18.7272 17.9761 18.7744 17.8622C18.8216 17.7482 18.8459 17.6261 18.8459 17.5028C18.8459 17.3794 18.8216 17.2573 18.7744 17.1434C18.7272 17.0294 18.658 16.9259 18.5708 16.8387L18.5677 16.8364ZM3.84193 8.74965C3.84193 7.69894 4.15351 6.67182 4.73725 5.79818C5.321 4.92455 6.1507 4.24363 7.12143 3.84154C8.09216 3.43945 9.16033 3.33424 10.1909 3.53923C11.2214 3.74421 12.168 4.25018 12.9109 4.99314C13.6539 5.73611 14.1599 6.68271 14.3649 7.71323C14.5698 8.74376 14.4646 9.81192 14.0625 10.7827C13.6605 11.7534 12.9795 12.5831 12.1059 13.1668C11.2323 13.7506 10.2051 14.0621 9.15444 14.0621C7.74592 14.0607 6.3955 13.5005 5.39953 12.5046C4.40356 11.5086 3.84338 10.1582 3.84193 8.74965Z"
                              fill="#B0B4C1"
                            />
                          </svg>
                        </div>
                      </InputFieldGroup>

                      <Row className="g-3 mt-1">
                        {bloodTest
                          .filter((test) =>
                            test.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          .map((test) => (
                            <Col lg={4} md={6} sm={12} key={test.id}>
                              <div className="blood-test-box">
                                <div className="form-check d-flex gap-2 align-items-center ">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={test.id}
                                    checked={test.checked}
                                    onChange={() => handleTestChange(test.id)}
                                  />
                                  <label
                                    className="form-check-label user-select-none blood-test-box-labe mt-1"
                                    htmlFor={test.id}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {test.name}
                                  </label>
                                </div>
                              </div>
                            </Col>
                          ))}
                      </Row>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item
                  eventKey="1"
                  className="phisical-assessment-accordion-item mb-3"
                >
                  <Accordion.Header className="phisical-assessment-accordion-title-showData">
                    <h6 className="doctor-listing-modal-profile-title m-0">
                      Sonography
                    </h6>
                  </Accordion.Header>
                  <Accordion.Body className="pt-0">
                    <div>
                      <InputFieldGroup
                        name="search"
                        type="text"
                        // value={formData.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setSearchTerm(e.target.value); // update search term
                        }}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
                        placeholder="search"
                        required={false}
                        disabled={false}
                        readOnly={false}
                        // error={formError.name}
                        className="position-relative blood-test-search"
                      >
                        <div className="blood-test-search-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                          >
                            <path
                              d="M18.5677 16.8364L14.8576 13.1246C15.97 11.675 16.4893 9.85652 16.3103 8.03804C16.1312 6.21956 15.2672 4.53728 13.8934 3.33245C12.5196 2.12762 10.7389 1.49047 8.91264 1.55024C7.08635 1.61001 5.35117 2.36223 4.05909 3.65431C2.76702 4.94638 2.0148 6.68156 1.95503 8.50785C1.89526 10.3341 2.53241 12.1148 3.73724 13.4886C4.94207 14.8624 6.62435 15.7264 8.44283 15.9055C10.2613 16.0846 12.0798 15.5652 13.5294 14.4528L17.2427 18.1668C17.3299 18.254 17.4335 18.3232 17.5474 18.3704C17.6613 18.4176 17.7835 18.4419 17.9068 18.4419C18.0301 18.4419 18.1522 18.4176 18.2662 18.3704C18.3801 18.3232 18.4836 18.254 18.5708 18.1668C18.658 18.0796 18.7272 17.9761 18.7744 17.8622C18.8216 17.7482 18.8459 17.6261 18.8459 17.5028C18.8459 17.3794 18.8216 17.2573 18.7744 17.1434C18.7272 17.0294 18.658 16.9259 18.5708 16.8387L18.5677 16.8364ZM3.84193 8.74965C3.84193 7.69894 4.15351 6.67182 4.73725 5.79818C5.321 4.92455 6.1507 4.24363 7.12143 3.84154C8.09216 3.43945 9.16033 3.33424 10.1909 3.53923C11.2214 3.74421 12.168 4.25018 12.9109 4.99314C13.6539 5.73611 14.1599 6.68271 14.3649 7.71323C14.5698 8.74376 14.4646 9.81192 14.0625 10.7827C13.6605 11.7534 12.9795 12.5831 12.1059 13.1668C11.2323 13.7506 10.2051 14.0621 9.15444 14.0621C7.74592 14.0607 6.3955 13.5005 5.39953 12.5046C4.40356 11.5086 3.84338 10.1582 3.84193 8.74965Z"
                              fill="#B0B4C1"
                            />
                          </svg>
                        </div>
                      </InputFieldGroup>

                      <Row className="g-3 mt-1">
                        {bloodTest
                          .filter((test) =>
                            test.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          .map((test) => (
                            <Col md={4} key={test.id}>
                              <div className="blood-test-box">
                                <div className="form-check d-flex gap-2 align-items-center ">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={test.id}
                                    checked={test.checked}
                                    onChange={() => handleTestChange(test.id)}
                                  />
                                  <label
                                    className="form-check-label user-select-none blood-test-box-labe mt-1"
                                    htmlFor={test.id}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {test.name}
                                  </label>
                                </div>
                              </div>
                            </Col>
                          ))}
                      </Row>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}
          </Col>

          <div className="d-flex gap-3">
            {editTreatmentData ? (
              <Button
                variant="outline"
                onClick={() => {
                  setStep?.((prev) => (prev ?? 0) - 1);
                  setStepper?.((prev) => (prev ?? 0) - 1);
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
            ) : (
              <Button
                variant="outline"
                onClick={() => setMedicationAndTestsModel?.(false)}
                className="w-100"
              >
                Cancel
              </Button>
            )}

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
