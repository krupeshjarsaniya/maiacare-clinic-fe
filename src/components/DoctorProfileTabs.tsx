"use client";
import React, { useEffect, useState } from "react";

import CustomTabs from "./ui/CustomTabs";

import DoctorDetailPageComponent from "./DoctorDetailPageComponent";
import DoctorBasicDetails from "./form/Doctor-Basic-Details";
import DoctorManageLeave from "./form/Doctor-Manage-Leave";
import DoctorAssignedPatients from "./form/Doctor-Assigned-Patients";

import { setHeaderData } from "@/utlis/redux/slices/headerSlice";
import { AppDispatch } from "@/utlis/redux/store";
import { useDispatch } from "react-redux";
import DoctorAppointment from "./form/Doctor-Appointment";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { getDoctor } from "@/utlis/apis/apiHelper";
import { DoctorDetails } from "@/utlis/types/interfaces";

const ProfileTabes = () => {
  const params = useParams<{ id?: string }>();
  const DoctorId = "6943a7e6a55e888c3f9fa264";

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setHeaderData({
        title: "Dr. Riya Dharang",
        subtitle: "Doctors > Dr. Riya Dharang ",
      })
    );
  }, []);
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [loading, setLoading] = useState(false);
  const [DoctorData, setDoctorData] = useState<DoctorDetails | null>(null);
  const [doctorIdShow, setDoctorIdShow] = useState<string>("");

  const fetchPatientData = () => {
    if (!DoctorId) return; // guard undefined
    setLoading(true); // start loader
    getDoctor(DoctorId)
      .then((response) => {
        if (response.data.status) {
          setDoctorData(response.data.doctor);
          setDoctorIdShow(response.data.doctor?._id);
          // setModalFormPhisicalData(response.data.data?.physicalAssessment);
          // setMedicalHistoryFormData(response.data.data?.medicalHistory);
          // setModalFormFertilityData(response.data.data?.fertilityAssessment);
          // setPartnerDetails(response.data.data?.partnerDetails);
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
    fetchPatientData();
  }, [DoctorId]);

  const tabOptions = [
    {
      key: "basic",
      label: "Basic Details",
      content: (
        <>
          <DoctorBasicDetails
            DoctorData={DoctorData}
            doctorIdShow={doctorIdShow}
            // modalFormPhisicalData={modalFormPhisicalData}
            // medicalHistoryFormData={medicalHistoryFormData}
            // modalFormFertilityData={modalFormFertilityData}
            fetchPatientData={fetchPatientData}
          />
        </>
      ),
    },
    {
      key: "leaves",
      label: "Manage Leaves",
      content: <>{<DoctorManageLeave doctorIdShow={doctorIdShow} />}</>,
    },
    {
      key: "assignedpatients",
      label: "Assigned Patients",
      content: <>{<DoctorAssignedPatients />}</>,
    },
    {
      key: "appointments",
      label: "Appointments",
      content: <>{<DoctorAppointment />}</>,
    },
  ];

  return (
    <>
      <DoctorDetailPageComponent DoctorData={DoctorData} />
      <div className="mt-4">
        <CustomTabs
          activeKey={activeTab}
          setActiveKey={setActiveTab}
          tabOptions={tabOptions}
        />

        {activeTab === "basic" && <div></div>}
      </div>
    </>
  );
};

export default ProfileTabes;
