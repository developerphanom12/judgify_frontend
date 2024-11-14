import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";

export const AwardCategories = () => {
  const [show, setShow] = useState(false);
  const [showTableDiv, setShowTableDiv] = useState(false);
  const [showAwardCateDiv, setShowAwardCateDiv] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isSaveAndAddNew, setIsSaveAndAddNew] = useState(false);
  const [awardTableData, setAwardTableData] = useState([]);
  const eventIds = useSelector((state) => state.users?.id || "");
  console.log("Stored eventId:", eventIds);

  const [awardData, setAwardData] = useState({
    eventId: eventIds,
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

  // const handleStartDateCheckbox = (e) => handleData(e);

  // const handleEndDateCheckbox = (e) => handleData(e);

  const handleEndorsementCheckbox = (e) => handleData(e);

  const handleSaveAndAddNew = () => {
    setIsSaveAndAddNew(true);
  };

  const handleData = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      // Handle the checkbox logic: if checked, set to '1', else '0'
      setAwardData({
        ...awardData,
        [name]: checked ? "1" : "0", // Store '1' if checked, '0' if unchecked
      });
    } else if (name === "start_date" || name === "end_date") {
      // Handle date values
      setAwardData({
        ...awardData,
        [name]: value, // Store the date value
      });
    } else {
      setAwardData({ ...awardData, [name]: value.trim() });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...awardData,
      is_start_date: awardData.is_start_date === "1" ? "1" : "0",
      is_end_date: awardData.is_end_date === "1" ? "1" : "0",
    };

    try {
      const response = await axios.post(
        `${EXCHNAGE_URL}/awardCategory`,
        dataToSend,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Form submitted successfully");
        if (isSaveAndAddNew) {
          // Clear form fields
          setAwardData({
            eventId: eventIds,
            category_name: "",
            category_prefix: "",
            belongs_group: "",
            limit_submission: "",
            is_start_date: "0",
            is_end_date: "0",
            is_endorsement: "0",
            start_date: "",
            end_date: "",
          });
          setIsSaveAndAddNew(false); // Reset the flag
        } else {
          setAwardData({
            eventId: eventIds,
            category_name: "",
            category_prefix: "",
            belongs_group: "",
            limit_submission: "",
            is_start_date: "0",
            is_end_date: "0",
            is_endorsement: "0",
            start_date: "",
            end_date: "",
          });
          handleSaveClose();
        }
      } else {
        toast.error("Failed to submit form. Please try again later.");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to submit form. Please try again later.");
    }
  };

  const getApi = async () => {
    try {
      const response = await axios.get(`${EXCHNAGE_URL}/allAwrads`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (response.status === 200) {
        // Transform the API response to match the columns format
        const transformedData = response.data.data?.map((item) => ({
          "Category Name": item.category_name,
          "Prefix for Submission": item.category_prefix,
          "Grouping Title": item.belongs_group,
          "Limit Submission": item.limit_submission,
          "Closing Date": new Date(item.closing_date).toLocaleDateString(),
          Actions: "Edit", // Assuming you want a static "Edit" action, this can be customized
        }));
  
        setAwardTableData(transformedData); // Set transformed data to state
        console.log("setData", transformedData); // Check the transformed data in the console
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  

  useEffect(() => {
    getApi();
  }, []);


  
  const columns = [
    "Category Name",
    "Prefix for Submission",
    "Grouping Title",
    "Limit Submission",
    "Closing Date",
    "Actions",
  ];

  // const data = [
  //   {
  //     "Category Name": "Abc",
  //     "Prefix for Submission": "ABC",
  //     "Grouping Title": "#WE234343",
  //     "Limit Submission": "10",
  //     "Closing Date": "25 Sep 2024",
  //     Actions: "Edit",
  //   },
  //   {
  //     "Category Name": "Abc",
  //     "Prefix for Submission": "ABC",
  //     "Grouping Title": "#WE234343",
  //     "Limit Submission": "10",
  //     "Closing Date": "25 Sep 2024",
  //     Actions: "Edit",
  //   },
  // ];
  
  
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSaveClose = () => {
    setShow(false);
    setShowTableDiv(true);
    setShowAwardCateDiv(false);
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
                <div className="start_date_div">
                  <div className="award_label">
                    <div className="award_check">
                      <div className="check_date">
                        <CheckboxInput
                          type="checkbox"
                          name="is_start_date"
                          checked={awardData.is_start_date === "1"} // Checked when '1'
                          onChange={handleData}
                        />
                        <InputLabel>Require Start Date</InputLabel>
                      </div>
                      {awardData.is_start_date === "1" && (
                        <input
                          type="date"
                          name="start_date"
                          value={awardData.start_date}
                          onChange={handleData}
                        />
                      )}
                    </div>
                  </div>
                  <div className="award_label">
                    <div className="award_check">
                      <div className="check_date">
                        <CheckboxInput
                          type="checkbox"
                          name="is_end_date"
                          checked={awardData.is_end_date === "1"} // Checked when '1'
                          onChange={handleData}
                        />
                        <InputLabel>Require End Date</InputLabel>
                      </div>
                      {awardData.is_end_date === "1" && (
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
              </div>

              <div className="award_row">
                <div className="award_label">
                  <div className="award_check">
                    <div className="check_date">
                      <CheckboxInput
                        type="checkbox"
                        name="is_endorsement"
                        checked={awardData.is_endorsement === "1"} // Compare with "1"
                        onChange={handleEndorsementCheckbox}
                      />
                      <InputLabel>Required Endorsement</InputLabel>
                    </div>
                  </div>
                </div>
              </div>

              <div className="award_btn">
                <GreyBorderButton onClick={handleSaveAndAddNew}>
                  Save & Add New
                </GreyBorderButton>

                <button className="award_modal_close" type="submit">
                  Save & Close
                </button>
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
              data={awardTableData}
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
