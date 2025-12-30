"use client";
import React, { useEffect, useState } from "react";
import CustomTabs from "./ui/CustomTabs";
import AddDoctorBasicDetails from "./form/Add-Doctor-Basic-Details";
import AddDoctorClinicdetails from "./form/Add-Doctor-Clinic-details";
import { AppDispatch } from "@/utlis/redux/store";
import { useDispatch } from "react-redux";
import { setHeaderData } from "@/utlis/redux/slices/headerSlice";
import AddDoctorKycDetails from "./form/Add-Doctor-Kyc-Details";
import { DoctorDetails } from "@/utlis/types/interfaces";

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
  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails>({
    profilePicture: "",
    name: "",
    specialty: "",
    yearsOfExperience: 0,
    dob: "",
    gender: "",
    fees: 0,
    servicesOffered: [],
    contactNumber: "",
    email: "",

    clinicDetails: {
      clinicLogo: "",
      clinicName: "",
      contactNumber: "",
      email: "",
      address: "",
      mapLink: "",
      pincode: "",
      city: "",
      state: "",
      useCustomHours: false,
      groupOperationalHours: {
        weekdayOpen: "",
        weekdayClose: "",
        weekendOpen: "",
        weekendClose: "",
      },
      contactPerson: {
        name: "",
        contactNumber: "",
        email: "",
        aadharNumber: "",
      },
    },

    qualifications: [],

    kycDetails: 
      {
        aadharNumber: "",
        aadharFile: "",
        panNumber: "",
        panFile: "",
        licenceNumber: "",
        licenceFile: "",
        otherDocuments: [],
        // createdAt: "",
      },
    

    createdAt: "", // ✅ ADD THIS
    updatedAt: "", // ✅ ADD THIS
  });

  const handlebasicNextClick = (basicData: Partial<DoctorDetails>) => {
    setDoctorDetails((prev) => ({
      ...prev,
      ...basicData,
    }));
    setActiveTab("Clinic");
  };

  const handleNextClick = (clinicData: DoctorDetails["clinicDetails"]) => {
    setDoctorDetails((prev) => ({
      ...prev,
      clinicDetails: clinicData,
    }));

    setActiveTab("KYC");
  };
  const handlePrevious = () => {
    setActiveTab("basic");
  };
  const handleKycNextClick = (kycData: DoctorDetails["kycDetails"]) => {
    setDoctorDetails((prev) => ({
      ...prev,
      kycDetails: kycData,
    }));

    // FINAL SUBMIT / API CALL CAN GO HERE
    console.log("Final Doctor Payload 👉", {
      ...doctorDetails,
      kycDetails: kycData,
    });

    // optional: move to list or reset
    // setCurrentStep("list");
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
  const handleTabClick = (key: string) => {
    if (key === activeTab) {
      return;
    }
  };
  return (
    <div>
      <CustomTabs
        activeKey={activeTab}
        setActiveKey={handleTabClick}
        tabOptions={tabOptions}
      />
      {activeTab === "basic" && (
        <AddDoctorBasicDetails
          data={doctorDetails}
          onNext={handlebasicNextClick}
        />
      )}
      {activeTab === "Clinic" && (
        <div>
          <AddDoctorClinicdetails
            data={doctorDetails.clinicDetails}
            onNext={handleNextClick}
            onPrevious={handlePrevious}
          />
        </div>
      )}
      {activeTab === "KYC" && (
        <div>
          <AddDoctorKycDetails
            data={doctorDetails} // ✅ pass FULL doctor object
            onPrevious={() => setActiveTab("Clinic")}
            onSave={(kycData) => {
              setDoctorDetails((prev) => ({
                ...prev,
                kycDetails: kycData,
              }));
            }}
          />
        </div>
      )}
    </div>
  );
};
export default AddDoctor;
