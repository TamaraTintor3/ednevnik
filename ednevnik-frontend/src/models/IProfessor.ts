export default interface IProfessor {
  professorId: number;
  classProfessor: boolean;
  userFirstName: string;
  userLastName: string;
}

export const initialProfessor: IProfessor = {
  professorId: 0,
  classProfessor: false,
  userFirstName: "",
  userLastName: ""
};