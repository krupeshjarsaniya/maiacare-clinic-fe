// "use client";
// import React, { useState } from 'react';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import Head from 'next/head';
// import ProfileImage from '../assets/images/Profile_Image.png'
// import { ProfileCard } from '../components/ui/custom/ProfileCard';
// import ContentContainer from './ui/ContentContainer';
// import CustomTabs from './ui/CustomTabs';
// import ProfileBasicDetail from '../components/ProfileBasicDetails';

// import PatientReport from './PatientReport';
// import PatientTreatment from './PatientTreatment';
// import PatientPaymentHistory from './PatientPaymentHistory';
// import PartnerDetail from './PartnerDetail';
// import PatientAppointment from './PatientAppointment';
// import '@/style/patientProfile.css';


// const AddMedicalHistory = () => {
//   const [key, setKey] = useState<string>('basic');
//   const [activeTab, setActiveTab] = useState<string>("basic");

//   const profileData = {
//     name: "Rani Desai",
//     image: ProfileImage.src,
//     id: "PTS-874562",
//     gender: "Female",
//     dob: "7 Jan 1999",
//     age: 31,
//     joinDate: "7 Jan 2025",
//     status: "Active" as const,
//   };

//   const tabOptions = [
//     {
//       key: "basic",
//       label: "Basic Details",
//       content: (
//         <div className='mt-4'><ProfileBasicDetail /></div>
//       ),
//     },
//     {
//       key: "partner",
//       label: "Partner Details",
//       content: (
//         <div>
//           <PartnerDetail setActiveTab={setActiveTab} />
//         </div>
//       ),
//     },
//     {
//       key: "appointment",
//       label: "Appointment",
//       content: (
//         <div className='mt-4'>
//           <PatientAppointment />
//         </div>
//       ),
//     },
//     {
//       key: "reports",
//       label: "Reports",
//       content: (
//         <div className='mt-4'>
//           <PatientReport />
//         </div>
//       ),
//     },
//     {
//       key: "payment history",
//       label: "Payment History",
//       content: (
//         <div>
//           <PatientPaymentHistory />
//         </div>

//       ),
//     },
//     {
//       key: "treatment",
//       label: "Treatment",
//       content: (
//         <div >
//           <PatientTreatment />
//         </div>
//       ),
//     },
//   ];
//   return (

//     <>
//       <ProfileCard
//         name={profileData.name}
//         image={profileData.image}
//         id={profileData.id}
//         gender={profileData.gender}
//         dob={profileData.dob}
//         age={profileData.age}
//         joinDate={profileData.joinDate}
//         status={profileData.status}
//       />

//       <main className="bg-light py-2">
//         <div className="">

//           <CustomTabs
//             activeKey={activeTab}
//             setActiveKey={setActiveTab}
//             tabOptions={tabOptions}
//           />
//         </div>
//       </main>
//     </>
//   );
// };

// export default AddMedicalHistory;


