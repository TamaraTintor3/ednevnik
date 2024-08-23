import axiosInstance from "./axiosConfig";

export const getOrCreateClassSchedule  = (classScheduleData: any) => {
    return axiosInstance.post(`/api/class-schedules/get-or-create`, classScheduleData);
};