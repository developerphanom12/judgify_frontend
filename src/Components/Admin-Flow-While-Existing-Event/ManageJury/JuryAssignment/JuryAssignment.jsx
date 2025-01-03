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
import { EXCHNAGE_URL } from "../../../../Url/Url";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const JuryAssignment = () => {

  const [selectedRows, setSelectedRows] = useState([]);
  const [show, setShow] = useState(false);
  const eventIdGet = useSelector((state) => state?.users?.eventIdGet || "");
  const initialEventId = String(eventIdGet);
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

  const [formData, setFormData] = useState({
    groupName: "",
    email: "",
    firstName: "",
    lastName: "",
    isReadonly: false,
    isAutoSignin: false,
    isAssignNew: 0,
    isAssignClose: 0,
    isAssignSend: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", 
    }));
  };


  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const token = localStorage.getItem("token");

  const handleAssignButtonChange = (buttonType) => {
    // Reset all assign buttons to 0
    setFormData((prevState) => ({
      ...prevState,
      isAssignNew: 0,
      isAssignClose: 0,
      isAssignSend: 0,
      // Set the selected button to 1
      [buttonType]: 1,
    }));
  };

  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  
  const validateForm = () => {
    const { email, firstName, lastName } = formData;
    let isValid = true;
    const validationErrors = {};

    if (!email) {
      validationErrors.email = "Email is required";
      isValid = false;
    }
    if (!firstName) {
      validationErrors.firstName = "First name is required";
      isValid = false;
    }
    if (!lastName) {
      validationErrors.lastName = "Last name is required";
      isValid = false;
    }

    setErrors(validationErrors); 
    return isValid;
  };

  const handleSubmitJuryAssignment = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; 
    }

    const { groupName, email, firstName, lastName, isReadonly, isAutoSignin, isAssignNew, isAssignClose, isAssignSend } = formData;

    const requestData = {
      eventId: initialEventId,
      group_name: groupName,
      email,
      first_name: firstName,
      last_name: lastName,
      is_readonly: isReadonly ? 1 : 0,
      is_auto_signin: isAutoSignin ? 1 : 0,
      is_assign_New: isAssignNew,
      is_assign_close: isAssignClose,
      is_assign_send: isAssignSend,
    };

    try {
      const response = await axios.post(
        `${EXCHNAGE_URL}/assignJury`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;

      console.log("Jury assigned successfully:", response.data);
      toast.success("Jurry Assigned SuccessFully")
      navigate("/jury-assignment")

    } catch (error) {
      console.error("Error assigning jury:", error);
    }
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

            <form className="juryassign_form" onSubmit={handleSubmitJuryAssignment}>
              <div className="juryassign_row">
                <InputLabel>Jury Group</InputLabel>

                <SelectBorder
                  name="groupName"
                  value={formData.groupName}
                  onChange={handleInputChange}
                >
                  <option value="All Shortlisted Submissions">All Shortlisted Submissions</option>
                  <option value="Shortlisted Submissions One">Shortlisted Submissions One</option>
                  <option value="Shortlisted Submissions Two">Shortlisted Submissions Two</option>
                  <option value="Shortlisted Submissions Three">Shortlisted Submissions Three</option>
                </SelectBorder>
              </div>

              <div className="juryassign_row">
                <InputLabel>Email</InputLabel>
                <InputType
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email" />
              </div>

              <div className="juryassign_row">
                <InputLabel>First Name</InputLabel>
                <InputType name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name" />
              </div>

              <div className="juryassign_row">
                <InputLabel>Last Name</InputLabel>
                <InputType name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name" />
              </div>

              <div className="juryassign_row">
                <div className="juryassign_check_div">
                  <div className="juryassign_label">
                    <div className="juryassign_check">
                      <div className="juryassign_date">
                        <CheckboxInput name="isReadonly"
                          type="checkbox"
                          checked={formData.isReadonly}
                          onChange={handleCheckboxChange} />
                        <InputLabel>Readonly</InputLabel>
                      </div>
                    </div>
                  </div>
                  <div className="juryassign_label">
                    <div className="juryassign_check">
                      <div className="juryassign_date">
                        <CheckboxInput name="isAutoSignin"
                          type="checkbox"
                          checked={formData.isAutoSignin}
                          onChange={handleCheckboxChange} />
                        <InputLabel>Auto Sign In</InputLabel>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            <div className="juryassign_btn">
            <GreyBorderButton
            type="submit"
            onClick={() => handleAssignButtonChange("isAssignNew")}
            >
            Assign & Add New
          </GreyBorderButton>
          <GreyBackgroundButton
            type="submit"
            onClick={() => handleAssignButtonChange("isAssignClose")}
            >
            Assign & Close
          </GreyBackgroundButton>
          <RedBackgroundButton
            type="submit"
            onClick={() => handleAssignButtonChange("isAssignSend")}
            >
            Send Email & Assign Jury
          </RedBackgroundButton>
            </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};
