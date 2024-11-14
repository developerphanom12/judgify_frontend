import React, { useState } from "react";
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
import * as yup from "yup";
import axios from "axios";
import { EXCHNAGE_URL } from "../../../../Url/Url";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const NewPassword = () => {
  const [newPass, setNewPassword] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const [porterrors, setPortErrors] = useState({});

  const email = useSelector((state) => state.users?.email || "");

  console.log("Email from Redux state for verfiy:", email); 

  const hirePortSchema = yup.object().shape({
    newPassword: yup.string().required("New password is required").min(8, "Password must be at least 8 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });
  


  const handleforgetPswrd = (e) => {
    e.preventDefault();
    const postApi = async () => {
      try {
        await hirePortSchema.validate(newPass, { abortEarly: false });
        
        const response = await axios.post(`${EXCHNAGE_URL}/updateForgetPassword`, {
          email,
          newPassword: newPass.newPassword,
          confirmPassword: newPass.confirmPassword
        });
        if (response.status === 200) {
          navigate("/login");
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

  const handleNewPassword = (e) => {
    setNewPassword({ ...newPass, [e.target.name]: e.target.value });
  };



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
            <form onSubmit={handleforgetPswrd}>
            {/* <div className="fields_div"> */}
              <div className="label_div">
                <InputLabel>New Password</InputLabel>
                <InputType 
                 name="newPassword"
                 value={newPass.newPassword}
                 onChange={handleNewPassword}
                 placeholder="Enter New Password" />
                 {porterrors.newPassword && <p className="error">{porterrors.newPassword}</p>}
              </div>

              <div className="label_div">
                <InputLabel>Comfirm Password</InputLabel>
                <InputType 
                name="confirmPassword"
                value={newPass.confirmPassword}
                onChange={handleNewPassword}
                placeholder="Re-Enter your New Password"/>
                {porterrors.confirmPassword && <p className="error">{porterrors.confirmPassword}</p>}
              </div>

              <div className="log_btn_div">
                <Redbutton
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
            {/* </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
