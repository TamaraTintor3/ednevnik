import React from 'react'
import './TableComponent.css'

interface Column {
    header : string;
    field: string;
}

interface Action {
  label: string;
  onClick: (item: any) => void;
}

interface TableComponentProps{
    columns : Column[];
    data : any[];
    actions: Action[];
}



const TableComponent : React.FC<TableComponentProps> = ({columns, data, actions}) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
           {actions.length > 0 && <th>Akcije</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>{row[column.field]}</td>
            ))}
            {actions.length > 0 && (
              <td>
                {actions.map((action, actionIndex) => (
                  <button key={actionIndex} onClick={() => action.onClick(row)}>
                    {action.label}
                  </button>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableComponent