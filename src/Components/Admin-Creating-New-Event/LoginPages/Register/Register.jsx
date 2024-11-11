import React, { useState } from "react";
import "./Register.scss";
import logo from "../../../../Assets/logoaward.png";
import {
  LoginHeading,
  LoginSubHeading,
  RegisterGreenHeading,
  RegisterGreyHeading,
} from "../../../Global/GlobalText";
import {
  CheckboxInput,
  CheckboxLabel,
  InputLabel,
  InputType,
  SelectBorder,
} from "../../../Global/GlobalFormElement";
import { Redbutton } from "../../../Global/GlobalButton";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { EXCHNAGE_URL } from "../../../../Url/Url";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../../../Redux/Users/Action";

// Define the validation schema
const hirePortSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"), // Password validation
  company: yup.string().required("Company is required"),
  mobile_number: yup
    .string()
    .matches(
      /^[6-9]\d{9}$/,
      "Mobile number must start with digits 6-9 and contain only digits"
    )
    .required("Mobile number is required"),
  country: yup.string().required("Country is required"),
});

export const Register = () => {
  const dispatch = useDispatch();
  const [portData, setPortData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    company: "",
    mobile_number: "",
    country: "",
  });
  const [portErrors, setPortErrors] = useState({});
  const navigate = useNavigate();

  const handlePortData = (e) => {
    setPortData({ ...portData, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await hirePortSchema.validate(portData, { abortEarly: false });
      const response = await axios.post(`${EXCHNAGE_URL}/register`, portData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("portData", response.data);
        toast.success("Form submitted successfully");

        // Dispatch email and password to Redux
        dispatch(setUserCredentials(portData.email, portData.password));

        navigate("/dashboard");
      } else {
        toast.error(
          response.message || "Failed to submit form. Please try again later."
        );
      }
    } catch (error) {
      if (error.inner) {
        const portErrors = error.inner.reduce((acc, validationError) => {
          acc[validationError.path] = validationError.message;
          return acc;
        }, {});
        setPortErrors(portErrors);
      } else {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message || "Failed to submit form.");
        } else {
          toast.error("Failed to submit form. Please try again later.");
        }
        console.error("API Error:", error);
      }
    }
  };

  return (
    <div className="reg_bg_color">
      <div className="logo_div">
        <img src={logo} alt="logo" />
      </div>
      <div className="register_div">
        <LoginHeading >Your Awards Management System</LoginHeading>
        <form className="form_div" onSubmit={handlesubmit}>
          <LoginSubHeading className="sub_reg_head">Create your account</LoginSubHeading>
          <div className="fields_div">
            <div className="label_div">
              <InputLabel>First Name</InputLabel>
              <InputType
                placeholder="Enter your First Name"
                name="first_name"
                value={portData.first_name}
                onChange={handlePortData}
              />
              {portErrors.first_name && (
                <p className="error">{portErrors.first_name}</p>
              )}
            </div>
            <div className="label_div">
              <InputLabel>Last Name</InputLabel>
              <InputType
                placeholder="Enter your Last Name"
                name="last_name"
                value={portData.last_name}
                onChange={handlePortData}
              />
              {portErrors.last_name && (
                <p className="error">{portErrors.last_name}</p>
              )}
            </div>
            <div className="label_div">
              <InputLabel>Email</InputLabel>
              <InputType
                placeholder="Enter your email address"
                name="email"
                value={portData.email}
                onChange={handlePortData}
              />
              {portErrors.email && <p className="error">{portErrors.email}</p>}
            </div>
            <div className="label_div">
              <InputLabel>Password</InputLabel>
              <InputType
                placeholder="Enter your Password"
                name="password"
                value={portData.password}
                onChange={handlePortData}
              />
              {portErrors.password && (
                <p className="error">{portErrors.password}</p>
              )}
            </div>
            <div className="label_div">
              <InputLabel>Company</InputLabel>
              <InputType
                placeholder="Enter your Company Name"
                name="company"
                value={portData.company}
                onChange={handlePortData}
              />
              {portErrors.company && (
                <p className="error">{portErrors.company}</p>
              )}
            </div>
            <div className="label_div">
              <InputLabel>Mobile Number</InputLabel>
              <InputType
                placeholder="Enter your Mobile Number"
                name="mobile_number"
                value={portData.mobile_number}
                onChange={handlePortData}
              />
              {portErrors.mobile_number && (
                <p className="error">{portErrors.mobile_number}</p>
              )}
            </div>
            <div className="label_div">
              <InputLabel>Country</InputLabel>
              <SelectBorder
                name="country"
                value={portData.country}
                onChange={handlePortData}
              >
                <option value="">Select Country</option>
                <option>Pakistan</option>
                <option>India</option>
                <option>Bangladesh</option>
                <option>Nepal</option>
              </SelectBorder>
              {portErrors.country && (
                <p className="error">{portErrors.country}</p>
              )}
            </div>
            <div className="checkdiv">
              <CheckboxInput type="checkbox" />
              <CheckboxLabel>
                By creating an account, you agree to the Privacy Policy, Terms
                of Use, Cookie Policy, and PDPA statement
              </CheckboxLabel>
            </div>
            <Redbutton type="submit">REGISTER</Redbutton>
            <div className="already_account">
              <RegisterGreyHeading>
                Already have an account?
              </RegisterGreyHeading>
              <RegisterGreenHeading
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Login
              </RegisterGreenHeading>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
