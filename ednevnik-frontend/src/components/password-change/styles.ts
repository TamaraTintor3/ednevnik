import { TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles: any = makeStyles((theme: any) => ({
  vertical_center: {
    textAlign: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgb(214, 214, 214)",
  },
  container: {
    margin: "auto",
    backgroundColor: "white",
    borderRadius: "5px",
    color: "black",
    padding: "25px",
    width: "50%",
  },
  button: {
    color: "black !important",
    borderColor: "black !important",
    "&:hover": {
      background: "black !important",
      color: "white !important",
    },
    marginTop: "15px !important",
  },
  form_group: {
    marginBottom: "15px !important",
  },
}));
export default useStyles;
