import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/logoaward.png";
import "./Sidebar.scss";
import { RxDashboard } from "react-icons/rx";
import { Sidemenu } from "../../Components/Global/GlobalText";
import event from "../../Assets/event.png"
import { LuGraduationCap } from "react-icons/lu";



export const Sidebar = () => {
  const [selectedLink, setSelectedLink] = useState("dashboard");

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <div>

    <div className="logo_img">
    <img src={logo} alt="logo" />
    </div>

    <div className="menu_div">
      <Link
        to="/dashboard"
        className={selectedLink === "dashboard" ? "selected" : ""}
        onClick={() => handleLinkClick("dashboard")}
      >
       <RxDashboard />
        <span>
          <Sidemenu className="s-color">Dashboard</Sidemenu>
        </span>
      </Link>


      <Link
        to="/my-events"
        className={selectedLink === "myevents" ? "selected" : ""}
        onClick={() => handleLinkClick("myevents")}
      >
      <img src={event} alt="event_icon"/>
        <span>
          <Sidemenu className="s-color">My Events</Sidemenu>
        </span>
      </Link>


      <Link
        to="/admin-profile"
        className={selectedLink === "adminprofile" ? "selected" : ""}
        onClick={() => handleLinkClick("adminprofile")}
      >
      <LuGraduationCap style={{height:"20px"}}/>

        <span>
          <Sidemenu>Admin Profile</Sidemenu>
        </span>
      </Link>

      
    </div>
    </div>
  );
};
