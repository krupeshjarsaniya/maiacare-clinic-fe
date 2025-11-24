"use client";
import Image from "next/image";
import ContentContainer from "./ui/ContentContainer";
import logo from "../assets/images/maiacarelogo.png";
import { Col, Row } from "react-bootstrap";

/**
 * This component renders a page for displaying a patient's invoice.
 * It shows the patient's details, appointment details, and service details.
 */
const PatientPaymentInvoice = () => {
  return (
    <>
      <ContentContainer>
        <div className="d-flex justify-content-between">
          <Image src={logo} width={116} height={40} alt="maia-logo" />

          <h3 className="invoice-main-header">Invoice</h3>
        </div>
      </ContentContainer>

      <ContentContainer className="mt-3">
        <div className="d-flex ">
          <div className="d-flex flex-column gap-2 me-3">
            <p className="invoice-no-title m-0">Invoice No:</p>
            <p className="invoice-no-title m-0">Date:</p>
          </div>
          <div className="d-flex flex-column gap-2">
            <p className="invoice-no-title-subtitle m-0">INV-12345</p>
            <p className="invoice-no-title-subtitle m-0">8 Jul, 2024</p>
          </div>
        </div>
      </ContentContainer>

      <Row className="mt-3 g-3">
        <Col lg={6}>
          <ContentContainer>
            <p className="appointment-details-invoice-header">To</p>

            <h3 className="invoice-doctor-name">Dr. Riya Dharang</h3>
            <div className="d-flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
              >
                <path
                  d="M17.482 12.7819L13.8016 11.1327L13.7914 11.128C13.6003 11.0462 13.3919 11.0134 13.185 11.0325C12.978 11.0516 12.7791 11.122 12.6063 11.2373C12.5859 11.2508 12.5663 11.2654 12.5477 11.2811L10.6461 12.9022C9.44141 12.317 8.19766 11.0827 7.61251 9.89359L9.23594 7.96312C9.25157 7.94359 9.26641 7.92406 9.28048 7.90297C9.39331 7.73055 9.46177 7.53291 9.47976 7.32763C9.49775 7.12236 9.46472 6.91582 9.3836 6.7264V6.71703L7.72969 3.03031C7.62246 2.78286 7.43807 2.57673 7.20406 2.44268C6.97005 2.30864 6.69895 2.25387 6.43126 2.28656C5.37264 2.42586 4.40093 2.94575 3.69761 3.74914C2.99429 4.55252 2.60747 5.58444 2.60938 6.65219C2.60938 12.8553 7.65626 17.9022 13.8594 17.9022C14.9271 17.9041 15.9591 17.5173 16.7624 16.814C17.5658 16.1106 18.0857 15.1389 18.225 14.0803C18.2578 13.8127 18.2031 13.5417 18.0692 13.3077C17.9353 13.0737 17.7293 12.8892 17.482 12.7819ZM13.8594 16.6522C11.2081 16.6493 8.66625 15.5948 6.79151 13.7201C4.91678 11.8453 3.86228 9.30346 3.85938 6.65219C3.85644 5.88929 4.1313 5.1514 4.63261 4.57633C5.13393 4.00126 5.82743 3.62833 6.5836 3.52719C6.58329 3.5303 6.58329 3.53344 6.5836 3.53656L8.22423 7.20844L6.60938 9.14125C6.59299 9.16011 6.5781 9.18022 6.56485 9.2014C6.44728 9.38181 6.37832 9.58953 6.36463 9.80442C6.35094 10.0193 6.393 10.2341 6.48673 10.428C7.19454 11.8756 8.65313 13.3233 10.1164 14.0303C10.3117 14.1232 10.5277 14.1638 10.7434 14.1482C10.9591 14.1325 11.167 14.0613 11.3469 13.9412C11.3669 13.9277 11.3862 13.9131 11.4047 13.8975L13.3039 12.2772L16.9758 13.9217C16.9758 13.9217 16.982 13.9217 16.9844 13.9217C16.8845 14.679 16.5121 15.3739 15.9369 15.8764C15.3617 16.379 14.6232 16.6548 13.8594 16.6522Z"
                  fill="#8A8D93"
                />
              </svg>
              <p className="invoice-doctor-contact-detail m-0 mb-1">
                +91 12345 67890
              </p>
            </div>
            <div className="d-flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
              >
                <path
                  d="M10.1094 5.40234C9.49131 5.40234 8.88712 5.58562 8.37322 5.929C7.85931 6.27238 7.45878 6.76044 7.22225 7.33146C6.98573 7.90248 6.92384 8.53081 7.04442 9.137C7.165 9.74319 7.46263 10.3 7.89967 10.7371C8.33671 11.1741 8.89353 11.4717 9.49972 11.5923C10.1059 11.7129 10.7342 11.651 11.3053 11.4145C11.8763 11.1779 12.3643 10.7774 12.7077 10.2635C13.0511 9.7496 13.2344 9.14541 13.2344 8.52734C13.2344 7.69854 12.9051 6.90369 12.3191 6.31764C11.733 5.73158 10.9382 5.40234 10.1094 5.40234ZM10.1094 10.4023C9.73853 10.4023 9.37602 10.2924 9.06768 10.0863C8.75934 9.88032 8.51901 9.58749 8.3771 9.24487C8.23519 8.90226 8.19806 8.52526 8.2704 8.16155C8.34275 7.79783 8.52133 7.46374 8.78355 7.20152C9.04577 6.93929 9.37987 6.76072 9.74358 6.68837C10.1073 6.61602 10.4843 6.65316 10.8269 6.79507C11.1695 6.93698 11.4624 7.17731 11.6684 7.48565C11.8744 7.79399 11.9844 8.1565 11.9844 8.52734C11.9844 9.02462 11.7868 9.50154 11.4352 9.85317C11.0836 10.2048 10.6067 10.4023 10.1094 10.4023ZM10.1094 1.65234C8.28665 1.65441 6.53916 2.3794 5.2503 3.66827C3.96143 4.95713 3.23644 6.70462 3.23438 8.52734C3.23438 10.9805 4.36797 13.5805 6.51562 16.0469C7.48064 17.1614 8.56676 18.165 9.75391 19.0391C9.85899 19.1127 9.98419 19.1522 10.1125 19.1522C10.2408 19.1522 10.366 19.1127 10.4711 19.0391C11.6561 18.1646 12.7401 17.161 13.7031 16.0469C15.8477 13.5805 16.9844 10.9805 16.9844 8.52734C16.9823 6.70462 16.2573 4.95713 14.9685 3.66827C13.6796 2.3794 11.9321 1.65441 10.1094 1.65234ZM10.1094 17.7461C8.81797 16.7305 4.48438 13 4.48438 8.52734C4.48438 7.0355 5.07701 5.60476 6.1319 4.54987C7.18679 3.49498 8.61753 2.90234 10.1094 2.90234C11.6012 2.90234 13.032 3.49498 14.0869 4.54987C15.1417 5.60476 15.7344 7.0355 15.7344 8.52734C15.7344 12.9984 11.4008 16.7305 10.1094 17.7461Z"
                  fill="#8A8D93"
                />
              </svg>
              <p className="invoice-doctor-contact-detail m-0 pe-5">
                2nd Floor, Lakeview Complex, Hiranandani Gardens, Powai, 400072
                Mumbai
              </p>
            </div>
          </ContentContainer>
        </Col>
        <Col lg={6}>
          <ContentContainer>
            <p className="appointment-details-invoice-header">
              Appointment Details
            </p>

            <Row className="g-3">
              <Col sm={4} className="col-6">
                <p className="appointment-details-invoice-title m-0 mb-1">
                  Patient ID
                </p>
                <p className="appointment-details-invoice-subtitle m-0">
                  PTS-874562
                </p>
              </Col>
              <Col sm={4} className="col-6">
                <p className="appointment-details-invoice-title m-0 mb-1">
                  Patient Name
                </p>
                <p className="appointment-details-invoice-subtitle m-0">
                  Meera Iyer
                </p>
              </Col>
              <Col sm={4} className="col-6">
                <p className="appointment-details-invoice-title m-0 mb-1">
                  Phone No
                </p>
                <p className="appointment-details-invoice-subtitle m-0">
                  +91 9876543210
                </p>
              </Col>
              <Col sm={4} className="col-6">
                <p className="appointment-details-invoice-title m-0 mb-1">
                  Date
                </p>
                <p className="appointment-details-invoice-subtitle m-0">
                  7 Jul, 2024
                </p>
              </Col>
              <Col sm={4} className="col-6">
                <p className="appointment-details-invoice-title m-0 mb-1">
                  Time
                </p>
                <p className="appointment-details-invoice-subtitle m-0">
                  10:00 AM
                </p>
              </Col>
              <Col sm={4} className="col-6">
                <p className="appointment-details-invoice-title m-0 mb-1">
                  Payment Method
                </p>
                <p className="appointment-details-invoice-subtitle m-0">
                  Online
                </p>
              </Col>
            </Row>
          </ContentContainer>
        </Col>
      </Row>

      <ContentContainer className="mt-3">
        <p className="appointment-details-invoice-header">Service Details</p>

        <div className="service-details-box">
          <div className="service-details-box-header px-3 py-2 d-flex justify-content-between">
            <p className="service-details-box-header-content m-0">
              Description
            </p>
            <p className="service-details-box-header-content m-0">
              Total Price
            </p>
          </div>
          <div className="px-3">
            <div className="service-details-box-content d-flex flex-column gap-3">
              <div className="d-flex justify-content-between">
                <p className="service-details-box-content-data m-0">
                  IVF Treatment
                </p>
                <p className="service-details-box-content-data m-0">₹ 500</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="service-details-box-content-data m-0">
                  Fertility Tests
                </p>
                <p className="service-details-box-content-data m-0">₹ 1500</p>
              </div>
            </div>

            <div className="service-details-box-content-hr"></div>

            <div className="service-details-box-content d-flex flex-column gap-3">
              <div className="d-flex justify-content-between">
                <p className="service-details-box-content-data m-0">
                  Commission(5%)
                </p>
                <p className="service-details-box-content-data m-0">₹ 320</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="modal-custom-header m-0">Grand Total</p>
                <p className="service-details-box-content-data-total m-0">
                  ₹ 320
                </p>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </>
  );
};

export default PatientPaymentInvoice;
