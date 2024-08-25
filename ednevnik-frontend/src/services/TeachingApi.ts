import axiosInstance from "./axiosConfig";

export const getProfessorsByClassId = async (id: number) => {
    try {
        const response = await axiosInstance.get('/api/teachings/professors/' + id);
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }

}

export const addTeaching =async (param:any) => {
    try {
        const response = await axiosInstance.post('/api/teachings' ,param);
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
    
}