import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EXCHNAGE_URL, IMAGES_URL } from "../../../Url/Url";
import { useDispatch } from "react-redux";
import { setEventIdGet } from "../../Redux/Users/action";

export const Dashboard = () => {
  const [dashboard, setDashboard] = useState([]);
  const [eventsToShow, setEventsToShow] = useState(8); // Start by showing 10 events

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const backgroundColors = ["#FFE2E5", "#FFF4DE", "#F6F6FB", "#F3E8FF"];

  useEffect(() => {
    const getApi = async () => {
      try {
        const response = await axios.get(`${EXCHNAGE_URL}/dashboardEvents`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          setDashboard(response.data.data);
          console.log("setData", response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    getApi();
  }, []); // Run only once when the component mounts

  const loadMoreEvents = () => {
    setEventsToShow(eventsToShow + 8); // Increase the number of events to show
  };

  // Slice the dashboard array to only show the number of events specified in eventsToShow
  const visibleEvents = dashboard.slice(0, eventsToShow);

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
                navigate("/create-new-event-post");
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
            {visibleEvents.map((event, index) => (
              <div
                className="dash_subevent"
                key={event.id}
                style={{
                  backgroundColor:
                    backgroundColors[index % backgroundColors.length],
                }}
                onClick={() => {
                  dispatch(setEventIdGet(event.id));
                  console.log("Navigating with event ID:", event.id);
                  navigate("/create-new-event");
                }}
              >
                <div className="dash_logo_status">
                  <div className="dash_logo_brand">
                    <img src={`${IMAGES_URL}${event.event_logo}`} alt="Logo" />
                  </div>

                  <div className="dash_logo_content">
                    <EventHeading>Event:</EventHeading>
                    <DraftHeading> Draft</DraftHeading>
                  </div>
                </div>
                <div className="dash_close_date">
                  <RedMainHeading>{event.event_name}</RedMainHeading>
                  <ClosingDateContent>
                    Closing Date:{" "}
                    {new Date(event.closing_date).toLocaleDateString()}
                  </ClosingDateContent>
                </div>
              </div>
            ))}
          </div>

          {/* Only show the 'View More' button if there are more events to display */}
          {dashboard.length > eventsToShow && (
            <div className="load-more-btn">
              <ViewMoreButton onClick={loadMoreEvents}>
                Load More
              </ViewMoreButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
