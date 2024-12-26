import React, { useEffect, useState } from "react";
import { TitleBar } from "../../../Global/TitleBar/TitleBar";
import { CreateButton } from "../../../Global/GlobalButton";
import { IoMdAddCircleOutline } from "react-icons/io";
import { SelectBorder } from "../../../Global/GlobalFormElement";
import {
  ClosingDateContent,
  DraftHeading,
  EventHeading,
  IconContent,
  JuryRound,
  RedMainHeading,
  StatusContent,
} from "../../../Global/GlobalText";
import { GrDocumentText } from "react-icons/gr";
import {
  HiOutlineDocumentArrowUp,
  HiOutlineDocumentCheck,
  HiOutlineDocumentDuplicate,
} from "react-icons/hi2";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EXCHNAGE_URL, IMAGES_URL } from "../../../../Url/Url";
import { useLoading } from "../../../LoadingContext";

export const MyEvents = () => {
  const [selectedButton, setSelectedButton] = useState(0);
  const navigate = useNavigate();
  const [myevents, setmyevents] = useState([]);
  const { setLoading } = useLoading();  //Loader


  const backgroundColors = ["#FFE2E5", "#FFF4DE", "#F6F6FB", "#F3E8FF"];

  const getApi = async () => {
    setLoading(true); //Loader
    try {
      const response = await axios.get(`${EXCHNAGE_URL}/MyEvents`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setmyevents(response.data.data?.events || []);
        console.log("setData", response.data.data?.events);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }finally {
      setLoading(false); //Loader
    }
  };

  useEffect(() => {
    getApi();
  }, [setLoading]);

  const buttons = [
    { id: 1, label: "All", status: "all" },
    { id: 2, label: "Live", status: "live" },
    { id: 3, label: "Draft", status: "draft" },
    { id: 4, label: "Archive", status: "archive" },
  ];

  const handleClick = (index) => {
    setSelectedButton(index);
  };

  const filteredEvents =
    myevents?.filter((event) => {
      if (buttons[selectedButton].status === "all") return true; // Ensure "All" shows all events
      if (buttons[selectedButton].status === "draft")
        return event.is_draft === 1;
      if (buttons[selectedButton].status === "live") return !event.is_draft;
      if (buttons[selectedButton].status === "archive")
        return event.is_archived;
    }) || [];

  const eventCounts = buttons.map((button) => {
    return myevents.filter((event) => {
      if (button.status === "all") return true;
      if (button.status === "draft") return event.is_draft === 1;
      if (button.status === "live") return !event.is_draft;
      if (button.status === "archive") return event.is_archived;
    }).length;
  });

  return (
    <Root>
      <div className="myevent_div">
        <TitleBar title="My Events" />
        <div className="event_white_bg">
          <div className="myevent_status_div">
            <div className="event_btn_click">
              {buttons.map((button, index) => (
                <button
                  key={button.id}
                  onClick={() => handleClick(index)}
                  className={selectedButton === index ? "selected" : ""}
                >
                  {button.label} ({eventCounts[index]})
                </button>
              ))}
            </div>

            <div className="event_new_btn">
              <SelectBorder className="myeven_select">
                <option>Sort by : Newest</option>
                <option>Sort by : Oldest</option>
              </SelectBorder>
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
          <div className="my_event">
            {filteredEvents.map((event, index) => (
              <div
                className="myevent_subevent"
                key={event.id}
                style={{
                  backgroundColor:
                    backgroundColors[index % backgroundColors.length],
                }}
              >
                <div className="myevent_logo_status">
                  <div className="myevent_logo_brand">
                    <img
                      src={`${IMAGES_URL}${event.event_logo}`}
                      alt="Event Logo"
                    />
                    {console.log(
                      "Full image URL:",
                      `${IMAGES_URL}${event.event_logo}`
                    )}
                    ;
                  </div>
                  <div className="myevent_logo_content">
                    <EventHeading>Event:</EventHeading>
                    <DraftHeading>
                      {event.is_draft ? "Draft" : "Live"}
                    </DraftHeading>
                  </div>
                </div>
                <div className="myevent_close_date">
                  <RedMainHeading>{event.event_name}</RedMainHeading>
                  <ClosingDateContent>
                    Closing Date:{" "}
                    {new Date(event.closing_date).toLocaleDateString()}
                  </ClosingDateContent>
                </div>
                <div className="status_line_div">
                  <div className="myevnt_status">
                    <div className="myevnt_subststus">
                      <StatusContent>Pending:</StatusContent>
                      <StatusContent>{event.is_pending}</StatusContent>
                    </div>
                    <div className="myevnt_subststus">
                      <StatusContent>Withdrawn:</StatusContent>
                      <StatusContent>{event.is_withdrawn}</StatusContent>
                    </div>
                    <div className="myevnt_subststus">
                      <StatusContent>Completed:</StatusContent>
                      <StatusContent>{event.is_completed}</StatusContent>
                    </div>
                  </div>
                  <hr />
                  <div className="jury_round">
                    <JuryRound>No jury rounds</JuryRound>
                  </div>
                </div>
                <div className="submission_round">
                  <div className="submission_sub_round">
                    <GrDocumentText />
                    <IconContent>Summary Page</IconContent>
                  </div>
                  <div className="submission_sub_round">
                    <HiOutlineDocumentArrowUp />
                    <IconContent>Submission Page</IconContent>
                  </div>
                  <div className="submission_sub_round">
                    <HiOutlineDocumentCheck />
                    <IconContent>Jury Page</IconContent>
                  </div>
                  <div className="submission_sub_round">
                    <HiOutlineDocumentDuplicate />
                    <IconContent>Clone Event</IconContent>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Root>
  );
};

const Root = styled.section`
  .myevent_div {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    .event_white_bg {
      background-color: #fff;
      padding: 20px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      gap: 25px;
      .myevent_status_div {
        display: flex;
        justify-content: space-between;
        .event_btn_click {
          background-color: #f6f8f9;
          border: 1px solid #777777;
          border-radius: 8px;
          display: flex;

          padding: 5px;
          button {
            font-family: Poppins;
            font-size: 16px;
            font-weight: 500;
            line-height: 16px;
            border: 1px solid transparent;
            color: #777777;
            background-color: transparent;
            padding: 0px 18px;
            border-radius: 8px;
            &.selected {
              background-color: #c32728;
              color: #ffffff;
            }
          }
        }

        .event_new_btn {
          display: flex;
          gap: 20px;
          .plus_content {
            display: flex;
            gap: 5px;
            align-items: center;
            svg {
              width: 20px;
              height: 20px;
            }
          }
        }
      }

      .my_event {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        justify-content: center;
        .myevent_subevent {
          // flex:1;
          width: 23%;
          border-radius: 20px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          .myevent_logo_status {
            display: flex;
            justify-content: space-between;
            .myevent_logo_brand {
              background-color: #fff;
              border-radius: 50px;
              padding: 10px;
              height: 60px;
              width: 60px;
              box-shadow: 0px 4px 4px 0px #00000040;
              img {
                object-fit: contain;
                width: 100%;
                height: 100%;
              }
            }
            .myevent_logo_content {
              display: flex;
              align-items: center;
              gap: 3px;
            }
          }

          .myevent_close_date {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }

          .status_line_div {
            display: flex;

            flex-direction: column;
            .myevnt_status {
              display: flex;
              justify-content: space-between;
              .myevnt_subststus {
                display: flex;
                flex-direction: column;
              }
            }
            hr {
              width: 100%;
              color: #777777;
              margin: 10px 0;
            }
            .jury_round {
              display: flex;
              justify-content: center;
            }
          }

          .submission_round {
            display: flex;
            justify-content: space-between;

            .submission_sub_round {
              display: flex;
              flex-direction: column;
              gap: 5px;
              align-items: center;
              svg {
                background-color: #ffffff;
                border-radius: 50px;
                padding: 5px;
                width: 25px;
                height: 26px;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 567px) {
    .myevent_div {
      padding: 20px 8px;
      .event_white_bg .myevent_status_div {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 20px;
        .event_btn_click {
          width: 100%;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          button {
            flex: 1;
            padding: 10px 18px;
          }
        }
        .event_new_btn {
          gap: 8px;
          width: 100%;
          .myeven_select {
            flex: 1;
            font-size: 10px;
            padding: 3px;
          }

          .plus_content {
            flex: 1;
            padding: 0px 5px;
            font-size: 10px;
            font-weight: 400;
          }
        }
      }
    }

    /* .my_event .myevent_subevent {
      width: 100%;
    } */

    .myevent_div .event_white_bg .my_event .myevent_subevent {
      width: 100%;
    }
  }

  @media (min-width: 567px) and (max-width: 1024px) {
    .myevent_div .event_white_bg .myevent_status_div {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 20px;
      .event_btn_click {
        width: 100%;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        button {
          flex: 1;
          padding: 10px 18px;
        }
      }
    }

    .myevent_div .event_white_bg .my_event .myevent_subevent {
      width: 47%;
    }
  }
`;
