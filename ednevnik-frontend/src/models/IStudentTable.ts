import IParent from "./IParent";

export const initialStudentsTable: IStudentTable[] = [];

export default interface IStudentTable {
  studentId: number;
  firstName: string;
  lastName: string;
  parent: IParent;
  finalGrade:any;
  gradesWritten : any[];
  gradesVerbal: any[];
}
