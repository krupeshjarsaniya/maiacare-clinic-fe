"use client"
import React, { useEffect, useState } from "react";
// import { Container} from 'react-bootstrap';
// import ProfileManageLeave from "@/components/form/Profile-Manage-Leave";
import ProfileBasicDetails from "@/components/form/Profile-Basic-Details";
// import "../style/ProfileTabes.css";
// import ContentContainer from './ui/ContentContainer';
import CustomTabs from "./ui/CustomTabs";
import Profile from "./Profile";
import ContentContainer from "./ui/ContentContainer";
import DoctorDetailPageComponent from "./DoctorDetailPageComponent";
import DoctorBasicDetails from "./form/Doctor-Basic-Details";
import DoctorManageLeave from "./form/Doctor-Manage-Leave";
import DoctorAssignedPatients from "./form/Doctor-Assigned-Patients";

import DoctorBookAppointment from "./form/DoctorBookAppointment";
import { setHeaderData } from "@/utlis/redux/slices/headerSlice";
import { AppDispatch } from "@/utlis/redux/store";
import { useDispatch } from "react-redux";

const ProfileTabes = () => {
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

  const tabOptions = [
    {
      key: "basic",
      label: "Basic Details",
      content: (
        <>
          <DoctorBasicDetails />
        </>
      ),
    },
    {
      key: "leaves",
      label: "Manage Leaves",
      content: <>{<DoctorManageLeave />}</>,
    },
    {
      key: "assignedpatients",
      label: "Assigned Patients",
      content: <>{<DoctorAssignedPatients />}</>,
    },
    {
      key: "appointments",
      label: "Appointments",
      content: <>{<DoctorBookAppointment />}</>,
    },
  ];

  return (
    <>
      <DoctorDetailPageComponent />
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
