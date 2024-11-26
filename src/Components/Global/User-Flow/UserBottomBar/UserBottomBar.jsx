import React from "react";
import "./UserBottomBar.scss";
import {  BootomBarHeading } from "../../GlobalText";
import star from "../../../../Assets/start.png";
import logo from "../../../../Assets/logoaward.png";


export const UserBottomBar = () => {
  return (
    <div>
      <div className="user_bottombanner_submit_div">
        <div className="user_bottombanner_star_div">
          <div className="user_bottombanner_preview_sub">
            <img src={star} alt="star" />
            <BootomBarHeading  style={{fontSize:"20px;"}}>
              Organiser: Images Multimedia FZ LLC
            </BootomBarHeading>
          </div>
          <div className="user_bottom_vertical_line"></div>
          <div className="user_bottombanner_preview_sub">
            <img src={star} alt="star"/>
            <BootomBarHeading style={{fontSize:"20px", cursor:"pointer", textDecoration:"underline"}}>
              Contact the Organizer
            </BootomBarHeading>
          </div>
        </div>
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};
