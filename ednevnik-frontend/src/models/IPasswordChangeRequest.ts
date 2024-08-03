export interface IPasswordChangeRequest {
  token: string;
  newPassword: string;
}
export const initialPasswordChangeRequest: IPasswordChangeRequest = {
  token: "",
  newPassword: "",
};
