import React, { useState } from "react";
import "./CreateJuryGroup.scss";
import { TitleBar } from "../../../../Global/TitleBar/TitleBar";
import { TopBar } from "../../../TopBar/TopBar";
import {
  GreyBackgroundButton,
  GreyBorderButton,
  RedBackgroundButton,
  RedBordButton,
} from "../../../../Global/GlobalButton";
import { useNavigate } from "react-router-dom";
import {
  InputLabel,
  InputType,
  SelectBorder,
} from "../../../../Global/GlobalFormElement";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Description, RedContent } from "../../../../Global/GlobalText";

export const CreateJuryGroup = () => {
  const [filters, setFilters] = useState([{ id: 1 }]);

  const addFilter = () => {
    setFilters([...filters, { id: filters.length + 1 }]);
  };

  const handleRemoveFilter = (id) => {
    setFilters(filters.filter((filter) => filter.id !== id));
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="create_jury_group_data_div">
        <TitleBar title="Jury Round" />
        <div className="create_jury_group_data_white_bg">
          <TopBar titleheading="Create a Jury Group for Round 1" />

          <div className="create_jury_group_column width_column">
            <InputLabel>Jury Group Name:</InputLabel>
            <InputType type="text" placeholder="G6" />
          </div>

          <div className="create_jury_group_column">
            <InputLabel>Filtering Criteria:</InputLabel>

            {filters.map((filter, index) => (
              <div key={filter.id} className="create_jury_group_select">
                <Description>{index + 1}</Description>
                <SelectBorder
                  style={{ color: "#777777" }}
                  className="group_select_one"
                >
                  <option value="newest">Award Category</option>
                  <option value="oldest">Award Category</option>
                </SelectBorder>

                <SelectBorder
                  style={{ color: "#777777" }}
                  className="group_select_two"
                >
                  <option value="newest">Is</option>
                  <option value="oldest">Is</option>
                </SelectBorder>

                <SelectBorder
                  style={{ color: "#777777" }}
                  className="group_select_one"
                >
                  <option value="newest">Choose a Category</option>
                  <option value="oldest">Choose a Category</option>
                </SelectBorder>

                <RiDeleteBin6Fill
                  className="create_jury_group_remove"
                  onClick={() => handleRemoveFilter(filter.id)}
                />
              </div>
            ))}

            <div className="create_jury_group_btn">
              <RedBordButton
                className="create_jury_group_pluscontent"
                onClick={addFilter}
              >
                <IoMdAddCircleOutline />
                Add a Filtering Criteria
              </RedBordButton>
            </div>
          </div>

          <div className="create_jury_group_column">
            <InputLabel>Filtering Criteria Pattern:</InputLabel>
            <InputType type="text" placeholder="(1) AND (2)" />
          </div>

          <div className="create_jury_group_column">
            <InputLabel>Pattern Suggestion:</InputLabel>

            <div className="create_jury_group_pattern">
              <div className="create_jury_group_pattern_sub">
                <Description>(1) OR (2)</Description>{" "}
                <RedContent style={{ cursor: "pointer" }}>Use</RedContent>
              </div>
              <div className="create_jury_group_pattern_sub">
                <Description>(1) AND (2) </Description>{" "}
                <RedContent style={{ cursor: "pointer" }}>Use</RedContent>
              </div>
            </div>
          </div>

          <div className="shortlist_butt">
            <GreyBorderButton
              onClick={() => {
                navigate("/jury-round");
              }}
            >
              Back to Jury Group(s) Listing
            </GreyBorderButton>

            <RedBackgroundButton>Save & Add New</RedBackgroundButton>

            <GreyBackgroundButton onClick={() => {
                navigate("/view-group");
              }}>Save</GreyBackgroundButton>
          </div>
        </div>
      </div>
    </div>
  );
};
