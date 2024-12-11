import React, { useState } from "react";
import "./Orders.scss";
import { TitleBar } from "../../../Global/TitleBar/TitleBar";
import { TopBar } from "../../TopBar/TopBar";
import { IoEyeOutline, IoSearchSharp } from "react-icons/io5";
import { GreyfilterButton, RedBordButton, ViewMoreButton } from "../../../Global/GlobalButton";
import { LuFilter } from "react-icons/lu";
import { GlobalTable } from "../../../Global/GlobalTable/GlobalTable";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { BiSolidCoinStack } from "react-icons/bi";

export const Orders = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    "Order Reference No.",
    "Email",
    "First Name",
    "Last Name",
    "Submitted Date",
    "Actions",
  ];

  const data = [
    {
      "Order Reference No.":"664029017",
      "Email":"bhavesh@phygits.com",
      "First Name":"Anurima",
      "Last Name": "Das",
      "Submitted Date":"30 Mar 2023",
      Actions: (
        <div  style={{ color: "#777777", cursor: "pointer", display:"flex", gap:"10px"}}>
          <IoEyeOutline  style={{width: "20px", height:"20px", color:"#333333"}}/>
          <FaArrowRotateLeft style={{width: "20px", height:"20px", color:"#333333"}}/>
          <BiSolidCoinStack style={{width: "20px", height:"20px", color:"#FFB238"}}/>
          <HiOutlineBellAlert style={{width: "20px", height:"20px", color:"#00AC4F"}}/>
        </div>
      ),
    },
    {
      "Order Reference No.":"664029017",
      "Email":"bhavesh@phygits.com",
      "First Name":"Anurima",
      "Last Name": "Das",
      "Submitted Date":"30 Mar 2023",
      Actions: (
        <div  style={{ color: "#777777", cursor: "pointer", display:"flex", gap:"10px"}}>
          <IoEyeOutline  style={{width: "20px", height:"20px", color:"#333333"}}/>
          <FaArrowRotateLeft style={{width: "20px", height:"20px", color:"#333333"}}/>
          <BiSolidCoinStack style={{width: "20px", height:"20px", color:"#FFB238"}}/>
          <HiOutlineBellAlert style={{width: "20px", height:"20px", color:"#00AC4F"}}/>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="ordList_data_div">
        <TitleBar title="Event Order Lists" />
        <div className="ordList_white_bg">
          <TopBar titleheading="Event Order Lists" />

          <div className="ordList_table_div">
            <div className="ordList_table_search">
              <div className="ordList_table_icon">
                <IoSearchSharp />
              </div>
              <div className="ordList_table_icon_content">
                <input type="text" placeholder="Search here..." />
              </div>
            </div>

            <div className="ordList_filter_btn">
              <ViewMoreButton style={{ color: "#333333" }}>
                Export CSV
              </ViewMoreButton>

              <RedBordButton  style={{ fontSize: "16px"}}>
                   Send Invitation
              </RedBordButton>

              <GreyfilterButton className="ordList_filter_icon">
                <LuFilter />
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
