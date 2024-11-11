import React from "react";
import "./NewPassword.scss";
import logo from "../../../../Assets/logoaward.png";
import {
  LoginHeading,
  LoginSubHeading,
  RegisterGreenHeading,
  RegisterGreyHeading,
} from "../../../Global/GlobalText";
import { InputLabel, InputType } from "../../../Global/GlobalFormElement";
import { Redbutton } from "../../../Global/GlobalButton";
import { useNavigate } from "react-router-dom";

export const NewPassword = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="main_bg_color">
        <div className="logo_div">
          <img src={logo} alt="logo" />
        </div>
        <div className="register_div">
          <LoginHeading>Your Awards Management System</LoginHeading>
          <div className="reg_form_div">
            <LoginSubHeading>Forget Password?</LoginSubHeading>
            <div className="fields_div">
              <div className="label_div">
                <InputLabel>New Password</InputLabel>
                <InputType placeholder="Enter New Password" />
              </div>

              <div className="label_div">
                <InputLabel>Comfirm Password</InputLabel>
                <InputType placeholder="Re-Enter your New Password" />
              </div>

              <div className="log_btn_div">
                <Redbutton
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  RESET PASSWORD
                </Redbutton>
              </div>

              <div className="already_account">
                <RegisterGreyHeading>Back to</RegisterGreyHeading>
                <RegisterGreenHeading
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  LOGIN
                </RegisterGreenHeading>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
