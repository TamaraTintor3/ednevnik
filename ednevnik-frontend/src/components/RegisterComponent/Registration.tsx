import React, {useState} from 'react'
import { Box, FormControl, Select,  Typography, SelectChangeEvent as MuiSelectChangeEvent, MenuItem, Button } from '@mui/material';
import { StyledTxtField } from '../LoginComponent/LoginTxtFieldStyled';
import { registerUser } from '../../services/AdminApi';
import './RegistrationStyle.css'

const Registration = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [role, setRole] = useState<string>("ADMIN");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            console.log('Validation failed. Errors:', errors);
            return;
          }
       
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Role:', role);
        try{
            const response = await registerUser({
              firstName,
              lastName,
              username,
              password,
              email,
              role
          });
            if (response.status === 200) {
                alert('Korisnik je uspješno registrovan!');
              }
            } catch (error) {
              console.error('Došlo je do greške prilikom registrovanja korisnika!', error);
              alert('Registration failed!');
            }
          };

          const handleRoleChange = (event: MuiSelectChangeEvent<string>) => {
            setRole(event.target.value as string);
          };
          const validateForm = () => {
            const newErrors: { [key: string]: string } = {};
            if (!firstName) newErrors.firstName = 'Unestite ime';
            if (!lastName) newErrors.lastName = 'Unesite prezime';
            if (!username) newErrors.username = 'Unesite korisničko ime';
            if (!password) newErrors.password = 'Unesite lozinku';
            if (password.length < 8) newErrors.password = 'Lozinka mora da ima više od 8 karaktera';
            if (!email) newErrors.email = 'Unesite email';
            if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Pogrešan format za email';
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
          };
  return (
    <Box  component="div" className="registrationContainer">
        <Typography variant='h4' component="h2" className="registrationTitle">
            Registracija 
        </Typography>
        <Box component="form" onSubmit={handleRegister} noValidate autoComplete="off">
          <Box pt={2}>
        <label>IME</label>
        <StyledTxtField
          fullWidth
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          
          required
          margin="none"
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        </Box>
        <Box pt={2}>
        <label>PREZIME</label>
        <StyledTxtField
          fullWidth
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          margin="none"
          required
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        </Box>
        <Box pt={2}>
        <label>KORISNIČKO IME</label>
        <StyledTxtField
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="none"
          required
          error={!!errors.username}
            helperText={errors.username}
        />
        </Box>
        <Box pt={2}>
        <label>LOZINKA</label>
        <StyledTxtField
          fullWidth
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="none"
          required
          error={!!errors.password}
            helperText={errors.password}
        />
        </Box>
        <Box pt={2}>
        <label>EMAIL</label>
        <StyledTxtField
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="none"
          required
          error={!!errors.email}
            helperText={errors.email}
        />
        </Box>
        <Box pt={2}>
        <FormControl  fullWidth className="formControl" variant="outlined" required>
        <label>ULOGA</label>
            <Select value={role}
            onChange={handleRoleChange}
            className="selectInput">
                <MenuItem value="ADMIN">Administrator</MenuItem>
            <MenuItem value="STAFF">Nenastavno osoblje</MenuItem>
            <MenuItem value="PARENT">Roditelj</MenuItem>
            <MenuItem value="PROFESSOR">Profesor</MenuItem>
            </Select>
        </FormControl>
        </Box>
        <Button className='submitButton'  type="submit" variant="contained" fullWidth sx={{
                                                marginTop: '20px',
                                                backgroundColor: '#3c3c3c',
                                                color: '#fff',
                                                borderRadius: '50px',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: '#606060'
                                                }
                                            }}> Potvrdi</Button>
        </Box>

    </Box>
)

}

export default Registration;

