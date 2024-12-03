import axios from "axios";
import React, { useEffect, useState } from "react";
import FormCanvas from "./RegistrationChild/FormCanvas";
import Side from "./RegistrationChild/Side";
import FormPreview from "./RegistrationChild/FormPreview";
import { RedBackgroundButton } from "../../../Global/GlobalButton";
import "./RegistrationForm.css";
import { SubHeading } from "../../../Global/GlobalText";

export const RegistrationForm = () => {
  const [fields, setFields] = useState([]);
  const [formId, setFormId] = useState(null); // State to store the form ID after saving
  const [isPreview, setIsPreview] = useState(false); // State to toggle between builder and preview

  // Default fields to be added before user selects any field
  const defaultFields = [
    {
      type: "text",
      label: "First Name",
      dataName: `firstName-${Date.now()}`,
      placeholder: "Enter first name...",
      required: true, // Make First Name required
      charLimitRequired: false,
      wordLimit: "",
      fieldSize: "100%",
      defaultValue: "",
      isDefault: true, // Flag to indicate it's a default field
    },
    {
      type: "text",
      label: "Last Name",
      dataName: `lastName-${Date.now()}`,
      placeholder: "Enter last name...",
      required: true, // Make Last Name required
      charLimitRequired: false,
      wordLimit: "",
      fieldSize: "100%",
      defaultValue: "",
      isDefault: true, // Flag to indicate it's a default field
    },
    {
      type: "email",
      label: "Email",
      dataName: `email-${Date.now()}`,
      placeholder: "Enter email...",
      required: true, // Make Email required
      isDefault: true, // Flag to indicate it's a default field
    },
    {
      type: "country",
      label: "Country",
      dataName: `country-${Date.now()}`,
      options: ["USA", "India", "Canada"],
      required: true, // Make Country required
      isDefault: true, // Flag to indicate it's a default field
    },
  ];

  // Function to add a new field
  const addField = (type) => {
    const newField = {
      label: {
        type: "label",
        label: "label Text",
        dataName: `label-${Date.now()}`,
        adminLabel: "label Admin Label",
        description: "<p>This is an HTML description for the label.</p>",
        size: "h1",
      },
      text: {
        type: "text",
        label: "Single Line Text",
        dataName: `text-${Date.now()}`,
        placeholder: "Enter text...",
        charLimitRequired: false,
        wordLimit: "",
        fieldSize: "100%",
        defaultValue: "",
      },
      textarea: {
        type: "textarea",
        label: "Paragraph Text",
        dataName: `textarea-${Date.now()}`,
        charLimitRequired: false,
        wordLimitRequired: false,
        charLimit: "",
        wordLimit: "",
        fieldSize: "100%",
        defaultValue: "",
      },
      radio: {
        type: "radio",
        label: "Radio Button",
        dataName: `radio-${Date.now()}`,
        options: ["Option 1", "Option 2"],
      },
      checkbox: {
        type: "checkbox",
        label: "Checkbox",
        dataName: `checkbox-${Date.now()}`,
        options: ["Option 1", "Option 2"],
      },
      dropdown: {
        type: "dropdown",
        label: "Dropdown",
        dataName: `dropdown-${Date.now()}`,
        options: ["Option 1", "Option 2", "Option 3"],
      },
      email: {
        type: "email",
        label: "Email",
        dataName: `email-${Date.now()}`,
        placeholder: "Enter email...",
      },
      tel: {
        type: "tel",
        label: "Phone Number",
        dataName: `tel-${Date.now()}`,
        placeholder: "Enter phone number...",
      },
      date: {
        type: "date",
        label: "Date Picker",
        dataName: `date-${Date.now()}`,
      },
      country: {
        type: "country",
        label: "Country List",
        dataName: `country-${Date.now()}`,
        options: ["USA", "India", "Canada"],
      },
      file: {
        type: "file",
        label: "File Upload",
        dataName: `file-${Date.now()}`,
      },
    };

    setFields([...fields, newField[type]]);
  };

  // Function to update a field
  const updateField = (updatedFields) => {
    setFields(updatedFields); // Update state to trigger re-render
  };

  // Function to remove a field (prevent removal of default fields)
  const removeField = (index) => {
    const fieldToRemove = fields[index];
    if (
      fieldToRemove.isDefault // Check if it's a default field
    ) {
      alert("This field cannot be removed.");
    } else {
      setFields(fields.filter((_, i) => i !== index));
    }
  };

  // Function to save the form and switch to preview
  const saveForm = () => {
    axios
      .post("http://localhost:5000/api/form", {
        name: "Sample Form",
        schema: fields,
      })
      .then((response) => {
        setFormId(response.data.id); // Store the form ID for preview
        setIsPreview(true); // Switch to preview mode
      })
      .catch((error) => console.error(error));
  };

  // Initially set the default fields
  useEffect(() => {
    setFields([...defaultFields]); // Set default fields when the component mounts
  }, []);

  return (
    <div>
      <div className="formapp">
        {!isPreview ? (
          <>
            <Side addField={addField}/>
            <div className="canvas-save">
              <FormCanvas
                fields={fields}
                updateField={updateField}
                removeField={removeField}
                disableRequiredCheckbox={true} //Disable Required checkbox for default fields
              />
              <div className="registratation_button">
                <RedBackgroundButton onClick={saveForm}>
                  Save Form
                </RedBackgroundButton>
              </div>
            </div>
          </>
        ) : (
          <div className="formmm-preview">
            <div className="form_preview_heading">
                 <SubHeading style={{color:"#c32728", fontWeight:600}}>Form Preview</SubHeading>
            </div>
            <FormPreview formId={formId}/>
            {/* Render the form preview component */}
            {/* <button onClick={() => setIsPreview(false)}>Back to Builder</button> */}
             <RedBackgroundButton onClick={() => setIsPreview(false)}>Back to Builder</RedBackgroundButton> 

          </div>
        )}
      </div>
    </div>
  );
};
