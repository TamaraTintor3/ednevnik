export default interface ISchoolCalendar {
  schoolCalendarId: number;
  description: string;
  startDate: string;
  endDate: string;
}

export const initialSchoolCalendar: ISchoolCalendar = {
  schoolCalendarId: 0,
  description: "",
  startDate: "",
  endDate: "",
};
