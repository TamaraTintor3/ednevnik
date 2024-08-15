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