import React, { useEffect, useState } from "react";
import "./AdminProfile.scss";
import { TitleBar } from "../../Global/TitleBar/TitleBar";
import {
  CheckboxLabel,
  InputLabel,
  InputType,
  SelectBorder,
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

export const AdminProfile = () => {
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
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profilePicture, setProfilePicture] = useState(null); // New state for profile picture

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
      console.error("Error updating profile:", error.message);
      toast.error("Error updating profile");
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
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
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
      console.error("Error updating password:", error.message);
      toast.error("Error updating password");
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
                  </div>
                  <div className="adminprof_label">
                    <InputLabel>Time Zone</InputLabel>
                    <input
                      className="admin_timezone"
                      type="text"
                      value={adminProfile.time_zone}
                      onChange={(e) =>
                        setAdminProfile({
                          ...adminProfile,
                          time_zone: e.target.value,
                        })
                      }
                    />
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
                  </div>
                  <div className="adminprof_label">
                    <InputLabel>New Password</InputLabel>
                    <InputType
                      name="newPassword"
                      placeholder="Enter New Password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordInputChange}
                    />
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
