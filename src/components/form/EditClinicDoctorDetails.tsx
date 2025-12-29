"use client";

import Image from "next/image";
import { Row, Col } from "react-bootstrap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ContentContainer from "../ui/ContentContainer";
import dummy from "@/assets/images/dummy-patient-sucess.png";
import MaiaVerified from "@/assets/images/Maia Verified.png";
import EditIcon from "@/assets/images/EditProfile.png";
import { useEffect, useState } from "react";

import Button from "../ui/Button";
import { getDoctor } from "@/utlis/apis/apiHelper";

import "react-loading-skeleton/dist/skeleton.css";
import EditDoctorClinicForm from "./EditDoctorClinicForm";
import { useParams } from "next/navigation";
import { ClinicDetails } from "@/utlis/types/interfaces";

const EditClinicDoctorDetails = ({
  clinic,
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
  clinic?: ClinicDetails;
}) => {
  const { id } = useParams<{ id: string }>();
  const [showForm, setShowForm] = useState(false);
  const [clinicList, setClinicList] = useState<ClinicDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClinic, setSelectedClinic] = useState<any>(null);

  // ✅ Hooks ALWAYS on top
  useEffect(() => {
    if (clinic) {
      setClinicList([clinic]);
      return;
    }
    if (!id || id.length !== 24) {
      console.warn("Invalid doctor id:", id);
      return;
    }
    getDoctor(id).then((res) => {
      console.log("clinic:-", res.data.doctor.clinics);
      setClinicList(res?.data?.doctor?.clinics || []);
    });
  }, [clinic]);
  const getClinicTypeLabel = (type?: string) => {
    if (!type) return "Clinic";
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  const getClinicLogo = (logo?: string) => {
    if (!logo) return "/images/default-clinic.png"; // local fallback

    // Absolute URL (https://...)
    if (logo.startsWith("http")) return logo;

    // Backend sometimes sends relative paths
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/${logo}`;
  };
  const hours = clinic?.operationalHours;
  const formatPhone = (num?: string) => {
    if (!num) return "-";
    let digits = num.replace(/\D/g, "");
    if (digits.length === 10) {
      return `+${digits.slice(0, 5)} ${digits.slice(5)}`;
    } else if (digits.length === 12 && digits.startsWith("91")) {
      return `+${digits.slice(0, 2)} ${digits.slice(2, 7)} ${digits.slice(7)}`;
    } else {
      return digits;
    }
  };

  return (
    <>
      {/* ✅ FORM VIEW */}
      {showForm ? (
        <EditDoctorClinicForm
          clinic={selectedClinic}
          onNext={() => setShowForm(false)}
          onPrevious={() => setShowForm(false)}
        />
      ) : (
        <>
          {/* ✅ LIST VIEW */}
          <ContentContainer className="mt-4">
            <h5 className="mb-5 profile-card-main-titile">Clinic Details</h5>

            {clinicList.map((clinic) => (
              <div className="treatment-steps-box mb-3" key={clinic._id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2">
                    <img
                      //   src={getClinicLogo(clinic.clinicLogo)}
                      src={dummy.src}
                      alt="dummy"
                      width={58}
                      height={58}
                      className="rounded-circle"
                    />

                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center gap-2">
                        <h6 className="contact-details-heading m-0">
                          {clinic.clinicName}
                        </h6>

                        {/* <span
                          className={
                            clinic.clinicType === "maia"
                              ? "profile-verified-badge"
                              : "doctor-listing-modal-profile-subtitle"
                          }
                        >
                          {clinic.clinicType === "maia" && (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ marginRight: "4px" }}
                            >
                              <path
                                d="M17.6557 8.33896C17.3851 8.18162 17.1419 7.98121 16.9357 7.74563C16.9566 7.41764 17.0347 7.09584 17.1666 6.7948C17.4091 6.11063 17.6832 5.33563 17.2432 4.73313C16.8032 4.13063 15.9724 4.1498 15.2432 4.16646C14.921 4.19961 14.5955 4.17763 14.2807 4.10146C14.113 3.82855 13.9932 3.52895 13.9266 3.21563C13.7199 2.51146 13.4841 1.71563 12.7599 1.4773C12.0616 1.2523 11.4149 1.7473 10.8432 2.1823C10.5966 2.40756 10.3107 2.58578 9.9999 2.70813C9.68581 2.58677 9.3968 2.40851 9.1474 2.1823C8.5774 1.7498 7.93323 1.2498 7.23156 1.47813C6.50906 1.71313 6.27323 2.51146 6.0649 3.21563C5.99834 3.52793 5.87974 3.82682 5.71406 4.0998C5.39866 4.17576 5.07275 4.1983 4.7499 4.16646C4.01823 4.14646 3.19406 4.1248 2.7499 4.73313C2.30573 5.34146 2.58323 6.11063 2.82656 6.79396C2.96026 7.09455 3.03955 7.41649 3.06073 7.7448C2.85496 7.98069 2.61204 8.18139 2.34156 8.33896C1.73156 8.75563 1.03906 9.2298 1.03906 9.9998C1.03906 10.7698 1.73156 11.2423 2.34156 11.6606C2.61198 11.8179 2.8549 12.0184 3.06073 12.254C3.04178 12.5821 2.96475 12.9044 2.83323 13.2056C2.59156 13.889 2.31823 14.664 2.7574 15.2665C3.19656 15.869 4.0249 15.8498 4.7574 15.8331C5.07987 15.7999 5.40564 15.8219 5.72073 15.8981C5.88771 16.1713 6.00718 16.4708 6.07406 16.784C6.28073 17.4881 6.51656 18.284 7.24073 18.5223C7.35683 18.5595 7.47797 18.5786 7.5999 18.579C8.1859 18.4949 8.73055 18.2284 9.15656 17.8173C9.40323 17.592 9.68906 17.4138 9.9999 17.2915C10.314 17.4128 10.603 17.5911 10.8524 17.8173C11.4232 18.2531 12.0699 18.7506 12.7691 18.5215C13.4916 18.2865 13.7274 17.4881 13.9357 16.7848C14.0025 16.4719 14.122 16.1726 14.2891 15.8998C14.6032 15.8233 14.9282 15.8008 15.2499 15.8331C15.9816 15.8506 16.8057 15.8748 17.2499 15.2665C17.6941 14.6581 17.4166 13.889 17.1732 13.2048C17.0404 12.9045 16.9612 12.5832 16.9391 12.2556C17.1449 12.0195 17.3882 11.8188 17.6591 11.6615C18.2691 11.2448 18.9616 10.7698 18.9616 9.9998C18.9616 9.2298 18.2666 8.75646 17.6557 8.33896Z"
                                fill="#E29578"
                              />
                              <path
                                d="M9.1667 12.2915C9.08462 12.2917 9.00332 12.2755 8.92751 12.2441C8.8517 12.2126 8.78288 12.1664 8.72504 12.1082L7.05837 10.4415C6.94797 10.323 6.88787 10.1663 6.89072 10.0044C6.89358 9.84249 6.95917 9.688 7.07368 9.57349C7.18819 9.45898 7.34268 9.39338 7.5046 9.39053C7.66652 9.38767 7.82322 9.44777 7.9417 9.55817L9.22503 10.8415L12.125 8.66651C12.2576 8.56705 12.4243 8.52435 12.5884 8.54779C12.7525 8.57123 12.9006 8.6589 13 8.79151C13.0995 8.92411 13.1422 9.0908 13.1188 9.25489C13.0953 9.41899 13.0076 9.56705 12.875 9.66651L9.5417 12.1665C9.43349 12.2476 9.30192 12.2914 9.1667 12.2915Z"
                                fill="white"
                              />
                            </svg>
                          )}

                          {/* ✅ API driven clinicType text */}
                        {/* {clinic.clinicType.charAt(0).toUpperCase() +
                            clinic.clinicType.slice(1)}
                        </span> */}
                        <span
                          className={
                            clinic.clinicType === "maia"
                              ? "profile-verified-badge"
                              : "doctor-listing-modal-profile-subtitle"
                          }
                        >
                          {clinic.clinicType === "maia" && (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ marginRight: "4px" }}
                            >
                              <path
                                d="M17.6557 8.33896C17.3851 8.18162 17.1419 7.98121 16.9357 7.74563C16.9566 7.41764 17.0347 7.09584 17.1666 6.7948C17.4091 6.11063 17.6832 5.33563 17.2432 4.73313C16.8032 4.13063 15.9724 4.1498 15.2432 4.16646C14.921 4.19961 14.5955 4.17763 14.2807 4.10146C14.113 3.82855 13.9932 3.52895 13.9266 3.21563C13.7199 2.51146 13.4841 1.71563 12.7599 1.4773C12.0616 1.2523 11.4149 1.7473 10.8432 2.1823C10.5966 2.40756 10.3107 2.58578 9.9999 2.70813C9.68581 2.58677 9.3968 2.40851 9.1474 2.1823C8.5774 1.7498 7.93323 1.2498 7.23156 1.47813C6.50906 1.71313 6.27323 2.51146 6.0649 3.21563C5.99834 3.52793 5.87974 3.82682 5.71406 4.0998C5.39866 4.17576 5.07275 4.1983 4.7499 4.16646C4.01823 4.14646 3.19406 4.1248 2.7499 4.73313C2.30573 5.34146 2.58323 6.11063 2.82656 6.79396C2.96026 7.09455 3.03955 7.41649 3.06073 7.7448C2.85496 7.98069 2.61204 8.18139 2.34156 8.33896C1.73156 8.75563 1.03906 9.2298 1.03906 9.9998C1.03906 10.7698 1.73156 11.2423 2.34156 11.6606C2.61198 11.8179 2.8549 12.0184 3.06073 12.254C3.04178 12.5821 2.96475 12.9044 2.83323 13.2056C2.59156 13.889 2.31823 14.664 2.7574 15.2665C3.19656 15.869 4.0249 15.8498 4.7574 15.8331C5.07987 15.7999 5.40564 15.8219 5.72073 15.8981C5.88771 16.1713 6.00718 16.4708 6.07406 16.784C6.28073 17.4881 6.51656 18.284 7.24073 18.5223C7.35683 18.5595 7.47797 18.5786 7.5999 18.579C8.1859 18.4949 8.73055 18.2284 9.15656 17.8173C9.40323 17.592 9.68906 17.4138 9.9999 17.2915C10.314 17.4128 10.603 17.5911 10.8524 17.8173C11.4232 18.2531 12.0699 18.7506 12.7691 18.5215C13.4916 18.2865 13.7274 17.4881 13.9357 16.7848C14.0025 16.4719 14.122 16.1726 14.2891 15.8998C14.6032 15.8233 14.9282 15.8008 15.2499 15.8331C15.9816 15.8506 16.8057 15.8748 17.2499 15.2665C17.6941 14.6581 17.4166 13.889 17.1732 13.2048C17.0404 12.9045 16.9612 12.5832 16.9391 12.2556C17.1449 12.0195 17.3882 11.8188 17.6591 11.6615C18.2691 11.2448 18.9616 10.7698 18.9616 9.9998C18.9616 9.2298 18.2666 8.75646 17.6557 8.33896Z"
                                fill="#E29578"
                              />
                              <path
                                d="M9.1667 12.2915C9.08462 12.2917 9.00332 12.2755 8.92751 12.2441C8.8517 12.2126 8.78288 12.1664 8.72504 12.1082L7.05837 10.4415C6.94797 10.323 6.88787 10.1663 6.89072 10.0044C6.89358 9.84249 6.95917 9.688 7.07368 9.57349C7.18819 9.45898 7.34268 9.39338 7.5046 9.39053C7.66652 9.38767 7.82322 9.44777 7.9417 9.55817L9.22503 10.8415L12.125 8.66651C12.2576 8.56705 12.4243 8.52435 12.5884 8.54779C12.7525 8.57123 12.9006 8.6589 13 8.79151C13.0995 8.92411 13.1422 9.0908 13.1188 9.25489C13.0953 9.41899 13.0076 9.56705 12.875 9.66651L9.5417 12.1665C9.43349 12.2476 9.30192 12.2914 9.1667 12.2915Z"
                                fill="white"
                              />
                            </svg>
                          )}

                          {getClinicTypeLabel(clinic.clinicType)}
                        </span>
                      </div>
                      <span className="dashboard-treatment-success-patients">
                        {formatPhone(clinic?.contactNumber)}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="edit-btn"
                    variant="outline"
                    onClick={() => {
                      setSelectedClinic(clinic);
                      setShowForm(true);
                      console.log("clinic : ", clinic);
                    }}
                  >
                    <Image src={EditIcon} alt="Edit" width={19} height={19} />
                  </Button>
                </div>

                <Row className="mt-3">
                  <Col md={6}>
                    <span className="patient-treatment-box-subtitle">
                      Address
                    </span>
                    <p className="patient-treatment-box-subtitle-desc w-75">
                      {clinic.address}
                    </p>
                  </Col>

                  <Col md={6}>
                    <span className="patient-treatment-box-subtitle">
                      Availability
                    </span>

                    {/* Mon to Fri */}
                    {hours && hours.length > 0 && (
                      <>
                        <p className="patient-treatment-box-subtitle-desc m-0">
                          Mon to Fri: {hours[0]?.openTime ?? "-"} -{" "}
                          {hours[0]?.closeTime ?? "-"}
                        </p>

                        <p className="patient-treatment-box-subtitle-desc m-0">
                          Sat & Sun: {hours[5]?.openTime ?? "-"} -{" "}
                          {hours[5]?.closeTime ?? "-"}
                        </p>
                      </>
                    )}
                  </Col>
                </Row>
              </div>
            ))}
          </ContentContainer>

          {/* ✅ FOOTER BUTTONS */}
          <div className="d-flex justify-content-end gap-3 mt-4">
            <Button variant="outline" onClick={onPrevious}>
              <ArrowLeft size={16} className="me-2" />
              Previous
            </Button>

            <Button variant="default" className="maiacare-button">
              Next <ArrowRight size={16} />
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default EditClinicDoctorDetails;
