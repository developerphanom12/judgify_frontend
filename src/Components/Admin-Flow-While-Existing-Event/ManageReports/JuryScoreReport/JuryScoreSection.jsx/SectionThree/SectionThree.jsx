import React from "react";
import "./SectionThree.scss";
import {  Description, GreenSubDescription, PaymentPendingHeading } from "../../../../../Global/GlobalText";
import { CheckboxInput } from "../../../../../Global/GlobalFormElement";
import { GreyBorderButton, RedBackgroundButton } from "../../../../../Global/GlobalButton";


export const SectionThree = ({ setSelectedButton }) => {
  return (
    <div>
      <div className="section_one_three">
        <GreenSubDescription>Please Select Report Format</GreenSubDescription>
        <div className="sectionthree_mainradio">

          <div className="section_three_radio">
            <input type="radio" name="radio" value="Free" defaultChecked />
            <PaymentPendingHeading>Report Type</PaymentPendingHeading>
          </div>

          <div className="section_three_check">
              <div className="section_three_checkbox">
                 <CheckboxInput type="checkbox"></CheckboxInput>
                       <Description>Score set 1</Description>

              </div>

              <div className="section_three_checkbox">
                 <CheckboxInput type="checkbox"></CheckboxInput>
                       <Description>Score set 2</Description>

              </div>

              <div className="section_three_checkbox">
                 <CheckboxInput type="checkbox"></CheckboxInput>
                       <Description>Score set 3</Description>

              </div>

              <div className="section_three_checkbox">
                 <CheckboxInput type="checkbox"></CheckboxInput>
                       <Description>Score set 4</Description>

              </div>

              <div className="section_three_checkbox">
                 <CheckboxInput type="checkbox"></CheckboxInput>
                    <Description>Score set 5</Description>

              </div>

          </div>

          <div className="section_three_btn">
                  <GreyBorderButton onClick={() => setSelectedButton(2)}>
                        Cancel
                  </GreyBorderButton>
                 <RedBackgroundButton onClick={() => setSelectedButton(4)}>Next</RedBackgroundButton>
             </div>


        </div>
      </div>
    </div>
  );
};
