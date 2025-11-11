import { StaticImageData } from "next/image";
import  "../StaticData";
// import StaticImageData from "../../assets/images/Simpleeditpro.png";

export interface User {
    id: string;
    name: string;
    email: string;
  }

// interfaces.ts
export interface BookAppointmentForm {
  reasonForVisit: string;
  type: string;
   id: number; // <-- ADD ID
  name: string;
  mobile: string;
  status: string;
  image: string | StaticImageData;
  time: string;
  date?: string;
  visit?: string[];
}
export interface AppointmentData {
  id: string;
  appointmentId: string;
  type: string;
  reasonForVisit: string[];
  appointmentDate: string;
  appointmentTime: string;
  forTime: string;
  additionalNote: string;
  patientName: string;
  phone: string;
  email: string;
}
export interface SelectPatientType {
  id: string;
  ProfilePhoto: StaticImageData;
  name: string;
}
  export interface Patient {
    id: number;
    name: string;
    mobile: string;
    email: string;
    pincode: string;
    treatment: string;
    status: string;
  };
