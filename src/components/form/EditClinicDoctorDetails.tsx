"use client";
import Image from "next/image";
import { Row, Col } from "react-bootstrap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ContentContainer from "../ui/ContentContainer";
import dummy from "@/assets/images/dummy-patient-sucess.png";
import EditIcon from "@/assets/images/EditProfile.png";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { getDoctor } from "@/utlis/apis/apiHelper";
import DoctorClinicForm from "./DoctorClinicForm";
import { useParams } from "next/navigation";
import { ClinicDetails } from "@/utlis/types/interfaces";

const EditClinicDoctorDetails = ({
  clinic,
  onNext,
  onPrevious,
  onChange,
}: {
  clinic?: ClinicDetails;
  onNext: () => void;
  onPrevious: () => void;
  onChange: (updatedClinic: Partial<ClinicDetails>) => void;
}) => {
  const { id } = useParams() as { id: string };
  const [showForm, setShowForm] = useState(false);
  const [clinicList, setClinicList] = useState<ClinicDetails[]>([]);
  const [doctorData, setDoctorData] = useState<any>(null); // Store full doctor response
  const [loading, setLoading] = useState(true);
  const [selectedClinic, setSelectedClinic] = useState<any>(null);

  // ✅ FIXED: Store full doctor data AND clinics
  useEffect(() => {
    if (!id || id.length !== 24) {
      console.warn("Invalid doctor id", id);
      setLoading(false);
      return;
    }

    setLoading(true);

    getDoctor(id)
      .then((res) => {
        const doctor = res?.data?.doctor;
        console.log("Doctor:", doctor);

        setDoctorData(doctor);

        // ✅ FIX: clinics is an ARRAY
        if (Array.isArray(doctor?.clinics)) {
          setClinicList(doctor.clinics);
        } else {
          setClinicList([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctor:", err);
        setLoading(false);
      });
  }, [id]);

  const getClinicTypeLabel = (type?: string): string => {
    if (!type) return "Clinic";
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getClinicLogo = (logo?: string): string => {
    if (!logo) return "/images/default-clinic.png";
    if (logo.startsWith("http")) return logo;
    return `${process.env.NEXTPUBLIC_API_BASE_URL}${logo}`;
  };

  const formatPhone = (num?: string): string => {
    if (!num) return "-";
    let digits = num.replace(/\D/g, "");
    if (digits.length === 10) return `${digits.slice(0, 5)} ${digits.slice(5)}`;
    else if (digits.length === 12 && digits.startsWith("91"))
      return `${digits.slice(0, 2)} ${digits.slice(2, 7)} ${digits.slice(7)}`;
    return digits;
  };

  // FORM VIEW - ✅ Pass doctorData + selectedClinic
  if (showForm) {
    return (
      <DoctorClinicForm
        clinic={selectedClinic}
        data={doctorData} // ✅ Full doctor data for document lookup
        onNext={() => {
          setShowForm(false);
          onNext();
        }}
        onSave={(updatedClinic) => {
          onChange(updatedClinic);
          setShowForm(false);
        }}
        onPrevious={() => setShowForm(false)}
      />
    );
  }

  // LIST VIEW
  return (
    <ContentContainer className="mt-4">
      <h5 className="mb-5 profile-card-main-titile">Clinic Details</h5>

      {loading ? (
        <div>Loading clinics...</div>
      ) : clinicList.length === 0 ? (
        <div>No clinics found</div>
      ) : (
        clinicList.map((clinic) => (
          <div
            className="treatment-steps-box mb-3"
            key={clinic._id || clinic.clinicName}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-2">
                <img
                  // src={getClinicLogo(clinic.clinicLogo)}
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
                    <span
                      className={`clinic.clinicType === 'maia' ? 'profile-verified-badge' : ''`}
                    >
                      {getClinicTypeLabel(clinic.clinicType)}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                className="edit-btn"
                variant="outline"
                onClick={() => {
                  setSelectedClinic(clinic);
                  setShowForm(true);
                  console.log("Editing clinic:", clinic);
                }}
              >
                <Image src={EditIcon} alt="Edit" width={19} height={19} />
              </Button>
            </div>

            <Row className="mt-3">
              <Col md={6}>
                <span className="patient-treatment-box-subtitle">Address</span>
                <p className="patient-treatment-box-subtitle-desc w-75">
                  {clinic.address}
                </p>
              </Col>
              <Col md={6}>
                <span className="patient-treatment-box-subtitle">
                  Availability
                </span>
                {(() => {
                  const hours = clinic?.operationalHours || [];
                  return (
                    <>
                      <p className="patient-treatment-box-subtitle-desc m-0">
                        Mon to Fri {hours[0]?.openTime ?? "-"} -{" "}
                        {hours[0]?.closeTime ?? "-"}
                      </p>
                      <p className="patient-treatment-box-subtitle-desc m-0">
                        Sat Sun {hours[5]?.openTime ?? "-"} -{" "}
                        {hours[5]?.closeTime ?? "-"}
                      </p>
                    </>
                  );
                })()}
              </Col>
            </Row>
          </div>
        ))
      )}

      {/* FOOTER BUTTONS */}
      <div className="d-flex justify-content-end gap-3 mt-4">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft size={16} className="me-2" /> Previous
        </Button>
        <Button variant="default" className="maiacare-button" onClick={onNext}>
          Next <ArrowRight size={16} />
        </Button>
      </div>
    </ContentContainer>
  );
};

export default EditClinicDoctorDetails;
