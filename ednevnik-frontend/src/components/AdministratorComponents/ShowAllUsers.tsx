import React, {useState, useEffect} from 'react'
import TableComponent from '../TableComponent/TableComponent'
import { Box, Button, Typography } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import { User } from '../../interfaces/UserInterface';
import { getAllUsers, getUserByUsername } from '../../services/AdminApi';
import { useAuth } from '../../contexts/AuthenticationContext';

const ShowAllUsers = () => {
    const authentication = useAuth();
    const [data, setData] = useState<User[]>([]);
    const navigate = useNavigate();

    const handleAddUser = () => {
      navigate("/register");
    }
  
  
    const handleEditClick = (row:any) => {
  
       
      
      
      navigate("/editUser",{state: {user:row}});
    }

useEffect(()=>{
  if (!authentication?.isLogedIn() || authentication?.role !== "ADMIN") {
    navigate('/showAllusers');  
  }
}, [])

    const columns = [
        { header: 'Ime', field: 'firstName' },
        { header: 'Prezime', field: 'lastName' },
        { header: 'Korisničko ime', field: 'username' },
        { header: 'Email', field: 'email' },
        { header: 'Uloga', field: 'role' }
      ];
      
    const actions = [
        { icon: <EditNoteIcon titleAccess='Izmjeni korisnika' sx={{ color: 'gray' }} />, onClick: handleEditClick }
       
      ];
      
      useEffect(() => {
        getAllUsers()
        .then(users => setData(users))
        .catch(error => console.error('Error fetching data:', error));
      }, [])

      
      
  return (
    <Box p={4}>
     Dodaj korisnika  <Button title='Dodaj korisnika' sx={{ color: 'gray' }} startIcon={<PersonAddIcon/>} onClick={handleAddUser}></Button>
      <hr></hr>
      <TableComponent columns={columns} data={data} actions={actions} />
    </Box>
  )
}

export default ShowAllUsers