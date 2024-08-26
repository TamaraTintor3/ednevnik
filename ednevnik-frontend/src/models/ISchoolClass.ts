import IProfessor from "./IProfessor";
import IStudent from "./IStudent";

export default interface ISchoolClass {
  schoolClassId: number;
  name: string;
  professors: IProfessor[];
  schoolYearYear: string;
  schoolYearSemester: number;
  students: IStudent[];
  schoolYearId : number;
}

export const initialClasses: ISchoolClass[] = [];
export const initialClass: ISchoolClass = {
  schoolClassId: 1,
  name: "",
  professors: [],
  schoolYearYear: "",
  schoolYearSemester: 1,
  students: [],
  schoolYearId : 0
};
