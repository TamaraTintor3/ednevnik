import axiosInstance from "./axiosConfig";


export const getSchoolClassById = async (id:number) => {   
    try {
        const response = await  axiosInstance
        .get("/api/school-classes/" + id);
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const getSchoolClasses=()=>axiosInstance.get("/api/school-classes");