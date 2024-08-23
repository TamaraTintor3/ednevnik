import axios from "axios"
import axiosInstance from "./axiosConfig"


export const getParentByUserId = async (userId: number) => {
    try {
        const response = await axiosInstance.get('/api/parents/byUserId/' + userId)
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}