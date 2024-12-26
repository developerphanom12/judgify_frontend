import React, { useEffect, useState } from "react";
import { IoMdInformationCircle } from "react-icons/io";
import TimePicker from "react-time-picker";
import { useNavigate, useParams } from "react-router-dom";
import {
  GreyBorderButton,
  RedBackgroundButton,
} from "../../../../Global/GlobalButton";
import {
  CheckboxInput,
  CheckLabel,
  InputLabel,
  InputType,
} from "../../../../Global/GlobalFormElement";
import { TitleBar } from "../../../../Global/TitleBar/TitleBar";
import { TopBar } from "../../../TopBar/TopBar";
import axios from "axios";
import { EXCHNAGE_URL } from "../../../../../Url/Url";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ScoreCardData from "../ScoreCard/ScoreCardData";
const UpdateJuryRound = () => {

     const eventIdGet = useSelector((state) => state?.users?.eventIdGet || "");
      const initialEventId = String(eventIdGet);
      const { roundId } = useParams();
    
      const [selectedButton, setSelectedButton] = useState(0);
      const [time, setTime] = useState("00:00");
      const [selected, setSelected] = useState([]);
      const navigate = useNavigate();
    
    
      const [startDate, setStartDate] = useState('');
      const [startTime, setStartTime] = useState('');
      const [endDate, setEndDate] = useState('');
      const [endTime, setEndTime] = useState('');

       const [checkboxValues, setCheckboxValues] = useState({
          isActive: false,
          isOneAtATime: false,
          isIndividualCategoryAssigned: false,
          isCompletedSubmission: false,
          isJuryPrintSendAll: false,
          isScoringDropdown: false,
          isCommentsBoxJudging: false,
          isDataSinglePage: false,
          isTotal: false,
          isJuryOthersScore: false,
          isAbstain: false
        });
        const [overallScore, setOverallScore] = useState('');
        const [submissionLimit, setSubmissionLimit] = useState('0');
      

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxValues(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

//   const requestData = {
//     getData: () => ({
//       eventId:initialEventId,
//       start_date: startDate,
//       roundId: roundId,
//       start_time: startTime,
//       end_date: endDate,
//       end_time: endTime,
//       is_active: checkboxValues.isActive ? 1 : 0,
//       is_one_at_a_time: checkboxValues.isOneAtATime ? 1 : 0,
//       is_individual_category_assigned: checkboxValues.isIndividualCategoryAssigned ? 1 : 0,
//       is_Completed_Submission: checkboxValues.isCompletedSubmission ? 1 : 0,
//       is_jury_print_send_all: checkboxValues.isJuryPrintSendAll ? 1 : 0,
//       is_scoring_dropdown: checkboxValues.isScoringDropdown ? 1 : 0,
//       is_comments_box_judging: checkboxValues.isCommentsBoxJudging ? 1 : 0,
//       is_data_single_page: checkboxValues.isDataSinglePage ? 1 : 0,
//       is_total: checkboxValues.isTotal ? 1 : 0,
//       is_jury_others_score: checkboxValues.isJuryOthersScore ? 1 : 0,
//       is_abstain: checkboxValues.isAbstain ? 1 : 0,
//       overall_score: submissionLimit === '0' ? 0 : submissionLimit,
      
//     })
//   };

  const token = localStorage.getItem('token'); 

const updateRoundData = async () =>{
    // navigate("/jury-round")
    const requestData = {
        eventId:initialEventId,
      start_date: startDate,
      roundId: roundId,
      start_time: startTime,
      end_date: endDate,
      end_time: endTime,
      is_active: checkboxValues.isActive ? 1 : 0,
      is_one_at_a_time: checkboxValues.isOneAtATime ? 1 : 0,
      is_individual_category_assigned: checkboxValues.isIndividualCategoryAssigned ? 1 : 0,
      is_Completed_Submission: checkboxValues.isCompletedSubmission ? 1 : 0,
      is_jury_print_send_all: checkboxValues.isJuryPrintSendAll ? 1 : 0,
      is_scoring_dropdown: checkboxValues.isScoringDropdown ? 1 : 0,
      is_comments_box_judging: checkboxValues.isCommentsBoxJudging ? 1 : 0,
      is_data_single_page: checkboxValues.isDataSinglePage ? 1 : 0,
      is_total: checkboxValues.isTotal ? 1 : 0,
      is_jury_others_score: checkboxValues.isJuryOthersScore ? 1 : 0,
      is_abstain: checkboxValues.isAbstain ? 1 : 0,
      overall_score: submissionLimit === '0' ? 0 : submissionLimit,
      };
      try {
        const response = await axios.post(
            `${EXCHNAGE_URL}/updateGenSettings`, 
            requestData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          toast.success("Round Data Updated Successfully.")
          console.log('Round updated successfully:', response.data);
          console.log(response.data)
          navigate('/jury-round');
      } catch (error) {
        console.error('Error updating round:', error);

      }
}
   useEffect(() => {
      const fetchData = async () => {
        try {
          const eventId = initialEventId;
          const response = await axios.get(`${EXCHNAGE_URL}/roundget?roundId=${roundId}`,{
            headers: {
              'Authorization': `Bearer ${token}`,  
              'Content-Type': 'application/json', 
            }
          }); 
          const data = response.data.data;
          console.log(data, "daadaddadadadd")
    
          setStartDate(data.start_date);
          setStartTime(data.start_time);
          setEndDate(data.end_date);
          setEndTime(data.end_time);
    
          setCheckboxValues({
            isActive: data.is_active === 1, 
            isOneAtATime: data.is_one_at_a_time === 1,
            isIndividualCategoryAssigned: data.is_individual_category_assigned === 1,
            isCompletedSubmission: data.is_Completed_Submission === 1,
            isJuryPrintSendAll: data.is_jury_print_send_all === 1,
            isScoringDropdown: data.is_scoring_dropdown === 1,
            isCommentsBoxJudging: data.is_comments_box_judging === 1,
            isDataSinglePage: data.is_data_single_page === 1,
            isTotal: data.is_total === 1,
            isJuryOthersScore: data.is_jury_others_score === 1,
            isAbstain: data.is_abstain === 1
          });
    
          // setOverallScore(data.overall_score);
          setSubmissionLimit(data.overall_score || '0'); 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, [])

    const buttons = [
        { id: 1, label: "General Settings", status: "General Settings" },
        { id: 2, label: "Scorecards (0)", status: "Scorecards (0)" },
      ];
    
      const handleClick = (index) => {
        setSelectedButton(index);
      };
    
      const options = [
        { label: "BEST B2B ECOMMERCE", value: "grapes" },
        { label: "BEST DIGITAL AGENCY OF THE YEAR", value: "mango" },
        { label: "BEST ECOMMERCE TECHNOLOGY INNOVATION", value: "strawberry" },
        {
          label: "BEST INNOVATION IN ECOMMERCE DELIVERY/LOGISTICS",
          value: "strawberry",
        },
      ];

  return (
    <div>
         <div className="create-jury-round_div">
           <TitleBar title="Jury Round" />
           <div className="create-jury-round_white_bg">
             <TopBar titleheading="Create a new Jury Round" />
             <div className="create-jury-round_click">
               {buttons.map((button, index) => (
                 <button
                   key={button.id}
                   onClick={() => handleClick(index)}
                   className={selectedButton === index ? "selected" : ""}
                 >
                   {button.label}
                 </button>
               ))}
             </div>
             {selectedButton === 0 && (
               <>
                 <div className="create_jury_row">
                   <div className="create_jury_closing_label">
                     <div className="create_jury_clos_label">
                       <InputLabel>
                         Start Date
                         <span style={{ color: "#c32728" }}>*</span>
                       </InputLabel>
   
                       <div className="create_jury_date_time">
                         <InputType
                           type="date"
                           id="closing_date"
                           name="closing_date"
                           value={startDate}
                           onChange={(e) => setStartDate(e.target.value)}
                         />
   
                         <TimePicker
                           // onChange={(value) => {
                           //   setTime(value);
                           // }}
                           // value={time}
                           onChange={setStartTime}
                           value={startTime}
                           disableClock={true}
                         />
                       </div>
                     </div>
                   </div>
   
                   <div className="create_jury_closing_label">
                     <div className="create_jury_clos_label">
                       <InputLabel>
                         End Date
                         <span style={{ color: "#c32728" }}>*</span>
                       </InputLabel>
   
                       <div className="create_jury_date_time">
                         <InputType
                           type="date"
                           id="closing_date"
                           name="closing_date"
                           value={endDate}
                           onChange={(e) => setEndDate(e.target.value)}
                         />
   
                         <TimePicker
                           // onChange={(value) => {
                           //   setTime(value);
                           // }}
                           // value={time}
                           onChange={setEndTime}
                           value={endTime}
                           disableClock={true}
                         />
                       </div>
                     </div>
                   </div>
                 </div>
   
                 <div className="create_jury_content_one">
                   <div className="create_jury_content_row">
                     <div className="create_jury_content_column">
                       <div className="create_jury_check">
                         <CheckboxInput
                           type="checkbox"
                           name="isActive"
                           checked={checkboxValues.isActive}
                           onChange={handleCheckboxChange}
                         />
                         <CheckLabel>Active</CheckLabel>
                       </div>
   
                       <div className="create_jury_check">
                         <CheckboxInput
                           type="checkbox"
                           name="isIndividualCategoryAssigned"
                           checked={checkboxValues.isIndividualCategoryAssigned}
                           onChange={handleCheckboxChange}
                         />
                         <CheckLabel>
                           Allow the Jury to confirm scores for individual
                           categories assigned
                         </CheckLabel>
                       </div>
   
                       <div className="create_jury_check">
                         <CheckboxInput
                           type="checkbox"
                           name="isJuryPrintSendAll"
                           checked={checkboxValues.isJuryPrintSendAll}
                           onChange={handleCheckboxChange}
                         />
                         <CheckLabel>
                           Allow the Jury to print & send score for all completed
                           submissions
                         </CheckLabel>
                       </div>
   
                       <div className="create_jury_check">
                         <CheckboxInput
                           type="checkbox"
                           name="isCommentsBoxJudging"
                           checked={checkboxValues.isCommentsBoxJudging}
                           onChange={handleCheckboxChange}
                         />
                         <CheckLabel>Show comments box during judging</CheckLabel>
                       </div>
   
                       <div className="create_jury_check">
                         <CheckboxInput
                           type="checkbox"
                           name="isTotal"
                           checked={checkboxValues.isTotal}
                           onChange={handleCheckboxChange}
                         />
                         <CheckLabel>Display Total Score</CheckLabel>
                       </div>
   
                       <div className="create_jury_check">
                         <CheckboxInput
                           type="checkbox"
                           name="isAbstain"
                           checked={checkboxValues.isAbstain}
                           onChange={handleCheckboxChange}
                         />
                         <CheckLabel>Enable Abstain</CheckLabel>
                       </div>
                     </div>
   
                     <div className="create_jury_content_column">
                       <div className="create_jury_check">
                         <CheckboxInput
                           type="checkbox"
                           name="isOneAtATime"
                           checked={checkboxValues.isOneAtATime}
                           onChange={handleCheckboxChange}
                         />
                         <CheckLabel>
                           Allow the Jury to score one category at a time
                         </CheckLabel>
                       </div>
   
                       <div className="create_jury_check">
                         <CheckboxInput
                           type="checkbox"
                           name="isCompletedSubmission"
                           checked={checkboxValues.isCompletedSubmission}
                           onChange={handleCheckboxChange}
                         />
                         <CheckLabel>
                           Allow the Jury to confirm scores for all completed
                           submissions
                         </CheckLabel>
                       </div>
   
                       <div className="create_jury_check">
                         <CheckboxInput
                           type="checkbox"
                           name="isScoringDropdown"
                           checked={checkboxValues.isScoringDropdown}
                           onChange={handleCheckboxChange}
                         />
                         <CheckLabel>Allow drop down for scoring</CheckLabel>
                       </div>
   
                       <div className="create_jury_check">
                         <CheckboxInput
                           type="checkbox"
                           name="isDataSinglePage"
                           checked={checkboxValues.isDataSinglePage}
                           onChange={handleCheckboxChange}
                         />
                         <CheckLabel>
                           Show submission data on a single page
                         </CheckLabel>
                       </div>
   
                       <div className="create_jury_check">
                         <CheckboxInput
                           type="checkbox"
                           name="isJuryOthersScore"
                           checked={checkboxValues.isJuryOthersScore}
                           onChange={handleCheckboxChange}
                         />
                         <CheckLabel>
                           Allow the Jury to view each other's scores
                         </CheckLabel>
                       </div>
                     </div>
                   </div>
                 </div>
   
                 <div className="create_overall_score">
                   <InputLabel>Submission Limit</InputLabel>
                   <CheckLabel>
                     This is the calculated overall score of a submission for this
                     round.
                   </CheckLabel>
                   {/* <div className="create_overall">
                     <InputType 
                     type="text"
                     value={overallScore} 
                     onChange={(e) => setOverallScore(e.target.value)} 
                     />
                     <IoMdInformationCircle />
                   </div> */}
                   <div className="create_overall">
                     <select
                       value={submissionLimit}
                       onChange={(e) => setSubmissionLimit(e.target.value)}
                       className="submission-limit-dropdown"
                     >
                       <option value="0">Select a Category</option>
                       <option value="{Total Score}">Total Score</option>
                       <option value="{Total Number of Assigned Judges}">Total Number of Assigned Judges</option>
                       <option value="{Total Number of Shortlisted Submissions}">Total Number of Shortlisted Submissions</option>
                     </select>
                     <IoMdInformationCircle />
                   </div>
                 </div>
   
                 <div className="create_jury_btndiv">
                   <GreyBorderButton>Back to Jury Rounds</GreyBorderButton>
                   <RedBackgroundButton
                     
                     onClick={updateRoundData}
                   >
                     Update
                   </RedBackgroundButton>
                 </div>
               </>
             )}
   
             {selectedButton === 1 && (
             <ScoreCardData/>
             )}
           </div>
         </div>
       </div>
  )
}

export default UpdateJuryRound
