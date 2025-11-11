import doctor1 from "@/assets/images/doctor1.png";
import doctor2 from "@/assets/images/doctor2.png";
import doctor3 from "@/assets/images/doctor3.png";
import doctor4 from "@/assets/images/doctor4.png";
import doctor5 from "@/assets/images/doctor5.png";
import { StaticImageData } from "next/image";
import Doctor1 from "@/assets/images/doctor1.png";
import Doctor2 from "@/assets/images/doctor2.png";
import Doctor3 from "@/assets/images/doctor3.png";
import Doctor4 from "@/assets/images/doctor4.png";
import patient1 from "../assets/images/patient1.png";
import patient2 from "../assets/images/patient2.png";
import patient3 from "../assets/images/patient3.png";
import patient4 from "../assets/images/patient4.png";
import patient5 from "../assets/images/patient5.png";
import patient6 from "../assets/images/patient6.png";
import clinicimg from "../assets/images/clinic logo.png";

export interface DoctorEntry {
  id: number; // <-- ADD ID
  name: string;
  mobile: string;
  email: string;
  pin: string;
  status: string;
  image: string | StaticImageData;
  date?: string; // ✅ optional date field
  specialisation: string;
  verified: boolean;
}

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

export const AssignedPatients: AssignedPatients[] = [
  {
    id: 1,
    name: "Anicka Jain",
    mobile: "9092038491",
    email: "ranidesai@protonmail.com",
    pin: "400077",
    status: "Active",
    image: patient1,
    date: "2025-09-16",
    treatmenttype: ["IVF", "Egg Freezing"],
    visit: "2nd Feb 2025",
  },
  {
    id: 2,
    name: "Radhika More",
    mobile: "9092038491",
    email: "ninagupta@protonmail.com",
    pin: "400077",
    status: "Paused",
    image: patient2,
    treatmenttype: ["IVF", "Egg Freezing"],
    date: "2025-09-15",
    visit: "2nd Feb 2025",
  },
  {
    id: 3,
    name: "Seema Gupta",
    mobile: "9092038491",
    email: "himariroy@protonmail.com",
    pin: "400077",
    status: "Active",
    image: patient3,
    treatmenttype: ["IVF", "Egg Freezing"],
    date: "2025-09-15",
    visit: "2nd Feb 2025",
  },
  {
    id: 4,
    name: "Nisha Dandge",
    mobile: "9092038491",
    email: "anjalishinde@protonmail.com",
    pin: "400077",
    status: "Paused",
    image: patient4,
    treatmenttype: ["IVF", "Egg Freezing"],
    date: "2025-09-25",
    visit: "2nd Feb 2025",
  },
  {
    id: 5,
    name: "Himika Bose",
    mobile: "9092038491",
    email: "anjalishinde@protonmail.com",
    pin: "400077",
    status: "Active",
    image: patient5,
    treatmenttype: ["IVF", "Egg Freezing"],
    date: "2025-10-15",
    visit: "2nd Feb 2025",
  },
  {
    id: 6,
    name: "Sakshi Sinha",
    mobile: "9092038491",
    email: "anjalishinde@protonmail.com",
    pin: "400077",
    status: "Paused",
    image: patient1,
    treatmenttype: ["IVF", "Egg Freezing"],
    date: "2025-10-15",
    visit: "2nd Feb 2025",
  },
  {
    id: 7,
    name: "Hardik  Mehta",
    mobile: "9092038491",
    email: "anjalishinde@protonmail.com",
    pin: "400077",
    status: "Active",
    image: patient6,
    treatmenttype: ["Sperm Freezing"],
    date: "2025-10-15",
    visit: "2nd Feb 2025",
  },
  {
    id: 8,
    name: "Anicka Jain",
    mobile: "9092038491",
    email: "anjalishinde@protonmail.com",
    pin: "400077",
    status: "Active",
    image: patient1,
    treatmenttype: ["IVF", "Egg Freezing"],
    date: "2025-10-15",
    visit: "2nd Feb 2025",
  },
  {
    id: 9,
    name: "Anicka Jain",
    mobile: "9092038491",
    email: "anjalishinde@protonmail.com",
    pin: "400077",
    status: "Active",
    image: patient1,
    treatmenttype: ["IVF", "Egg Freezing"],
    date: "2025-10-15",
    visit: "2nd Feb 2025",
  },
  {
    id: 10,
    name: "Anicka Jain",
    mobile: "9092038491",
    email: "anjalishinde@protonmail.com",
    pin: "400077",
    status: "Active",
    image: patient1,
    treatmenttype: ["IVF", "Egg Freezing"],
    date: "2025-10-15",
    visit: "2nd Feb 2025",
  },
];

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
  id: number; // <-- ADD ID
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
    id: 1,
    name: "Rani Desai",
    mobile: "9092038491",
    treatment: "Fertility Support +2",
    pin: "400077",
    status: "Active",
    image: Doctor1,
    date: "2025-09-15",
  },
  {
    id: 2,
    name: "Nina Gupta",
    mobile: "9092038491",
    treatment: "IVF",
    pin: "400077",
    status: "Deactivated",
    image: Doctor1,
    date: "2025-11-07",
  },
  {
    id: 3,
    name: "Himari Roy",
    mobile: "9092038491",
    treatment: "Egg Freezing",
    pin: "400077",
    status: "Discontinued",
    image: Doctor1,
    date: "2025-09-15",
  },
  {
    id: 4,
    name: "Anjali Shinde",
    mobile: "9092038491",
    treatment: "IVF",
    pin: "400077",
    status: "Active",
    image: Doctor1,
    date: "2025-09-15",
  },
  {
    id: 5,
    name: "Anjali Shinde",
    mobile: "9092038491",
    treatment: "Fertility Support +2",
    pin: "400077",
    status: "Deactivated",
    image: Doctor1,
    date: "2025-11-08",
  },
  {
    id: 6,
    name: "Aastha Patil",
    mobile: "9092038491",
    treatment: "IVF",
    pin: "400077",
    status: "Active",
    image: Doctor1,
    date: "2025-09-15",
  },
  {
    id: 7,
    name: "Anjali Shinde",
    mobile: "9092038491",
    treatment: "Fertility Support +2",
    pin: "400077",
    status: "Deactivated",
    image: Doctor1,
    date: "2025-09-15",
  },
  {
    id: 8,
    name: "Rani Desai",
    mobile: "9092038491",
    treatment: "Egg Freezing",
    pin: "400077",
    status: "Active",
    image: Doctor1,
    date: "2025-09-15",
  },
  {
    id: 9,
    name: "Anjali Shinde",
    mobile: "9092038491",
    treatment: "Fertility Support +2",
    pin: "400077",
    status: "Deactivated",
    image: Doctor1,
    date: "2025-09-15",
  },
  {
    id: 10,
    name: "Rani Desai",
    mobile: "9092038491",
    treatment: "Egg Freezing",
    pin: "400077",
    status: "Active",
    image: Doctor1,
    date: "2025-10-15",
  },
];

