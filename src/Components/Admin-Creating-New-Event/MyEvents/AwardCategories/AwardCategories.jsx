import React, { useState } from "react";
import { Description, SubHeading } from "../../../Global/GlobalText";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
  CreateButton,
  GreyBorderButton,
  GreyfilterButton,
  RedBackgroundButton,
  ViewMoreButton,
} from "../../../Global/GlobalButton";
import "./AwardCategories.scss";
import Modal from "react-bootstrap/Modal";
import {
  CheckboxInput,
  InputLabel,
  InputType,
  SelectBorder,
} from "../../../Global/GlobalFormElement";
import { IoSearchSharp } from "react-icons/io5";
import { LuFilter } from "react-icons/lu";
import { GlobalTable } from "../../../Global/GlobalTable/GlobalTable";
import { useNavigate } from "react-router-dom";

export const AwardCategories = () => {
  const [show, setShow] = useState(false);
  const [showTableDiv, setShowTableDiv] = useState(false); // To control table visibility
  const [showAwardCateDiv, setShowAwardCateDiv] = useState(true); // New state to control award_cate_div visibility
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    "Category Name",
    "Prefix for Submission",
    "Grouping Title",
    "Limit Submission",
    "Closing Date",
    "Actions",
  ];

  const data = [
    {
      "Category Name": "Abc",
      "Prefix for Submission": "ABC",
      "Grouping Title": "#WE234343",
      "Limit Submission": "10",
      "Closing Date": "25 Sep 2024",
      Actions: "Edit",
    },
    {
      "Category Name": "Abc",
      "Prefix for Submission": "ABC",
      "Grouping Title": "#WE234343",
      "Limit Submission": "10",
      "Closing Date": "25 Sep 2024",
      Actions: "Edit",
    },
  ];
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSaveClose = () => {
    setShow(false); // Hide the modal
    setShowTableDiv(true); // Show the table div
    setShowAwardCateDiv(false); // Hide the award_cate_div
  };

  return (
    <>
      {/* Conditionally render award_cate_div based on showAwardCateDiv */}
      {showAwardCateDiv && (
        <div className="award_cate_div">
          <CreateButton className="award_content" onClick={handleShow}>
            <IoMdAddCircleOutline />
            Create Award Category 
          </CreateButton>

          <div className="desc_div">
            <Description>
              Award Categories are selected by the entrants before they submit
              their works.
            </Description>
            <Description>
              {" "}
              Creating Award Categories is a must for you to live your event.
            </Description>
          </div>
        </div>
      )}

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mod_cont">
            <div className="mod_heading">
              <SubHeading>Award Categories</SubHeading>
            </div>
            <form className="award_form">
              <div className="award_row">
                <InputLabel>
                  Category Name <span style={{ color: "#c32728" }}>*</span>
                </InputLabel>
                <InputType placeholder="Enter Category Name" />
              </div>

              <div className="award_row">
                <InputLabel>
                  Category Prefix <span style={{ color: "#c32728" }}>*</span>
                </InputLabel>
                <InputType placeholder="Enter Category Prefix" />
              </div>

              <div className="award_row">
                <InputLabel>
                  Belongs to a Group <span style={{ color: "#c32728" }}>*</span>
                </InputLabel>
                <InputType placeholder="Enter Group" />
              </div>

              <div className="award_row">
                <InputLabel>
                  Limit Number of Submissions
                  <span style={{ color: "#c32728" }}>*</span>
                </InputLabel>
                <InputType placeholder="Enter Limit Number" />
              </div>

              <div className="award_row">
                <div className="award_label">
                  <div className="award_check">
                    <CheckboxInput type="checkbox" />
                    <InputLabel>Require Start Date</InputLabel>
                  </div>

                  <div className="award_check">
                    <CheckboxInput type="checkbox" />
                    <InputLabel>Require End Date</InputLabel>
                  </div>
                </div>
              </div>

              <div className="award_row">
                <div className="award_label">
                  <div className="award_check">
                    <CheckboxInput type="checkbox" />
                    <InputLabel>Require Start Date</InputLabel>
                  </div>
                </div>
              </div>

              <div className="award_btn">
                <GreyBorderButton>Save & Add New</GreyBorderButton>
                <div className="award_modal_close" onClick={handleSaveClose}>
                  Save & Close
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      {/* Conditionally render the table div when the state showTableDiv is true */}

      {showTableDiv && (
        <div className="table_div">
          <div className="award_table_div">
            <div className="award_table_search">
              <div className="award_table_icon">
                <IoSearchSharp />
              </div>
              <div className="award_table_icon_content">
                <input type="text" placeholder="Search here..." />
              </div>
            </div>
            <div className="award_filter_btn">
              <CreateButton onClick={handleShow}>New Category</CreateButton>
              <ViewMoreButton style={{color:"#333333"}}>Export CSV</ViewMoreButton>
              <SelectBorder style={{color:"#777777"}}>
                <option>Sort by : Newest</option>
                <option>Sort by : Oldest</option>
              </SelectBorder>
              <GreyfilterButton className="award_filter_icon">
                {" "}
                <LuFilter />
                Filter
              </GreyfilterButton>
            </div>
          </div>
          <div className="awardtable_div">
            <GlobalTable
              data={data}
              columns={columns}
              onRowClick={setSelectedRow}
            />
          </div>
          <div className="award_table_btn">
          <GreyBorderButton  onClick={() => {
      setShowAwardCateDiv(true); // Show the award_cate_div
      setShowTableDiv(false); // Hide the table div
    }} >Previous</GreyBorderButton>
          <RedBackgroundButton onClick={() => {
                navigate("/event-live-preview");
              }}>Next</RedBackgroundButton>
          </div>
        </div>
      )}
    </>
  );
};
