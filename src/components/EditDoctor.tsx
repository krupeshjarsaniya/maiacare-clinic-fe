"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CustomTabs from "./ui/CustomTabs";
import EditDoctorClinicdetails from "./form/Edit-Doctor-Clinic-Details";
import EditDoctorKycDetails from "./form/Edit-Doctor-Kyc-Details";
import EditDoctorBasicDetails from "./form/Edit-Doctor-Basic-Details";

const EditDoctor = () => {
  const searchParams = useSearchParams();
  const tabFromQuery = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<string>("basic");

  // 👇 Detect tab from query on page load
  useEffect(() => {
    if (tabFromQuery) {
      setActiveTab(tabFromQuery);
    }
  }, [tabFromQuery]);

  const handleNextClick = () => {
    setActiveTab("Clinic");
  };

  const handlePrevious = () => {
    setActiveTab("basic");
  };
  const tabOptions = [
    { key: "basic", label: "Basic Details", content: <></> },
    { key: "Clinic", label: "Clinic Details", content: <></> },
    { key: "KYC", label: "KYC Details", content: <></> },
  ];

  return (
    <div>
      <CustomTabs
        activeKey={activeTab}
        setActiveKey={setActiveTab}
        tabOptions={tabOptions}
      />
      {activeTab === "basic" && (
        <EditDoctorBasicDetails onNext={handleNextClick} />
      )}
      {activeTab === "Clinic" && (
        <EditDoctorClinicdetails
          onNext={handleNextClick}
          onPrevious={handlePrevious}
        />
      )}
      {activeTab === "KYC" && (
        <EditDoctorKycDetails
          onNext={handleNextClick}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
};

export default EditDoctor;
