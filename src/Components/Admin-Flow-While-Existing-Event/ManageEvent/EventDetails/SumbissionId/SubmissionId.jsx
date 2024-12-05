import React from "react";
import "./SubmissionId.scss";
import {
  InputLabel,
  InputType,
} from "../../../../Global/GlobalFormElement";
import {
  GreyBorderButton,
  RedBackgroundButton,
} from "../../../../Global/GlobalButton";
import { useNavigate } from "react-router-dom";
import { Description } from "../../../../Global/GlobalText";

export const SubmissionId = ({ setSelectedButton }) => {
  const navigate = useNavigate();
  return (
    <div>
      <form className="submissionId_form">
        <div className="submissionid_format">
          <Description>
            {" "}
            The Submission ID is the number which gets assigned to the works
            submitted by participants.{" "}
          </Description>
          <Description>
            {" "}
            *Note that the Submission ID cannot be changed once participants
            have started submitting their works.{" "}
          </Description>
        </div>

        <div className="submissionid_format">
          <InputLabel>Submission ID Format</InputLabel>
          <div className="submission_id_radio">
            <input type="radio" id="changeColor" name="radio" value="Yes" />
            <Description>
              {" "}
              Based on Category Prefix (Order by Category Prefix){" "}
            </Description>
          </div>
          <div className="submission_id_radio">
            <input type="radio" id="changeColor" name="radio" value="Yes" />
            <Description>
              {" "}
              Running Number with Category Prefix (Order by Category
              Submissions){" "}
            </Description>
          </div>
          <div className="submission_id_radio">
            <input type="radio" id="changeColor" name="radio" value="Yes" />
            <Description> Running number (Order by Submissions) </Description>
          </div>
        </div>

        <div className="submissionId_row">
          <div className="submissionId_label_lg">
            <div className="event_label_cont">
              <InputLabel>Number of Digits</InputLabel>
            </div>
            <InputType type="number" placeholder="4" />
          </div>

          <div className="submissionId_label_lg">
            <div className="event_label_cont">
              <InputLabel>Start From </InputLabel>
            </div>
            <InputType type="number" placeholder="1" />
          </div>
        </div>

        <div className="submissionId_row">
          <div className="submissionId_label_lg">
            <div className="event_label_cont">
              <InputLabel>Increment</InputLabel>
            </div>
            <InputType type="number" placeholder="4" />
          </div>

          <div className="submissionId_label_lg">
            <div className="event_label_cont">
              <InputLabel>Prefix</InputLabel>
            </div>
            <InputType type="number" placeholder="1" />
          </div>
        </div>

        <div className="submissionId_row">
          <div className="submissionId_label_lg">
            <div className="event_label_cont">
              <InputLabel>Prefix</InputLabel>
            </div>
            <InputType type="number" />
          </div>

          <div className="submissionId_label_lg">
            <div className="event_label_cont">
              <InputLabel>Your Submission ID Preview</InputLabel>
            </div>
            <InputType placeholder="CatA-0001, CatA-0002, CatB-0001" />
          </div>
        </div>

        <div className="submissionId_btndiv">
          <GreyBorderButton
            onClick={() => {
              navigate(setSelectedButton(2));
            }}
          >
            Cancel
          </GreyBorderButton>

          <RedBackgroundButton
            onClick={() => {
              navigate(setSelectedButton(4));
            }}
          >
            Save
          </RedBackgroundButton>
        </div>
      </form>
    </div>
  );
};
