import React, { ChangeEvent, useState } from "react";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import Profiledoctor from "../assets/images/Profile-doctor.png";
import Stethoscope from "../assets/images/Stethoscope.png";
import Expirence from "../assets/images/Expirence.png";
import Bithdate from "../assets/images/Bithdate.png";
import Gender from "../assets/images/Gender.png";
import Phone from "../assets/images/Phone.png";
import Email from "../assets/images/Email.png";
import MaiaVerify from "../assets/images/verifiedreview.png";
import EditProfile from "../assets/images/edit.png";
import Image from "next/image";
import Arrowup from "../assets/images/ArrowUpRight.png";
import { useRouter } from "next/navigation";
import ContentContainer from "./ui/ContentContainer";
import { HiOutlineDotsVertical } from "react-icons/hi";
import power from "../assets/images/Power.png";
import Modal from "./ui/Modal";
import DoctorImg from "../assets/images/Profile-doctor.png";
import Verified from "../assets/images/verifiedreview.png";
import phone from "../assets/images/Phone.png";
import email from "../assets/images/Email.png";
import sthetoscope from "../assets/images/Stethoscope.png";
import patient from "../assets/images/patient.png";
import { RadioButtonGroup } from "../components/ui/RadioField";
import { InputFieldGroup } from "./ui/InputField";
import activation from "../assets/images/activation.png";
import deactivation from "../assets/images/deactivation.png";
import { useDoctor } from "./DoctorContext";
// import { profile } from "console";
const DoctorDetailPageComponent = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  type FormData = {
    profile: string; // default will be "female"
  };

  const initialFormData: FormData = {
    profile: "activate", // default value
  };
  interface FormError {
    [key: string]: string;
  }
  const initialFormError: FormError = {};

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formError, setFormError] = useState<FormError>(initialFormError);

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
    fees: "₹800",
    service: ["IVF","ICSI","IUI","Egg Freezing"],
    about:
      "I'm Dr. Riya Dharang, a fertility specialist with over 12 years of experience in reproductive medicine. I specialize in IVF, IUI, and fertility preservation, providing personalized, compassionate care to help individuals and couples achieve their parenthood dreams. Your well-being and trust are my top priorities.",
    qualifications: [
      {
        field: "Gynecologist",
        years: "3",
        university: "Medical University",
        degree: "MD",
        endYear: "2020",
        startYear: "2017",
      },
    ],
  };
  const { setDoctor } = useDoctor();
  const handleActive = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev: FormError) => ({ ...prev, [name]: "" }));
  };
  type Reason = {
    id: number;
    reason: string;
  };
  const reason: Reason[] = [
    {
      id: 1,
      reason: "Resignation/Termination",
    },
    {
      id: 2,
      reason: "Retirement",
    },
    {
      id: 3,
      reason: "Decseased",
    },
    {
      id: 4,
      reason: "Change in specialisation",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCancel = () => {
    setShowModal(false);
  };

  const [showResultModal, setShowResultModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    setShowResultModal(true);
  };
  const handleresultclose = () => {
    setShowResultModal(false);
  };

  const DoctorProfileCard: React.FC<{ doctor: typeof doctorData }> = ({
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
            <Image src={doctor.image} alt="Profile" className="profile-img" />
          </div>

          <div className="col-12 ms-4 mt-3 mt-md-0">
            <div>
              <div className="d-flex flex-md-row align-items-start align-items-md-center gap-1">
                <div className="profile-name-font">{doctor.name}</div>
                {doctor.isVerified && (
                  <Image
                    src={MaiaVerify}
                    alt="verified"
                    width={18}
                    height={18}
                  />
                )}
              </div>

              <div className="profile-details">
                <div className="detail-row profile-sub-title">
                  <span className="d-flex align-items-center gap-1">
                    <Image
                      src={Stethoscope}
                      alt="Specialization"
                      width={18}
                      height={18}
                    />
                    {doctor.specialization}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <Image
                      src={Expirence}
                      alt="experience"
                      width={16}
                      height={15}
                    />
                    {doctor.experience}
                  </span>
                </div>

                <div className="profile-sub-title">
                  <span className="d-flex align-items-center gap-1">
                    <Image src={Bithdate} alt="dob" width={18} height={18} />
                    {doctor.dob}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <Image src={Gender} alt="gender" width={18} height={18} />
                    {doctor.gender}
                  </span>
                </div>

                <div className="detail-row profile-sub-title">
                  <span className="d-flex align-items-center gap-1">
                    <Image src={Phone} alt="phone" width={18} height={18} />
                    {doctor.phone}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <Image src={Email} alt="email" width={18} height={18} />
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
                  setDoctor(doctorData);
                  router.push("/editDoctor");
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
              <Dropdown.Item className="text-danger" onClick={handleActive}>
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
        </Col>
      </Row>

      {/* ✅ Modal placed outside Dropdown */}
      <Modal
        show={showModal}
        onHide={handleClose}
        header={
          formData.profile === "activate"
            ? "Activate Profile Request"
            : "Deactivate Profile Request"
        }
        closeButton
        dialogClassName="custom-modal-width"
      >
        <div className="kycmodal_info">
          <div className="d-flex align-items-center justify-content-between">
            <div className="kycmodal_profile">
              <Image src={DoctorImg} alt="doctor" width={50} height={50} />
              <h6 className="mb-0 fw-semibold">Dr.Riya Dharang</h6>
              <Image src={Verified} alt="Verified" width={22} height={22} />
            </div>
            <Button
              className="maiacare-button-large  default-layout profile-card-boeder  bg-transparent btn btn-primary"
              // onClick={() => router.push("/profile")}
            >
              <Image src={Arrowup} alt="Arrow" width={12} height={12} />
            </Button>
          </div>
          <div className="kycmodal_info_text mt-3">
            <div>
              <Image
                src={phone}
                alt="phone"
                width={18}
                height={18}
                className="me-1"
              />
              <span>+91 12345 67890</span>
            </div>
            <div>
              <Image
                src={email}
                alt="email"
                width={18}
                height={18}
                className="me-1"
              />
              <span>riyadharang@miacare.com</span>
            </div>
          </div>
          <div className="kycmodal_info_text mt-2 gap-5">
            <div>
              <Image
                src={sthetoscope}
                alt="sthetoscope"
                width={18}
                height={18}
                className="me-1"
              />
              <span>Gynecologist</span>
            </div>
            <div>
              <Image
                src={patient}
                alt="patient"
                width={18}
                height={13}
                className="me-1"
              />
              <span>22 Patients</span>
            </div>
          </div>
        </div>
        <div>
          <Col md={6} className="mt-3 ">
            <RadioButtonGroup
              label="Select Action"
              name="profile"
              value={formData.profile}
              onChange={handleRadioChange} // ✅ now the correct type
              error={formError.profile}
              required
              options={[
                { label: "Activate", value: "activate" },
                { label: "Deactivate", value: "deactivate" },
              ]}
            />
          </Col>
        </div>
        <div className="mt-3">
          <label className="maiacare-input-field-label">Reason</label>
          <Form.Select defaultValue="" className="radio_options form-select">
            <option value="" disabled>
              Select
            </option>
            {reason.map((r) => (
              <option key={r.id} value={r.id}>
                {r.reason}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="mt-3">
          <Form.Check
            type="checkbox"
            label="Notify admin via email"
            className="text-nowrap check-box input "
            style={{ fontSize: "13px", color: "#3E4A57" }}
          />
        </div>
        <div>
          <InputFieldGroup
            label=" Any additional note"
            name=" Any additional note"
            type="text"
            // value={formData.Name}
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //   setFormData({ ...formData, Name: e.target.value });
            //   if (formError.Name) {
            //     // typing in hide error
            //     setFormError({ ...formError, Name: "" });
            //   }
            // }}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
            placeholder="Placeholder Text"
            required={true}
            disabled={false}
            readOnly={false}
            // error={formError.Name}
            className="position-relative "
          ></InputFieldGroup>
        </div>
        <div className="mt-3">
          <Row>
            <Col md={6} className="pe-0">
              <Button
                variant="outline"
                className="edit-profile-btn w-100 fw-semibold"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Col>
            <Col md={6}>
              <Button
                variant="dark"
                className="maiacare-button common-btn-blue w-100 fw-semibold"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>

      {/* --- Result Modal (After Submit) --- */}
      <Modal
        show={showResultModal}
        onHide={handleresultclose}
        centered
        className="activateModal"
      >
        <div className="text-center ">
          <Image
            src={formData.profile === "activate" ? activation : deactivation}
            alt="Result Image"
            width={200}
            height={150}
          />
          <h6 className="mt-3 modal-custom-header">
            {formData.profile === "activate"
              ? "Activation Request Sent!"
              : "Deactivation Request Sent!"}
          </h6>
          <p style={{ fontSize: "14px", color: "#3E4A57" }}>
            The Admin will be informed about your request and will react out to
            you for confirmation.
          </p>
          <Button
            className="maiacare-button common-btn-blue w-100"
            onClick={() => {
              setShowResultModal(false);
              setShowModal(false);
            }}
          >
            Done
          </Button>
        </div>
      </Modal>
    </ContentContainer>
  );

  return <DoctorProfileCard doctor={doctorData} />;
};

export default DoctorDetailPageComponent;
