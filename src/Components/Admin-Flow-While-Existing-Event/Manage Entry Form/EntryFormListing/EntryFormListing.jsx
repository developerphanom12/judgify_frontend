import React from "react";
import "./EntryFormListing.scss";
import { TitleBar } from "../../../Global/TitleBar/TitleBar";
import { TopBar } from "../../TopBar/TopBar";
import { IoSearchSharp } from "react-icons/io5";
import { GreyfilterButton, ViewMoreButton } from "../../../Global/GlobalButton";
import { LuFilter } from "react-icons/lu";
import {
  GreenSubDescription,
  RedMainHeading,
} from "../../../Global/GlobalText";

export const EntryFormListing = () => {
  const data = [
    {
      firstName: "Arshad",
      lastName: "Khan",
      email: "Sitaral050...",
      country: "India",
      createdDate: "27 Aug 2022",
      modifiedDate: "27 Aug 2022",
      entryNo: "IBA-2113",
      category: "Excellence",
      brandName: "Fashion",
      companyName: "Experientia...",
      submittedBy: "ABC",
      designation: "Developer",
      mobileNumber: "7544445214",
      status: "Completed",
    },
  ];

  return (
    <div>
      <div className="entry_form_listing_div">
        <TitleBar title="Entry Form Listing" />
        <div className="entry_form_listing_white_bg">
          <TopBar titleheading="Entry Form Listing" />

          <div className="entry_form_listing_table_div">
            <div className="entry_form_listing_table_search">
              <div className="entry_form_listing_table_icon">
                <IoSearchSharp />
              </div>
              <div className="entry_form_listing_table_icon_content">
                <input type="text" placeholder="Search here..." />
              </div>
            </div>

            <div className="entry_form_listing_filter_btn">
              <ViewMoreButton style={{ color: "#333333" }}>
                Export CSV
              </ViewMoreButton>

              <ViewMoreButton style={{ color: "#333333" }}>
                Refresh
              </ViewMoreButton>

              <GreyfilterButton className="entry_form_listing_filter_icon">
                <LuFilter />
                Filter
              </GreyfilterButton>
            </div>
          </div>

          <div className="table_container_head">
            <RedMainHeading>Nominee</RedMainHeading>
            <GreenSubDescription>Entry Form</GreenSubDescription>
          </div>

          <div className="table_container">
            <table className="responsive-table">
              <thead>
                <tr>
                  <th></th>

                  <th className="table_half">First Name</th>
                  <th className="table_half">Last Name</th>
                  <th className="table_half">Email</th>
                  <th className="table_half">Country</th>
                  <th className="table_half">Created Date</th>
                  <th className="table_half">Modified Date</th>

                  <th className="table_secondhalf">Entry No</th>
                  <th className="table_secondhalf">Category</th>
                  <th className="table_secondhalf">Brand Name</th>
                  <th className="table_secondhalf">Company Name</th>
                  <th className="table_secondhalf">Submitted By</th>
                  <th className="table_secondhalf">Designation</th>
                  <th className="table_secondhalf">Mobile Number</th>
                  <th className="table_secondhalf">Email</th>
                  <th className="table_secondhalf">Created Date</th>
                  <th className="table_secondhalf">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{row.firstName}</td>
                    <td>{row.lastName}</td>
                    <td>{row.email}</td>
                    <td>{row.country}</td>
                    <td>{row.createdDate}</td>
                    <td>{row.modifiedDate}</td>
                    <td>{row.entryNo}</td>
                    <td>{row.category}</td>
                    <td>{row.brandName}</td>
                    <td>{row.companyName}</td>
                    <td>{row.submittedBy}</td>
                    <td>{row.designation}</td>
                    <td>{row.mobileNumber}</td>
                    <td>{row.email}</td>
                    <td>{row.createdDate}</td>
                    <td>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
