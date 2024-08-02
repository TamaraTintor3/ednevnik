import React, { useState } from "react";
import useStyles from "./styles";
import {
  IPasswordChangeRequest,
  initialPasswordChangeRequest,
} from "../../models/IPasswordChangeRequest";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  TextField,
} from "@mui/material";
import { initialPasswordConfirmation } from "../../models/IPasswordConfirmation";
import axiosInstance from "../../services/axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ChangePasswordForm = () => {
  const classes = useStyles();
  const [passwordConfirmation, setPasswordConfirmation] = React.useState(
    initialPasswordConfirmation
  );
  const { token } = useParams();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  function handleForm(event: any) {
    const { name, value } = event.target;
    setPasswordConfirmation((prevState) => ({ ...prevState, [name]: value }));
    console.log(value);
  }
  const formValidation = () => {
    const newErrors: { [key: string]: string } = {};

    if (!passwordConfirmation.password.match("(?=.{8,})"))
      newErrors.password = "Lozinka mora da sadrži minimalno 8 karaktera!";
    if (!passwordConfirmation.repeatPassword.match("(?=.{8,})"))
      newErrors.repeatPassword =
        "Lozinka mora da sadrži minimalno 8 karaktera!";
    if (
      !(passwordConfirmation.password === passwordConfirmation.repeatPassword)
    )
      newErrors.repeatPassword = "Unesene lozinke nisu iste!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  function changePassword(event: any) {
    event.preventDefault();
    if (!formValidation()) {
      return;
    }
    const passwordChangeRequest: IPasswordChangeRequest = {
      token: token || "",
      newPassword: passwordConfirmation.password,
    };
    axiosInstance
      .post("/api/authentication/change-password", passwordChangeRequest)
      .then((response) => {
        console.log(response);
        toast.success(response.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Došlo je do greške, lozinka nije sačuvana!");
      });
  }
  return (
    <Box component="div" className={classes.vertical_center}>
      <Box component="div" className={classes.container}>
        <h1>Promjena lozinke</h1>
        <form onSubmit={(event) => changePassword(event)}>
          <FormGroup className={classes.form_group}>
            <FormControl>
              <TextField
                name="password"
                id="password"
                label="Lozinka"
                type="password"
                required
                variant="outlined"
                onChange={(event) => handleForm(event)}
                value={passwordConfirmation.password}
                error={!!errors.password}
                helperText={errors.password}
              />
            </FormControl>
          </FormGroup>
          <FormGroup className={classes.form_group}>
            <FormControl>
              <TextField
                name="repeatPassword"
                id="repeatPassword"
                label="Potvrdi lozinku"
                type="password"
                required
                variant="outlined"
                onChange={(event) => handleForm(event)}
                value={passwordConfirmation.repeatPassword}
                error={!!errors.repeatPassword}
                helperText={errors.repeatPassword}
              />
            </FormControl>
          </FormGroup>
          <Button type="submit" variant="outlined" className={classes.button}>
            Potvrdi
          </Button>
        </form>
      </Box>
      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={true}
      />
    </Box>
  );
};

export default ChangePasswordForm;
