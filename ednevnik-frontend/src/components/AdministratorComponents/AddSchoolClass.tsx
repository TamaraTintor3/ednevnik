import { StyledTxtField } from '../LoginComponent/LoginTxtFieldStyled'
import { Box, Button, Typography } from '@mui/material'
import './AddSchoolClass.css'
import React, { useState } from 'react'
import { addSchoolClass } from '../../services/AdminApi'

const AddSchoolClass = () => {

    const [name, setName] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleAddSchoolClass = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            console.log('Validation failed. Errors:', errors);
            return;
          }
        try{
            const response = await addSchoolClass({
              name
          });
          console.log('Server Response:', response);
          if (response.status === 201) {
              alert('Uspješno dodavanje odjeljenja!');
          } else {
              alert(`Unexpected status: ${response.status}`);
          }
            } catch (error) {
              console.error('Došlo je do greške prilikom dodavanja odjeljenja!', error);
              alert('Registration failed!');
            }
         
    }

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!name) newErrors.name = 'Unesite odjeljenje';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

  return (
    <Box component="div" className="container">
        <Typography variant='h4' component="h2" className="title">Dodavanje odjeljenja</Typography>
        <Box component="form" onSubmit={handleAddSchoolClass} noValidate autoComplete="off">
        <label>ODJELJENJE</label>
        <StyledTxtField
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          
          required
          margin="none"
          error={!!errors.name}
          helperText={errors.setName}
        />
        <Button className='submitButton'  type="submit" variant="contained" fullWidth sx={{
                                                marginTop: '20px',
                                                backgroundColor: '#3c3c3c',
                                                color: '#fff',
                                                borderRadius: '50px',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: '#606060'
                                                }
                                            }}> Dodaj</Button>
        </Box>
    </Box>
  )
}

export default AddSchoolClass