import React from 'react'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Checkbox } from '@mui/material';
import './TableComponent.css'

interface Column {
    header: string;
    field: string;
    render?: (rowData: any) => React.ReactNode;
}

interface Action {
  icon: React.ReactNode;
  onClick: (item: any) => void;
}

interface EditableTableComponentProps {
    columns: Column[];
    data: any[];
    actions: Action[];
}

const EditableTableComponent: React.FC<EditableTableComponentProps> = ({ columns, data, actions }) => {
  return (
    <TableContainer component={Paper} className="table-container">
      <Table stickyHeader className="table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index} className="header-cell" sx={{
                backgroundColor: '#d6d6d6',
                fontWeight: 'bold',
              }}>{column.header}</TableCell>
            ))}
            {actions.length > 0 && <TableCell className="header-cell" sx={{ fontWeight: 'bold', backgroundColor: '#d6d6d6', textAlign: "center" }}>Akcije</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell className="cell" key={colIndex}>
                  {column.render ? column.render(row) : row[column.field]}
                </TableCell>
              ))}
              {actions.length > 0 && (
                <TableCell sx={{ textAlign: "center" }}>
                  {actions.map((action, actionIndex) => (
                    <Button key={actionIndex} onClick={() => action.onClick(row)}>
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
}

export default EditableTableComponent
