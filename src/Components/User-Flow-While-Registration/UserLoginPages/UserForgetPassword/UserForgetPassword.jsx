import React, { useState } from "react";
import "./UserForgetPassword.scss";
import {
  LoginSubHeading,
  RegisterGreenHeading,
  RegisterGreyHeading,
} from "../../../Global/GlobalText";
import { Redbutton } from "../../../Global/GlobalButton";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_EXCHNAGE_URL } from "../../../../Url/Url";
import logo from "../../../../Assets/logoaward.png";
import { InputLabel, InputType } from "../../../Global/GlobalFormElement";
import { useDispatch } from "react-redux";
import { setUserEmail } from "../../../Redux/Users/action";
export const UserForgetPassword = () => {
  const [forgetData, setforgetData] = useState({
    email: "",
  });

  const [porterrors, setPortErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hirePortSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleForgetSubmit = (e) => {
    e.preventDefault();
    const postApi = async () => {
      try {
        await hirePortSchema.validate(forgetData, { abortEarly: false });
        const response = await axios.post(
          `${USER_EXCHNAGE_URL}/send_otp`,
          forgetData
        );
        if (response.status === 200) {
          dispatch(setUserEmail(forgetData.email));
          console.log("portData", response.portData);
          navigate("/user-otp");
          toast.success("Submit Successfully");
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
          toast.error("Failed to submit. Please try again later.");
          console.error("API Error:", error);
        }
      }
    };
    postApi();
  };

  const handlePortData = (e) => {
    setforgetData({ ...forgetData, [e.target.name]: e.target.value });
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

            {/* <div className="fields_div"> */}
            <form onSubmit={handleForgetSubmit}>
              <div className="label_div">
                <InputLabel>Email Address</InputLabel>
                <InputType
                  name="email"
                  value={forgetData.email}
                  onChange={handlePortData}
                  placeholder="Enter your email address"
                />
                {porterrors.email && (
                  <p className="error">{porterrors.email}</p>
                )}
              </div>

              <div className="log_btn_div">
                <Redbutton type="submit">Sumbit</Redbutton>
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
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
