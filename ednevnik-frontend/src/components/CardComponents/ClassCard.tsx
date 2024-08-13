import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

const CardComponent = (props: any) => {
  return (
    <div>
      <Card style={{ backgroundColor: "#d6d6d6" }} onClick={props.openCard}>
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
        <hr></hr>
      </Card>
    </div>
  );
};

export default CardComponent;
