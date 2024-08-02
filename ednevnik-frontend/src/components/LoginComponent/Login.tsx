import { Button, Grid, Paper, Typography } from "@mui/material";
import './LoginStyle.css';
import { StyledTxtField } from "./LoginTxtFieldStyled";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import LoginAxiosInstance from "../../services/LoginAxios";
import { useAuth } from "../../contexts/AuthenticationContext";
const LoginComponent = () => {

    const [username, setUsername] = useState<String>("");
    const [password, setPassword] = useState<String>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const authentication = useAuth();

    const formValidation = () => {
        const newErrors: { [key: string]: string } = {};
        if (!username) newErrors.username = 'Unestite korisničko ime!';
        if (!password) newErrors.password = 'Unesite lozinku!';
        if (!password.match("(?=.{8,})")) newErrors.password = 'Lozinka sadrži minimalno 8 karaktera!';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const login = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formValidation()) {
            return;
          }
          try{
            authentication?.login(username,password);
          }catch(err){
            alert("Pogrešni kredencijali, pokušajte ponovo!")
          }
  


    }

    return (
        <div>
            <Grid container spacing={0} className="main-grid" direction="row">
                <Grid item>
                    <Grid
                        container
                        direction="column"
                        spacing={2}
                        className="login-form"
                    >
                        <Paper
                            variant="elevation"
                            elevation={2}
                            className="login-background"
                        >
                            <Grid item className="gridTypography">
                                <Typography component="h1" variant="h5">
                                    Prijava
                                </Typography>
                            </Grid>
                            <Grid item>
                                <form onSubmit={login}>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item>
                                            <label>KORISNIČKO IME</label>
                                            <StyledTxtField
                                                type="text"
                                                fullWidth
                                                name="username"
                                                variant="outlined"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                                error={!!errors.username}
                                                helperText={errors.username}

                                            />
                                        </Grid>
                                        <Grid item><label>LOZINKA</label>
                                            <StyledTxtField
                                                type="password"
                                                fullWidth
                                                name="password"
                                                variant="outlined"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                error={!!errors.password}
                                                helperText={errors.password}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <a className="aClass" href="/home">Zaboravljena lozinka?</a>
                                        </Grid>
                                        <Grid item>
                                            <Button type="submit" variant="contained" fullWidth sx={{
                                                backgroundColor: '#3c3c3c',
                                                color: '#fff',
                                                borderRadius: '50px',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: '#606060'
                                                }
                                            }}> Prijavite se</Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default LoginComponent;