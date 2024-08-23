import NewSchoolCalendarEvent from "../models/INewSchoolCalendarEvent";
import axiosInstance from "./axiosConfig";

export const getSchoolCalendarEvents = (professorId: number) =>
  axiosInstance.get("/api/events/" + professorId);

export const insertNewSchoolCalendarEvent = (event: NewSchoolCalendarEvent) =>
  axiosInstance.post("/api/events", event);

export const updateSchoolCalendarEvent = (
  id: number,
  event: NewSchoolCalendarEvent
) => axiosInstance.post("/api/events/" + id, event);

export const deleteSchoolCalendarEvent = (id: number) =>
  axiosInstance.delete("/api/events/" + id);
