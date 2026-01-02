import {
  ConsultationStatus,
  MedicalHistoryType,
  MedicationPrescriptionType,
  Patient,
  PatientJourneyItem,
  PhysicalAssessmentData,
  SelectPatientType,
  TreatmentProgressStatusType,
} from "./types/interfaces";
import doctor1 from "@/assets/images/doctor1.png";
import doctor2 from "@/assets/images/doctor2.png";
import doctor3 from "@/assets/images/Profile-doctor.png";
import doctor4 from "@/assets/images/doctor4.jpg";
import doctor5 from "@/assets/images/doctor5.png";
import { StaticImageData } from "next/image";
import appointmentProfile from "@/assets/images/Profile-doctor.png";
import RiyaSharma from "@/assets/images/doctor2.png";
import NishaRao from "@/assets/images/Profile-doctor.png";
import AarushiPatel from "@/assets/images/doctor4.jpg";
import patient1 from "../assets/images/patient1.png";
import patient2 from "../assets/images/patient2.png";
import patient3 from "../assets/images/patient3.png";
import patient4 from "../assets/images/patient4.png";
import patient5 from "../assets/images/patient5.png";
import patient6 from "../assets/images/patient6.png";
import clinicimg from "../assets/images/cliniclogo.png";
import patient from "../assets/images/patient_com.png";
import patientprofile from "../assets/images/patient_2.png";
// export type ConsultationStatus = "Active" | "Inactive" | "On Leave";

export interface AssignedPatients {
  id: number; // <-- ADD ID
  name: string;
  mobile: string;
  email: string;
  pin: string;
  status: string;
  image: string | StaticImageData;
  treatmenttype: string[];
  date?: string;
  visit?: string;
}

export type Doctor = {
  id: string | number;
  name: string;
  image: string | StaticImageData;
  slots: string[];
};
export type DoctorEntry = {
  id: number;
  name: string;
  email: string;
  mobile: string;
  image: string | StaticImageData; // ✅ handles both local and URL images
  date: string;
  specialisation: string;
  pin: string;
  status: ConsultationStatus;
  verified?: boolean;
};
export const DoctorData: DoctorEntry[] = [
  {
    id: 1,
    name: "Dr. Ashok Kumar",
    mobile: "9092038491",
    email: "ashok.kumar@gmail.com",
    pin: "400077",
    status: "Active",
    image: doctor1,
    date: "23, Mar 2023",
    specialisation: "Fertility Specialist",
    verified: true,
  },
  {
    id: 2,
    name: "Dr. Harpreet Bedi",
    mobile: "9092038491",
    email: "harpreetbedi@gmail.com",
    pin: "400077",
    status: "Active",
    image: doctor2,
    date: "09, Apr 2023",
    verified: true,
    specialisation: "Fertility Specialist",
  },
  {
    id: 3,
    name: "Dr. Sonia Advani",
    mobile: "9092038491",
    email: "soniaadvani2@gmail.com",
    pin: "400077",
    status: "On Leave",
    image: doctor3,
    date: "12, May 2023",
    verified: true,
    specialisation: "Fertility Specialist",
  },
  {
    id: 4,
    name: "Dr. Meena Neema",
    mobile: "9092038491",
    verified: true,
    email: "neemameen@gmail.com",
    pin: "400077",
    status: "Inactive",
    image: doctor4,
    date: "03, June 2023",
    specialisation: "Gynoecologist",
  },
  {
    id: 5,
    name: "Dr. Shantanu Patil",
    mobile: "9092038491",
    email: "shantanupatil@gmail.com",
    pin: "400077",
    status: "Active",
    image: doctor5,
    date: "25, July 2023",
    verified: true,
    specialisation: "Embryologist",
  },
  {
    id: 6,
    name: "Ashok Kumar",
    mobile: "9092038491",
    email: "ashok.kumar@gmail.com",
    pin: "400077",
    status: "Active",
    image: doctor1,
    date: "23, Mar 2023",
    verified: true,
    specialisation: "Fertility Specialist",
  },
  {
    id: 7,
    name: "Ashok Kumar",
    mobile: "9092038491",
    email: "ashok.kumar@gmail.com",
    pin: "400077",
    status: "Active",
    image: doctor1,
    date: "23, Mar 2023",
    verified: true,
    specialisation: "Fertility Specialist",
  },
  {
    id: 8,
    name: "Ashok Kumar",
    mobile: "9092038491",
    email: "ashok.kumar@gmail.com",
    pin: "400077",
    status: "Active",
    image: doctor1,
    date: "23, Mar 2023",
    verified: true,
    specialisation: "Fertility Specialist",
  },
  {
    id: 9,
    name: "Ashok Kumar",
    mobile: "9092038491",
    email: "ashok.kumar@gmail.com",
    pin: "400077",
    status: "Active",
    image: doctor1,
    date: "23, Mar 2023",
    verified: true,
    specialisation: "Fertility Specialist",
  },
  {
    id: 10,
    name: "Ashok Kumar",
    mobile: "9092038491",
    email: "ashok.kumar@gmail.com",
    verified: true,
    pin: "400077",
    status: "Active",
    image: doctor1,
    date: "23, Mar 2023",
    specialisation: "Fertility Specialist",
  },
];

// export const AssignedPatients: AssignedPatients[] = [
//   {
//     id: 1,
//     name: "Anicka Jain",
//     mobile: "9092038491",
//     email: "ranidesai@protonmail.com",
//     pin: "400077",
//     status: "Active",
//     image: patient1,
//     date: "2025-09-16",
//     treatmenttype: ["IVF", "Egg Freezing"],
//     visit: "2nd Feb 2025",
//   },
//   {
//     id: 2,
//     name: "Radhika More",
//     mobile: "9092038491",
//     email: "ninagupta@protonmail.com",
//     pin: "400077",
//     status: "Paused",
//     image: patient2,
//     treatmenttype: ["IVF", "Egg Freezing"],
//     date: "2025-09-15",
//     visit: "2nd Feb 2025",
//   },
//   {
//     id: 3,
//     name: "Seema Gupta",
//     mobile: "9092038491",
//     email: "himariroy@protonmail.com",
//     pin: "400077",
//     status: "Active",
//     image: patient3,
//     treatmenttype: ["IVF", "Egg Freezing"],
//     date: "2025-09-15",
//     visit: "2nd Feb 2025",
//   },
//   {
//     id: 4,
//     name: "Nisha Dandge",
//     mobile: "9092038491",
//     email: "anjalishinde@protonmail.com",
//     pin: "400077",
//     status: "Paused",
//     image: patient4,
//     treatmenttype: ["IVF", "Egg Freezing"],
//     date: "2025-09-25",
//     visit: "2nd Feb 2025",
//   },
//   {
//     id: 5,
//     name: "Himika Bose",
//     mobile: "9092038491",
//     email: "anjalishinde@protonmail.com",
//     pin: "400077",
//     status: "Active",
//     image: patient5,
//     treatmenttype: ["IVF", "Egg Freezing"],
//     date: "2025-10-15",
//     visit: "2nd Feb 2025",
//   },
//   {
//     id: 6,
//     name: "Sakshi Sinha",
//     mobile: "9092038491",
//     email: "anjalishinde@protonmail.com",
//     pin: "400077",
//     status: "Paused",
//     image: patient1,
//     treatmenttype: ["IVF", "Egg Freezing"],
//     date: "2025-10-15",
//     visit: "2nd Feb 2025",
//   },
//   {
//     id: 7,
//     name: "Hardik  Mehta",
//     mobile: "9092038491",
//     email: "anjalishinde@protonmail.com",
//     pin: "400077",
//     status: "Active",
//     image: patient6,
//     treatmenttype: ["Sperm Freezing"],
//     date: "2025-10-15",
//     visit: "2nd Feb 2025",
//   },
//   {
//     id: 8,
//     name: "Anicka Jain",
//     mobile: "9092038491",
//     email: "anjalishinde@protonmail.com",
//     pin: "400077",
//     status: "Active",
//     image: patient1,
//     treatmenttype: ["IVF", "Egg Freezing"],
//     date: "2025-10-15",
//     visit: "2nd Feb 2025",
//   },
//   {
//     id: 9,
//     name: "Anicka Jain",
//     mobile: "9092038491",
//     email: "anjalishinde@protonmail.com",
//     pin: "400077",
//     status: "Active",
//     image: patient1,
//     treatmenttype: ["IVF", "Egg Freezing"],
//     date: "2025-10-15",
//     visit: "2nd Feb 2025",
//   },
//   {
//     id: 10,
//     name: "Anicka Jain",
//     mobile: "9092038491",
//     email: "anjalishinde@protonmail.com",
//     pin: "400077",
//     status: "Active",
//     image: patient1,
//     treatmenttype: ["IVF", "Egg Freezing"],
//     date: "2025-10-15",
//     visit: "2nd Feb 2025",
//   },
// ];

