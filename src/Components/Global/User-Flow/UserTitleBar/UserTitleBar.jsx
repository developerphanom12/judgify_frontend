import React from 'react'
import "./UserTitleBar.scss";
import { UserDetails } from '../UserDetails/UserDetails';
import { RedMainHeading } from '../../GlobalText';

export const UserTitlebar = ({ title, userDetailsColor  }) => {
  return (
    <div className="usertitlebar_div">
    <RedMainHeading className='titlbar_head'>{title}</RedMainHeading>
    <UserDetails color={userDetailsColor}/>
  </div>

  
  )
}
