import IClassProfessorRequest from "../models/IClassProfessorRequest";
import axiosInstance from "./axiosConfig";

export const getMyClass = (classProfessorRequest: IClassProfessorRequest) =>
  axiosInstance.post("/api/professors/class", classProfessorRequest);

export const getAllProfessors = async () => axiosInstance.get("api/professors");

export const getProfessors = async () => {
  return await axiosInstance.get("/api/users/professors");
};

export const assignClassToProfessor = async (userId: number, schoolClassId: number) => {
  return await axiosInstance.put(`/api/authentication/${userId}/assign-class`, null, {
    params: {
      schoolClassId: schoolClassId,
    },
  });
};

export const getProfessorBySchoolClassId = (schoolClassId: number) => {
  return axiosInstance.get(`/api/professors/school-class/${schoolClassId}`);
};

export const getProfessorById = (id:number) => axiosInstance.get("/api/professors/byId" + id)


export const getProfessorsWithoutSubject = () => axiosInstance.get("/api/professors/getProfessorsWithoutSubject")