import { StaticImageData } from "next/image";
import  "../StaticData";
// import StaticImageData from "../../assets/images/Simpleeditpro.png";


export type ConsultationStatus = "Active" | "Inactive" | "On Leave";



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
export interface PhysicalAssessmentDataModel {
  id: string;
  height: string;
  weight: string;
  bmi: string;
  bloodGroup: string
  systolic: string;
  diastolic: string;
  heartRate: string;
};


export interface PhysicalAssessmentData {
  date: string;
  height: string;
  weight: string;
  bmi: string;
  bloodGroup: string;
  bloodPressure: string;
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

// export interface BookAppointmentForm {
//   //Appointment Details

//   appointmentId: string;
//   type: string;
//   reasonForVisit: string[];
//   appointmentDate: string;
//   appointmentTime: string;
//   forTime: string;
//   additionalNote: string;

//   //Patient Details
//   // patientName: SelectPatientType | null;
//   patientName: any;
//   phone: string;
//   email: string;
//   patientAge: string;
//   gender: string;
// }
export interface SelectPatientType {
  id: string;
  ProfilePhoto: StaticImageData;
  name: string;
}

export interface FertilityAssessmentType {
  height: string;
  weight: string;
  bmi: string;
  bloodGroup: string;
  systolic: string;
  diastolic: string;
  heartRate: string;
  semenAnalysis: string;
  semenAnalysisContent: string;
  fertilityIssues: string;
  fertilityIssuesContent: string;
  fertilityTreatment: string;
  fertilityTreatmentContent: string;
  surgeries: string;
  surgeriesContent: string;
}

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
  medication: string,
  surgeries: string,
  surgeriesContent: string,
  medicalCondition: OptionType[],
  familyMedicalHistory: string,
  lifestyle: OptionType[],
  stress: string,
  exercise: string,
  medicationcontent: string,
  surgeriescontent: string,

};

export interface TreatmentPlan {
  treatment: string;
  duration: string;
}

export interface TreatmentForm {
  patientName: string;
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
}

export interface TreatmentTerminationType {
  reasonForTermination: string;
  additionalNote: string;
}

export interface EditTreatmentPlanType {
  treatmentplan: TreatmentPlanEditType,
  medicalPrescription: MedicationPrescriptionType[],
  tests: OptionType[],
  followUpAction: FollowUpActionFromType
}

export interface ProgressUpdatesType {
  patient: FertilityAssessmentFormType;
  partner: FertilityAssessmentHistory;
  medicalPrescription: MedicationPrescriptionType[];
  report : PatientReportType[]
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
  tests: OptionType[],
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
}

export interface PatientJourneyItem {
  id: string;
  title: string;
  date: string;
  time: string;
  status: 'Success' | "In Progress" | 'Pending' | 'Failed';
}

export interface PatientCalenderFormType {
  tests: OptionType[],
  status: OptionType[],
  symptoms: OptionType[],
  additionalNote: string
}

export interface PatientReportType {
  reportName: string;
  name: string;
  size: string;
  uploadedAt: number;
}