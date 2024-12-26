import React from 'react';
import './Side.css'
import {  MdLocalPhone, MdRadioButtonUnchecked } from "react-icons/md";
import { ImTextWidth } from "react-icons/im";
import { PiTextAUnderlineBold } from "react-icons/pi";
import { IoMdCheckboxOutline } from "react-icons/io";
import { FaAlignLeft } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { GrGallery } from "react-icons/gr";
import { RxDropdownMenu } from "react-icons/rx";
import { RiMailLine, RiParagraph } from 'react-icons/ri';


const Side = ({ addField }) => {
  
  const fields = [
    { label: <PiTextAUnderlineBold />, type: 'label'},   //,'Header'
    { label: <ImTextWidth/>, type: 'text'},   //'Single Line Text'
    { label: <RiParagraph/>, type: 'textarea' }, //'Paragraph Text'
    { label: <MdRadioButtonUnchecked />, type: 'radio' },  //'Radio Button'
    { label: <IoMdCheckboxOutline />, type: 'checkbox' }, //'Checkbox'
    { label: <FaAlignLeft/>, type: 'dropdown' },   //'Dropdown'
    { label: <RiMailLine />,  type: 'email' },  //'Email Field'
    { label: <MdLocalPhone />, type: 'tel' },  // 'Phone Number'
    { label: <SlCalender />, type: 'date' }, //'Date Picker'
    { label: <RxDropdownMenu /> , type: 'country' }, //'Country List'
    { label: <GrGallery />, type: 'file' }, //'File Upload'
  ];

  return (
    <div className="side">
      {fields.map((field, index) => (
        <button  className='reg_button' key={index} onClick={() => addField(field.type)}>
          {field.label}
        </button>
      ))}
    </div>
  );
};

export default Side;
