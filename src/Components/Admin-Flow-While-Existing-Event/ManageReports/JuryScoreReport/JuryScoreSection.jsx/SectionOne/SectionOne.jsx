import React from "react";
import "./SectionOne.scss";
import {
  Description,
  GreenSubDescription,
} from "../../../../../Global/GlobalText";
import { InputLabel } from "../../../../../Global/GlobalFormElement";
import { RedBackgroundButton } from "../../../../../Global/GlobalButton";

export const SectionOne = ({ setSelectedButton }) => {
  return (
    <div>
      <div className="section_one_main">
        <GreenSubDescription>Please Select Report Format</GreenSubDescription>

        <div className="section_mainradio">
          <InputLabel>Report Type</InputLabel>

          <div className="section_one_radio">
            <input type="radio" name="radio" value="Free" defaultChecked />
            <Description>Individual scores with all criteria</Description>
          </div>

          <div className="section_one_radio">
            <input type="radio" name="radio" value="Free"/>
            <Description>Top score report by each jury in column</Description>
          </div>
        </div>

        <div className="section_one_btn">
          <RedBackgroundButton onClick={() => setSelectedButton(2)}>Next</RedBackgroundButton>
        </div>
      </div>
    </div>
  );
};
