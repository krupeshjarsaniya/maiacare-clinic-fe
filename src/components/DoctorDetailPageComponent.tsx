import React, { ChangeEvent, useState } from "react";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import Stethoscope from "../assets/images/Stethoscope.png";
import Expirence from "../assets/images/Expirence.png";
import Bithdate from "../assets/images/Bithdate.png";
import Gender from "../assets/images/Gender.png";
import Phone from "../assets/images/Phone.png";
import Email from "../assets/images/Email.png";
import MaiaVerify from "../assets/images/verifiedreview.png";
import EditProfile from "../assets/images/edit.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ContentContainer from "./ui/ContentContainer";
import { HiOutlineDotsVertical } from "react-icons/hi";
import power from "../assets/images/Power.png";
import { DoctorDetails } from "@/utlis/types/interfaces";
import DummyPatientImage from "@/assets/images/Active Patients.png";
import {
  ActivateDeactivateProfile,
  SuccessModalActivateDeactivate,
} from "./form/ActivateDeactivateModal";
import { formatDateTime } from "@/utlis/Helper";
import Skeleton from "react-loading-skeleton";

const DoctorDetailPageComponent = ({
  DoctorData,
}: {
  DoctorData?: DoctorDetails | null;
}) => {
  const router = useRouter();
  const isLoading = !DoctorData;

  const doctorIdShow = DoctorData?._id;
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const DoctorProfileCard: React.FC<{ doctor: typeof DoctorData }> = ({
    doctor,
  }) => (
    <ContentContainer>
      <Row className="justify-content-between">
        <Col
          lg={7}
          md={9}
          className="d-flex flex-md-row flex-column align-items-center"
        >
          <div className="col-4 col-md-3 col-lg-3  col-xl-2">
            {isLoading ? (
              <Skeleton height={100} width={100} />
            ) : (
              <img
                src={doctor?.profilePicture || DummyPatientImage.src}
                alt="Profile"
                className="profile-img"
                onError={({ currentTarget }) =>
                  (currentTarget.src = DummyPatientImage.src)
                }
              />
            )}
          </div>

          <div className="col-12 ms-4 mt-3 mt-md-0">
            <div>
              <div className="d-flex flex-md-row align-items-start align-items-md-center gap-1">
                <div className="profile-name-font">
                  {isLoading ? (
                    <Skeleton width={150} height={23} />
                  ) : (
                    doctor?.name || ""
                  )}
                </div>
                {/* {doctor.isVerified && ( */}
                {/* <Image src={MaiaVerify} alt="verified" width={18} height={18} /> */}
              </div>

              <div className="profile-details">
                <div className="detail-row profile-sub-title">
                  <span className="d-flex align-items-center gap-1">
                    {isLoading ? (
                      <Skeleton width={18} height={18} />
                    ) : (
                      <Image
                        src={Stethoscope}
                        alt="Specialization"
                        width={18}
                        height={18}
                      />
                    )}
                    {isLoading ? (
                      <Skeleton width={70} height={18} />
                    ) : (
                      doctor?.specialty || ""
                    )}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    {isLoading ? (
                      <Skeleton width={18} height={18} />
                    ) : (
                      <Image
                        src={Expirence}
                        alt="experience"
                        width={16}
                        height={15}
                      />
                    )}
                    {isLoading ? (
                      <Skeleton width={70} height={18} />
                    ) : (
                      <>
                        {doctor?.yearsOfExperience || ""}
                        <span>
                          {doctor?.yearsOfExperience &&
                          doctor?.yearsOfExperience > 1
                            ? "years"
                            : "year"}
                        </span>
                      </>
                    )}
                   
                  </span>
                </div>

                <div className="profile-sub-title">
                  <span className="d-flex align-items-center gap-1">
                    {isLoading ? (
                      <Skeleton width={18} height={18} />
                    ) : (
                      <Image src={Bithdate} alt="dob" width={18} height={18} />
                    )}
                    {isLoading ? (
                      <Skeleton width={70} height={18} />
                    ) : (
                      <>{formatDateTime(doctor?.dob || "")}</>
                    )}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    {isLoading ? (
                      <Skeleton width={18} height={18} />
                    ) : (
                      <Image src={Gender} alt="gender" width={18} height={18} />
                    )}
                    {isLoading ? (
                      <Skeleton width={70} height={18} />
                    ) : (
                      doctor?.gender || ""
                    )}
                  </span>
                </div>

                <div className="detail-row profile-sub-title">
                  <span className="d-flex align-items-center gap-1">
                    {isLoading ? (
                      <Skeleton width={18} height={18} />
                    ) : (
                      <Image src={Phone} alt="phone" width={18} height={18} />
                    )}
                    {isLoading ? (
                      <Skeleton width={70} height={18} />
                    ) : (
                      doctor?.contactNumber || ""
                    )}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    {isLoading ? (
                      <Skeleton width={18} height={18} />
                    ) : (
                      <Image src={Email} alt="email" width={18} height={18} />
                    )}
                    {isLoading ? (
                      <Skeleton width={70} height={18} />
                    ) : (
                      doctor?.email || ""
                    )}
                  </span>
                </div>
              </div>

              <div className="mt-3 profile-member-since profile-sub-title">
                {isLoading ? (
                  <Skeleton width={200} height={18} />
                ) : (
                  <>Member since {formatDateTime(doctor?.memberSince || "")}</>
                )}
                {/* membersince  */}
              </div>
            </div>
          </div>
        </Col>

        <Col lg={5} md={3} className="text-md-end text-center mt-4 mt-md-0">
          {isLoading ? (
            <Skeleton width={40} height={40} />
          ) : (
            <Dropdown
              align="end"
              className="d-flex justify-content-end align-items-center"
            >
              <Dropdown.Toggle
                as="button"
                className="bg-transparent border-0 p-1 no-caret"
              >
                <div className="patient-profile-dot">
                  <HiOutlineDotsVertical />
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-end">
                <Dropdown.Item
                  onClick={() => {
                    router.push(`/doctors/editdoctor/${doctorIdShow}`);
                  }}
                >
                  <Image
                    src={EditProfile}
                    alt="edit"
                    width={18}
                    height={18}
                    className="me-2"
                  />
                  Edit Profile
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-danger"
                  onClick={() => setShowModal(true)}
                >
                  <Image
                    src={power}
                    alt="power"
                    width={18}
                    height={18}
                    className="me-2"
                  />
                  Activate/Deactivate
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Col>
      </Row>
      {/* Add deactivation Modal */}
      <ActivateDeactivateProfile
        show={showModal}
        onClose={() => setShowModal(false)}
        setShowSuccessModal={setShowSuccessModal}
        title="Activate / Deactivate Profile Request"
        doctorIdShow={doctorIdShow || null}
      />
      {/* Success Modal */}
      <SuccessModalActivateDeactivate
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
      />
    </ContentContainer>
  );

  return <DoctorProfileCard doctor={DoctorData} />;
};

export default DoctorDetailPageComponent;
