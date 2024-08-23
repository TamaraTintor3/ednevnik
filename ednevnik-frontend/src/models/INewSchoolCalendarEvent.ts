export default interface NewSchoolCalendarEvent {
  description: string;
  startDate: string;
  endDate: string;
  professorId: number;
}

export const initialNewSchoolCalendarEvent: NewSchoolCalendarEvent = {
  description: "",
  startDate: "",
  endDate: "",
  professorId: 0,
};
