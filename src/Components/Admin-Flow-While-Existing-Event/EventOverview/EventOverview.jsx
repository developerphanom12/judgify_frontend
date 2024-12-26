import React from "react";
import "./EventOverview.scss";
import { TitleBar } from "../../Global/TitleBar/TitleBar";
import { TopBar } from "../TopBar/TopBar";
import {
  Description,
  DescriptionContent,
  EventHeading,
  SubHeading,
} from "../../Global/GlobalText";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ProgressBar from 'react-bootstrap/ProgressBar';


// Register required elements
ChartJS.register(ArcElement, Tooltip, Legend);

export const EventOverview = () => {
  const data = {
    labels: ["Pending", "Withdrawn", "Completed"],
    datasets: [
      {
        label: "Status",
        data: [3, 6, 76], // Values for Pending, Withdrawn, and Completed
        backgroundColor: ["#FF4D4D", "#FFB74D", "#198754"], // Colors for each section
        hoverBackgroundColor: ["#FF3333", "#FFA726", "#198754"], // Hover colors
        borderWidth: 0, // No borders around the slices
      },
    ],
  };

  const options = {
    cutout: "70%", // Inner radius for the doughnut
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
    },
  };

  return (
    <div>
      <div className="event_overview_div">
        <TitleBar title="Event Overview" />

        <div className="event_overview_white_bg">
          <TopBar titleheading="LAKME Fashion" />

          <div className="event_overview_progress_summary">
            <div className="event_overview_progress">
              <SubHeading>Jury Progress</SubHeading>
              <div className="event_overview_sub">
                <Description>
                  Category: <span style={{color:"#333333"}}>Most Admired BRAND CAMPAIGN of the Year</span>
                </Description>
                <EventHeading style={{ fontWeight: "400" }}>
                  Progress (Click on the progress bar to see the progress by
                  Judge):
                </EventHeading>

              
                <div className="prgogess_bar">

                  <DescriptionContent>{`${60} of ${100}`}</DescriptionContent>
                  <ProgressBar variant="success" now={60} />

                </div>
              </div>

              <div className="event_overview_sub">
                <Description>
                  Category: <span style={{color:"#333333"}}> Most Admired E-COMMERCE RETAILER of the Yearr</span>
                </Description>
                <EventHeading style={{ fontWeight: "400" }}>
                Progress (Click on the progress bar to see the progress by Judge):
                </EventHeading>

              
                <div className="prgogess_bar">

                  <DescriptionContent>{`${18} of ${100}`}</DescriptionContent>
                  <ProgressBar variant="success" now={18} />

                </div>
              </div>

              <div className="event_overview_sub">
                <Description>
                  Category:  <span style={{color:"#333333"}}> Most Admired CUSTOMER SERVICE 
                  INITIATIVE of the Year</span>
                </Description>
                <EventHeading style={{ fontWeight: "400" }}>
                   Progress (Click on the progress bar to see the progress by Judge):
                </EventHeading>

              
                <div className="prgogess_bar">

                  <DescriptionContent>{`${13} of ${100}`}</DescriptionContent>
                  <ProgressBar variant="success" now={13} />

                </div>
              </div>

              <div className="event_overview_sub">
                <Description>
                  Category: <span style={{color:"#333333"}}>Most Admired Experiential Retailer of the Year</span>
                </Description>
                <EventHeading style={{ fontWeight: "400" }}>
                Progress (Click on the progress bar to see the progress by Judge):
                </EventHeading>

              
                <div className="prgogess_bar">

                  <DescriptionContent>{`${15} of ${100}`}</DescriptionContent>
                  <ProgressBar variant="success" now={15} />

                </div>
              </div>


            </div>

            <div className="event_overview_summary">
              <SubHeading>Submission Summary</SubHeading>

              <div className="event_overview_chart">
                <div
                  style={{ width: "200px", height: "200px", margin: "auto" }}
                >
                  <Doughnut data={data} options={options} />
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                  }}
                >
                  <div className="event-overview_chartstatus">
                    <div className="event_overview_status_heading">
                      <span
                        style={{
                          width: "12px",
                          height: "12px",
                          backgroundColor: "#C32728",
                          marginRight: "8px",
                          borderRadius: "3px",
                        }}
                      ></span>
                      <DescriptionContent>Pending</DescriptionContent>
                    </div>
                    <DescriptionContent>3</DescriptionContent>
                  </div>

                  <div className="event-overview_chartstatus">
                    <div className="event_overview_status_heading">
                      <span
                        style={{
                          width: "12px",
                          height: "12px",
                          backgroundColor: "#FBBD1C",
                          marginRight: "8px",
                          borderRadius: "3px",
                        }}
                      ></span>
                      <DescriptionContent>Withdrawn</DescriptionContent>
                    </div>
                    <DescriptionContent style={{ marginLeft: "auto" }}>
                      6
                    </DescriptionContent>
                  </div>

                  <div className="event-overview_chartstatus">
                    <div className="event_overview_status_heading">
                      <span
                        style={{
                          width: "12px",
                          height: "12px",
                          backgroundColor: "#198754",
                          marginRight: "8px",
                          borderRadius: "3px",
                        }}
                      ></span>
                      <DescriptionContent>Completed</DescriptionContent>
                    </div>
                    <DescriptionContent style={{ marginLeft: "auto" }}>
                      76
                    </DescriptionContent>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
