import { Container, Grid } from "@mui/material";
import React, { useState } from "react";
import ClassCard from "./CardComponent";
import axiosInstance from "../../services/axiosConfig";
import ISchoolClass, { initialClasses } from "../../models/ISchoolClass";
import { useNavigate } from "react-router-dom";

const CardsComponent = (props: any) => {
  const [classes, setClasses] = useState(initialClasses);
  const navigate = useNavigate();

  function openCard(id:number) {
    navigate("/class/" + id);
  }

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
            <ClassCard schoolClass={c} openCard={openCard}></ClassCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CardsComponent;
