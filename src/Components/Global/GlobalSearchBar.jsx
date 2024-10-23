import React from 'react'
import styled from "styled-components";
import { IoSearchOutline } from "react-icons/io5";




export const GlobalSearchBar = ({search }) => {
  return (
    <Root>
    <div className="search_div">
      <div className="icon_div">
      <IoSearchOutline/>

      </div>

      <div className="icon_content">
        <input type="text" placeholder={search} />
      </div>
    </div>
  </Root>
  )
}

const Root = styled.section`
  .search_div {
    border: 1px solid #e5e1e1;
    background-color: #ffffff;
    height: 55px;
    display: flex;
    gap: 15px;
    align-items: center;
    padding: 0 20px;
    border-radius: 40px;
    .icon_div {
      width: 3%;
      svg {
        color: #718ebf;
        width: 35px;
        height: 35px;
      }
    }

    .icon_content {
      width: 97%;
      cursor: pointer;
      input[type="text"] {
        font-family: Poppins;
font-size: 14px;
font-weight: 400;
line-height: 21px;
text-align: left;

      }

      input[type="text"]::placeholder {
        color: #8ba3cb;
      }
    }
  }
`;
