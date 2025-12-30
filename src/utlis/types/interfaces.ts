import { StaticImageData } from "next/image";
import "../StaticData";

export type ConsultationStatus = "Active" | "Inactive" | "On Leave";

export interface User {
  id: string;
  name: string;
  email: string;
}

// interfaces.ts
export interface PatientData {
  id: string | number;
  name: string;
  ProfilePhoto?: {
    src: string;
  };
}
export interface PersonalDetails {
  _id?: string;
  profileImage: string | StaticImageData;
  name: string;
  gender: string;
  dob: string;
  contactNumber: string;
  email: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  age: number;
}
export interface EmergencyContact {
  name: string;
  contactNumber: string;
  relation: string;
  _id: string;
}
export interface BloodPressure {
  systolic: number;
  diastolic: number;
}
export interface PhysicalAssessment {
  _id?: string;
  patientId?: string;
  clinicId?: string;
  height?: number;
  weight?: number;
  bmi: number;
  bloodGroup?: string;
  bloodPressure: BloodPressure;
  heartRate: number;
  createdAt?: string;
  updatedAt?: string;
}
export interface StatusWithDetails {
  status: "Yes" | "No";
  // API sends different keys depending on section
  medicationsDetails?: string | null;
  surgeriesDetails?: string | null;
}

export interface MedicalHistoryShow {
  _id?: string;
  patientId?: string;
  clinicId?: string;

  medications: StatusWithDetails;
  surgeries: StatusWithDetails;

  conditions: string[];
  familyHistory: string;
  lifestyle: string[];

  exerciseFrequency: string;
  stressLevel: string;
}
export interface MenstrualCycle {
  ageAtFirstMenstruation: number;
  cycleLength: number;
  periodLength: number;
  lastPeriodDate: string;
  isCycleRegular: string;

  menstrualIssues: string;
  menstrualIssuesDetails: string | null;
}
export interface Pregnancy {
  pregnantBefore: string;
  pregnantBeforeDetails: string;
  tryingToConceiveDuration: string;

  miscarriageOrEctopicHistory: string;
  miscarriageOrEctopicDetails: string | null;
}
export interface FertilityAssessment {
  _id?: string;
  patientId?: string;
  clinicId?: string;
  menstrualCycle: MenstrualCycle;
  pregnancy: Pregnancy;
}
export interface PartnerBasicDetails {
  clinicId: string;
  partnerImage: string;
  partnerName: string;
  partnerGender: string;
  partnerAge: number;
  partnerContactNumber: string;
  partnerEmail: string;
}
export interface FertilityAssessmentPartner {
  semenAnalysis: string;
  semenAnalysisDetails: string;

  fertilityIssues: string;
  fertilityIssuesDetails: string;

  fertilityTreatments: string;
  fertilityTreatmentsDetails: string;

  surgeries: string;
  surgeriesDetails: string;

  id?: string;
  height?: string;
  weight?: string;
  bmi?: string;
  bloodGroup?: string;

  bloodPressureSystolic?: string;
  bloodPressureDiastolic?: string;

  heartRate?: string;
  // semenAnalysis: string;
  semenAnalysisContent?: string;
  // fertilityIssues: string;
  fertilityIssuesContent?: string;
  fertilityTreatment?: string;
  fertilityTreatmentContent?: string;
  // surgeries: string;
  surgeriesContent?: string;
}
export interface PartnerBasicDetailsForm {
  patientId?: string | number;
  partnerImage: string;
  partnerName: string;
  partnerGender: string;
  partnerAge: string | number;
  partnerContactNumber: string;
  partnerEmail: string;
}
export interface partnerMedicalHistory {
  patientId?: string | number;

  medications?: {
    status: string;
    details?: string | null;
  };

  surgeries?: {
    status: string;
    details?: string | null;
  };

  conditions?: string[];

  familyHistory?: string;

  lifestyle?: string[];

  exerciseFrequency?: string;

  stressLevel?: string;
}
export interface FertilityAssessmentPartnerShow {
  clinicId: string;

  semenAnalysis: {
    status: "Yes" | "No";
    semenAnalysisDetails: string | null;
  };

