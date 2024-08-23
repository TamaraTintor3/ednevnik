
export const initialStudentClass: IStudentClass = {
    studentClassId: 0,
    studentId: 0,
    schoolClassId: 0,
    behavior: "string",
    finalGrade: 0
  };

export default interface IStudentClass {
    studentClassId?: number;
    studentId: number;
    schoolClassId?: number; 
    behavior: string;
    finalGrade: number;
  }