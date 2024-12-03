import React, { useState } from "react";
import "./Otp.scss";
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
import * as yup from "yup";
import axios from "axios";
import { EXCHNAGE_URL } from "../../../../Url/Url";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useLoading } from "../../../LoadingContext";
  
export const Otp = () => {
  const [otpData, setotpData] = useState({
    otp: "",
  });

  const [porterrors, setPortErrors] = useState({});
  const { setLoading } = useLoading();  //Loader


  const navigate = useNavigate();

  const email = useSelector((state) => state.users?.email || "");

  console.log("Email from Redux state for verfiy:", email);

  const hirePortSchema = yup.object().shape({
    otp: yup.number().required("Otp is required"),
  });

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setLoading(true); //Loader
    const postApi = async () => {
      try {
        await hirePortSchema.validate(otpData, { abortEarly: false });
        // const response = await axios.post(`${EXCHNAGE_URL}/send_otp`, otpData);
        const response = await axios.post(`${EXCHNAGE_URL}/verifyOtp`, {
          email,
          otp: otpData.otp,
        });
        if (response.status === 200) {
          console.log("portData", response.portData);
          navigate("/new-password");
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
      }finally {
        setLoading(false); //Loader
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
          <LoginHeading>Your Awards Management System</LoginHeading>
          <div className="reg_form_div">
            <LoginSubHeading>Forget Password?</LoginSubHeading>

           
              <form  onSubmit={handleOtpSubmit}>
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
                      navigate("/login");
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
