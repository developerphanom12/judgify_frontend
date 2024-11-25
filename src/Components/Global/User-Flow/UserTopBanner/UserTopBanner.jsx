import React from 'react'
import "./UserTopBanner.scss";
import { GreyDescription, PrevieWhiteHeading } from '../../GlobalText';
import star from "../../../../Assets/start.png";
import previewlogo from "../../../../Assets/previewlogo.png";
import { UserDetails } from '../UserDetails/UserDetails';
export const UserTopBanner = () => {
  return (
    <>
      <div className="user_topbanner_main">
        <div className="user_topbanner_top">
          <img src={previewlogo} alt="event_preview" />
          <PrevieWhiteHeading>
            RetailME Awards KSA 2023 - Celebrating Retail Excellence
          </PrevieWhiteHeading>
          <UserDetails/>
        </div>
        <div className="user_topbanner_bg"></div>
        <div className="user_topbanner_submit_div">
          <div className="user_topbanner_star_div">
            <div className="user_topbanner_preview_sub">
              <img src={star} alt="star" />
              <GreyDescription style={{ fontWeight: "600" }}>
                Entries Deadline
              </GreyDescription>
            </div>
            <div className="user_topbanner_preview_sub">
              <img src={star} alt="star" />
              <GreyDescription style={{ fontWeight: "600" }}>
                05-Dec-2024 11:59 PM (GMT +3:00)
              </GreyDescription>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
