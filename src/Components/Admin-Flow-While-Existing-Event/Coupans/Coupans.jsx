import React from "react";
import "./Coupans.scss";
import { TitleBar } from "../../Global/TitleBar/TitleBar";
import {
  InputLabel,
  InputType,
  SelectBorder,
} from "../../Global/GlobalFormElement";
import { RedBackgroundButton } from "../../Global/GlobalButton";
import { TopBar } from "../TopBar/TopBar";

export const Coupans = () => {
  return (
    <div>
      <div className="coupans_div">
        <TitleBar title="Coupons"/>
      
        <div className="coupans_white_bg">
            <TopBar titleheading="Coupons"/>
          <form className="coupan_form">
            <div className="coupans_row">
              <div className="coupans_label_lg">
                <div className="coupans_label_cont">
                  <InputLabel>
                    Select Categories{" "}
                    <span style={{ color: "#c32728" }}>*</span>
                  </InputLabel>
                </div>

                <SelectBorder name="industry_type">
                  <option value="">Lorem Ipsum</option>
                  <option value="Fashion">Lorem Ipsum</option>
                  <option value="Skin Care">Lorem Ipsum</option>
                  <option value="Beauty">Lorem Ipsum</option>
                </SelectBorder>
              </div>
              <div className="coupans_label_lg">
                <div className="coupans_label_cont">
                  <InputLabel>
                    Coupon Name <span style={{ color: "#c32728" }}>*</span>
                  </InputLabel>
                </div>
                <InputType type="number" placeholder="Enter Coupon Name" />
              </div>
            </div>

            <div className="coupans_row">
              <div className="coupans_label_lg">
                <div className="coupans_label_cont">
                  <InputLabel>
                    Coupon Code <span style={{ color: "#c32728" }}>*</span>
                  </InputLabel>
                </div>
                <InputType type="number" placeholder="Coupon Code" />
              </div>

              <div className="coupans_label_lg">
                <div className="coupans_label_cont">
                  <InputLabel>
                    Coupon Amount <span style={{ color: "#c32728" }}>*</span>
                  </InputLabel>
                </div>
                <div className="coupan_select_input">
                  <SelectBorder name="industry_type">
                    <option value="">Percentages(%)</option>
                    <option value="Fashion">20%</option>
                    <option value="Skin Care">30%</option>
                    <option value="Beauty">40%</option>
                  </SelectBorder>

                  <InputType type="number" placeholder="Enter Amount" />
                </div>
              </div>
            </div>

            <div className="coupans_row">
              <div className="coupans_label_lg">
                <div className="coupans_label_cont">
                  <InputLabel>
                    Start Date <span style={{ color: "#c32728" }}>*</span>
                  </InputLabel>
                </div>
                <InputType type="date" placeholder="Select Date" />
              </div>

              <div className="coupans_label_lg">
                <div className="coupans_label_cont">
                  <InputLabel>
                    End Date <span style={{ color: "#c32728" }}>*</span>
                  </InputLabel>
                </div>
                <InputType type="date" placeholder="Select Date" />
              </div>
            </div>

            <div className="coupans_btndiv">
              <RedBackgroundButton>Submit</RedBackgroundButton>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
