import React, { useEffect, useState } from "react";
import { getParentByUserId } from "../../services/ParentApi";
import { useAuth } from "../../contexts/AuthenticationContext";
import {
  getMessageById,
  getParentMessages,
  insertMessage,
  setOpened,
} from "../../services/MessageApi";
import TableComponent from "../TableComponent/TableComponent";
import {
  CloseOutlined,
  MoreHoriz,
  QuestionAnswerTwoTone,
} from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getAllProfessors } from "../../services/ProfessorApi";
import IProfessor from "../../models/IProfessor";
import IMessageRequest from "../../models/IMessageRequest";
import { RoleEnum } from "../../enums/RoleEnum";

const columns = [
  { header: "Pošiljalac", field: "fullName" },
  { header: "Naslov", field: "title" },
  { header: "Tekst", field: "text" },
  { header: "Pročitano", field: "opened" },
  { header: "Datum", field: "date" },
];
const ParentInboxComponent = () => {
  const authentication = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<any>({});
  const [open, setOpen] = useState(false);
  const [openSend, setOpenSend] = useState(false);
  const [professors, setProfessors] = useState<IProfessor[]>([]);
  const [parentId, setParentId] = useState<number>(0);
  const actions = [
    {
      icon: <MoreHoriz titleAccess="Detalji" sx={{ color: "gray" }} />,
      onClick: openMessageDetails,
    },
    {
      icon: (
        <QuestionAnswerTwoTone titleAccess="Odgovori" sx={{ color: "gray" }} />
      ),
      onClick: answerMessage,
    },
  ];
  useEffect(() => {
    let parent = 0;
    getParentByUserId(authentication?.getUserId()).then((response) => {
      parent = response.data.parentId;
      setParentId(response.data.parentId);
      getAllProfessors()
        .then((response: any) => {
          setProfessors(response.data);
        })
        .catch((error) => console.log(error));
      getParentMessages(parent)
        .then((res) => {
          console.log(res.data);
          setMessages(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);
  function answerMessage(message: any) {
    console.log(message);
    setMessage((prev: any) => ({ ...prev, professorId: message.professorId }));
    setOpenSend((prev) => !prev);
  }
  function openMessageDetails(m: any) {
    console.log(m);

    getMessageById(m.messageId)
      .then((response) => {
        setMessage(response.data);

        setOpened(response.data.messageId)
          .then((r: any) => {
            setMessage(r.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(message);
    setOpen((prev) => !prev);
  }
  function closeModal() {
    setOpen((prev) => !prev);
    setMessage({});
  }
  function closeSendModal() {
    setOpenSend((prev) => !prev);
    setMessage({});
  }
  function openModalForNewMessage() {
    setOpenSend((prev) => !prev);
  }
  function handleForm(event: any) {
    const { name, value } = event.target;
    setMessage((prevState: any) => ({ ...prevState, [name]: value }));
    console.log(value);
  }
  function sendMessage(event: any) {
    event.preventDefault();

    const request: IMessageRequest = {
      title: message.title,
      text: message.text,
      date: new Date().toISOString(),
      isOpened: false,
      sender: RoleEnum.PARENT,
      parentId: parentId,
      professorId: message.professorId,
    };
    insertMessage(request)
      .then((response: any) => {
        toast.success("Poruka uspješno poslata!");
      })
      .catch((error: any) => {
        toast.error("Greška prilikom slanja poruke!");
      });
    setOpenSend((prev) => !prev);
    setMessage({});
  }
  return (
    <div>
      <Button
        onClick={openModalForNewMessage}
        variant="outlined"
        sx={{ marginBottom: "10px" }}
      >
        Nova poruka
      </Button>
      <TableComponent
        columns={columns}
        data={messages.map((m: any) => ({
          ...m,
          fullName: m.professorUserFirstName + " " + m.professorUserLastName,
          date: new Date(m.date).toLocaleDateString("sr"),
          text: m.text.substring(0, 10) + " ...",
          opened: m.opened ? "Pročitano" : "Nepročitano",
        }))}
        actions={actions}
      ></TableComponent>

      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: "#d6d6d6" }}>
          {message.title}
          <IconButton sx={{ float: "right" }} onClick={closeModal}>
            <CloseOutlined></CloseOutlined>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <b>
              Od:{" "}
              {message.professorUserFirstName +
                " " +
                message.professorUserLastName}
            </b>
            <b>Datum: {new Date(message.date).toLocaleDateString("sr")}</b>
            <Typography variant="body1">{message.text}</Typography>
          </Stack>
        </DialogContent>
      </Dialog>

      <Dialog open={openSend} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: "#d6d6d6" }}>
          Nova poruka
          <IconButton sx={{ float: "right" }} onClick={closeSendModal}>
            <CloseOutlined></CloseOutlined>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={(event) => sendMessage(event)}>
            <Stack spacing={2} margin={2}>
              <label>Primalac</label>
              <Select
                fullWidth
                id="professorId"
                name="professorId"
                onChange={handleForm}
                required
                defaultValue={message.professorId}
              >
                {professors.map((professor) => (
                  <MenuItem
                    key={professor.professorId}
                    value={professor.professorId}
                  >
                    {professor.userFirstName} {professor.userLastName}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                variant="outlined"
                id="title"
                type="text"
                name="title"
                label="Naslov"
                onChange={(event) => handleForm(event)}
                value={message.title}
                required
              ></TextField>

              <TextField
                variant="outlined"
                id="text"
                type="text"
                name="text"
                label="Tekst"
                onChange={(event) => handleForm(event)}
                value={message.text}
                required
              ></TextField>

              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#3c3c3c", color: "white" }}
              >
                Pošalji
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

export default ParentInboxComponent;
