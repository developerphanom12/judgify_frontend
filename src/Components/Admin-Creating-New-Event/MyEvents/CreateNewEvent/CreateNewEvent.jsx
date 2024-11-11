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
  GreyBackgroundButton,
  GreyBorderButton,
  RedBackgroundButton,
} from "../../../Global/GlobalButton";
import { AwardCategories } from "../AwardCategories/AwardCategories";
import { useNavigate } from "react-router-dom";

export const CreateNewEvent = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const navigate = useNavigate();

  const buttons = [
    { id: 1, label: "Event details" },
    { id: 2, label: "Award Categories" },
    // { id: 3, label: "Registration Form" },
    // { id: 4, label: "Entry Form" },
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
              <form className="newevent_form">
                <div className="newevent_row">
                  <div className="newevent_label">
                    <InputLabel>
                      Event Name <span style={{ color: "#c32728" }}>*</span>
                    </InputLabel>
                    <InputType placeholder="Enter Event Name" />
                  </div>
                  <div className="newevent_label">
                    <InputLabel>
                      Industry type <span style={{ color: "#c32728" }}>*</span>
                    </InputLabel>
                    <SelectBorder style={{ height: "45px" }}>
                      <option>Select Industry Type</option>
                      <option>Lorem Ipsum</option>
                      <option>Lorem Ipsum</option>
                      <option>Lorem Ipsum</option>
                      <option>Lorem Ipsum</option>
                    </SelectBorder>
                  </div>
                </div>

                <div className="newevent_row">
                  <div className="newevent_closing_label">
                    <div className="clos_label">
                      <InputLabel>
                        Closing Date <span style={{ color: "#c32728" }}>*</span>
                      </InputLabel>
                      <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        placeholder=" select date"
                        className="calender"
                      />
                    </div>
                    <div className="clos_label">
                      <InputLabel>
                        Closing Time <span style={{ color: "#c32728" }}>*</span>
                      </InputLabel>
                      <div className="clos_time">
                        <SelectBorder className="time_select">
                          <option>1</option>
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
                        </SelectBorder>
                        <EventHeading>Hr</EventHeading>

                        <SelectBorder className="time_select">
                          <option>1</option>
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
                          <option>60</option>
                        </SelectBorder>

                        <EventHeading>Min</EventHeading>
                      </div>
                    </div>
                  </div>
                  <div className="newevent_label">
                    <InputLabel>
                      Contact Email <span style={{ color: "#c32728" }}>*</span>
                    </InputLabel>
                    <InputType placeholder="Enter Email Address" />
                  </div>
                </div>

                <div className="newevent_row">
                  <div className="newevent_label">
                    <div className="event_label_cont">
                      <InputLabel>
                        Event URL <span style={{ color: "#c32728" }}>*</span>
                      </InputLabel>
                      <EventHeading>https://www.imagesgroup.in/</EventHeading>
                    </div>
                    <InputType placeholder="Enter URL" />
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
                          You can add more than one email address separated by
                          comma or semicolon. EG: james@Images.In,
                          lily@images.in
                        </EventHeading>
                        <MdInfo className="mdi_icon" />
                      </div>
                    </div>
                    <InputType placeholder="Enter Email Address" />
                  </div>
                </div>

                <div className="newevent_row">
                  <div className="newevent_label">
                    <div className="newevent_check">
                      <CheckboxInput type="checkbox" />
                      <InputLabel>Require Endorsement </InputLabel>
                    </div>

                    <CheckboxLabel>
                      This option triggers the need for endorsement of award
                      submission by the entry owner. By enabling this, Images
                      will send an endorsement request to the email address
                      entered by the entrant during submission.
                    </CheckboxLabel>
                  </div>

                  <div className="newevent_label">
                    <div className="newevent_check">
                      <CheckboxInput type="checkbox" />
                      <InputLabel>Allow Submission Withdrawal</InputLabel>
                    </div>

                    <CheckboxLabel>
                      This allows an entrant to withdraw his/her submissions.
                    </CheckboxLabel>
                  </div>
                </div>

                <div className="newevent_row">
                  <div className="newevent_label">
                    <div className="newevent_check">
                      <CheckboxInput type="checkbox" />
                      <InputLabel>Allow Editing to Entries</InputLabel>
                    </div>

                    <CheckboxLabel>
                      This option allows entrants to edit the submission
                      details.
                    </CheckboxLabel>
                  </div>

                  <div className="newevent_label">
                    <div className="newevent_check">
                      <CheckboxInput type="checkbox" />
                      <InputLabel>Limit number of submissions</InputLabel>
                    </div>

                    <CheckboxLabel>
                      Restrict the number of submissions entrant can make
                    </CheckboxLabel>
                  </div>
                </div>

                <div className="newevent_row">
                  <div className="newevent_label">
                    <InputLabel>Event Logo (2MB Max)</InputLabel>

                    <div className="myevent_img">
                      <img src={upload} alt="upload_img" />
                      <input type="file" className="file_input" />
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
                      <input type="file" className="file_input" />
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
                    <InputType placeholder="Enter Event Description" />
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
                  <RedBackgroundButton
                    onClick={() => {
                      setSelectedButton(2); // Navigate to the next section
                    }}
                  >
                    Save
                  </RedBackgroundButton>
                  <GreyBackgroundButton
                    onClick={() => {
                      setSelectedButton(2); // Navigate to the next section
                    }}
                  >
                    Next
                  </GreyBackgroundButton>
                </div>
              </form>
            )}

            {selectedButton === 2 && <AwardCategories />}

            {selectedButton === 3 && <h1>3</h1>}
          </div>
        </div>
      </div>
    </div>
  );
};
