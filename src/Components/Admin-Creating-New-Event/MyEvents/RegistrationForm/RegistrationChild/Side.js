import React from 'react';
import './Side.css'

const Side = ({ addField }) => {
  const fields = [
    { label: 'Header', type: 'header' },
    { label: 'Single Line Text', type: 'text' },
    { label: 'Paragraph Text', type: 'textarea' },
    { label: 'Radio Button', type: 'radio' },
    { label: 'Checkbox', type: 'checkbox' },
    { label: 'Dropdown', type: 'dropdown' },
    { label: 'Email Field', type: 'email' },
    { label: 'Phone Number', type: 'tel' },
    { label: 'Date Picker', type: 'date' },
    { label: 'Country List', type: 'country' },
    { label: 'File Upload', type: 'file' },
  ];

  return (
    <div className="Side">
      {fields.map((field, index) => (
        <button  className='reg_button' key={index} onClick={() => addField(field.type)}>
          {field.label}
        </button>
      ))}
    </div>
  );
};

export default Side;
