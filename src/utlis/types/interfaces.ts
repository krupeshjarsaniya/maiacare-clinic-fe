import { StaticImageData } from "next/image";
import "../StaticData";
// import StaticImageData from "../../assets/images/Simpleeditpro.png";

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

export interface BookAppointmentForm {
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
  patientName: PatientData | null; // object (NOT array)
  phone: string;
  email: string;
  patientAge: string;
  gender: string;
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
  semenAnalysisContent: string;
  fertilityIssues: string;
  fertilityIssuesContent: string;
  fertilityTreatment: string;
  fertilityTreatmentContent: string;
  surgeries: string;
  surgeriesContent: string;
}

export type OptionType = { value: string; label: string };

export interface SelectPatientType {
  id: string;
  ProfilePhoto: StaticImageData;
  name: string;
}

export interface MedicalHistoryType {
  medication: string;
  medicationcontent: string;

  surgeries: string;
  surgeriesContent: string;

  currentMedication?: string;

  MedicalconditionAllergies: OptionType[];

  familyMedicalHistory: string;

  lifestyle: OptionType[];

  exercise: string;
  stress: string;
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

export interface GroupOperationalHours {
  weekdayOpen: string;
  weekdayClose: string;
  weekendOpen: string;
  weekendClose: string;
}

export interface ClinicDetails {
  clinicLogo: string;
  clinicName: string;
  contactNumber: string;
  email: string;
  address: string;
  mapLink: string;
  pincode: string;
  city: string;
  state: string;
  useCustomHours: boolean;
  groupOperationalHours: GroupOperationalHours;
  contactPerson: ClinicContactPerson;
}

export interface Qualification {
  degree: string;
  fieldOfStudy: string;
  university: string;
  startYear: number;
  endYear: number;
}

export interface OtherDocument {
  reportName: string;
  filePath: string;
  originalName: string;
}

export interface KycDetails {
  aadharNumber: string;
  aadharFile: string;
  panNumber: string;
  panFile: string;
  licenceNumber: string;
  licenceFile: string;
  otherDocuments: OtherDocument[];
}
// addDoctor interface
export interface DoctorDetails {
  profilePicture: string;
  name: string;
  specialty: string;
  yearsOfExperience: number;
  dob: string;
  gender: string;
  fees: number;
  servicesOffered: string[];
  contactNumber: string;
  email: string;
  clinicDetails: ClinicDetails;
  qualifications: Qualification[];
  kycDetails: KycDetails;
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
  _id: string;
  name: string;
  specialty: string;
  verified: boolean;
  profilePicture: string; // URL string
}
export interface GetAllPatient {
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
