import axiosInstance from "./axiosConfig";

export const getStudentDetails = (studentId: number) =>
  axiosInstance.get("/api/students/" + studentId);


  export const getStudentGradesByParentId =async (parentId:number, schoolYearId:number) => {
    
    try{
      const response = await axiosInstance.get("/api/students/gradesOrderedByDate/" + parentId + "/" + schoolYearId)
      return response;
    }catch (error) {
      console.error('Error fetching users:', error);
      throw error;
  }

  }

  export const getStudentByParentId = async (parentId:number) =>{
    try{
      const response = await axiosInstance.get("/api/students/byParentId/" + parentId )
      return response;
    }catch (error) {
      console.error('Error fetching users:', error);
      throw error;
  }

  }