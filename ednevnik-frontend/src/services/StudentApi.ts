import axiosInstance from "./axiosConfig";

export const getStudentDetails = (studentId: number) =>
  axiosInstance.get("/api/students/" + studentId);
