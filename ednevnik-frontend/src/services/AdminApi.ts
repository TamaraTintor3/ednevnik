import axiosInstance from "./axiosConfig"
import { User } from "../interfaces/UserInterface"
import { IEditUser } from "../models/IEditUser";
import { RegisterUserPayload } from "../interfaces/RegisterUserPayload";
import { AddSchoolClassPayload } from "../interfaces/AddSchoolClassPayload";
import { Parent } from "../interfaces/ParentInterface";
import { StudentPayload } from "../interfaces/StudentPayload";

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


export const getUserByUsername = async (username:string) => {
    try {
        const response = await axiosInstance.get('/api/users/getUserByUsername/' + username);
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const editUserById = async (user :IEditUser) => {
    try {
        const response = await axiosInstance.put('/api/users/editUserById/' + user.userId, user);
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const addSchoolClass = async (payload: AddSchoolClassPayload) => {
    try {
        const response = await axiosInstance.post('/api/school-classes/addClass', payload);
        return response;
    } catch (error) {
        console.error('Došlo je do greške prilikom dodavanja odjeljenja!', error);

        throw error;
    }
};

export const fetchParents = async (): Promise<Parent[]> => {
    try {
        const response = await axiosInstance.get<Parent[]>("/api/parents");
        return response.data;
    } catch (error) {
        console.error("Error fetching parents:", error);
        throw error;
    }
};

export const addStudent = async (payload: StudentPayload) => {
    try {
        const response = await axiosInstance.post(`/api/school-classes/${payload.schoolClassId}/students/add`, payload);
        return response.data;
    } catch (error) {
        console.error("Error adding student:", error);
        throw error;
    }
};

export const getAllParents=()=>{
    return axiosInstance.get("/api/parents");
}
