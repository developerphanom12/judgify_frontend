import React, { useEffect, useState } from "react";
import "./CreateNewEvent.scss";
import { TitleBar } from "../../../Global/TitleBar/TitleBar";
import { SlArrowRight } from "react-icons/sl";
import {
  CheckboxInput,
  CheckboxLabel,
  InputLabel,
  InputType,
  SelectBorder,
} from "../../../Global/GlobalFormElement";
import { Description, EventHeading } from "../../../Global/GlobalText";
import TimezoneSelect from "react-timezone-select";
import { MdInfo } from "react-icons/md";
import upload from "../../../../Assets/upload.png";
import {
  GreyBackgroundButton,
  GreyBorderButton,
  RedBackgroundButton,
} from "../../../Global/GlobalButton";
import { AwardCategories } from "../AwardCategories/AwardCategories";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { EXCHNAGE_URL, IMAGES_URL } from "../../../../Url/Url";
import { toast } from "react-toastify";
import { setEventId } from "../../../Redux/Users/action";
import { useDispatch } from "react-redux";

export const CreateNewEvent = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  // const [eventIdd, setEventId] = useState(null); // Store the eventId here

  // const eventId = useSelector((state) => state.users?.id || "");
  const location = useLocation();
  const { eventId } = location.state || {}; // Accessing eventId passed from previous page
  console.log("event Id", eventId);

  // const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    event_name: "",
    closing_date: "",
    closing_time: "",
    email: "",
    event_url: "",
    time_zone: selectedTimezone,
    is_endorsement: 0,
    is_withdrawal: 0,
    is_ediit_entry: 0,
    limit_submission: 0,
    submission_limit: "",
    event_description: "",
    industry_type: [],
    additional_email: [],
  });

  const [files, setFiles] = useState({
    event_logo: null,
    event_banner: null,
  });

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

  const getApi = async () => {
    const event_id = eventId; // Replace with your dynamic event_id
    try {
      const response = await axios.get(`${EXCHNAGE_URL}/getEvent/${event_id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        console.log("Fetched Data:", response.data.data);
        setEventData({
          name: response.data.data.name || "", // assuming name exists in the API response
          event_name: response.data.data.event_name || "",
          closing_date: response.data.data.closing_date || "",
          closing_time: response.data.data.cling_time || "",
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

  useEffect(() => {
    getApi();
  }, []);

  const formatDate = (date) => {
    const [day, month, year] = date.split("/"); // Split into day, month, year
    return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.event_description) {
      alert("Event description cannot be empty");
      return;
    }
    const form = new FormData();
    form.append("event_name", formData.event_name);
    form.append("closing_date", formData.closing_date);
    form.append("closing_time", formData.closing_time);
    form.append("email", formData.email);
    form.append("event_url", formData.event_url);
    form.append("time_zone", formData.time_zone);
    form.append("is_endorsement", formData.is_endorsement ? 1 : 0);
    form.append("is_withdrawal", formData.is_withdrawal ? 1 : 0);
    form.append("is_ediit_entry", formData.is_ediit_entry ? 1 : 0);
    form.append("limit_submission", formData.limit_submission ? 1 : 0);
    form.append("submission_limit", formData.submission_limit);
    form.append("event_description", formData.event_description);

    // Append industry_type as individual items
    formData.industry_type.forEach((type) =>
      form.append("industry_type[]", type)
    );
    // Append additional_email as individual items
    formData.additional_email.forEach((email) =>
      form.append("additional_email[]", email)
    );

    if (files.event_logo) form.append("event_logo", files.event_logo);
    if (files.event_banner) form.append("event_banner", files.event_banner);

    try {
      const response = await axios.post(`${EXCHNAGE_URL}/createEvent`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setSelectedButton(2);

        toast.success(response.data.message);
        console.log("checkid", response.data.data.id);
        // dispatch(setEventId(eventId));
        // const eventId = response.data.data.id;

        // const id = response.data.data.id;
        // setEventId(id);
      }
    } catch (error) {
      console.error("Error creating event", error.response || error);
    }
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles({
      ...files,
      [name]: fileList[0],
    });
  };

  const buttons = [
    { id: 1, label: "Event details" },
    { id: 2, label: "Award Categories" },
    { id: 3, label: "Registration Form" },
    { id: 4, label: "Entry Form" },
  ];

  const handleClick = (id) => {
    setSelectedButton(id);
  };

  return (
    <div>
      <div className="newevent_div">
        <TitleBar title="Create New Event" />
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
            {selectedButton === 1 && (
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
                  onClick={() => {
                    navigate("/stripe-setting");
                  }}
                />
                <Description>Paid</Description>
              </div>
            )}
          </div>

          <div className="newevent_content">
            {selectedButton === 1 && (
              <>
                {eventId ? (
                  <div className="get_data">
                    <form className="newevent_form">
                      <div className="newevent_row">
                        <div className="newevent_label">
                          <InputLabel>
                            Event Name{" "}
                            <span style={{ color: "#c32728" }}>*</span>
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
                          <SelectBorder
                            // name="industry_type"
                            style={{ height: "45px" }}
                            multiple
                            value={eventData.industry_types}
                            onChange={(e) =>
                              setEventData({
                                ...eventData,
                                industry_types: [
                                  ...e.target.selectedOptions,
                                ].map((o) => o.value),
                              })
                            }
                          >
                            <option value="">Select Industry Type</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Skin Care">Skin Care</option>
                            <option value="Beauty">Beauty</option>
                          </SelectBorder>
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
                          {/* <div className="clos_label">
                            <InputLabel>
                              Closing Time{" "}
                              <span style={{ color: "#c32728" }}>*</span>
                            </InputLabel>
                           <div className="time">{eventData.closing_time}</div>
                          
                          </div> */}
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
                                You can add more than one email address
                                separated by comma or semicolon. EG:
                                james@Images.In, lily@images.in
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
                            This option triggers the need for endorsement of
                            award submission by the entry owner. By enabling
                            this, Images will send an endorsement request to the
                            email address entered by the entrant during
                            submission.
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
                              This option allows entrants to edit the submission
                              details.
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
                            <InputLabel>
                              Event Description
                              <span style={{ color: "#c32728" }}>*</span>
                            </InputLabel>
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

                      <div className="newevent_btndiv">
                        <GreyBorderButton
                          onClick={() => {
                            navigate("/my-events");
                          }}
                        >
                          Cancel
                        </GreyBorderButton>
                        <GreyBackgroundButton
                          onClick={() => {
                            navigate(setSelectedButton(2), {
                              state: { eventId: eventId }, // Pass eventId in state
                            });
                          }}
                        >
                          Next
                        </GreyBackgroundButton>
                        <RedBackgroundButton
                          onClick={() => {
                            navigate(setSelectedButton(2), {
                              state: { eventId: eventId }, // Pass eventId in state
                            });
                          }}
                        >
                          Save
                        </RedBackgroundButton>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="post_data">
                    <form className="newevent_form" onSubmit={handleSubmit}>
                      <div className="newevent_row">
                        <div className="newevent_label">
                          <InputLabel>
                            Event Name{" "}
                            <span style={{ color: "#c32728" }}>*</span>
                          </InputLabel>
                          <InputType
                            name="event_name"
                            value={formData.event_name}
                            onChange={handleChange}
                            placeholder="Enter Event Name"
                          />
                        </div>
                        <div className="newevent_label">
                          <InputLabel>
                            Industry type{" "}
                            <span style={{ color: "#c32728" }}>*</span>
                          </InputLabel>
                          <SelectBorder
                            name="industry_type"
                            value={formData.industry_type}
                            onChange={(e) => {
                              // Ensure the selected values are always an array
                              const selectedValues = Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                              );
                              setFormData({
                                ...formData,
                                industry_type: selectedValues, // Store the selected values as an array
                              });
                            }}
                            multiple
                            style={{ height: "45px" }}
                          >
                            <option value="">Select Industry Type</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Skin Care">Skin Care</option>
                            <option value="Beauty">Beauty</option>
                          </SelectBorder>
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
                              id="closing_date"
                              name="closing_date"
                              value={formData.closing_date}
                              onChange={handleChange}
                              className="calender"
                            />
                          </div>
                          <div className="clos_label">
                            <InputLabel>
                              Closing Time{" "}
                              <span style={{ color: "#c32728" }}>*</span>
                            </InputLabel>
                            <div className="clos_time">
                              <SelectBorder
                                className="time_select"
                                name="closing_time"
                                value={formData.closing_time}
                                onChange={handleChange}
                              >
                                {[...Array(24).keys()].map((i) => (
                                  <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                  </option>
                                ))}
                                {/* <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                          <option>11</option>
                          <option>12</option>
                          <option>13</option>
                          <option>14</option>
                          <option>15</option>
                          <option>16</option>
                          <option>17</option>
                          <option>18</option>
                          <option>19</option>
                          <option>20</option>
                          <option>21</option>
                          <option>22</option>
                          <option>23</option>
                          <option>24</option> */}
                              </SelectBorder>
                              <EventHeading>Hr</EventHeading>

                              <SelectBorder
                                className="time_select"
                                name="closing_time_minutes"
                                value={formData.closing_time_minutes}
                                onChange={handleChange}
                              >
                                {/* <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                          <option>11</option>
                          <option>12</option>
                          <option>13</option>
                          <option>14</option>
                          <option>15</option>
                          <option>16</option>
                          <option>17</option>
                          <option>18</option>
                          <option>19</option>
                          <option>20</option>
                          <option>21</option>
                          <option>22</option>
                          <option>23</option>
                          <option>24</option>
                          <option>25</option>
                          <option>26</option>
                          <option>27</option>
                          <option>28</option>
                          <option>29</option>
                          <option>30</option>
                          <option>31</option>
                          <option>32</option>
                          <option>33</option>
                          <option>34</option>
                          <option>35</option>
                          <option>36</option>
                          <option>37</option>
                          <option>38</option>
                          <option>39</option>
                          <option>40</option>
                          <option>41</option>
                          <option>42</option>
                          <option>43</option>
                          <option>44</option>
                          <option>45</option>
                          <option>46</option>
                          <option>47</option>
                          <option>48</option>
                          <option>49</option>
                          <option>50</option>
                          <option>51</option>
                          <option>52</option>
                          <option>53</option>
                          <option>54</option>
                          <option>55</option>
                          <option>56</option>
                          <option>57</option>
                          <option>58</option>
                          <option>59</option>
                          <option>60</option> */}
                                {[...Array(60).keys()].map((i) => (
                                  <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                  </option>
                                ))}
                              </SelectBorder>

                              <EventHeading>Min</EventHeading>
                            </div>
                          </div>
                        </div>
                        <div className="newevent_label">
                          <InputLabel>
                            Contact Email{" "}
                            <span style={{ color: "#c32728" }}>*</span>
                          </InputLabel>
                          <InputType
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter Email Address"
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
                            name="event_url"
                            value={formData.event_url}
                            onChange={handleChange}
                            placeholder="Enter URL"
                          />
                        </div>
                        <div className="newevent_label">
                          <InputLabel>
                            Timezone <span style={{ color: "#c32728" }}>*</span>
                          </InputLabel>

                          <TimezoneSelect
                            value={selectedTimezone}
                            onChange={setSelectedTimezone}
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
                                You can add more than one email address
                                separated by comma or semicolon. EG:
                                james@Images.In, lily@images.in
                              </EventHeading>
                              <MdInfo className="mdi_icon" />
                            </div>
                          </div>
                          <InputType
                            name="additional_email"
                            value={formData.additional_email.join(", ")} // Convert the array to a comma-separated string for display
                            onChange={(e) => {
                              // Split the input string by comma or semicolon and update the `additional_email` array
                              const emails = e.target.value.split(/[,;]\s*/); // Split by comma or semicolon followed by optional spaces
                              setFormData({
                                ...formData,
                                additional_email: emails,
                              });
                            }}
                            placeholder="Enter Email Address"
                          />
                        </div>
                      </div>

                      <div className="newevent_row">
                        <div className="newevent_label">
                          <div className="newevent_check">
                            <CheckboxInput
                              type="checkbox"
                              name="is_endorsement"
                              checked={formData.is_endorsement}
                              onChange={handleCheckboxChange}
                            />
                            <InputLabel>Require Endorsement </InputLabel>
                          </div>

                          <CheckboxLabel>
                            This option triggers the need for endorsement of
                            award submission by the entry owner. By enabling
                            this, Images will send an endorsement request to the
                            email address entered by the entrant during
                            submission.
                          </CheckboxLabel>
                        </div>

                        <div className="newevent_label">
                          <div className="newevent_check">
                            <CheckboxInput
                              type="checkbox"
                              name="is_withdrawal"
                              checked={formData.is_withdrawal}
                              onChange={handleCheckboxChange}
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
                              name="is_ediit_entry"
                              checked={formData.is_ediit_entry}
                              onChange={handleCheckboxChange}
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
                              name="limit_submission"
                              checked={formData.limit_submission}
                              onChange={handleCheckboxChange}
                            />
                            <InputLabel>Limit number of submissions</InputLabel>
                          </div>

                          <CheckboxLabel>
                            Restrict the number of submissions entrant can make
                          </CheckboxLabel>
                        </div>
                        {formData.limit_submission && (
                          <div className="newevent_label">
                            <InputLabel>Submission Limit</InputLabel>
                            <InputType
                              name="submission_limit"
                              value={formData.submission_limit}
                              onChange={handleChange}
                              placeholder="Enter Submission Limit"
                            />
                          </div>
                        )}
                      </div>

                      <div className="newevent_row">
                        <div className="newevent_label">
                          <InputLabel>Event Logo (2MB Max)</InputLabel>

                          <div className="myevent_img">
                            <img src={upload} alt="upload_img" />
                            <input
                              type="file"
                              className="file_input"
                              name="event_logo"
                              onChange={handleFileChange}
                            />
                            <Description>Browse File</Description>
                            <CheckboxLabel>
                              This option allows entrants to edit the submission
                              details.
                            </CheckboxLabel>
                          </div>
                        </div>

                        <div className="newevent_label">
                          <InputLabel>Event Banner (2MB Max)</InputLabel>

                          <div className="myevent_img">
                            <img src={upload} alt="upload_img" />
                            <input
                              type="file"
                              className="file_input"
                              name="event_banner"
                              onChange={handleFileChange}
                            />
                            <Description>Browse File</Description>
                            <CheckboxLabel>
                              This option allows entrants to edit the submission
                              details.
                            </CheckboxLabel>
                          </div>
                        </div>
                      </div>

                      <div className="newevent_row">
                        <div className="newevent_label_lg">
                          <div className="event_label_cont">
                            <InputLabel>
                              Event Description
                              <span style={{ color: "#c32728" }}>*</span>
                            </InputLabel>
                          </div>
                          <InputType
                            name="event_description"
                            value={formData.event_description}
                            onChange={handleChange}
                            rows="5"
                            placeholder="Enter Event Description"
                          />
                        </div>
                      </div>

                      <div className="newevent_btndiv">
                        <GreyBorderButton
                          onClick={() => {
                            navigate("/my-events");
                          }}
                        >
                          Cancel
                        </GreyBorderButton>

                        {/* <GreyBackgroundButton>Next</GreyBackgroundButton> */}

                        <RedBackgroundButton type="submit">
                          Save
                        </RedBackgroundButton>
                      </div>
                    </form>
                  </div>
                )}
              </>
            )}

            {selectedButton === 2 && <AwardCategories eventidprops={eventId} />}

            {selectedButton === 3 && <h1>3</h1>}
            {selectedButton === 4 && <h1>4</h1>}
          </div>
        </div>
      </div>
    </div>
  );
};
