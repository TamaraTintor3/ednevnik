import { TextField, withStyles } from "@material-ui/core";

export const StyledTxtField = withStyles({
    root: {
      '& label': {
        color: 'black',
      },
      '& label.Mui-focused': {
        color: 'black ',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'yellow',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#c1c1c1 ',
        },
        '&:hover fieldset': {
          borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'black',
        },
      },
    },
  })(TextField);