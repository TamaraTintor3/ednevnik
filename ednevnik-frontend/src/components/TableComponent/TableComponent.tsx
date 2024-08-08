import React from 'react'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import './TableComponent.css'


interface Column {
    header : string;
    field: string;
}

interface Action {
  icon: React.ReactNode;
  onClick: (item: any) => void;
}

interface TableComponentProps{
    columns : Column[];
    data : any[];
    actions: Action[];
}



const TableComponent : React.FC<TableComponentProps> = ({columns, data, actions}) => {
  return (
    <TableContainer  component={Paper} className="table-container">
    <Table className="table">
      <TableHead >
        <TableRow>
          {columns.map((column, index) => (
            <TableCell key={index} className="header-cell" sx={{ fontWeight: 'bold' }}>{column.header}</TableCell>
          ))}
           {actions.length > 0 && <TableCell className="header-cell" sx={{ fontWeight: 'bold' }}>Akcije</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column, colIndex) => (
              <TableCell className="cell" key={colIndex}>{row[column.field]}</TableCell>
            ))}
            {actions.length > 0 && (
              <TableCell>
                {actions.map((action, actionIndex) => (
                  <Button variant="contained" color="primary"  key={actionIndex} onClick={() => action.onClick(row)}>
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

export default TableComponent