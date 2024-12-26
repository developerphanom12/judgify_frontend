import React from "react";
import "./UserRegistrationProfile.scss";
import {  RedMainHeading } from "../../Global/GlobalText";
import { InputLabel, InputType, SelectBorder } from "../../Global/GlobalFormElement";
import {  GreyBorderButton, RedBackgroundButton } from "../../Global/GlobalButton";
import { UserTopBanner } from "../../Global/User-Flow/UserTopBanner/UserTopBanner";
import { UserBottomBar } from "../../Global/User-Flow/UserBottomBar/UserBottomBar";

export const UserRegistrationProfile = () => {
  return (
    <>

      <UserTopBanner/>

      <div className="registration_form_main">
        <div className="registration_form">
          <RedMainHeading>Registration Profile</RedMainHeading>
        </div>

        <form className="registration_form_div">

          <div className="registration_form_row">
            <div className="registration_form_label">
              <InputLabel>
              First Name<span style={{ color: "#c32728" }}>*</span>
              </InputLabel>
              <InputType placeholder="Enter Your First Name" />
            </div>

            <div className="registration_form_label">
              <InputLabel>
              Last Name
                <span style={{ color: "#c32728" }}>*</span>
              </InputLabel>
              <InputType placeholder="Enter Your Last Name" />
            </div>
          </div>

          <div className="registration_form_row">
            <div className="registration_form_label">
              <InputLabel>
              Email
                <span style={{ color: "#c32728" }}>*</span>
              </InputLabel>
              <InputType placeholder="Enter Email Address" />
            </div>

            <div className="registration_form_label">
              <InputLabel>
              Password <span style={{ color: "#c32728" }}>*</span>
              </InputLabel>
              <InputType placeholder="Enter Password" />
            </div>
          </div>

          <div className="registration_form_row">
          <div className="registration_form_label">
              <InputLabel>Country</InputLabel>
              <SelectBorder>
                <option value="Lorem Ipsum">Australia</option>
                <option value="Lorem Ipsum">India</option>
                <option value="Lorem Ipsum">Pakistan</option>
              </SelectBorder>
            </div>

            <div className="registration_form_label">
              <InputLabel>
              Organization Name<span style={{ color: "#c32728" }}>*</span>
              </InputLabel>
              <InputType placeholder="Enter Name of the Organization" />
            </div>
          </div>

          <div className="registration_form_row">
            <div className="registration_form_label">
              <InputLabel>
              Designation<span style={{ color: "#c32728" }}>*</span>
              </InputLabel>
              <InputType placeholder="Enter your Designation" />
            </div>

            <div className="registration_form_label">
              <InputLabel>
              Mobile Number
                <span style={{ color: "#c32728" }}>*</span>
              </InputLabel>
              <InputType placeholder="Enter Mobile No." />
            </div>
          </div>


          <div className="registration_form_btn_div">
                      <GreyBorderButton>
                        Cancel
                      </GreyBorderButton>
                    
                      <RedBackgroundButton>
                      Submit
                      </RedBackgroundButton>
         </div>


        </form>
      </div>

      <UserBottomBar/>

    </>
  );
};
