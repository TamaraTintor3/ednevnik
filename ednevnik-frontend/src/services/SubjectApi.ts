import axiosInstance from "./axiosConfig";

export const getSubjectByProfessorId = async (id: number) => {
    try {
        const response = await axiosInstance.get('/api/subjects/' + id);
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }

}


export const getAllSubjects =async () => {
    try {
        const response = await axiosInstance.get('/api/subjects');
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
    
}

export const getSubjects = () => {
    return axiosInstance.get('/api/subjects/getAll');
};

export const addSubject = (subject:any) => {
    return axiosInstance.post("/api/subjects",subject);
}

