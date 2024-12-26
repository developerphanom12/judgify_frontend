import React from "react";
import "./StripeSetting.scss";
import { TitleBar } from "../../../Global/TitleBar/TitleBar";
import { InputLabel } from "../../../Global/GlobalFormElement";
import { Description, StripeHeading } from "../../../Global/GlobalText";
import stripe from "../../../../Assets/stripe.png";
import { useNavigate } from "react-router-dom";

export const StripeSetting = () => {
    const navigate = useNavigate();
  return (
    <div>
      <div className="stripe_div">
        <TitleBar title="Stripe Setting" />
        <div className="stripe_bg">
          <div className="btn_radio">
            <StripeHeading>Stripe details</StripeHeading>

            <div className="radio_btn">
              <InputLabel>
              Plan  <span style={{ color: "#c32728" }}>*</span>
              </InputLabel>
              <input type="radio" id="changeColor" name="radio" value="GFG"  onClick={() => {
                navigate("/create-new-event");
              }}/>
              <Description>Free</Description>
              <input
                type="radio"
                id="changeColor"
                name="radio"
                value="GFG"
                defaultChecked
              />
              <Description>Paid</Description>
            </div>
          </div>
          <div className="stripe_img">
            <img src={stripe} alt="stripe_img" className="stripe_img" />
          </div>
        </div>
      </div>
    </div>
  );
};
