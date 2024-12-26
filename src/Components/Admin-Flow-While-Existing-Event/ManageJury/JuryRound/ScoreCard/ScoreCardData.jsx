


import React, { useState } from "react";
import "../CreateJuryRound/CreateJuryRoundPost.scss";
import { IoMdAddCircleOutline, IoMdInformationCircle } from "react-icons/io";
import TimePicker from "react-time-picker";
import { useNavigate } from "react-router-dom";
import { TitleBar } from "../../../../Global/TitleBar/TitleBar";
import { TopBar } from "../../../TopBar/TopBar";
import {
  CheckboxInput,
  CheckLabel,
  InputLabel,
  InputType,
} from "../../../../Global/GlobalFormElement";
import {
  GreyBorderButton,
  RedBackgroundButton,
  RedBordButton,
} from "../../../../Global/GlobalButton";
import { RedMainHeading } from "../../../../Global/GlobalText";
import { MdEditSquare, MdOutlineSettings } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MultiSelect } from "react-multi-select-component";
import { IoCopy } from "react-icons/io5";

const ScoreCardData = () => {
     const [selected, setSelected] = useState([]);
      const [isShowDivVisible, setIsShowDivVisible] = useState(false);
      const [filters, setFilters] = useState([{ id: 1 }]);

      const navigate = useNavigate();
    const addFilter = () => {
        setFilters([...filters, { id: filters.length + 1 }]);
      };
    
      const handleRemoveFilter = (id) => {
        setFilters(filters.filter((filter) => filter.id !== id));
      };
      
      const toggleShowDiv = () => {
        setIsShowDivVisible((prev) => !prev);
      };

      const options = [
        { label: "BEST B2B ECOMMERCE", value: "grapes" },
        { label: "BEST DIGITAL AGENCY OF THE YEAR", value: "mango" },
        { label: "BEST ECOMMERCE TECHNOLOGY INNOVATION", value: "strawberry" },
        {
          label: "BEST INNOVATION IN ECOMMERCE DELIVERY/LOGISTICS",
          value: "strawberry",
        },
      ];
  return (
    <div className="create_jury_content_two">
    {isShowDivVisible && (
      <>
        <div className="create_jury_heading">
          <RedMainHeading>Scorecard 1</RedMainHeading>
        </div>

        <div className="create_jury_select_div">
          <InputLabel>Scorecard criteria</InputLabel>

          <div className="create_jury_criteria">
            <div className="create_jury_sub_criteria">
              <div className="create_jury_subb">
                <CheckLabel>Criteria #</CheckLabel>
              </div>
              <CheckLabel>
                Criteria title{" "}
                <span style={{ color: "#C32728" }}> * </span>
              </CheckLabel>
            </div>

            <div className="create_jury_sub_criteria">
              <CheckLabel>
                Criteria description{" "}
                <span style={{ color: "#C32728" }}>*</span>
              </CheckLabel>
            </div>
          </div>

          {filters.map((filter, index) => (
            <div key={filter.id} className="create_jury_criteria">
              <div className="create_jury_sub_criteria">
                <div className="create_jury_subb">
                  <CheckLabel className="create_jury_input">
                    {index + 1}
                  </CheckLabel>
                </div>
                <InputType type="text" />
              </div>

              <div
                className="create_jury_sub_criteria"
                style={{ cursor: "pointer" }}
              >
                <InputType type="text" />
                <MdOutlineSettings />
                <RiDeleteBin6Fill
                  onClick={() => handleRemoveFilter(filter.id)}
                />
              </div>
            </div>
          ))}
          <div>
            <RedBordButton
              className="create_jury_pluscontent"
              onClick={addFilter}
            >
              <IoMdAddCircleOutline />
              Add Score Criteria
            </RedBordButton>
          </div>
        </div>

        <div className="create_jury_select_div">
          <div className="create_jury_overall">
            <div className="create_juryoverall_head">
              <InputLabel> Overall Scorecard Value </InputLabel>
              <CheckLabel>
                This is the calculated overall Scorecard value of
                a submission
              </CheckLabel>
            </div>
            <InputType type="text" />
          </div>

          <div className="create_jury_overall">
            <InputLabel>
              Use this scorecard for the following Categories
            </InputLabel>
            <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
            />
          </div>
        </div>
      </>
    )}

    <div className="create_jury_get_div">
      <div className="create_jury_heading">
        <RedMainHeading>Scorecard 1</RedMainHeading>
      </div>

      <div className="create_jury_gettwo_main">
        <div className="create_jury_gettwo_div">
          <CheckLabel>BEST B2B ECOMMERCE</CheckLabel>
          <CheckLabel>BEST DIGITAL AGENCY OF THE YEAR</CheckLabel>
          <CheckLabel>
            BEST ECOMMERCE TECHNOLOGY INNOVATION
          </CheckLabel>
          <CheckLabel>BEST INNOVATION IN ECOMMERCE</CheckLabel>
          <CheckLabel>
            BEST INNOVATION IN ECOMMERCE DELIVERY/LOGISTICS
          </CheckLabel>
          <CheckLabel>EXCELLENCE IN APPLICATION OF AI</CheckLabel>
          <CheckLabel>
            EXCELLENCE IN AUTOMOBILE ECOMMERCE
          </CheckLabel>
        </div>

        <div className="create_jury_gettwo_sub">
          <MdEditSquare onClick={toggleShowDiv} />
          <IoCopy />
          <RiDeleteBin6Fill />
        </div>
      </div>

      <div className="create_jury_getthree_div">
        <CheckLabel>1 Concept-min:0 | max:10 </CheckLabel>
        <CheckLabel>2 Execution- min:0 | max:10 </CheckLabel>
        <CheckLabel>3 Strategy- min:0 | max:10 </CheckLabel>
        <CheckLabel>4 BEST INNOVATION IN ECOMMERCE</CheckLabel>
      </div>
    </div>

    <div className="create_jury_btndiv">
      <GreyBorderButton
        onClick={() => {
          navigate("/jury-round-data");
        }}
      >
        Back to Jury Rounds
      </GreyBorderButton>

      {isShowDivVisible && (
        <RedBackgroundButton
          onClick={() => {
            navigate(`/successfully-created-judge-round`);
          }}
        >
          {" "}
          Update{" "}
        </RedBackgroundButton>
      )}
    </div>
  </div>
  )
}

export default ScoreCardData

