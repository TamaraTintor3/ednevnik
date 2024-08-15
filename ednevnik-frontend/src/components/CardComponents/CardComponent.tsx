import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const CardComponent = (props: any) => {
  function clickOnCard() {
    props.openCard(props.schoolClass.schoolClassId)
  }
  return (
    <div>
      <Card style={{ backgroundColor: "#d6d6d6" }} onClick={clickOnCard}>
        <CardHeader
          title={props.schoolClass.name}
          subheader={
            props.schoolClass.schoolYearYear +
            "  - " +
            props.schoolClass.schoolYearSemester +
            ". polugodište"
          }
        ></CardHeader>
        {/* <CardContent>
          <Typography>
            {props.schoolClass.professors
              ? props.schoolClass.professors.firstName
              : "" + " " + props.schoolClass.professors
              ? props.schoolClass.professors.lastName
              : ""}
          </Typography>
        </CardContent> */}
        <hr color="white"></hr>
      </Card>
    </div>
  );
};

export default CardComponent;
