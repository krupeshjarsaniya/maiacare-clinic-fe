import React, { useState } from "react";
import Button from "../ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TimePickerFieldGroup } from "../ui/CustomTimePicker";
import { Col, Form, Row } from "react-bootstrap";
import ContentContainer from "../ui/ContentContainer";
export default function EditOperationalHours({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) {
  type FormData = {
    MF: string;
    SS: string;
    Time: string;
    Timer: string;

    // selection
    M: string;
    T: string;
    W: string;
    Th: string;
    F: string;
    S: string;
    Sun: string;
  };

  const initialFormData: FormData = {
    MF: "",
    SS: "",
    Time: "",
    Timer: "",

    // selection
    M: "",
    T: "",
    W: "",
    Th: "",
    F: "",
    S: "",
    Sun: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [custome, setCustome] = useState(0);
  const handleSelect = () => {
    setCustome(custome === 0 ? 1 : 0);
  };

  return (
    <div>
      <ContentContainer className="mt-4">
        <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center text-center text-md-start mb-3">
          <h5 className="profile-card-main-titile mb-2 mb-md-0">
            Operational hours & Days
          </h5>
          <div className="d-flex gap-3">
            <Form.Check
              type="checkbox"
              label="Select custom Hours and Days?"
              onClick={handleSelect}
              className="text-nowrap check-box input"
            />
            <Form.Check
              type="checkbox"
              label="Open 24/7"
              className="text-nowrap check-box input"
            />
          </div>
        </div>
        {custome === 0 ? (
          <>
            {/* monday-friday */}
            <Row className="mb-3">
              <Col md={6}>
                <TimePickerFieldGroup
                  label="Monday–Friday"
                  name="MF"
                  value={formData.MF}
                  onChange={(e) => {
                    setFormData({ ...formData, MF: e.target.value });
                  }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Time"
                  value={formData.Time}
                  onChange={(e) => {
                    setFormData({ ...formData, Time: e.target.value });
                  }}
                />
              </Col>
            </Row>
            {/* saturday-sunday */}
            <Row className="mb-3">
              <Col md={6}>
                <TimePickerFieldGroup
                  label="Saturday–Sunday"
                  name="SS"
                  value={formData.SS}
                  onChange={(e) => {
                    setFormData({ ...formData, SS: e.target.value });
                  }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Timer"
                  value={formData.Timer}
                  onChange={(e) => {
                    setFormData({ ...formData, Timer: e.target.value });
                  }}
                />
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row className="mb-3">
              <Col md={6}>
                {/* <Form.Check
                    type="checkbox"
                    className="text-nowrap check-box input"
                  /> */}

                <TimePickerFieldGroup
                  label="Monday"
                  name="M"
                  value={formData.M}
                  onChange={(e: { target: { value: string } }) => {
                    setFormData({ ...formData, M: e.target.value });
                  }}
                  style={{ margintop: "8px" }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Time"
                  value={formData.Time}
                  onChange={(e) => {
                    setFormData({ ...formData, Time: e.target.value });
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                {/* <Form.Check
              type="checkbox"
              className="text-nowrap check-box input"
            /> */}

                <TimePickerFieldGroup
                  label="Tuesday"
                  name="T"
                  value={formData.T}
                  onChange={(e: { target: { value: string } }) => {
                    setFormData({ ...formData, T: e.target.value });
                  }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Time"
                  value={formData.Time}
                  onChange={(e) => {
                    setFormData({ ...formData, Time: e.target.value });
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                {/* <Form.Check
              type="checkbox"
              className="text-nowrap check-box input"
            /> */}

                <TimePickerFieldGroup
                  label="Wednesday"
                  name="W"
                  value={formData.W}
                  onChange={(e: { target: { value: string } }) => {
                    setFormData({ ...formData, W: e.target.value });
                  }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Time"
                  value={formData.Time}
                  onChange={(e) => {
                    setFormData({ ...formData, Time: e.target.value });
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                {/* <Form.Check
              type="checkbox"
              className="text-nowrap check-box input"
            /> */}

                <TimePickerFieldGroup
                  label="Thursday"
                  name="Th"
                  value={formData.Th}
                  onChange={(e: { target: { value: string } }) => {
                    setFormData({ ...formData, Th: e.target.value });
                  }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Time"
                  value={formData.Time}
                  onChange={(e) => {
                    setFormData({ ...formData, Time: e.target.value });
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                {/* <Form.Check
              type="checkbox"
              className="text-nowrap check-box input"
            /> */}

                <TimePickerFieldGroup
                  label="Friday"
                  name="F"
                  value={formData.F}
                  onChange={(e: { target: { value: string } }) => {
                    setFormData({ ...formData, F: e.target.value });
                  }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Time"
                  value={formData.Time}
                  onChange={(e) => {
                    setFormData({ ...formData, Time: e.target.value });
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                {/* <Form.Check
              type="checkbox"
              className="text-nowrap check-box input"
            /> */}

                <TimePickerFieldGroup
                  label="Saturday"
                  name="S"
                  value={formData.S}
                  onChange={(e: { target: { value: string } }) => {
                    setFormData({ ...formData, S: e.target.value });
                  }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Time"
                  value={formData.Time}
                  onChange={(e) => {
                    setFormData({ ...formData, Time: e.target.value });
                  }}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                {/* <Form.Check
              type="checkbox"
              className="text-nowrap check-box input"
            /> */}

                <TimePickerFieldGroup
                  label="Sunday"
                  name="Sun"
                  value={formData.Sun}
                  onChange={(e: { target: { value: string } }) => {
                    setFormData({ ...formData, Sun: e.target.value });
                  }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Time"
                  value={formData.Time}
                  onChange={(e) => {
                    setFormData({ ...formData, Time: e.target.value });
                  }}
                />
              </Col>
            </Row>
          </>
        )}

        <div>
          <Form.Check
            type="checkbox"
            label="Emergency Doctors Available 24/7"
            className="text-nowrap check-box input"
          />
        </div>
      </ContentContainer>

      {/* Next Button */}
      <div className="d-flex justify-content-end mt-4 gap-3">
        <Button
          variant="dark"
          className="maiacare-button edit-profile-btn"
          onClick={onPrevious}
        >
          <ArrowLeft size={16} /> Previous
        </Button>
        <Button
          variant="dark"
          className="maiacare-button common-btn-blue"
          onClick={onNext}
        >
          Next <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
