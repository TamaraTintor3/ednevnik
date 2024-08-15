import IParent from "./IParent";

export const initialStudentsTable: IStudentTable[] = [];

export default interface IStudentTable {
  studentId: number;
  firstName: string;
  lastName: string;
  parent: IParent;
  gradesWritten : any[];
  gradesVerbal: any[];
}