export interface appointement {
  id: number; // <-- ADD ID
  name: string;
  mobile: string;
  status: string;
  image: string | StaticImageData;
  time: string;
  date?: string;
  visit?: string[];
  type?: string;
  additionalNote?: string;
  for?: string;
  age?: string;
  email?: string;
}
export const appointement: appointement[] = [
  {
    id: 1,
    name: "Anicka Jain",
    mobile: "9092038491",

    status: "Confirmed",
    image: patient1,
    visit: ["IUI", "IVF", "Fertility Support"],
    time: "2:30 PM",
    date: "2nd Feb 2025",
  },
  {
    id: 2,
    name: "Radhika More",
    mobile: "9092038491",

    status: "Confirmed",
    image: patient2,
    time: "2:30 PM",
    visit: ["IUI", "IVF", "Fertility Support"],

    date: "2nd Feb 2025",
  },
  {
    id: 3,
    name: "Seema Gupta",
    mobile: "9092038491",

    status: "Completed",
    image: patient3,
    time: "2:30 PM",
    visit: ["Fertility Support"],

    date: "2nd Feb 2025",
  },
  {
    id: 4,
    name: "Nisha Dandge",
    mobile: "9092038491",

    status: "Rejected",
    image: patient4,
    time: "2:30 PM",
    visit: ["IUI", "IVF", "Fertility Support"],

    date: "2nd Feb 2025",
  },
  {
    id: 5,
    name: "Himika Bose",
    mobile: "9092038491",
    visit: ["IUI"],

    status: "No Show",
    image: patient5,
    time: "2:30 PM",

    date: "2nd Feb 2025",
  },
  {
    id: 6,
    name: "Sakshi Sinha",
    mobile: "9092038491",

    status: "Upcomming",
    image: patient1,
    time: "2:30 PM",
    visit: ["Egg Freezing ", "IVF", "Fertility Support"],

    date: "2nd Feb 2025",
  },
  {
    id: 7,
    name: "Hardik  Mehta",
    mobile: "9092038491",
    visit: ["Sperm Freezing", "IVF"],

    status: "Cancelled",
    image: patient6,
    time: "2:30 PM",

    date: "2nd Feb 2025",
  },
  {
    id: 8,
    name: "Anicka Jain",
    mobile: "9092038491",
    visit: ["Egg Freezing ", "IVF", "Fertility Support"],

    status: "Rescheduled",
    image: patient1,
    time: "2:30 PM",

    date: "2nd Feb 2025",
  },
  {
    id: 9,
    name: "Anicka Jain",
    mobile: "9092038491",
    visit: ["IUI", "IVF", "Fertility Support"],

    status: "Engaged",
    image: patient1,
    time: "2:30 PM",

    date: "2nd Feb 2025",
  },
  {
    id: 10,
    name: "Anicka Jain",
    mobile: "9092038491",
    visit: ["Fertility Support", "IUI", "IVF"],

    status: "Rescheduled",
    image: patient1,
    time: "2:30 PM",

    date: "2nd Feb 2025",
  },
];
export const PatientsDetails: SelectPatientType[] = [
  { id: "1", ProfilePhoto: patient1, name: "Nisha S" },
  { id: "2", ProfilePhoto: patient2, name: "Kavita Sharma" },
  { id: "3", ProfilePhoto: patient3, name: "Anjali Rao" },
  { id: "4", ProfilePhoto: patient4, name: "Priya Desai" },
];

// src/utlis/StaticData.ts
// src/utlis/StaticClinicData.ts

export const clinicProfileData = {
  id: 1,
  name: "Sunshine Fertility Center",
  mapLink: "https://maps.google.com/?q=Sunshine+Fertility+Center",
  city: "Mumbai",
  state: "Maharashtra",
  numberOfBeds: "25",
  doctorsOnboard: "12",
  pincode: "400001",
  address: "123 Palm Street, Andheri West, Mumbai",
  contact: "+91 9876543210",
  secondaryNumber: "+91 9988776655",
  email: "info@sunshinefertility.com",
  image: clinicimg,
  services: ["IVF", "IUI", "Laparoscopy"],
};

export const clinicConatctData = {
  name: "Priya Shah",
  contact: "+91 1234567890",
  email: "priyashah@gmail.com",
  adhaar: "345974684586",
};

