"use client";

import { useParams } from "next/navigation";
import PatientDetailPageComponent from "../../../components/PatientDetailPage";

import { AppDispatch } from "../../../utlis/redux/store";

import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { setHeaderData } from "../../../utlis/redux/slices/headerSlice";

import { DoctorData } from "../../../utlis/StaticData";
import AddMedicalHistory from "@/components/AddMedicalHistory";

export default function PatientDetailPage() {

  return (
    <div>
      {/* Pass the data to the component */}
      <AddMedicalHistory/>
    </div>
  );
}
