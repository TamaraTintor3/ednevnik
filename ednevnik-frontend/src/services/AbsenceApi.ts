import axiosInstance from "./axiosConfig";
import { AbsencePayload } from "../interfaces/AbsencePayload";

export const addAbsence = (payload: AbsencePayload) => {
    return axiosInstance.post('/api/absences/add', payload);
};

export const getAbsencesByStudentId = (studentId: number) => {
    return axiosInstance.get(`/api/absences/student/${studentId}`);
  };

  export const updateAbsence = (id: number, data: { reason: string; approved: boolean }) => {
    return axiosInstance.put(`/api/absences/${id}`, data);
  };

  export const getStudentById = (studentId: number) => {
    return axiosInstance.get(`/api/students/absence${studentId}`);
}