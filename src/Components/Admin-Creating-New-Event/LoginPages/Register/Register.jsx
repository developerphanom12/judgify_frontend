import React from "react";
import "./Register.scss";
import logo from "../../../../Assets/logoaward.png";
import { LoginHeading, LoginSubHeading, RegisterGreenHeading, RegisterGreyHeading } from "../../../Global/GlobalText";
import {
  CheckboxInput,
  CheckboxLabel,
  InputLabel,
  InputType,
  SelectBorder,
} from "../../../Global/GlobalFormElement";
import { GreenBackgroundButton, Redbutton } from "../../../Global/GlobalButton";

export const Register = () => {
  return (
    <>
      <div className="main_bg_color">
        <div className="logo_div">
          <img src={logo} alt="logo" />
        </div>
        <div className="register_div">
          <LoginHeading>Your Awards Management System</LoginHeading>
          <div className="form_div">
            <LoginSubHeading>Create your account</LoginSubHeading>
            <div className="fields_div">
              <div className="label_div">
                <InputLabel>First Name</InputLabel>
                <InputType placeholder="Enter your First Name" />
              </div>

              <div className="label_div">
                <InputLabel>Last Name</InputLabel>
                <InputType placeholder="Enter your Last Name" />
              </div>

              <div className="label_div">
                <InputLabel>Email</InputLabel>
                <InputType placeholder="Enter your email address" />
              </div>

              <div className="label_div">
                <InputLabel>Password</InputLabel>
                <InputType placeholder="Enter your Password" />
              </div>

              <div className="label_div">
                <InputLabel>Company</InputLabel>
                <InputType placeholder="Enter your Company Name" />
              </div>

              <div className="label_div">
                <InputLabel>Mobile Number</InputLabel>
                <InputType placeholder="Enter your Mobile Number" />
              </div>

              <div className="label_div">
                <InputLabel>Country</InputLabel>
                <SelectBorder placeholder="Enter your Mobile Number">
                  <option>Select Country</option>
                  <option>Pakistan</option>
                  <option>India</option>
                  <option>Bangladesh</option>
                  <option>Nepal</option>
                </SelectBorder>
              </div>

              <div className="checkdiv">
                 <CheckboxInput  type="checkbox"/>
                 <CheckboxLabel> By creating an account, you agree to the Privacy Policy,  Terms of Uses,  Cookie Policy, and  PDPA statement</CheckboxLabel>
              </div>

              <Redbutton>REGISTER</Redbutton>

              <div className="already_account">
                  <RegisterGreyHeading>Already have an account?</RegisterGreyHeading>
                  <RegisterGreenHeading style={{cursor:"pointer"}}>Login</RegisterGreenHeading>
              </div>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};
