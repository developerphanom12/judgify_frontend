import React from "react";
import "./UserSubmissionDetails.scss";
import {
  GreyBackgroundButton,
  GreyBorderButton,
  RedBackgroundButton,
} from "../../Global/GlobalButton";
import { RedMainHeading } from "../../Global/GlobalText";
import {
  InputLabel,
  InputType,
  SelectBorder,
} from "../../Global/GlobalFormElement";
import { UserTopBanner } from "../../Global/User-Flow/UserTopBanner/UserTopBanner";
import { UserBottomBar } from "../../Global/User-Flow/UserBottomBar/UserBottomBar";

export const UserSubmissionDetails = () => {
  return (
    <>
      <UserTopBanner />

      <div className="submission_form_main">
        <div className="submission_form">
          <RedMainHeading>Submission Details</RedMainHeading>
        </div>

        <form className="submission_form_div">
          <div className="submission_form_row">
            <div className="submission_form_label">
              <InputLabel>Category</InputLabel>
              <SelectBorder>
                <option value="Lorem Ipsum">Lorem Ipsum</option>
                <option value="Lorem Ipsum">Lorem Ipsum</option>
                <option value="Lorem Ipsum">Lorem Ipsum</option>
                <option value="Lorem Ipsum">Lorem Ipsum</option>
              </SelectBorder>
            </div>

            <div className="submission_form_label">
              <InputLabel>
                Title of Entry <span style={{ color: "#c32728" }}>*</span>
              </InputLabel>
              <InputType placeholder="Enter Title " />
            </div>
          </div>

          <div className="submission_form_row">
            <div className="submission_form_label">
              <InputLabel>
                Endorsement Email<span style={{ color: "#c32728" }}>*</span>
              </InputLabel>
              <InputType placeholder="Enter Email Address" />
            </div>

            <div className="submission_form_label">
              <InputLabel>
                Name of Company Group{" "}
                <span style={{ color: "#c32728" }}>*</span>
              </InputLabel>
              <InputType placeholder="Enter Company Name  " />
            </div>
          </div>

          <div className="submission_form_row">
            <div className="submission_form_label">
              <InputLabel>
                Company Head Office Address{" "}
                <span style={{ color: "#c32728" }}>*</span>
              </InputLabel>
              <InputType placeholder="Enter Address" />
            </div>

            <div className="submission_form_label">
              <InputLabel>
                Contact person Name <span style={{ color: "#c32728" }}>*</span>
              </InputLabel>
              <InputType placeholder="Enter Name " />
            </div>
          </div>

          <div className="submission_form_row">
            <div className="submission_form_label">
              <InputLabel>
                Designation<span style={{ color: "#c32728" }}>*</span>
              </InputLabel>
              <InputType placeholder="Enter your Designation" />
            </div>

            <div className="submission_form_label">
              <InputLabel>
                Mobile Number <span style={{ color: "#c32728" }}>*</span>
              </InputLabel>
              <InputType placeholder="Enter Mobile No." />
            </div>
          </div>

          <div className="submission_form_row">
            <div className="submission_form_label">
              <InputLabel>
                Email<span style={{ color: "#c32728" }}>*</span>
              </InputLabel>
              <InputType placeholder="Enter your Email" />
            </div>

            <div className="submission_form_label">
              <InputLabel>
                Alternate Contact Name{" "}
                <span style={{ color: "#c32728" }}>*</span>
              </InputLabel>
              <InputType placeholder="Enter Name" />
            </div>
          </div>

          <div className="submission_form_row">
            <div className="submission_form_label">
              <InputLabel>
                Video Link 1:<span style={{ color: "#c32728" }}>*</span>
              </InputLabel>
              <InputType placeholder="Link" />
            </div>
          </div>
        </form>
      </div>

      <div className="submission_form_btn_div">
        <GreyBorderButton>Cancel</GreyBorderButton>
        <GreyBackgroundButton>Next</GreyBackgroundButton>
        <RedBackgroundButton>Save</RedBackgroundButton>
      </div>

      <UserBottomBar/>
    </>
  );
};
