"use client";
import EditDoctor from "@/components/EditDoctor";
import { setHeaderData } from "@/utlis/redux/slices/headerSlice";
import { AppDispatch } from "@/utlis/redux/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function page() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setHeaderData({
        title: "Edit Doctor",
        subtitle: "Doctors > Edit Doctor",
      })
    );
  }, []);
  return (
    <div>
      <EditDoctor />
    </div>
  );
}
