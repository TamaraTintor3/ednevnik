import axiosInstance from "./axiosConfig";

export const getStudentClassByStudentId = async (studentId:number) =>{
    try{
        const response = await axiosInstance.get(`/api/student-classes/${studentId}`)
        return response;
    }catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}