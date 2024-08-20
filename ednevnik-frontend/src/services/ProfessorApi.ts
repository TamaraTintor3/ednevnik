import IClassProfessorRequest from "../models/IClassProfessorRequest";
import axiosInstance from "./axiosConfig";

export const getMyClass = (classProfessorRequest: IClassProfessorRequest) =>
  axiosInstance.post("/api/professors/class", classProfessorRequest);
