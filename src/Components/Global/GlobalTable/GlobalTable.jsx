import React from "react";
import "./GlobalTable.scss";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

export const GlobalTable = ({ data, columns, onRowClick }) => (
  <table>
    <thead>
      <tr>
        {columns.map((col, idx) => (
          <th key={idx} className="table_col">
            <div className="global_col">
              <span>{col} </span>
              <span className="title_icon">
                <IoMdArrowDropup />
                <IoMdArrowDropdown />
              </span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, idx) => (
        <tr key={idx} onClick={() => onRowClick && onRowClick(row)}>
          {columns.map((col, colIdx) => (
            <td key={colIdx}>{row[col]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
