import React from 'react';
import './TitleBar.scss';
import { RedMainHeading } from '../GlobalText';
import { IoSearchSharp } from 'react-icons/io5';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import adminimg from '../../../Assets/adminimg.jpg';

export const TitleBar = ({ title, showSearch = true }) => {
  return (
    <div className="titlebar_div">
      <RedMainHeading className='titlbar_head'>{title}</RedMainHeading>

      {/* Conditionally render the search bar */}
      {showSearch && (
        <div className="search_div">
          <div className="icon_div">
            <IoSearchSharp />
          </div>
          <div className="icon_content">
            <input type="text" placeholder="Search Events" />
          </div>
        </div>
      )}

      <div className="admin_div">
        <img src={adminimg} alt="admin_login" />
        <span>Kathryn Murphy</span>
        <MdOutlineKeyboardArrowDown />
      </div>
    </div>
  );
};
