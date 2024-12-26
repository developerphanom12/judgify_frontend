import React, { useState } from "react";
import "./CustomiseAllocation.scss";
import { TitleBar } from "../../../Global/TitleBar/TitleBar";
import { TopBar } from "../../TopBar/TopBar";
import { IoSearchSharp } from "react-icons/io5";
import {
  CreateButton,
  RedBordButton,
  ViewMoreButton,
} from "../../../Global/GlobalButton";
import { InputLabel, SelectBorder } from "../../../Global/GlobalFormElement";
import { GlobalTable } from "../../../Global/GlobalTable/GlobalTable";

export const CustomiseAllocation = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    "Submission ID",
    "Title",
    "Submitted by Username",
    "Category",
    "Status",
  ];

  const data = [
    {
      "Submission ID": (
        <div className="custom_allocat_search">
          <div className="custom_allocat_search_icon">
            <IoSearchSharp />
          </div>
          <div className="custom_allocat_search_content">
            <input type="text" placeholder="Search here..." />
          </div>
        </div>
      ),
      Title: (
        <div className="custom_allocat_search">
          <div className="custom_allocat_search_icon">
            <IoSearchSharp />
          </div>
          <div className="custom_allocat_search_content">
            <input type="text" />
          </div>
        </div>
      ),
      "Submitted by Username": (
        <div className="custom_allocat_search">
          <div className="custom_allocat_search_icon">
            <IoSearchSharp />
          </div>
          <div className="custom_allocat_search_content">
            <input type="text" />
          </div>
        </div>
      ),
      Category: (
        <div className="custom_allocat_search">
          <div className="custom_allocat_search_icon">
            <IoSearchSharp />
          </div>
          <div className="custom_allocat_search_content">
            <input type="text" />
          </div>
        </div>
      ),

      Status: (
        <div className="custom_allocat_search">
          <div className="custom_allocat_search_icon">
            <IoSearchSharp />
          </div>
          <div className="custom_allocat_search_content">
            <input type="text" />
          </div>
        </div>
      ),
    },
    // {
    //   "Submission ID": "1",
    //   Title: "Lorem Ipsum",
    //   "Submitted by Username": "Lorem Ipsum",
    //   Category: "Lorem",
    //   Status: "Lorem",
    // },
  ];

  return (
    <div>
      <div className="custom_allocation_data_div">
        <TitleBar title="Customise Allocation"/>

        <div className="custom_allocation_white_bg">
          <TopBar titleheading="Customise Allocation"/>

          <div className="custom_allocation_select">
            <InputLabel>
              Jury Name <span style={{ color: "#C32728" }}>*</span>{" "}
            </InputLabel>
            <SelectBorder>
              <option value="Select An Option ">Select An Option</option>
            </SelectBorder>
          </div>

          <div className="custom_allocation_table_div">

            <div className="custom_allocation_table_search">
              <div className="custom_allocation_table_icon">
                <IoSearchSharp/>
              </div>
              <div className="custom_allocation_table_icon_content">
                <input type="text" placeholder="Search here..."/>
              </div>
            </div>

            <div className="custom_allocation_filter_btn">
              <CreateButton>Refresh</CreateButton>

              <ViewMoreButton style={{ color: "#333333" }}>
                Abstain
              </ViewMoreButton>

              <RedBordButton style={{ fontSize: "16px" }}>
                Non-Abstain
              </RedBordButton>
            </div>

          </div>

          <GlobalTable
            data={data}
            columns={columns}
            onRowClick={setSelectedRow}
          />
        </div>
      </div>
    </div>
  );
};
