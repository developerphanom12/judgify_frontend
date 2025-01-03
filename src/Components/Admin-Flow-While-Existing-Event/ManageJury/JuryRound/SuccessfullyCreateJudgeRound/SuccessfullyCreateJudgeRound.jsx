import React from "react";
import "./SuccessfullyCreateJudgeRound.scss";
import { TitleBar } from "../../../../Global/TitleBar/TitleBar";
import { TopBar } from "../../../TopBar/TopBar";
import { SubHeading } from "../../../../Global/GlobalText";
import { CheckLabel } from "../../../../Global/GlobalFormElement";
import { CreateButton, GreylessradiusButton } from "../../../../Global/GlobalButton";
import { useNavigate } from "react-router-dom";

export const SuccessfullyCreateJudgeRound = () => {
    const navigate = useNavigate();
  return (
    <div>
      <div className="create-jury-round_div">
        <TitleBar title="Jury Round" />

        <div className="create-jury-round_white_bg">
          <TopBar titleheading="Jury Rounds" />
          <div className="createjury_round_comfirm">
            <SubHeading>
              {" "}
              You have successfully created Jury Round 1{" "}
            </SubHeading>
            <CheckLabel>
              Do you want to create your Scorecard(s) for this round now?
            </CheckLabel>

            <div className="jury_round_comfirm">
              <GreylessradiusButton  onClick={ () => {
                navigate(`/jury-round-data`)
              }}>
                No, create Scorecards later
              </GreylessradiusButton>
              <CreateButton  onClick={ () => {
                navigate(`/create-jury-round`)
              }}>
                Yes, create Scorecard(s) now
              </CreateButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