// invoice component
export interface invoice {
  // status: string;
  id: number;
  Invoice: string;
  Doctor: string;
  PatientName: string;
  Amount: string;
  Date: string;
  image: string | StaticImageData;
  Service: string;
}
export const invoice: invoice[] = [
  {
    id: 1,
    Invoice: "12345678",
    Doctor: "Rani Desai",
    PatientName: "Rani Desai",
    image: patient1,
    Amount: "₹120",
    Date: "8 Jul, 2024",
    Service: "IVF Treatment",
  },
  {
    id: 2,
    Invoice: "12345678",
    Doctor: "Rani Desai",
    PatientName: "Rani Desai",
    image: patient1,
    Amount: "₹120",
    Date: "8 Jul, 2024",
    Service: "IVF Treatment",
  },
  {
    id: 3,
    Invoice: "12345678",
    Doctor: "Rani Desai",
    PatientName: "Rani Desai",
    image: patient1,
    Amount: "₹120",
    Date: "8 Jul, 2024",
    Service: "IVF Treatment",
  },
  {
    id: 4,
    Invoice: "12345678",
    Doctor: "Rani Desai",
    PatientName: "Rani Desai",
    image: patient1,
    Amount: "₹120",
    Date: "8 Jul, 2024",
    Service: "IVF Treatment",
  },
  {
    id: 5,
    Invoice: "12345678",
    Doctor: "Rani Desai",
    PatientName: "Rani Desai",
    Amount: "₹120",
    image: patient1,
    Date: "8 Jul, 2024",
    Service: "IVF Treatment",
  },
  {
    id: 6,
    Invoice: "12345678",
    Doctor: "Rani Desai",
    PatientName: "Rani Desai",
    image: patient1,
    Amount: "₹120",
    Date: "8 Jul, 2024",
    Service: "IVF Treatment",
  },
  {
    id: 7,
    Invoice: "12345678",
    Doctor: "Rani Desai",
    PatientName: "Rani Desai",
    image: patient1,
    Amount: "₹120",
    Date: "8 Jul, 2024",
    Service: "IVF Treatment",
  },
  {
    id: 8,
    Invoice: "12345678",
    Doctor: "Rani Desai",
    PatientName: "Rani Desai",
    image: patient1,
    Amount: "₹120",
    Date: "8 Jul, 2024",
    Service: "IVF Treatment",
  },
  {
    id: 9,
    Invoice: "12345678",
    Doctor: "Rani Desai",
    PatientName: "Rani Desai",
    image: patient1,
    Amount: "₹120",
    Date: "8 Jul, 2024",
    Service: "IVF Treatment",
  },
  {
    id: 10,
    Invoice: "12345678",
    Doctor: "Rani Desai",
    PatientName: "Rani Desai",
    image: patient1,
    Amount: "₹120",
    Date: "8 Jul, 2024",
    Service: "IVF Treatment",
  },
];

// patient consultation data

export interface ConsultationEntry {
  _id?: number;
  id?: number; // <-- ADD ID
  name: string;
  mobile: string;
  treatment: string;
  pin: string;
  status: string;
  image: string | StaticImageData;
  date?: string; // ✅ optional date field
}

export const consultationData: ConsultationEntry[] = [
  {
    _id: 1,
    name: "Rani Desai",
    mobile: "9092038491",
    treatment: "Fertility Support +2",
    pin: "400077",
    status: "Active",
    image: patient,
    date: "2025-09-15",
    id: 0,
  },
  {
    _id: 2,
    name: "Nina Gupta",
    mobile: "9092038491",
    treatment: "IVF",
    pin: "400077",
    status: "Deactivated",
    image: patient,
    date: "2025-11-07",
  },
  {
    _id: 3,
    name: "Himari Roy",
    mobile: "9092038491",
    treatment: "Egg Freezing",
    pin: "400077",
    status: "Discontinued",
    image: patient,
    date: "2025-09-15",
  },
  {
    _id: 4,
    name: "Anjali Shinde",
    mobile: "9092038491",
    treatment: "IVF",
    pin: "400077",
    status: "Active",
    image: patient,
    date: "2025-09-15",
  },
  {
    _id: 5,
    name: "Anjali Shinde",
    mobile: "9092038491",
    treatment: "Fertility Support +2",
    pin: "400077",
    status: "Deactivated",
    image: patient,
    date: "2025-11-08",
  },
  {
    _id: 6,
    name: "Aastha Patil",
    mobile: "9092038491",
    treatment: "IVF",
    pin: "400077",
    status: "Active",
    image: patient,
    date: "2025-09-15",
  },
  // {
  //   id: 7,
  //   name: "Anjali Shinde",
  //   mobile: "9092038491",
  //   treatment: "Fertility Support +2",
  //   pin: "400077",
  //   status: "Deactivated",
  //   image: patient,
  //   date: "2025-09-15",
  // },
  // {
  //   id: 8,
  //   name: "Rani Desai",
  //   mobile: "9092038491",
  //   treatment: "Egg Freezing",
  //   pin: "400077",
  //   status: "Active",
  //   image: patient,
  //   date: "2025-09-15",
  // },
  // {
  //   id: 9,
  //   name: "Anjali Shinde",
  //   mobile: "9092038491",
  //   treatment: "Fertility Support +2",
  //   pin: "400077",
  //   status: "Deactivated",
  //   image: patient,
  //   date: "2025-09-15",
  // },
  // {
  //   id: 10,
  //   name: "Rani Desai",
  //   mobile: "9092038491",
  //   treatment: "Egg Freezing",
  //   pin: "400077",
  //   status: "Active",
  //   image: patient,
  //   date: "2025-10-15",
  // },
];

import { ColumnDef } from "@tanstack/react-table";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
// import { Patient, SelectPatientType } from "./types/interfaces";

export type LeaveEntry = {
  notifyClinic: boolean;
  id: string;
  reason: string;
  startDate: string;
  endDate: string;
  days: string;
  status?: string;
  note?: string;
  doctorId?: string;
  leaveId?: string;
};

export interface PartnerDetailData {
  profile: {
    basic_detail_name: string;
    basic_detail_gender: string;
    basic_detail_age: string;
    basic_detail_phone: string;
    basic_detail_email: string;
    profileImage?: string;
  };

  medicalHistory: MedicalHistoryType;

  PhysicalAssessmentData: {
    patientId: string;
    date: string;
    height: string;
    weight: string;
    bmi: string;
    bloodGroup: string;
    bloodPressureSystolic: string;
    bloodPressureDiastolic: string;
    heartRate: string;
  }[];

  fertilityAssessment: {
    semenAnalysis: string;
    semenAnalysisContent: string;
    fertilityIssues: string;
    fertilityIssuesContent: string;
    fertilityTreatment: string;
    fertilityTreatmentContent: string;
    surgeries: string;
    surgeriesContent: string;
  };
}

// export const leaveData: LeaveEntry[] = [
//   {
//     id: "01",
//     reason: "Holi",
//     startDate: "12/08/25",
//     endDate: "12/08/25",
//     days: "1 Day",
//   },
//   {
//     id: "02",
//     reason: "Sick leave",
//     startDate: "12/08/25",
//     endDate: "12/08/25",
//     days: "3 Days",
//   },
//   {
//     id: "03",
//     reason: "Vacation",
//     startDate: "12/08/25",
//     endDate: "12/08/25",
//     days: "15 Days",
//   },
//   {
//     id: "04",
//     reason: "Family Thing",
//     startDate: "12/08/25",
//     endDate: "12/08/25",
//     days: "1 Day",
//   },
//   {
//     id: "05",
//     reason: "Sick leave",
//     startDate: "12/08/25",
//     endDate: "12/08/25",
//     days: "2 Days",
//   },
//   {
//     id: "06",
//     reason: "Casual leave",
//     startDate: "12/08/25",
//     endDate: "12/08/25",
//     days: "1 Day",
//   },
//   {
//     id: "07",
//     reason: "Family thing",
//     startDate: "12/08/25",
//     endDate: "12/08/25",
//     days: "2 Days",
//   },
//   {
//     id: "08",
//     reason: "Casual leave",
//     startDate: "12/08/25",
//     endDate: "12/08/25",
//     days: "1 Day",
//   },
// ];

