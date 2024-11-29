import React, { useState } from "react";
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
  GreyBorderButton,
  RedBackgroundButton,
} from "../../../Global/GlobalButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EXCHNAGE_URL } from "../../../../Url/Url";
import { toast } from "react-toastify";
import { setEventId } from "../../../Redux/Users/action";
import { useDispatch } from "react-redux";
import { AwardCategoriesPost } from "../AwardCategories/AwardCategoriesPost";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { RegistrationForm } from "../RegistrationForm/RegistrationForm";

export const CreateNewEventPost = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [time, setTime] = useState("00:00");

  const dispatch = useDispatch();

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

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.event_name) newErrors.event_name = "Event name is required.";
    if (!formData.closing_date)
      newErrors.closing_date = "Closing date is required.";
    if (!formData.closing_time)
      newErrors.closing_time = "Closing time is required.";

    if (!formData.email) newErrors.email = "Contact email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";

    if (!formData.event_url) newErrors.event_url = "Event URL is required.";

    if (formData.additional_email.length === 0) {
      newErrors.additional_email = "Additional email is required.";
    }

    // if (!formData.time_zone) newErrors.time_zone = "Timezone is required.";

    if (!formData.industry_type.length)
      newErrors.industry_type = "Industry type is required.";

    if (!formData.event_description)
      newErrors.event_description = "Event description is required.";

    // if (formData.limit_submission && !formData.submission_limit)
    //   newErrors.submission_limit = "Submission limit is required.";

    if (!files.event_logo) newErrors.event_logo = "Image is required.";
    if (!files.event_banner) newErrors.event_banner = "Image is required.";

    return newErrors;
  };

  // const [files, setFiles] = useState({
  //   event_logo: null,
  //   event_banner: null,
  // });

  // const [formpostData, setFormPostData] = useState({
  //   industry_type: [], // To store selected industry types as an array
  // });

  const [files, setFiles] = useState({
    event_logo: null,
    event_banner: null,
  });

  const [previews, setPreviews] = useState({
    event_logo: null,
    event_banner: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; // Stop the form submission if there are errors
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
    // form.append("submission_limit", formData.submission_limit );

    const submissionLimit = formData.submission_limit
      ? formData.submission_limit
      : 0;
    form.append("submission_limit", submissionLimit);

    form.append("event_description", formData.event_description);

    formData.industry_type.forEach((type) =>
      form.append("industry_type[]", type)
    );
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
        const eventId = response.data.eventId;
        dispatch(setEventId(eventId));
        toast.success("Event Created Successfully", response.data.message);
      }
    } catch (error) {
      console.error("Error creating event", error.response || error);
      toast.error("An error occurred while creating the event");
    }
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    const file = fileList[0];

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviews((prevPreviews) => ({
        ...prevPreviews,
        [name]: previewURL,
      }));
    }

    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: file,
    }));
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
                <div className="post_data">
                  <form className="newevent_form" onSubmit={handleSubmit}>
                    <div className="newevent_row">
                      <div className="newevent_label">
                        <InputLabel>
                          Event Name <span style={{ color: "#c32728" }}>*</span>
                        </InputLabel>
                        <InputType
                          name="event_name"
                          value={formData.event_name}
                          onChange={handleChange}
                          placeholder="Enter Event Name"
                        />

                        {errors.event_name && (
                          <span className="error">{errors.event_name}</span>
                        )}
                      </div>
                      <div className="newevent_label">
                        <InputLabel>
                          Industry type{" "}
                          <span style={{ color: "#c32728" }}>*</span>
                        </InputLabel>

                        {/* <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      /> */}

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
                          // multiple
                          style={{ height: "45px" }}
                        >
                          <option value="">Select Industry Type</option>
                          <option value="Fashion">Fashion</option>
                          <option value="Skin Care">Skin Care</option>
                          <option value="Beauty">Beauty</option>
                        </SelectBorder>

                        {errors.industry_type && (
                          <span className="error">{errors.industry_type}</span>
                        )}
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
                          {errors.closing_date && (
                            <span className="error">{errors.closing_date}</span>
                          )}
                        </div>
                        <div className="clos_label">
                          <InputLabel>
                            Closing Time{" "}
                            <span style={{ color: "#c32728" }}>*</span>
                          </InputLabel>

                          <TimePicker
                            onChange={(value) => {
                              setTime(value);
                              setFormData({
                                ...formData,
                                closing_time: value,
                              });
                            }}
                            value={time}
                            disableClock={true}
                          />

                          {errors.closing_time && (
                            <span className="error">{errors.closing_time}</span>
                          )}
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

                        {errors.email && (
                          <span className="error">{errors.email}</span>
                        )}
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
                            https://www.awardsuite.com/
                          </EventHeading>
                        </div>
                        <InputType
                          name="event_url"
                          // value={formData.event_url}
                          value={
                            formData.event_url || "https://www.awardsuite.com/"
                          }
                          onChange={handleChange}
                          placeholder="https://www.awardsuite.com/"
                        />
                        {errors.event_url && (
                          <span className="error">{errors.event_url}</span>
                        )}
                      </div>
                      <div className="newevent_label">
                        <InputLabel>
                          Timezone <span style={{ color: "#c32728" }}>*</span>
                        </InputLabel>

                         <TimezoneSelect
                          value={selectedTimezone}
                          onChange={setSelectedTimezone}
                        /> 


                        {/* {errors.time_zone && (
                          <span className="error">{errors.time_zone}</span>
                        )}{" "}  */}

                  
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

                        {errors.additional_email && (
                          <span className="error">
                            {errors.additional_email}
                          </span>
                        )}
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
                           type="number"
                            name="submission_limit"
                            value={formData.submission_limit}
                            onChange={handleChange}
                            placeholder="Enter Submission Limit"
                          />

                          {/* {errors.submission_limit && (
                            <span className="error">
                              {errors.submission_limit}
                            </span>
                          )} */}
                        </div>
                      )}
                    </div>

                    <div className="newevent_row">
                      <div className="newevent_label">
                        <InputLabel>Event Logo (2MB Max)</InputLabel>

                        <div className="myevent_img">
                          {previews.event_logo ? (
                            <img
                              src={previews.event_logo}
                              alt="Event Logo Preview"
                              className="preview_img"
                            />
                          ) : (
                            <img src={upload} alt="Default Logo" />
                          )}
                          <input
                            type="file"
                            className="file_input"
                            name="event_logo"
                            accept="image/*"
                            onChange={handleFileChange}
                          />

                          <Description>Browse File</Description>
                          <CheckboxLabel>
                            This option allows entrants to edit the submission
                            details.
                          </CheckboxLabel>
                        </div>
                        {errors.event_logo && (
                          <span className="error">{errors.event_logo}</span>
                        )}
                      </div>

                      <div className="newevent_label">
                        <InputLabel>Event Banner (2MB Max)</InputLabel>

                        <div className="myevent_img">
                          {previews.event_banner ? (
                            <img
                              src={previews.event_banner}
                              alt="Event Banner Preview"
                              className="preview_img"
                            />
                          ) : (
                            <img src={upload} alt="Default Banner" />
                          )}
                          <input
                            type="file"
                            className="file_input"
                            name="event_banner"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                          <Description>Browse File</Description>
                          <CheckboxLabel>
                            This option allows entrants to edit the submission
                            details.
                          </CheckboxLabel>
                        </div>
                        {errors.event_banner && (
                          <span className="error">{errors.event_banner}</span>
                        )}
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
                        {errors.event_description && (
                          <span className="error">
                            {errors.event_description}
                          </span>
                        )}
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
              </>
            )}

            {selectedButton === 2 && <AwardCategoriesPost/>}

            {selectedButton === 3 && <RegistrationForm/>}
            {selectedButton === 4 && <RegistrationForm/>}
          </div>
        </div>
      </div>
    </div>
  );
};
