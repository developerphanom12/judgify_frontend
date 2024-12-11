import React, { useState } from "react";
import "./JuryRoundExistingData.scss";
import { TitleBar } from "../../../../Global/TitleBar/TitleBar";
import { TopBar } from "../../../TopBar/TopBar";
import { CreateButton, GreyfilterButton } from "../../../../Global/GlobalButton";
import { MdEditSquare, MdOutlineRefresh, MdOutlineSettings } from "react-icons/md";
import {
  DescriptionContent,
  EventHeading,
  GreenContent,
  JuryRound,
  RedContent,
  RedMainHeading,
} from "../../../../Global/GlobalText";
import { HiOutlineRefresh } from "react-icons/hi";
import { PiPlusCircleBold } from "react-icons/pi";
import { IoMdCheckmark } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { LuFilter } from "react-icons/lu";
import { GlobalSecondTable } from "../../../../Global/GlobalSecondTable/GlobalSecondTable";
import { useNavigate } from "react-router-dom";

export const JuryRoundExistingData = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const columns = [
    "Submission ID",
    "Category",
    "Title",
    "Short List ID",
    "Overall Score",
  ];

  const data = [
    {
      "Submission ID": "IBA-2101",
      Category: "EXCELLENCE IN FASHION ECOMMERCE",
      Title: "EXCELLENCE IN FASHION ECOMMERCE",
      "Short List ID": "",
      "Overall Score": "71.00",
    },

    {
      "Submission ID": "IBA-2101",
      Category: "EXCELLENCE IN FASHION ECOMMERCE",
      Title: "EXCELLENCE IN FASHION ECOMMERCE",
      "Short List ID": "",
      "Overall Score": "71.00",
    },
  ];

  const handleCheckboxChange = (rowIndex, isChecked) => {
    setSelectedRows((prevSelected) => {
      console.log("Previous Selected Rows:", prevSelected);
      return isChecked
        ? [...prevSelected, rowIndex] // Add index
        : prevSelected.filter((index) => index !== rowIndex); // Remove index
    });
  };
  const setSelectedRow = (row) => {
    console.log("Selected row:", row); // You can replace this with your desired logic
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="jury_existing_data_div">
        <TitleBar title="Jury Round"/>
        <div className="jury_existing_data_white_bg">
          <TopBar titleheading="Jury Rounds"/>
          <div className="jury_existing_data_btn">
            <CreateButton  onClick={() => {
              navigate("/create-jury-round");
            }}>
              Round 1 <MdEditSquare />{" "}
            </CreateButton>
            <GreenContent>Active</GreenContent>
          </div>

          <div className="jury_existing_date_div">
            <DescriptionContent>
              From 24 Aug 2023 10:30 to 01 Sep 2023 10:30
            </DescriptionContent>
            <div className="jury_existing_scorecard">
              <RedContent>Scorecards(1)</RedContent>

              <GreenContent className="jury_existing_plus_icon" onClick={() => {
              navigate("/shortlist-entry-form");
            }}>
                <PiPlusCircleBold  />
                Shortlist Entry Form
              </GreenContent>
            </div>
          </div>

          <div className="jury_existing_select">
            <div className="jury_existing_select_heading">
              <EventHeading>
                Want to group your submissions based on specific criteria?
              </EventHeading>
            </div>
            <div className="jury_existing_select_btn">
              <EventHeading>
                Want to group your submissions based on specific criteria?
              </EventHeading>

              <div className="jury_existing_btn_div">
                <RedContent className="jury_existing_icon">
                  <PiPlusCircleBold/>
                  Create New Jury Group(s)
                </RedContent>

                <RedContent className="jury_existing_icon" onClick={() => {
              navigate("/view-group");
            }}>
                <MdOutlineSettings />
                    View Jury Group(s)
                </RedContent>
              </div>
            </div>
          </div>

          <div className="jury_existing_icon_content">
            <div
              className="jury_existing_sub_icon"
              style={{ color: "#777777" }}
            >
              <MdOutlineRefresh/>
              <DescriptionContent e={{ color: "#777777" }}>
                Generate Shortlist ID{" "}
              </DescriptionContent>

            </div>

            <div
              className="jury_existing_sub_icon"
              style={{ color: "#0FA0F1" }}
            >
              <HiOutlineRefresh />

              <DescriptionContent style={{ color: "#0FA0F1" }}>
                Swap Shortlist ID{" "}
              </DescriptionContent>
            </div>

            <div
              className="jury_existing_sub_icon"
              style={{ color: "#C32728" }}
            >
              <RiDeleteBin6Fill />
              <DescriptionContent style={{ color: "#C32728" }}>
                Remove{" "}
              </DescriptionContent>
            </div>

            <div
              className="jury_existing_sub_icon"
              style={{ color: "#00AC4F" }}
            >
              <IoMdCheckmark />

              <DescriptionContent style={{ color: "#00AC4F" }}>
                Force Refresh{" "}
              </DescriptionContent>
            </div>
          </div>

          <div className="jury_existing_submission_div">
            <div
              className="jury_existing_sub_submission"
              style={{ backgroundColor: "#FFE2E5" }}
            >
              <RedMainHeading>Viewing: 5 submissions</RedMainHeading>
              <JuryRound>Select all submissions</JuryRound>
            </div>

            <div
              className="jury_existing_sub_submission"
              style={{ backgroundColor: "#F6F8F9" }}
            >
              <RedMainHeading>Selected: 0 submissions</RedMainHeading>
              <JuryRound>Deselect all selected submissions</JuryRound>
            </div>
          </div>

          <div className="jury_existing__table_div">
            <div className="jury_existing__table_search">
              <div className="jury_existing__table_icon">
                <IoSearchSharp />
              </div>
              <div className="jury_existing__table_icon_content">
                <input
                  type="text"
                  placeholder="Start typying  to filter grid"
                />
              </div>
            </div>

            <GreyfilterButton className="jury_existing__filter_icon">
              <LuFilter />
              Filter
            </GreyfilterButton>
          </div>

          <GlobalSecondTable
            data={data}
            columns={columns}
            selectedRows={selectedRows} // Ensure this is always an array
            onCheckboxChange={handleCheckboxChange}
            onRowClick={setSelectedRow}
          />
        </div>
      </div>
    </div>
  );
};