export const leaveColumns: ColumnDef<LeaveEntry>[] = [
  {
    header: "#",
    accessorKey: "id",
  },
  {
    header: "Leave Type",
    accessorKey: "reason",
  },
  {
    header: "Start Date",
    accessorKey: "startDate",
  },
  {
    header: "End Date",
    accessorKey: "endDate",
  },
  {
    header: "No. of days",
    accessorKey: "days",
  },
  // {
  //   header: 'Action',
  //   cell: () => (
  //     <div className="d-flex gap-2">
  //       <button className="btn btn-sm profile-card-boeder ">
  //         <Image src={LightEditimg} alt="Specialization" width={18} height={20} />
  //       </button>

  //       <button className="btn btn-sm profile-card-boeder">
  //         <Image src={Trash} alt="Specialization" width={18} height={20} />
  //       </button>
  //     </div>
  //   ),
  // },
];

// export const tableResponse: Patient[] = [
//   {
//     id: 1,
//     name: "Meera Joshi",
//     mobile: "9092038491",
//     email: "----",
//     pincode: "400072",
//     treatment: "Fertility Support +2",
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Anjali Kapoor",
//     mobile: "9092038491",
//     email: "ashok.kumar@gmail.com",
//     pincode: "400072",
//     treatment: "IVF",
//     status: "Deactivated",
//   },
//   // ...add more rows
// ];
// patient report

export const patientReport = [
  {
    reportName: "Ultrasound Report",
    name: "Ultrasound_Ana.pdf",
    size: "60 KB",
    uploadedAt: 1739251200000,
  },
  {
    reportName: "Ultrasound Report",
    name: "Xray.jpg",
    size: "60 KB",
    uploadedAt: 1739251200000,
  },
  {
    reportName: "Sonography",
    name: "Sonography.jpg",
    size: "60 KB",
    progress: 100,
    status: "completed",
    uploadedAt: 1739251200000,
  },
  {
    reportName: "Sonography Report",
    name: "Sonography_Re.pdf",
    size: "60 KB",
    progress: 100,
    status: "completed",
    uploadedAt: 1739251200000,
  },
  {
    reportName: "Xray",
    name: "Xray.jpg",
    size: "60 KB",
    progress: 100,
    status: "completed",
    uploadedAt: 1739251200000,
  },
  {
    reportName: "Xray Report",
    name: "Xray_Ana.pdf",
    size: "60 KB",
    progress: 100,
    status: "completed",
    uploadedAt: 1739251200000,
  },
  {
    reportName: "Blood Test",
    name: "Blood_T.pdf",
    size: "60 KB",
    progress: 100,
    status: "completed",
    uploadedAt: 1739251200000,
  },
];
export const journeyData: PatientJourneyItem[] = [
  {
    id: "1",
    title: "Online Consultation",
    date: "on 09 Jul 2024",
    time: "12:11 PM",
    status: "Success",
  },
  {
    id: "2",
    title: "Appointment Booked",
    date: "on 09 Jul 2024",
    time: "12:11 PM",
    status: "Success",
  },
  {
    id: "3",
    title: "Clinic Visits",
    date: "on 09 Jul 2024",
    time: "12:11 PM",
    status: "In Progress",
  },
  {
    id: "4",
    title: "Treatment Started",
    date: "on 09 Jul 2024",
    time: "10:30 AM",
    status: "Pending",
  },
  {
    id: "5",
    title: "Pregnancy Confirmed",
    date: "on 09 Jul 2024",
    time: "12:11 PM",
    status: "Pending",
  },
];
export const MedicalHistoryData = {
  id_medical_history: 1,
  medical_medications: "true",
  medical_surgeries: "false",
  medical_medical_condition: [
    "PCOS",
    "Thyroid Disorder",
    "Peanut Allergy",
    "Lactose Intolerant",
  ],
  medical_family_medical_history: [
    "Mother had endometriosis",
    "Father had thyroid",
  ],
  medical_lifestyle: ["Non-smoker", "Occasional alcohol", "Vegetarian diet"],
  medical_exercise: "never",
  medical_stress_level: "low",
};
export const physicalAssessmentData: PhysicalAssessmentData[] = [
  {
    id: "123",
    date: "Wed, 19 Feb 2024",
    height: "string",
    weight: "string",
    bmi: "string",
    bloodGroup: "string",
    systolic: "string;",
    diastolic: "string;",
    heartRate: "string;",
  },
  {
    id: "123",
    date: "Wed, 19 Feb 2024",
    height: "string",
    weight: "string",
    bmi: "string",
    bloodGroup: "string",
    systolic: "string;",
    diastolic: "string;",
    heartRate: "string;",
  },
];
export const patientTreatmentData = [
  {
    title: "IVF Cycle 1",
    status: "Ongoing",
    startDate: "7 Feb 2025",
    endDate: "1:30 PM",
    fees: "₹12000",
    amountStatus: "Half Paid",
  },
  {
    title: "IVF Cycle 2",
    status: "Ongoing",
    startDate: "7 Feb 2025",
    endDate: "1:30 PM",
    fees: "₹12000",
    amountStatus: "Half Paid",
  },
  {
    title: "IUI",
    status: "Completed",
    startDate: "7 Feb 2025",
    endDate: "1:30 PM",
    fees: "₹12000",
    amountStatus: "Paid",
  },
  {
    title: "Egg Freezing",
    status: "Completed",
    startDate: "7 Feb 2025",
    endDate: "1:30 PM",
    fees: "₹12000",
    amountStatus: "Paid",
  },
];

