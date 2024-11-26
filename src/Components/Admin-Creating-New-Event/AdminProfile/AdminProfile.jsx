import React, { useEffect, useState } from "react";
import "./AdminProfile.scss";
import { TitleBar } from "../../Global/TitleBar/TitleBar";
import {
  CheckboxLabel,
  InputLabel,
  InputType,
} from "../../Global/GlobalFormElement";
import {
  GreyBorderButton,
  RedBackgroundButton,
} from "../../Global/GlobalButton";
import scan from "../../../Assets/scan.png";
import { EXCHNAGE_URL, IMAGES_URL } from "../../../Url/Url";

import axios from "axios";

import { Description } from "../../Global/GlobalText";

import upload from "../../../Assets/upload.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
// import moment from "moment-timezone"; // Only if you're using moment-timezone
import TimezoneSelect from "react-timezone-select"; // Import TimezoneSelect

// const timezoneList = moment.tz.names();

export const AdminProfile = () => {
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    time_zone: Yup.string().required("Time zone is required"),
    mobile_number: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required("Phone Number is required"),
    company: Yup.string().required("Company is required"),
    job_title: Yup.string().required("Job title is required"),
    profile_image: Yup.string().nullable(),
  });

  const validationPasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "New password must be at least 8 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const [selectedButton, setSelectedButton] = useState(1); // Initial state as 1 to show "Your Profile"

  const [adminProfile, setAdminProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    time_zone: "",
    mobile_number: "",
    company: "",
    job_title: "",
    profile_image: "",
  });

  const [errors, setErrors] = useState({}); // Store validation errors

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passerrors, setPassErrors] = useState({}); // Store validation errors
  const [profilePicture, setProfilePicture] = useState(null); // New state for profile picture

  const [selectedTimezone, setSelectedTimezone] = useState(null); // State for the selected time zone

  const getApi = async () => {
    try {
      const response = await axios.get(`${EXCHNAGE_URL}/getprofile`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        console.log("Fetched Data:", response.data.data);
        const profileData = response.data.data[0]; // Extract the first object from the array
        setAdminProfile({
          first_name: profileData.first_name || "",
          last_name: profileData.last_name || "",
          email: profileData.email || "",
          time_zone: profileData.time_zone || "",
          mobile_number: profileData.mobile_number || "",
          company: profileData.company || "",
          job_title: profileData.job_title || "",
          profile_image: profileData.profile_image || "",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const handleSave = async () => {
    try {
      await validationSchema.validate(adminProfile, { abortEarly: false });

      const formData = new FormData();
      formData.append("first_name", adminProfile.first_name);
      formData.append("last_name", adminProfile.last_name);
      formData.append("email", adminProfile.email);
      formData.append("time_zone", adminProfile.time_zone);
      formData.append("mobile_number", adminProfile.mobile_number);
      formData.append("company", adminProfile.company);
      formData.append("job_title", adminProfile.job_title);

      if (profilePicture) {
        formData.append("profile_image", profilePicture); // Append the new profile image file
      } else {
        formData.append("profile_image", adminProfile.profile_image); // Append the existing profile image URL
      }

      const response = await axios.post(
        `${EXCHNAGE_URL}/profileUpdate`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setSelectedButton(2);
        console.log("Profile updated successfully:", response.data.data);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        const errorMessages = {};
        error.inner.forEach((err) => {
          errorMessages[err.path] = err.message;
        });
        setErrors(errorMessages);
      } else {
        console.error("Error updating profile:", error.message);
        toast.error("Error updating profile");
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setProfilePicture(file); // Store the file object in state
  };

  const buttons = [
    { id: 1, label: "Your Profile" },
    { id: 2, label: "Change Password" },
    { id: 3, label: "Two Factor Authentication" },
  ];

  const handleClick = (id) => {
    setSelectedButton(id);
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = async () => {
    try {
      await validationPasswordSchema.validate(passwordData, {
        abortEarly: false,
      });

      const response = await axios.post(
        `${EXCHNAGE_URL}/newPassword`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password updated successfully");

        setSelectedButton(3); // Redirect to the "Your Profile" tab
      }
    } catch (error) {
      // console.error("Error updating password:", error.message);
      // toast.error("Error updating password");
      if (error.name === "ValidationError") {
        // Handle Yup validation errors
        const errorMessages = {};
        error.inner.forEach((err) => {
          errorMessages[err.path] = err.message;
          toast.error(err.message); //
        });
        setPassErrors(errorMessages);
      } else {
        toast.error("Error updating password");
      }
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="adminprof_div">
        <TitleBar title="Admin Profile" showSearch={false} />{" "}
        <div className="adminprof_bg">
          <div className="adminprof_btn_click">
            {buttons.map((button) => (
              <button
                key={button.id}
                onClick={() => handleClick(button.id)}
                className={selectedButton === button.id ? "selected" : ""}
              >
                {button.label}
              </button>
            ))}
          </div>

          <div className="adminprof_content">
            {selectedButton === 1 && (
              <form
                className="profile_form"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="adminprof_row">
                  <div className="adminprof_label">
                    <InputLabel>First Name</InputLabel>
                    <InputType
                      placeholder="Kathryn"
                      value={adminProfile.first_name}
                      onChange={(e) =>
                        setAdminProfile({
                          ...adminProfile,
                          first_name: e.target.value,
                        })
                      }
                    />
                    {errors.first_name && (
                      <span className="error">{errors.first_name}</span>
                    )}
                  </div>
                  <div className="adminprof_label">
                    <InputLabel>Last Name</InputLabel>
                    <InputType
                      placeholder="Murphy"
                      value={adminProfile.last_name}
                      onChange={(e) =>
                        setAdminProfile({
                          ...adminProfile,
                          last_name: e.target.value,
                        })
                      }
                    />
                    {errors.last_name && (
                      <span className="error">{errors.last_name}</span>
                    )}
                  </div>
                </div>

                <div className="adminprof_row">
                  <div className="adminprof_label">
                    <InputLabel>Email</InputLabel>
                    <InputType
                      placeholder="kathryn01@gmail.com"
                      value={adminProfile.email}
                      onChange={(e) =>
                        setAdminProfile({
                          ...adminProfile,
                          email: e.target.value,
                        })
                      }
                    />
                    {errors.email && (
                      <span className="error">{errors.email}</span>
                    )}
                  </div>
                  <div className="adminprof_label">
                    <InputLabel>Time Zone</InputLabel>
                    {/* <input
                      className="admin_timezone"
                      type="text"
                      value={adminProfile.time_zone}
                      onChange={(e) =>
                        setAdminProfile({
                          ...adminProfile,
                          time_zone: e.target.value,
                        })
                      }

                      
                    />  */}

                 <div className="time_get_post">

                    <input
                      className="admin_timezone"
                      type="text"
                      value={adminProfile.time_zone}
                      placeholder="Selected Timezone"
                    />
                    <TimezoneSelect
                    className="time_zone_post"
                      value={selectedTimezone} // Value will be set from selectedTimezone state
                      onChange={(selected) => {
                        setSelectedTimezone(selected); // Update selectedTimezone when changed
                        setAdminProfile({
                          ...adminProfile,
                          time_zone: selected.value, // Assuming selected value has 'value' property
                        });
                      }}
                      // options={timezoneOptions}  // Populate the options from the fetched timezones
                      placeholder="Select Timezone"
                    />

</div>

                    {errors.time_zone && (
                      <span className="error">{errors.time_zone}</span>
                    )}
                  </div>
                </div>

                <div className="adminprof_row">
                  <div className="adminprof_label">
                    <InputLabel>Phone number</InputLabel>
                    <InputType
                      placeholder="0002145612"
                      value={adminProfile.mobile_number}
                      onChange={(e) =>
                        setAdminProfile({
                          ...adminProfile,
                          mobile_number: e.target.value,
                        })
                      }
                    />
                    {errors.mobile_number && (
                      <span className="error">{errors.mobile_number}</span>
                    )}
                  </div>
                  <div className="adminprof_label">
                    <InputLabel>Company</InputLabel>
                    <InputType
                      placeholder="Self Employee"
                      value={adminProfile.company}
                      onChange={(e) =>
                        setAdminProfile({
                          ...adminProfile,
                          company: e.target.value,
                        })
                      }
                    />
                    {errors.company && (
                      <span className="error">{errors.company}</span>
                    )}
                  </div>
                </div>

                <div className="adminprof_row">
                  <div className="adminprof_label">
                    <InputLabel>Job Title</InputLabel>
                    <InputType
                      placeholder="Enter Job Title"
                      value={adminProfile.job_title}
                      onChange={(e) =>
                        setAdminProfile({
                          ...adminProfile,
                          job_title: e.target.value,
                        })
                      }
                    />
                    {errors.job_title && (
                      <span className="error">{errors.job_title}</span>
                    )}
                  </div>
                  <div className="adminprof_label">
                    <InputLabel>Profile Picture</InputLabel>
                    <div className="myevent_img">
                      <img
                        src={`${IMAGES_URL}${adminProfile.profile_image}`}
                        alt="profile_image"
                        className="update_image"
                      />
                      <img src={upload} alt="upload_img" />

                      <input
                        type="file"
                        className="file_input"
                        name="profile_picture"
                        onChange={handleFileChange} // Call your handler
                      />

                      {errors.profile_image && (
                        <span className="error">{errors.profile_image}</span>
                      )}

                      <Description>Browse File</Description>
                      <CheckboxLabel>
                        This option allows entrants to edit the submission
                        details.
                      </CheckboxLabel>
                    </div>
                  </div>
                </div>

                <div className="adminprof_button">
                  <GreyBorderButton
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                  >
                    Cancel
                  </GreyBorderButton>
                  <RedBackgroundButton onClick={handleSave}>
                    Save
                  </RedBackgroundButton>
                </div>
              </form>
            )}

            {selectedButton === 2 && (
              <form
                className="profile_form"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="adminprof_row">
                  <div className="adminprof_label">
                    <InputLabel>Current Password</InputLabel>
                    <InputType
                      name="currentPassword"
                      placeholder="Enter Current Password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordInputChange}
                    />
                    {passerrors.currentPassword && (
                      <span className="error">
                        {passerrors.currentPassword}
                      </span>
                    )}
                  </div>
                  <div className="adminprof_label">
                    <InputLabel>New Password</InputLabel>
                    <InputType
                      name="newPassword"
                      placeholder="Enter New Password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordInputChange}
                    />
                    {passerrors.newPassword && (
                      <span className="error">{passerrors.newPassword}</span>
                    )}
                  </div>
                </div>

                <div className="adminprof_row">
                  <div className="adminprof_label">
                    <InputLabel>Confirm New Password</InputLabel>
                    <InputType
                      name="confirmPassword"
                      placeholder="Confirm New Password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordInputChange}
                    />
                    {passerrors.confirmPassword && (
                      <span className="error">
                        {passerrors.confirmPassword}
                      </span>
                    )}
                  </div>
                </div>

                <div className="adminprof_button">
                  <GreyBorderButton onClick={() => setSelectedButton(1)}>
                    Cancel
                  </GreyBorderButton>
                  <RedBackgroundButton onClick={handlePasswordChange}>
                    Save
                  </RedBackgroundButton>
                </div>
              </form>
            )}

            {selectedButton === 3 && (
              <div className="two_factor_auth">
                <div className="scanner">
                  <InputLabel>
                    Download the free{" "}
                    <a href="/" style={{ color: "#777777" }}>
                      Google Authenticator app
                    </a>{" "}
                    on your mobile device, click add and then scan this QR code
                    to set up your account
                  </InputLabel>
                  <img src={scan} alt="scanner" />
                </div>
                <div className="generat_input">
                  <InputLabel>Enter the code that was generated</InputLabel>
                  <InputType placeholder="Six Digit Code" />
                </div>

                <div className="adminprof_button">
                  <GreyBorderButton onClick={() => setSelectedButton(2)}>
                    Cancel
                  </GreyBorderButton>
                  <RedBackgroundButton>Save</RedBackgroundButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
