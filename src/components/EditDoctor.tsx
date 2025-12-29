"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import CustomTabs from "./ui/CustomTabs";
import EditDoctorClinicdetails from "./form/EditDoctorClinicForm";
import EditDoctorKycDetails from "./form/Edit-Doctor-Kyc-Details";
import EditDoctorBasicDetails from "./form/Edit-Doctor-Basic-Details";
import { useDispatch } from "react-redux";
import { setHeaderData } from "@/utlis/redux/slices/headerSlice";
import { AppDispatch } from "@/utlis/redux/store";
import { DoctorDetails } from "@/utlis/types/interfaces";
import { getDoctor } from "@/utlis/apis/apiHelper";
import toast from "react-hot-toast";
import EditClinicDoctorDetails from "./form/EditClinicDoctorDetails";
const EditDoctor = () => {
  const params = useParams<{ id?: string }>();
  const DoctorId = params.id;
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setHeaderData({
        title: "Edit Doctor",
        subtitle: "Doctors > Edit Doctor",
      })
    );
  }, []);
  const searchParams = useSearchParams();
  const tabFromQuery = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<string>("basic");
  const [editdoctor, setEditdoctor] = useState<DoctorDetails>({
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

    kycDetails: {
      aadharNumber: "",
      aadharFile: "",
      panNumber: "",
      panFile: "",
      licenceNumber: "",
      licenceFile: "",
      otherDocuments: [],
      createdAt: "",
    },

    createdAt: "",
    updatedAt: "",
  });
  const fetchProfile = () => {
    getDoctor(DoctorId!)
      .then((response) => {
        if (response.status) {
          console.log("data.doctor:", response.data.doctor);
          setEditdoctor(response.data.doctor);
        } else {
          toast.error(response.data?.message || "Something went wrong!");
        }
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  };
  useEffect(() => {
    if (tabFromQuery) {
      setActiveTab(tabFromQuery);
    }
  }, [tabFromQuery]);
  useEffect(() => {
    fetchProfile();
  }, []);
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
        <EditDoctorBasicDetails onNext={handleNextClick} data={editdoctor} />
      )}
      {activeTab === "Clinic" && (
        <EditClinicDoctorDetails
          // data={editdoctor}
          clinic={editdoctor.clinicDetails}
          onNext={handleNextClick}
          onPrevious={handlePrevious}
        />
      )}
      {activeTab === "KYC" && (
        <EditDoctorKycDetails
          data={editdoctor}
          onNext={handleNextClick}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
};

export default EditDoctor;
