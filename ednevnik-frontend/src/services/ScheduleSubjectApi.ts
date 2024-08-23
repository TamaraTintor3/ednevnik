import axiosInstance from "./axiosConfig"

export const getScheduleSubjects = (classScheduleId: number) => {
    return axiosInstance.get(`/api/schedule-subjects/class-schedule/${classScheduleId}`);
  };
  
  export const addScheduleSubject = (data: any) => {
    return axiosInstance.post('/api/schedule-subjects/add', data);
  };
  
  export const updateScheduleSubject = (id : any, data: any) => {
    return axiosInstance.put(`/api/schedule-subjects/${id}`, data);
  };