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
import { IoMdClose } from "react-icons/io";

export const EventDetails = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  const eventIdGet = useSelector((state) => state?.users?.eventIdGet);

  const [showDialog, setShowDialog] = useState(false);
  const [selectedOption, setSelectedOption] = useState("No");
  const [socialMedia, setSocialMedia] = useState({
    facebook: false,
    linkedin: false,
    twitter: false,
  });
  const [image, setImage] = useState(null);
  const [socialImage, setSocialImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const token = localStorage.getItem("token")
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);


  const IndustryTypes = [
    "MICE(Meetings, incentives, conferencing, exhibitions)",
    "Non Profit",
    "Corporate",
    "Government",
    "Association",
    "Media",
    "Start up",
    "Educations",
    "Health",
    "Others"
  ]

  const handleSocialMediaChange = (e) => {
    const { name, checked } = e.target;
    setSocialMedia((prevState) => {
      const updatedSocialMedia = {
        ...prevState,
        [name]: checked,
      };
      const selectedSocialMedia = Object.keys(updatedSocialMedia).filter(
        (platform) => updatedSocialMedia[platform]
      );
      setEditableEventData((prevData) => ({
        ...prevData,
        social: selectedSocialMedia, 
      }));

      return updatedSocialMedia;
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    document.getElementById("imageInput").value = "";
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setSelectedOption(value);
    setEditableEventData({
      ...editableEventData,
      is_social: value === "Yes" ? "1" : "0",
    });

    if (value === "Yes") {
      setShowDialog(true);
    } else {
      setShowDialog(false);
    }
  };

  const [eventData, setEventData] = useState({
    name: "",
    event_name: "",
    closing_date: "",
    closing_time: "",
    email: "",
    event_url: "",
    time_zone: "",
    is_endorsement: "0",
    is_withdrawal: "0",
    is_ediit_entry: "0",
    limit_submission: "0",
    submission_limit: 0,
    additional_emails: [],
    industry_type: [],
  });

  const [editableEventData, setEditableEventData] = useState({
    closing_messsage: "",
    is_social: 0,
    jury_welcm_messsage: "",
    event_logo: null,
    event_banner: null,
    social: [],
  });

  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogoFile(file)
      setEditableEventData({
        ...editableEventData,
        event_logo: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setEditableEventData((prevData) => ({
          ...prevData,
          event_logo_preview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBannerFile(file)
      setEditableEventData({
        ...editableEventData,
        event_banner: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setEditableEventData((prevData) => ({
          ...prevData,
          event_banner_preview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(editableEventData.social, "sdffdfdfdf")
  const updateEventData = async () => {
    try {
      const formData = new FormData();
      if (editableEventData.is_social === "1") {
        formData.append('social_image', image || null);
        editableEventData.social.forEach((platform) => {
          formData.append('social[]', platform);
        });
      }
      formData.append('is_social', editableEventData.is_social);
      formData.append("event_logo", editableEventData.event_logo || eventData.event_logo);
      formData.append("event_banner", editableEventData.event_banner || eventData.event_banner);
      formData.append("event_description", eventData.event_description);
      formData.append("closing_messsage", editableEventData.closing_messsage || null);
      formData.append("jury_welcm_messsage", editableEventData.jury_welcm_messsage || null);
      formData.append("eventId", eventIdGet)


      const response = await axios.post(
        `${EXCHNAGE_URL}/updateEventSocial`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      if (response.status === 200) {
        console.log("Event updated successfully:", response.data);
      } else {
        console.error("Error updating event:", response.data);
      }
    } catch (error) {
      console.error("Error updating event:", error.message);
    }
  };



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
            name: response.data.data.name || "",
            event_name: response.data.data.event_name || "",
            closing_date: response.data.data.closing_date || "",
            closing_time: response.data.data.closing_time || "",
            email: response.data.data.email || "",
            event_url: response.data.data.event_url || "",
            time_zone: response.data.data.time_zone || "",
            is_endorsement: response.data.data.is_endorsement || 0,
            is_withdrawal: response.data.data.is_withdrawal || 0,
            is_ediit_entry: response.data.data.is_ediit_entry || 0,
            limit_submission: response.data.data.limit_submission || 0,
            submission_limit: response.data.data.submission_limit || 0,
            additional_emails: response.data.data.additional_emails || [],
            industry_type: response.data.data.industry_type || [],
            event_logo: response.data.data.event_logo || "",
            event_banner: response.data.data.event_banner || "",
            event_description: response.data.data.event_description || "",
            // industry_type: response.data.data.data.industry_type || [],
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Optionally handle the error, e.g., show an alert or redirect to login
      }
    };
    getApi();
  }, []);

  const updateFirstFormData = async () => {

    const payload = {
      eventId: eventIdGet,
      event_name: eventData.event_name,
      closing_date: eventData.closing_date,
      closing_time: eventData.closing_time,
      email: eventData.email,
      event_url: eventData.event_url,
      time_zone: eventData.time_zone,
      is_endorsement: eventData.is_endorsement,
      is_withdrawal: eventData.is_withdrawal,
      is_ediit_entry: eventData.is_ediit_entry,
      limit_submission: eventData.limit_submission,
      submission_limit: eventData.submission_limit,
      industry_type: eventData.industry_type,
      // industry_type: eventData.industry_type.map((industry) => industry.industry_type_name),
    };
    try {
      const eventId = eventIdGet;
      const response = await axios.post(`${EXCHNAGE_URL}/updateCreateEvent`, payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );
      const data = response.data
      console.log('Event updated successfully:', data);

    } catch (error) {
      console.error('Error updating event:', error);
    }

  }
  const handleCheckboxChange = (field) => (e) => {
    setEventData({
      ...eventData,
      [field]: e.target.checked ? 1 : 0, // Set to 1 if checked, otherwise 0
    });
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleIndustryChange = (industry) => {
    if (eventData.industry_type.includes(industry)) {

      setEventData({
        ...eventData,
        industry_type: eventData.industry_type.filter((item) => item !== industry),
      });
    } else {

      setEventData({
        ...eventData,
        industry_type: [...eventData.industry_type, industry],
      });
    }
    setIsDropdownVisible(false);
  };
  const handleRemoveIndustry = (industry) => {
    // Remove the selected industry from the list
    setEventData({
      ...eventData,
      industry_type: eventData.industry_type.filter((item) => item !== industry),
    });
  };


  console.log(editableEventData.social, "hhhhhhhhh")

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
                          placeholder="Select Industry Types"
                          value={eventData.industry_type.join(", ")}
                         
                          readOnly
                          onClick={toggleDropdown} // Show dropdown on click
                          style={{ cursor: "pointer" }}
                        />

                        <div className="selected-industries">
                          {eventData.industry_type.map((industry, index) => (
                            <div key={index} className="selected-industry-item">
                              <span>{industry}</span> {/* Display the name of the industry */}
                              <IoMdClose
                                className="remove-icon"
                                onClick={() => handleRemoveIndustry(industry)} // Remove industry on click
                              />
                            </div>
                          ))}
                        </div>

                        {isDropdownVisible && (
  <div className="dropdown">
    {IndustryTypes.map((industry, index) => (
      <div
        key={index}
        className={`dropdown-option ${eventData.industry_type.includes(industry) ? "selected" : ""}`}
        onClick={() => handleIndustryChange(industry)}
        style={{
          cursor: "pointer",
          backgroundColor: eventData.industry_type.includes(industry) ? "#e0e0e0" : "white",
          pointerEvents: eventData.industry_type.includes(industry) ? "none" : "auto",
        }}
      >
        {industry}
      </div>
    ))}
  </div>
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
                            checked={eventData.is_endorsement === 1}
                            onChange={handleCheckboxChange('is_endorsement')}
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
                            checked={eventData.is_withdrawal === 1}
                            onChange={handleCheckboxChange('is_withdrawal')}
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
                            checked={eventData.is_ediit_entry === 1}
                            onChange={handleCheckboxChange('is_ediit_entry')}
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
                            onChange={handleCheckboxChange('limit_submission')}
                          />
                          <InputLabel>Limit number of submissions</InputLabel>
                        </div>

                        <CheckboxLabel>
                          Restrict the number of submissions entrant can make
                        </CheckboxLabel>
                      </div>

                      {eventData.limit_submission === 1 ?
                    (<div className="newevent_label">
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
                    ):("")  
                    }
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
                          updateFirstFormData();
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
                            src={logoFile ? URL.createObjectURL(logoFile) : `${IMAGES_URL}${eventData.event_logo}`}
                            alt="Event Logo"
                            style={{ width: "120px", height: "75px", objectFit: "contain" }}
                          />
                        </div>
                        <input
                          type="file"
                          accept=".jpg, .jpeg, .png, .gif"
                          onChange={handleLogoChange}
                          style={{ display: "none" }}
                          id="logo-upload"
                        />
                        <label htmlFor="logo-upload" style={{ cursor: "pointer" }}>
                          <Description>Browse File</Description>
                        </label>

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
                            src={bannerFile ? URL.createObjectURL(bannerFile) : `${IMAGES_URL}${eventData.event_banner}`}
                            alt="Event Banner"
                            style={{ width: "120px", height: "75px", objectFit: "contain" }}
                          />
                        </div>
                        <input
                          type="file"
                          accept=".jpg, .jpeg, .png, .gif"
                          onChange={handleBannerChange}
                          style={{ display: "none" }}
                          id="banner-upload"
                        />
                        <label htmlFor="banner-upload" style={{ cursor: "pointer" }}>
                          <Description>Browse File</Description>
                        </label>
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
                        value={eventData.event_description || ""}
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
                      <InputType
                        placeholder="Enter Closing Message"
                        value={editableEventData.closing_messsage}
                        onChange={(e) =>
                          setEditableEventData({
                            ...editableEventData,
                            closing_messsage: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="newevent_row">
                    <div className="newevent_label_lg">
                      <div className="event_label_cont">
                        <InputLabel>Jury Welcome Message</InputLabel>
                      </div>
                      <InputType
                        placeholder="Enter Closing Message"
                        value={editableEventData.jury_welcm_messsage}
                        onChange={(e) =>
                          setEditableEventData({
                            ...editableEventData,
                            jury_welcm_messsage: e.target.value,
                          })
                        } />
                    </div>
                  </div>
                  <InputLabel>Option to select Media Links </InputLabel>
                  <div className="eventdetails_radio">
                    <input
                      type="radio"
                      id="yesOption"
                      name="radio"
                      value="Yes"
                      checked={selectedOption === "Yes"}
                      onChange={handleRadioChange}
                    />
                    <InputLabel> Yes </InputLabel>
                    <input
                      type="radio"
                      id="noOption"
                      name="radio"
                      value="No"
                      checked={selectedOption === "No"}
                      onChange={handleRadioChange}
                    />
                    <InputLabel>No</InputLabel>
                  </div>
                  {showDialog && (
                    <div className="dialogBox">
                      <h3>Select Social Media</h3>
                      <div className="checkboxes">
                        <label>
                          <input
                            type="checkbox"
                            name="facebook"
                            checked={socialMedia.facebook}
                            onChange={handleSocialMediaChange}
                          />
                          Facebook
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            name="linkedin"
                            checked={socialMedia.linkedin}
                            onChange={handleSocialMediaChange}
                          />
                          LinkedIn
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            name="twitter"
                            checked={socialMedia.twitter}
                            onChange={handleSocialMediaChange}
                          />
                          Twitter
                        </label>
                      </div>

                      <div className="image-upload">
                        <h4>Image in Social Media</h4>
                        <input
                          type="file"
                          id="imageInput"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        {imagePreview && (
                          <div className="image-preview">
                            <img
                              src={imagePreview}
                              alt="Preview"
                            />
                            <button onClick={handleRemoveImage}>Remove Image</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}


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
                        updateEventData();
                        navigate(setSelectedButton(3));
                      }}
                    >
                      Save
                    </RedBackgroundButton>
                  </div>
                </form>
              </>
            )}
            {selectedButton === 3 && <SubmissionId setSelectedButton={setSelectedButton} />}
            {selectedButton === 4 && <BackdoorAccess setSelectedButton={setSelectedButton} />}
            {selectedButton === 5 && <AwardDirectory setSelectedButton={setSelectedButton} />}
          </div>
        </div>
      </div>
    </div>
  );
};
