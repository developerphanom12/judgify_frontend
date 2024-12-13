import React, { useState } from "react";
import { JuryRound, RedMainHeading } from "../../../../Global/GlobalText";
import { IoSearchSharp } from "react-icons/io5";
import { LuFilter } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "./ShortListEntryForm.scss";
import { GreyBorderButton, GreyfilterButton, RedBackgroundButton } from "../../../../Global/GlobalButton";
import { GlobalSecondTable } from "../../../../Global/GlobalSecondTable/GlobalSecondTable";
import { TitleBar } from "../../../../Global/TitleBar/TitleBar";
import { TopBar } from "../../../TopBar/TopBar";

export const ShortListEntryForm = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedButton, setSelectedButton] = useState(0);

  const navigate = useNavigate();

  const columns = [
    "Submission ID",
    "Category",
    "Title",
    "Short List ID",
    "Shortlist For",
    "Overall Score",
  ];

  const data = [
    {
      "Submission ID": "IBA-2101",
      Category: "EXCELLENCE IN FASHION ECOMMERCE",
      Title: "EXCELLENCE IN FASHION ECOMMERCE",
      "Short List ID": "",
      "Shortlist For": "Round 1",
      "Overall Score": "71.00",
    },

    {
      "Submission ID": "IBA-2101",
      Category: "EXCELLENCE IN FASHION ECOMMERCE",
      Title: "EXCELLENCE IN FASHION ECOMMERCE",
      "Short List ID": "",
      "Shortlist For": "Round 1",
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

  const handleClick = (index) => {
    setSelectedButton(index);
  };

  return (
    <div>
      <div className="shortlistentry_data_div">
        <TitleBar title="Jury Round" />
        <div className="shortlistentry_data_white_bg">
          <TopBar titleheading="Shortlist Entry Form for Round 1"/>
          <div className="shortlistentry_submission_div">
            <div
              className="shortlistentry_sub_submission"
        
            style={{ backgroundColor: selectedButton === 0 ? "#FFE2E5" : "#F6F8F9" }}
            onClick={() => handleClick(0)}
            >
              <RedMainHeading>Viewing: 5 submissions</RedMainHeading>
              <JuryRound>Select all submissions</JuryRound>
            </div>

            <div
              className="shortlistentry_sub_submission"
              style={{ backgroundColor: selectedButton === 1 ? "#FFE2E5" : "#F6F8F9" }}
            onClick={() => handleClick(1)}
            >
              <RedMainHeading>Selected: 0 submissions</RedMainHeading>
              <JuryRound>Deselect all selected submissions</JuryRound>
            </div>
          </div>

          <div className="shortlistentry__table_div">
            <div className="shortlistentry__table_search">
              <div className="shortlistentry__table_icon">
                <IoSearchSharp />
              </div>
              <div className="shortlistentry__table_icon_content">
                <input
                  type="text"
                  placeholder="Start typying  to filter grid"
                />
              </div>
            </div>

            <GreyfilterButton className="shortlistentry__filter_icon">
              <LuFilter />
              Filter
            </GreyfilterButton>
          </div>

          {selectedButton === 0 && (
            <>
              <GlobalSecondTable
                data={data}
                columns={columns}
                selectedRows={selectedRows} // Ensure this is always an array
                onCheckboxChange={handleCheckboxChange}
                onRowClick={setSelectedRow}
              />
            </>
          )}

          {selectedButton === 1 && (
            <>
              <GlobalSecondTable
                data={data}
                columns={columns}
                selectedRows={selectedRows} // Ensure this is always an array
                onCheckboxChange={handleCheckboxChange}
                onRowClick={setSelectedRow}
              />
            </>
          )}

          <div className="shortlist_butt">
            <GreyBorderButton
              onClick={() => {
                navigate("/jury-round-data");
              }}
            >
              Back to Jury Rounds
            </GreyBorderButton>

            <RedBackgroundButton
              onClick={() => {
                navigate("/jury-round-data");
              }}
            >
              Shortlist Selected Entry Form
            </RedBackgroundButton>
          </div>

        </div>
      </div>
    </div>
  );
};
