import React, { useState, useEffect } from "react";
import axios from "axios";
import FormCanvas from "./EntryFormChild/FormCanvas";
import Side from "./EntryFormChild/Side";
import FormPreview from "./EntryFormChild/FormPreview";
import { GreyBackgroundButton, RedBackgroundButton } from "../../../Global/GlobalButton";
import "./EntryForm.css";
import { useDispatch, useSelector } from "react-redux";
import { SET_REGISTRATION_FORM_ID } from "../../../Redux/Users/action";
import { useNavigate } from "react-router-dom";

export const EntryForm = () => {
  const [fields, setFields] = useState([]); // This holds the fields schema (form data)
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
  const [fetchedForms, setFetchedForms] = useState({}); // Store fetched form data
  const dispatch = useDispatch(); // Initialize dispatch

  // Fetch event ID from Redux store
  const eventIdGet = useSelector((state) => state?.users?.eventIdGet);  
  const initialEventId = String(eventIdGet); // Ensure it's a string
  const eventId = initialEventId;

  const eventReg = useSelector((state) => state?.users?.setRegistrationFormId); 

  // Default fields to be added before user selects any field
  const defaultFields = [
    {
      type: "text",
      label: "Category", 
      dataName: `category-${Date.now()}`,
      placeholder: "Enter category...",
      required: true, 
      charLimitRequired: false,
      wordLimit: "",
      fieldSize: "100%",
      defaultValue: "",
      isDefault: true, 
      visible: true, 
    },
    {
      type: "text",
      label: "Title of the Entry", 
      dataName: `title-${Date.now()}`,
      placeholder: "Enter title...",
      required: true, 
      charLimitRequired: false,
      wordLimit: "",
      fieldSize: "100%",
      defaultValue: "",
      isDefault: true
    }
  ];

  // Function to add a new field
  const addField = (type) => {
    const newField = {
      label: {
        type: "label",
        label: "Label Text",
        dataName: `label-${Date.now()}`,
        adminLabel: "Label Admin Label",
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
        dataName: `file-${Date.now()}` 
      },
    };

    setFields([...fields, newField[type]]);
  };

  const navigate= useNavigate();
  // Function to update a field
  const updateField = (updatedFields) => {
    setFields(updatedFields);
  };

  // Function to remove a field (prevent removal of default fields)
  const removeField = (index) => {
    const fieldToRemove = fields[index];
    if (fieldToRemove.isDefault) {
      alert("This field cannot be removed.");
    } else {
      setFields(fields.filter((_, i) => i !== index));
    }
  };

  // Function to save the form
  const saveForm = () => {
    if (!eventId) {
      console.error("Event ID is missing.");
      alert("Event ID is missing. Please check and try again.");
      return;
    }

    const registrationFormIdToUse = eventReg ; // Use eventReg if available, otherwise fallback to eventId from Redux state

    if (registrationFormIdToUse) {
      // Check if the form has already been fetched
      if (!fetchedForms[registrationFormIdToUse]) {
        // Fetch existing data for the form
        axios
          .get(`http://localhost:3600/api/admin/entryForm/${eventId}/?registrationFormId=${registrationFormIdToUse}`)
          .then((response) => {
            const existingForm = response.data;
            setFetchedForms((prev) => ({
              ...prev,
              [registrationFormIdToUse]: existingForm, // Store the fetched form
            }));
            console.log("Existing form data fetched: ", existingForm);

            // Compare existing schema with current schema
            if (JSON.stringify(existingForm.form_schema) !== JSON.stringify(fields)) {
              // If the form schema is different, update the existing form
              const formPayload = { form_schema: fields, eventId };
              axios
                .put(`http://localhost:3600/api/admin/entryForm/${eventId}/?registrationFormId=${registrationFormIdToUse}`, formPayload)
                .then(() => {
                  setShowModal(true); 
                  alert("Form updated successfully.");
                })
                .catch((error) => {
                  console.error("Error updating form:", error);
                  alert("Error updating form. Please try again.");
                });
            } else {
              setShowModal(true);
              alert("No changes detected. Form preview opened.");
            }
          })
          .catch((error) => {
            console.error("Error fetching existing form data:", error);
            alert("Error fetching form data. Please try again.");
          });
      } else {
        // Use the already fetched form data
        setFields(fetchedForms[registrationFormIdToUse].form_schema);
      }
    } else {
      // If there's no registration form ID (new form), create a new entry
      const formPayload = { form_schema: fields, eventId };
      axios
        .post("http://localhost:3600/api/admin/entryform", formPayload)
        .then((response) => {
          const newRegistrationFormId = response.data.id; 
          dispatch({ type: SET_REGISTRATION_FORM_ID, payload: newRegistrationFormId });
          setShowModal(true); 
          alert("Form saved successfully.");
        })
        .catch((error) => {
          console.error("Error creating form:", error);
          alert("Error creating form. Please try again.");
        });
    }
  };

  // Initially set the default fields
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
            removeField={removeField}
            disableRequiredCheckbox={true} 
          />
          <div className="registratation_button">
            <GreyBackgroundButton onClick={() => setShowModal(true)}>Preview</GreyBackgroundButton>
            <RedBackgroundButton onClick={saveForm}>Save</RedBackgroundButton>
            <RedBackgroundButton onClick={() =>
              {
                navigate(`/event-live-preview`);
              }
            }>Publish Event</RedBackgroundButton>
          </div>
        </div>
      </div>

      {/* {/ Form Preview Modal /} */}
      <FormPreview
        formSchema={fields}
        showModal={showModal}
        handleClose={() => setShowModal(false)} // Close modal
      />
    </div>
  );
};
