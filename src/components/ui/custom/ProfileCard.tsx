// import React, { useState } from 'react';

// import { Nav, Tab } from 'react-bootstrap';
// import Image from 'next/image';
// import { Card, Row, Col, Badge, Dropdown } from 'react-bootstrap';
// import {
//   BsPersonBadge,
//   BsGenderFemale,
//   BsCalendar2Check,
//   BsThreeDotsVertical,
// } from 'react-icons/bs';
// import { LiaBirthdayCakeSolid } from "react-icons/lia";
// import PrfileImage from '../../../assets/images/Profile_Image.png'
// import ProfileAge from '../../../assets/images/Profile_Age.png'
// import ProfileId from '../../../assets/images/Profile_Id.png'
// import ProfileGender from '../../../assets/images/Profile_Gender.png'
// import ProfileDob from '../../../assets/images/Profile_Calendar.png'
// import Cacke from '../../../assets/images/Cake.png'
// import '../../../style/profile.css';
// import ProfileBasicDetail from '../../../components/ProfileBasicDetails';
// import { HiOutlineDotsHorizontal } from "react-icons/hi";
// import ContentContainer from '../ContentContainer';
// import CustomTabs from '../CustomTabs';


// type ProfileProps = {
//   name: string;
//   image?: string;
//   id?: string;
//   gender?: string;
//   dob?: string;
//   age?: number;
//   joinDate?: string;
//   status?: 'Active' | 'Inactive';
// };

// export const ProfileCard: React.FC<ProfileProps> = ({
//   name,
//   image,
//   id,
//   gender,
//   dob,
//   age,
//   joinDate,
//   status,
// }) => {
//   return (
//     <Card className={`shadow-sm rounded-4 patient-profile-card`}>
//       {/* <Row >
//         <Col xs="auto">
//           <Image
//             src={PrfileImage}
//             alt={name}
//             width={90}
//             height={90}
//             className="rounded-3"
//           />
//         </Col>
//         <Col>
//           <div className="d-flex align-items-center mb-1">
//             <h6 className="mb-0 doctor-profile-heading me-2">{name}</h6>

//       <div >
//         <Row>
//           <Col xs="auto">
//             <Image
//               src={PrfileImage}
//               alt={name}
//               width={90}
//               height={90}
//               className="rounded-3"
//             />
//           </Col>
//           <Col>
//             <div className="d-flex align-items-center mb-1">
//               <h6 className="mb-0 doctor-profile-heading me-2">{name}</h6>

//               <span className='patient-journey-badge-InProgress'> {status}</span>
//             </div>

//             <div className='pt-sm-1 p-0 d-flex  '>
//               <span className='me-2 doctor-profile-subheading'><Image src={ProfileId} alt="Age" width={14} height={16} className="me-1" /> {id}</span>
//               <span className='doctor-profile-subheading'><Image src={ProfileGender} alt="Age" width={14} height={16} className="me-1" /> {gender}</span>
//             </div>
//             <div className='pt-sm-1 p-0 d-flex '>
//               <span className='me-2 doctor-profile-subheading'><Image src={Cacke} alt="Age" width={15} height={15} className="me-1" /> {dob}</span>
//               <span className='doctor-profile-subheading'><Image src={ProfileAge} alt="Age" width={15} height={15} className="me-1" /> {age} Years</span>
//             </div>
//             <div className="pt-sm-1 p-0 doctor-profile-subheading">
//               <Image src={ProfileDob} alt="Age" width={15} height={15} className="me-1" /> Joined Date: {joinDate}
//             </div>


//           </Col>
//           <Col xs="auto">
//             <Dropdown align="end" className="d-flex align-items-center">
//               <Dropdown.Toggle
//                 as="button"
//                 id="dropdown-basic"
//                 className="bg-transparent border-0 p-1 no-caret"
//               >
//                 <div className='patient-profile-dot'>

//                 <HiOutlineDotsHorizontal />
//               </div>
//             </Dropdown.Toggle>
//             <Dropdown.Menu className="dropdown-menu-end">
//               <Dropdown.Item>Edit</Dropdown.Item>
//               <Dropdown.Item>View</Dropdown.Item>
//               <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </Col>
//       </Row> */}

