"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import CustomTabs from "./ui/CustomTabs";
import EditDoctorClinicdetails from "./form/DoctorClinicForm";
import EditDoctorKycDetails from "./form/Edit-Doctor-Kyc-Details";
import EditDoctorBasicDetails from "./form/Edit-Doctor-Basic-Details";
import { useDispatch } from "react-redux";
import { setHeaderData } from "@/utlis/redux/slices/headerSlice";
import { AppDispatch } from "@/utlis/redux/store";
import {
  ClinicDetails,
  DoctorDetails,
  KycDetails,
} from "@/utlis/types/interfaces";
import { editDoctor, getDoctor } from "@/utlis/apis/apiHelper";
import toast from "react-hot-toast";
import EditClinicDoctorDetails from "./form/EditClinicDoctorDetails";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
      // createdAt: "",
    },

    createdAt: "",
    updatedAt: "",
  });

  const fetchProfile = () => {
    getDoctor(DoctorId!)
      .then((response) => {
        if (response.status) {
          const doctor = response.data.doctor;

          setEditdoctor((prev) => ({
            ...prev,

            // BASIC
            profilePicture: doctor.profilePicture ?? "",
            name: doctor.name ?? "",
            specialty: doctor.specialty ?? "",
            yearsOfExperience: doctor.yearsOfExperience ?? 0,
            dob: doctor.dob ? doctor.dob.split("T")[0] : "",
            gender: doctor.gender ?? "",
            fees: doctor.fees ?? 0,
            servicesOffered: doctor.servicesOffered ?? [],
            contactNumber: doctor.contactNumber ?? "",
            email: doctor.email ?? "",
            about: doctor.about ?? "",
            // ✅ TAKE FIRST CLINIC (or selected one)
            clinicDetails: doctor.clinics?.[0]
              ? {
                  clinicLogo: doctor.clinics[0].clinicLogo ?? "",
                  clinicName: doctor.clinics[0].clinicName ?? "",
                  contactNumber: doctor.clinics[0].contactNumber ?? "",
                  email: doctor.clinics[0].email ?? "",
                  address: doctor.clinics[0].address ?? "",
                  mapLink: doctor.clinics[0].mapLink ?? "",
                  pincode: doctor.clinics[0].pincode ?? "",
                  city: doctor.clinics[0].city ?? "",
                  state: doctor.clinics[0].state ?? "",
                  useCustomHours: doctor.clinics[0].useCustomHours ?? false,
                  groupOperationalHours: {
                    weekdayOpen: "",
                    weekdayClose: "",
                    weekendOpen: "",
                    weekendClose: "",
                  },
                  contactPerson: {
                    name: doctor.clinics[0].contactPerson?.name ?? "",
                    contactNumber:
                      doctor.clinics[0].contactPerson?.contactNumber ?? "",
                    email: doctor.clinics[0].contactPerson?.email ?? "",
                    aadharNumber:
                      doctor.clinics[0].contactPerson?.aadharNumber ?? "",
                  },
                }
              : prev.clinicDetails,

            // QUALIFICATIONS
            qualifications: doctor.qualifications ?? [],

            // KYC (take first item)
            kycDetails: doctor.kycDetails?.[0]
              ? {
                  aadharNumber: doctor.kycDetails[0].aadharNumber ?? "",
                  aadharFile: doctor.kycDetails[0].aadharFile ?? "",
                  panNumber: doctor.kycDetails[0].panNumber ?? "",
                  panFile: doctor.kycDetails[0].panFile ?? "",
                  licenceNumber: doctor.kycDetails[0].licenceNumber ?? "",
                  licenceFile: doctor.kycDetails[0].licenceFile ?? "",
                  otherDocuments: doctor.kycDetails[0].otherDocuments ?? [],
                }
              : prev.kycDetails,
          }));
        } else {
          toast.error("Something went wrong!");
        }
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  const handleClinicChange = (updatedClinic: Partial<ClinicDetails>) => {
    setEditdoctor((prev) => {
      if (!prev.clinicDetails) return prev; // safety

      return {
        ...prev,
        clinicDetails: {
          ...prev.clinicDetails,
          ...updatedClinic,
        },
      };
    });
  };
  const handleFinalSave = async () => {
    try {
      const payload = {
        doctorId: DoctorId,

        // BASIC DETAILS
        profilePicture: editdoctor.profilePicture,
        name: editdoctor.name,
        specialty: editdoctor.specialty,
        yearsOfExperience: editdoctor.yearsOfExperience,
        dob: editdoctor.dob,
        gender: editdoctor.gender,
        fees: editdoctor.fees,
        servicesOffered: editdoctor.servicesOffered,
        contactNumber: editdoctor.contactNumber,
        email: editdoctor.email,

        // ✅ CLINIC (THIS IS WHAT BACKEND NEEDS)
        clinicDetails: editdoctor.clinicDetails,

        // QUALIFICATIONS
        qualifications: editdoctor.qualifications,

        // KYC
        kycDetails: editdoctor.kycDetails,
      };

      const response = await editDoctor(payload);

      if (response.status) {
        toast.success("Doctor updated successfully!");
        router.push(`/doctors/${DoctorId}`);
      } else {
        console.log("Failed to update doctor");

        // toast.error(response?.message || "Failed to update doctor");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while saving doctor");
    }
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
  const handleClinicNextClick = () => {
    setActiveTab("KYC");
  };
  const handlePrevious = () => {
    setActiveTab("basic");
  };
  const handleSave = (finalKyc: KycDetails) => {
    setEditdoctor((prev) => ({
      ...prev,
      kycDetails: finalKyc,
    }));
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
        <EditDoctorBasicDetails
          doctorId={DoctorId!}
          onNext={handleNextClick}
          data={editdoctor}
          onChange={(updatedBasicDetails) => {
            setEditdoctor((prev) => ({ ...prev, ...updatedBasicDetails }));
          }}
        />
      )}
      {activeTab === "Clinic" && (
        <EditClinicDoctorDetails
          clinic={editdoctor.clinicDetails}
          onChange={handleClinicChange}
          onNext={handleClinicNextClick}
          onPrevious={handlePrevious}
        />
      )}
      {activeTab === "KYC" && (
        <EditDoctorKycDetails
          data={editdoctor}
          onPrevious={handlePrevious}
          onSave={handleSave}
          onNext={handleNextClick}
          onFinalSave={handleFinalSave}
        />
      )}
    </div>
  );
};

export default EditDoctor;
