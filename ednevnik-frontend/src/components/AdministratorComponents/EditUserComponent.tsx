import { Box, Button, FormControl, MenuItem, Select } from "@mui/material";
import { StyledTxtField } from "../LoginComponent/LoginTxtFieldStyled";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { editUserById, getUserByUsername } from "../../services/AdminApi";
import SaveIcon from '@mui/icons-material/Save';
import { IEditUser } from "../../models/IEditUser";

const EditUserComponent = () => {

    const { state } = useLocation();
    const { user } = state;
    const [saveDisabled, setSaveDisabled] = useState(true);
    const [userDTO, setUserDTO] = useState<any>(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");


    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const formValidation = () => {
        const newErrors: { [key: string]: string } = {};
        if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Pogrešan format za email';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formValidation()) {
            return;
        }
      
            let editedUser: IEditUser = {
                userId: userDTO.userId,
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                role: role,
                password: userDTO.password,
                token: userDTO.token
            }
    
            editUserById(editedUser).then(resp => console.log(resp)).catch(error => console.error('Error fetching data:', error));
        
     

    };

    useEffect(() => {
        getUserByUsername(user.username).then(res => {
            setUserDTO(res.data);
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setEmail(res.data.email);
            setUsername(res.data.username);
            setRole(res.data.role);
        }
        ).catch(error => console.error('Error fetching data:', error));
    }, [])


   


    return (

        <Box component="div" className="registrationContainer">


       

            <Box component="form" onSubmit={handleSave} noValidate autoComplete="off">
                <Box pt={2}>
                    <label>IME</label>
                    <StyledTxtField
                        fullWidth
                        variant="outlined"
                        value={firstName}
                        onChange={(e) =>
                           { setFirstName(e.target.value); setSaveDisabled(false);}
                        }

                        required
                        margin="none"
                    />
                </Box>
                <Box pt={2}>
                    <label>PREZIME</label>
                    <StyledTxtField
                        fullWidth
                        variant="outlined"
                        value={lastName}
                        onChange={(e) => {setLastName(e.target.value);  setSaveDisabled(false);}}
                        margin="none"
                        required
                    />
                </Box>
                <Box pt={2}>
                    <label>KORISNIČKO IME</label>
                    <StyledTxtField
                        fullWidth
                        variant="outlined"
                        value={username}
                        onChange={(e) => {setUsername(e.target.value); setSaveDisabled(false);}}
                        margin="none"
                        required
                    />
                </Box>

                <Box pt={2}>
                    <label>EMAIL</label>
                    <StyledTxtField
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value); setSaveDisabled(false);}}
                        margin="none"
                        required
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                </Box>
                <Box pt={2}>
                    <FormControl fullWidth className="formControl" variant="outlined" required>
                        <label>ULOGA</label>
                        <Select value={role}
                            onChange={(e) => {setRole(e.target.value); setSaveDisabled(false);}}
                            className="selectInput">
                            <MenuItem value="ADMIN">Administrator</MenuItem>
                            <MenuItem value="STAFF">Nenastavno osoblje</MenuItem>
                            <MenuItem value="PARENT">Roditelj</MenuItem>
                            <MenuItem value="PROFESSOR">Profesor</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button className='submitButton'
                disabled = {saveDisabled}
                type="submit" variant="contained" fullWidth sx={{
                    marginTop: '20px',
                    backgroundColor: '#3c3c3c',
                    color: '#fff',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#606060'
                    }
                }}><SaveIcon />Sačuvaj</Button>
            </Box>

        </Box>
    );
}

export default EditUserComponent;

