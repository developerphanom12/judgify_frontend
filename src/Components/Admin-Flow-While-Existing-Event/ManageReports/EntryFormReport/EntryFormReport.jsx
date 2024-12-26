import React, { useEffect, useState } from "react";
import "./EntryFormReport.scss";
import { TitleBar } from "../../../Global/TitleBar/TitleBar";
import { TopBar } from "../../TopBar/TopBar";
import {
  Description,
  GreenSubDescription,
  PaymentPendingHeading,
} from "../../../Global/GlobalText";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { CheckboxInput } from "../../../Global/GlobalFormElement";
import { RxCrossCircled } from "react-icons/rx";

export const EntryFormReport = () => {
  const [checkboxes, setCheckboxes] = useState({
    createdOn: false,
    lastUpdate: false,
    endorseStatus: false,
    category: false,
    brandName: false,
    endorsementEmail: false,
    companyGroup: false,
    headOfficeAddress: false,
    contactPersonName: false,
    designation: false,
    mobileNumber: false,
    emailId: false,
  });
  const [allSelected, setAllSelected] = useState(false); 
  const [showSelected, setShowSelected] = useState(false); 

  const handleSelectAll = () => {
    const updatedCheckboxes = Object.fromEntries(
      Object.keys(checkboxes).map((key) => [key, true])
    );
    setCheckboxes(updatedCheckboxes);
    setAllSelected(true);
  };

  const handleDeselectAll = () => {
    const updatedCheckboxes = Object.fromEntries(
      Object.keys(checkboxes).map((key) => [key, false])
    );
    setCheckboxes(updatedCheckboxes);
    setAllSelected(false);
  };

  const handleCheckboxChange = (key) => {
    const updatedCheckboxes = {
      ...checkboxes,
      [key]: !checkboxes[key], // Toggle the checkbox state
    };
    setCheckboxes(updatedCheckboxes);
    const allAreSelected = Object.values(updatedCheckboxes).every(
      (value) => value
    );
    setAllSelected(allAreSelected);
  };

  const toggleShowSelected = () => {
    setShowSelected((prev) => !prev); // Toggle visibility on arrow click
  };

  const handleSelectAllInSelectedSection = () => {
    const updatedCheckboxes = { ...checkboxes };
    Object.keys(updatedCheckboxes).forEach((key) => {
      if (updatedCheckboxes[key]) updatedCheckboxes[key] = true; // Only select those that are already selected
    });
    setCheckboxes(updatedCheckboxes);
  };

  const handleDeselectAllInSelectedSection = () => {
    // Handle deselecting all checkboxes in the selected section
    const updatedCheckboxes = { ...checkboxes };
    Object.keys(updatedCheckboxes).forEach((key) => {
      if (updatedCheckboxes[key]) updatedCheckboxes[key] = false; // Only deselect those that are already selected
    });
    setCheckboxes(updatedCheckboxes);
  };

  const handleRemoveCheckbox = (key) => {
    const updatedCheckboxes = { ...checkboxes };
    updatedCheckboxes[key] = false; // Uncheck the box
    setCheckboxes(updatedCheckboxes);
  };

  useEffect(() => {
    setCheckboxes((prevCheckboxes) =>
      Object.fromEntries(Object.keys(prevCheckboxes).map((key) => [key, false]))
    );
  }, []);

  return (
    <div>
      <div className="entryformreport_data_div">
        <TitleBar title="Entry Form Report" />
        <div className="entryformreport_white_bg">

          <TopBar titleheading="Entry Form Report" />

          <div className="entryformreport_main">
            <GreenSubDescription>
              Select and re-Arrange your columns
            </GreenSubDescription>

            <div className="entryformreport_column_head">
              <PaymentPendingHeading>Available Columns</PaymentPendingHeading>

              <div className="entryformreport_arrow_icon">
                <IoMdArrowDropleft />
                <IoMdArrowDropright onClick={toggleShowSelected} />
              </div>

              <PaymentPendingHeading>Selected Columns</PaymentPendingHeading>
            </div>

            <div className="entryformreport_check_section">
              <div
                className="entryformreport_sub_check"
                style={{ backgroundColor: "#FFE2E54D" }}
              >
                <div className="entryformreport_heading">
                  <h4
                    onClick={handleSelectAll}
                    style={{
                      cursor: "pointer",
                      color: allSelected ? "#C32728" : "#333333",
                    }}
                  >
                    Select All
                  </h4>
                  <h4
                    onClick={handleDeselectAll}
                    style={{
                      cursor: "pointer",
                      color: !Object.values(checkboxes).some((value) => value)
                        ? "#C32728"
                        : "#333333",
                    }}
                  >
                    Deselect All
                  </h4>
                </div>

                <div className="entryformreport_checbox_div">
                  <Description>Submission</Description>

                  {Object.entries(checkboxes).map(([key, value]) => (
                    <div key={key} className="section_four_checkbox">
                      <CheckboxInput
                        type="checkbox"
                        checked={value}
                        onChange={() => handleCheckboxChange(key)}
                      />
                      <Description>
                        {key.replace(/([A-Z])/g, " $1")}
                      </Description>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="entryformreport_sub_check"
                style={{ backgroundColor: "#F6F8F9" }}
              >
                <div className="entryformreport_heading">
                  <h4 onClick={handleSelectAllInSelectedSection}>Select All</h4>
                  <h4 onClick={handleDeselectAllInSelectedSection}>
                    Deselect All
                  </h4>
                </div>

                <div className="entryformreport_newchecbox_div">
                  {showSelected && (
                    <>
                      {Object.entries(checkboxes)
                        .filter(([key, value]) => value)
                        .map(([key, value]) => (
                          <div key={key} className="section_four_new_checkbox">
                            <div className="newww_check">
                              <CheckboxInput
                                type="checkbox"
                                checked={value}
                                onChange={() => handleCheckboxChange(key)}
                              />
                              <Description>
                                {key.replace(/([A-Z])/g, " $1")}
                              </Description>
                            </div>
                            <RxCrossCircled
                              onClick={() => handleRemoveCheckbox(key)}
                              style={{
                                cursor: "pointer",
                                color: "#333333",
                                marginLeft: "10px",
                              }}
                            />
                          </div>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </div>

            
          </div>

        </div>
      </div>
    </div>
  );
};
