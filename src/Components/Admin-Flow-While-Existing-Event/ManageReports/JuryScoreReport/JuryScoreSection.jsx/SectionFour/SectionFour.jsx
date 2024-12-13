import React, { useState } from "react";
import "./SectionFour.scss";
import { GreenSubDescription } from "../../../../../Global/GlobalText";
import {
  GreyBorderButton,
  RedBackgroundButton,
  RedBordButton,
} from "../../../../../Global/GlobalButton";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
  InputType,
  SelectBorder,
} from "../../../../../Global/GlobalFormElement";
import { RiDeleteBin6Fill } from "react-icons/ri";

export const SectionFour = ({ setSelectedButton }) => {
  const [filters, setFilters] = useState([{ id: 1 }]); 

  const addFilter = () => {
    setFilters([...filters, { id: filters.length + 1 }]);
  };

   const handleRemoveFilter = (id) => {
    setFilters(filters.filter((filter) => filter.id !== id));
  };

  return (
    <div>
      <div className="section_four_main">
        <GreenSubDescription>Filter the report</GreenSubDescription>

     
        {filters.map((filter, index) => (
          <div key={filter.id} className="section_four_row_div">
            <SelectBorder className="section_four_label">
              <option value="Select">Select</option>
              <option value="Option1">Option1</option>
            </SelectBorder>

            <SelectBorder className="section_four_label">
              <option value="Select">Lorem Ipsum</option>
              <option value="Option2">Option2</option>
            </SelectBorder>

            <InputType
              type="text"
              placeholder="Select"
              className="section_four_input"
            />

          <RiDeleteBin6Fill   onClick={() => handleRemoveFilter(filter.id)}/>
          </div>
        ))}

        <div className="section_four_filter_btn">
          <RedBordButton
            className="jury_assignment_pluscontent"
            onClick={addFilter} // Handle button click
          >
            <IoMdAddCircleOutline />
            Add Filter
          </RedBordButton>
        </div>

        <div className="section_four_btn">
          <GreyBorderButton  onClick={() => setSelectedButton(3)}>Previous</GreyBorderButton>
          <RedBackgroundButton  onClick={() => setSelectedButton(5)}>Next</RedBackgroundButton>
        </div>

      </div>
    </div>
  );
};
