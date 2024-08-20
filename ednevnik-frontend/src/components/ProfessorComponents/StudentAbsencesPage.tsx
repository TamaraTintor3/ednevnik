import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Checkbox, Button, Box } from '@mui/material'
import { getAbsencesByStudentId, updateAbsence } from '../../services/AbsenceApi'
import EditableTableComponent from '../TableComponent/EditTableComponent'
import { StyledTxtField } from '../LoginComponent/LoginTxtFieldStyled'
import SaveIcon from '@mui/icons-material/Save';


interface Absence {
    absenceId: number;
    dateOfAbsence: string;
    numberOfClasses: number;
    reason: string;
    approved: boolean;
  }

  interface Column {
    header: string;
    field: string;
    render?: (rowData: Absence) => React.ReactNode;
  }

const StudentAbsencesPage = () => {
    const { studentId } = useParams();
    console.log("Student ID:", studentId);
    const [absences, setAbsences] = useState<Absence[]>([]);

  useEffect(() => {
    getAbsencesByStudentId(Number(studentId))
      .then((response) => {
        setAbsences(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [studentId]);

  const updateAbsenceReason = (absenceId: number, reason: string, approved: boolean) => {
    updateAbsence(absenceId, { reason, approved })
      .then(() => {
        getAbsencesByStudentId(Number(studentId))
          .then((response) => {
            setAbsences(response.data);
            alert('Izostanak uspješno editovan!');
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      });
};
  
  const columns: Column[] = [
    { header: "Datum", field: "dateOfAbsence" },
    { header: "Broj izostanaka", field: "numberOfClasses" },
    {
      header: "Razlog",
      field: "reason",
      render: (rowData) => (
        <StyledTxtField
        variant="outlined"
          value={rowData.reason || ""}
          onChange={(e) => {
            const updatedReason = e.target.value;
            setAbsences(prev =>
              prev.map(item =>
                item.absenceId === rowData.absenceId
                  ? { ...item, reason: updatedReason }
                  : item
              )
            );
          }}
        />
      )
    },
    {
      header: "Opravdan",
      field: "approved",
      render: (rowData) => (
        <Checkbox
          checked={rowData.approved}
          onChange={(e) => {
            const updatedApproved = e.target.checked;
            setAbsences(prev =>
              prev.map(item =>
                item.absenceId === rowData.absenceId
                  ? { ...item, approved: updatedApproved }
                  : item
              )
            );
          }}
        />
      )
    }
  ];

  const actions = [
    {
        icon: <SaveIcon titleAccess='Sačuvaj' sx={{ color: 'gray' }} />,
      onClick: (item: Absence) => updateAbsenceReason(item.absenceId, item.reason || "", item.approved)
    }
  ];

  return (
    <Box pt={6}> 
      <EditableTableComponent columns={columns} data={absences} actions={actions} />
    </Box>
  )
}

export default StudentAbsencesPage