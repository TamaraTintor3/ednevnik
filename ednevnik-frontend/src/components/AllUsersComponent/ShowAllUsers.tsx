import React, {useState, useEffect} from 'react'
import TableComponent from '../TableComponent/TableComponent'
import axiosInstance from '../../services/axiosConfig'

interface User {
    firstName : string;
    lastName : string;
    username : string;
    email: string;
    role : string;
}



const ShowAllUsers = () => {
    const [data, setData] = useState<User[]>([]);

    const columns = [
        { header: 'Ime', field: 'firstName' },
        { header: 'Prezime', field: 'lastName' },
        { header: 'Korisnicko ime', field: 'lastName' },
        { header: 'Email', field: 'email' },
        { header: 'Uloga', field: 'role' }
      ];
      const handleAddClick = (user: User) => {
        console.log('Dodavanje korisnika:', user);
      };

      useEffect(() => {
        axiosInstance.get<User[]>('/api/users/showAll')
        .then(response => setData(response.data))
        .catch(error => console.error('Error fetching data:', error));
      }, [])

      
      const actions = [
        { label: 'Dodaj', onClick: handleAddClick },
       
      ];
  return (
    <div>
      <h1>Lista korisnika</h1>
      <TableComponent columns={columns} data={data} actions={actions} />
    </div>
  )
}

export default ShowAllUsers