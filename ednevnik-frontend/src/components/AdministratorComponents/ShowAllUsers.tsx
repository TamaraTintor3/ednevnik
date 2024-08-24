import React, {useState, useEffect} from 'react'
import TableComponent from '../TableComponent/TableComponent'
import { Box, Button, Typography} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import { User } from '../../interfaces/UserInterface';
import { getAllUsers, getUserByUsername } from '../../services/AdminApi';
import { useAuth } from '../../contexts/AuthenticationContext';
import { updateProfessorStatus, getProfessorStatus  } from '../../services/AdminApi';
import Checkbox from '@mui/material/Checkbox';



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

    const handleCheckboxChange = (row: User) => {
      const userId = row.userId;
      if (userId === undefined) {
        console.error('No ID found for the user');
        return;
      }
    
      const newStatus = !row.classProfessor;
    

      console.log('New status:', newStatus);
    
  
      setData(prevData =>
        prevData.map(user =>
          user.userId === userId ? { ...user, classProfessor: newStatus } : user
        )
      );

      updateProfessorStatus(userId, newStatus)
        .then(() => {
          console.log('Status updated successfully');
        })
        .catch(error => console.error('Error updating professor status:', error));
    };
    const columns = [
        { header: 'Ime', field: 'firstName' },
        { header: 'Prezime', field: 'lastName' },
        { header: 'Korisničko ime', field: 'username' },
        { header: 'Email', field: 'email' },
        { header: 'Uloga', field: 'role' },
        {
          header: 'Razredni',
          field: 'classProfessor',
          render: (row: User) => (
              row.role === 'PROFESSOR' ? (
                  <Checkbox
                      checked={row.classProfessor || false}  
                      onChange={() => handleCheckboxChange(row)}
                  />
              ) : null
          ),
      },
      ];

     
      
    const actions = [
        { icon: <EditNoteIcon titleAccess='Izmjeni korisnika' sx={{ color: 'gray' }} />, onClick: handleEditClick }
       
      ];
      useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getAllUsers();
                const professorUsers = users.filter(user => user.role === 'PROFESSOR');

            
                const fetchStatuses = professorUsers.map(user =>
                    getProfessorStatus(user.userId)
                        .then(status => ({
                            ...user,
                            classProfessor: status
                        }))
                        .catch(() => ({
                            ...user,
                            classProfessor: false 
                        }))
                );

                const updatedUsers = await Promise.all(fetchStatuses);

                const nonProfessors = users.filter(user => user.role !== 'PROFESSOR');
                setData([...updatedUsers, ...nonProfessors]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUsers();
    }, []);
      
      
  return (
    <Box p={4}>
     Dodaj korisnika  <Button title='Dodaj korisnika' sx={{ color: 'gray' }} startIcon={<PersonAddIcon/>} onClick={handleAddUser}></Button>
      <hr></hr>
      <TableComponent columns={columns} data={data} actions={actions} />
    </Box>
  )
}

export default ShowAllUsers