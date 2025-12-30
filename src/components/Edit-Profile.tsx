"use client";
import React, { useEffect, useState } from "react";
import Editbasicdetails from "../components/form/Edit-Basic-Details";

// import Editkycdetails from "./form/Edit-Kyc-Details";

import CustomTabs from "./ui/CustomTabs";
import EditOperationalHours from "./form/Edit-Operational-Hours";
import EditContactDetails from "./form/Edit-Contact-Details";
import toast from "react-hot-toast";
import { getProfile, updateProfile } from "@/utlis/apis/apiHelper";
import axios from "axios";
import { clinicData, ContactPerson } from "@/utlis/types/interfaces";
import { OperationalHour } from "@/utlis/types/interfaces";
import { useRouter } from "next/navigation";
// import ContentContainer from './ui/ContentContainer';
export type OperationalHoursPayload =
  | {
      useCustomHours: false;
      groupOperationalHours: {
        weekdayOpen: string;
        weekdayClose: string;
        weekendOpen: string;
        weekendClose: string;
      };
      emergencyDoctorsAvailable_24_7: boolean;
    }
  | {
      useCustomHours: true;
      customOperationalHours: OperationalHour[];
      emergencyDoctorsAvailable_24_7: boolean;
    };
const EditProfile = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [BasicDetails, setBasicDetails] = useState<clinicData | null>(null);
  const [operational, setOperational] = useState<OperationalHour[]>([]);
  const [contact, setContact] = useState<ContactPerson | null>(null);
  const [clinicDetails, setClinicDetails] = useState<clinicData>({
    _id: "",
    clinicLogo: "",
    clinicName: "",
    clinicType: "",
    verified: false,
    contactNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    mapLink: "",

    useCustomHours: true,
    operationalHours: [],

    contactPerson: {
      name: "",
      contactNumber: "",
      email: "",
      aadharNumber: "",
    },

    documents: [],
    reviews: [],
    reviewCount: 0,
    averageRating: 0,
    is_24_7: false,
    photos: [],
    servicesOffered: [],

    emergencyDoctorsAvailable_24_7: false,
    doctorOnboard: 0,
    beds: 0,

    __v: 0,
  });

  const handleNextClick = () => {
    setActiveTab("operational");
  };
  const handleoperationalNextClick = () => {
    setActiveTab("contact");
  };
  const handlePrevious = () => {
    setActiveTab("basic");
  };
  const handleContactChange = (updated: ContactPerson) => {
    setClinicDetails((prev) => ({
      ...prev,
      contactPerson: {
        ...prev.contactPerson,
        ...updated,
      },
    }));
  };
  const tabOptions = [
    {
      key: "basic",
      label: "Basic Details",
      content: <></>,
    },

    {
      key: "operational",
      label: "Operational Hours",
      content: <></>,
    },
    {
      key: "contact",
      label: "Contact Details",
      content: <></>,
    },
  ];

  // const fetchProfile = () => {
  //   getProfile()
  //     .then((response) => {
  //       if (response.status) {
  //         setBasicDetails(response.data.data);
  //         setOperational(response.data.data.operationalHours);
  //         setContact(response.data.data.contactPerson);
  //       } else {
  //         toast.error(response.data?.message || "Something went wrong!");
  //         console.error("Error fetching profile");
  //       }
  //     })
  //     .catch((err: unknown) => {
  //       console.error("API call failed", err);
  //       if (axios.isAxiosError(err)) {
  //         toast.error(err.response?.data?.message || "Something went wrong!");
  //       } else {
  //         toast.error("Something went wrong!");
  //       }
  //     });
  // };
  const fetchProfile = () => {
    getProfile()
      .then((response) => {
        if (response.status) {
          setClinicDetails(response.data.data);
        } else {
          toast.error(response.data?.message || "Something went wrong!");
        }
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  const handleContactPrevious = () => {
    setActiveTab("operational");
  };
  const handleSave = async () => {
    try {
      await updateProfile(clinicDetails);
      toast.success("Profile updated successfully");
      router.push("/profile"); // or wherever
    } catch (e) {
      toast.error("Error updating profile");
    }
  };
  const handleTabClick = (key: string) => {
    if (key === activeTab) {
      return;
    }
  }; //this puts in setActiveKey={handleTabClick}

  const handleChange = (updated: Partial<clinicData>) => {
    setClinicDetails((prev) => ({
      ...prev!,
      ...updated,
    }));
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
          {/* <Editbasicdetails
            data={BasicDetails}
            onChange={(updatedBasic: Partial<clinicData>) =>
              setClinicDetails((prev) => ({
                ...prev,
                ...updatedBasic,
              }))
            }
            onNext={handleNextClick}
          /> */}
          <Editbasicdetails
            data={clinicDetails}
            onChange={handleChange}
            onNext={handleNextClick}
          />
        </div>
      )}
      {activeTab === "operational" && clinicDetails && (
        <EditOperationalHours
          data={clinicDetails.operationalHours}
          onChange={(payload: OperationalHoursPayload) =>
            setClinicDetails((prev) =>
              prev
                ? {
                    ...prev,
                    ...payload, // 👈 merge payload directly
                  }
                : prev
            )
          }
          onNext={handleoperationalNextClick}
          onPrevious={handlePrevious}
        />
      )}
      {/* {activeTab === "operational" && (
        <div>
          <EditOperationalHours
            data={operational}
            onChange={(hours: OperationalHour[]) =>
              setClinicDetails((prev) => ({
                ...prev,
                operationalHours: hours,
              }))
            }
            onNext={handleoperationalNextClick}
            onPrevious={handlePrevious}
            // onNext={handleoperationalNextClick}
            // onPrevious={handlePrevious}
          />
        </div>
      )} */}
      {/* {activeTab === "contact" && (
        <div>
          <EditContactDetails
            data={contact}
            onNext={handleSave}
            onPrevious={handleContactPrevious}
          />
        </div>
      )} */}
      {activeTab === "contact" && clinicDetails && (
        <EditContactDetails
          data={clinicDetails.contactPerson}
          onChange={handleContactChange}
          onNext={handleSave}
          onPrevious={handleContactPrevious}
        />
      )}
    </div>
  );
};
export default EditProfile;
