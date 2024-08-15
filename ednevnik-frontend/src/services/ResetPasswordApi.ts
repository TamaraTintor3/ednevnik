import { IPasswordChangeRequest } from "../models/IPasswordChangeRequest";
import axiosInstance from "./axiosConfig";

export const changeUserPassword = (
  passwordChangeRequest: IPasswordChangeRequest
) =>
  axiosInstance.post(
    "/api/authentication/change-password",
    passwordChangeRequest
  );

export const resetUserPassword = (username: string) =>
  axiosInstance.post("/api/authentication/reset-password-request/" + username);
