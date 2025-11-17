"use client";
import React, { useEffect } from "react";
import ProfileImage from "../assets/images/patient_profile.png";
import { ProfileCard } from "./ui/custom/ProfileCard";
import { useDispatch } from "react-redux";
import { setHeaderData } from "@/utlis/redux/slices/headerSlice";
import { Card, Col, Dropdown, Row } from "react-bootstrap";
import Image from "next/image";
import arrow from "../assets/images/ArrowUpRight.png";
import phone from "../assets/images/Phone.png";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";
import AppointmentDoctorProfileDetails from "./form/AppointmentDoctorProfileDetails";
import TreatmentPatientProfileDetails from "./form/TreatmentPatientProfileDetails";
export default function AppointmentPatientDetail() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setHeaderData({
        title: "Sania Iyyer",
        subtitle: "Appointments > Sania Iyyer",
      })
    );
  }, [dispatch]);
  const router = useRouter();
  const patientdata = {
    name: "Rani desai",
    phone: "+91 1234567890",
    gender: "female",
    age: "31",
  };

  return (
    <>
      <div>
        <Card className={`shadow-sm rounded-4 patient-profile-card`}>
          <div className="d-flex justify-content-between align-items-start  ">
            <div className="d-flex align-items-start align-items-sm-center gap-3 flex-column flex-sm-row">
              <div>
                <Image
                  src={ProfileImage}
                  alt="ProfileImage"
                  width={90}
                  height={90}
                  className="rounded-3"
                />
              </div>
              <div>
                <div className="d-flex align-items-center mb-1">
                  <h6 className="mb-0 doctor-profile-heading me-2">
                    {patientdata.name}
                  </h6>
                </div>
                <div className="pt-sm-1 p-0 d-flex doctor-profile-subheading gap-1 align-items-center">
                  <Image src={phone} alt="phone" width={19} height={19} />
                  {patientdata.phone}
                </div>
                <div className="pt-sm-1 p-0 d-flex gap-2 ">
                  <div className="doctor-profile-subheading d-flex gap-1 align-items-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.4141 7.12492C13.414 5.91544 13.0631 4.73195 12.4038 3.71797C11.7445 2.70399 10.8051 1.9031 9.69961 1.41243C8.59413 0.921758 7.37003 0.762384 6.17576 0.953637C4.9815 1.14489 3.86838 1.67855 2.97141 2.48991C2.07444 3.30126 1.43215 4.35544 1.12244 5.5246C0.812734 6.69375 0.848915 7.92766 1.22659 9.07666C1.60427 10.2257 2.30723 11.2404 3.2502 11.9978C4.19317 12.7552 5.33564 13.2227 6.53906 13.3437V17.1249C6.53906 17.2907 6.60491 17.4497 6.72212 17.5669C6.83933 17.6841 6.9983 17.7499 7.16406 17.7499C7.32982 17.7499 7.48879 17.6841 7.606 17.5669C7.72322 17.4497 7.78906 17.2907 7.78906 17.1249V13.3437C9.32997 13.1869 10.758 12.4643 11.797 11.3156C12.836 10.1669 13.4122 8.67379 13.4141 7.12492ZM7.16406 12.1249C6.17516 12.1249 5.20846 11.8317 4.38621 11.2823C3.56397 10.7329 2.9231 9.95197 2.54467 9.03834C2.16623 8.12471 2.06721 7.11938 2.26014 6.14947C2.45306 5.17957 2.92927 4.28865 3.62853 3.58939C4.32779 2.89013 5.21871 2.41392 6.18861 2.221C7.15852 2.02807 8.16385 2.12709 9.07748 2.50553C9.99111 2.88397 10.772 3.52483 11.3214 4.34707C11.8708 5.16932 12.1641 6.13602 12.1641 7.12492C12.1626 8.45056 11.6354 9.72149 10.698 10.6589C9.76063 11.5962 8.4897 12.1235 7.16406 12.1249Z"
                        fill="#8A8D93"
                      />
                    </svg>
                    {patientdata.gender}
                  </div>
                  <div className="doctor-profile-subheading d-flex gap-1 align-items-center">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_2367_101200)">
                        <path
                          d="M10.4141 19.7925C9.37242 19.7925 8.28909 19.6259 7.20576 19.2509C2.12242 17.5009 -0.585911 11.9175 1.16409 6.79255C2.91409 1.70921 8.49742 -0.999119 13.6224 0.750881C15.9974 1.58421 17.9558 3.25088 19.0808 5.45921C19.2474 5.75088 19.1224 6.12588 18.8308 6.25088C18.5391 6.41755 18.1641 6.29255 18.0391 6.00088C17.0391 4.04255 15.3308 2.58421 13.2474 1.87588C8.74742 0.334214 3.83076 2.70921 2.28909 7.20921C0.747422 11.7092 3.12242 16.5842 7.58076 18.1259C12.0391 19.6675 16.9558 17.2925 18.4974 12.8342C18.6224 12.5009 18.9558 12.3759 19.2474 12.4592C19.5808 12.5842 19.7058 12.9175 19.6224 13.2092C18.2891 17.2509 14.4558 19.7925 10.4141 19.7925Z"
                          fill="#8A8D93"
                        />
                        <path
                          d="M18.7057 6.4987L15.2474 6.45703C14.9141 6.45703 14.6641 6.16536 14.6641 5.83203C14.6641 5.4987 14.9557 5.2487 15.2891 5.2487L18.1641 5.29036L18.2057 2.41536C18.2057 2.08203 18.4557 1.83203 18.8307 1.83203C19.1641 1.83203 19.4141 2.1237 19.4141 2.45703L19.3307 5.8737C19.3307 6.04036 19.2474 6.16536 19.1641 6.29036C19.0391 6.41536 18.8724 6.4987 18.7057 6.4987Z"
                          fill="#8A8D93"
                        />
                        <path
                          d="M7.83075 11.375L7.45575 10.5H5.78908L5.41408 11.375H4.45575L6.20575 7.375H7.08075L8.83075 11.375H7.83075ZM6.62242 8.58333L6.12242 9.75H7.12242L6.62242 8.58333ZM11.4141 10.875C11.1224 11.1667 10.7891 11.3333 10.4141 11.3333C9.99742 11.3333 9.66408 11.2083 9.41408 10.9167C9.12242 10.625 8.99742 10.2917 8.99742 9.83333C8.99742 9.375 9.12242 9 9.41408 8.70833C9.70575 8.41667 10.0391 8.25 10.3724 8.25C10.7474 8.25 11.0391 8.41667 11.2891 8.70833V8.29167H12.1641V10.9583C12.1641 11.25 12.1224 11.4583 12.0391 11.7083C11.9557 11.9167 11.8307 12.0833 11.6641 12.2083C11.3307 12.4583 10.9557 12.5833 10.5391 12.5833C10.2891 12.5833 10.0807 12.5417 9.83075 12.4583C9.58075 12.375 9.37242 12.2917 9.20575 12.125L9.53908 11.4583C9.83075 11.6667 10.1224 11.7917 10.4557 11.7917C10.7891 11.7917 11.0391 11.7083 11.2057 11.5417C11.3307 11.4583 11.4141 11.2083 11.4141 10.875ZM11.2891 9.79167C11.2891 9.54167 11.2057 9.33333 11.0807 9.20833C10.9557 9.08333 10.7891 9 10.5807 9C10.3724 9 10.2057 9.08333 10.0391 9.20833C9.87242 9.33333 9.83075 9.54167 9.83075 9.79167C9.83075 10.0417 9.91408 10.25 10.0391 10.375C10.1641 10.5417 10.3724 10.5833 10.5807 10.5833C10.7891 10.5833 10.9557 10.5 11.0807 10.375C11.2474 10.25 11.2891 10.0417 11.2891 9.79167ZM15.6224 10.9583C15.2891 11.2917 14.8724 11.4583 14.4141 11.4583C13.9557 11.4583 13.5391 11.3333 13.2474 11.0417C12.9557 10.75 12.7891 10.375 12.7891 9.875C12.7891 9.375 12.9557 9 13.2474 8.70833C13.5391 8.41667 13.9141 8.29167 14.3307 8.29167C14.7474 8.29167 15.1224 8.41667 15.4141 8.66667C15.7057 8.91667 15.8724 9.29167 15.8724 9.70833V10.1667H13.6224C13.6641 10.3333 13.7474 10.4583 13.8724 10.5833C14.0391 10.7083 14.2057 10.75 14.3724 10.75C14.6641 10.75 14.9141 10.6667 15.1224 10.4583L15.6224 10.9583ZM14.8307 9.125C14.7057 9.04167 14.5807 8.95833 14.4141 8.95833C14.2474 8.95833 14.0807 9 13.9557 9.125C13.8307 9.20833 13.7474 9.375 13.7057 9.54167H15.0391C14.9974 9.375 14.9141 9.20833 14.8307 9.125Z"
                          fill="#8A8D93"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2367_101200">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0.164062)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    {patientdata.age} Years
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Button
                variant="dark"
                className="maiacare-button edit-profile-btn btn d-flex align-items-center gap-2"
                onClick={() => router.push("/profile")}
              >
                Go to Profile
                <Image src={arrow} alt="arrow" width={12} height={13} />
              </Button>
            </div>
          </div>
        </Card>

        {/* appointment Doctor details */}
        <Row className="mt-4">
          <Col md={7}>
            <AppointmentDoctorProfileDetails />
          </Col>
          <Col md={5}>hy</Col>
        </Row>
        <Row className="mt-4">
          <Col md={7}>
            <TreatmentPatientProfileDetails />
          </Col>
        </Row>
      </div>
    </>
  );
}
