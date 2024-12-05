import React, { useEffect, useState } from "react";
import "./EventDetails.scss";
import { TitleBar } from "../../../../Global/TitleBar/TitleBar";
import { SlArrowRight } from "react-icons/sl";
import {
  CheckboxInput,
  CheckboxLabel,
  InputLabel,
  InputType,
} from "../../../../Global/GlobalFormElement";
import { SubmissionId } from "../SumbissionId/SubmissionId";
import { BackdoorAccess } from "../BackdoorAccess/BackdoorAccess";
import { AwardDirectory } from "../AwardDirectory/AwardDirectory";
import { useNavigate } from "react-router-dom";
import { EXCHNAGE_URL, IMAGES_URL } from "../../../../../Url/Url";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdInfo } from "react-icons/md";
import { Description, EventHeading } from "../../../../Global/GlobalText";
import { GreyBorderButton, RedBackgroundButton } from "../../../../Global/GlobalButton";

export const EventDetails = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  const eventIdGet = useSelector((state) => state?.users?.eventIdGet);
  console.log("unknown", eventIdGet);

  const [eventData, setEventData] = useState({
    name: "",
    event_name: "",
    closing_date: "",
    closing_time: "",
    email: "",
    event_url: "",
    time_zone: "",
    is_endorsement: false,
    is_withdrawal: false,
    is_edit_entry: false,
    limit_submission: "",
    submission_limit: "",
    additional_emails: [],
    industry_types: [],
  });

  useEffect(() => {
    const getApi = async () => {
      try {
        const response = await axios.get(
          `${EXCHNAGE_URL}/getEvent/${eventIdGet}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Fetched Data:", response.data.data);
          setEventData({
            name: response.data.data.name || "", // assuming name exists in the API response
            event_name: response.data.data.event_name || "",
            closing_date: response.data.data.closing_date || "",
            closing_time: response.data.data.closing_time || "",
            email: response.data.data.email || "",
            event_url: response.data.data.event_url || "",
            time_zone: response.data.data.time_zone || "",
            is_endorsement: response.data.data.is_endorsement || false,
            is_withdrawal: response.data.data.is_withdrawal || false,
            is_edit_entry: response.data.data.is_ediit_entry || false,
            limit_submission: response.data.data.limit_submission || "",
            submission_limit: response.data.data.submission_limit || "",
            additional_emails: response.data.data.additional_emails || [],
            industry_types: response.data.data.industry_types || [],
            event_logo: response.data.data.event_logo || "", // Add event_logo field
            event_banner: response.data.data.event_banner || "", // Add event_banner field
            event_description: response.data.data.event_description || "",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Optionally handle the error, e.g., show an alert or redirect to login
      }
    };
    getApi();
  }, []);

  const navigate = useNavigate();

  const buttons = [
    { id: 1, label: "General" },
    { id: 2, label: "Event Page" },
    { id: 3, label: "Submission ID" },
    { id: 4, label: "Backdoor Access" },
    { id: 5, label: "Award Directory" },
  ];

  const handleClick = (id) => {
    setSelectedButton(id);
  };

  return (
    <div>
      <div className="newevent_div">
        <TitleBar title="Event Details" />
        <div className="newevent_bg">
          <div className="btn_radio">
            <div className="newevent_btn_click">
              {buttons.map((button, index) => (
                <React.Fragment key={button.id}>
                  <button
                    onClick={() => handleClick(button.id)}
                    className={selectedButton === button.id ? "selected" : ""}
                  >
                    {button.label}
                  </button>
                  {/* Render the arrow icon between buttons (except after the last button) */}
                  {index < buttons.length - 1 && <SlArrowRight />}
                </React.Fragment>
              ))}
            </div>
            {/* {selectedButton === 1 && (
              <div className="radio_btn">
                <InputLabel>
                  Plan <span style={{ color: "#c32728" }}>*</span>
                </InputLabel>
                <input
                  type="radio"
                  id="changeColor"
                  name="radio"
                  value="Free"
                  defaultChecked
                />
                <Description>Free</Description>
                <input
                  type="radio"
                  id="changeColor"
                  name="radio"
                  value="Paid"
                  
                />
                <Description>Paid</Description>
              </div>
            )} */}
          </div>

          <div className="newevent_content">
            {selectedButton === 1 && (
              <>
                <div className="get_data">
                  <form className="newevent_form">
                    <div className="newevent_row">
                      <div className="newevent_label">
                        <InputLabel>
                          Event Name <span style={{ color: "#c32728" }}>*</span>
                        </InputLabel>
                        <InputType
                          name="event_name"
                          placeholder="Enter Event Name"
                          value={eventData.event_name}
                          onChange={(e) =>
                            setEventData({
                              ...eventData,
                              event_name: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="newevent_label">
                        <InputLabel>
                          Industry type{" "}
                          <span style={{ color: "#c32728" }}>*</span>
                        </InputLabel>

                        <InputType
                          placeholder="Industry Type"
                          value={
                            eventData.industry_types
                              .map((industry) => industry.industry_type_name)
                              .join(", ") || ""
                          }
                        />
                      </div>
                    </div>

                    <div className="newevent_row">
                      <div className="newevent_closing_label">
                        <div className="clos_label">
                          <InputLabel>
                            Closing Date{" "}
                            <span style={{ color: "#c32728" }}>*</span>
                          </InputLabel>
                          <input
                            type="date"
                            value={
                              eventData.closing_date
                                ? new Date(eventData.closing_date)
                                    .toISOString()
                                    .split("T")[0] // Convert to yyyy-mm-dd format
                                : ""
                            }
                            onChange={(e) =>
                              setEventData({
                                ...eventData,
                                closing_date: e.target.value,
                              })
                            }
                            className="calender"
                          />
                        </div>

                        <div className="clos_label">
                          <InputLabel>
                            Closing Time{" "}
                            <span style={{ color: "#c32728" }}>*</span>
                          </InputLabel>
                          {/* <div className="time">{eventData.closing_time}</div>
                           */}

                          <InputType
                            name="closing_time"
                            placeholder="Closing Time"
                            value={eventData.closing_time}
                            onChange={(e) =>
                              setEventData({
                                ...eventData,
                                closing_time: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="newevent_label">
                        <InputLabel>
                          Contact Email{" "}
                          <span style={{ color: "#c32728" }}>*</span>
                        </InputLabel>
                        <InputType
                          type="email"
                          value={eventData.email}
                          onChange={(e) =>
                            setEventData({
                              ...eventData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="newevent_row">
                      <div className="newevent_label">
                        <div className="event_label_cont">
                          <InputLabel>
                            Event URL{" "}
                            <span style={{ color: "#c32728" }}>*</span>
                          </InputLabel>
                          <EventHeading>
                            https://www.imagesgroup.in/
                          </EventHeading>
                        </div>
                        <InputType
                          type="url"
                          value={eventData.event_url}
                          onChange={(e) =>
                            setEventData({
                              ...eventData,
                              event_url: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="newevent_label">
                        <InputLabel>
                          Timezone <span style={{ color: "#c32728" }}>*</span>
                        </InputLabel>

                        <input
                          type="text"
                          className="timezone_div"
                          value={eventData.time_zone}
                          onChange={(e) =>
                            setEventData({
                              ...eventData,
                              time_zone: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="newevent_row">
                      <div className="newevent_label_lg">
                        <div className="event_label_cont">
                          <InputLabel>
                            Additional Email Addresses
                            <span style={{ color: "#c32728" }}>*</span>
                          </InputLabel>
                          <div className="cont_icon">
                            <EventHeading>
                              You can add more than one email address separated
                              by comma or semicolon. EG: james@Images.In,
                              lily@images.in
                            </EventHeading>
                            <MdInfo className="mdi_icon" />
                          </div>
                        </div>
                        {/* <InputType
                            value={eventData.additional_emails.join(", ")} // Display additional emails as a comma-separated list
                            onChange={(e) =>
                              setEventData({
                                ...eventData,
                                additional_emails: e.target.value.split(","),
                              })
                            }
                          /> */}
                        <InputType
                          value={eventData.additional_emails
                            .map((email) => email.email_address) // Extract the email_address from each object
                            .join(", ")} // Display as a comma-separated list
                          onChange={(e) =>
                            setEventData({
                              ...eventData,
                              additional_emails: e.target.value
                                .split(",") // Split by commas
                                .map((email) => email.trim()) // Trim any leading/trailing spaces
                                .map((email) => ({ email_address: email })), // Format back into objects
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="newevent_row">
                      <div className="newevent_label">
                        <div className="newevent_check">
                          <CheckboxInput
                            type="checkbox"
                            checked={eventData.is_endorsement}
                            onChange={(e) =>
                              setEventData({
                                ...eventData,
                                is_endorsement: e.target.checked,
                              })
                            }
                          />
                          <InputLabel>Require Endorsement </InputLabel>
                        </div>

                        <CheckboxLabel>
                          This option triggers the need for endorsement of award
                          submission by the entry owner. By enabling this,
                          Images will send an endorsement request to the email
                          address entered by the entrant during submission.
                        </CheckboxLabel>
                      </div>

                      <div className="newevent_label">
                        <div className="newevent_check">
                          <CheckboxInput
                            type="checkbox"
                            checked={eventData.is_withdrawal}
                            onChange={(e) =>
                              setEventData({
                                ...eventData,
                                is_withdrawal: e.target.checked,
                              })
                            }
                          />
                          <InputLabel>Allow Submission Withdrawal</InputLabel>
                        </div>

                        <CheckboxLabel>
                          This allows an entrant to withdraw his/her
                          submissions.
                        </CheckboxLabel>
                      </div>
                    </div>

                    <div className="newevent_row">
                      <div className="newevent_label">
                        <div className="newevent_check">
                          <CheckboxInput
                            type="checkbox"
                            checked={eventData.is_edit_entry}
                            onChange={(e) =>
                              setEventData({
                                ...eventData,
                                is_edit_entry: e.target.checked,
                              })
                            }
                          />
                          <InputLabel>Allow Editing to Entries</InputLabel>
                        </div>

                        <CheckboxLabel>
                          This option allows entrants to edit the submission
                          details.
                        </CheckboxLabel>
                      </div>

                      <div className="newevent_label">
                        <div className="newevent_check">
                          <CheckboxInput
                            type="checkbox"
                            checked={eventData.limit_submission === 1}
                            onChange={(e) =>
                              setEventData({
                                ...eventData,
                                limit_submission: e.target.checked ? 1 : 0,
                              })
                            }
                          />
                          <InputLabel>Limit number of submissions</InputLabel>
                        </div>

                        <CheckboxLabel>
                          Restrict the number of submissions entrant can make
                        </CheckboxLabel>
                      </div>

                      <div className="newevent_label">
                        <InputLabel>Submission Limit</InputLabel>
                        <InputType
                          type="number"
                          value={eventData.submission_limit}
                          onChange={(e) =>
                            setEventData({
                              ...eventData,
                              submission_limit: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="newevent_btndiv">
                      <GreyBorderButton
                        onClick={() => {
                          // navigate("/my-events");
                        }}
                      >
                        Cancel
                      </GreyBorderButton>

                      <RedBackgroundButton
                        onClick={() => {
                          navigate(setSelectedButton(2));
                        }}
                      >
                        Save
                      </RedBackgroundButton>
                    </div>
                  </form>
                </div>
              </>
            )}
            {selectedButton === 2 && (
              <>
                <form className="newevent_form">
                  <div className="newevent_row">
                    <div className="newevent_label">
                      <InputLabel>Event Logo (2MB Max)</InputLabel>

                      <div className="myevent_img">
                        <div className="logo_get">
                          <img
                            src={`${IMAGES_URL}${eventData.event_logo}`}
                            alt="Logo"
                          />
                        </div>

                        <Description>Browse File</Description>
                        <CheckboxLabel style={{ textAlign: "center" }}>
                          JPG, GIF, or PNG format, not exceeding 2MB, fitting in
                          area of 120px x 75px
                        </CheckboxLabel>
                      </div>
                    </div>

                    <div className="newevent_label">
                      <InputLabel>Event Banner (2MB Max)</InputLabel>

                      <div className="myevent_img">
                        <div className="logo_get">
                          <img
                            src={`${IMAGES_URL}${eventData.event_banner}`}
                            alt="Logo"
                          />
                        </div>

                        <Description>Browse File</Description>
                        <CheckboxLabel style={{ textAlign: "center" }}>
                          This option allows entrants to edit the submission
                          details.
                        </CheckboxLabel>
                      </div>
                    </div>
                  </div>

                  <div className="newevent_row">
                    <div className="newevent_label_lg">
                      <div className="event_label_cont">
                        <InputLabel>Event Description</InputLabel>
                      </div>
                      <InputType
                        name="event_description"
                        rows="5"
                        value={eventData.event_description}
                        onChange={(e) =>
                          setEventData({
                            ...eventData,
                            event_description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="newevent_row">
                    <div className="newevent_label_lg">
                      <div className="event_label_cont">
                        <InputLabel>Closing Message</InputLabel>
                      </div>
                      <InputType placeholder="Enter Closing Message" />
                    </div>
                  </div>

                  <div className="newevent_row">
                    <div className="newevent_label_lg">
                      <div className="event_label_cont">
                        <InputLabel>Jury Welcome Message</InputLabel>
                      </div>
                      <InputType placeholder="Enter Closing Message" />
                    </div>
                  </div>

                  <div className="eventdetails_radio">
                    <input
                      type="radio"
                      id="changeColor"
                      name="radio"
                      value="Yes"
                    />
                    <InputLabel> Yes </InputLabel>
                    <input
                      type="radio"
                      id="changeColor"
                      name="radio"
                      value="No"
                    />
                    <InputLabel>No</InputLabel>
                  </div>

                  <div className="newevent_btndiv">
                    <GreyBorderButton
                      onClick={() => {
                        navigate(setSelectedButton(1));
                      }}
                    >
                      Cancel
                    </GreyBorderButton>

                    <RedBackgroundButton
                      onClick={() => {
                        navigate(setSelectedButton(3));
                      }}
                    >
                      Save
                    </RedBackgroundButton>
                  </div>
                </form>
              </>
            )}
            {selectedButton === 3 && <SubmissionId  setSelectedButton={setSelectedButton}/>}
            {selectedButton === 4 && <BackdoorAccess setSelectedButton={setSelectedButton}/>}
            {selectedButton === 5 && <AwardDirectory setSelectedButton={setSelectedButton}/>}
          </div>
        </div>
      </div>
    </div>
  );
};
