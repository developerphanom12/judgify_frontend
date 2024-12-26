import React from "react";
import "./BackdoorAccess.scss";
import { Description } from "../../../../Global/GlobalText";
import {
  GreyBorderButton,
  RedBackgroundButton,
} from "../../../../Global/GlobalButton";
import { useNavigate } from "react-router-dom";
import { InputLabel, InputType } from "../../../../Global/GlobalFormElement";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaCopy } from "react-icons/fa";

export const BackdoorAccess = ({ setSelectedButton }) => {
  const navigate = useNavigate();

  return (
    <div>
      <form className="newevent_form">
        <div className="submissionid_format">
          <Description>
            You can create a link to give backdoor access to users to allow them
            to submit their works even after
          </Description>
          <Description>
            submission for the event has officially closed.
          </Description>
        </div>

        <div className="backdoorlink_div">
          <InputLabel>Backdoor Link</InputLabel>
          <div className="backdoorlink_input_btn">
            <InputType type="number" placeholder="4" />
            <RedBackgroundButton>Generate</RedBackgroundButton>
            <GreyBorderButton>
              {" "}
              <FaCopy /> Copy
            </GreyBorderButton>
            <RiDeleteBin6Fill />
          </div>
        </div>

        <div className="newevent_btndiv">
          <GreyBorderButton
            onClick={() => {
              navigate(setSelectedButton(3));
            }}
          >
            Cancel
          </GreyBorderButton>

          <RedBackgroundButton
            onClick={() => {
              navigate(setSelectedButton(5));
            }}
          >
            Save
          </RedBackgroundButton>
        </div>
      </form>
    </div>
  );
};
