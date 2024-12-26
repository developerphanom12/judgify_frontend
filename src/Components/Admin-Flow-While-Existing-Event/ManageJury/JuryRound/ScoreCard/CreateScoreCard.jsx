import React, { useEffect, useState } from "react";
import './scoreCard.scss'
import { useNavigate, useParams } from "react-router-dom";
import {
  CreateButton,
  GreyBackgroundButton,
  GreyBorderButton,
  RedBackgroundButton,
} from "../../../../Global/GlobalButton";
import {
  CheckLabel,
  InputLabel,
  InputType,
} from "../../../../Global/GlobalFormElement";
import { MultiSelect } from "react-multi-select-component";
import { RedContent, RedMainHeading } from "../../../../Global/GlobalText";
import { MdOutlineSettings } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from "axios";
import { EXCHNAGE_URL } from "../../../../../Url/Url";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { PiPlusCircleBold } from "react-icons/pi";
import FormCanvas from './EntryFormChild/FormCanvas';
import EditFieldModal from './EntryFormChild/EditFieldModal';

const CreateScoreCard = () => {

  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const options = [
    { label: "BEST B2B ECOMMERCE", value: "grapes" },
    { label: "BEST DIGITAL AGENCY OF THE YEAR", value: "mango" },
    { label: "BEST ECOMMERCE TECHNOLOGY INNOVATION", value: "strawberry" },
    {
      label: "BEST INNOVATION IN ECOMMERCE DELIVERY/LOGISTICS",
      value: "strawberry",
    },
  ];

  const [fields, setFields] = useState([]);
  const [currentField, setCurrentField] = useState(null);
  const [generatedSchema, setGeneratedSchema] = useState(null);
  const [titleValue, setTitleValue] = useState(""); // Dynamic title value
  const [descriptionValue, setDescriptionValue] = useState(""); // Dynamic description value


  const eventIdGet = useSelector((state) => state?.users?.eventIdGet);
  const initialEventId = String(eventIdGet);
  const eventId = initialEventId;

  const [criteriaList, setCriteriaList] = useState([
    { id: 1, value: '' }
  ]);


  const addDefaultFields = () => {
    setFields((prevFields) => [...prevFields, ...defaultFields]);
  };


    const removeField = (index) => {
    const fieldToRemove = fields[index];
    if (fieldToRemove.isDefault) {
      alert("This field cannot be removed.");
    } else {
      setFields(fields.filter((_, i) => i !== index));
    }
  };

  const defaultFields = [
    {
      fields: [
        {
          type: "text",
          label: "Title",
          dataName: `title-${Date.now()}`,
          placeholder: "Enter title...",
          value: titleValue, 
          minValue: "", 
          maxValue: "", 
        },
        {
          type: "textarea",
          label: "Description",
          dataName: `description-${Date.now()}`,
          placeholder: "Enter description...",
          value: descriptionValue, 
        },
      ],
    },
  ];

  const updateField = (updatedFields) => {
    setFields(updatedFields);
  };

  const updateTitleAndDescription = (title, description) => {
    setTitleValue(title);
    setDescriptionValue(description);
  };




  useEffect(() => {
    setFields([...defaultFields]); 
  }, []);

  return (
    <>
      <div className="create_jury_content_two">
        <div className="create_jury_heading">
          <RedMainHeading>Scorecard 1</RedMainHeading>
        </div>

        <div className="create_jury_select_div">
          <InputLabel> Scorecard criteria </InputLabel>

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

          <div>
      <div className="formappp">
        <div className="canvas-savee">
          <FormCanvas
             fields={fields}
             updateField={updateField}
             removeField={removeField}
             onGenerateSchema={setGeneratedSchema}
             titleValue={titleValue} 
             descriptionValue={descriptionValue} 
             updateTitleAndDescription={updateTitleAndDescription} 
          />
          <div className="registratation_button">
            {/* <RedBackgroundButton onClick={saveForm}>Save</RedBackgroundButton> */}
            <RedBackgroundButton onClick={addDefaultFields}>Add New Fields</RedBackgroundButton>
          </div>
        </div>
      </div>

      {/* Modal for editing fields */}
      {currentField && (
        <EditFieldModal
          field={currentField}
          onSave={(updatedField) => {
            const updatedFields = fields.map((field) =>
              field.dataName === updatedField.dataName ? updatedField : field
            );
            setFields(updatedFields);
            setCurrentField(null);
          }}
          onClose={() => setCurrentField(null)}
        />
      )}
    </div> 
        </div>

        <div className="create_jury_select_div">
          <div className="create_jury_overall">
            <div className="create_juryoverall_head">
              <InputLabel> Overall Scorecard Value </InputLabel>
              <CheckLabel>
                This is the calculated overall Scorecard value of a
                submission
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




      </div>

      <div className="create_jury_btndiv">
        <GreyBorderButton>Cancel</GreyBorderButton>
        <RedBackgroundButton

        >
          Create
        </RedBackgroundButton>
        <GreyBackgroundButton onClick={() => {
          navigate("/jury-round");
        }}

        >Create & Add New</GreyBackgroundButton>
      </div>

    </>
  )
}

export default CreateScoreCard