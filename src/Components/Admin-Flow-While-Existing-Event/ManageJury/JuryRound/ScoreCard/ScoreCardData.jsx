
import React, { useEffect, useState } from "react";
import "../CreateJuryRound/CreateJuryRoundPost.scss";
import { IoMdAddCircleOutline, IoMdInformationCircle } from "react-icons/io";
import TimePicker from "react-time-picker";
import { useNavigate, useParams } from "react-router-dom";
import { TitleBar } from "../../../../Global/TitleBar/TitleBar";
import { TopBar } from "../../../TopBar/TopBar";
import './scoreCard.scss'
import {
  CheckboxInput,
  CheckLabel,
  InputLabel,
  InputType,
} from "../../../../Global/GlobalFormElement";
import {
  GreyBorderButton,
  RedBackgroundButton,
  RedBordButton,
} from "../../../../Global/GlobalButton";
import { RedMainHeading } from "../../../../Global/GlobalText";
import { MdEditSquare, MdOutlineSettings } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MultiSelect } from "react-multi-select-component";
import { IoCopy } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";
import { EXCHNAGE_URL } from "../../../../../Url/Url";

const ScoreCardData = ({ ScoreCardValue }) => {

  const eventIdGet = useSelector((state) => state?.users?.eventIdGet || "");
  const initialEventId = String(eventIdGet);
  const { roundId } = useParams();

  const [selected, setSelected] = useState([]);
  const [scorecardData, setScorecardData] = useState([]);
  const [formFields, setFormFields] = useState([]);


  const [isShowDivVisible, setIsShowDivVisible] = useState(false);
  const [filters, setFilters] = useState([{ id: 1 }]);
  console.log(ScoreCardValue)
  const navigate = useNavigate();
  const addFilter = () => {
    setFilters([...filters, { id: filters.length + 1 }]);
  };

  const handleRemoveFilter = (id) => {
    setFilters(filters.filter((filter) => filter.id !== id));
  };

  const toggleShowDiv = () => {
    setIsShowDivVisible((prev) => !prev);
  };

  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${EXCHNAGE_URL}/allScorecard?eventId=${eventIdGet}&roundId=${roundId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        const data = response.data.data;
        setScorecardData(data);
        console.log(data, "scorecardData")
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])

  useEffect(() => {
    if (scorecardData.length > 0) {
      const allFormFields = [];
      // Iterate over each scorecard and extract the form fields
      scorecardData.forEach((scorecard) => {
        if (scorecard.form_schema) {
          try {
            const parsedFormSchema = JSON.parse(scorecard.form_schema);

            parsedFormSchema.forEach((form) => {
              if (Array.isArray(form.fields)) {
                const extractedFields = form.fields.map((field) => ({
                  title: field.label === 'Title' ? field.value : null,
                  description: field.label === 'Description' ? field.value : null,
                  maxValue: field.maxValue || 'N/A',
                  minValue: field.minValue || 'N/A',
                }));

                allFormFields.push(...extractedFields.filter((field) => field.title || field.description));
              }
            });
          } catch (error) {
            console.error('Error parsing form schema:', error);
          }
        }
      });

      setFormFields(allFormFields);
    }
  }, [scorecardData]);

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
    <div className="create_jury_content_two">
      {isShowDivVisible && (
        <>
          <div className="create_jury_heading">
            <RedMainHeading>Scorecard 1</RedMainHeading>
          </div>

          <div className="create_jury_select_div">
            <InputLabel>Scorecard criteria</InputLabel>

            <div className="create_jury_criteria">
              <div className="create_jury_sub_criteria">
                <div className="create_jury_subb">
                  <CheckLabel>Criteria #</CheckLabel>
                </div>
                <CheckLabel>
                  Criteria title{" "}
                  <span style={{ color: "#C32728" }}> * </span>
                </CheckLabel>
              </div>

              <div className="create_jury_sub_criteria">
                <CheckLabel>
                  Criteria description{" "}
                  <span style={{ color: "#C32728" }}>*</span>
                </CheckLabel>
              </div>
            </div>

            {filters.map((filter, index) => (
              <div key={filter.id} className="create_jury_criteria">
                <div className="create_jury_sub_criteria">
                  <div className="create_jury_subb">
                    <CheckLabel className="create_jury_input">
                      {index + 1}
                    </CheckLabel>
                  </div>
                  <InputType type="text" />
                </div>

                <div
                  className="create_jury_sub_criteria"
                  style={{ cursor: "pointer" }}
                >
                  <InputType type="text" />
                  <MdOutlineSettings />
                  <RiDeleteBin6Fill
                    onClick={() => handleRemoveFilter(filter.id)}
                  />
                </div>
              </div>
            ))}
            <div>
              <RedBordButton
                className="create_jury_pluscontent"
                onClick={addFilter}
              >
                <IoMdAddCircleOutline />
                Add Score Criteria
              </RedBordButton>
            </div>
          </div>

          <div className="create_jury_select_div">
            <div className="create_jury_overall">
              <div className="create_juryoverall_head">
                <InputLabel> Overall Scorecard Value </InputLabel>
                <CheckLabel>
                  This is the calculated overall Scorecard value of
                  a submission
                </CheckLabel>
              </div>
              <InputType type="text" />
            </div>

            <div className="create_jury_overall">
              <InputLabel>
                Use this scorecard for the following Categories
              </InputLabel>
              <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
              />
            </div>
          </div>
        </>
      )}

      {/* <div className="create_jury_get_div">
      <div className="create_jury_heading">
        <RedMainHeading>Scorecard 1</RedMainHeading>
      </div>

      {scorecardData.length > 0 && scorecardData.map((scorecard, index) => (
          <div className="create_jury_gettwo_main" key={index}>
            <div className="create_jury_gettwo_div">
              {scorecard.scorecard_categories && scorecard.scorecard_categories.map((category, categoryIndex) => (
                <CheckLabel key={categoryIndex}>
                  {category.ScoreCardCategory}
                </CheckLabel>
              ))}
            </div>

        <div className="create_jury_gettwo_sub">
          <MdEditSquare onClick={toggleShowDiv} />
          <IoCopy />
          <RiDeleteBin6Fill />
        </div>
      </div>
        ))}


      <div className="create_jury_getthree_div">
      {formFields.length > 0 ? (
        formFields.map((field, index) => (
          <CheckLabel>
          <div key={index}>
            {field.title && <p>Title: {field.title}</p>}
            <p>Max Value: {field.maxValue}</p>
            <p>Min Value: {field.minValue}</p>
          </div>
          </CheckLabel>
        ))
      ) : (
        <p>No form data available</p>
      )}
      </div>

    </div> */}

      <div className="create_jury_get_div">
        {scorecardData.map((scorecard, index) => (
          <div key={index} className="create_jury_gettwo_main">
            <div className="create_jury_heading">
              <RedMainHeading>Scorecard {index + 1}</RedMainHeading>
            </div>
            <div className="create_jury_gettwo_div">
              {scorecard.scorecard_categories.map((category, categoryIndex) => (
                <CheckLabel key={categoryIndex}>
                  {category.ScoreCardCategory}
                </CheckLabel>
              ))}
              <div className="create_jury_gettwo_sub">
                <MdEditSquare onClick={toggleShowDiv} />
                <IoCopy />
                <RiDeleteBin6Fill />
              </div>
            </div>

            {/* Add this part for the edit, copy and delete icons */}


            {/* Parse the form schema and render fields */}
            <div className="create_jury_getthree_div">
              {JSON.parse(scorecard.form_schema).map((schema, schemaIndex) => (
                <div key={schemaIndex}>
                  {schema.fields.map((field, fieldIndex) => (
                    <CheckLabel key={fieldIndex}>
                      <div>
                        {field.label === 'Title' && (
                        <p>Title: {field.value}</p>
                      )}
                        {field.maxValue && <p>Max Value: {field.maxValue}</p>}
                        {field.minValue && <p>Min Value: {field.minValue}</p>}
                      </div>
                    </CheckLabel>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* {scorecardData.length > 0 && scorecardData.map((scorecard, scorecardIndex) => (
  <div className="scorecard" key={scorecardIndex}>
    <div className="scorecard-categories">
      {scorecard.scorecard_categories &&
        scorecard.scorecard_categories.map(
          (category, categoryIndex) => (
            <CheckLabel key={categoryIndex}>
              {category.ScoreCardCategory}
            </CheckLabel>
          )
        )}
    </div>

    <div className="scorecard-form-fields">
      {scorecard.form_schema && (
        <div className="form-fields">
          {JSON.parse(scorecard.form_schema).map(
            (form, formIndex) => (
              <div key={formIndex}>
                {form.fields &&
                  form.fields.map((field, fieldIndex) => (
                    <div className="field-item" key={fieldIndex}>
                      {field.label === 'Title' && (
                        <p>Title: {field.value}</p>
                      )}
                      <p>Max Value: {field.maxValue || 'N/A'}</p>
                      <p>Min Value: {field.minValue || 'N/A'}</p>
                    </div>
                  ))}
              </div>
            )
          )}
        </div>
      )}
    </div>
  </div>
))} */}

      <div className="create_jury_btndiv">
        <GreyBorderButton
          onClick={() => {
            navigate("/jury-round-data");
          }}
        >
          Back to Jury Rounds
        </GreyBorderButton>

        {isShowDivVisible && (
          <RedBackgroundButton
            onClick={() => {
              navigate(`/successfully-created-judge-round`);
            }}
          >
            {" "}
            Update{" "}
          </RedBackgroundButton>
        )}
      </div>
    </div>
  )
}

export default ScoreCardData

