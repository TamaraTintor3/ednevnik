import axiosInstance from "./axiosConfig"

export const getStudentClass = (studentClassId: any) => {
    return axiosInstance.get(`/api/student-classes/${studentClassId}`);
};

  export const saveOrUpdateStudentClass = (studentClass :any) => {
    return axiosInstance.post(`/api/student-classes`, studentClass);
  };
