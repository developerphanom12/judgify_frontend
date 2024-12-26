import React, { useState } from "react";
import "./JuryScoreReport.scss";
import { TopBar } from "../../TopBar/TopBar";
import { TitleBar } from "../../../Global/TitleBar/TitleBar";
import { SlArrowRight } from "react-icons/sl";
import { SectionOne } from "./JuryScoreSection.jsx/SectionOne/SectionOne";
import { SectionTwo } from "./JuryScoreSection.jsx/SectionTwo/SectionTwo";
import { SectionThree } from "./JuryScoreSection.jsx/SectionThree/SectionThree";
import { SectionFour } from "./JuryScoreSection.jsx/SectionFour/SectionFour";
import { SectionFive } from "./JuryScoreSection.jsx/SectionFive/SectionFive";

export const JuryScoreReport = () => {
  const [selectedButton, setSelectedButton] = useState(1);

  const buttons = [
    { id: 1, label: "Step 1" },
    { id: 2, label: "Step 2" },
    { id: 3, label: "Step 3" },
    { id: 4, label: "Step 4" },
    { id: 5, label: "Step 5" },
  ];

  const handleClick = (id) => {
    setSelectedButton(id);
  };

  return (
    <div>
      <div className="juryscore_data_div">
        <TitleBar title="Jury Score Report" />
        <div className="juryscore_white_bg">
          <TopBar titleheading="Jury Score Report" />
          <div className="juryscore_radio">
            <div className="juryscore_btn_click">
              {buttons.map((button, index) => (
                <React.Fragment key={button.id}>
                  <button
                    onClick={() => handleClick(button.id)}
                    className={selectedButton === button.id ? "selected" : ""}
                  >
                    {button.label}
                  </button>
                  {/* Render the arrow icon between buttons (except after the last button) */}
                  {index < buttons.length - 1 && <SlArrowRight />}
                </React.Fragment>
              ))}
            </div>


          </div>

          <div className="juryscore_content">
              {selectedButton === 1 && 
              <>
                  <SectionOne setSelectedButton={setSelectedButton}/>
              </>
              }

              {selectedButton === 2 &&
              <>
                   <SectionTwo setSelectedButton={setSelectedButton}/>
              </>
              }

              {selectedButton === 3 && <>
                  <SectionThree setSelectedButton={setSelectedButton}/>
              </>}

              {selectedButton === 4 && <>
              
                <SectionFour setSelectedButton={setSelectedButton}/>
                
                </>}

              {selectedButton === 5 && <>
                <SectionFive setSelectedButton={setSelectedButton}/>
              </>}
            </div>



        </div>
      </div>
    </div>
  );
};
