import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosConfig";
import { Typography } from "@mui/material";
import { initialClass } from "../../models/ISchoolClass";
import TableComponent from "../TableComponent/TableComponent";

const ClassDetailsComponent = (props: any) => {
  const { id } = useParams();
  const [schoolClass, setSchoolClass] = useState(initialClass);
  React.useEffect(() => {
    axiosInstance
      .get("/api/school-classes/" + id)
      .then((response) => {
        setSchoolClass(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const columns = [
    { header: "Ime", field: "firstName" },
    { header: "Prezime", field: "lastName" },
    { header: "Roditelj", field: "parent" },
  ];
  return (
    <div>
      <Typography variant="h4">{schoolClass.name}</Typography>
      <Typography>
        {" " +
          schoolClass.schoolYearYear +
          " " +
          schoolClass.schoolYearSemester +
          ". polugodište"}
      </Typography>
      {schoolClass.professors.map(
        (p) => p.userFirstName + " " + p.userLastName
      )}
      <br />
      <br />
      <TableComponent
        columns={columns}
        data={schoolClass.students.map((s) => ({
          ...s,
          parent: s.parent.userFirstName + " " + s.parent.userLastName,
        }))}
        actions={[]}
      ></TableComponent>
    </div>
  );
};

export default ClassDetailsComponent;
