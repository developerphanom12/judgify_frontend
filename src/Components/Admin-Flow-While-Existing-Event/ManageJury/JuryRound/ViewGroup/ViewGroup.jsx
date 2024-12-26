import React, { useState } from "react";
import "./ViewGroup.scss";
import { TitleBar } from "../../../../Global/TitleBar/TitleBar";
import { TopBar } from "../../../TopBar/TopBar";
import {
  GreyBorderButton,
  RedBackgroundButton,
} from "../../../../Global/GlobalButton";
import { useNavigate } from "react-router-dom";
import { GlobalSecondTable } from "../../../../Global/GlobalSecondTable/GlobalSecondTable";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import { FaArrowRotateLeft } from "react-icons/fa6";

export const ViewGroup = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const columns = [
    "Jury Group Name",
    "Formula",
    "Actions",
  ];

  const data = [
    {
      "Jury Group Name": "All Shortlisted Entry Form",
      "Formula": "(1)",
      "Actions":  (
        <>
        <FaArrowRotateLeft style={{color:"#0FA0F1", cursor:"pointer"}}/>
        < MdEditSquare style={{color:"#0FA0F1",  cursor:"pointer"}}/>
        <RiDeleteBin6Fill style={{color:"#C32728",  cursor:"pointer"}}/>
        </>
        )
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

  return (
    <div>
      <div className="jury_existing_data_div">
        <TitleBar title="Jury Round" />
        <div className="jury_existing_data_white_bg">
          <TopBar titleheading="Jury Group(s) for Round 1"/>
                <GlobalSecondTable
                data={data}
                columns={columns}
                selectedRows={selectedRows} //Ensure this is always an array
                onCheckboxChange={handleCheckboxChange}
                onRowClick={setSelectedRow}
              />
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
