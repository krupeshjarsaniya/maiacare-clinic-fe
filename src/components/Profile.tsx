import React from "react";
import ContentContainer from "./ui/ContentContainer";
import cliniclogo from "../assets/images/clinic logo.png";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import Stethoscope from "../assets/images/Stethoscope.png";
import Phone from "../assets/images/Phone.png";
import Email from "../assets/images/Email.png";
import Button from "./ui/Button";
import EditProfile from "../assets/images/LightEditimg.png";
import { useRouter } from "next/navigation";
import Bed from "../assets/images/Bed.png";
import Location from "../assets/images/location.png";
// import "../style/profile.css";
import star from "../assets/images/ratingstart.png";
import ProfileBasicDetails from "./form/Profile-Basic-Details";
import verified from "../assets/images/verified.png";
const Profile: React.FC = () => {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push("/edit-profile"); // Route to your Edit Profile screen
  };

  const clinicData = {
    name: "Medicare Fertility Clinic",
    isVerified: true,
    Stethoscope: "26",
    bed: "34 Beds",
    review: "4.5/5 (1085 Reviews)",
    gender: "Female",
    phone: "+91 12345 67890",
    email: "medicare@gmail.com",
    location: "https://www.google.com/maps/place/Mumbai,+India",
    image: cliniclogo,
  };

  // Define your inner component (optional)
  const Clinic: React.FC<{ clinic: typeof clinicData }> = ({ clinic }) => {
    return (
      <>
        <ContentContainer>
          <Row>
            <Col
              lg={7}
              md={9}
              className="d-flex flex-md-row flex-column align-items-center"
            >
              <div className="col-4 col-md-3 col-lg-3  col-xl-2 position-relative">
                <Image
                  src={clinic.image}
                  alt="ClinicProfile"
                  className="profile-img"
                />
                <Image
                  src={verified}
                  alt="verified"
                  className="position-absolute  verified-container"
                />
              </div>

              <div className="col-12 ms-4 mt-3 mt-md-0">
                {/* col-md-9 col-lg-9 col-xl-9    nedd to  above div */}
                <div>
                  <div className="d-flex flex-md-row align-items-start align-items-md-center gap-1 ">
                    <div className="fw-semibold profile-headings">
                     
                      {clinic.name}
                    </div>
                  </div>

                  <div className="profile-details">
                    <div className="detail-row profile-sub-title">
                      <span className="d-flex align-items-center gap-2">
                        <Image src={star} alt="star" width={17} height={16} />
                        {clinic.review}
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <Image src={Bed} alt="Bed" width={18} height={18} />
                        {clinic.bed}
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <Image
                          src={Stethoscope}
                          alt="Stethoscope"
                          width={18}
                          height={18}
                        />
                        {clinic.Stethoscope}
                      </span>
                    </div>

                    <div className="detail-row profile-sub-title">
                      <span className="d-flex align-items-center gap-2">
                        <Image src={Phone} alt="phone" width={21} height={21} />
                        {clinic.phone}
                      </span>
                      <span>
                        <Image
                          src={Email}
                          alt="email"
                          className="me-2"
                          width={21}
                          height={21}
                        />
                        {clinic.email}
                      </span>
                    </div>

                    <div
                      className=" profile-member-since profile-sub-title"
                      style={{ marginLeft: "3px" }}
                    >
                      <Image
                        src={Location}
                        alt="location"
                        width={16}
                        height={20}
                      />
                      {clinic.location}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={5} md={3} className="text-md-end text-center mt-4 mt-md-0">
              <Button
                variant="outline"
                className="edit-profile-btn"
                onClick={handleEditProfile}
              >
                <span className="me-2">
                  <Image
                    src={EditProfile}
                    alt="EditProfile-btn"
                    width={20}
                    height={22}
                  />
                </span>
                Edit Profile
              </Button>
            </Col>
          </Row>
        </ContentContainer>
        <ProfileBasicDetails />
      </>
    );
  };

  return <Clinic clinic={clinicData} />;
};

export default Profile;
