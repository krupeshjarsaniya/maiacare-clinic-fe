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
} from "../types/interfaces";
import { LoginRequest } from "../types/requestInterface";
import apiClient from "./axiosInstance";

// ====: Authentication :====
// done
export const login = (data: LoginRequest) => {
  return apiClient.post("/auth/clinic-login", data);
};

// ====: Profile :====
// done get
// get profile
export const getProfile = () => {
  const token = localStorage.getItem("token");
  return apiClient.get("/clinic-info");
};
// done
// logout
export const logout = () => {
  return apiClient.post("/clinic-logout");
};

// done update
// update profile
export const updateProfile = (data: object) => {
  return apiClient.put("/clinic-update", data);
};
// ====: Patient :====
// add Patient //done
export const addPatient = (data: AddPatientFormObjType) => {
  return apiClient.post("/add-patient", data);
};
// getAll Patient //done
export const getAll = (data: object) => {
  return apiClient.post("/get-patients", data);
};

// get patient info //done
export const getPatientInfo = (id: string | number) => {
  return apiClient.get(`/get-patient/${id}`);
};
// update patient
//not done data is get but not updated
export const updatePatient = (id: string | number, data: object) => {
  return apiClient.put(`/update-patient/${id}`, data);
};

// done
// ====: Physical assesment :====
// add Physical assesment
export const addPhysicalAssessment = (data: object) => {
  return apiClient.post("/patient/physical-assessment", data);
};
// get Physical assesment
export const getPhysicalAssessment = () => {
  return apiClient.get("/patient/physical-assessment");
};
// update Physical assesment
export const updatePhysicalAssessment = (updatedata: object) => {
  return apiClient.put("/patient/physical-assessment", updatedata);
};

// done
// ====: Fertility assesment :====
// add Fertility assesment
export const addFertilityAssessment = (data: object) => {
  return apiClient.post("/patient/fertility-assessment", data);
};

// get Fertility assesment
export const getFertilityAssessment = (id: string | number) => {
  return apiClient.get(`/patient/fertility-assessment/${id}`);
};

// update Fertility assesment
export const updateFertilityAssessment = (updatedata: object) => {
  return apiClient.put("/patient/fertility-assessment", updatedata);
};

// done
// ====:Medical History :====
// add Medical History
export const addMedicalHistory = (data: object) => {
  return apiClient.post("/patient/medical-history", data);
};
// get Medical History
export const getMedicalHistory = (id: string | number) => {
  return apiClient.get(`/patient/medical-history/${id}`);
};
// update Medical History
export const updateMedicalHistory = (data: object) => {
  return apiClient.put("/patient/medical-history", data);
};
// done
// ====: Patient Partner :====
// Partner Basic Details
// add
export const addPatientPartnerBasicDetails = (data: object) => {
  return apiClient.post("/patient/partner/basicDetails", data);
};

// get
export const getPatientPartnerBasicDetails = (id: string | number) => {
  return apiClient.get(`/patient/partner/basicDetails/${id}`);
};

// update
export const updatePatientPartnerBasicDetails = (data: object) => {
  return apiClient.put("/patient/partner/basicDetails", data);
};
// done
// Partner Medical History
// add
export const addPatientPartnerMedicalHistory = (data: object) => {
  return apiClient.post("/patient/partner/medicalHistory", data);
};

// get
export const getPatientPartnerMedicalHistory = (id: string | number) => {
  return apiClient.get(`/patient/partner/medicalHistory/${id}`);
};

// update
export const updatePatientPartnerMedicalHistory = (data: object) => {
  return apiClient.put("/patient/partner/medicalHistory/", data);
};
// done
// Partner Physical Assessment
// add
export const addPatientPartnerPhysicalAssessment = (data: object) => {
  return apiClient.post("/patient/partner/physicalAssessment", data);
};
// get
export const getPatientPartnerPhysicalAssessment = () => {
  return apiClient.get("/patient/partner/physicalAssessment");
};
// update
export const updatePatientPartnerPhysicalAssessment = (data: object) => {
  return apiClient.put("/patient/partner/physicalAssessment", data);
};
// done
// Partner Fertility Assessment
// add
export const addPatientPartnerFertilityAssessment = (data: object) => {
  return apiClient.post("/patient/partner/fertilityAssessment", data);
};
// get
export const getPatientPartnerFertilityAssessment = (id: string | number) => {
  return apiClient.get(`/patient/partner/fertilityAssessment/${id}`);
};
// update
export const updatePatientPartnerFertilityAssessment = (data: object) => {
  return apiClient.put("/patient/partner/fertilityAssessment", data);
};

