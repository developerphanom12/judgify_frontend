import React, { useState, useEffect } from "react";
import axios from "axios";
import FormCanvas from "./RegistrationChild/FormCanvas";
import Side from "./RegistrationChild/Side";
import FormPreview from "./RegistrationChild/FormPreview";
import { GreyBackgroundButton, GreyBorderButton, RedBackgroundButton } from "../../../Global/GlobalButton";
import "./RegistrationForm.css";
import { useDispatch, useSelector } from "react-redux";
import { SET_REGISTRATION_FORM_ID } from "../../../Redux/Users/action";
import { EXCHNAGE_URL } from "../../../../Url/Url";
import SavedForm from "./RegistrationChild/SavedForm";

export const RegistrationForm = ({ setSelectedButton, updatedField }) => {
  const [fields, setFields] = useState([]); // Holds the fields schema (form data)
  const [registrationFormId, setRegistrationFormId] = useState(null); // State to store the form ID after saving
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
  const [showSavedForm, setShowSavedForm] = useState(false); // State for showing saved form
  const [savedFormId, setSavedFormId] = useState(null); // State to hold the ID of the saved form

  const dispatch = useDispatch(); // Initialize dispatch
  const eventIdGet = useSelector((state) => state?.users?.eventIdGet);
  const eventId = String(eventIdGet); // Ensure it's a string
  
  // Default fields to be added before user selects any field
  const defaultFields = [
    { type: "text", label: "First Name", dataName: `firstName-${Date.now()}`, placeholder: "Enter first name...", required: true, visible: true, isDefault: true },
    { type: "text", label: "Last Name", dataName: `lastName-${Date.now()}`, placeholder: "Enter last name...", required: true, visible: true, isDefault: true },
    { type: "email", label: "Email", dataName: `email-${Date.now()}`, placeholder: "Enter email...", required: true, visible: true, isDefault: true },
    { type: "country", label: "Country", dataName: `country-${Date.now()}`, options: ["USA", "India", "Canada"], required: true, visible: true, isDefault: true }
  ];

  const addField = (type) => {
    const newField = {
      label: { type: "label", label: "Label Text", dataName: `label-${Date.now()}`, adminLabel: "Label Admin Label", description: "<p>This is an HTML description for the label.</p>", size: "h1" },
      text: { type: "text", label: "Single Line Text", dataName: `text-${Date.now()}`, placeholder: "Enter text...", charLimitRequired: false, wordLimit: "", fieldSize: "100%" },
      textarea: { type: "textarea", label: "Paragraph Text", dataName: `textarea-${Date.now()}`, charLimitRequired: false, wordLimitRequired: false, charLimit: "", wordLimit: "", fieldSize: "100%" },
      radio: { type: "radio", label: "Radio Button", dataName: `radio-${Date.now()}`, options: ["Option 1", "Option 2"] },
      checkbox: { type: "checkbox", label: "Checkbox", dataName: `checkbox-${Date.now()}`, options: ["Option 1", "Option 2"] },
      dropdown: { type: "dropdown", label: "Dropdown", dataName: `dropdown-${Date.now()}`, options: ["Option 1", "Option 2", "Option 3"] },
      email: { type: "email", label: "Email", dataName: `email-${Date.now()}`, placeholder: "Enter email..." },
      tel: { type: "tel", label: "Phone Number", dataName: `tel-${Date.now()}`, placeholder: "Enter phone number..." },
      date: { type: "date", label: "Date Picker", dataName: `date-${Date.now()}` },
      country: { type: "country", label: "Country List", dataName: `country-${Date.now()}`, options: ["USA", "India", "Canada"] },
      file: { type: "file", label: "File Upload", dataName: `file-${Date.now()}` },
    };

    setFields([...fields, newField[type]]);
  };

  const updateField = (updatedFields) => {
    const updatedFormFields = fields.map((field) => {
      const updatedField = updatedFields.find((updated) => updated.dataName === field.dataName);
      if (updatedField) {
        return { ...field, ...updatedField }; // Use spread operator for immutability
      }
      return field;
    });

    setFields(updatedFormFields);
  };

  const removeField = (index) => {
    const fieldToRemove = fields[index];
    if (fieldToRemove.isDefault) {
      alert("This field cannot be removed.");
    } else {
      setFields(fields.filter((_, i) => i !== index));
    }
  };

  const saveForm = () => {
    if (!eventId) {
      console.error("Event ID is missing.");
      return;
    }

    const formPayload = { form_schema: fields, eventId };

    axios.post(`${EXCHNAGE_URL}/registrationForm`, formPayload,{
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        const newRegistrationFormId = response.data.id;
        setRegistrationFormId(newRegistrationFormId);
        dispatch({ type: SET_REGISTRATION_FORM_ID, payload: newRegistrationFormId });
        setShowModal(true);
        alert("Form saved successfully.");
      })
      .catch((error) => {
        console.error("Error creating form:", error);
        alert("Error creating form. Please try again.");
      });
  };

  const fetchSavedForm = () => {
    if (!savedFormId) {
      alert("No saved form ID found.");
      return;
    }
    setShowSavedForm(true);
  };

  useEffect(() => {
    setFields([...defaultFields]);
  }, []);

  return (
    <div>
      <div className="formapp">
        <Side addField={addField} />
        <div className="canvas-save">
          <FormCanvas
            fields={fields}
            updateField={updateField}
            updatedField={updatedField}
            removeField={removeField}
            disableRequiredCheckbox={true} // Disable "required" checkbox for default fields
          />
          <div className="registratation_button">
            <GreyBackgroundButton onClick={() => setShowModal(true)}>Preview</GreyBackgroundButton>
            <RedBackgroundButton onClick={saveForm}>Save</RedBackgroundButton>
            <GreyBorderButton onClick={() => setSelectedButton(4)}>Next</GreyBorderButton>
            <GreyBorderButton onClick={fetchSavedForm}>Saved Form</GreyBorderButton>
          </div>
        </div>
      </div>

      {/* Form Preview Modal */}
      <FormPreview
        formSchema={fields}
        showModal={showModal}
        handleClose={() => setShowModal(false)} // Close modal
      />

      {/* Show Saved Form */}
      {showSavedForm && savedFormId && (
        <SavedForm registrationFormId={savedFormId} eventId={eventId} />
      )}
    </div>
  );
};
