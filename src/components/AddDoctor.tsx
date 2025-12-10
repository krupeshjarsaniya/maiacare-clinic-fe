"use client";
import React, { useEffect, useState } from "react";
import CustomTabs from "./ui/CustomTabs";
import AddDoctorBasicDetails from "./form/Add-Doctor-Basic-Details";
import AddDoctorClinicdetails from "./form/Add-Doctor-Clinic-details";
import { AppDispatch } from "@/utlis/redux/store";
import { useDispatch } from "react-redux";
import { setHeaderData } from "@/utlis/redux/slices/headerSlice";
import AddDoctorKycDetails from "./form/Add-Doctor-Kyc-Details";

const AddDoctor = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setHeaderData({
        title: "Add New Doctor",
        subtitle: "Doctors > Add New Doctor",
      })
    );
  }, []);
  const [activeTab, setActiveTab] = useState<string>("basic");

  const handlebasicNextClick = () => {
    setActiveTab("Clinic");
    // onUpdate={(data) => setBasicDetails(data)}
  };
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
  const [doctors, setDoctors] = useState<unknown[]>([]);
  const [currentStep, setCurrentStep] = useState("add"); // or 'list'
  const handleAddDoctor = (newDoctor: unknown) => {
    setDoctors((prev) => [...prev, newDoctor]);
    setCurrentStep("list"); // go to list page after add
  };
  return (
    <div>
      <CustomTabs
        activeKey={activeTab}
        setActiveKey={setActiveTab}
        tabOptions={tabOptions}
      />
      {activeTab === "basic" && (
        <div>
          <AddDoctorBasicDetails
            onNext={handlebasicNextClick}
            onSaveDoctor={handleAddDoctor}
          />
        </div>
      )}
      {activeTab === "Clinic" && (
        <div>
          <AddDoctorClinicdetails
            onNext={handleNextClick}
            onPrevious={handlePrevious}
          />
        </div>
      )}
      {activeTab === "KYC" && (
        <div>
          <AddDoctorKycDetails
            onNext={handleNextClick}
            onPrevious={handlePrevious}
          />
        </div>
      )}
    </div>
  );
};
export default AddDoctor;
