import React, {useState} from 'react'
import axiosInstance from '../services/axiosConfig'
import { Box, FormControl, InputLabel, Select, TextField, Typography, SelectChangeEvent as MuiSelectChangeEvent, MenuItem, Button } from '@mui/material';

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
            const response = await axiosInstance.post('/api/authentication/register', {
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
    <Box component="div" sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
        <Typography variant='h4' component="h2" gutterBottom>
            Registracija korisnika
        </Typography>
        <Box component="form" onSubmit={handleRegister} noValidate autoComplete="off">
        <TextField
          fullWidth
          label="Ime"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          margin="normal"
          required
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          fullWidth
          label="Prezime"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          margin="normal"
          required
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          fullWidth
          label="Korisničko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          required
          error={!!errors.username}
            helperText={errors.username}
        />
        <TextField
          fullWidth
          type="password"
          label="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
          error={!!errors.password}
            helperText={errors.password}
        />
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
          error={!!errors.email}
            helperText={errors.email}
        />
        <FormControl fullWidth margin="normal" required>
            <InputLabel>Uloga</InputLabel>
            <Select value={role}
            onChange={handleRoleChange}>
                <MenuItem value="ADMIN">Administrator</MenuItem>
            <MenuItem value="STAFF">Nenastavno osoblje</MenuItem>
            <MenuItem value="PARENT">Roditelj</MenuItem>
            <MenuItem value="PROFESSOR">Profesor</MenuItem>
            </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth> Potvrdi</Button>
        </Box>

    </Box>
)

}

export default Registration;

