import axiosInstance from "./axiosConfig";
import { AbsencePayload } from "../interfaces/AbsencePayload";

export const addAbsence = (payload: AbsencePayload) => {
    return axiosInstance.post('/api/absences/add', payload);
};