import { ColumnDef } from "@tanstack/react-table";
import { Patient, SelectPatientType } from "./types/interfaces";

export type LeaveEntry = {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  days: string;
  status?: string;
};

export const leaveData: LeaveEntry[] = [
  {
    id: "01",
    type: "Holi",
    startDate: "12/08/25",
    endDate: "12/08/25",
    days: "1 Day",
  },
  {
    id: "02",
    type: "Sick leave",
    startDate: "12/08/25",
    endDate: "12/08/25",
    days: "3 Days",
  },
  {
    id: "03",
    type: "Vacation",
    startDate: "12/08/25",
    endDate: "12/08/25",
    days: "15 Days",
  },
  {
    id: "04",
    type: "Family Thing",
    startDate: "12/08/25",
    endDate: "12/08/25",
    days: "1 Day",
  },
  {
    id: "05",
    type: "Sick leave",
    startDate: "12/08/25",
    endDate: "12/08/25",
    days: "2 Days",
  },
  {
    id: "06",
    type: "Casual leave",
    startDate: "12/08/25",
    endDate: "12/08/25",
    days: "1 Day",
  },
  {
    id: "07",
    type: "Family thing",
    startDate: "12/08/25",
    endDate: "12/08/25",
    days: "2 Days",
  },
  {
    id: "08",
    type: "Casual leave",
    startDate: "12/08/25",
    endDate: "12/08/25",
    days: "1 Day",
  },
];

export const leaveColumns: ColumnDef<LeaveEntry>[] = [
  {
    header: "#",
    accessorKey: "id",
  },
  {
    header: "Leave Type",
    accessorKey: "type",
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

export const tableResponse: Patient[] = [
  {
    id: 1,
    name: "Meera Joshi",
    mobile: "9092038491",
    email: "----",
    pincode: "400072",
    treatment: "Fertility Support +2",
    status: "Active",
  },
  {
    id: 2,
    name: "Anjali Kapoor",
    mobile: "9092038491",
    email: "ashok.kumar@gmail.com",
    pincode: "400072",
    treatment: "IVF",
    status: "Deactivated",
  },
  // ...add more rows
];
