import React, { useState } from 'react'
import "./Entrants.scss";
import { TitleBar } from "../../../Global/TitleBar/TitleBar";
import { TopBar } from "../../TopBar/TopBar";
import { IoSearchSharp } from "react-icons/io5";
import {  GreyfilterButton,  ViewMoreButton } from "../../../Global/GlobalButton";
import { LuFilter } from "react-icons/lu";
import { GlobalTable } from "../../../Global/GlobalTable/GlobalTable";
import { MdEditSquare } from "react-icons/md";

export const Entrants = () => {
    const [selectedRow, setSelectedRow] = useState(null);

    const columns = [
      "First Name",
      "Last Name",
      "Email",
      "Country",
      "Email Field",
      "Phone Field",
      "Date Picker",
      "Created Date",
      "Modification Date",
      "Action",
    ];

    const data = [
      {
        "First Name": "Faye",
        "Last Name": "Cabana",
        "Email": "Fay@western.in",
        "Country": "United Arab",
        "Email Field": "Lorem Ipsumn",
        "Phone Field":"9010041245",
        "Date Picker": "17 Aug 2024",
        "Created Date": "17 Aug 2024",
        "Modification Date": "17 Aug 2024",
        "Action": (
          <div>
             <MdEditSquare />
          </div>
        ),
      },

    ];

  return (
    <div>
      <div className="entrants_data_div">
        <TitleBar title="Entrants Listing"/>
        <div className="entrants_white_bg">
          <TopBar titleheading="Entrants Listing" />

          <div className="entrants_table_div">
            <div className="entrants_table_search">
              <div className="entrants_table_icon">
                <IoSearchSharp />
              </div>
              <div className="entrants_table_icon_content">
                <input type="text" placeholder="Search here..." />
              </div>
            </div>

            <div className="entrants_filter_btn">
                <ViewMoreButton style={{ color: "#333333" }}>
                     Export CSV
                </ViewMoreButton>

               <ViewMoreButton style={{ color: "#333333" }}>
                  Refresh
               </ViewMoreButton>

              
               <GreyfilterButton className="entrants_filter_icon">
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
  )
}
