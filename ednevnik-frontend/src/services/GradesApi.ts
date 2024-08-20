import { SubjectGradesPayload } from "../interfaces/SubjectGradesPayload";
import axiosInstance from "./axiosConfig";


export const getGradesbySchoolClassIdAndProfessorId = async (schoolClassId:number, professorId: number) => {   
    try {
        const response = await  axiosInstance
        .get("api/grades/bySchoolClassIdAndProfessorId/" + schoolClassId +"/" + professorId);
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const addNewGrade = async (subjectGrade:SubjectGradesPayload) => {
    try {
        const response = await  axiosInstance
        .post("api/grades/addGrade", subjectGrade);
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

export const editGrade =async (subjectGrade:SubjectGradesPayload, subjectGradeId : number) => {
    try {
        const response = await  axiosInstance
        .put("api/grades/editGradeById/" + subjectGradeId, subjectGrade);
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}