// ====: Doctor :====
// done add
// add Doctor
export const addDoctor = (data: object) => {
  return apiClient.post("/add-doctor", data);
};
// edit doctor
export const editDoctor = (data: object) => {
  return apiClient.put("/update-doctor", data);
};
// done get
// get Doctor
export const getDoctor = (id: string | number) => {
  return apiClient.get(`/get-doctor/${id}`);
};
// done doctors list
//get-doctors-list
export const getDoctorsList = (params: {
  limit?: number;
  page?: number;
  search?: string;
  status?: string;
}) => {
  return apiClient.get("/get-doctors-list", {
    params,
  });
};
// done qualifications
// Qualifications....
// done add
// add
export const addQualifications = (
  data: Qualification[],
  id: string | number
) => {
  return apiClient.post(`/doctor/qualifications/${id}`, data);
};
// done edit
// edit
export const editQualifications = (
  data: Qualification,
  id: string | number
) => {
  return apiClient.put(`/doctor/qualifications/${id}`, data);
};
// done delete
// delete
export const deleteQualifications = ({
  qualificationId,
  doctorId,
}: {
  qualificationId: string;
  doctorId: string | number;
}) => {
  return apiClient.delete(`/doctor/qualifications-delete/${qualificationId}`, {
    data: { doctorId }, // ✅ correct way
  });
};

// manage-leaves
// done add leave
// add leave
export const createleave = (data: object) => {
  return apiClient.post("/doctor/create-leave", data);
};
// done get leave
// get leave
export const getLeave = (data: object) => {
  return apiClient.post(`/doctor/get-leaves`, data);
};
// done delete
// delete leave
export const deleteLeave = (
  leaveId: string | number,
  doctorId: string | number
) => {
  return apiClient.delete(`/doctor/delete-leave/${leaveId}`, {
    data: {
      doctorId: String(doctorId),
    },
  });
};
// done update
// update leave
export const updateLeave = (payload: object) => {
  return apiClient.post(
    "/doctor/update-leave",
    payload, // ✅ BODY
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
// ====: Get Assigned Patients :====
// done
// get assigned patients
export const getAssigned = (data: object) => {
  return apiClient.post("/get-assigned-patients", data);
};
// ====:doctor-profile-status :====
// done
// get Profile Status
export const getProfileStatus = (data: object) => {
  return apiClient.post("/doctor-profile-status", data);
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
// done but some data is missing in API
// get appointment by id (view appointment)
export const getAppointmentById = (id: string | number) => {
  return apiClient.get(`/appointments/get-appointment/${id}`);
};

// get-appointments-patient (patient)
export const getAppointmentsPatient = (data: object) => {
  return apiClient.post("/get-appointments-patient", data);
};

//  ====: Reschedule Appointment :====
// done
// add Reschedule Appointment
export const addRescheduleAppointment = (data: object) => {
  return apiClient.post("/appointments/reschedule-appointment", data);
};

//  ====: Reassign Appointment :====
// add Reassign Appointment
export const addReassignAppointment = (data: object) => {
  return apiClient.post("/appointments/reassign-doctor", data);
};

// ====: Cancel Appointment :====
// done cancel appointment
// add Cancel Appointment
export const addCancelAppointment = (data: object) => {
  return apiClient.post("/appointments/cancel-appointment", data);
};

// ====:Get Appointments :====
// done in doctor
// done list view- appointment
// get Appointments
export const getAppointments = (data: object) => {
  return apiClient.post("/appointments/get-appointments", data);
};
