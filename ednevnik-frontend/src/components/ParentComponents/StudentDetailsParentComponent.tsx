import { Box, Tab } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import React, { useEffect, useState } from "react";
import GenericGradesTable from "../TableComponent/GenericGradesTable";
import { getParentByUserId } from "../../services/ParentApi";
import { useAuth } from "../../contexts/AuthenticationContext";
import { getStudentByParentId } from "../../services/StudentApi";
import { getCurrentSchoolYear } from "../../services/SchoolClassApi";
import { getStudentGradesBySubjects } from "../../services/GradesApi";
import IStudentGrades from "../../models/IStudentGrades";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    const [visible, setVisible]= useState(false);




    return (
      
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    
      
    );
  }

const StudentDetailsParentComponent = () => {
    const [value, setValue] = React.useState(0);
    const authentication = useAuth();
    const [grades, setGrades] = useState<IStudentGrades[]>([]);

    const columns = [
        { header: "Predmet", field: "subjectName" },
        { header: "Profesor", field: "professorFullName" },
      ];

      useEffect(() => {


        getParentByUserId(authentication?.getUserId()).then((resp)=>
        getStudentByParentId(resp.data.parentId).then((response) => {
            console.log(response.data);

            getCurrentSchoolYear().then((year)=>
            {
                console.log(year.data);


                getStudentGradesBySubjects(year.data.schoolYearId,response.data.studentId).then((finalResponse)=>{
                    console.log(finalResponse.data);
                    setGrades(finalResponse.data);
                })
            })

            
        })
)

      })
 


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };

 
    function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

    return(
        <div>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}  aria-label="basic tabs example">
        <Tab label="Trenutni razred" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <GenericGradesTable
        columns={columns}
        data={grades}
        actions={[]}
      ></GenericGradesTable>
        
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      </div>
    )

}
export default StudentDetailsParentComponent;