export const TempTreatmentSteps = [
  {
    id: 1,
    step: " Fertility Assessment",
  },
  {
    id: 2,
    step: " Ovarain Stimulation",
  },
  {
    id: 3,
    step: "Monitoring",
  },
  {
    id: 4,
    step: "Follow up (HCG trigger shot)",
  },
  {
    id: 5,
    step: "Egg Retrieval",
  },
  {
    id: 6,
    step: "Sperm Collection",
  },
  {
    id: 7,
    step: "Fertilisation",
  },
  {
    id: 8,
    step: "Embryo Culture",
  },
  {
    id: 9,
    step: "Embryo Transfer",
  },
  {
    id: 10,
    step: "Pregnancy Test",
  },
];
export interface PatientPaymentData {
  transactionId: string;
  serviceType: string;
  date: string;
  time: string;
  paymentMode: string;
  amount: string;
  status: "Refunded" | "Pending" | "Paid";
  actions: string;
}
export const PaymentHistoryData: PatientPaymentData[] = [
  {
    transactionId: "TXN1234567890",
    serviceType: "Treatment",
    date: "11 Feb 2025",
    time: "3 PM",
    paymentMode: "UPI",
    amount: "₹1,200",
    status: "Pending",
    actions: "View",
  },
  {
    transactionId: "TXN1234567891",
    serviceType: "Treatment",
    date: "11 Feb 2025",
    time: "3 PM",
    paymentMode: "UPI",
    amount: "₹1,200",
    status: "Paid",
    actions: "View",
  },
  {
    transactionId: "TXN1234567892",
    serviceType: "Lab Test",
    date: "11 Feb 2025",
    time: "3 PM",
    paymentMode: "UPI",
    amount: "₹1,200",
    status: "Paid",
    actions: "View",
  },
  {
    transactionId: "TXN1234567893",
    serviceType: "Consultation",
    date: "11 Feb 2025",
    time: "3 PM",
    paymentMode: "UPI",
    amount: "₹1,200",
    status: "Refunded",
    actions: "View",
  },
];
export const partnerDetailData = {
  profile: {
    basic_detail_name: "Raj Desai",
    basic_detail_gender: "Male",
    basic_detail_age: "31",
    basic_detail_phone: "12345 67890",
    basic_detail_email: "riyadharang@miacare.com",
  },
  medicalHistory: {
    medication: "yes",
    medicationcontent: "This is Medical Condition",
    surgeriesContent: "This is Medical Condition",
    currentMedication: "CureAll 5000, HealMax Plus",
    surgeries: "no",
    MedicalconditionAllergies: [
      { value: "PCOS", label: "PCOS" },
      { value: "Thyroid Disorder", label: "Thyroid Disorder" },
      { value: "Peanut Allergy", label: "Peanut Allergy" },
      { value: "Lactose Intolerant", label: "Lactose Intolerant" },
    ],
    familyMedicalHistory: "Mother had endometriosis",
    lifestyle: [
      { label: "Non-smoker", value: "Non-smoker" },
      { label: "Occasional alcohol", value: "Occasional alcohol" },
      { label: "Vegetarian diet", value: "Vegetarian diet" },
    ],
    exercise: "rarely",
    stress: "high",
  },
  PhysicalAssessmentData: [
    // {
    //   date: "Wed, 19 Feb 2024",
    //   height: "5'4'",
    //   weight: "58",
    //   bmi: "22.1",
    //   bloodGroup: "O+",
    //   systolic: "120",
    //   diastolic: "80",
    //   heartRate: "72",
    // },
    // {
    //   date: "Mon, 22 Feb 2024",
    //   height: "5'4'",
    //   weight: "58",
    //   bmi: "22.1",
    //   bloodGroup: "O+",
    //   systolic: "120",
    //   diastolic: "80",
    //   heartRate: "72",
    // },
  ],
  fertilityAssessment: {
    semenAnalysis: "Yes | Healthy Semen",
    semenAnalysisContent: "This Is Seema Analys Content",
    fertilityIssues: "No",
    fertilityIssuesContent: "This is Fertility Issue Content",
    fertilityTreatment: "No",
    fertilityTreatmentContent: "This Is fertilityTreatmentContent Contet",
    surgeries: "No",
    surgeriesContent: "This Is surgeriesContent Content",
  },
};
export const AppointmentData = [
  {
    id: 1,
    reason: "Ultrasound scan",
    date: "11 Feb 2025",
    time: "3 PM",
    payment: "Pending",
    status: "Upcoming",
    prescription: "N/A",
    invoice: "N/A",
    actions: "View",
  },
  {
    id: 2,
    reason: "Blood Test Review",
    date: "11 Feb 2025",
    time: "3 PM",
    payment: "Done",
    status: "Completed",
    prescription: "file",
    invoice: "file",
    actions: "View",
  },
  {
    id: 3,
    reason: "Physical Check-up",
    date: "11 Feb 2025",
    time: "3 PM",
    payment: "Done",
    status: "Completed",
    prescription: "viewfile",
    invoice: "viewfile",
    actions: "View",
  },
  {
    id: 4,
    reason: "Initial Consultation",
    date: "11 Feb 2025",
    time: "3 PM",
    payment: "Done",
    status: "Completed",
    prescription: "viewfile",
    invoice: "viewfile",
    actions: "View",
  },
];

export const tempAppointmentProfileData = {
  profilePhoto: appointmentProfile,
  name: "Dr. Riya Dharang",
  id: 1,
  gender: "Female",

  date: "15 Jun 2025",
  time: "3:15 PM",
  FertilityAssessment: "Fertility assessment",
  patientName: "Radhika More",
  patientId: "PTS-874562",
  patientProfile: patientprofile,
  patientyear: "31 Years",
};

export interface tempAppointmentProfileData {
  appointment_id: string;
  patient_profile: string | StaticImport;
  patient_name: string;
  patient_status: string;
  patient_contactnumber: string;
  patient_email: string;
  patient_appointment_date: string;
  patient_appointment_time: string;
  patient_treatment: string[];
  patient_payment: string;
  patient_additional_commet: string;
  patient_time: string;
}

export interface AppointmentsType {
  id: string;
  status: string | number; // <-- FIX HERE
  doctor: {
    _id: string;
    name: string;
  };
  patient: {
    _id: string;
    name: string;
    profileImage: StaticImageData;
    contactNumber: string;
  };
  appointmentDate: string;
  appointmentTime: string;
  reason: string[];
  title: string;
  date: string;
  time: string;
}

export const doctorlistingModalData: tempAppointmentProfileData[] = [
  {
    appointment_id: "1",
    patient_profile: RiyaSharma,
    patient_name: "Priya Gupta",
    patient_status: "Follow Up",
    patient_contactnumber: "12345 67890",
    patient_email: "riya@gmail.com",
    patient_appointment_date: "12 May 2024",
    patient_appointment_time: "10:00 AM - 10:30 AM",
    patient_treatment: ["Fertility Support", "IVF", "IUI"],
    patient_payment: "Unpaid",
    patient_additional_commet:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    patient_time: "11:00 AM",
  },
  {
    appointment_id: "2",
    patient_profile: AarushiPatel,
    patient_name: "Aarushi Patel",
    patient_status: "Follow Up",
    patient_contactnumber: "09876 54321",
    patient_email: "aarushi@gmail.com",
    patient_appointment_date: "15 April 2024",
    patient_appointment_time: "12:00 AM - 12:30 AM",
    patient_treatment: ["Fertility Support", "IVF", "IUI"],
    patient_payment: "Unpaid",
    patient_additional_commet:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    patient_time: "12:00 AM",
  },
  {
    appointment_id: "3",
    patient_profile: NishaRao,
    patient_name: "Nisha Rao",
    patient_status: "Follow Up",
    patient_contactnumber: "98562 98758",
    patient_email: "nisha@gmail.com",
    patient_appointment_date: "20 January 2024",
    patient_appointment_time: "01:00 AM - 01:30 AM",
    patient_treatment: ["Fertility Support", "IVF", "IUI"],
    patient_payment: "Unpaid",
    patient_additional_commet:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    patient_time: "1:00 PM",
  },
  {
    appointment_id: "4",
    patient_profile: RiyaSharma,
    patient_name: "Riya Sharma",
    patient_status: "Follow Up",
    patient_contactnumber: "78545 69855",
    patient_email: "priya@gmail.com",
    patient_appointment_date: "28 February 2024",
    patient_appointment_time: "02:00 AM - 02:30 AM",
    patient_treatment: ["Fertility Support", "IVF", "IUI"],
    patient_payment: "Unpaid",
    patient_additional_commet:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    patient_time: "2:00 PM",
  },
];
export const Appointments = [
  {
    id: "1",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma",
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah 1",
      profileImage: RiyaSharma,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:00",
    reason: ["reason  to appointment"],
    title: "smriti shah - reason  to appointment1",
    date: "11 Nov 2025",
    time: "9:01",
  },
  {
    id: "2",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma",
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah 2",
      profileImage: RiyaSharma,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:15",
    reason: ["reason  to appointment"],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "9:02",
  },
  {
    id: "3",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma",
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah 3",
      profileImage: RiyaSharma,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:00",
    reason: ["reason  to appointment"],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "9:10",
  },
  {
    id: "3",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma",
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah 4",
      profileImage: RiyaSharma,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:00",
    reason: ["reason  to appointment"],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "9:15",
  },
  {
    id: "3",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma",
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah 5",
      profileImage: RiyaSharma,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:00",
    reason: ["reason  to appointment"],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "9:17",
  },
  {
    id: "4",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma",
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah 6",
      profileImage: RiyaSharma,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:15",
    reason: ["reason  to appointment"],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "9:17",
  },
  {
    id: "3",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma",
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah",
      profileImage: RiyaSharma,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:00",
    reason: ["reason  to appointment"],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "9:30",
  },

  {
    id: "5",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma",
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah",
      profileImage: RiyaSharma,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:15",
    reason: ["reason  to appointment"],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "9:40",
  },
  {
    id: "6",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma",
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah",
      profileImage: RiyaSharma,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:20",
    reason: [
      "Fertility Support",
      "Egg Freezing",
      "IVF",
      "IUI",
      "Fertility Support 2",
      "other",
    ],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "10:07",
  },
  {
    id: "7",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma",
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah",
      profileImage: RiyaSharma,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:30",
    reason: [
      "Fertility Support",
      "Egg Freezing",
      "IVF",
      "IUI",
      "Fertility Support 2",
      "other",
    ],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "11:30",
  },
  {
    id: "8",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma",
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah",
      profileImage: RiyaSharma,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "11:15",
    reason: ["reason  to appointment"],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "6:15",
  },
  {
    id: "9",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma",
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah",
      profileImage: RiyaSharma,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "1:30",
    reason: ["reason  to appointment"],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "1:30",
  },
];
export interface InventoryEntry {
  id: number; // <-- ADD ID
  name: string;
  mobile: string;
  treatment: string;
  Date: string;
  Time: string;
  status: string;
  image: string | StaticImageData;
  date?: string; // ✅ optional date field
}

