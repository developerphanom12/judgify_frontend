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
import { toast } from "react-toastify";
import { EXCHNAGE_URL } from "../../../../Url/Url";
import axios from "axios";
import * as yup from "yup";
import { useSelector } from "react-redux";

export const AwardCategories = () => {
  const [show, setShow] = useState(false);
  const [showTableDiv, setShowTableDiv] = useState(false); // To control table visibility
  const [showAwardCateDiv, setShowAwardCateDiv] = useState(true); // New state to control award_cate_div visibility
  const [selectedRow, setSelectedRow] = useState(null);
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const eventId = useSelector((state) => state.users?.id || "");
  
  console.log("Stored eventId:", eventId);


  const [awardData, setAwardData] = useState({
    eventId:"",
    category_name: "",
    category_prefix: "",
    belongs_group: "",
    limit_submission: "",
    is_start_date: "",
    is_end_date: "",
    is_endorsement: "",
    start_date: "",
    end_date: "",
  });

  const [porterrors, setPortErrors] = useState({});

  const handleStartDateCheckbox = () => setShowStartDate(!showStartDate);
  const handleEndDateCheckbox = () => setShowEndDate(!showEndDate);

  const hirePortSchema = yup.object().shape({
    name: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile_number: yup
      .string()
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required("Phone Number is required"),
  });

  const handleData = (e) => {
    const { name, value } = e.target;
    setAwardData({ ...awardData, [name]: value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postApi = async () => {
      try {
        await hirePortSchema.validate(awardData, { abortEarly: false });
        const response = await axios.post(
          `${EXCHNAGE_URL}/awardCategory`,
          awardData
        );
        if (response.status === 200) {
          setAwardData({
            category_name: "",
            category_prefix: "",
            belongs_group: "",
            limit_submission: "",
            is_start_date: "",
            is_end_date: "",
            is_endorsement: "",
            start_date: "",
            end_date: "",
          });
          setPortErrors({});
          toast.success("Form submitted successfully");
        }
      } catch (error) {
        if (error.inner) {
          const portErrors = error.inner.reduce((acc, validationError) => {
            acc[validationError.path] = validationError.message;
            return acc;
          }, {});
          setPortErrors(portErrors);
        } else {
          toast.error("Failed to submit form. Please try again later.");
          console.error("API Error:", error);
        }
      }
    };
    postApi();
  };

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
            <form onSubmit={handleSubmit} className="award_form">
              <div className="award_row">
                <InputLabel>
                  Category Name <span style={{ color: "#c32728" }}>*</span>
                </InputLabel>
                <InputType
                  name="category_name"
                  value={awardData.category_name}
                  onChange={handleData}
                  placeholder="Enter Category Name"
                />
              </div>

              <div className="award_row">
                <InputLabel>
                  Category Prefix <span style={{ color: "#c32728" }}>*</span>
                </InputLabel>
                <InputType
                  name="category_prefix"
                  value={awardData.category_prefix}
                  onChange={handleData}
                  placeholder="Enter Category Prefix"
                />
              </div>

              <div className="award_row">
                <InputLabel>
                  Belongs to a Group <span style={{ color: "#c32728" }}>*</span>
                </InputLabel>
                <InputType
                  name="belongs_group"
                  value={awardData.belongs_group}
                  onChange={handleData}
                  placeholder="Enter Group"
                />
              </div>

              <div className="award_row">
                <InputLabel>
                  Limit Number of Submissions
                  <span style={{ color: "#c32728" }}>*</span>
                </InputLabel>
                <InputType
                  name="limit_submission"
                  value={awardData.limit_submission}
                  onChange={handleData}
                  placeholder="Enter Limit Number"
                />
              </div>

              <div className="award_row">
                <div className="award_label">
                  <div className="award_check">
                    <div className="check_date">
                      <CheckboxInput
                        type="checkbox"
                        name="is_start_date"
                        checked={showStartDate}
                        onChange={handleStartDateCheckbox}
                      />
                      <InputLabel>Require Start Date</InputLabel>
                    </div>
                    {showStartDate && (
                      <input
                        type="date"
                        name="start_date"
                        value={awardData.start_date}
                        onChange={handleData}
                      />
                    )}
                  </div>

                  <div className="award_check">
                    <div className="check_date">
                      <CheckboxInput
                        type="checkbox"
                        name="is_end_date"
                        checked={showEndDate}
                        onChange={handleEndDateCheckbox}
                      />
                      <InputLabel>Require End Date</InputLabel>
                    </div>
                    {showEndDate && (
                      <input
                        type="date"
                        name="end_date"
                        value={awardData.end_date}
                        onChange={handleData}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="award_row">
                <div className="award_label">
                  <div className="award_check">
                    <div className="check_date">
                      <CheckboxInput
                        type="checkbox"
                        name="is_endorsement"
                        checked={awardData.is_endorsement}
                        onChange={handleData}
                      />
                      <InputLabel>Required Endorsement</InputLabel>
                    </div>
                  </div>
                </div>
              </div>

              <div className="award_btn">
                <GreyBorderButton>Save & Add New</GreyBorderButton>
                <div
                  className="award_modal_close"
                  type="submit"
                >
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
              <ViewMoreButton style={{ color: "#333333" }}>
                Export CSV
              </ViewMoreButton>
              <SelectBorder style={{ color: "#777777" }}>
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
            <GreyBorderButton
              onClick={() => {
                setShowAwardCateDiv(true); // Show the award_cate_div
                setShowTableDiv(false); // Hide the table div
              }}
            >
              Previous
            </GreyBorderButton>
            <RedBackgroundButton
              onClick={() => {
                navigate("/event-live-preview");
              }}
            >
              Next
            </RedBackgroundButton>
          </div>
        </div>
      )}
    </>
  );
};
