import React from "react";
import { Button, Col, Dropdown, Row } from "react-bootstrap";
import Profiledoctor from "../assets/images/Profile-doctor.png";
import Stethoscope from "../assets/images/Stethoscope.png";
import Expirence from "../assets/images/Expirence.png";
import Bithdate from "../assets/images/Bithdate.png";
import Gender from "../assets/images/Gender.png";
import Phone from "../assets/images/Phone.png";
import Email from "../assets/images/Email.png";
import MaiaVerify from "../assets/images/verifiedreview.png";
import EditProfile from "../assets/images/EditProfile.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ContentContainer from "./ui/ContentContainer";
import { HiOutlineDotsVertical } from "react-icons/hi";

const DoctorDetailPageComponent = () => {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push("/edit-profile"); // Route to your Edit Profile screen
  };

  const doctorData = {
    name: "Dr. Riya Dharang",
    isVerified: true,
    specialization: "Gynecologist",
    experience: "11 Years",
    dob: "7 Jan 1999",
    gender: "Female",
    phone: "+91 12345 67890",
    email: "riyadharang@miacare.com",
    memberSince: "02 March 23",
    image: Profiledoctor,
  };

  const DoctorProfileCard: React.FC<{ doctor: typeof doctorData }> = ({
    doctor,
  }) => {
    return (
      <ContentContainer>
        <Row className="justify-content-between">
          <Col
            lg={7}
            md={9}
            className="d-flex flex-md-row flex-column align-items-center"
          >
            <div className="col-4 col-md-3 col-lg-3  col-xl-2">
              <Image src={doctor.image} alt="Profile" className="profile-img" />
            </div>

            <div className="col-12 ms-4 mt-3 mt-md-0">
              {/* col-md-9 col-lg-9 col-xl-9    nedd to  above div */}
              <div>
                <div className="d-flex flex-md-row align-items-start align-items-md-center gap-1 ">
                  <div className="profile-name-font">{doctor.name}</div>
                  <div className="d-flex align-items-center gap-1">
                    <Image
                      src={MaiaVerify}
                      alt="Specialization"
                      width={18}
                      height={18}
                    />
                   
                  </div>
                </div>

                {/* flex-md-row align-items-center align-items-md-center justify-content-center justify-content-md-start  
text-center text-md-start     ======= small screen all data center */}

                <div className="profile-details">
                  <div className="detail-row profile-sub-title">
                    <span>
                      <Image
                        src={Stethoscope}
                        alt="Specialization"
                        width={18}
                        height={18}
                      />{" "}
                      {doctor.specialization}
                    </span>
                    <span>
                      <Image
                        src={Expirence}
                        alt="experience"
                        width={16}
                        height={15}
                      />{" "}
                      {doctor.experience}
                    </span>
                  </div>
                  <div className="     profile-sub-title">
                    <span>
                      <Image src={Bithdate} alt="dob" width={18} height={18} />{" "}
                      {doctor.dob}
                    </span>
                    <span>
                      <Image src={Gender} alt="gender" width={18} height={18} />{" "}
                      {doctor.gender}
                    </span>
                  </div>
                  <div className="detail-row profile-sub-title">
                    <span>
                      {" "}
                      <Image
                        src={Phone}
                        alt="phone"
                        width={18}
                        height={18}
                      />{" "}
                      {doctor.phone}
                    </span>
                    <span>
                      {" "}
                      <Image
                        src={Email}
                        alt="email"
                        width={18}
                        height={18}
                      />{" "}
                      {doctor.email}
                    </span>
                  </div>
                </div>

                <div className="mt-3 profile-member-since profile-sub-title">
                  Member since {doctor.memberSince}
                </div>
              </div>
            </div>
          </Col>
          <Col lg={5} md={3} className="text-md-end text-center mt-4 mt-md-0">
            <div>
              <Dropdown align="end" className="d-flex justify-content-end align-items-center">
                <Dropdown.Toggle
                  as="button"
                  id="dropdown-basic"
                  className="bg-transparent border-0 p-1 no-caret"
                >
                  <div className="patient-profile-dot">
                    <HiOutlineDotsVertical />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end">
                  <Dropdown.Item
                  // onClick={() => router.push(`/doctors/${id}`)}
                  >
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-danger"
                    // onClick={() => handleDelete(id)}
                  >
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </ContentContainer>
     
    );
  };

  return <DoctorProfileCard doctor={doctorData} />;
};

export default DoctorDetailPageComponent;