export const inventoryData: InventoryEntry[] = [
  {
    id: 1,
    name: "Rani Desai",
    mobile: "9092038491",
    treatment: "Fertility Support +2",
    Date: "7 Jan 2024",
    Time: "2:30 PM",
    status: "Completed",
    image: RiyaSharma,
    date: "2025-11-7",
  },
  {
    id: 2,
    name: "Nina Gupta",
    mobile: "9092038491",
    treatment: "Egg Freezing +1",
    Date: "7 Jan 2024",
    Time: "2:30 PM",
    status: "Pending",
    image: AarushiPatel,
    date: "2025-09-15",
  },
  {
    id: 3,
    name: "Himari Roy",
    mobile: "9092038491",
    treatment: "Egg Freezing +1",
    Date: "7 Jan 2024",
    Time: "2:30 PM",
    status: "",
    image: NishaRao,
    date: "2025-09-15",
  },
  {
    id: 4,
    name: "Anjali Shinde",
    mobile: "9092038491",
    treatment: "IVF",
    Date: "7 Jan 2024",
    Time: "2:30 PM",
    status: "No Response",
    image: RiyaSharma,
    date: "2025-11-8",
  },
  {
    id: 5,
    name: "Anjali Shinde",
    mobile: "9092038491",
    treatment: "Fertility Support +2",
    Date: "7 Jan 2024",
    Time: "2:30 PM",
    status: "Cancelled",
    image: AarushiPatel,
    date: "2025-10-15",
  },

  {
    id: 6,
    name: "Aastha Patil",
    mobile: "9092038491",
    treatment: "Egg Freezing +1",
    Date: "7 Jan 2024",
    Time: "2:30 PM",
    status: "Scheduled",
    image: NishaRao,
    date: "2025-09-15",
  },
  {
    id: 7,
    name: "Nina Gupta",
    mobile: "9092038491",
    treatment: "IVF",
    Date: "7 Jan 2024",
    Time: "2:30 PM",
    status: "No Response",
    image: RiyaSharma,
    date: "2025-09-25",
  },
  {
    id: 8,
    name: "Anjali Shinde",
    mobile: "9092038491",
    treatment: "Fertility Support +2",
    Date: "7 Jan 2024",
    Time: "2:30 PM",
    status: "Cancelled",
    image: RiyaSharma,
    date: "2025-10-15",
  },
];
export interface TreatmentPlanEntry {
  id: number;
  treatmentPlan: string;
  step: string;
  date: string;
  patientName: string;
  partnerName: string;
  status: string;
  image: string | StaticImageData;
}

export const treatmentPlanData: TreatmentPlanEntry[] = [
  {
    id: 1,
    treatmentPlan: "IVF",
    step: "Fertility Assessment",
    date: "7 Jan 2024",
    patientName: "Meera Joshi",
    partnerName: "Ravi Sharma",
    status: "Success",
    image: RiyaSharma,
  },
  {
    id: 2,
    treatmentPlan: "Egg Freezing",
    step: "Ovarian Stimulation",
    date: "7 Jan 2024",
    patientName: "Ravi Sharma",
    partnerName: "Ravi Sharma",
    status: "Pending",
    image: AarushiPatel,
  },
  {
    id: 3,
    treatmentPlan: "IUI",
    step: "Fertilisation",
    date: "7 Jan 2024",
    patientName: "Priya Singh",
    partnerName: "Rohan Singh",
    status: "Cancelled",
    image: RiyaSharma,
  },
  {
    id: 4,
    treatmentPlan: "Fertility Support",
    step: "IVF",
    date: "7 Jan 2024",
    patientName: "Lakshmi Patel",
    partnerName: "Arjun Patel",
    status: "Success",
    image: RiyaSharma,
  },
  {
    id: 5,
    treatmentPlan: "IVF",
    step: "Embryo Culture",
    date: "7 Jan 2024",
    patientName: "Arjun Patel",
    partnerName: "Arjun Patel",
    status: "Upcoming",
    image: AarushiPatel,
  },
  {
    id: 6,
    treatmentPlan: "Egg Freezing",
    step: "Embryo Transfer",
    date: "7 Jan 2024",
    patientName: "Suresh Gupta",
    partnerName: "Suresh Gupta",
    status: "Cancelled",
    image: AarushiPatel,
  },
  {
    id: 7,
    treatmentPlan: "Fertility Support",
    step: "Pregnancy Test",
    date: "7 Jan 2024",
    patientName: "Ananya Sharma",
    partnerName: "Vikram Sharma",
    status: "Pending",
    image: AarushiPatel,
  },
  {
    id: 8,
    treatmentPlan: "Fertility Support",
    step: "Fertility Assessment",
    date: "7 Jan 2024",
    patientName: "Ananya Sharma",
    partnerName: "Vikram Sharma",
    status: "Success",
    image: AarushiPatel,
  },
];
export const EditTreatmentStaticData = {
  treatmentplan: {
    selectpatient: "partner",
    treatment: "Embryo Transfer",
    duration: "6 Months",
  },
  medicalPrescription: [
    {
      id: "1",
      medicineName: "Progesterone",
      type: "Tablet",
      typeQuantity: "200 mg",
      duration: "14",
      quantity: 1,
      timeslot: ["morning"],
      meal: "After",
      intake: "test",
      description: "test description",
    },
    {
      id: "2",
      medicineName: "Follistim",
      type: "Capsule",
      typeQuantity: "50 mg",
      duration: "14",
      quantity: 1,
      timeslot: ["morning"],
      meal: "After",
      intake: "test2",
      description: "test description2",
    },
  ],
  tests: [
    { id: "1", value: "Blood Test", label: "Blood Test" },
    { id: "2", value: "Sonography", label: "Sonography" },
  ],
  followUpAction: {
    nextStep: "1 Ovarian Stimulation",
    appointmentDate: "2025-10-16",
    appointmentTime: "15:50",
    forTime: "30minutes",
    instructionsForPatient:
      "1.Report any abdominal pain, spotting, or unusual symptoms immediately",
  },
};

