import axiosInstance from "./axiosConfig"
import { User } from "../interfaces/UserInterface"
interface RegisterUserPayload {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    role: string;
}

export const registerUser = async (payload: RegisterUserPayload) => {
    try {
        const response = await axiosInstance.post('/api/authentication/register', payload);
        return response;
    } catch (error) {
        console.error('Došlo je do greške prilikom registrovanja korisnika!', error);
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get<User[]>('/api/users/showAll');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};