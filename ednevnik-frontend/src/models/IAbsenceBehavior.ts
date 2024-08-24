import IAbsence from "./IAbsence";

export default interface IAbsenceBehavior {
  absences: IAbsence[];
  behavior: string;
}

export const initialAbsenceBehavior: IAbsenceBehavior = {
  absences: [],
  behavior: "",
};
