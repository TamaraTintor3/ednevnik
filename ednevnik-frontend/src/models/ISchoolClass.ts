import IProfessor from "./IProfessor";
import IStudent from "./IStudent";

export default interface ISchoolClass {
  schoolClassId: number;
  name: string;
  professors: IProfessor[];
  schoolYearYear: string;
  schoolYearSemester: number;
  students: IStudent[];
}

export const initialClasses: ISchoolClass[] = [];
