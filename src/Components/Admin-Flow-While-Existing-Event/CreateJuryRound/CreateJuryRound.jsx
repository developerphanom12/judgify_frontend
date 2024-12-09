import React, { useState } from "react";
import { TitleBar } from "../../Global/TitleBar/TitleBar";
import { TopBar } from "../TopBar/TopBar";
import "./CreateJuryRound.scss";
import {
  CheckboxInput,
  CheckLabel,
  InputLabel,
  InputType,
} from "../../Global/GlobalFormElement";
import { IoMdInformationCircle } from "react-icons/io";
import {
  GreyBorderButton,
  RedBackgroundButton,
} from "../../Global/GlobalButton";
import TimePicker from "react-time-picker";
import { useNavigate } from "react-router-dom";

export const CreateJuryRound = () => {
  const [selectedButton, setSelectedButton] = useState(0);
  const [time, setTime] = useState("00:00");

  const navigate = useNavigate();

  const buttons = [
    { id: 1, label: "General Settings", status: "General Settings" },
    { id: 2, label: "Scorecards (0)", status: "Scorecards (0)" },
  ];
  const handleClick = (index) => {
    setSelectedButton(index);
  };

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
                <RedBackgroundButton  onClick={() => {
              navigate("/jury-round-data");
            }}>Create</RedBackgroundButton>
              </div>
            </>
          )}

          {selectedButton === 1 && (
            <div className="create_jury_content_two">
              sderfsdfdfdf {/* Content for Scorecards */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
