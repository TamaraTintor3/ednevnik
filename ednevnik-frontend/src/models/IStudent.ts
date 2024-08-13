import IParent from "./IParent";

export default interface IStudent {
  studentId: number;
  firstName: string;
  lastName: string;
  parent: IParent;
}
