import IParent, { initialParent } from "./IParent";

export const initialStudent: IStudentDetails = {
  studentId: 0,
  firstName: "",
  lastName: "",
  parent: initialParent,
  jmbg: "",
};

export default interface IStudentDetails {
  studentId: number;
  firstName: string;
  lastName: string;
  parent: IParent;
  jmbg: string;
}
