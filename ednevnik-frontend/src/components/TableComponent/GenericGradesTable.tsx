import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

interface Column {
  header: string;
  field: string;
}

interface Action {
  icon: React.ReactNode;
  onClick: (item: any) => void;
}

interface TableComponentProps {
  columns: Column[];
  data: any[];
  actions: Action[];
}

const GenericGradesTable: React.FC<TableComponentProps> = ({
  columns,
  data,
  actions,
}) => {
  return (
    <TableContainer component={Paper} className="table-container">
      <Table stickyHeader className="table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                className="header-cell"
                sx={{
                  backgroundColor: "#d6d6d6",
                  fontWeight: "bold",
                }}
              >
                {column.header}
              </TableCell>
            ))}
            <TableCell
              key="pismeni"
              className="header-cell"
              sx={{
                backgroundColor: "#d6d6d6",
                fontWeight: "bold",
              }}
            >
              Ocjene (pismeni)
            </TableCell>
            <TableCell
              key="usmeni"
              className="header-cell"
              sx={{
                backgroundColor: "#d6d6d6",
                fontWeight: "bold",
              }}
            >
              Ocjene (usmeni)
            </TableCell>
            {actions.length > 0 && (
              <TableCell
                className="header-cell"
                sx={{ fontWeight: "bold", backgroundColor: "#d6d6d6" }}
              >
                Akcije
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell className="cell" key={colIndex}>
                  {row[column.field]}
                </TableCell>
              ))}
              <TableCell>
                {row.gradesWritten &&
                  row.gradesWritten.map((g: any) => (
                    <TableRow>
                      {new Date(g.date).toLocaleDateString("sr") +
                        " (" +
                        g.grade +
                        ")"}
                    </TableRow>
                  ))}
              </TableCell>
              <TableCell>
                {row.gradesVerbal &&
                  row.gradesVerbal.map((g: any) => (
                    <TableRow>
                      {new Date(g.date).toLocaleDateString("sr") +
                        " (" +
                        g.grade +
                        ")"}
                    </TableRow>
                  ))}
              </TableCell>
              {actions.length > 0 && (
                <TableCell>
                  {actions.map((action, actionIndex) => (
                    <Button
                      key={actionIndex}
                      onClick={() => action.onClick(row)}
                    >
                      {action.icon}
                    </Button>
                  ))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GenericGradesTable;
