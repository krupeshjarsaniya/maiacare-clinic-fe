"use client";
import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import ProfileImage from "../assets/images/patient_profile.png";
import { ProfileCard } from "../components/ui/custom/ProfileCard";
import ContentContainer from "./ui/ContentContainer";
import CustomTabs from "./ui/CustomTabs";
import ProfileBasicDetail from "../components/ProfileBasicDetails";
import { setHeaderData } from "@/utlis/redux/slices/headerSlice";

import PatientReport from "./PatientReport";
import PatientTreatment from "../components/PatientTreatment";
import PatientPaymentHistory from "../components/PatientPaymentHistory";
import PartnerDetail from "../components/PartnerDetail";
import PatientAppointment from "../components/PatientAppointment";
import { getPatientInfo } from "@/utlis/apis/apiHelper";
import toast from "react-hot-toast";
import {
  FertilityAssessment,
  GetAllPatient,
  MedicalHistoryShow,
  PartnerDetails,
  PatientData,
  PhysicalAssessment,
} from "@/utlis/types/interfaces";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utlis/redux/store";
// import '@/style/patientProfile.css';

const AddMedicalHistory = () => {
  const params = useParams<{ id?: string }>();
  const patientId = params?.id;
  console.log(patientId);

  const dispatch: AppDispatch = useDispatch();
  // const patientId = params.id;
  const [key, setKey] = useState<string>("basic");
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [patientIdShow, setPatientIdShow] = useState<string>("");
  const [modalFormPhisicalData, setModalFormPhisicalData] = useState<
    PhysicalAssessment[] | null
  >(null);
  const [modalFormFertilityData, setModalFormFertilityData] =
    useState<FertilityAssessment | null>(null);
  const [medicalHistoryFormData, setMedicalHistoryFormData] =
    useState<MedicalHistoryShow | null>(null);
  const [partnerDetails, setPartnerDetails] = useState<PartnerDetails | null>(
    null
  );

  const tabOptions = [
    {
      key: "basic",
      label: "Basic Details",
      content: (
        <div className="mt-4">
          <ProfileBasicDetail
            patientData={patientData}
            modalFormPhisicalData={modalFormPhisicalData}
            medicalHistoryFormData={medicalHistoryFormData}
            modalFormFertilityData={modalFormFertilityData}
            fetchPatientData={fetchPatientData}
            // loading={loading}
          />
        </div>
      ),
    },
    {
      key: "partner",
      label: "Partner Details",
      content: (
        <div>
          <PartnerDetail setActiveTab={setActiveTab} />
        </div>
      ),
    },
    {
      key: "appointment",
      label: "Appointment",
      content: (
        <div className="mt-4">
          <PatientAppointment />
        </div>
      ),
    },
    {
      key: "reports",
      label: "Reports",
      content: (
        <div className="mt-4">
          <PatientReport />
        </div>
      ),
    },
    {
      key: "payment history",
      label: "Payment History",
      content: (
        <div>
          <PatientPaymentHistory />
        </div>
      ),
    },
    {
      key: "treatment",
      label: "Treatment",
      content: (
        <div>
          <PatientTreatment />
        </div>
      ),
    },
  ];
  const [getAllPatients, setGetAllPatients] = useState<GetAllPatient[]>([]);
  const [patientCoute, setPatientCoute] = useState<number>(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(
      setHeaderData({
        title: patientData?.personalDetails
          ? patientData.personalDetails.name
          : "Patient Not Found",
        subtitle: patientData?.personalDetails
          ? patientData.personalDetails.name
          : "Patient Not Found",
      })
    );
  }, [patientData, dispatch]);

  const fetchPatientData = () => {
    console.log("patientId:-", patientId);

    if (!patientId) return; // guard undefined
    setLoading(true); // start loader
    getPatientInfo(patientId)
      .then((response) => {
        if (response.data.status) {
          setPatientData(response.data.data);
          setPatientIdShow(response.data.data?.patientId);
          setModalFormPhisicalData(response.data.data?.physicalAssessment);
          setMedicalHistoryFormData(response.data.data?.medicalHistory);
          setModalFormFertilityData(response.data.data?.fertilityAssessment);
          setPartnerDetails(response.data.data?.partnerDetails);
        } else {
          toast.error("Failed to fetch patient data");
        }
      })
      .catch((err) => {
        console.log("error", err.response);
      })
      .finally(() => {
        setLoading(false); // stop loader
      });
  };
  useEffect(() => {
    // getPatientInfo();
    setActiveTab(key);
  }, [key]);
  useEffect(() => {
    fetchPatientData();
  }, [patientId]);
  return (
    <>
      <ProfileCard
        profileData={patientData?.personalDetails}
        patientIdShow={patientId}
      />

      <main className="bg-light py-2">
        <div className="">
          <CustomTabs
            activeKey={activeTab}
            setActiveKey={setActiveTab}
            tabOptions={tabOptions}
          />
        </div>
      </main>
    </>
  );
};

export default AddMedicalHistory;
