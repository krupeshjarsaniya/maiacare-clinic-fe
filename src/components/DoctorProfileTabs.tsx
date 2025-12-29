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
  const DoctorId = params.id;
  const [DoctorData, setDoctorData] = useState<DoctorDetails | null>(null);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (!DoctorData) return;

    const doctorName = DoctorData?.name || "Doctor";

    dispatch(
      setHeaderData({
        title: `${doctorName}`,
        subtitle: `Doctors > ${doctorName}`,
      })
    );
  }, [DoctorData, dispatch]);
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [loading, setLoading] = useState(false);
  // const [DoctorData, setDoctorData] = useState<DoctorDetails | null>(null);
  const [doctorIdShow, setDoctorIdShow] = useState<string>("");

  const fetchPatientData = () => {
    if (!DoctorId) return; // guard undefined
    setLoading(true); // start loader
    getDoctor(DoctorId)
      .then((response) => {
        if (response.data.status) {
          setDoctorData(response.data.doctor);
          setDoctorIdShow(response.data.doctor?._id);
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
      content: <>{<DoctorAssignedPatients doctorIdShow={doctorIdShow} />}</>,
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
