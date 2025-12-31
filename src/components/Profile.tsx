import React, { useEffect, useState } from "react";
import ContentContainer from "./ui/ContentContainer";
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
import { setHeaderData } from "@/utlis/redux/slices/headerSlice";
import { AppDispatch } from "@/utlis/redux/store";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { getProfile } from "@/utlis/apis/apiHelper";
import axios, { AxiosError } from "axios";
import { clinicData } from "@/utlis/types/interfaces";

const Profile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "Profile", subtitle: "Profile" }));
  }, []);
  const router = useRouter();

  const handleEditProfile = () => {
    router.push("/edit-profile"); // Route to your Edit Profile screen
  };

  const Clinic: React.FC = () => {
    const [clinicData, setClinicData] = useState<clinicData | null>(null);
    const [profileData, setProfileData] = useState<clinicData | null>(null);
    const fetchProfile = () => {
      getProfile()
        .then((response) => {
          if (response.status) {
          
            setClinicData(response.data.data);
            setProfileData(response.data.data);
          } else {
            toast.error(response.data?.message || "Something went wrong!");
            console.error("Error fetching profile");
          }
        })
        .catch((err: unknown) => {
          console.error("API call failed", err);
          if (axios.isAxiosError(err)) {
            toast.error(err.response?.data?.message || "Something went wrong!");
          } else {
            toast.error("Something went wrong!");
          }
        });
    };
    console.log("clinicData?.clinicLogo", clinicData);

    useEffect(() => {
      fetchProfile();
    }, []);

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
                {/* <img
                  src={clinicData?.clinicLogo || cliniclogo.src}
                  alt="Profile"
                  className="profile-img"
                  onError={({ currentTarget }) =>
                    (currentTarget.src = cliniclogo.src)
                  }
                /> */}
                <img
                  src={clinicData?.clinicLogo}
                  alt="ProfileImage"
                  // width={58}
                  // height={58}
                  className="rounded-circle profile-img"
                />
                {clinicData?.verified === true && (
                  <Image
                    src={verified}
                    alt="verified"
                    className="position-absolute  verified-container"
                  />
                )}
              </div>

              <div className="col-12 ms-4 mt-3 mt-md-0">
                {/* col-md-9 col-lg-9 col-xl-9    nedd to  above div */}
                <div>
                  <div className="d-flex flex-md-row align-items-start align-items-md-center gap-1 ">
                    <div className="fw-semibold profile-headings">
                      {clinicData?.clinicName}
                    </div>
                  </div>

                  <div className="profile-details">
                    <div className="detail-row profile-sub-title">
                      <span className="d-flex align-items-center gap-2">
                        <Image src={star} alt="star" width={17} height={16} />
                        {clinicData?.averageRating}
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <Image src={Bed} alt="Bed" width={18} height={18} />
                        {clinicData?.beds}
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <Image
                          src={Stethoscope}
                          alt="Stethoscope"
                          width={18}
                          height={18}
                        />
                        {clinicData?.doctorOnboard}
                      </span>
                    </div>

                    <div className="detail-row profile-sub-title">
                      <span className="d-flex align-items-center gap-2">
                        <Image src={Phone} alt="phone" width={21} height={21} />
                        {clinicData?.contactNumber}
                      </span>
                      <span>
                        <Image
                          src={Email}
                          alt="email"
                          className="me-2"
                          width={21}
                          height={21}
                        />
                        {clinicData?.email}
                      </span>
                    </div>

                    <div
                      className="  profile-sub-title"
                      style={{ marginLeft: "3px" }}
                    >
                      <Image
                        src={Location}
                        alt="location"
                        width={16}
                        height={20}
                      />
                      {clinicData?.address}
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
        <ProfileBasicDetails profileData={profileData} />
      </>
    );
  };

  return <Clinic />;
};

export default Profile;
