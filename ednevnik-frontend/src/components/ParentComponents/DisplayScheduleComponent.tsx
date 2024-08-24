import React, {useState, useEffect} from 'react'
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useAuth } from "../../contexts/AuthenticationContext";
import axiosInstance from '../../services/axiosConfig';


interface ScheduleSubject {
  scheduleSubjectId: number;
  subjectOrder: number;
  day: string;
  subject: {
    subjectId: number;
    name: string;
  };
  classSchedule: {
    classScheduleId: number;
    schoolClass: {
      schoolClassId: number;
      name: string;
    };
  };
}


const DisplayScheduleComponent = () => {
  const [classScheduleId, setClassScheduleId] = useState<number | null>(null);
  const [scheduleSubjects, setScheduleSubjects] = useState<ScheduleSubject[]>([]);
  const authentication = useAuth();
  const daysOfWeek = ["Ponedeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
  const predefinedRowCount = 6;


  useEffect(() => {
    if (authentication?.userId) {
      getClassScheduleId();
    }
  }, [authentication?.userId]);

  

  const getClassScheduleId = async () => {
    if (!authentication?.userId) {
        console.error('Authentication userId is undefined');
        return;
    }

    const userId = authentication.userId;

    try {
        const response = await axiosInstance.get(`/api/class-schedules/${userId}`);

        const classScheduleId = response.data.classScheduleId;
        setClassScheduleId(classScheduleId); 
        console.log('Class Schedule ID:', classScheduleId);

    } catch (error) {
        console.error('Greška:', error);
    }
};

useEffect(() => {
  const fetchScheduleSubjects = async () => {
      if (classScheduleId === null || typeof classScheduleId !== 'number') {

          return;
      }

      try {
          const response = await axiosInstance.get<ScheduleSubject[]>(`/api/schedule-subjects/class-schedule/${classScheduleId}`);
          setScheduleSubjects(response.data);
      } catch (error) {
          console.error('Error fetching schedule subjects:', error);
      }
  };

  fetchScheduleSubjects();
}, [classScheduleId]);
  return (
    
    <Box>
  <Typography variant="h6" gutterBottom>
    Prikaz rasporeda časova
  </Typography>
  <TableContainer component={Paper} style={{ maxHeight: "530px", overflowY: "auto" }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{background: "#d6d6d6"}} align="center"></TableCell> 
          {daysOfWeek.map(day => (
            <TableCell sx={{background: "#d6d6d6"}} key={day} align="center">{day}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.from({ length: predefinedRowCount }, (_, i) => i + 1).map(rowNum => (
          <TableRow key={rowNum}>
            <TableCell align="center">{rowNum}</TableCell> {}
            {daysOfWeek.map(day => {
              const item = scheduleSubjects.find(d => d.subjectOrder === rowNum && d.day === day);
              return (
                <TableCell key={`${day}-${rowNum}`} align="center"> {}
                  {item ? item.subject.name : 'predmet'}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Box>
  )
}

export default DisplayScheduleComponent