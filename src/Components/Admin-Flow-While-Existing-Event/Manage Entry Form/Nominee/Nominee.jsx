import React, { useState } from "react";
import "./Nominee.scss";
import { TitleBar } from "../../../Global/TitleBar/TitleBar";
import { TopBar } from "../../TopBar/TopBar";
import { IoSearchSharp } from "react-icons/io5";
import {  GreyfilterButton,  ViewMoreButton } from "../../../Global/GlobalButton";
import { LuFilter } from "react-icons/lu";
import { GlobalTable } from "../../../Global/GlobalTable/GlobalTable";
import { MdEditSquare } from "react-icons/md";

export const Nominee = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    "First Name",
    "Last Name",
    "Organisation Name",
    "Designation",
    "Mobile",
    "Date Picker",
    "Email",
    "Country",
    "Created Date",
    "Modification Date",
  ];

  const data = [
    {
      "First Name": "Faye",
      "Last Name": "Cabana",
      "Organisation Name": "Western Fu..",
      "Designation": "Marketing",
      "Mobile": "9010041245	",
      "Date Picker": "17 Aug 2024",
      "Email": "Fay@western.in",
      "Country": "United Arab",
      "Created Date": "17 Aug 2024",
      "Modification Date": (
        <div>
           <MdEditSquare />
        </div>
      ),
    },
    {
      "First Name": "Faye",
      "Last Name": "Cabana",
      "Organisation Name": "Western Fu..",
      "Designation": "Marketing",
      "Mobile": "9010041245	",
      "Date Picker": "17 Aug 2024",
      "Email": "Fay@western.in",
      "Country": "United Arab",
      "Created Date": "17 Aug 2024",
      "Modification Date": (
        <div>
           <MdEditSquare />
        </div>
      ),
    },
    {
      "First Name": "Faye",
      "Last Name": "Cabana",
      "Organisation Name": "Western Fu..",
      "Designation": "Marketing",
      "Mobile": "9010041245	",
      "Date Picker": "17 Aug 2024",
      "Email": "Fay@western.in",
      "Country": "United Arab",
      "Created Date": "17 Aug 2024",
      "Modification Date": (
        <div>
           <MdEditSquare />
        </div>
      ),
    },
    {
      "First Name": "Faye",
      "Last Name": "Cabana",
      "Organisation Name": "Western Fu..",
      "Designation": "Marketing",
      "Mobile": "9010041245	",
      "Date Picker": "17 Aug 2024",
      "Email": "Fay@western.in",
      "Country": "United Arab",
      "Created Date": "17 Aug 2024",
      "Modification Date": (
        <div>
           <MdEditSquare />
        </div>
      ),
    },
  ];


  return (
    <div>
      <div className="nominee_data_div">
        <TitleBar title="Nominee Listing" />
        <div className="nominee_white_bg">
          <TopBar titleheading="Nominee Listing" />

          <div className="nominee_table_div">
            <div className="nominee_table_search">
              <div className="nominee_table_icon">
                <IoSearchSharp />
              </div>
              <div className="nominee_table_icon_content">
                <input type="text" placeholder="Search here..." />
              </div>
            </div>

            <div className="nominee_filter_btn">
            <ViewMoreButton style={{ color: "#333333" }}>
            Export CSV
              </ViewMoreButton>

              <ViewMoreButton style={{ color: "#333333" }}>
              Refresh
              </ViewMoreButton>

              
              <GreyfilterButton className="nominee_filter_icon">
                <LuFilter/>
                Filter
              </GreyfilterButton>


            </div>
          </div>
        </div>

        <GlobalTable
            data={data}
            columns={columns}
            onRowClick={setSelectedRow}
          />


      </div>
    </div>
  );
};
