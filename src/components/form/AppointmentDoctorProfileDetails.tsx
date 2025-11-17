import React from "react";
import ContentContainer from "../ui/ContentContainer";
import Image from "next/image";
import doctor from "../../assets/images/Profile-doctor.png";
import { Col, Dropdown, Row } from "react-bootstrap";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import sthetoscope from "../../assets/images/Stethoscope.png";
import calender from "../../assets/images/CalendarDoctorAppoint.png";
import clock from "../../assets/images/clock.png";
import Button from "../ui/Button";
import { AppointmentRequestCancelModel } from "../TempAppoRequstCancelModel";
export default function AppointmentDoctorProfileDetails() {
  return (
    <div>
      <ContentContainer>
        <div className="d-flex  justify-content-between align-items-center">
          <div>
            <div className="d-flex align-items-center mb-1">
              <h6 className="mb-0 doctor-profile-heading me-2">
                Appointment Details
              </h6>
              <span className="doctor-journey-badge-InProgress">New</span>
            </div>
            <div>
              <span style={{ color: "#3E4A57" }}>
                Appointment ID <span className="fw-semibold">#123456</span>
              </span>
            </div>
          </div>
          <div>
            <Dropdown align="end" className="d-flex align-items-center">
              <Dropdown.Toggle
                as="button"
                id="dropdown-basic"
                className="bg-transparent border-0 p-1 no-caret"
              >
                <div className="patient-profile-dot">
                  <HiOutlineDotsHorizontal />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-end">
                <Dropdown.Item className="no-hover">
                  <div className="d-flex align-items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M7.65626 4.37475V6.62842L9.52493 7.74952C9.6005 7.79299 9.66664 7.85108 9.71951 7.92041C9.77237 7.98973 9.81089 8.06889 9.83282 8.15326C9.85475 8.23763 9.85965 8.32553 9.84724 8.41182C9.83482 8.49811 9.80533 8.58106 9.7605 8.65583C9.71567 8.73059 9.65639 8.79568 9.58613 8.84728C9.51586 8.89888 9.43602 8.93597 9.35127 8.95637C9.26651 8.97678 9.17854 8.98009 9.09249 8.96611C9.00644 8.95214 8.92403 8.92116 8.85009 8.87499L6.66259 7.56249C6.56537 7.50421 6.48491 7.42174 6.42903 7.32313C6.37316 7.22451 6.34378 7.1131 6.34376 6.99975V4.37475C6.34376 4.2007 6.4129 4.03378 6.53597 3.91071C6.65904 3.78764 6.82596 3.7185 7.00001 3.7185C7.17406 3.7185 7.34098 3.78764 7.46405 3.91071C7.58712 4.03378 7.65626 4.2007 7.65626 4.37475ZM12.25 2.8435C12.076 2.8435 11.909 2.91264 11.786 3.03571C11.6629 3.15878 11.5938 3.3257 11.5938 3.49975V3.9028C11.3635 3.64741 11.1245 3.39366 10.867 3.1328C10.1069 2.37279 9.13967 1.85363 8.08621 1.64017C7.03274 1.42672 5.93973 1.52844 4.94375 1.93262C3.94777 2.33681 3.09298 3.02554 2.48619 3.91276C1.8794 4.79997 1.54751 5.84633 1.532 6.92109C1.51649 7.99585 1.81805 9.05135 2.39898 9.95571C2.97992 10.8601 3.81448 11.5732 4.79838 12.0059C5.78229 12.4387 6.8719 12.5719 7.93109 12.3889C8.99027 12.206 9.97205 11.7149 10.7538 10.9772C10.8804 10.8577 10.9543 10.6927 10.9594 10.5187C10.9644 10.3447 10.9001 10.1757 10.7806 10.0491C10.661 9.92251 10.4961 9.84855 10.3221 9.84352C10.148 9.8385 9.97913 9.90282 9.85251 10.0223C9.25851 10.5829 8.51251 10.9561 7.70769 11.0951C6.90287 11.2342 6.07491 11.1331 5.32721 10.8044C4.57952 10.4757 3.94525 9.93404 3.50361 9.24698C3.06198 8.55993 2.83256 7.75798 2.84402 6.94131C2.85548 6.12464 3.1073 5.32945 3.56803 4.65505C4.02877 3.98066 4.67799 3.45696 5.43461 3.14937C6.19123 2.84178 7.0217 2.76393 7.8223 2.92555C8.6229 3.08717 9.35814 3.48109 9.93618 4.05811C10.2599 4.38569 10.5547 4.70288 10.8407 5.031H10.0625C9.88846 5.031 9.72154 5.10014 9.59847 5.22321C9.4754 5.34628 9.40626 5.5132 9.40626 5.68725C9.40626 5.8613 9.4754 6.02822 9.59847 6.15129C9.72154 6.27436 9.88846 6.3435 10.0625 6.3435H12.25C12.4241 6.3435 12.591 6.27436 12.714 6.15129C12.8371 6.02822 12.9063 5.8613 12.9063 5.68725V3.49975C12.9063 3.3257 12.8371 3.15878 12.714 3.03571C12.591 2.91264 12.4241 2.8435 12.25 2.8435Z"
                        fill="#2B4360"
                      />
                    </svg>
                    <span
                      className="settings-accordion-subtitle m-0"
                      // onClick={() => {
                      //   setRescheduleModal(true);
                      //   setDoctorListingModal(false);
                      // }}
                    >
                      Reschedule
                    </span>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item className="no-hover">
                  <div className="d-flex align-items-center gap-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M11.4018 10.4735C11.5251 10.5968 11.5943 10.764 11.5943 10.9383C11.5943 11.1127 11.5251 11.2799 11.4018 11.4032C11.2785 11.5265 11.1113 11.5957 10.9369 11.5957C10.7626 11.5957 10.5954 11.5265 10.4721 11.4032L6.99998 7.92997L3.52677 11.4021C3.40349 11.5254 3.23628 11.5946 3.06193 11.5946C2.88758 11.5946 2.72037 11.5254 2.59709 11.4021C2.4738 11.2788 2.40454 11.1116 2.40454 10.9372C2.40454 10.7629 2.4738 10.5957 2.59709 10.4724L6.07029 7.00028L2.59818 3.52708C2.4749 3.40379 2.40563 3.23658 2.40563 3.06223C2.40563 2.88788 2.4749 2.72067 2.59818 2.59739C2.72146 2.4741 2.88867 2.40484 3.06302 2.40484C3.23737 2.40484 3.40458 2.4741 3.52787 2.59739L6.99998 6.07059L10.4732 2.59684C10.5965 2.47356 10.7637 2.4043 10.938 2.4043C11.1124 2.4043 11.2796 2.47356 11.4029 2.59684C11.5262 2.72013 11.5954 2.88733 11.5954 3.06169C11.5954 3.23604 11.5262 3.40324 11.4029 3.52653L7.92966 7.00028L11.4018 10.4735Z"
                        fill="#E85966"
                      />
                    </svg>
                    <span
                      className="appoiment-dots-open-danger m-0"
                      // onClick={() => {
                      //   setCancelModal(true);
                      //   setDoctorListingModal(false);
                      // }}
                    >
                      Cancel Appointment
                    </span>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* <AppointmentRequestCancelModel/> */}
          </div>
        </div>
        <div className="d-flex align-items-start mt-3 appointment-reschedule-patient-box align-items-sm-center gap-3 flex-column flex-sm-row">
          <div className="d-flex align-items-center gap-2">
            <Image
              src={doctor}
              alt="doctor"
              width={50}
              height={50}
              className="rounded-3"
            />
            <div>
              <span className="fw-semibold">Dr. Riya Dharang</span>
              <div className="d-flex gap-2">
                <div className="d-flex gap-1">
                  <Image
                    src={sthetoscope}
                    alt="Sthetoscope"
                    width={15}
                    height={15}
                  />
                  <span className="appointment-reschedule-profile-detail">
                    Gynecologist
                  </span>
                </div>
                <div className="d-flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                  >
                    <path
                      d="M15.5 7.31243C15.5 6.2239 15.1841 5.15875 14.5907 4.24617C13.9974 3.33359 13.1519 2.61279 12.157 2.17119C11.1621 1.72958 10.0604 1.58615 8.98553 1.75827C7.91069 1.9304 6.90888 2.4107 6.10161 3.14092C5.29434 3.87113 4.71628 4.81989 4.43754 5.87214C4.1588 6.92438 4.19137 8.03489 4.53128 9.06899C4.87119 10.1031 5.50385 11.0164 6.35252 11.698C7.20119 12.3797 8.22942 12.8005 9.3125 12.9093V16.3124C9.3125 16.4616 9.37176 16.6047 9.47725 16.7102C9.58274 16.8157 9.72582 16.8749 9.875 16.8749C10.0242 16.8749 10.1673 16.8157 10.2727 16.7102C10.3782 16.6047 10.4375 16.4616 10.4375 16.3124V12.9093C11.8243 12.7682 13.1095 12.1178 14.0446 11.084C14.9797 10.0502 15.4983 8.70641 15.5 7.31243ZM9.875 11.8124C8.98498 11.8124 8.11496 11.5485 7.37493 11.054C6.63491 10.5596 6.05814 9.85678 5.71754 9.03451C5.37695 8.21224 5.28783 7.30744 5.46147 6.43453C5.6351 5.56161 6.06368 4.75979 6.69302 4.13045C7.32236 3.50112 8.12418 3.07253 8.99709 2.8989C9.87001 2.72527 10.7748 2.81438 11.5971 3.15497C12.4193 3.49557 13.1221 4.07235 13.6166 4.81237C14.1111 5.55239 14.375 6.42242 14.375 7.31243C14.3737 8.50551 13.8992 9.64934 13.0555 10.493C12.2119 11.3366 11.0681 11.8111 9.875 11.8124Z"
                      fill="#8A8D93"
                    />
                  </svg>
                  <span className="appointment-reschedule-profile-detail">
                    Female
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Row className="my-3">
          <Col md={6}>
            <div className="d-flex align-items-center gap-1">
              <Image src={calender} alt="calender" width={20} height={20} />
              <span className="modal-custom-content appointment-doctor-profile-detail">
                26 Feb 2025
              </span>
            </div>
          </Col>
          <Col md={6}>
            <div className="d-flex align-items-center gap-1">
              <Image src={clock} alt="clock" width={16} height={16} />
              <span className="modal-custom-content appointment-doctor-profile-detail">
                5:30 PM
              </span>
            </div>
          </Col>
        </Row>
        <div>
          <span className="appointment-reschedule-profile-detail fw-semibold">
            Concern/Treatment
          </span>
          <div className="my-2">
            <span className="servicename me-2">PCOS</span>
            <span className="servicename">Fertility Support</span>
          </div>
        </div>
        <div className="my-3">
          <span className="appointment-reschedule-profile-detail fw-semibold">
            Additional Comment
          </span>
          <div className="modal-custom-content appointment-doctor-profile-detail">
            Experiencing irregular cycles and seeking guidance on fertility
            options.
          </div>
        </div>
        <Row>
          <Col md={6}>
            <Button className="maiacare-button maiacare-button-large outline-layout w-100 btn">
              No Show
            </Button>
          </Col>
          <Col md={6}>
            <Button className="common-btn-blue maiacare-button w-100">
              Check In
            </Button>
          </Col>
        </Row>
      </ContentContainer>
    </div>
  );
}
