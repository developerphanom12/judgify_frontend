import React, { useState } from "react";
import "./Forms.scss";
import { CreateButton, GreyBorderButton } from "../../../../Global/GlobalButton";
import { FormHeading, RegisterGreyHeading } from "../../../../Global/GlobalText";
import { TitleBar } from "../../../../Global/TitleBar/TitleBar";

export const Forms = () => {
  const [showFormOne, setShowFormOne] = useState(true);

  return (
    <div>
      <div className="dashboard_div">
        <TitleBar title="Forms" />
        <div className="dashboard_white_bg">
          {showFormOne && (
            <>
              <div className="forms_heading">
                <FormHeading>FORM NAME</FormHeading>
              </div>

              <div className="forms_div">
                <div className="forms_sub_div_one">
                  <RegisterGreyHeading style={{ fontWeight: 500 }}>
                    Registration Form
                  </RegisterGreyHeading>
                  <div>
                    <CreateButton
                      onClick={() => {
                        setShowFormOne(false); // Hide form_reg_one
                      }}
                    >
                      Customize
                    </CreateButton>
                  </div>
                </div>

                <div className="forms_sub_div_two">
                  <RegisterGreyHeading style={{ fontWeight: 500 }}>
                    Submission Form
                  </RegisterGreyHeading>
                  <div>
                    <CreateButton>Customize</CreateButton>
                  </div>
                </div>
              </div>
            </>
          )}

          {!showFormOne && (
            <>
              <div className="forms_heading">
                <FormHeading>Building: Registration Form</FormHeading>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <GreyBorderButton onClick={() => setShowFormOne(true)}>
                  Cancel
                </GreyBorderButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
