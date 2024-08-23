import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, IconButton, MenuItem, FormControl, InputLabel, Select, Paper } from "@mui/material";
import { Save, Cancel } from "@mui/icons-material";
import { getScheduleSubjects, addScheduleSubject, updateScheduleSubject } from "../../services/ScheduleSubjectApi";
import { getSubjects } from "../../services/SubjectApi";
import { useParams } from "react-router-dom";
import SaveIcon from '@mui/icons-material/Save';
import EditableTableComponent from "../TableComponent/EditTableComponent";
import axiosInstance from "../../services/axiosConfig";
import { AxiosError } from "axios";


interface ScheduleSubject {
  scheduleSubjectId: number;
  subjectOrder: number;
  day: string;
  subjectId: number; 
  classScheduleId: number;
  subject?: Subject;
  subjectName?: string;
}

interface Subject {
  subjectId: number;
  name: string;
}
const CreateScheduleComponent = () => {
  
  const { classScheduleId } = useParams();
  const [scheduleSubjects, setScheduleSubjects] = useState<ScheduleSubject[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [temporaryData, setTemporaryData] = useState<ScheduleSubject[]>([]);
  const [originalData, setOriginalData] = useState([]); 
  const [modifiedData, setModifiedData] = useState([]);

  const daysOfWeek = ["Ponedeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
  const predefinedRowCount = 6; 

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axiosInstance.get<Subject[]>('/api/subjects/getAll');
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchScheduleSubjects = async () => {
      if (!classScheduleId) {
        console.error('classScheduleId is missing');
        return;
      }
  
      try {
        const response = await axiosInstance.get<ScheduleSubject[]>(`api/schedule-subjects/class-schedule/${classScheduleId}`);
        const existingData = response.data;
  
        
        const formattedData = existingData.map(item => ({
          ...item,
          subjectId: item.subject?.subjectId || 0,
          subjectName: item.subject?.name || '' 
        }));
  
        setScheduleSubjects(formattedData);
        setTemporaryData(generateTableData(formattedData));
      } catch (error) {
        console.error('Error fetching schedule subjects:', error);
      }
    };
  
    fetchScheduleSubjects();
  }, [classScheduleId]);

  const generateTableData = (data: ScheduleSubject[]) => {
    const tableData = [];
  
    for (const day of daysOfWeek) {
      for (let i = 1; i <= predefinedRowCount; i++) {
        const existingEntry = data.find(d => d.day === day && d.subjectOrder === i);
        tableData.push({
          scheduleSubjectId: existingEntry?.scheduleSubjectId || -1,
          subjectOrder: i,
          day,
          subjectId: existingEntry?.subjectId || 0,
          subjectName: existingEntry?.subjectName || '', 
          classScheduleId: Number(classScheduleId),
        });
      }
    }
  
    return tableData;
  };
  const handleInputChange = (rowNum: number, value: number, day: string) => {
    setTemporaryData((prevData) => {
        return prevData.map(item => {
            if (item.subjectOrder === rowNum && item.day === day) {
                return { ...item, subjectId: value }; 
            }
            return item; 
        });
    });
};
const fetchScheduleSubjects = async () => {
  if (!classScheduleId) {
    console.error('classScheduleId is missing');
    return;
  }

  try {
    const response = await axiosInstance.get<ScheduleSubject[]>(`api/schedule-subjects/class-schedule/${classScheduleId}`);
    const existingData = response.data;

    
    const formattedData = existingData.map(item => ({
      ...item,
      subjectId: item.subject?.subjectId || 0,
      subjectName: item.subject?.name || '' 
    }));

    setScheduleSubjects(formattedData);
    setTemporaryData(generateTableData(formattedData));
  } catch (error) {
    console.error('Error fetching schedule subjects:', error);
  }
};

const handleSave = async () => {
  try {
    const itemsToSend = temporaryData.filter(item => item.subjectId !== 0);

    const newItems = itemsToSend.filter(item => item.scheduleSubjectId === -1);
    const existingItems = itemsToSend.filter(item => item.scheduleSubjectId !== -1);


    for (const item of newItems) {
      const payload = {
        subjectOrder: item.subjectOrder,
        day: item.day,
        subjectId: item.subjectId,
        classScheduleId: item.classScheduleId
      };

      try {
        const response = await axiosInstance.post("api/schedule-subjects/add", payload);
       alert("Dodavanje uspješno")
        const newId = response.data.scheduleSubjectId;
        setTemporaryData(prevData =>
          prevData.map(data =>
            data.subjectOrder === item.subjectOrder && data.day === item.day
              ? { ...data, scheduleSubjectId: newId }
              : data
          )
        );
      } catch (postError) {
        if (postError instanceof AxiosError) {
          console.error('Error during POST request for new items:', postError.response?.data || postError.message);
        } else {
          console.error('Unexpected error during POST request for new items:', (postError as Error).message);
        }
      }
    }

    
    for (const item of existingItems) {
      const originalItem = scheduleSubjects.find(sub => sub.scheduleSubjectId === item.scheduleSubjectId);
      
      if (
        originalItem &&
        (originalItem.subjectId !== item.subjectId ||
          originalItem.day !== item.day ||
          originalItem.subjectOrder !== item.subjectOrder)
      ) {
        const payload = {
          scheduleSubjectId: item.scheduleSubjectId,
          subjectOrder: item.subjectOrder,
          day: item.day,
          subjectId: item.subjectId,
          classScheduleId: item.classScheduleId
        };

        try {
          const response = await axiosInstance.put(`api/schedule-subjects/${item.scheduleSubjectId}`, payload);
          alert("Editovanje uspješno")
          if (response.status === 200) {
            setTemporaryData(prevData =>
              prevData.map(data =>
                data.scheduleSubjectId === item.scheduleSubjectId
                  ? { ...data, ...item }
                  : data
              )
            );
          }
        } catch (putError) {
          if (putError instanceof AxiosError) {
            console.error('Error during PUT request for update:', putError.response?.data || putError.message);
          } else {
            console.error('Unexpected error during PUT request for update:', (putError as Error).message);
          }
        }
      }
    }

  
    await fetchScheduleSubjects();
  } catch (error) {
    console.error('Error saving schedule subjects:', error);
  }
};
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Raspored časova
      </Typography>
      <TableContainer component={Paper} style={{ maxHeight: "530px", overflowY: "auto" }}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell sx={{background: "#d6d6d6"}}></TableCell> {}
              {daysOfWeek.map(day => (
                <TableCell sx={{background: "#d6d6d6"}} key={day} align="center">{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: predefinedRowCount }, (_, i) => i + 1).map(rowNum => (
              <TableRow key={rowNum}>
                <TableCell>{rowNum}</TableCell>
                {daysOfWeek.map(day => {
                  const item = temporaryData.find(d => d.subjectOrder === rowNum && d.day === day);
                  return (
                    <TableCell key={`${day}-${rowNum}`}>
                      <FormControl fullWidth>
                      <Select
                          value={item?.subjectId || ''}
                          onChange={(e) => handleInputChange(rowNum, +e.target.value, day)}
                        >
                          {subjects.map((subject) => (
                            <MenuItem key={subject.subjectId} value={subject.subjectId}>
                              {subject.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button className='submitButton'
                onClick={handleSave}
                type="submit" variant="contained" fullWidth sx={{
                  width: "10%",
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
  )
}

export default CreateScheduleComponent