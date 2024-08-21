
import axiosInstance from './axiosConfig';

interface StudentClass {
  studentClassId?: number;
  studentId: number;
  schoolClassId?: number; 
  behavior: string;
  finalGrade: number;
}

export const getStudentClass = (studentId: number) => {
  return axiosInstance.get(`/api/student-classes/${studentId}`);
};

export const saveStudentClass = (studentClass: StudentClass) => {
  return axiosInstance.post('/api/student-classes/add', studentClass);
};

export const updateStudentClass = (studentClassId: number, studentClass: StudentClass) => {
  return axiosInstance.put(`/api/student-classes/update/${studentClassId}`, studentClass);
};