  fertilityIssues: {
    status: "Yes" | "No";
    fertilityIssuesDetails: string | null;
  };

  fertilityTreatments: {
    status: "Yes" | "No";
    fertilityTreatmentsDetails: string | null;
  };

  surgeries: {
    status: "Yes" | "No";
    surgeriesDetails: string | null;
  };
}
export interface PartnerDetails {
  _id: string;
  patientId: string;
  clinicId: string;
  basicDetails: PartnerBasicDetails;
  physicalAssessment: PhysicalAssessment[] | null;
  medicalHistory: MedicalHistoryShow | null;
  fertilityAssessment: FertilityAssessmentPartnerShow | null;
}
export interface PatientData {
  _id: string;
  personalDetails: PersonalDetails;
  emergencyContact: EmergencyContact;
  verified: boolean;
  patientId: number;
  physicalAssessment: PhysicalAssessment[]; // Updated
  medicalHistory: MedicalHistoryShow | null; // Updated
  fertilityAssessment: FertilityAssessment | null; // Updated
  partnerDetails: PartnerDetails | null; // Updated
}
export interface BookAppointmentForm {
  name: string;
  status?: string;
  // Appointment Details
  id: string;
  appointmentId: string;
  type: string;
  reasonForVisit?: string[]; // multi-select = array
  appointmentDate: string;
  appointmentTime: string;
  forTime: string;
  additionalNote: string;

  // Patient Details
  patientName: SelectPatientType | null; // object (NOT array)
  phone: string;
  email: string;
  patientAge: string;
  gender: string;
  selectedDoctor?: Doctor | null;
}

export interface AppointmentData {
  status: string;
  visit: string[];
  name: string;
  image: string | StaticImageData;
  id: number;
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
}
export interface PhysicalAssessmentDataModel {
  _id?: string;

  patientId: string;
  height: string;
  weight: string;
  bmi: string;
  bloodGroup: string;
  bloodPressureSystolic: string;
  bloodPressureDiastolic: string;
  heartRate: string;
}
export interface CancelAppointmentForm {
  reasonForCancel: string;
  additionalNote: string;
}

export interface PhysicalAssessmentData {
  id: string;
  date: string;
  height: string;
  weight: string;
  bmi: string;
  bloodGroup: string;
  systolic: string;
  diastolic: string;
  heartRate: string;
}

export interface FertilityAssessmentData {
  date: string;
  semenAnalysis: string;
  semenAnalysisContent?: string;
  fertilityIssues: string;
  fertilityIssuesContent?: string;
  fertilityTreatment: string;
  fertilityTreatmentContent?: string;
  surgeries: string;
  surgeriesContent?: string;
}

export interface FertilityAssessmentHistory {
  semenAnalysis: string;
  semenAnalysisContent?: string;
  fertilityIssues: string;
  fertilityIssuesContent?: string;
  fertilityTreatment: string;
  fertilityTreatmentContent?: string;
  surgeries: string;
  surgeriesContent?: string;
}

export interface AddPatientFormData {
  profileImage: string;
  bloodGroup: string;
  // Personal details

  name: string;
  patientId: string;
  gender: string;
  date: string;
  age: string;
  phone: string;
  email: string;
  address: string;
  pincode: string;
  city: string;
  state: string;

  // Emergency contact
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
}

export interface RescheduleAppointmentForm {
  reason: string;
  type: string;
  reasonForVisit: [];
  appointmentDate: string;
  appointmentTime: string;
  forTime: string;
  additionalNote: string;
}

export interface CancelAppointmentForm {
  reasonForCancel: string;
  additionalNote: string;
}

export interface SelectPatientType {
  id: string;
  ProfilePhoto: StaticImageData;
  name: string;
}
export type FertilityAssessmentType = {
  id?: string;
  height?: string;
  weight?: string;
  bmi?: string;
  bloodGroup?: string;

  bloodPressureSystolic?: string;
  bloodPressureDiastolic?: string;

  heartRate?: string;
  semenAnalysis: string;
  semenAnalysisContent: string;
  fertilityIssues: string;
  fertilityIssuesContent: string;
  fertilityTreatment: string;
  fertilityTreatmentContent: string;
  surgeries: string;
  surgeriesContent: string;
};