export const IVFProgressData = [
  {
    id: 1,
    title: "Fertility Assessment",
    date: "on 09 Jul 2024",
    time: "12:11 PM",
    Complete: "50",
    status: "Success" as const,
  },
  {
    id: 2,
    title: "Ovarian Stimulation",
    date: "on 09 Jul 2024",
    time: "12:11 PM",
    status: "In Progress" as const,
  },
  {
    id: 3,
    title: "Monitoring",
    // date: 'on 09 Jul 2024',
    // time: '12:11 PM',
    // Complete: "50",
    status: "Pending" as const,
  },
  {
    id: 4,
    title: "Follow up",
    status: "Pending" as const,
  },
  {
    id: 5,
    title: "Egg Retrieval",
    status: "Pending" as const,
  },
  {
    id: 6,
    title: "Sperm Collection",
    status: "Pending" as const,
  },
];
export const medicationPrescriptionData: MedicationPrescriptionType[] = [
  {
    id: "1",
    medicineName: "Follistim",
    type: "Capsule",
    typeQuantity: "50",
    duration: "12",
    quantity: 1,
    timeslot: ["morning", "evening"],
    meal: "Before",
    intake: "1",
    description: "This is description",
  },
  {
    id: "2",
    medicineName: "Progesterone",
    type: "Tablet",
    typeQuantity: "200",
    duration: "12",
    quantity: 1,
    timeslot: ["morning", "evening"],
    meal: "Before",
    intake: "1",
    description: "This is description",
  },
];
export const StatusAndUpdatesData: TreatmentProgressStatusType = {
  stepName: "Fertility Assessment",
  status: "Success",
  notes: "Cycle is normal, no fertility related issue",
  updates: "", // or provide some default string value here
};

export const TreatmentPlanMonthData = [
  {
    id: "1",
    date: "28 Oct 2025",
    events: ["Semen analysis (Partner)"],
    bgColor: "starting",
  },
  {
    id: "1",
    date: "30 Oct 2025",
    events: ["Transvaginal Ultrasound"],
    bgColor: "starting",
  },
  {
    id: "1",
    date: "1 Nov 2025",
    events: ["Period start date (tentative)"],
    bgColor: "success",
  },
  {
    id: "2",
    date: "2 Nov 2025",
    events: ["Medication start"],
    bgColor: "inprogress",
  },
  {
    id: "3",
    date: "3 Nov 2025",
    events: ["Medication start"],
    bgColor: "success",
  },
  {
    id: "4",
    date: "7 Nov 2025",
    events: ["HCG injection plan"],
    bgColor: "pending",
  },
  {
    id: "5",
    date: "8 Nov 2025",
    events: ["Possible egg retrieval", "HCG injection plan"],
    bgColor: "success",
  },
  {
    id: "6",
    date: "10 Nov 2025",
    events: ["Possible egg retrieval", "HCG injection plan"],
    bgColor: "success",
  },
  {
    id: "7",
    date: "12 Nov 2025",
    events: ["Possible egg retrieval"],
    bgColor: "success",
  },
  {
    id: "8",
    date: "13 Nov 2025",
    events: ["Egg retrieval"],
    bgColor: "success",
  },
  {
    id: "9",
    date: "15 Nov 2025",
    events: ["Sperm Collection", "Fertilisation"],
    bgColor: "success",
  },
  {
    id: "10",
    date: "17 Nov 2025",
    events: ["Embryo biopsy (5–7 days)"],
    bgColor: "success",
  },
  {
    id: "11",
    date: "19 Nov 2025",
    events: ["Embryo Transfer"],
    bgColor: "success",
  },
];

