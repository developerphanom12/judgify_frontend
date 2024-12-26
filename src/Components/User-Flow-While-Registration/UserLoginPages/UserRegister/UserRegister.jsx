import React, { useState } from "react";
import "./UserRegister.scss";
import {
  InputLabel,
  InputType,
  SelectBorder,
} from "../../../Global/GlobalFormElement";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  GreenDescription,
  
  LoginSubHeading,
  RegisterGreenHeading,
  RegisterGreyHeading,
} from "../../../Global/GlobalText";
import { RedBackgroundButton, Redbutton } from "../../../Global/GlobalButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_EXCHNAGE_URL } from "../../../../Url/Url";
import axios from "axios";
import logo from "../../../../Assets/logoaward.png";
import { setUserFlowCredentials } from "../../../Redux/Users/action";
import Modal from "react-bootstrap/Modal";
import { FaEnvelopeCircleCheck } from "react-icons/fa6";

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

    .matches(/^\d{10}$/, "Phone Number must be 10 digits")
    .required("Mobile number is required"),
  country: yup.string().required("Country is required"),
});

export const UserRegister = () => {
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

  //   const email = useSelector((state) => state?.users?.email);
  //   const password = useSelector((state) => state?.users?.password);
  //   console.log("email,password ", email,password);

  const navigate = useNavigate();

  const handlePortData = (e) => {
    setPortData({ ...portData, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await hirePortSchema.validate(portData, { abortEarly: false });
      const response = await axios.post(
        `${USER_EXCHNAGE_URL}/register`,
        portData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("portData", response.data);
        toast.success("Form submitted successfully");
          setShow(true);
        // Dispatch email and password to Redux
        dispatch(setUserFlowCredentials(portData.email, portData.password));
    
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
    <>
      <div className="userflow_bg_color">
        <div className="userflow_logo_div">
          <img src={logo} alt="logo" />
        </div>
        <div className="userflow_register_div">
          <form className="userflow_form_div" onSubmit={handlesubmit}>
            <LoginSubHeading className="sub_reg_head">
              Create your account
            </LoginSubHeading>
            <div className="userflow_fields_div">
              <div className="userflow_label_div">
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
              <div className="userflow_label_div">
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
              <div className="userflow_label_div">
                <InputLabel>Email</InputLabel>
                <InputType
                  placeholder="Enter your email address"
                  name="email"
                  value={portData.email}
                  onChange={handlePortData}
                />
                {portErrors.email && (
                  <p className="error">{portErrors.email}</p>
                )}
              </div>
              <div className="userflow_label_div">
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
              <div className="userflow_label_div">
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
              <div className="userflow_label_div">
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
              <div className="userflow_label_div">
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

              <Redbutton type="submit">REGISTER</Redbutton>
              <div className="userflow_already_account">
                <RegisterGreyHeading>
                  Already have an account?
                </RegisterGreyHeading>
                <RegisterGreenHeading
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/user-login")}
                >
                  Login
                </RegisterGreenHeading>
              </div>
            </div>
          </form>
        </div>
      </div>


      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="userflow_modal">
            <div className="user_flow_icon">
              <FaEnvelopeCircleCheck />
              <GreenDescription>Email Verification Required</GreenDescription>
            </div>
            <div className="user_flow_content">
              <RegisterGreyHeading>
                A verification email has been sent to your registered email
                address.
              </RegisterGreyHeading>
              <RegisterGreyHeading>
                "Go to your email and confirm your email address."
              </RegisterGreyHeading>
            </div>
            <div className="userflow_comfirm_button">
              <RedBackgroundButton
                onClick={() => {
                  navigate("/user-login");
                }}
              >
                Confirm
              </RedBackgroundButton>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
