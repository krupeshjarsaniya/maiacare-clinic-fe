import { FertilityAssessmentType } from "../types/interfaces";
import { LoginRequest } from "../types/requestInterface";
import apiClient from "./axiosInstance";
import api from "./axiosInstance";

export const login = (data: LoginRequest) => {
  return apiClient.post("/clinic-login", data);
};