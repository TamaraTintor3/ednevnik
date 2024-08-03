export interface IPasswordConfirmation {
  password: string;
  repeatPassword: string;
}

export const initialPasswordConfirmation: IPasswordConfirmation = {
  password: "",
  repeatPassword: "",
};
