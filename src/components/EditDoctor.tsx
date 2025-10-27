"use client";
import React, { useEffect, useState } from "react";
import CustomTabs from "./ui/CustomTabs";
import EditDoctorClinicdetails from "./form/Edit-Doctor-Clinic-Details";
import EditDoctorKycDetails from "./form/Edit-Doctor-Kyc-Details";
import EditDoctorBasicDetails from "./form/Edit-Doctor-Basic-Details";

const EditDoctor = () => {
  const [activeTab, setActiveTab] = useState<string>("basic");

  const handleNextClick = () => {
    setActiveTab("KYC");
  };

  const handlePrevious = () => {
    setActiveTab("basic");
  };

  const tabOptions = [
    {
      key: "basic",
      label: "Basic Details",
      content: <></>,
    },

    {
      key: "Clinic",
      label: "Clinic Details",
      content: <></>,
    },
    {
      key: "KYC",
      label: "KYC Details",
      content: <></>,
    },
  ];

  return (
    <div>
      <CustomTabs
        activeKey={activeTab}
        setActiveKey={setActiveTab}
        tabOptions={tabOptions}
      />

      {activeTab === "basic" && (
        <div>
          <EditDoctorBasicDetails onNext={handleNextClick} />
        </div>
      )}
      {activeTab === "Clinic" && (
        <div>
          <EditDoctorClinicdetails
            onNext={handleNextClick}
            onPrevious={handlePrevious}
          />
        </div>
      )}
      {activeTab === "KYC" && (
        <div>
          <EditDoctorKycDetails
            onNext={handleNextClick}
            onPrevious={handlePrevious}
          />
        </div>
      )}
    </div>
  );
};
export default EditDoctor;
