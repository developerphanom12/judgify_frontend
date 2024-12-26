import React, { useEffect, useState } from "react";
import "./SubmissionId.scss";
import {
  InputLabel,
  InputType,
} from "../../../../Global/GlobalFormElement";
import {
  GreyBorderButton,
  RedBackgroundButton,
} from "../../../../Global/GlobalButton";
import { useNavigate } from "react-router-dom";
import { Description } from "../../../../Global/GlobalText";
import axios from "axios";
import { EXCHNAGE_URL } from "../../../../../Url/Url";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const SubmissionId = ({ setSelectedButton }) => {
  const navigate = useNavigate();
  const eventIdGet = useSelector((state) => state?.users?.eventIdGet || "");
  const initialEventId = String(eventIdGet);
  const [selectedRadio, setSelectedRadio] = useState("Based on Category Prefix");
  const [numberOfDigits, setNumberOfDigits] = useState(4);
  const [startFrom, setStartFrom] = useState("1");
  const [increment, setIncrement] = useState(1);
  const [prefix, setPrefix] = useState("");
  const [submissionIds, setSubmissionIds] = useState([]);
  const formatNumber = (num) => {
    return num.toString().padStart(numberOfDigits, "0");
  };

  const token = localStorage.getItem("token")

  const generateSubmissionIds = () => {
    const newSubmissionIds = [];
    const categoryPrefix = prefix ? prefix + "A" : "CatA";

    for (let i = 0; i < 3; i++) {
      const currentNumber = startFrom + i * increment;
      const formattedNumber = formatNumber(currentNumber);
      const submissionId = `${categoryPrefix}-${formattedNumber}`;
      newSubmissionIds.push(submissionId);
    }

    setSubmissionIds(newSubmissionIds);
  };

  useEffect(() => {
    generateSubmissionIds();
  }, [numberOfDigits, startFrom, increment, prefix]);


  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submissionIdToSend = submissionIds[0];
    if (!submissionIdToSend) {
      console.error("No submission ID available to send.");
      return;
    }
    try {
      const response = await axios.post(
        `${EXCHNAGE_URL}/submissionIDformat`,
        {submission_id: submissionIdToSend, eventId: eventIdGet},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      console.log(data, "data")
      toast.success("Submission ID saved SuccessFully.")
      // navigate(setSelectedButton(4));
      setSelectedButton(4);
    } catch (error) {
      console.log(error)
      toast.error("Failed to save Data")
    }
  }

  return (
    <div>
      <form className="submissionId_form">
        <div className="submissionid_format">
          <Description>
            {" "}
            The Submission ID is the number which gets assigned to the works
            submitted by participants.{" "}
          </Description>
          <Description>
            {" "}
            *Note that the Submission ID cannot be changed once participants
            have started submitting their works.{" "}
          </Description>
        </div>

        <div className="submissionid_format">
          <InputLabel>Submission ID Format</InputLabel>
          <div className="submission_id_radio">
            <input type="radio"
              id="categoryPrefix"
              name="radio"
              value="Based on Category Prefix"
              checked={selectedRadio === "Based on Category Prefix"}
              onChange={handleRadioChange} />
            <Description>
              {" "}
              Based on Category Prefix (Order by Category Prefix){" "}
            </Description>
          </div>
          <div className="submission_id_radio">
            <input type="radio"
              id="categoryWithPrefix"
              name="radio"
              value="Running Number with Category Prefix"
              checked={selectedRadio === "Running Number with Category Prefix"}
              onChange={handleRadioChange} />
            <Description>
              {" "}
              Running Number with Category Prefix (Order by Category
              Submissions){" "}
            </Description>
          </div>
          <div className="submission_id_radio">
            <input type="radio"
              id="runningNumber"
              name="radio"
              value="Running number"
              checked={selectedRadio === "Running number"}
              onChange={handleRadioChange} />
            <Description> Running number (Order by Submissions) </Description>
          </div>
        </div>

        <div className="submissionId_row">
          <div className="submissionId_label_lg">
            <div className="event_label_cont">
              <InputLabel>Number of Digits</InputLabel>
            </div>
            <InputType type="number"
              placeholder="Enter Number of Digits eg. 4"
              value={numberOfDigits}
              onChange={(e) => {
                let newValue = Number(e.target.value);
                if (newValue > 9) {
                  newValue = 9;
                }
                if (newValue < 4) {
                  newValue = 4;
                }
                setNumberOfDigits(newValue);
              }}
            />
          </div>

          <div className="submissionId_label_lg">
            <div className="event_label_cont">
              <InputLabel>Start From </InputLabel>
            </div>
            <InputType type="text"
              placeholder="Enter the number greater than 0"
              value={startFrom}
              onChange={(e) => setStartFrom(Number(e.target.value))} />
          </div>
        </div>

        <div className="submissionId_row">
          <div className="submissionId_label_lg">
            <div className="event_label_cont">
              <InputLabel>Increment</InputLabel>
            </div>
            <InputType type="number"
              placeholder="1"
              value={increment}
              onChange={(e) => setIncrement(Number(e.target.value))} />
          </div>

          <div className="submissionId_label_lg">
            <div className="event_label_cont">
              <InputLabel>Prefix</InputLabel>
            </div>
            <InputType
              disabled={selectedRadio !== "Running number"}
              type="text"
              placeholder="IOS"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
            />
          </div>
        </div>

        <div className="submissionId_row">
          <div className="submissionId_label_lg">
            <div className="event_label_cont">
              <InputLabel>Your Submission ID Preview</InputLabel>
            </div>
            <InputType type="text"
              placeholder="CatA-0001, CatA-0002, CatB-0001"
              value={submissionIds.join(", ")}
              readOnly />
          </div>

          <div className="submissionId_label_lg">

          </div>
        </div>

        <div className="submissionId_btndiv">
          <GreyBorderButton
            onClick={() => {
              navigate(setSelectedButton(2));
            }}
          >
            Cancel
          </GreyBorderButton>

          <RedBackgroundButton
            disabled={startFrom === 0}
            title={startFrom === 0 ? "Enter start from number greater than 0" : ""}
           onClick={handleSubmit}
          >
            Save
          </RedBackgroundButton>
        </div>
      </form>
    </div>
  );
};
