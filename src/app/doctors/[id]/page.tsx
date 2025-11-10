"use client";
import React, { useEffect } from "react";
import DoctorProfileTabs from "../../../components/DoctorProfileTabs";
import { setHeaderData } from "@/utlis/redux/slices/headerSlice";
import { AppDispatch } from "@/utlis/redux/store";
import { useDispatch } from "react-redux";
export default function page() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setHeaderData({
        title: "Dr. Riya Dharang",
        subtitle: "Doctors > Dr. Riya Dharang ",
      })
    );
  }, []);
  return (
    <div>
      <DoctorProfileTabs />
    </div>
  );
}
