"use client";

import { useEffect, useState } from "react";

export type DoctorData = {
  name: string;
  isVerified: boolean;
  specialization: string;
  experience: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  memberSince: string;
  image: string;
  fees:string;
  service:string;
  endYear:string;
  startYear:string;
  field:string;
  years:string;
  university:string;
  degree:string;
  // [key: string]?: any;
};

export function useDoctorData() {
  const [doctor, setDoctor] = useState<DoctorData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("selectedDoctor");
    if (saved) {
      try {
        setDoctor(JSON.parse(saved));
      } catch (err) {
        console.error("Error parsing doctor data", err);
      }
    }
  }, []);

  return doctor;
}
