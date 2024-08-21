import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Checkbox, Box, Typography } from '@mui/material'
import { getAbsencesByStudentId, updateAbsence, getStudentById } from '../../services/AbsenceApi'
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

  interface Student {
    firstName: string;
    lastName: string;
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
    const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    if (studentId) {
      getStudentById(Number(studentId))
          .then((response: any) => {
              setStudent(response.data);
          })
          .catch((error: any) => {
              console.log(error);
          });
          getAbsencesByStudentId(Number(studentId))
          .then((response: any) => {
            const sortedAbsences = response.data.sort((a: Absence, b: Absence) => {
              return new Date(b.dateOfAbsence).getTime() - new Date(a.dateOfAbsence).getTime();
            });
            setAbsences(sortedAbsences);
          })
          .catch((error: any) => {
            console.log(error);
          });
  }}, [studentId]);

  const updateAbsenceReason = (absenceId: number, reason: string, approved: boolean) => {
    updateAbsence(absenceId, { reason, approved })
      .then(() => {
        setAbsences(prevAbsences =>
          prevAbsences.map(absence =>
            absence.absenceId === absenceId
              ? { ...absence, reason, approved }
              : absence
          )
        );
        alert('Izostanak uspješno editovan!');
      })
      .catch((error: any) => {
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
      {student && (
                <Typography variant="inherit" gutterBottom>
                    Izostanci za učenika: {student.firstName} {student.lastName}
                </Typography>
            )} 
      <EditableTableComponent columns={columns} data={absences} actions={actions} />
    </Box>
  )
}

export default StudentAbsencesPage