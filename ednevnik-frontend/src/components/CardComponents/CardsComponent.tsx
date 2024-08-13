import { Container, Grid } from "@mui/material";
import React, { useState } from "react";
import ClassCard from "./ClassCard";
import axiosInstance from "../../services/axiosConfig";
import ISchoolClass, { initialClasses } from "../../models/ISchoolClass";

const CardsComponent = (props: any) => {
  const [classes, setClasses] = useState(initialClasses);
  React.useEffect(() => {
    axiosInstance
      .get("/api/school-classes")
      .then((response) => {
        setClasses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Container>
      <Grid container spacing={3}>
        {classes.map((c: ISchoolClass) => (
          <Grid item key={c.schoolClassId} xs={12} md={6} lg={4}>
            <ClassCard schoolClass={c} openCard={props.openCard}></ClassCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CardsComponent;
