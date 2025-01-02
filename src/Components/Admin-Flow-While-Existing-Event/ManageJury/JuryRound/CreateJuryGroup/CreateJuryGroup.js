import React, { useState } from "react";
import "./CreateJuryGroup.scss";
import { TitleBar } from "../../../../Global/TitleBar/TitleBar";
import { TopBar } from "../../../TopBar/TopBar";
import {
    GreyBackgroundButton,
  GreyBorderButton,
  RedBackgroundButton,
} from "../../../../Global/GlobalButton";
import { useNavigate } from "react-router-dom";

export const CreateJuryGroup = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="jury_existing_data_div">
        <TitleBar title="Jury Round" />
        <div className="jury_existing_data_white_bg">
          <TopBar titleheading="Create A Jury Group For Selected Round"/>
            <div className="judging-group-main-div">
            <div className="judging-group-name-header">
                Hello Brooo
                </div>
            </div>
          <div className="shortlist_butt">
            <GreyBorderButton
              onClick={() => {
                navigate("/jury-round-data");
              }}
            >
              Back to Jury Rounds
            </GreyBorderButton>

            <RedBackgroundButton
                       >
                       Create
                     </RedBackgroundButton>
                     <GreyBackgroundButton 
                     >Create & Add New
                     </GreyBackgroundButton>
          </div>

 
        </div>
      </div>
    </div>
  );
};
