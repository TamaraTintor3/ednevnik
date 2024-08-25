import IMessageRequest from "../models/IMessageRequest";
import axiosInstance from "./axiosConfig";

export const getParentMessages = (parentId: number) =>
  axiosInstance.get("/api/messages/parent/" + parentId);
export const getProfessorMessages = (professorId: number) =>
  axiosInstance.get("/api/messages/professor/" + professorId);
export const insertMessage = (newMessage: IMessageRequest) =>
  axiosInstance.post("/api/messages", newMessage);
export const setOpened = (messageId: number) =>
  axiosInstance.post("/api/messages/opened/" + messageId);
export const getMessageById = (messageId: number) =>
  axiosInstance.get("/api/messages/" + messageId);
