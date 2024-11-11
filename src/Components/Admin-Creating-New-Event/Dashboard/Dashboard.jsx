import React from "react";
import { TitleBar } from "../../Global/TitleBar/TitleBar";
import "./Dashboard.scss";
import {
  ClosingDateContent,
  DescriptionContent,
  DraftHeading,
  EventHeading,
  RedMainHeading,
  SubHeading,
} from "../../Global/GlobalText";
import { CreateButton, ViewMoreButton } from "../../Global/GlobalButton";
import { IoMdAddCircleOutline } from "react-icons/io";
import retail from "../../../Assets/ret.png";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  // Sample data for events
  const navigate = useNavigate();

  const events = [
    { id: 1, title: "Beauty Pageants", closingDate: "28 Aug 2024" },
    { id: 2, title: "Beauty Pageants", closingDate: "15 Sep 2024" },
    { id: 3, title: "Beauty Pageants", closingDate: "10 Oct 2024" },
    { id: 4, title: "Beauty Pageants", closingDate: "20 Nov 2024" },
    { id: 5, title: "Beauty Pageants", closingDate: "28 Aug 2024" },
    { id: 6, title: "Beauty Pageants", closingDate: "15 Sep 2024" },
    { id: 7, title: "Beauty Pageants", closingDate: "10 Oct 2024" },
    { id: 8, title: "Beauty Pageants", closingDate: "20 Nov 2024" },
  ];

  // Array of background colors
  const backgroundColors = ["#FFE2E5", "#FFF4DE", "#F6F6FB", "#F3E8FF"];

  return (
    <div>
      <div className="dashboard_div">
        <TitleBar title="Dashboard" />
        <div className="dashboard_white_bg">
          <DescriptionContent>
            Start running your awards event now
          </DescriptionContent>
          <div className="dash_create_btn">
            <CreateButton
              className="plus_content"
              onClick={() => {
                navigate("/create-new-event");
              }}
            >
              <IoMdAddCircleOutline />
              Create new Event
            </CreateButton>
          </div>
        </div>

        <div className="dashboard_white_bg">
          <div className="head_btn">
            <SubHeading>My Events</SubHeading>
            <ViewMoreButton
              onClick={() => {
                navigate("/my-events");
              }}
            >
              View More
            </ViewMoreButton>
          </div>

          <div className="dash_event">
            {events.map((event, index) => (
              <div
                className="dash_subevent"
                key={event.id}
                style={{
                  backgroundColor:
                    backgroundColors[index % backgroundColors.length],
                }}
              >
                <div className="dash_logo_status">
                  <div className="dash_logo_brand">
                    <img src={retail} alt="Retail Logo" />
                  </div>

                  <div className="dash_logo_content">
                    <EventHeading>Event:</EventHeading>
                    <DraftHeading> Draft</DraftHeading>
                  </div>
                </div>
                <div className="dash_close_date">
                  <RedMainHeading>{event.title}</RedMainHeading>
                  <ClosingDateContent>
                    Closing Date: {event.closingDate}
                  </ClosingDateContent>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
