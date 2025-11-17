"use client";

import { useState } from "react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import {
  RescheduleAppointment,
  SuccessModalReschedule,
} from "./form/RescheduleAppointment";
import {
  CancelAppointment,
  SuccessModalCancel,
} from "./form/CancelAppointment";
import {
  BookAppointment,
  SuccessModalBookAppointment,
} from "./form/BookAppointment";
import { Dropdown } from "react-bootstrap";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface RescheduleAppointmentProps {
  setDoctorListingModal?: any;
  RescheduleModal?: any;
  setRescheduleModal?: any;
  CancelModal?: any;
  setCancelModal?: any;
  opcationShowDot?: string;
}

export function AppointmentRequestCancelModel({
  setDoctorListingModal,
  RescheduleModal,
  setRescheduleModal,
  CancelModal,
  setCancelModal,
  opcationShowDot,
}: RescheduleAppointmentProps) {
  // const [RescheduleModal, setRescheduleModal] = useState(false);
  // const [CancelModal, setCancelModal] = useState(false);

  // independent success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSuccessModalCancel, setShowSuccessModalCancel] = useState(false);

  return (
    <>
      <Dropdown align="end" className="d-flex align-items-center">
        <Dropdown.Toggle
          as="button"
          id="dropdown-basic"
          className="bg-transparent border-0 p-1 no-caret"
        >
          {opcationShowDot == "appointmentsList" && (
            <div className="Appointment-dot">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2"
                height="10"
                viewBox="0 0 2 10"
                fill="none"
              >
                <path
                  d="M1.65137 5C1.65137 5.14834 1.60738 5.29334 1.52497 5.41668C1.44256 5.54001 1.32542 5.63614 1.18838 5.69291C1.05133 5.74967 0.900535 5.76453 0.75505 5.73559C0.609564 5.70665 0.475927 5.63522 0.371037 5.53033C0.266148 5.42544 0.194717 5.2918 0.165779 5.14632C0.13684 5.00083 0.151692 4.85003 0.208458 4.71299C0.265224 4.57594 0.361353 4.45881 0.48469 4.3764C0.608027 4.29399 0.753031 4.25 0.901367 4.25C1.10028 4.25 1.29104 4.32902 1.4317 4.46967C1.57235 4.61032 1.65137 4.80109 1.65137 5ZM0.901367 1.5C1.0497 1.5 1.19471 1.45601 1.31804 1.3736C1.44138 1.29119 1.53751 1.17406 1.59428 1.03701C1.65104 0.899968 1.6659 0.749168 1.63696 0.603683C1.60802 0.458197 1.53659 0.32456 1.4317 0.21967C1.32681 0.114781 1.19317 0.0433503 1.04768 0.0144114C0.902199 -0.0145275 0.7514 0.000324964 0.614355 0.0570907C0.47731 0.113856 0.360176 0.209986 0.277765 0.333323C0.195354 0.45666 0.151368 0.601664 0.151368 0.75C0.151368 0.948913 0.230385 1.13968 0.371037 1.28033C0.51169 1.42098 0.702455 1.5 0.901367 1.5ZM0.901367 8.5C0.753031 8.5 0.608027 8.54399 0.48469 8.6264C0.361353 8.70881 0.265224 8.82594 0.208458 8.96299C0.151692 9.10003 0.13684 9.25083 0.165779 9.39632C0.194717 9.5418 0.266148 9.67544 0.371037 9.78033C0.475927 9.88522 0.609564 9.95665 0.75505 9.98559C0.900535 10.0145 1.05133 9.99967 1.18838 9.94291C1.32542 9.88614 1.44256 9.79001 1.52497 9.66668C1.60738 9.54334 1.65137 9.39833 1.65137 9.25C1.65137 9.05109 1.57235 8.86032 1.4317 8.71967C1.29104 8.57902 1.10028 8.5 0.901367 8.5Z"
                  fill="#2B4360"
                />
              </svg>
            </div>
          )}

          {opcationShowDot == "appointmentDetails" && (
            <div className="patient-profile-dot">
              <HiOutlineDotsHorizontal />
            </div>
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu className="dots-open">
          <Dropdown.Item className="no-hover">
            <div className="d-flex align-items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
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
                onClick={() => {
                  setRescheduleModal(true);
                  setDoctorListingModal(false);
                }}
              >
                Reschedule
              </span>
            </div>
          </Dropdown.Item>
          <Dropdown.Item className="no-hover">
            <div className="d-flex align-items-center gap-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
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
                onClick={() => {
                  setCancelModal(true);
                  setDoctorListingModal(false);
                }}
              >
                Cancel Appointment
              </span>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* <div className="d-flex gap-5">
        <Button onClick={() => setRescheduleModal(true)}>
          Reschedule Appointment
        </Button>
        <Button onClick={() => setCancelModal(true)}>
          Cancel Appointment
        </Button>

      </div> */}

      {/* Reschedule Modal */}
      <Modal
        show={RescheduleModal}
        onHide={() => setRescheduleModal(false)}
        header="Request to Reschedule Appointment"
        closeButton={true}
      >
        <RescheduleAppointment
          setRescheduleModal={setRescheduleModal}
          setShowSuccessModal={setShowSuccessModal}
        />
      </Modal>

      {/* Cancel Modal */}
      <Modal
        show={CancelModal}
        onHide={() => setCancelModal(false)}
        header="Request to Cancel Appointment"
        closeButton={true}
      >
        <CancelAppointment
          setCancelModal={setCancelModal}
          setShowSuccessModalCancel={setShowSuccessModalCancel}
        />
      </Modal>

      {/* Independent Success Modal */}
      <SuccessModalReschedule
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
      />
      <SuccessModalCancel
        showSuccessModalCancel={showSuccessModalCancel}
        setShowSuccessModalCancel={setShowSuccessModalCancel}
      />
    </>
  );
}

export function BookAppointmentModal() {
  const [BookAppointmentModal, setBookAppointmentModal] = useState(false);
  const [showSuccessModalBook, setShowSuccessModalBook] = useState(false);
  // independent success modal

  return (
    <>
      <Button onClick={() => setBookAppointmentModal(true)}>
        Book Appointment
      </Button>

      <Modal
        show={BookAppointmentModal}
        onHide={() => setBookAppointmentModal(false)}
        header="Book Appointment"
        closeButton={true}
      >
        <BookAppointment
          setBookAppointmentModal={setBookAppointmentModal}
          setShowSuccessModalBook={setShowSuccessModalBook}
        />
      </Modal>

      <SuccessModalBookAppointment
        showSuccessModalBook={showSuccessModalBook}
        setShowSuccessModalBook={setShowSuccessModalBook}
      />
    </>
  );
}
