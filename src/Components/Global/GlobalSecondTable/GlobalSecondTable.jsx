import React from 'react'
import "./GlobalSecondTable.scss";


export const GlobalSecondTable = ({ data, columns, selectedRows, onCheckboxChange, onRowClick }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <div className="global_col">
              <span>Select</span>
            </div>
          </th>
          {columns.map((col, idx) => (
            <th key={idx} className="table_col">
              <div className="global_col">
                <span>{col}</span>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} onClick={() => onRowClick && onRowClick(row)}>
            <td>
              <input
                type="checkbox"
                checked={selectedRows.includes(idx)}
                onChange={(e) => onCheckboxChange(idx, e.target.checked)}
              />
            </td>
            {columns.map((col, colIdx) => (
              <td key={colIdx}>{row[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