// export type FertilityAssessmentSeprateType = {};

export interface EditFertilityAssessment {
  semenAnalysis: string;
  semenAnalysisDetails: string;
  fertilityIssues: string;
  fertilityIssuesDetails: string;
  fertilityTreatment: string;
  fertilityTreatmentsDetails: string;
  surgeries: string;
  surgeriesDetails: string;
}

export type OptionType = { value: string; label: string };

export interface SelectPatientType {
  id: string;
  ProfilePhoto: StaticImageData;
  name: string;
}

export interface MedicalHistoryType {
  medication: string;
  surgeries: string;
  // surgeriesContent: string,
  medicalCondition: OptionType[];
  familyMedicalHistory: string;
  lifestyle: OptionType[];
  stress: string;
  exercise: string;
  medicationcontent: string;
  surgeriescontent: string;
}

export interface TreatmentPlan {
  treatment: string;
  duration: string;
}
export type PatientType = {
  id: string;
  name: string;
  ProfilePhoto?: { src: string } | null;
  // add other fields if present
};
export interface TreatmentForm {
  patientName: PatientType | null;
  treatment: string;
  duration: string;
}

export interface TreatmentPlanEditType {
  selectpatient: string;
  treatment: string;
  duration: string;
}

export interface TreatmentProgressStatusType {
  stepName: string;
  status: string;
  notes: string;
  updates: string;
}

export interface TreatmentTerminationType {
  reasonForTermination: string;
  additionalNote: string;
}

export interface EditTreatmentPlanType {
  treatmentplan: TreatmentPlanEditType;
  medicalPrescription: MedicationPrescriptionType[];
  tests: OptionType[];
  followUpAction: FollowUpActionFromType;
}

export interface ProgressUpdatesType {
  patient?: FertilityAssessmentFormType;
  partner?: FertilityAssessmentHistory;
  medicalPrescription: MedicationPrescriptionType[];
  report: (UploadedFile | PatientReportType)[];
  StatusAndUpdates: TreatmentProgressStatusType;
}

export interface MedicationPrescriptionType {
  id: string;
  medicineName: string;
  type: string;
  typeQuantity: string;
  duration: string;
  quantity: number;
  timeslot: string[];
  meal: string;
  intake: string;
  description: string;
}

export interface TreatmentPlanFormData {
  treatmentPlan: TreatmentPlan;
  medicationPrescription: MedicationPrescriptionType[];
}

export interface FollowUpActionFromType {
  nextStep: string;
  appointmentDate: string;
  appointmentTime: string;
  forTime: string;
  instructionsForPatient: string;
}

export interface PaymentFormData {
  amount: string;
  status: string;
  mode: string;
}

export interface MedicationTests {
  tests: OptionType[];
}

export type ScheduleTimeOff = {
  startDate: string;
  toDate: string;
  noOfDays: string;
  reason?: string;
  checkbox1: boolean;
  additionalNote?: string;
};

export interface FertilityAssessmentFormType {
  fertilityAssessmentId?: string;
  _id?: string;
  ageAtFirstMenstruation: string;
  cycleLength: string;
  periodLength: string;
  lastPeriodDate: string;
  date?: string;

  isCycleRegular: string;

  menstrualIssues: string;
  menstrualIssuesDetails: string;

  pregnantBefore: string;
  pregnantBeforeDetails: string;

  tryingToConceiveDuration: string;

  miscarriageOrEctopicHistory: string;
  miscarriageOrEctopicDetails: string | null;
  pregnancy?: string;
  timeduration?: string;
  ectopicpregnancy?: string;
}

export interface TreatmentFertilityAssessmentFormType {
  patient: FertilityAssessmentFormType;
  partner: FertilityAssessmentHistory;
  medicalPrescription?: MedicationPrescriptionType[];
  report?: PatientReportType[];
  StatusAndUpdates?: TreatmentProgressStatusType;
}

export interface PatientJourneyItem {
  id: string;
  title: string;
  date: string;
  time: string;
  status: "Success" | "In Progress" | "Pending" | "Failed";
}

export interface PatientCalenderFormType {
  tests: OptionType[];
  status: OptionType[];
  symptoms: OptionType[];
  additionalNote: string;
}

export interface PatientReportType {
  reportName: string;
  name: string;
  size: string;
  uploadedAt: number;
}
interface PatientDatareport {
  ageAtFirstMenstruation: string;
  cycleLength: string;
  periodLength: string;
  date: string;
  isCycleRegular: string;
  menstrualIssues: string;
  pregnancy: string;
  timeduration: string;
  ectopicpregnancy: string;
}

interface PartnerData {
  semenAnalysis: string;
  semenAnalysisContent: string;
  fertilityIssues: string;
  fertilityIssuesContent: string;
  fertilityTreatment: string;
  fertilityTreatmentContent: string;
  surgeries: string;
  surgeriesContent: string;
}

interface StatusAndUpdates {
  stepName: string;
  status: string;
  notes: string;
}

interface UploadedFile {
  name: string;
  size: string;
  progress?: number;
  status: "uploading" | "completed";
  reportName: string;
  uploadedAt?: number;
  date?: string;
  preview?: string;
  actualSize?: string;
}
interface ProgressUpdatesData {
  patient: PatientDatareport;
  partner: PartnerData;
  medicalPrescription: OptionType[]; // If you have a proper type for this, replace any[]
  report: UploadedFile[];
  StatusAndUpdates?: StatusAndUpdates | StatusAndUpdates[]; // Because your static data has an array
}

export interface ClinicContactPerson {
  name: string;
  contactNumber: string;
  email: string;
  aadharNumber: string;
}
// export type GroupOperationalHours =
//   | {
//       type: "COMMON";
//       common: {
//         mondayFriday: string;
//         saturdaySunday: string;
//       };
//     }
//   | {
//       type: "CUSTOM";
//       custom: {
//         monday: string;
//         tuesday: string;
//         wednesday: string;
//         thursday: string;
//         friday: string;
//         saturday: string;
//         sunday: string;
//       };
//     };

export interface GroupOperationalHours {
  weekdayOpen: string;
  weekdayClose: string;
  weekendOpen: string;
  weekendClose: string;
}
export interface OperationalHour {
  _id?: string;
  day: string;
  openTime: string;
  closeTime: string;
}
export interface ClinicDetails {
  _id?: string;
  // groupOperationalHours: any;
  clinicLogo: string;
  clinicType?: string;
  clinicName: string;
  contactNumber: string;
  email: string;
  address: string;
  mapLink: string;
  pincode: string;
  city: string;
  state: string;
  useCustomHours: boolean;
  // API data
  operationalHours?: OperationalHour[];

  // Used elsewhere
  groupOperationalHours?: GroupOperationalHours;

  contactPerson: ClinicContactPerson;
}

export interface Qualification {
  field?: string;
  _id?: string;
  doctorId?: string;
  degree: string;
  fieldOfStudy: string;
  university: string;
  startYear: number;
  endYear: number;
}

export interface OtherDocument {
  fileSize?: number;
  updatedAt?: string;
  reportName?: string;
  filePath?: string;
  originalName?: string;
}

// export interface KycDetails {
//   createdAt: any;
//   aadharNumber: string;
//   aadharFile: string;
//   panNumber: string;
//   panFile: string;
//   licenceNumber: string;
//   licenceFile: string;
//   otherDocuments: OtherDocument[];
// }
export interface KycDetails {
  aadharNumber?: string;
  aadharFile?: string;
  aadharSize?: string;
  otherDocuments: OtherDocument[];

  panNumber?: string;
  panFile?: string;
  panSize?: string;

  licenceNumber?: string;
  licenceFile?: string;
  licenceSize?: string;

  updatedAt?: string;
}

export interface DoctorDocument {
  aadharNumber?: string;
  panNumber?: string;
  licenceNumber?: string;
  reportName?: string;
  filePath?: string;
  updatedAt?: string;
}

