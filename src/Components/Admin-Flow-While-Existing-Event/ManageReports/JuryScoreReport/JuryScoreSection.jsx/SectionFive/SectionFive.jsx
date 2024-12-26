import React from 'react'
import "./SectionFive.scss";
import { Description, GreenSubDescription } from '../../../../../Global/GlobalText';
import { GreyBorderButton, RedBackgroundButton } from '../../../../../Global/GlobalButton';

export const SectionFive = ({ setSelectedButton }) => {
  return (
    <div>
              <div className="section_five_main">
                <GreenSubDescription>Preparing Data Successfully</GreenSubDescription>
                  <div className='section_five_content'>  
                     <Description>Your Data is ready to export.</Description>
                     <Description>Click <b>"Export"</b> to Continue.</Description>
                  </div>



                  

                
              </div>
              <div className="section_five_btn">
               <GreyBorderButton  onClick={() => setSelectedButton(4)}>Previous</GreyBorderButton>
               <RedBackgroundButton>Export</RedBackgroundButton>
               </div>

    </div>
  )
}
