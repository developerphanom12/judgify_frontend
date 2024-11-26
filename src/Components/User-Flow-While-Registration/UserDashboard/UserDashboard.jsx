import React from "react";
import "./UserDashboard.scss";
import { LuFileEdit } from "react-icons/lu";
import { RedMainHeading, SubHeading } from "../../Global/GlobalText";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { FaUserFriends } from "react-icons/fa";
import { RedBackgroundButton } from "../../Global/GlobalButton";
import { UserTitlebar } from "../../Global/User-Flow/UserTitleBar/UserTitleBar";

export const UserDashboard = () => {
  return (
    <>
      <div className="user_dashboard_div">
        <UserTitlebar title="User Dashboard" />
        <div className="user_dashboard_bg">
          <div className="user_price_div">
            <div className="user_dashboard_sub sub_details">
              <LuFileEdit/>
              <RedMainHeading>SUBMISSION DETAILS</RedMainHeading>
              <SubHeading style={{ fontWeight: 600 }}>15</SubHeading>
            </div>
            <div className="user_dashboard_sub pending_pay">
              <HiMiniCurrencyDollar />
              <RedMainHeading>SUBMISSION DETAILS</RedMainHeading>
              <SubHeading style={{ fontWeight: 600 }}>$699</SubHeading>
              <RedBackgroundButton>Pay Now</RedBackgroundButton>
            </div>
            <div className="user_dashboard_sub my_profile">
              <FaUserFriends/>
              <RedMainHeading>My Profile</RedMainHeading>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