// addDoctor interface
export interface DoctorDetails {
  updatedAt: string | number | Date;
  createdAt: string | number | Date;
  profilePicture: string;
  name: string;
  specialty: string;
  yearsOfExperience: number;
  dob: string;
  gender: string;
  about?: string;
  fees: number;
  servicesOffered: string[];
  memberSince?: string;
  contactNumber: string;
  documents?: DoctorDocument[];
  email: string;
  clinicDetails?: ClinicDetails;

  clinics?: ClinicDetails[];
  qualifications: Qualification[];
  kycDetails?: KycDetails ;

  _id?: string;
}

export interface personalDetails {
  profileImage: string;
  name: string;
  email: string;
  gender: string;
  dob: string;
  contactNumber: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
}

export interface emergencyContact {
  name: string;
  contactNumber: string;
  relation: string;
}

export interface AddPatientFormObjType {
  personalDetails: personalDetails;
  emergencyContact: emergencyContact;
  type: string;
}
// get all doctor
export interface Doctor {
  ProfilePhoto: string | StaticImageData | { src: string } | null;
  _id: string;
  name: string;
  specialty: string;
  verified: boolean;
  profilePicture: string; // URL string
}
export interface GetAllPatient {
  status: string;
  _id: string;
  verified: boolean;
  profileImage: string;
  name: string;
  gender: string;
  dob: string; // ISO date string
  contactNumber: string;
  email: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  age: number;
  doctor: Doctor;
}

// medical history
type Medications = {
  status: string;
  medicationsDetails: string;
};
type Surgeries = {
  status: string;
  surgeriesDetails: string;
};
export interface MedicalHistory {
  patientId: string;
  medications: Medications;
  surgeries: Surgeries;
  conditions: string[];
  familyHistory: string;
  lifestyle: string[];
  exerciseFrequency: string;
  stressLevel: string;
}
// partner basic details

export interface PartnerBasicDetail {
  patientId: string;
  partnerImage: string;
  partnerName: string;
  partnerContactNumber: string;
  partnerEmail: string;
  partnerGender: string;
  partnerAge: string;
}

export interface Appointment {
  patient_id: string;
  doctor_id: string;
  reason: string;
  type: string;
  appointmentDate: string;
  appointmentTime: string;
}
export interface RescheduleAppointment {
  appointmentId: string;
  newDate: string;
  newTime: string;
  reason: string;
}
export interface ReassignDoctor {
  appointmentId: string;
  doctorId: string;
  reason: string;
  notes: string;
}
export interface CancelAppointment {
  appointmentId: string;
  reason: string;
}
export interface ClinicPhoto {
  _id?: string;
  src?: string;
  url: string;
  logo: boolean;
}
export interface ClinicDocument {
  date?: string;
  url: string;
  type?: string;
  name?: string;
}
export interface clinicData {
  _id: string;
  is_24_7: boolean;
  clinicLogo: string;
  clinicName: string;
  clinicType: string;
  verified: boolean;

  contactNumber: string;
  email: string;

  address: string;
  city: string;
  state: string;
  pincode: string;

  mapLink: string;

  useCustomHours: boolean;
  operationalHours: ProfileOperationalHour[];

  contactPerson: ContactPerson;

  documents?: ClinicDocument[];

  reviews: Review[];
  reviewCount: number;
  averageRating: number;

  photos: ClinicPhoto[];
  servicesOffered: string[];

  emergencyDoctorsAvailable_24_7: boolean;
  doctorOnboard: number;
  beds: number;

  __v: number;
}

/* ---------------- Sub Interfaces ---------------- */

export interface ContactPerson {
  name: string;
  contactNumber: string;
  email: string;
  aadharNumber: string;
}

export interface ProfileOperationalHour {
  _id?: string;
  day: string;
  openTime: string;
  closeTime: string;
}
export interface PatientPersonalDetails {
  name: string;
  profileImage: string;
}
export interface Patient {
  personalDetails: PatientPersonalDetails;
}
export interface Review {
  _id: string;
  rating: number;
  reason: string;
  comment: string;
  date: string; // ISO string
  happyWith: string[];
  patient: Patient;

  // optional backend fields
  createdAt?: string;
  updatedAt?: string;
}
