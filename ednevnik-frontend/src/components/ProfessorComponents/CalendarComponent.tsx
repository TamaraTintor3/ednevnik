import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useState } from "react";
import allLocales from "@fullcalendar/core/locales-all";
import { useProfessorContext } from "../../contexts/ProfessorContext";
import {
  deleteSchoolCalendarEvent,
  getSchoolCalendarEvents,
  insertNewSchoolCalendarEvent,
  updateSchoolCalendarEvent,
} from "../../services/SchoolCalendarApi";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { CloseOutlined, NoteTwoTone } from "@mui/icons-material";
import moment from "moment";
import NewSchoolCalendarEvent from "../../models/INewSchoolCalendarEvent";
import { ToastContainer, toast } from "react-toastify";
import ISchoolCalendar from "../../models/ISchoolCalendar";
import ICalendarEvent, {
  initialSchoolEvent,
} from "../../models/ICalendarEvent";

const CalendarComponent = () => {
  const [events, setEvents] = useState<ISchoolCalendar[]>([]);
  const [edit, setEdit] = useState(false);
  const [schoolEvent, setSchoolEvent] =
    useState<ICalendarEvent>(initialSchoolEvent);
  const professorContext = useProfessorContext();
  const [open, setOpen] = useState(false);
  React.useEffect(() => {
    if (professorContext?.professorId) {
      getSchoolCalendarEvents(professorContext?.professorId)
        .then((response) => {
          setEvents(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [professorContext?.professorId]);

  function addEvent(event: any) {
    setSchoolEvent((prev: any) => ({
      ...prev,
      start: event.dateStr,
      end: event.dateStr,
    }));
    setOpen((prev) => !prev);
  }
  function checkEvent(info: any) {
    setSchoolEvent({
      schoolCalendarId: info.event.id,
      title: info.event.title,
      start: info.event.start.toISOString(),
      end: info.event.end
        ? info.event.end.toISOString()
        : info.event.start.toISOString(),
    });
    setEdit((prev) => (prev = true));
    setOpen((prev) => !prev);
  }
  function closeModal() {
    setOpen((prev) => !prev);
    setEdit((prev) => (prev = false));
    setSchoolEvent(initialSchoolEvent);
  }
  function handleForm(event: any) {
    const { name, value } = event.target;
    setSchoolEvent((prevState: any) => ({ ...prevState, [name]: value }));
    console.log(value);
  }

  function saveEvent(event: any) {
    event.preventDefault();

    const newSchoolCalendarEvent: NewSchoolCalendarEvent = {
      description: schoolEvent.title,
      startDate: schoolEvent.start,
      endDate: schoolEvent.end,
      professorId: professorContext?.professorId,
    };
    if (edit) {
      updateSchoolCalendarEvent(
        schoolEvent.schoolCalendarId,
        newSchoolCalendarEvent
      )
        .then((response) => {
          const newar = events.map((e: ISchoolCalendar) => {
            if (e.schoolCalendarId == schoolEvent.schoolCalendarId) {
              return {
                schoolCalendarId: schoolEvent.schoolCalendarId,
                description: schoolEvent.title,
                startDate: schoolEvent.start,
                endDate: schoolEvent.end,
              };
            } else {
              return e;
            }
          });

          setEvents(newar);
          toast.success("Uspješno ste izmjenili događaj!");
        })
        .catch((error) => {
          toast.error("Greška prilikom izmjene!");
        });
      setEdit((prev) => (prev = false));
    } else {
      insertNewSchoolCalendarEvent(newSchoolCalendarEvent)
        .then((response: any) => {
          setEvents((prev) => [...prev, response.data]);
          toast.success("Uspješno ste dodali novi događaj!");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Greška prilikom dodavanja događaja!");
        });
    }
    setSchoolEvent((prev) => ({ ...prev, title: "" }));
    setOpen((prev) => !prev);
  }
  const renderEventContent = (eventInfo: any) => {
    return (
      <Box>
        <NoteTwoTone />
        <Box sx={{ margin: "5px" }}>
          <i>{eventInfo.event.title}</i>
        </Box>
      </Box>
    );
  };
  function deleteEvent() {
    deleteSchoolCalendarEvent(schoolEvent.schoolCalendarId)
      .then((response) => {
        setEvents((prev: ISchoolCalendar[]) => {
          return prev.filter(
            (a: ISchoolCalendar) =>
              a.schoolCalendarId != schoolEvent.schoolCalendarId
          );
        });
        toast.success("Događaj uspješno obrisan!");
      })
      .catch((error) => {
        toast.error("Greška prilikom brisanja!");
      });
    setSchoolEvent(initialSchoolEvent);
    setEdit((prev) => !prev);
    setOpen((prev) => !prev);
  }
  return (
    <div>
      <FullCalendar
        locales={allLocales}
        locale="sr-Latn-RS"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        headerToolbar={{
          start: "dayGridMonth,timeGridWeek",
          center: "title",
          end: "today prev,next",
        }}
        events={events.map((e: any) => ({
          id: e.schoolCalendarId,
          start: e.startDate,
          end: e.endDate,
          title: e.description,
        }))}
        dateClick={addEvent}
        eventClick={checkEvent}
        eventContent={renderEventContent}
      />

      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: "#d6d6d6" }}>
          Plan i program
          <IconButton sx={{ float: "right" }} onClick={closeModal}>
            <CloseOutlined></CloseOutlined>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={(event) => saveEvent(event)}>
            <Stack spacing={2} margin={2}>
              <label>Od:</label>
              <TextField
                variant="outlined"
                id="start"
                type="date"
                name="start"
                onChange={(event) => handleForm(event)}
                value={moment(new Date(schoolEvent.start)).format("YYYY-MM-DD")}
                inputProps={{ readOnly: true }}
              ></TextField>
              <label>Do:</label>
              <TextField
                variant="outlined"
                id="end"
                type="date"
                name="end"
                onChange={(event) => handleForm(event)}
                value={moment(new Date(schoolEvent.end)).format("YYYY-MM-DD")}
              ></TextField>
              <TextField
                variant="outlined"
                label="Opis"
                value={schoolEvent.title}
                onChange={(event) => handleForm(event)}
                required
                name="title"
                multiline
              ></TextField>
              {edit && (
                <Button variant="contained" color="error" onClick={deleteEvent}>
                  Obriši
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#3c3c3c", color: "white" }}
              >
                {edit ? "Izmjeni" : "Sačuvaj"}
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={true}
      />
    </div>
  );
};

export default CalendarComponent;
