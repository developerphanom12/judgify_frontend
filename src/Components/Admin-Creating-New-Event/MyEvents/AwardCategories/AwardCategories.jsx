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
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EXCHNAGE_URL } from "../../../../Url/Url";
import axios from "axios";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";


export const AwardCategories = () => {
  const [show, setShow] = useState(false);
  const [showTableDiv, setShowTableDiv] = useState(false);
  const [showAwardCateDiv, setShowAwardCateDiv] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isSaveAndAddNew, setIsSaveAndAddNew] = useState(false);
  const [awardTableData, setAwardTableData] = useState([]);

  const eventIds = useSelector((state) => state.users?.id || "");
  const eventIdsString = String(eventIds); //Convert to string
  console.log("Stored eventId show:", eventIdsString);

  const [awardData, setAwardData] = useState({
    eventId: eventIdsString,
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

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const [exportdata, subExportdata] = useState([]);

  // const location = useLocation();

  // const { eventId } = location.state || {};

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

  // const getApi = async () => {
  //   try {
  //     const response = await axios.get(`${EXCHNAGE_URL}/allAwards?eventId=${eventIdsString}&search=${searchTerm}&sortOrder=${sortOrder}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });

  //     if (response.status === 200) {
  //       // Transform the API response to match the columns format
  //       const transformedData = response.data.data?.map((item) => ({
  //         "eventId":item.eventIdsString,
  //         "Category Name": item.category_name,
  //         "Prefix for Submission": item.category_prefix,
  //         "Grouping Title": item.belongs_group,
  //         "Limit Submission": item.limit_submission,
  //         "Closing Date": new Date(item.closing_date).toLocaleDateString(),
  //         Actions: "Edit",
  //       }));

  //       setAwardTableData(transformedData); // Set transformed data to state
  //       console.log("setData", transformedData); // Check the transformed data in the console
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error.message);
  //   }
  // };
  const getApi = async () => {
    try {
      // Construct the base URL without the search parameter
      let apiUrl = `${EXCHNAGE_URL}/allAwards?eventId=${eventIdsString}&sortOrder=${sortOrder}`;

      // Append the search parameter only if searchTerm is not empty
      if (searchTerm) {
        apiUrl += `&search=${searchTerm}`;
      }

      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        // Transform the API response to match the columns format
        const transformedData = response.data.data?.map((item) => ({
          eventId: item.eventIdsString,
          "Category Name": item.category_name,
          "Prefix for Submission": item.category_prefix,
          "Grouping Title": item.belongs_group,
          "Limit Submission": item.limit_submission,
          "Closing Date": new Date(item.closing_date).toLocaleDateString(),
          Actions: "Edit",
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
  }, [searchTerm, sortOrder]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update searchTerm state on input change
  };

  // Handle sort order change
  const handleSortChange = (event) => {
    setSortOrder(event.target.value); // Update sortOrder state when user selects an option
  };

  const columns = [
    "Category Name",
    "Prefix for Submission",
    "Grouping Title",
    "Limit Submission",
    "Closing Date",
    "Actions",
  ];

  // const exportgetApi = async () => {
  //   try {
  //     const response = await axios.get(`${EXCHNAGE_URL}/download?eventId=${eventIdsString}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });

  //     if (response.status === 200) {
  //       subExportdata(response.data.data);
  //       console.log("setData", response.data.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error.message);
  //     //     // Optionally handle the error, e.g., show an alert or redirect to login
  //   }
  // };
  const exportgetApi = async () => {
    try {
      const response = await axios.get(`${EXCHNAGE_URL}/download?eventId=${eventIdsString}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (response.status === 200) {
        // Assuming response.data.data contains the table data to be exported
        const tableData = response.data.data;
        
        // Convert the data to Excel
        exportToExcel(tableData);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      // Optionally handle the error, e.g., show an alert or redirect to login
    }
  };
  
  // Function to export data to Excel file
  const exportToExcel = (data) => {
    // Convert the data into a worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); // Append sheet to workbook
  
    // Generate Excel file and trigger the download
    XLSX.writeFile(wb, "award_data.xlsx");
  };
  
  // const exportgetApi = async () => {
  //   try {
  //     const response = await axios.get(`${EXCHNAGE_URL}/download?eventId=${eventIdsString}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  
  //     if (response.status === 200) {
  //       // Assuming response.data.data contains the table data to be exported
  //       const tableData = response.data.data;
  //       const csvData = convertToCSV(tableData);
  //       triggerDownload(csvData);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error.message);
  //     // Optionally handle the error, e.g., show an alert or redirect to login
  //   }
  // };
  
  // const convertToCSV = (data) => {
  //   const header = Object.keys(data[0]).join(","); // Get the header row
  //   const rows = data.map(row => Object.values(row).join(",")); // Get each row of values
  //   return [header, ...rows].join("\n"); // Join the header and rows with newlines
  // };
  

  // const triggerDownload = (csvData) => {
  //   const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  //   const link = document.createElement("a");
  //   if (link.download !== undefined) {
  //     // Create a link and trigger the download
  //     const url = URL.createObjectURL(blob);
  //     link.setAttribute("href", url);
  //     link.setAttribute("download", "award_data.csv"); // Optional: Customize the file name
  //     link.style.visibility = "hidden"; // Hide the link
  //     document.body.appendChild(link);
  //     link.click(); // Trigger the download
  //     document.body.removeChild(link); // Clean up the DOM
  //   }
  // };
  
  

  useEffect(() => {
    exportgetApi();
  }, []);

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

      {/* Conditionally render the table div when the state showTableDiv is true */}
      {showTableDiv && (
        <div className="table_div">
          <div className="award_table_div">
            <div className="award_table_search">
              <div className="award_table_icon">
                <IoSearchSharp />
              </div>
              <div className="award_table_icon_content">
                {/* <input type="text" placeholder="Search here..." /> */}
                <input
                  type="text"
                  placeholder="Search here..."
                  value={searchTerm} // Bind value to searchTerm state
                  onChange={handleSearchChange} // Update searchTerm state on input change
                />
              </div>
            </div>
            <div className="award_filter_btn">
              <CreateButton onClick={handleShow}>New Category</CreateButton>

              <ViewMoreButton
                style={{ color: "#333333" }}
                onClick={exportgetApi}
              >
                Export CSV
              </ViewMoreButton>

              <SelectBorder
                style={{ color: "#777777" }}
                onChange={handleSortChange}
                value={sortOrder}
              >
                <option value="newest">Sort by : Newest</option>
                <option value="oldest">Sort by : Oldest</option>
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
    </>
  );
};
