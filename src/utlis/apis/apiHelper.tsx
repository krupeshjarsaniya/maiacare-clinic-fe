import {
  AddPatientFormObjType,
  Appointment,
  CancelAppointment,
  DoctorDetails,
  FertilityAssessmentType,
  MedicalHistory,
  PartnerBasicDetail,
  PhysicalAssessmentDataModel,
  Qualification,
  ReassignDoctor,
  RescheduleAppointment,
} from "../types/interfaces";
import { LoginRequest } from "../types/requestInterface";
import apiClient from "./axiosInstance";
import api from "./axiosInstance";

// ====: Authentication :====
export const login = (data: LoginRequest) => {
  return apiClient.post("/auth/login", data);
};

// ====: Patient :====
// add Patient
export const addPatient = (data: AddPatientFormObjType) => {
  return apiClient.post("/patient/add-patient", data);
};
// getAll Patient
export const getAll = () => {
  const token = localStorage.getItem("token");
  return apiClient.get("/patient/get-patient", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// get patient info
export const getPatientInfo = (id: string | number) => {
  return apiClient.get(`/patient/get-patient-info/${id}`);
};
// update patient
export const updatePatient = (id: string | number) => {
  return apiClient.put(`/patient/update-patient/${id}`);
};

// ====: Physical assesment :====
// add Physical assesment
export const addPhysicalAssessment = (data: PhysicalAssessmentDataModel) => {
  return apiClient.post("/patient/physical-assessment", data);
};
// get Physical assesment
export const getPhysicalAssessment = () => {
  return apiClient.get("/patient/physical-assessment");
};
// update Physical assesment
export const updatePhysicalAssessment = (data: PhysicalAssessmentDataModel) => {
  return apiClient.put("/patient/physical-assessment", data);
};

// ====: Fertility assesment :====
// add Fertility assesment
export const addFertilityAssessment = (data: FertilityAssessmentType) => {
  return apiClient.post("/patient/fertility-assessment", data);
};

// get Fertility assesment
export const getFertilityAssessment = (id: string | number) => {
  return apiClient.get(`/patient/fertility-assessment/${id}`);
};

// update Fertility assesment
export const updateFertilityAssessment = (data: FertilityAssessmentType) => {
  return apiClient.put("/patient/fertility-assessment", data);
};

// ====:Medical History :====
// add Medical History
export const addMedicalHistory = (data: MedicalHistory) => {
  return apiClient.post("/patient/medical-history", data);
};
// get Medical History
export const getMedicalHistory = (id: string | number) => {
  return apiClient.get(`/patient/medical-history/${id}`);
};
// update Medical History
export const updateMedicalHistory = (data: MedicalHistory) => {
  return apiClient.put("/patient/medical-history", data);
};

// ====: Patient Partner :====
// Partner Basic Details
// add
export const addPatientPartnerBasicDetails = (data: PartnerBasicDetail) => {
  return apiClient.post("/patient/partner/basicDetails", data);
};

// get
export const getPatientPartnerBasicDetails = (id: string | number) => {
  return apiClient.get(`/patient/partner/basicDetails/${id}`);
};

// update
export const updatePatientPartnerBasicDetails = (data: PartnerBasicDetail) => {
  return apiClient.put("/patient/partner/basicDetails", data);
};

// Partner Medical History
// add
export const addPatientPartnerMedicalHistory = (data: MedicalHistory) => {
  return apiClient.post("/patient/partner/medicalHistory", data);
};

// get
export const getPatientPartnerMedicalHistory = (id: string | number) => {
  return apiClient.get(`/patient/partner/medicalHistory/${id}`);
};

// update
export const updatePatientPartnerMedicalHistory = (data: MedicalHistory) => {
  return apiClient.put("/patient/partner/medicalHistory", data);
};

// Partner Physical Assessment
// add
export const addPatientPartnerPhysicalAssessment = (
  data: PhysicalAssessmentDataModel
) => {
  return apiClient.post("/patient/partner/physicalAssessment", data);
};
// get
export const getPatientPartnerPhysicalAssessment = () => {
  return apiClient.get("/patient/partner/physicalAssessment");
};
// update
export const updatePatientPartnerPhysicalAssessment = (
  data: PhysicalAssessmentDataModel
) => {
  return apiClient.put("/patient/partner/physicalAssessment", data);
};

// Partner Fertility Assessment
// add
export const addPatientPartnerFertilityAssessment = (
  data: FertilityAssessmentType
) => {
  return apiClient.post("/patient/partner/fertilityAssessment", data);
};
// get
export const getPatientPartnerFertilityAssessment = (id: string | number) => {
  return apiClient.get(`/patient/partner/fertilityAssessment/${id}`);
};
// update
export const updatePatientPartnerFertilityAssessment = (
  data: FertilityAssessmentType
) => {
  return apiClient.put("/patient/partner/fertilityAssessment", data);
};

// ====: Doctor :====
// add Doctor
export const addDoctor = (data: DoctorDetails) => {
  return apiClient.post("/doctor/add-doctor", data);
};
// edit doctor
export const editDoctor = (data: DoctorDetails) => {
  return apiClient.put("/doctor/update-doctor", data);
};
// get Doctor
export const getDoctor = (id: string | number) => {
  return apiClient.get(`/doctor/get-doctor/${id}`);
};

// Qualifications....
// add
export const addQualifications = (data: Qualification, id: string | number) => {
  return apiClient.post(`/doctor/qualifications/${id}`, data);
};
// edit
export const editQualifications = (
  data: Qualification,
  id: string | number
) => {
  return apiClient.put(`/doctor/qualifications/${id}`, data);
};
// delete
export const deleteQualifications = (id: string | number) => {
  return apiClient.delete(`/doctor/qualifications/${id}`);
};

// ====: Appointments :====
// add Appointment
export const addAppointment = (data: Appointment) => {
  return apiClient.post("/appointments/create-appointment", data);
};
// get patient info
export const getAppointmentPatientInfo = (id: string | number) => {
  return apiClient.get(`/appointments/getshort-patient-info/${id}`);
};

//  ====: Reschedule Appointment :====
// add Reschedule Appointment
export const addRescheduleAppointment = (data: RescheduleAppointment) => {
  return apiClient.post("/appointments/reschedule-appointment", data);
};

//  ====: Reassign Appointment :====
// add Reassign Appointment
export const addReassignAppointment = (data: ReassignDoctor) => {
  return apiClient.post("/appointments/reassign-doctor", data);
};

// ====: Cancel Appointment :====
// add Cancel Appointment
export const addCancelAppointment = (data: CancelAppointment) => {
  return apiClient.post("/appointments/cancel-appointment", data);
};