import IParent from "./IParent";

export const initialStudents: IStudent[] = [];

export default interface IStudent {
  studentId: number;
  firstName: string;
  lastName: string;
  parent: IParent;
}
