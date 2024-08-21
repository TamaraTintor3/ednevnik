import IGrade from "./IGrades";

export default interface IStudentGrades {
  subjectName: string;
  professorFullName: string;
  gradesWritten: IGrade[];
  gradesVerbal: IGrade[];
}
