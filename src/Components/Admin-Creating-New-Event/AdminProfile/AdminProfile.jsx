import React, { useState } from "react";
import "./AdminProfile.scss";
import { TitleBar } from "../../Global/TitleBar/TitleBar";
import {
  InputLabel,
  InputType,
  SelectBorder,
} from "../../Global/GlobalFormElement";
import TimezoneSelect from "react-timezone-select";
import {
  GreyBorderButton,
  RedBackgroundButton,
} from "../../Global/GlobalButton";
import scan from "../../../Assets/scan.png"

export const AdminProfile = () => {
  const [selectedButton, setSelectedButton] = useState(1); // Initial state as 1 to show "Your Profile"
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const buttons = [
    { id: 1, label: "Your Profile" },
    { id: 2, label: "Change Password" },
    { id: 3, label: "Two Factor Authentication" },
  ];

  const handleClick = (id) => {
    setSelectedButton(id);
  };

  return (
    <div>
      <div className="adminprof_div">
        <TitleBar title="Admin Profile" showSearch={false} />{" "}
        {/* Hide search bar */}
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

          {/* Render form or content directly based on selectedButton */}
          <div className="adminprof_content">
            {selectedButton === 1 && (
              <form className="profile_form">
                <div className="adminprof_row">
                  <div className="adminprof_label">
                    <InputLabel>First Name</InputLabel>
                    <InputType placeholder="Kathryn"/>
                  </div>
                  <div className="adminprof_label">
                    <InputLabel>Last Name</InputLabel>
                    <InputType placeholder="Murphy" />
                  </div>
                </div>

                <div className="adminprof_row">
                  <div className="adminprof_label">
                    <InputLabel>Email</InputLabel>
                    <InputType placeholder="kathryn01@gmail.com" />
                  </div>
                  <div className="adminprof_label">
                    <InputLabel>Time Zone</InputLabel>

                    <TimezoneSelect
                      value={selectedTimezone}
                      onChange={setSelectedTimezone}
                    />
                  </div>
                </div>

                <div className="adminprof_row">
                  <div className="adminprof_label">
                    <InputLabel>Phone number</InputLabel>
                    <InputType placeholder="0002145612" />
                  </div>
                  <div className="adminprof_label">
                    <InputLabel>Company</InputLabel>
                    <InputType placeholder="Self Employee" />
                  </div>
                </div>

                <div className="adminprof_row">
                  <div className="adminprof_label">
                    <InputLabel>Job Title</InputLabel>
                    <InputType />
                  </div>
                  <div className="adminprof_label">
                    <InputLabel>Profile Picture</InputLabel>
                    <InputType />
                  </div>
                </div>

                <div className="adminprof_button">
                  <GreyBorderButton>Cancel</GreyBorderButton>
                  <RedBackgroundButton>Save</RedBackgroundButton>
                </div>
              </form>
            )}

            {selectedButton === 2 && (
              <form className="profile_form">
                <div className="adminprof_row">
                  <div className="adminprof_label">
                    <InputLabel>Current Password</InputLabel>
                    <InputType
                      placeholder="Enter Current Password
"
                    />
                  </div>
                  <div className="adminprof_label">
                    <InputLabel>New Password</InputLabel>
                    <InputType placeholder="Enter New Password" />
                  </div>
                </div>

                <div className="adminprof_row">
                  <div className="adminprof_label">
                    <InputLabel>Confirm New Password</InputLabel>
                    <InputType placeholder="Confirm New Password" />
                  </div>
                </div>

                <div className="adminprof_button">
                  <GreyBorderButton>Cancel</GreyBorderButton>
                  <RedBackgroundButton>Save</RedBackgroundButton>
                </div>
              </form>
            )}

            {selectedButton === 3 && (
              <div className="two_factor_auth">
              <div className="scanner">
               
                   <InputLabel>Download the free <a href="/" style={{color:"#777777"}}>Google Authenticator app</a> on your mobile device, click add and then scan this QR code to set up your account</InputLabel>
                   <img src={scan} alt="scanner"/>
              </div>
              <div className="generat_input">
              <InputLabel>Enter the code that was generated</InputLabel>
              <InputType placeholder="Six Digit Code" />
              </div>

              <div className="adminprof_button">
                  <GreyBorderButton>Cancel</GreyBorderButton>
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
