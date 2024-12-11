import React, { useState } from "react";
import "./JuryAssignment.scss";
import { TitleBar } from "../../../Global/TitleBar/TitleBar";
import { TopBar } from "../../TopBar/TopBar";
import {
  CreateButton,
  GreyBackgroundButton,
  GreyBorderButton,
  GreyfilterButton,
  RedBackgroundButton,
  RedBordButton,
  ViewMoreButton,
} from "../../../Global/GlobalButton";
import { useNavigate } from "react-router-dom";
import { DescriptionContent, SubHeading } from "../../../Global/GlobalText";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoLockClosedSharp, IoMail, IoSearchSharp } from "react-icons/io5";
import { LuFilter } from "react-icons/lu";
import { GlobalSecondTable } from "../../../Global/GlobalSecondTable/GlobalSecondTable";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import {
  CheckboxInput,
  InputLabel,
  InputType,
  SelectBorder,
} from "../../../Global/GlobalFormElement";
import Modal from "react-bootstrap/Modal";

export const JuryAssignment = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [show, setShow] = useState(false);

  const columns = ["Name", "Email", "Assignment Group", "Status", "Actions"];

  const data = [
    {
      Name: "Anurima Das",
      Email: "anurima@abc.com",
      "Assignment Group": "All Shortlisted Entry Form",
      Status: "Ready to start",
      Actions: (
        <div
          style={{ color: "#777777", cursor: "pointer", marginLeft: "20px" }}
        >
          <FaArrowRotateLeft />
          <MdEditSquare />
          <RiDeleteBin6Fill />
          <IoLockClosedSharp />
          <IoMail />
        </div>
      ),
    },

    {
      Name: "Anurima Das",
      Email: "anurima@abc.com",
      "Assignment Group": "All Shortlisted Entry Form",
      Status: "Ready to start",
      Actions: (
        <div
          style={{ color: "#777777", cursor: "pointer", marginLeft: "20px" }}
        >
          <FaArrowRotateLeft />
          <MdEditSquare />
          <RiDeleteBin6Fill />
          <IoLockClosedSharp />
          <IoMail />
        </div>
      ),
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
    console.log("Selected row:", row);
  };

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className="jury_assignment_data_div">
        <TitleBar title="Jury Assignment" />
        <div className="jury_assignment_white_bg">
          <TopBar titleheading="Jury Assignment" />
          <div className="jury_assign_round_btn">
            <div className="jury_assignment_btn">
              <CreateButton
                onClick={() => {
                  navigate("/create-jury-round");
                }}
              >
                Round 1
              </CreateButton>
            </div>
          </div>

          <div className="jury_assignment_date_div">
            <DescriptionContent>
              From 24 Aug 2023 10:30 to 01 Sep 2023 10:30
            </DescriptionContent>

            <RedBordButton
              className="jury_assignment_pluscontent"
              onClick={handleShow}
            >
              <IoMdAddCircleOutline />
              Assign Jury to This round
            </RedBordButton>
          </div>

          <div className="jury_assignment_table_div">
            <div className="jury_assignment_table_search">
              <div className="jury_assignment_table_icon">
                <IoSearchSharp />
              </div>
              <div className="jury_assignment_table_icon_content">
                <input type="text" placeholder="Search here..." />
              </div>
            </div>
            <div className="jury_assignment_filter_btn">
              <ViewMoreButton style={{ color: "#333333" }}>
                Export CSV
              </ViewMoreButton>

              <RedBordButton style={{ fontSize: "16px" }}>
                Send Invitation
              </RedBordButton>

              <GreyfilterButton className="jury_assignment_filter_icon">
                <LuFilter />
                Filter
              </GreyfilterButton>
            </div>
          </div>

          <GlobalSecondTable
            data={data}
            columns={columns}
            selectedRows={selectedRows} // Ensure this is always an array
            onCheckboxChange={handleCheckboxChange}
            onRowClick={setSelectedRow}
          />

          <div className="jury_assignment_table_btn">
            <GreyBorderButton>Cancel</GreyBorderButton>
            <RedBackgroundButton>Create</RedBackgroundButton>
            <GreyBackgroundButton>Create & Add New</GreyBackgroundButton>
          </div>

        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* juryassign */}
          <div className="juryassign_cont">
            <div className="juryassign_heading">
              <SubHeading>Assign Jury to round 1</SubHeading>
            </div>

            <form className="juryassign_form">
              <div className="juryassign_row">
                <InputLabel>Jury Group</InputLabel>

                <SelectBorder>
                  <option value="All Shortlisted Submissions">
                    All Shortlisted Submissions
                  </option>
                  <option value="All Shortlisted Submissions">
                    {" "}
                    Shortlisted Submissions One
                  </option>
                  <option value="All Shortlisted Submissions">
                    {" "}
                    Shortlisted Submissions Two
                  </option>
                  <option value="All Shortlisted Submissions">
                    {" "}
                    Shortlisted Submissions Three
                  </option>
                </SelectBorder>
              </div>

              <div className="juryassign_row">
                <InputLabel>Email</InputLabel>
                <InputType name="Email" placeholder="Email" />
              </div>

              <div className="juryassign_row">
                <InputLabel>First Name</InputLabel>
                <InputType placeholder="First Name" />
              </div>

              <div className="juryassign_row">
                <InputLabel>Last Name</InputLabel>
                <InputType placeholder="Last Name" />
              </div>

              <div className="juryassign_row">
                <div className="juryassign_check_div">
                  <div className="juryassign_label">
                    <div className="juryassign_check">
                      <div className="juryassign_date">
                        <CheckboxInput type="checkbox" />
                        <InputLabel>Readonly</InputLabel>
                      </div>
                    </div>
                  </div>
                  <div className="juryassign_label">
                    <div className="juryassign_check">
                      <div className="juryassign_date">
                        <CheckboxInput type="checkbox" />
                        <InputLabel>Auto Sign In</InputLabel>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div className="juryassign_btn">
              <GreyBorderButton>Assign & Add New</GreyBorderButton>
              <GreyBackgroundButton>Assign & Close</GreyBackgroundButton>
              <RedBackgroundButton>
                Send Email & Assign Jury
              </RedBackgroundButton>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};
