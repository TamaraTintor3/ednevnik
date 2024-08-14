import axiosInstance from "./axiosConfig";

export const getClassesByUserId = async (id:number) => {
    try {
        const response = await axiosInstance.get('/api/school-classes/byUserId/' + id);
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};