//       <div className='d-flex justify-content-between align-items-start  '>
//         <div className='d-flex align-items-start align-items-sm-center gap-3 flex-column flex-sm-row'>
//           <div>
//             <Image
//               src={PrfileImage}
//               alt={name}
//               width={90}
//               height={90}
//               className="rounded-3"
//             />
//           </div>
//           <div>
//             <div className="d-flex align-items-center mb-1">
//               <h6 className="mb-0 doctor-profile-heading me-2">{name}</h6>

//               <span className='patient-journey-badge-InProgress'> {status}</span>
//             </div>

//             <div className='pt-sm-1 p-0 d-flex  '>
//               <div className='me-2 doctor-profile-subheading d-flex gap-1 align-items-center'>
//                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M3.03828 14.5C3.10397 14.5494 3.17874 14.5853 3.25833 14.6057C3.33791 14.6262 3.42075 14.6307 3.50209 14.6191C3.58344 14.6075 3.66169 14.58 3.73238 14.5381C3.80307 14.4962 3.86481 14.4408 3.91406 14.375C4.29247 13.8705 4.78316 13.4609 5.34726 13.1789C5.91136 12.8968 6.53338 12.75 7.16406 12.75C7.79475 12.75 8.41677 12.8968 8.98087 13.1789C9.54497 13.4609 10.0357 13.8705 10.4141 14.375C10.4633 14.4407 10.525 14.496 10.5956 14.5378C10.6663 14.5796 10.7444 14.6071 10.8257 14.6187C10.9069 14.6303 10.9897 14.6258 11.0692 14.6054C11.1487 14.5851 11.2234 14.5492 11.2891 14.5C11.3547 14.4508 11.41 14.3891 11.4519 14.3184C11.4937 14.2478 11.5212 14.1696 11.5328 14.0884C11.5444 14.0071 11.5399 13.9244 11.5195 13.8449C11.4991 13.7654 11.4633 13.6907 11.4141 13.625C10.8606 12.883 10.1226 12.2988 9.27344 11.9305C9.73882 11.5056 10.0649 10.9499 10.2088 10.3364C10.3527 9.72289 10.3078 9.0802 10.08 8.49267C9.8521 7.90514 9.45193 7.40023 8.93197 7.0442C8.41202 6.68816 7.79657 6.49765 7.16641 6.49765C6.53624 6.49765 5.92079 6.68816 5.40084 7.0442C4.88088 7.40023 4.48072 7.90514 4.25285 8.49267C4.02499 9.0802 3.98008 9.72289 4.12401 10.3364C4.26794 10.9499 4.59399 11.5056 5.05937 11.9305C4.20847 12.2981 3.46878 12.8824 2.91406 13.625C2.81452 13.7575 2.77169 13.9241 2.79499 14.0882C2.81828 14.2523 2.90579 14.4004 3.03828 14.5ZM7.16406 7.75C7.5349 7.75 7.89741 7.85997 8.20576 8.06599C8.5141 8.27202 8.75442 8.56486 8.89634 8.90747C9.03825 9.25008 9.07538 9.62708 9.00303 9.9908C8.93069 10.3545 8.75211 10.6886 8.48989 10.9508C8.22766 11.213 7.89357 11.3916 7.52986 11.464C7.16614 11.5363 6.78914 11.4992 6.44653 11.3573C6.10392 11.2154 5.81108 10.975 5.60506 10.6667C5.39903 10.3584 5.28906 9.99584 5.28906 9.625C5.28906 9.12772 5.48661 8.65081 5.83824 8.29917C6.18987 7.94754 6.66678 7.75 7.16406 7.75ZM12.7891 0.875H1.53906C1.20754 0.875 0.889599 1.0067 0.655179 1.24112C0.420759 1.47554 0.289063 1.79348 0.289062 2.125V15.875C0.289063 16.2065 0.420759 16.5245 0.655179 16.7589C0.889599 16.9933 1.20754 17.125 1.53906 17.125H12.7891C13.1206 17.125 13.4385 16.9933 13.6729 16.7589C13.9074 16.5245 14.0391 16.2065 14.0391 15.875V2.125C14.0391 1.79348 13.9074 1.47554 13.6729 1.24112C13.4385 1.0067 13.1206 0.875 12.7891 0.875ZM12.7891 15.875H1.53906V2.125H12.7891V15.875ZM4.03906 4C4.03906 3.83424 4.10491 3.67527 4.22212 3.55806C4.33933 3.44085 4.4983 3.375 4.66406 3.375H9.66406C9.82982 3.375 9.98879 3.44085 10.106 3.55806C10.2232 3.67527 10.2891 3.83424 10.2891 4C10.2891 4.16576 10.2232 4.32473 10.106 4.44194C9.98879 4.55915 9.82982 4.625 9.66406 4.625H4.66406C4.4983 4.625 4.33933 4.55915 4.22212 4.44194C4.10491 4.32473 4.03906 4.16576 4.03906 4Z" fill="#8A8D93" />
//                 </svg>
//                 {id}
//               </div>
//               <div className='doctor-profile-subheading d-flex gap-1 align-items-center'>
//                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M13.4141 7.12492C13.414 5.91544 13.0631 4.73195 12.4038 3.71797C11.7445 2.70399 10.8051 1.9031 9.69961 1.41243C8.59413 0.921758 7.37003 0.762384 6.17576 0.953637C4.9815 1.14489 3.86838 1.67855 2.97141 2.48991C2.07444 3.30126 1.43215 4.35544 1.12244 5.5246C0.812734 6.69375 0.848915 7.92766 1.22659 9.07666C1.60427 10.2257 2.30723 11.2404 3.2502 11.9978C4.19317 12.7552 5.33564 13.2227 6.53906 13.3437V17.1249C6.53906 17.2907 6.60491 17.4497 6.72212 17.5669C6.83933 17.6841 6.9983 17.7499 7.16406 17.7499C7.32982 17.7499 7.48879 17.6841 7.606 17.5669C7.72322 17.4497 7.78906 17.2907 7.78906 17.1249V13.3437C9.32997 13.1869 10.758 12.4643 11.797 11.3156C12.836 10.1669 13.4122 8.67379 13.4141 7.12492ZM7.16406 12.1249C6.17516 12.1249 5.20846 11.8317 4.38621 11.2823C3.56397 10.7329 2.9231 9.95197 2.54467 9.03834C2.16623 8.12471 2.06721 7.11938 2.26014 6.14947C2.45306 5.17957 2.92927 4.28865 3.62853 3.58939C4.32779 2.89013 5.21871 2.41392 6.18861 2.221C7.15852 2.02807 8.16385 2.12709 9.07748 2.50553C9.99111 2.88397 10.772 3.52483 11.3214 4.34707C11.8708 5.16932 12.1641 6.13602 12.1641 7.12492C12.1626 8.45056 11.6354 9.72149 10.698 10.6589C9.76063 11.5962 8.4897 12.1235 7.16406 12.1249Z" fill="#8A8D93" />
//               </svg>
//                 {gender}</div>
//             </div>
//             <div className='pt-sm-1 p-0 d-flex '>
//               <div className='me-2 doctor-profile-subheading d-flex gap-1 align-items-center'>
//                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M16.2891 8.75041C16.2891 8.25313 16.0915 7.77621 15.7399 7.42458C15.3883 7.07295 14.9113 6.87541 14.4141 6.87541H8.78906V6.17228C9.32551 6.03294 9.80059 5.7196 10.1399 5.28134C10.4792 4.84308 10.6635 4.30466 10.6641 3.75041C10.6641 1.56291 8.59844 0.163687 8.51094 0.105094C8.40823 0.0365692 8.28753 0 8.16406 0C8.0406 0 7.91989 0.0365692 7.81719 0.105094C7.72969 0.163687 5.66406 1.56291 5.66406 3.75041C5.66459 4.30466 5.84894 4.84308 6.18823 5.28134C6.52753 5.7196 7.00261 6.03294 7.53906 6.17228V6.87541H1.91406C1.41678 6.87541 0.939868 7.07295 0.588237 7.42458C0.236607 7.77621 0.0390625 8.25313 0.0390625 8.75041V10.5731C0.0397037 11.2549 0.25874 11.9186 0.664062 12.4668V15.6254C0.664062 16.1227 0.861607 16.5996 1.21324 16.9512C1.56487 17.3029 2.04178 17.5004 2.53906 17.5004H13.7891C14.2863 17.5004 14.7633 17.3029 15.1149 16.9512C15.4665 16.5996 15.6641 16.1227 15.6641 15.6254V12.4668C16.0694 11.9186 16.2884 11.2549 16.2891 10.5731V8.75041ZM6.91406 3.75041C6.91406 2.69025 7.69531 1.83947 8.16406 1.42306C8.63281 1.83947 9.41406 2.69025 9.41406 3.75041C9.41406 4.08193 9.28237 4.39987 9.04795 4.63429C8.81353 4.86871 8.49558 5.00041 8.16406 5.00041C7.83254 5.00041 7.5146 4.86871 7.28018 4.63429C7.04576 4.39987 6.91406 4.08193 6.91406 3.75041ZM1.28906 8.75041C1.28906 8.58465 1.35491 8.42567 1.47212 8.30846C1.58933 8.19125 1.7483 8.12541 1.91406 8.12541H14.4141C14.5798 8.12541 14.7388 8.19125 14.856 8.30846C14.9732 8.42567 15.0391 8.58465 15.0391 8.75041V10.5731C15.0391 11.6082 14.2219 12.4723 13.2172 12.4996C12.9666 12.5067 12.7171 12.4635 12.4835 12.3725C12.2499 12.2815 12.0369 12.1446 11.8572 11.9699C11.6774 11.7951 11.5345 11.5861 11.4369 11.3552C11.3393 11.1243 11.2891 10.8761 11.2891 10.6254C11.2891 10.4596 11.2232 10.3007 11.106 10.1835C10.9888 10.0663 10.8298 10.0004 10.6641 10.0004C10.4983 10.0004 10.3393 10.0663 10.2221 10.1835C10.1049 10.3007 10.0391 10.4596 10.0391 10.6254C10.0391 11.1227 9.84152 11.5996 9.48989 11.9512C9.13826 12.3029 8.66134 12.5004 8.16406 12.5004C7.66678 12.5004 7.18987 12.3029 6.83824 11.9512C6.48661 11.5996 6.28906 11.1227 6.28906 10.6254C6.28906 10.4596 6.22321 10.3007 6.106 10.1835C5.98879 10.0663 5.82982 10.0004 5.66406 10.0004C5.4983 10.0004 5.33933 10.0663 5.22212 10.1835C5.10491 10.3007 5.03906 10.4596 5.03906 10.6254C5.03916 10.8762 4.98896 11.1244 4.89143 11.3554C4.7939 11.5864 4.65102 11.7956 4.47124 11.9704C4.29146 12.1452 4.07845 12.2822 3.84479 12.3732C3.61114 12.4643 3.3616 12.5075 3.11094 12.5004C2.10625 12.4723 1.28906 11.6082 1.28906 10.5731V8.75041ZM13.7891 16.2504H2.53906C2.3733 16.2504 2.21433 16.1846 2.09712 16.0673C1.97991 15.9501 1.91406 15.7912 1.91406 15.6254V13.4817C2.27991 13.6474 2.67508 13.7388 3.07656 13.7504C3.49426 13.7634 3.91027 13.6918 4.29961 13.54C4.68895 13.3881 5.04357 13.1592 5.34219 12.8668C5.45878 12.7532 5.56639 12.6307 5.66406 12.5004C5.95515 12.8885 6.3326 13.2035 6.76652 13.4205C7.20044 13.6375 7.67892 13.7504 8.16406 13.7504C8.6492 13.7504 9.12768 13.6375 9.56161 13.4205C9.99553 13.2035 10.373 12.8885 10.6641 12.5004C10.762 12.6302 10.8699 12.7521 10.9867 12.8652C11.5681 13.4347 12.3502 13.7527 13.1641 13.7504C13.1938 13.7504 13.2234 13.7504 13.2531 13.7504C13.6541 13.7386 14.0487 13.6472 14.4141 13.4817V15.6254C14.4141 15.7912 14.3482 15.9501 14.231 16.0673C14.1138 16.1846 13.9548 16.2504 13.7891 16.2504Z" fill="#8A8D93" />
//                 </svg>
//                 {dob}
//               </div>
//               <div className='doctor-profile-subheading d-flex gap-1 align-items-center'>
//                 <svg width="19" height="19" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <g clipPath="url(#clip0_2367_101200)">
//                     <path d="M10.4141 19.7925C9.37242 19.7925 8.28909 19.6259 7.20576 19.2509C2.12242 17.5009 -0.585911 11.9175 1.16409 6.79255C2.91409 1.70921 8.49742 -0.999119 13.6224 0.750881C15.9974 1.58421 17.9558 3.25088 19.0808 5.45921C19.2474 5.75088 19.1224 6.12588 18.8308 6.25088C18.5391 6.41755 18.1641 6.29255 18.0391 6.00088C17.0391 4.04255 15.3308 2.58421 13.2474 1.87588C8.74742 0.334214 3.83076 2.70921 2.28909 7.20921C0.747422 11.7092 3.12242 16.5842 7.58076 18.1259C12.0391 19.6675 16.9558 17.2925 18.4974 12.8342C18.6224 12.5009 18.9558 12.3759 19.2474 12.4592C19.5808 12.5842 19.7058 12.9175 19.6224 13.2092C18.2891 17.2509 14.4558 19.7925 10.4141 19.7925Z" fill="#8A8D93" />
//                     <path d="M18.7057 6.4987L15.2474 6.45703C14.9141 6.45703 14.6641 6.16536 14.6641 5.83203C14.6641 5.4987 14.9557 5.2487 15.2891 5.2487L18.1641 5.29036L18.2057 2.41536C18.2057 2.08203 18.4557 1.83203 18.8307 1.83203C19.1641 1.83203 19.4141 2.1237 19.4141 2.45703L19.3307 5.8737C19.3307 6.04036 19.2474 6.16536 19.1641 6.29036C19.0391 6.41536 18.8724 6.4987 18.7057 6.4987Z" fill="#8A8D93" />
//                     <path d="M7.83075 11.375L7.45575 10.5H5.78908L5.41408 11.375H4.45575L6.20575 7.375H7.08075L8.83075 11.375H7.83075ZM6.62242 8.58333L6.12242 9.75H7.12242L6.62242 8.58333ZM11.4141 10.875C11.1224 11.1667 10.7891 11.3333 10.4141 11.3333C9.99742 11.3333 9.66408 11.2083 9.41408 10.9167C9.12242 10.625 8.99742 10.2917 8.99742 9.83333C8.99742 9.375 9.12242 9 9.41408 8.70833C9.70575 8.41667 10.0391 8.25 10.3724 8.25C10.7474 8.25 11.0391 8.41667 11.2891 8.70833V8.29167H12.1641V10.9583C12.1641 11.25 12.1224 11.4583 12.0391 11.7083C11.9557 11.9167 11.8307 12.0833 11.6641 12.2083C11.3307 12.4583 10.9557 12.5833 10.5391 12.5833C10.2891 12.5833 10.0807 12.5417 9.83075 12.4583C9.58075 12.375 9.37242 12.2917 9.20575 12.125L9.53908 11.4583C9.83075 11.6667 10.1224 11.7917 10.4557 11.7917C10.7891 11.7917 11.0391 11.7083 11.2057 11.5417C11.3307 11.4583 11.4141 11.2083 11.4141 10.875ZM11.2891 9.79167C11.2891 9.54167 11.2057 9.33333 11.0807 9.20833C10.9557 9.08333 10.7891 9 10.5807 9C10.3724 9 10.2057 9.08333 10.0391 9.20833C9.87242 9.33333 9.83075 9.54167 9.83075 9.79167C9.83075 10.0417 9.91408 10.25 10.0391 10.375C10.1641 10.5417 10.3724 10.5833 10.5807 10.5833C10.7891 10.5833 10.9557 10.5 11.0807 10.375C11.2474 10.25 11.2891 10.0417 11.2891 9.79167ZM15.6224 10.9583C15.2891 11.2917 14.8724 11.4583 14.4141 11.4583C13.9557 11.4583 13.5391 11.3333 13.2474 11.0417C12.9557 10.75 12.7891 10.375 12.7891 9.875C12.7891 9.375 12.9557 9 13.2474 8.70833C13.5391 8.41667 13.9141 8.29167 14.3307 8.29167C14.7474 8.29167 15.1224 8.41667 15.4141 8.66667C15.7057 8.91667 15.8724 9.29167 15.8724 9.70833V10.1667H13.6224C13.6641 10.3333 13.7474 10.4583 13.8724 10.5833C14.0391 10.7083 14.2057 10.75 14.3724 10.75C14.6641 10.75 14.9141 10.6667 15.1224 10.4583L15.6224 10.9583ZM14.8307 9.125C14.7057 9.04167 14.5807 8.95833 14.4141 8.95833C14.2474 8.95833 14.0807 9 13.9557 9.125C13.8307 9.20833 13.7474 9.375 13.7057 9.54167H15.0391C14.9974 9.375 14.9141 9.20833 14.8307 9.125Z" fill="#8A8D93" />
//                   </g>
//                   <defs>
//                     <clipPath id="clip0_2367_101200">
//                       <rect width="20" height="20" fill="white" transform="translate(0.164062)" />
//                     </clipPath>
//                   </defs>
//                 </svg>
//                 {age} Years
//               </div>
//             </div>
//             <div className="pt-sm-1 p-0 doctor-profile-subheading d-flex gap-1 align-items-center">
//               <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M14.4141 1.5H12.5391V0.875C12.5391 0.70924 12.4732 0.550268 12.356 0.433058C12.2388 0.315848 12.0798 0.25 11.9141 0.25C11.7483 0.25 11.5893 0.315848 11.4721 0.433058C11.3549 0.550268 11.2891 0.70924 11.2891 0.875V1.5H5.03906V0.875C5.03906 0.70924 4.97321 0.550268 4.856 0.433058C4.73879 0.315848 4.57982 0.25 4.41406 0.25C4.2483 0.25 4.08933 0.315848 3.97212 0.433058C3.85491 0.550268 3.78906 0.70924 3.78906 0.875V1.5H1.91406C1.58254 1.5 1.2646 1.6317 1.03018 1.86612C0.795759 2.10054 0.664063 2.41848 0.664062 2.75V15.25C0.664063 15.5815 0.795759 15.8995 1.03018 16.1339C1.2646 16.3683 1.58254 16.5 1.91406 16.5H14.4141C14.7456 16.5 15.0635 16.3683 15.2979 16.1339C15.5324 15.8995 15.6641 15.5815 15.6641 15.25V2.75C15.6641 2.41848 15.5324 2.10054 15.2979 1.86612C15.0635 1.6317 14.7456 1.5 14.4141 1.5ZM3.78906 2.75V3.375C3.78906 3.54076 3.85491 3.69973 3.97212 3.81694C4.08933 3.93415 4.2483 4 4.41406 4C4.57982 4 4.73879 3.93415 4.856 3.81694C4.97321 3.69973 5.03906 3.54076 5.03906 3.375V2.75H11.2891V3.375C11.2891 3.54076 11.3549 3.69973 11.4721 3.81694C11.5893 3.93415 11.7483 4 11.9141 4C12.0798 4 12.2388 3.93415 12.356 3.81694C12.4732 3.69973 12.5391 3.54076 12.5391 3.375V2.75H14.4141V5.25H1.91406V2.75H3.78906ZM14.4141 15.25H1.91406V6.5H14.4141V15.25Z" fill="#8A8D93" />
//               </svg>
//               Joined Date: {joinDate}
//             </div>

