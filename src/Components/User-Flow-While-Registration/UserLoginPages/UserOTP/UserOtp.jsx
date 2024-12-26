import React, { useState } from "react";

import { toast } from "react-toastify";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import logo from "../../../../Assets/logoaward.png";
import { USER_EXCHNAGE_URL } from "../../../../Url/Url";
import { InputLabel, InputType } from "../../../Global/GlobalFormElement";
import { Redbutton } from "../../../Global/GlobalButton";
import {  LoginSubHeading, RegisterGreenHeading, RegisterGreyHeading } from "../../../Global/GlobalText";

export const UserOtp = () => {
  const [otpData, setotpData] = useState({
    otp: "",
  });
  const [porterrors, setPortErrors] = useState({});
  const navigate = useNavigate();
  const email = useSelector((state) => state.users?.email || "");
  console.log(" User Email from Redux state for verfiy:", email);

  const hirePortSchema = yup.object().shape({
    otp: yup.number().required("Otp is required"),
  });

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const postApi = async () => {
      try {
        await hirePortSchema.validate(otpData, { abortEarly: false });
        // const response = await axios.post(`${EXCHNAGE_URL}/send_otp`, otpData);
        const response = await axios.post(`${USER_EXCHNAGE_URL}/verifyOtp`, {
          email,
          otp: otpData.otp,
        });
        if (response.status === 200) {
          console.log("portData", response.portData);
          navigate("/user-new-password");
          toast.success("OTP Verified Successfully");
        }
      } catch (error) {
        if (error.inner) {
          const portErrors = error.inner.reduce((acc, validationError) => {
            acc[validationError.path] = validationError.message;
            return acc;
          }, {});
          setPortErrors(portErrors);
        } else {
          // Handling API errors
          toast.error("Failed to verify OTP. Please try again later.");
          console.error("API Error:", error);
        }
      }
    };
    postApi();
  };

  const handleotpData = (e) => {
    setotpData({ ...otpData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="main_bg_color">
        <div className="logo_div">
          <img src={logo} alt="logo" />
        </div>
        <div className="register_div">
          {/* <LoginHeading>Your Awards Management System</LoginHeading> */}
          <div className="reg_form_div">
            <LoginSubHeading>Forget Password?</LoginSubHeading>

            <form onSubmit={handleOtpSubmit}>
              <div className="label_div">
                <InputLabel>OTP</InputLabel>
                <InputType
                  name="otp"
                  value={otpData.otp}
                  onChange={handleotpData}
                  placeholder="Enter your OTP"
                />
                {porterrors.otp && <p className="error">{porterrors.otp}</p>}
              </div>

              <div className="log_btn_div">
                <Redbutton>CREATE NEW PASSWORD</Redbutton>
              </div>

              <div className="already_account">
                <RegisterGreyHeading>Back to</RegisterGreyHeading>
                <RegisterGreenHeading
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/user-login");
                  }}
                >
                  LOGIN
                </RegisterGreenHeading>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