export const AppointmentsWeekData = [
  {
    id: "1",
    status: 1,
    doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "1 smriti shah",
      profileImage: doctor1,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:00",
    reason: ["Fertility Support", "icu", "other"],
    title: "smriti shah - reason to appointment1",
    date: "18 Nov 2025",
    time: "09:00",
  },

  // {
  //   id: "1",
  //   status: 1,
  //   doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
  //   patient: { _id: "69005c207162eaf97429433c", name: "1 smriti shah", profileImage: patientImg1, contactNumber: "9898765432" },
  //   appointmentDate: "11 Nov 2025",
  //   appointmentTime: "10:00",
  //   reason: ["Fertility Support", "other"],
  //   title: "smriti shah - reason to appointment1",
  //   date: "19 Nov 2025",
  //   time: "09:01"
  // },
  // {
  //   id: "2",
  //   status: 1,
  //   doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
  //   patient: { _id: "69005c207162eaf97429433c", name: "2 smriti shah", profileImage: patientImg2, contactNumber: "9898765432" },
  //   appointmentDate: "11 Nov 2025",
  //   appointmentTime: "10:15",
  //   reason: ["Fertility Support", "other"],
  //   title: "smriti shah - reason to appointment",
  //   date: "19 Nov 2025",
  //   time: "09:02"
  // },
  // {
  //   id: "3",
  //   status: 1,
  //   doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
  //   patient: { _id: "69005c207162eaf97429433c", name: "3 smriti shah", profileImage: patientImg1, contactNumber: "9898765432" },
  //   appointmentDate: "11 Nov 2025",
  //   appointmentTime: "10:00",
  //   reason: ["Fertility Support", "other"],
  //   title: "smriti shah - reason to appointment",
  //   date: "19 Nov 2025",
  //   time: "09:10"
  // },
  // {
  //   id: "1",
  //   status: 1,
  //   doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
  //   patient: { _id: "69005c207162eaf97429433c", name: "1 smriti shah", profileImage: patientImg1, contactNumber: "9898765432" },
  //   appointmentDate: "11 Nov 2025",
  //   appointmentTime: "10:00",
  //   reason: ["Fertility Support", "other"],
  //   title: "smriti shah - reason to appointment1",
  //   date: "19 Nov 2025",
  //   time: "09:01"
  // },
  // {
  //   id: "2",
  //   status: 1,
  //   doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
  //   patient: { _id: "69005c207162eaf97429433c", name: "2 smriti shah", profileImage: patientImg2, contactNumber: "9898765432" },
  //   appointmentDate: "11 Nov 2025",
  //   appointmentTime: "10:15",
  //   reason: ["Fertility Support", "other"],
  //   title: "smriti shah - reason to appointment",
  //   date: "19 Nov 2025",
  //   time: "09:02"
  // },
  // {
  //   id: "3",
  //   status: 1,
  //   doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
  //   patient: { _id: "69005c207162eaf97429433c", name: "3 smriti shah", profileImage: patientImg1, contactNumber: "9898765432" },
  //   appointmentDate: "11 Nov 2025",
  //   appointmentTime: "10:00",
  //   reason: ["Fertility Support", "other"],
  //   title: "smriti shah - reason to appointment",
  //   date: "19 Nov 2025",
  //   time: "09:10"
  // },

  {
    id: "1",
    status: 1,
    doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "1 smriti shah",
      profileImage: doctor1,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:00",
    reason: ["Fertility Support", "other"],
    title: "smriti shah - reason to appointment1",
    date: "20 Nov 2025",
    time: "09:01",
  },
  {
    id: "2",
    status: 1,
    doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "2 smriti shah",
      profileImage: doctor1,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:15",
    reason: ["Fertility Support", "other"],
    title: "smriti shah - reason to appointment",
    date: "20 Nov 2025",
    time: "09:02",
  },
  {
    id: "3",
    status: 1,
    doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "3 smriti shah",
      profileImage: doctor1,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:00",
    reason: ["Fertility Support", "other"],
    title: "smriti shah - reason to appointment",
    date: "20 Nov 2025",
    time: "09:10",
  },
  {
    id: "1",
    status: 1,
    doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "1 smriti shah",
      profileImage: doctor1,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:00",
    reason: ["Fertility Support", "other"],
    title: "smriti shah - reason to appointment1",
    date: "20 Nov 2025",
    time: "09:01",
  },
  {
    id: "2",
    status: 1,
    doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "2 smriti shah",
      profileImage: doctor1,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:15",
    reason: ["Fertility Support", "other"],
    title: "smriti shah - reason to appointment",
    date: "20 Nov 2025",
    time: "09:02",
  },
  {
    id: "3",
    status: 1,
    doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "3 smriti shah",
      profileImage: doctor1,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:00",
    reason: ["Fertility Support", "other"],
    title: "smriti shah - reason to appointment",
    date: "20 Nov 2025",
    time: "09:10",
  },

  {
    id: "4",
    status: 1,
    doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "4 smriti shah",
      profileImage: doctor1,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:00",
    reason: ["Fertility Support", "other"],
    title: "smriti shah - reason to appointment",
    date: "20 Nov 2025",
    time: "09:17",
  },
  {
    id: "3",
    status: 1,
    doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "5 smriti shah",
      profileImage: doctor1,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:00",
    reason: ["Fertility Support", "other"],
    title: "smriti shah - reason to appointment",
    date: "21 Nov 2025",
    time: "09:17",
  },
  {
    id: "4",
    status: 1,
    doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "6 smriti shah",
      profileImage: doctor1,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:15",
    reason: ["Fertility Support", "other"],
    title: "smriti shah - reason to appointment",
    date: "21 Nov 2025",
    time: "09:17",
  },
  {
    id: "3",
    status: 1,
    doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah 1",
      profileImage: doctor1,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:00",
    reason: ["Fertility Support", "other"],
    title: "smriti shah - reason to appointment",
    date: "21 Nov 2025",
    time: "05:30",
  },

  {
    id: "5",
    status: 1,
    doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah 2",
      profileImage: doctor1,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:15",
    reason: ["Fertility Support", "other"],
    title: "smriti shah - reason to appointment",
    date: "21 Nov 2025",
    time: "05:40",
  },
  {
    id: "6",
    status: 1,
    doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah",
      profileImage: doctor1,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:20",
    reason: [
      "Fertility Support",
      "Egg Freezing",
      "IVF",
      "IUI",
      "Fertility Support 2",
      "other",
    ],
    title: "smriti shah - reason to appointment",
    date: "21 Nov 2025",
    time: "10:07",
  },
  {
    id: "7",
    status: 1,
    doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah",
      profileImage: doctor1,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:30",
    reason: [
      "Fertility Support",
      "Egg Freezing",
      "IVF",
      "IUI",
      "Fertility Support 2",
      "other",
    ],
    title: "smriti shah - reason to appointment",
    date: "21 Nov 2025",
    time: "11:30",
  },
  {
    id: "8",
    status: 1,
    doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah",
      profileImage: doctor1,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "11:15",
    reason: ["Fertility Support", "other"],
    title: "smriti shah - reason to appointment",
    date: "21 Nov 2025",
    time: "18:15",
  },
  {
    id: "9",
    status: 1,
    doctor: { _id: "68b5723f5e662f13011c00ff", name: "Dr. Priya Sharma" },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah",
      profileImage: doctor1,
      contactNumber: "9898765432",
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "13:30",
    reason: ["Fertility Support", "other"],
    title: "smriti shah - reason to appointment",
    date: "21 Nov 2025",
    time: "13:30",
  },
];
export interface AppointmentsMonthType {
  id: string;
  patient: {
    _id: string;
    name: string;
    profileImage: string | StaticImageData;
    contactNumber: string;
  };
  date: string;
}
export const AppointmentsMonthData: AppointmentsMonthType[] = [
  {
    id: "1",
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "1 smriti shah",
      profileImage: patient1,
      contactNumber: "9898765432",
    },
    date: "1 Nov 2025",
  },
  {
    id: "1",
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "2 smriti shah",
      profileImage: patient1,
      contactNumber: "9898765432",
    },
    date: "1 Nov 2025",
  },
  {
    id: "1",
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "3 smriti shah",
      profileImage: patient1,
      contactNumber: "9898765432",
    },
    date: "1 Nov 2025",
  },
  {
    id: "1",
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "4 smriti shah",
      profileImage: patient1,
      contactNumber: "9898765432",
    },
    date: "1 Nov 2025",
  },
  {
    id: "1",
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "5 smriti shah",
      profileImage: patient1,
      contactNumber: "9898765432",
    },
    date: "1 Nov 2025",
  },
  {
    id: "3",
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "1 smriti shah",
      profileImage: patient1,
      contactNumber: "9898765432",
    },
    date: "3 Nov 2025",
  },
  {
    id: "5",
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "1 smriti shah",
      profileImage: patient1,
      contactNumber: "9898765432",
    },
    date: "5 Nov 2025",
  },
  {
    id: "5",
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "2 smriti shah",
      profileImage: patient1,
      contactNumber: "9898765432",
    },
    date: "5 Nov 2025",
  },
  {
    id: "5",
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "3 smriti shah",
      profileImage: patient1,
      contactNumber: "9898765432",
    },
    date: "5 Nov 2025",
  },
  {
    id: "5",
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "4 smriti shah",
      profileImage: patient1,
      contactNumber: "9898765432",
    },
    date: "5 Nov 2025",
  },
  {
    id: "2",
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "1 smriti shah",
      profileImage: patient1,
      contactNumber: "9898765432",
    },
    date: "12 Nov 2025",
  },
  {
    id: "4",
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "1 smriti shah",
      profileImage: patient1,
      contactNumber: "9898765432",
    },
    date: "14 Nov 2025",
  },
  {
    id: "6",
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "1 smriti shah",
      profileImage: patient1,
      contactNumber: "9898765432",
    },
    date: "16 Nov 2025",
  },
  {
    id: "7",
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "1 smriti shah",
      profileImage: patient1,
      contactNumber: "9898765432",
    },
    date: "7 Nov 2025",
  },
];