//           </div>
//         </div>
//         <div>
//           <Dropdown align="end" className="d-flex align-items-center">
//             <Dropdown.Toggle
//               as="button"
//               id="dropdown-basic"
//               className="bg-transparent border-0 p-1 no-caret"
//             >
//               <div className='patient-profile-dot'>

//                 <HiOutlineDotsHorizontal />
//               </div>
//             </Dropdown.Toggle>
//             <Dropdown.Menu className="dropdown-menu-end">
//               <Dropdown.Item>Edit</Dropdown.Item>
//               <Dropdown.Item>View</Dropdown.Item>
//               <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </div>

//     </Card>
//   );
// };

// export const TabsSection = () => {
//   // const [key, setKey] = useState<string>('basic');
//   const [activeTab, setActiveTab] = useState<string>("basic");

//   const tabOptions = [
//     {
//       key: "basic",
//       label: "Basic Details",
//       content: (
//         <div className='mt-5'>
//           <ProfileBasicDetail />
//         </div>

//       ),
//     },
//     {
//       key: "leaves",
//       label: "Manage Leaves",
//       content: (
//         <ContentContainer className="mt-5">
//           <h1>Leaves Content</h1>
//         </ContentContainer>
//       ),
//     },
//     {
//       key: "reviews",
//       label: "Reviews",
//       content: (
//         <ContentContainer className="mt-5">
//           <h1>Reviews Content</h1>
//         </ContentContainer>
//       ),
//     },
//     {
//       key: "xyz",
//       label: "Xyz",
//       content: (
//         <ContentContainer className="mt-5">
//           <h1>XYZ</h1>
//         </ContentContainer>
//       ),
//     },
//     {
//       key: "abc",
//       label: "ABC",
//       content: (
//         <ContentContainer className="mt-5">
//           <h1>ABC</h1>
//         </ContentContainer>
//       ),
//     },
//     {
//       key: "de",
//       label: "Reviews",
//       content: (
//         <ContentContainer className="mt-5">
//           <h1>Reviews Content</h1>
//         </ContentContainer>
//       ),
//     },
//   ];

