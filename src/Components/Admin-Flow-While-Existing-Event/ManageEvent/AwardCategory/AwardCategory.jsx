import React from 'react'
import "./AwardCategory.scss";
import { TitleBar } from '../../../Global/TitleBar/TitleBar';
import { AwardCategories } from '../../../Admin-Creating-New-Event/MyEvents/AwardCategories/AwardCategories';

export const AwardCategory = () => {
  return (
    <div>
              <div className="event_overview_div">
                  <TitleBar title="Event Overview"/>

                  <div className="event_overview_white_bg">
                    <AwardCategories/>
                  </div>
                  
              </div>
    </div>
  )
}
