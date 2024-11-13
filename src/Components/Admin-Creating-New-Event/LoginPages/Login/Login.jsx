import React, { useState } from "react";
import "./Login.scss";
import logo from "../../../../Assets/logoaward.png";
import {
  ForgetPassword,
  LoginHeading,
  LoginSubHeading,
  RegisterGreenHeading,
  RegisterGreyHeading,
} from "../../../Global/GlobalText";
import { InputLabel, InputType } from "../../../Global/GlobalFormElement";
import { Redbutton } from "../../../Global/GlobalButton";
import { useNavigate } from "react-router-dom";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import * as yup from "yup"; // For validation
import axios from "axios";
import { toast } from "react-toastify";
import { EXCHNAGE_URL } from "../../../../Url/Url";
import { useDispatch, useSelector } from "react-redux";
import { userCheckAction, userDataAction } from "../../../Redux/Users/action";

// Define the validation schema
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"), // Password validation
});

export const Login = () => {
  const { email, password } = useSelector((state) => state.users || {});

  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: email || "",
    password: password || "",
  });

  console.log("Email from Redux: ", email);
  console.log("Password from Redux: ", password);

  const [loginErrors, setLoginErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLoginData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginSchema.validate(loginData, { abortEarly: false });

      const response = await axios.post(`${EXCHNAGE_URL}/login`, loginData);

      if (response.status === 200) {
        console.log(
          "Login successful",
          response.data,
          response.data.data.token
        );
        // Assuming the API response contains the token
        localStorage.setItem("token", response.data.data.token); // Store token
        dispatch(userDataAction(response?.data?.data));
        dispatch(userCheckAction(true));
        toast.success("Logged in successfully");
        navigate("/dashboard"); // Navigate to dashboard
      } else {
        toast.error(response.message || "Failed to login. Please try again.");
      }
    } catch (error) {
      if (error.inner) {
        const errors = error.inner.reduce((acc, validationError) => {
          acc[validationError.path] = validationError.message;
          return acc;
        }, {});
        setLoginErrors(errors);
      } else {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message || "Failed to login.");
        } else {
          toast.error("Failed to login. Please try again later.");
        }
        console.error("API Error:", error);
      }
    }
  };

  return (
    <div className="main_bg_color">
      <div className="logo_div">
        <img src={logo} alt="logo" />
      </div>
      <div className="register_div">
        <LoginHeading>Your Awards Management System</LoginHeading>
        <div className="login_form_div">
          <LoginSubHeading>Log In</LoginSubHeading>
          <form onSubmit={handleSubmit}>
            <div className="fields_div">
              <div className="label_div">
                <InputLabel>Email Address</InputLabel>
                <InputType
                  placeholder="Enter your email address"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginData}
                />
                {loginErrors.email && (
                  <p className="error">{loginErrors.email}</p>
                )}
              </div>

              <div className="label_div">
                <div className="pass_show">
                  <InputLabel>Password</InputLabel>
                  <div
                    className="show_content"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <>
                        <BiSolidHide /> Hide
                      </>
                    ) : (
                      <>
                        <BiSolidShow /> Show
                      </>
                    )}
                  </div>
                </div>

                <InputType
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginData}
                />
                {loginErrors.password && (
                  <p className="error">{loginErrors.password}</p>
                )}
              </div>

              <div className="log_btn_div">
                <Redbutton type="submit">LOGIN</Redbutton>

                <div className="forget_password">
                  <ForgetPassword
                    onClick={() => {
                      navigate("/ForgetPassword");
                    }}
                  >
                    Forget Password?
                  </ForgetPassword>
                </div>
              </div>

              <div className="already_account">
                <RegisterGreyHeading>
                  Don’t have an account?
                </RegisterGreyHeading>
                <RegisterGreenHeading
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register
                </RegisterGreenHeading>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