//   return (
//     <CustomTabs
//       activeKey={activeTab}
//       setActiveKey={setActiveTab}
//       tabOptions={tabOptions}
//     />

//     // <Tab.Container activeKey={key} onSelect={(k) => k && setKey(k)}>
//     //   <Nav variant="tabs" className="customTabs">
//     //     <Nav.Item>
//     //       <Nav.Link eventKey="basic">Basic Details</Nav.Link>
//     //     </Nav.Item>
//     //     <Nav.Item>
//     //       <Nav.Link eventKey="partner">Partner Details</Nav.Link>
//     //     </Nav.Item>
//     //     <Nav.Item>
//     //       <Nav.Link eventKey="appointment">Appointment</Nav.Link>
//     //     </Nav.Item>
//     //     <Nav.Item>
//     //       <Nav.Link eventKey="reports">Reports</Nav.Link>
//     //     </Nav.Item>
//     //     <Nav.Item>
//     //       <Nav.Link eventKey="payment">Payment History</Nav.Link>
//     //     </Nav.Item>
//     //     <Nav.Item>
//     //       <Nav.Link eventKey="treatment">Treatment</Nav.Link>
//     //     </Nav.Item>
//     //   </Nav>

//     //   <Tab.Content className="pt-3">
//     //     <Tab.Pane eventKey="basic">
//     //       <ProfileBasicDetail />
//     //     </Tab.Pane>
//     //     <Tab.Pane eventKey="partner">
//     //       <p>Partner Details content here.</p>
//     //     </Tab.Pane>
//     //     <Tab.Pane eventKey="appointment">
//     //       <p>Appointment info goes here.</p>
//     //     </Tab.Pane>
//     //     <Tab.Pane eventKey="reports">
//     //       <p>Reports content.</p>
//     //     </Tab.Pane>
//     //     <Tab.Pane eventKey="payment">
//     //       <p>Payment History section.</p>
//     //     </Tab.Pane>
//     //     <Tab.Pane eventKey="treatment">
//     //       <p>Treatment information.</p>
//     //     </Tab.Pane>
//     //   </Tab.Content>
//     // </Tab.Container>
//   );
// };