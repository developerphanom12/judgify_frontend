import React from "react";
import "./JuryRound.scss";
import { TitleBar } from "../../../../Global/TitleBar/TitleBar";
import { TopBar } from "../../../TopBar/TopBar";
import { CreateButton } from "../../../../Global/GlobalButton";
import {
  RedMainHeading,
  RegisterGreyHeading,
  StatusContent,
} from "../../../../Global/GlobalText";
import law from "../../../../../Assets/law.png";
import { useNavigate } from "react-router-dom";

export const JuryRound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="jury_round_div">
        <TitleBar title="Jury Round" />
        <div className="jury_round_white_bg">
          <TopBar titleheading="Jury Rounds"/>
          <div className="jury_round_btn">
            <CreateButton 
             onClick={() => {
              navigate("/create-jury-round-post");
            }}
            
            >Create New Round</CreateButton>
          </div>
          <div className="jury_round_heading">
            <RegisterGreyHeading style={{ fontSize: "16px", fontWeight: 500 }}>
              A Quick Guide To Jury Rounds
            </RegisterGreyHeading>
            <img src={law} alt="img" />
          </div>
          
          <div className="jury_round_parts">
            <div className="jury_round_sub_parts">
              <div  className="jury_num_div">
                <RedMainHeading style={{ fontSize: "24px" }} className="jury_round_number">1</RedMainHeading>
              </div>
              <div className="jury_round_heading" style={{ textAlign: "left" }}>
                <RedMainHeading style={{ fontSize: "14px" }}>
                  Jury Round
                </RedMainHeading>
                <StatusContent>
                  A Jury Round is a period of time during which judges score the
                  submissions that have been shortlisted for that round.
                </StatusContent>
                <StatusContent>
                  A Jury Round consists of the following:
                </StatusContent>
              </div>
            </div>

            <div className="jury_round_sub_parts">
              <div className="jury_num_div">
                <RedMainHeading style={{ fontSize: "24px" }} className="jury_round_number">2</RedMainHeading>
              </div>
              <div className="jury_round_heading" style={{ textAlign: "left" }}>
                <RedMainHeading style={{ fontSize: "14px" }}>
                  Scorecards
                </RedMainHeading>
                <StatusContent>
                  A scorecard contains the scoring criteria for scoring a
                  submission, e.g. Execution, Attention to detail, Concept, etc.
                </StatusContent>
                <StatusContent>
                  Scorecards are attached to 
                  <span style={{ fontWeight: 600 }}>Submission Categories</span>
                   & are  <span style={{ fontWeight: 600 }}>compulsory</span>in
                  order to make a Jury Round active.
                </StatusContent>
              </div>
            </div>
          </div>

          <div className="jury_round_parts">
            <div className="jury_round_sub_parts">
              <div  className="jury_num_div">
                <RedMainHeading style={{ fontSize: "24px" }} className="jury_round_number">3</RedMainHeading>
              </div>
              <div className="jury_round_heading" style={{ textAlign: "left" }}>
                <RedMainHeading style={{ fontSize: "14px" }}>
                  Shortlisted Submissions
                </RedMainHeading>
                <StatusContent>
                  By default, a round does not contain any submission.You select
                  and add submissions to a round by manually shortlisting them
                  for that round.
                </StatusContent>
                <StatusContent>
                  Shortlisting submissions for a round is{" "}
                  <span style={{ fontWeight: 600 }}>compulsory.</span>
                </StatusContent>
              </div>
            </div>
            <div className="jury_round_sub_parts">
              <div className="jury_num_div">
                <RedMainHeading style={{fontSize: "24px"}} className="jury_round_number">4</RedMainHeading>
              </div>
              <div className="jury_round_heading" style={{ textAlign: "left" }}>
                <RedMainHeading style={{ fontSize: "14px" }}>
                  Jury Groups
                </RedMainHeading>
                <StatusContent>
                  A Jury Group is a group of submissions which results from a
                  set of criteria. E.g. you can create a Filtered Group called
                 <span style={{ fontWeight: 600 }}>"Cat A Singapore"</span> which consists of submissions from    <span style={{ fontWeight: 600 }}>Category
                  A</span> and which are from <span style={{ fontWeight: 600 }}>Singapore</span>
                </StatusContent>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
