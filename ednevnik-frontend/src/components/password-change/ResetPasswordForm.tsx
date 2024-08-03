import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { initialPasswordResetRequest } from "../../models/IPasswordResetRequest";
import useStyles from "./styles";
import axiosInstance from "../../services/axiosConfig";
import { ToastContainer, toast } from "react-toastify";

const ResetPasswordForm = () => {
  const classes = useStyles();
  const [passwordResetRequest, setPasswordResetRequest] = React.useState(
    initialPasswordResetRequest
  );

  function resetPassword(event: any) {
    event.preventDefault();
    axiosInstance
      .post(
        "/api/authentication/reset-password-request/" +
          passwordResetRequest.username
      )
      .then((response) => {
        console.log(response);
        toast.success(response.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          "Došlo je do greške, nije moguće poslati email za resetovanje lozinke!"
        );
      });
  }
  function handleForm(event: any) {
    const { name, value } = event.target;
    setPasswordResetRequest((prevState) => ({ ...prevState, [name]: value }));
    console.log(value);
  }
  return (
    <Box component="div" className={classes.vertical_center}>
      <Box component="div" className={classes.container}>
        <h1>Zaboravili ste lozinku?</h1>
        <form onSubmit={(event) => resetPassword(event)}>
          <FormGroup>
            <FormControl>
              <TextField
                name="username"
                id="username"
                label="Korisničko ime"
                type="text"
                required
                variant="outlined"
                onChange={(event) => handleForm(event)}
                value={passwordResetRequest.username}
              />
              <FormHelperText id="helper-text">
                Link za promjenu lozinke će biti poslan na Vašu email adresu!
              </FormHelperText>
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

export default ResetPasswordForm;
