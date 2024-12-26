import React, { useEffect, useState } from 'react'
import "./TopBar.scss";
import { DescriptionContent, IconContent, RedMainHeading } from '../../Global/GlobalText';
import { SelectBorder } from '../../Global/GlobalFormElement';
import {  GreylessradiusButton } from '../../Global/GlobalButton';
import { useSelector } from 'react-redux';
import { EXCHNAGE_URL } from '../../../Url/Url';
import axios from 'axios';


export const TopBar = ({titleheading}) => {
  const eventIdGet = useSelector((state) => state?.users?.eventIdGet || "");
  const initialEventId = String(eventIdGet);
  const [selectedStatus, setSelectedStatus] = useState('Draft'); 
  const [statusFlags, setStatusFlags] = useState({
    is_live: 0,
    is_draft: 0,
    is_archive: 0,
  });

  const token = localStorage.getItem("token")
  const handleStatusChange = async (e) => {
    const selectedValue = e.target.value;

    
    let updatedFlags = {
      is_live: 0,
      is_draft: 0,
      is_archive: 0,
    };

    if (selectedValue === 'Live') {
      updatedFlags.is_live = 1;
    } else if (selectedValue === 'Draft') {
      updatedFlags.is_draft = 1;
    } else if (selectedValue === 'Archive') {
      updatedFlags.is_archive = 1;
    }

    setSelectedStatus(selectedValue);
    setStatusFlags(updatedFlags);

    try {
      const response = await axios.post(`${EXCHNAGE_URL}/eventStatus`, 
       { eventId: initialEventId, 
        ...updatedFlags,  
       },
       { 
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      },
      );

      if (response.data.status === true) {
        console.log('Event status updated successfully:', response.data.message);
      } else {
        console.error('Failed to update event status:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating event status with axios:', error);
    }
  };

  useEffect(() => {
    const storedStatus = localStorage.getItem(`eventStatus_${initialEventId}`); 
    if (storedStatus) {
      setSelectedStatus(storedStatus); 
      updateStatusFlags(storedStatus); 
    } else {
     
      setSelectedStatus('Draft');
      updateStatusFlags('Draft');
    }
  }, [initialEventId])
  
  const updateStatusFlags = (status) => {
    let updatedFlags = {
      is_live: 0,
      is_draft: 0,
      is_archive: 0,
    };

    if (status === 'Live') {
      updatedFlags.is_live = 1;
    } else if (status === 'Draft') {
      updatedFlags.is_draft = 1;
    } else if (status === 'Archive') {
      updatedFlags.is_archive = 1;
    }

    setStatusFlags(updatedFlags);
  };

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

                <SelectBorder style={{width: "110px"}} value={selectedStatus} onChange={handleStatusChange}>
                  <option value="Draft">Draft</option>
                  <option value="Archive">Archive</option>
                  <option value="Live">Live</option>
                </SelectBorder>

                <GreylessradiusButton>My Events</GreylessradiusButton>


            </div>
        </div>
    </div>
  )
}
