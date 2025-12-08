import { AddPatientFormObjType, DoctorDetails, FertilityAssessmentType } from "../types/interfaces";
import { LoginRequest } from "../types/requestInterface";
import apiClient from "./axiosInstance";
import api from "./axiosInstance";

export const login = (data: LoginRequest) => {
  return apiClient.post("/auth/login", data);
};
// add Doctor
export const addDoctor = (data:DoctorDetails) =>{
  return apiClient.post("/add-doctor",data);
}
// add Patient 
export const addPatient = (data: AddPatientFormObjType) => {
  return apiClient.post("/patient/add-patient", data);
}
// getAll Patient
export const getAllPatient = () => {
  return apiClient.get("/patient/get-patient");
}



export const getAll = () => {
  const token = localStorage.getItem("token");
  return apiClient.get("/patient/get-patient", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};