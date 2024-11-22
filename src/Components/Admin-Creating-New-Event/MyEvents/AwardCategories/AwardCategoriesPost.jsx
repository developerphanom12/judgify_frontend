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
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { setAwardId } from "../../../Redux/Users/action";
import * as Yup from "yup";

export const AwardCategoriesPost = () => {
  const [show, setShow] = useState(false);
  const [showTableDiv, setShowTableDiv] = useState(false);
  const [showAwardCateDiv, setShowAwardCateDiv] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isSaveAndAddNew, setIsSaveAndAddNew] = useState(false);
  const [awardTableData, setAwardTableData] = useState([]);

  const eventIds = useSelector((state) => state.users?.id || "");

  const initialEventId = String(eventIds);

  console.log("Stored eventId showww:posttttt", eventIds);

  const awardId = useSelector((state) => state.users.awardId || "");
  // console.log("Award ID from Redux:", awardId);

  const [awardData, setAwardData] = useState({
    //eventId: eventIdsString,
    eventId: initialEventId,
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

  const [showSecondModal, setShowSecondModal] = useState(false);

  const [editaward, seteditaward] = useState({
    category_name: "",
    category_prefix: "",
    belongs_group: "",
    limit_submission: "",
    start_date: "",
    end_date: "",
    is_endorsement: false,
    is_start_date: false,
    is_end_date: false,
  });

  const [errors, setErrors] = useState({});

  const [localAwardId, setLocalAwardId] = useState(null);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    category_name: Yup.string().required("Category Name is required"),
    category_prefix: Yup.string().required("Category Prefix is required"),
    belongs_group: Yup.string().required("Belongs to Group is required"),
    limit_submission: Yup.string().required("Limit Submission is required"),
    start_date: Yup.date().optional("Start Date is required"),
    end_date: Yup.date().optional("End Date is required"),
  });

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
      is_endorsement: awardData.is_endorsement === "1" ? "1" : "0",
     
   
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
            eventId: initialEventId,
            category_name: "",
            category_prefix: "",
            belongs_group: "",
            limit_submission: "",
            is_start_date: "0",
            is_end_date: "0",
            is_endorsement: "0",
            start_date: "0",
            end_date: "0",
          });
          setIsSaveAndAddNew(false); // Reset the flag
        } else {
          setAwardData({
            eventId: "",
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
      let apiUrl = `${EXCHNAGE_URL}/allAwards?eventId=${initialEventId}&sortOrder=${sortOrder}`;

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
        const transformedData = response.data.data?.map((item) => {
          // Dispatch awardId to Redux
          dispatch(setAwardId(item.awardId)); // Store awardId in Redux

          return {
            eventId: initialEventId,
            "Category Name": item.category_name,
            "Prefix for Submission": item.category_prefix,
            "Grouping Title": item.belongs_group,
            "Limit Submission": item.limit_submission,
            "Closing Date": new Date(item.closing_date).toLocaleDateString(),
            Actions: (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FaEdit onClick={() => handleShowSecondModal(item.awardId)} />

                <RiDeleteBin6Fill onClick={() => deleteAward(item.awardId)} />
              </div>
            ),
          };
        });

        setAwardTableData(transformedData);
        console.log("setData", transformedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getApi();
  }, [searchTerm, sortOrder]);

  const deleteAward = async (awardId) => {
    console.log("Award ID to delete:", awardId);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${EXCHNAGE_URL}/awards/${awardId}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("Award deleted successfully:", response.data.message);
        toast.success("Deleted successfully");
        getApi();
      }
    } catch (error) {
      console.error(
        "Error deleting award:",
        error.response?.data?.message || error.message
      );
      toast.error("Error occurred while deleting");
      // Handle error, like showing an error message to the user
    }
  };

  const editgetApi = async (awardId) => {
    try {
      const response = await axios.get(`${EXCHNAGE_URL}/awardget/${awardId}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        seteditaward(response.data.data); // Assuming you have seteditaward to store fetched data
        console.log("setData", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    if (showSecondModal && localAwardId) {
      editgetApi(localAwardId);
      console.log("localAwardId", localAwardId);
    }
  }, [showSecondModal, localAwardId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const formattedStartDate = editaward.is_start_date
      ? new Date(editaward.start_date).toISOString().split("T")[0]
      : null;
    const formattedEndDate = editaward.is_end_date
      ? new Date(editaward.end_date).toISOString().split("T")[0]
      : null;
    try {
      await validationSchema.validate(editaward, { abortEarly: false });

      const response = await axios.post(
        `${EXCHNAGE_URL}/updateAwardCategory`,
        {
          awardId: localAwardId,
          category_name: editaward.category_name,
          category_prefix: editaward.category_prefix,
          belongs_group: editaward.belongs_group,
          limit_submission: editaward.limit_submission,
          is_start_date: editaward.is_start_date,
          start_date: formattedStartDate,
          is_end_date: editaward.is_end_date,
          end_date: formattedEndDate,
          is_endorsement: editaward.is_endorsement,
        },
        {
          // Config options, including headers
          headers: {
            "Content-Type": "application/json", // Changed to "application/json" for simple JSON data
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Category saved successfully!");
        handleCloseSecondModal(); // Close the modal after successful save
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        const errorMessages = {};
        error.inner.forEach((err) => {
          errorMessages[err.path] = err.message;
        });
        setErrors(errorMessages);
      } else {
        console.error("Error updating profile:", error.message);
        toast.error("Error updating profile");
      }
    }
  };

  const handleCloseSecondModal = () => {
    setShowSecondModal(false);
    setAwardId(null); // Reset awardId when closing modal
  };

  const handleShowSecondModal = (id) => {
    setLocalAwardId(id); // Set awardId explicitly before opening the modal
    setShowSecondModal(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update searchTerm state on input change
  };

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

  const exportgetApi = async () => {
    try {
      const response = await axios.get(
        `${EXCHNAGE_URL}/download?eventId=${initialEventId}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

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

  const exportToExcel = (data) => {
    // Convert the data into a worksheet
    const ws = XLSX.utils.json_to_sheet(data);

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); // Append sheet to workbook

    // Generate Excel file and trigger the download
    XLSX.writeFile(wb, "award_data.xlsx");
  };

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

  const formatDate = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };

  return (
    <>
      {/* {eventidprops ? (
        <> */}
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
      {/* </>
      ) : (
        <> */}
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
      {/* </>
      )} */}

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

      <Modal show={showSecondModal} onHide={handleCloseSecondModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mod_cont">
            <div className="mod_heading">
              <SubHeading>Edit Category</SubHeading>
            </div>

            <form className="award_form" onSubmit={handleSave}>
              <div className="award_row">
                <InputLabel>
                  Category Name <span style={{ color: "#c32728" }}>*</span>
                </InputLabel>

                <InputType
                  name="category_name"
                  value={editaward.category_name}
                  onChange={(e) =>
                    seteditaward({
                      ...editaward,
                      category_name: e.target.value,
                    })
                  }
                />
                {errors.category_name && (
                  <span className="error">{errors.category_name}</span>
                )}
              </div>

              <div className="award_row">
                <InputLabel>
                  Category Prefix <span style={{ color: "#c32728" }}>*</span>
                </InputLabel>

                <InputType
                  name="category_prefix"
                  value={editaward.category_prefix}
                  onChange={(e) =>
                    seteditaward({
                      ...editaward,
                      category_prefix: e.target.value,
                    })
                  }
                />
                {errors.category_prefix && (
                  <span className="error">{errors.category_prefix}</span>
                )}
              </div>

              <div className="award_row">
                <InputLabel>
                  Belongs to a Group <span style={{ color: "#c32728" }}>*</span>
                </InputLabel>

                <InputType
                  name="belongs_group"
                  value={editaward.belongs_group}
                  onChange={(e) =>
                    seteditaward({
                      ...editaward,
                      belongs_group: e.target.value,
                    })
                  }
                />
                {errors.belongs_group && (
                  <span className="error">{errors.belongs_group}</span>
                )}
              </div>

              <div className="award_row">
                <InputLabel>
                  Limit Number of Submissions
                  <span style={{ color: "#c32728" }}>*</span>
                </InputLabel>

                <InputType
                  name="limit_submission"
                  value={editaward.limit_submission}
                  onChange={(e) =>
                    seteditaward({
                      ...editaward,
                      limit_submission: e.target.value,
                    })
                  }
                />
                {errors.limit_submission && (
                  <span className="error">{errors.limit_submission}</span>
                )}
              </div>

              <div className="award_row">
                <div className="start_date_div">
                  <div className="award_label">
                    <div className="award_check">
                      <div className="check_date">
                        <CheckboxInput
                          type="checkbox"
                          checked={editaward.is_start_date}
                          // onChange={() => setShowStartDate(!showStartDate)}
                          onChange={() =>
                            seteditaward({
                              ...editaward,
                              is_start_date: !editaward.is_start_date,
                            })
                          }
                        />
                        <InputLabel>Require Start Date</InputLabel>
                      </div>

                      {editaward.is_start_date && (
                        <input
                          type="date"
                          value={formatDate(editaward.start_date || "")}
                          onChange={(e) =>
                            seteditaward({
                              ...editaward,
                              start_date: e.target.value,
                            })
                          }
                        />
                      )}
                      {errors.start_date && (
                        <span className="error">{errors.start_date}</span>
                      )}
                    </div>
                  </div>
                  <div className="award_label">
                    <div className="award_check">
                      <div className="check_date">
                        <CheckboxInput
                          type="checkbox"
                          checked={editaward.is_end_date}
                          // onChange={() => setShowEndDate(!showEndDate)}
                          onChange={() =>
                            seteditaward({
                              ...editaward,
                              is_end_date: !editaward.is_end_date,
                            })
                          }
                        />

                        <InputLabel>Require End Date</InputLabel>
                      </div>
                      {editaward.is_end_date && (
                        <input
                          type="date"
                          value={formatDate(editaward.end_date || "")}
                          onChange={(e) =>
                            seteditaward({
                              ...editaward,
                              end_date: e.target.value,
                            })
                          }
                        />
                      )}
                      {errors.end_date && (
                        <span className="error">{errors.end_date}</span>
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
                        checked={editaward.is_endorsement}
                        onChange={() =>
                          seteditaward({
                            ...editaward,
                            is_endorsement: !editaward.is_endorsement,
                          })
                        }
                      />
                      <InputLabel>Required Endorsement</InputLabel>
                    </div>
                  </div>
                </div>
              </div>

              <div className="award_btn">
                <button className="award_modal_close">Save & Close</button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
