import { Container, Grid } from "@mui/material";
import CardsComponent from "../CardComponents/CardsComponent";
import ISchoolClass, { initialClasses } from "../../models/ISchoolClass";
import { useState } from "react";
import React from "react";
import { useAuth } from "../../contexts/AuthenticationContext";
import { getClassesByUserId } from "../../services/UserApi";
import CardComponent from "../CardComponents/CardComponent";
import { useNavigate } from "react-router-dom";


const ShowAllClassesComponent = (props: any) => {
   
    const navigate = useNavigate();
    const authentication = useAuth();
    const [classes, setClasses] = useState(initialClasses);
    React.useEffect(() => {
     getClassesByUserId(authentication?.getUserId()).then(
        resp => setClasses(resp.data)
     )
    }, []);

    function openCard(id:number){
        navigate("/showClassDetails/" + id);
    }
      return (
        <Container>
        <Grid container spacing={3}>
          {classes.map((c: ISchoolClass) => (
            <Grid item key={c.schoolClassId} xs={12} md={6} lg={4}>
              <CardComponent schoolClass={c} openCard={openCard}></CardComponent>
            </Grid>
          ))}
        </Grid>
      </Container>
      );
  };
  
  export default ShowAllClassesComponent;