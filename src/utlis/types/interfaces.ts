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
  map(arg0: (item: any) => number): unknown;
  length: number;
  //Appointment Details

  appointmentId: string;
  type: string;
  reasonForVisit: [];
  appointmentDate: string;
  appointmentTime: string;
  forTime: string;
  additionalNote: string;

  //Patient Details
  // patientName: SelectPatientType | null;
  patientName: any;
  phone: string;
  email: string;
  patientAge: string;
  gender: string;
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
