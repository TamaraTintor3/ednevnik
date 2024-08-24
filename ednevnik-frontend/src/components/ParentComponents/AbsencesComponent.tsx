import React, { useEffect, useState } from "react";
import ParentProvider from "../../contexts/ParentContext";
import { getParentByUserId } from "../../services/ParentApi";
import { useAuth } from "../../contexts/AuthenticationContext";
import { getCurrentSchoolYear } from "../../services/SchoolClassApi";
import { IschoolYearInitial } from "../../models/ISchoolYear";
import { Typography } from "@mui/material";
import TableComponent from "../TableComponent/TableComponent";
import { getAllAbsencesForParent } from "../../services/AbsenceApi";
import IAbsenceBehavior, {
  initialAbsenceBehavior,
} from "../../models/IAbsenceBehavior";

const columns = [
  { header: "Datum", field: "dateOfAbsence" },
  { header: "Broj časova", field: "numberOfClasses" },
  { header: "Opravdano", field: "approved" },
  { header: "Razlog", field: "reason" },
];
const AbsencesComponent = () => {
  const authentication = useAuth();
  const [schoolYear, setScholYear] = useState(IschoolYearInitial);
  const [absences, setAbsences] = useState<IAbsenceBehavior>(
    initialAbsenceBehavior
  );
  useEffect(() => {
    let parent = 0;
    getParentByUserId(authentication?.getUserId()).then((response) => {
      parent = response.data.parentId;

      getCurrentSchoolYear().then((resp) => {
        console.log(resp.data);
        setScholYear(resp.data);
      });
      getAllAbsencesForParent(parent)
        .then((response) => {
          setAbsences(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);
  return (
    <div>
      <Typography>
        Školska godina {schoolYear.year} {schoolYear.semester}. polugodište
      </Typography>

      <Typography variant="subtitle1">
        <i>Vladanje: {absences.behavior ? absences.behavior : ""}</i>
      </Typography>

      <TableComponent
        actions={[]}
        columns={columns}
        data={absences?.absences.map((absence) => ({
          ...absence,
          approved: absence.approved ? "Opravdan" : "Neopravdan",
          dateOfAbsence: new Date(absence.dateOfAbsence).toLocaleDateString(
            "sr"
          ),
        }))}
      ></TableComponent>
    </div>
  );
};

export default AbsencesComponent;
