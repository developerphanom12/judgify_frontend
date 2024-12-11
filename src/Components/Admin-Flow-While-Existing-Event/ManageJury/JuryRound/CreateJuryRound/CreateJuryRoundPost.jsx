import React, { useState } from "react";

import "./CreateJuryRoundPost.scss";

import { IoMdInformationCircle } from "react-icons/io";

import TimePicker from "react-time-picker";
import { useNavigate } from "react-router-dom";
import {
  GreyBackgroundButton,
  GreyBorderButton,
  RedBackgroundButton,
} from "../../../../Global/GlobalButton";
import {
  CheckboxInput,
  CheckLabel,
  InputLabel,
  InputType,
} from "../../../../Global/GlobalFormElement";
import { TitleBar } from "../../../../Global/TitleBar/TitleBar";
import { TopBar } from "../../../TopBar/TopBar";
import { MultiSelect } from "react-multi-select-component";
import { RedMainHeading } from "../../../../Global/GlobalText";
import { MdOutlineSettings } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

export const CreateJuryRoundPost = () => {
  const [selectedButton, setSelectedButton] = useState(0);
  const [time, setTime] = useState("00:00");
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const buttons = [
    { id: 1, label: "General Settings", status: "General Settings" },
    { id: 2, label: "Scorecards (0)", status: "Scorecards (0)" },
  ];

  const handleClick = (index) => {
    setSelectedButton(index);
  };

  const options = [
    { label: "BEST B2B ECOMMERCE", value: "grapes" },
    { label: "BEST DIGITAL AGENCY OF THE YEAR", value: "mango" },
    { label: "BEST ECOMMERCE TECHNOLOGY INNOVATION", value: "strawberry" },
    {
      label: "BEST INNOVATION IN ECOMMERCE DELIVERY/LOGISTICS",
      value: "strawberry",
    },
  ];

  return (
    <div>
      <div className="create-jury-round_div">
        <TitleBar title="Jury Round" />
        <div className="create-jury-round_white_bg">
          <TopBar titleheading="Create a new Jury Round" />
          <div className="create-jury-round_click">
            {buttons.map((button, index) => (
              <button
                key={button.id}
                onClick={() => handleClick(index)}
                className={selectedButton === index ? "selected" : ""}
              >
                {button.label}
              </button>
            ))}
          </div>
          {selectedButton === 0 && (
            <>
              <div className="create_jury_row">
                <div className="create_jury_closing_label">
                  <div className="create_jury_clos_label">
                    <InputLabel>
                      Start Date
                      <span style={{ color: "#c32728" }}>*</span>
                    </InputLabel>

                    <div className="create_jury_date_time">
                      <InputType
                        type="date"
                        id="closing_date"
                        name="closing_date"
                      />

                      <TimePicker
                        onChange={(value) => {
                          setTime(value);
                        }}
                        value={time}
                        disableClock={true}
                      />
                    </div>
                  </div>
                </div>

                <div className="create_jury_closing_label">
                  <div className="create_jury_clos_label">
                    <InputLabel>
                      End Date
                      <span style={{ color: "#c32728" }}>*</span>
                    </InputLabel>

                    <div className="create_jury_date_time">
                      <InputType
                        type="date"
                        id="closing_date"
                        name="closing_date"
                      />

                      <TimePicker
                        onChange={(value) => {
                          setTime(value);
                        }}
                        value={time}
                        disableClock={true}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="create_jury_content_one">
                <div className="create_jury_content_row">
                  <div className="create_jury_content_column">
                    <div className="create_jury_check">
                      <CheckboxInput type="checkbox" />
                      <CheckLabel>Active</CheckLabel>
                    </div>

                    <div className="create_jury_check">
                      <CheckboxInput type="checkbox" />
                      <CheckLabel>
                        Allow the Jury to confirm scores for individual
                        categories assigned
                      </CheckLabel>
                    </div>

                    <div className="create_jury_check">
                      <CheckboxInput type="checkbox" />
                      <CheckLabel>
                        Allow the Jury to print & send score for all completed
                        submissions
                      </CheckLabel>
                    </div>

                    <div className="create_jury_check">
                      <CheckboxInput type="checkbox" />
                      <CheckLabel>Show comments box during judging</CheckLabel>
                    </div>

                    <div className="create_jury_check">
                      <CheckboxInput type="checkbox" />
                      <CheckLabel>Display Total Score</CheckLabel>
                    </div>

                    <div className="create_jury_check">
                      <CheckboxInput type="checkbox" />
                      <CheckLabel>Enable Abstain</CheckLabel>
                    </div>
                  </div>

                  <div className="create_jury_content_column">
                    <div className="create_jury_check">
                      <CheckboxInput type="checkbox" />
                      <CheckLabel>
                        Allow the Jury to score one category at a time
                      </CheckLabel>
                    </div>

                    <div className="create_jury_check">
                      <CheckboxInput type="checkbox" />
                      <CheckLabel>
                        Allow the Jury to confirm scores for all completed
                        submissions
                      </CheckLabel>
                    </div>

                    <div className="create_jury_check">
                      <CheckboxInput type="checkbox" />
                      <CheckLabel>Allow drop down for scoring</CheckLabel>
                    </div>

                    <div className="create_jury_check">
                      <CheckboxInput type="checkbox" />
                      <CheckLabel>
                        Show submission data on a single page
                      </CheckLabel>
                    </div>

                    <div className="create_jury_check">
                      <CheckboxInput type="checkbox" />
                      <CheckLabel>
                        Allow the Jury to view each other's scores
                      </CheckLabel>
                    </div>
                  </div>
                </div>
              </div>

              <div className="create_overall_score">
                <InputLabel>Submission Limit</InputLabel>
                <CheckLabel>
                  This is the calculated overall score of a submission for this
                  round.
                </CheckLabel>
                <div className="create_overall">
                  <InputType type="text" />
                  <IoMdInformationCircle />
                </div>
              </div>

              <div className="create_jury_btndiv">
                <GreyBorderButton>Back to Jury Rounds</GreyBorderButton>
                <RedBackgroundButton
                  onClick={() => {
                    navigate("/jury-round-data");
                  }}
                >
                  Create
                </RedBackgroundButton>
              </div>
            </>
          )}

          {selectedButton === 1 && (
            <>
            <div className="create_jury_content_two">
              <div className="create_jury_heading">
                <RedMainHeading>Scorecard 1</RedMainHeading>
              </div>

              <div className="create_jury_select_div">
                <InputLabel> Scorecard criteria </InputLabel>

                <div className="create_jury_criteria">
                  <div className="create_jury_sub_criteria">
                    <div className="create_jury_subb">
                      <CheckLabel>Criteria #</CheckLabel>
                    </div>
                    <CheckLabel>
                      Criteria title{" "}
                      <span style={{ color: "#C32728" }}> * </span>
                    </CheckLabel>
                  </div>

                  <div className="create_jury_sub_criteria">
                    <CheckLabel>
                      Criteria description{" "}
                      <span style={{ color: "#C32728" }}>*</span>
                    </CheckLabel>
                  </div>
                </div>

                <div className="create_jury_criteria">
                  <div className="create_jury_sub_criteria">
                    <div className="create_jury_subb">
                      <CheckLabel className="create_jury_input">1</CheckLabel>
                    </div>
                    <InputType type="text" />
                  </div>

                  <div className="create_jury_sub_criteria">
                    <InputType type="text" />
                    <MdOutlineSettings />
                    <RiDeleteBin6Fill />
                  </div>
                </div>
              </div>

              <div className="create_jury_select_div">
                <div className="create_jury_overall">
                  <div className="create_juryoverall_head">
                    <InputLabel> Overall Scorecard Value </InputLabel>
                    <CheckLabel>
                      This is the calculated overall Scorecard value of a
                      submission
                    </CheckLabel>
                  </div>
                  <InputType type="text" />
                </div>

                <div className="create_jury_overall">
                  <InputLabel>
                    Use this scorecard for the following Categories
                  </InputLabel>
                  <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                  />
                </div>
              </div>




            </div>

            <div className="create_jury_btndiv">
              <GreyBorderButton>Cancel</GreyBorderButton>
             <RedBackgroundButton
            
             >
               Create
             </RedBackgroundButton>
             <GreyBackgroundButton      onClick={() => {
                  navigate("/jury-round-data");
                }}
             
             >Create & Add New</GreyBackgroundButton>
              </div>

            </>
          )}
        </div>
      </div>
    </div>
  );
};
