import React, { useEffect, useState } from "react";
import "./TitleBar.scss";
import { RedMainHeading } from "../GlobalText";
import { IoSearchSharp } from "react-icons/io5";
// import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import adminimg from "../../../Assets/adminimg.jpg";
import { useSelector } from "react-redux";
import { EXCHNAGE_URL } from "../../../Url/Url";

export const TitleBar = ({ title, showSearch = true,onSearch  }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const userDetails = useSelector((state) => state.users.user);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timer); // Cleanup previous timer
  }, [searchQuery]);
  useEffect(() => {
    if (debouncedQuery) {
      handleSearch(debouncedQuery);
    } else {
      setSearchResults([]); // Clear results if query is empty
    }
  }, [debouncedQuery]);

  const handleSearch = async (search) => {
    try {
      const response = await fetch(`${EXCHNAGE_URL}/SearchEvent?search=${search}`);
      const data = await response.json();
      if (response.ok) {
        setSearchResults(data.data.data); // Update with results
      } else {
        console.error(data.data.message); // Handle error
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value); // Update the query immediately
  };
  return (
    <div className="titlebar_div">
      <RedMainHeading className="titlbar_head">{title}</RedMainHeading>

      {/* Conditionally render the search bar */}
      {showSearch && (
        <div className="search_div">
          <div className="icon_div">
            <IoSearchSharp />
          </div>
          <div className="icon_content">
            <input
              type="text"
              placeholder="Search Events"
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}

      <div className="admin_div">
        <img src={adminimg} alt="admin_login" />
        <span>{userDetails?.first_name || "Kathryn Murphy"}</span>
        {/* <MdOutlineKeyboardArrowDown /> */}
      </div>
      {searchResults && searchResults.length > 0 && (
        <div className="search_results">
          {searchResults.map((result, index) => (
            <div key={index} className="search_result_item">
              {result.name || "Event Name"}{" "}
              {/* Adjust key based on API response */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
