import React, {useState, useEffect} from 'react'
import TableComponent from '../TableComponent/TableComponent'
import axiosInstance from '../../services/axiosConfig'
import { Box, Typography } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useNavigate } from 'react-router-dom';
import { User } from '../../interfaces/UserInterface';
import { getAllUsers } from '../../services/AdminApi';

const ShowAllUsers = () => {
    const [data, setData] = useState<User[]>([]);
    const navigate = useNavigate();
    const handleEditClick = () => {
        console.log("Izmjena podataka!!!")
    }

    const columns = [
        { header: 'Ime', field: 'firstName' },
        { header: 'Prezime', field: 'lastName' },
        { header: 'Korisničko ime', field: 'username' },
        { header: 'Email', field: 'email' },
        { header: 'Uloga', field: 'role' }
      ];
      
    const actions = [
        { icon: <EditNoteIcon />, onClick: handleEditClick },
       
      ];
      
      useEffect(() => {
        getAllUsers()
        .then(users => setData(users))
        .catch(error => console.error('Error fetching data:', error));
      }, [])

      
      
  return (
    <Box p={4}>
      <Typography variant="h4" >Lista korisnika</Typography>
      <TableComponent columns={columns} data={data} actions={actions} />
    </Box>
  )
}

export default ShowAllUsers