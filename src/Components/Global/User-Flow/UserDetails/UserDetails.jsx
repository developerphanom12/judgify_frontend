import React from "react";
import "./UserDetails.scss";
import adminimg from "../../../../Assets/adminimg.jpg";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export const UserDetails = ({ color }) => {
  return (
    <>
      <div className="user_topbanner_div">
        <img src={adminimg} alt="admin_login" />
        <span style={{ color }}>Kathryn Murphy</span>
        <MdOutlineKeyboardArrowDown  style={{ color }}/>
      </div>
    </>
  );
};
