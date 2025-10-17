"use client";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Image from "next/image";
import DoctorAddedImg from "@/assets/images/doctor-success.png"; // use your image
import { useRouter } from "next/navigation";

export default function DoctorAddedModal() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check flag from localStorage
    const isSuccess = localStorage.getItem("doctorAddedSuccess");
    if (isSuccess === "true") {
      setShow(true);
      localStorage.removeItem("doctorAddedSuccess"); // clear after showing
    }
  }, []);

  if (!show) return null;

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
      backdrop="static"
      keyboard={false}
      className="doctor-success-modal"
    >
      <Modal.Body className="text-center p-4">
        <Image
          src={DoctorAddedImg}
          alt="Doctor added success"
          width={120}
          height={120}
          className="mb-3"
        />
        <h5 className="fw-bold" style={{ color: "#E29578" }}>
          Doctor Added Successfully!!
        </h5>
        <p className="text-muted mb-4">
          You can now view their profile & manage consultations seamlessly.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <Button
            variant="dark"
            className="px-4 maiacare-button edit-profile-btn w-50"
            onClick={() => setShow(false)}
          >
            Okay
          </Button>
          <Button
            variant="dark"
            className="px-4 maiacare-button common-btn-blue w-50"
            onClick={() => {
              setShow(false);
              router.push("/doctors/DoctorDetailPageComponent"); // change to actual route
            }}
          >
            View Details
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
