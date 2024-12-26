import React from "react";
import "./UserPendingPayment.scss";
import { UserTitlebar } from "../../Global/User-Flow/UserTitleBar/UserTitleBar";
import {
  GreenDescription,
  PaymentPendingHeading,
  RegisterGreyHeading,
} from "../../Global/GlobalText";
import {
  CheckboxInput,
  CheckboxLabel,
  InputLabel,
  InputType,
} from "../../Global/GlobalFormElement";
import {
  GreenBackgroundButton,
  GreyBorderButton,
  RedBackgroundButton,
} from "../../Global/GlobalButton";
import { RiDeleteBin6Fill } from "react-icons/ri";

export const UserPendingPayment = () => {
  return (
    <>
      <div className="user_pending_div">
        <UserTitlebar title="Pending Payment"   userDetailsColor="#333333"/>
        <div className="user_pending_bg">
          <div className="payment_heading">
            <PaymentPendingHeading>Payment Pending</PaymentPendingHeading>
          </div>

          <div className="user_pending_categories">
            <InputLabel style={{ fontWeight: 500 }}>
              Select Categories
            </InputLabel>
            <InputType placeholder="Enter TitleRetailME Awards KSA 2023 - Celebrating Retail Excellence" />
          </div>

          <div className="user_pending_table">
     
            <table>
              <tr>
                <th>Category Name</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Subtotal</th>
             
              </tr>
              <tr>
                <td>RetailME Awards KSA 2023 -
                Celebrating Retail Excellence</td>
                <td>$799</td>
                <td>$799</td>
                <td><RiDeleteBin6Fill style={{color:"#C32728", cursor:"pointer"}} />
                </td>
              
              </tr>
          
            </table>

            <div className="user_pending_button">
              <InputType placeholder="Coupon Code" />
              <GreenBackgroundButton>Apply Coupon</GreenBackgroundButton>
              <GreyBorderButton>Update Cart</GreyBorderButton>
            </div>
          </div>

          <div className="user_main_card_div">
            <div className="user_card_check">
              <div className="user_card_div">
                <RegisterGreyHeading>Cart Total</RegisterGreyHeading>
                <div className="user_pending_amount">
                  <div className="user_amount_sub">
                    <InputLabel>Select Categories</InputLabel>

                    <InputLabel>$799</InputLabel>
                  </div>
                  <hr className="user_pending_line" />
                  <div className="user_amount_sub">
                    <GreenDescription
                      style={{ fontWeight: 400, fontSize: "14px" }}
                    >
                      Applied Discount Coupon
                    </GreenDescription>
                    <GreenDescription
                      style={{ fontWeight: 400, fontSize: "14px" }}
                    >
                      -$100
                    </GreenDescription>
                  </div>
                  <hr className="user_pending_line" />

                  <div className="user_amount_sub">
                    <InputLabel style={{ fontWeight: 500 }}>Total:</InputLabel>
                    <InputLabel style={{ fontWeight: 500 }}>$699</InputLabel>
                  </div>
                </div>
              </div>

              <div className="user_pending_checkbox">
                <CheckboxInput type="checkbox" />
                <CheckboxLabel>I agree to Pay amount</CheckboxLabel>
              </div>
            </div>

            <div className="user_card_form">
              <div className="user_card_form_label">
                <InputLabel>
                  Company Name <span style={{ color: "#c32728" }}>*</span>
                </InputLabel>
                <InputType placeholder="Enter Your Company Name" />
              </div>

              <div className="user_card_form_label">
                <InputLabel>
                  GST Number <span style={{ color: "#c32728" }}>*</span>
                </InputLabel>
                <InputType placeholder="Enter GST No." />
              </div>

              <div className="user_card_form_btn">
                <RedBackgroundButton>Proceeds to checkout</RedBackgroundButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
