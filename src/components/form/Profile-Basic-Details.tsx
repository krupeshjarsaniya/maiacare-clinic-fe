import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "../../style/basetable.css";

import Pdfimg from "../../assets/images/Pdfimg.png";

import Image, { StaticImageData } from "next/image";

import ContentContainer from "../ui/ContentContainer";
import img1 from "../../assets/images/Img-1.png";

import phone from "../../assets/images/Phone.png";
import email from "../../assets/images/Email.png";
import stars from "../../assets/images/stars.png";

import verifiedreviewcard from "../../assets/images/verifiedreview.png";
import reviewcardimg from "../../assets/images/reviewcardimg.png";
import { clinicData, ProfileOperationalHour } from "@/utlis/types/interfaces";

import DummyPatientImage from "@/assets/images/Active Patients.png";
import { formatDateTime } from "@/utlis/Helper";

export function formatReviewDate(isoDate: string): string {
  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

interface OperationalHour {
  _id: string;
  day: string;
  openTime: string;
  closeTime: string;
}
const ProfileBasicDetails = ({
  profileData,
}: {
  profileData?: clinicData | null;
}) => {
  type ApiReview = NonNullable<clinicData["reviews"]>[number];

  const allReviews =
    profileData?.reviews?.map((review: ApiReview) => ({
      id: review._id,
      img: "/assets/images/default-user.png", // ✅ no patient
      name: review.patient.personalDetails.name,
      date: formatDateTime(review.date),
      visiting_for: review.reason,
      process_first: review.happyWith?.[0] ?? "Treatment",
      process_second: review.happyWith?.[1] ?? "Doctor friendliness",
      rating: review.rating,
      text: review.comment,
    })) || [];

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name; // 👈 download name set
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [displayedReviewCount, setDisplayedReviewCount] = useState(2);

  const reviewsToShow = allReviews.slice(0, displayedReviewCount);

  const handleShowMore = () => {
    setDisplayedReviewCount(allReviews.length);
  };
  return (
    // <Container fluid className="mt-3">
    <div>
      <Row>
        {/* =====LEFT COLUMN PART ======== */}

        <Col lg={7} xxl={8}>
          {/* address*/}
          <div>
            <ContentContainer className="mt-4">
              <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center text-center text-md-start mb-3">
                <h5 className="profile-card-main-titile mb-2 mb-md-0">
                  Address & Operational Hours
                </h5>
              </div>
              <div>
                <div className="profiledetails_heading">Address</div>
                <div style={{ width: "70%" }} className="profiledetails_text">
                  {profileData?.address}
                </div>
              </div>
              <div className="d-flex justify-content-between mt-3 flex-column flex-sm-row">
                {/* Availability */}
                <div>
                  <div className="profiledetails_heading">Availability</div>
                  {profileData?.operationalHours?.map(
                    (item: ProfileOperationalHour) => (
                      <p key={item._id} className="mb-0">
                        <span
                          className="maiacare-radio-label me-1"
                          style={{ fontSize: "14px" }}
                        >
                          {item.day} :
                        </span>
                        <span style={{ fontSize: "13px" }}>
                          {item.openTime} – {item.closeTime}
                        </span>
                      </p>
                    )
                  )}
                </div>
                {/* Emergency Services */}
                <div>
                  <div className="profiledetails_heading">
                    Emergency Services
                  </div>
                  <div
                    style={{ width: "95%" }}
                    className="profiledetails_text "
                  >
                    {profileData?.emergencyDoctorsAvailable_24_7
                      ? "Emergency doctors are available 24/7"
                      : "Emergency doctors are not available 24/7"}
                  </div>
                </div>
              </div>
            </ContentContainer>
          </div>
          {/* Services Offered */}

          <div>
            <ContentContainer className="mt-4">
              <h5 className="profile-card-main-titile mb-2 mb-md-0">
                Services Offered
              </h5>
              <div className="d-flex gap-3 flex-wrap mt-4">
                {profileData?.servicesOffered?.length ? (
                  profileData.servicesOffered.map((service, idx) => (
                    <div key={idx} className="servicename">
                      {service}
                    </div>
                  ))
                ) : (
                  <div>No services listed</div>
                )}
              </div>
            </ContentContainer>
          </div>
          {/* Photos */}
          <div>
            <ContentContainer className="mt-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="profile-card-main-titile">Photos</h5>
              </div>
              <div className="d-flex gap-3 flex-wrap">
                {profileData?.photos?.length ? (
                  profileData.photos.map((photo, idx) =>
                    photo?.url ? (
                      <img
                        key={
                          photo._id?.toString() ?? photo.url ?? `photo-${idx}`
                        }
                        src={photo.src || photo.url}
                        alt="Clinic Photo"
                        width={100}
                        height={100}
                        // className=" profile-img"
                      />
                    ) : null
                  )
                ) : (
                  <div>No photos uploaded</div>
                )}
              </div>
            </ContentContainer>
          </div>
        </Col>

        {/* ======RIGHT COLUMN =========== */}
        {/* About */}

        <Col lg={5} xxl={4}>
          <div>
            <ContentContainer className="mt-4">
              <h5 className="profile-card-main-titile">
                Contact Person Details
              </h5>
              <div
                className="overflow-y-auto my-scrollable-div"
                style={{ height: "162px" }}
              >
                <div className="contact_person_detail_cards mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <Image src={img1} alt="Profile" width={60} height={60} />
                    <div>
                      <div className="fw-semibold detail_card">
                        {profileData?.contactPerson?.name || "—"}
                      </div>
                      <div className="card_admin">Super Admin</div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <div>
                      <div className="d-flex align-items-center">
                        <Image src={phone} alt="phone" width={20} height={20} />
                        <span className="card_text">Phone</span>
                      </div>
                      <div>
                        {profileData?.contactPerson?.contactNumber || "—"}
                      </div>
                    </div>

                    <div>
                      <div className="d-flex align-items-center">
                        <Image src={email} alt="email" width={20} height={20} />
                        <span className="card_text">Email</span>
                      </div>
                      <div>{profileData?.contactPerson?.email || "—"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </ContentContainer>
          </div>

          {/* Documents */}
          <div>
            <ContentContainer className="mt-4">
              <div>
                <h5 className="mb-4 profile-card-main-titile">Documents</h5>
                {profileData?.documents?.length ? (
                  <div
                    className="d-flex justify-content-between align-items-center border profile-card-boeder document-main-border mb-3"
                    style={{ padding: "11px" }}
                  >
                    <div className="d-flex align-items-center">
                      <Image
                        src={Pdfimg}
                        alt="pdf"
                        width="40"
                        className="me-3"
                      />
                      <div>
                        <div className="card-feild">
                          {profileData.documents[0].name}
                        </div>
                        <div className="card-year">
                          {profileData.documents[0].date}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>No documents uploaded</div>
                )}
              </div>
            </ContentContainer>
          </div>
        </Col>
      </Row>
      {/* reviews */}
      <div>
        <ContentContainer className="mt-4">
          <div>
            <h5 className="mb-4 profile-card-main-titile">Reviews</h5>
            <div className="fs-2 fw-bold d-flex align-items-center gap-2 mb-4">
              <span>{profileData?.averageRating}</span>
              <Image
                src={stars}
                alt="stars"
                style={{ width: "128px", height: "auto" }}
              />
              <span
                className=" fw-normal"
                style={{ fontSize: "14px", color: "rgba(133, 139, 149, 1)" }}
              >
                ({profileData?.reviewCount} reviews)
              </span>
            </div>
            {/* review text */}

            <div>
              {reviewsToShow.map((item, idx) => (
                <div key={item.id}>
                  {/* Header */}
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex gap-2 align-items-center">
                      <Image
                        src={item.img}
                        alt="image"
                        width={32}
                        height={32}
                      />
                      <span className="fw-semibold">{item.name}</span>
                      <Image
                        src={verifiedreviewcard}
                        alt="verified"
                        width={22}
                        height={22}
                      />
                    </div>
                    <div
                      style={{ color: "rgba(133,139,149,1)", fontSize: "13px" }}
                    >
                      {item.date}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mt-1">
                    <Image
                      src={reviewcardimg}
                      alt="rating"
                      width={98}
                      height={18}
                    />
                    <span
                      className="ms-2"
                      style={{ color: "rgba(133,139,149,1)", fontSize: "14px" }}
                    >
                      {/* {item.rating} */}
                      {item.date}
                    </span>
                  </div>

                  {/* Visiting for */}
                  <div className="my-2">
                    <span
                      style={{ color: "rgba(62,74,87,1)", fontSize: "15px" }}
                    >
                      Visiting for: {item.visiting_for}
                    </span>
                  </div>

                  {/* Happy with */}
                  <div className="my-3">
                    <span
                      style={{ color: "rgba(62,74,87,1)", fontSize: "15px" }}
                    >
                      Happy with:
                    </span>
                    <span className="review_text_box mx-2">
                      {item.process_first}
                    </span>
                    <span className="review_text_box">
                      {item.process_second}
                    </span>
                  </div>

                  {/* Comment */}
                  <div
                    className="w-75 mt-3"
                    style={{ color: "rgba(62,74,87,1)", fontSize: "13px" }}
                  >
                    {item.text}
                  </div>

                  {/* Divider */}
                  {idx !== reviewsToShow.length - 1 && (
                    <div
                      className="my-4"
                      style={{
                        background: "rgba(221,225,232,1)",
                        height: "1px",
                      }}
                    />
                  )}
                </div>
              ))}

              {/* Show more / less */}
              {displayedReviewCount < allReviews.length ? (
                <div className="allreviews" onClick={handleShowMore}>
                  Show All Reviews ({allReviews.length - displayedReviewCount})
                </div>
              ) : (
                <div
                  className="allreviews"
                  onClick={() => setDisplayedReviewCount(2)}
                >
                  Show Less
                </div>
              )}
            </div>
          </div>
        </ContentContainer>
      </div>
    </div>
    // </Container>
  );
};

export default ProfileBasicDetails;
