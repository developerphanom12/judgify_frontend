import React from 'react'
import "./TopBar.scss";
import { DescriptionContent, IconContent, RedMainHeading } from '../../Global/GlobalText';
import { SelectBorder } from '../../Global/GlobalFormElement';
import {  GreylessradiusButton } from '../../Global/GlobalButton';


export const TopBar = ({titleheading}) => {
  return (
    <div>
        <div className='topbar_div'>
            <div className='topbar_heading_div'>
                <RedMainHeading>{titleheading}</RedMainHeading>
            </div>

            <div className='topbar_draft_div'>

                <div className='topbar_entry_div'>
                    <DescriptionContent>Entrants</DescriptionContent>
                    <IconContent>0</IconContent>

                </div>

                <div className='topbar_entry_div'>
                    <DescriptionContent>Total Completed submissions</DescriptionContent>
                    <IconContent className='topbar_outof'>0 of 0</IconContent>
                </div>

                <SelectBorder style={{width: "110px"}}>
                  <option value="">Draft</option>
                  <option value="Fashion">Live</option>
                  <option value="Skin Care">Archive</option>
                </SelectBorder>

                <GreylessradiusButton>My Events</GreylessradiusButton>


            </div>
        </div>
    </div>
  )
}
