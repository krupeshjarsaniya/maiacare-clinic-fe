"use client";
import { StaticImageData } from "next/image";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface DoctorData {
  id?: string;
  name?: string;
  specialization?: string;
  experience?: string;
  dob?: string;
  gender?: string;
  phone?: string;
  email?: string;
  about?: string;
  fees?: string;
  services?: string[];
  qualifications?: {
    degree?: string;
    field?: string;
    university?: string;
    startYear?: string | number;
    endYear?: string | number;
  }[];
  clinic?: {
    name?: string;
    contact?: string;
    email?: string;
    map?: string;
    pin?: string;
    city?: string;
    state?: string;
    address?: string;
    MF?: string;
    SS?: string;
    Time?: string;
    Timer?: string;
    imageclinic?:string | StaticImageData;
  }[];
  kyc?: {
    pan?: string;
    panFile?:string | StaticImageData;
    aadhaar?: string;
    aadhaarFile?:string| StaticImageData;
    licenseFile?:string| StaticImageData;
    license?: string;
  }[];
  image?: string | StaticImageData;
}

interface DoctorContextType {
  doctor: DoctorData | null;
  setDoctor: React.Dispatch<React.SetStateAction<DoctorData | null>>;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const DoctorProvider = ({ children }: { children: ReactNode }) => {
  const [doctor, setDoctor] = useState<DoctorData | null>(null);

  return (
    <DoctorContext.Provider value={{ doctor, setDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => {
  const context = useContext(DoctorContext);
  if (!context) throw new Error("useDoctor must be used within DoctorProvider");
  return context;
};
