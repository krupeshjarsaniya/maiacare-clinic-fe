import React from "react";
import ContentContainer from "./ui/ContentContainer";
import Maiacarelogo from "../assets/images/maiacarelogo.png";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import call from "../assets/images/Phone.png";
import location from "../assets/images/location.png";
export default function ViewInvoice() {
  return (
    <div>
      <ContentContainer>
        <div className="d-flex align-items-center justify-content-between">
          <Image src={Maiacarelogo} alt="" width={100} height={35} />
          <div className="view_invoice_text">Invoice</div>
        </div>
      </ContentContainer>
      <ContentContainer className="mt-4">
        <div className="d-flex gap-3">
          <div className="d-flex flex-column view_invoice_data">
            <span>Invoice No.</span>
            <span>Date</span>
          </div>
          <div className="d-flex flex-column date">
            <span>INV-12345</span>
            <span>8 Jul, 2024</span>
          </div>
        </div>
      </ContentContainer>
      <Row className="mt-4">
        {/* doctor card */}
        <Col md={6}>
          <ContentContainer>
            <span className="date">To</span>
            <div>
              <div className="doctor_heading">Dr. Riya Dharang</div>
              <div className="d-flex align-items-center gap-2 mb-1 mt-2">
                <Image src={call} alt="call" width={16} height={16} />
                <span className="doctor_card_text">+91 12345 67890</span>
              </div>
              <div className="d-flex gap-2" style={{ paddingLeft: "2px" }}>
                <Image src={location} alt="location" width={13} height={16} />
                <span className="doctor_card_text">
                  2nd Floor, Lakeview Complex, Hiranandani Gardens, Powai,
                  400072 Mumbai
                </span>
              </div>
            </div>
          </ContentContainer>
        </Col>
        {/* appointment card */}
        <Col md={6}>
          <ContentContainer>
            <div>
              <div className="fs-6 fw-semibold">Appointment Details</div>
              <div className="d-flex justify-content-between mt-3">
                <div className="d-flex flex-column">
                  <span className="patient_heading">Patient ID</span>
                  <span className="patient_text">PTS-874562</span>
                </div>
                <div className="d-flex flex-column">
                  <span className="patient_heading">Patient Name</span>
                  <span className="patient_text">Meera Iyer</span>
                </div>
                <div className="d-flex flex-column">
                  <span className="patient_heading">Phone No.</span>
                  <span className="patient_text">+91 8987656874</span>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-1">
                <div className="d-flex flex-column">
                  <span className="patient_heading">Date</span>
                  <span className="patient_text">7 Jul, 2024</span>
                </div>
                <div className="d-flex flex-column">
                  <span className="patient_heading">Time</span>
                  <span className="patient_text">10:00 AM</span>
                </div>
                <div className="d-flex flex-column">
                  <span className="patient_heading">Payment Method</span>
                  <span className="patient_text">Online</span>
                </div>
              </div>
            </div>
          </ContentContainer>
        </Col>
      </Row>
      <ContentContainer className="mt-4">
        <div>
          <div className="fs-6 fw-semibold">Service Details</div>
          <div className="service_details_table mt-3">
            <div className="d-flex justify-content-between table_th">
              <div>Description</div>
              <div>Total Price</div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="service_card">
                <div className="mb-3">IVF Treatment</div>
                <div>Fertility Tests</div>
              </div>
              <div className="service_card">
                <div className="mb-3">
                  <span style={{ color: "#8A8D93" }}>₹</span> 500
                </div>
                <div>
                  <span style={{ color: "#8A8D93" }}>₹</span> 1500
                </div>
              </div>
            </div>
            <div className="service_border"></div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="service_card">
                <div className="mb-2">Commission(5%)</div>
                <div className="total_text">Grand Total</div>
              </div>
              <div className="service_card">
                <div className="mb-3">
                  <span style={{ color: "#8A8D93" }}>₹</span> 320
                </div>
                <div style={{fontSize:"20px",fontWeight:"600"}}>
                  <span style={{ color: "#3E4A57" }}>₹</span> 320
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
}
