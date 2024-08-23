export default interface ICalendarEvent {
  schoolCalendarId: number;
  title: string;
  start: string;
  end: string;
}

export const initialSchoolEvent: ICalendarEvent = {
  schoolCalendarId: 0,
  title: "",
  start: "",
  end: "",
};
