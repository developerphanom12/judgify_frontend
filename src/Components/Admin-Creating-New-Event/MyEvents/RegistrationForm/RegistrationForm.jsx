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

export const RegistrationForm = ({setSelectedButton}) => {
  const [fields, setFields] = useState([]); // Holds the fields schema (form data)
  const [registrationFormId, setRegistrationFormId] = useState(null); // State to store the form ID after saving
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
  const dispatch = useDispatch(); // Initialize dispatch
  const eventIdGet = useSelector((state) => state?.users?.eventIdGet);  
  console.log("eventID", eventIdGet);
  const initialEventId = String(eventIdGet); // Ensure it's a string
  const eventId = initialEventId;

  const eventRegistration = useSelector((state) => state?.users?.id); 
  console.log("eventRegistration", eventRegistration); 

  // Default fields to be added before user selects any field
  const defaultFields = [
    {
      type: "text",
      label: "First Name",
      dataName: `firstName-${Date.now()}`,
      placeholder: "Enter first name...",
      required: true,
      charLimitRequired: false,
      wordLimit: "",
      fieldSize: "100%",
      defaultValue: "",
      isDefault: true,
    },
    {
      type: "text",
      label: "Last Name",
      dataName: `lastName-${Date.now()}`,
      placeholder: "Enter last name...",
      required: true,
      charLimitRequired: false,
      wordLimit: "",
      fieldSize: "100%",
      defaultValue: "",
      isDefault: true,
    },
    {
      type: "email",
      label: "Email",
      dataName: `email-${Date.now()}`,
      placeholder: "Enter email...",
      required: true,
      isDefault: true,
    },
    {
      type: "country",
      label: "Country",
      dataName: `country-${Date.now()}`,
      options: ["USA", "India", "Canada"],
      required: true,
      isDefault: true,
    },
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
    if (fieldToRemove.isDefault) {
      alert("This field cannot be removed.");
    } else {
      setFields(fields.filter((_, i) => i !== index));
    }
  };

  // Function to save the form and switch to preview
  const saveForm = () => {
    if (!eventId) {
      console.error("Event ID is missing.");
      alert("Event ID is missing. Please check and try again.");
      return;
    }

    const formPayload = { form_schema: fields, eventId }; // Include eventId in the payload

    if (registrationFormId) {
      // If registrationFormId exists, fetch the existing form
      axios
        // .get(`http://localhost:3600/api/admin/registrationForm/${eventId}/?registrationFormId=${registrationFormId}`)
        .get(`${EXCHNAGE_URL}/registrationForm/${eventId}/?registrationFormId=${registrationFormId}`)
        .then((response) => {
          const existingForm = response.data;

          // Compare existing schema with current schema
          if (JSON.stringify(existingForm.form_schema) !== JSON.stringify(fields)) {
            // If the form schema is different, update the existing form
            axios
              .put(`${EXCHNAGE_URL}/registrationForm/${eventId}/?registrationFormId=${registrationFormId}`, formPayload)

              // .put(`http://localhost:3600/api/admin/registrationForm/${eventId}/?registrationFormId=${registrationFormId}`, formPayload)
              .then(() => {
                setShowModal(true); // Open modal after updating the form
                alert("Form updated successfully.");
              })
              .catch((error) => {
                console.error("Error updating form:", error);
                alert("Error updating form. Please try again.");
              });
          } else {
            setShowModal(true); // Open modal without changes if the schema is the same
          }
        })
        .catch((error) => {
          console.error("Error fetching existing form data:", error);
          alert("Error fetching existing form. Please try again.");
        });
    } else {
      // If no registrationFormId exists (new form), create a new entry
      axios
        .post(`${EXCHNAGE_URL}/registrationForm`, formPayload) // Send formPayload with eventId in the body

        // .post("http://localhost:3600/api/admin/registrationForm", formPayload)

        .then((response) => {
          const newRegistrationFormId = response.data.id; // Get the new form ID from the response
          setRegistrationFormId(newRegistrationFormId); // Dispatch the action to store the ID in Redux
          dispatch({ type: SET_REGISTRATION_FORM_ID, payload: newRegistrationFormId });
          setShowModal(true); // Open modal after saving the new form
          alert("Form saved successfully.");
        })
        .catch((error) => {
          console.error("Error creating form:", error);
          alert("Error creating form. Please try again.");
        });
    }
  };

  // Initially set the default fields only once

  // useEffect(() => {
  //   setFields([...defaultFields]); 
  // }, []);
  useEffect(() => {
    const registrationFormId = "27"; // Hardcoded registrationFormId = 3
  
    // Fetch the form data based on hardcoded values
    axios
      .get(`http://localhost:3600/api/admin/registrationForm?eventId=${eventId}&registrationFormId=${registrationFormId}`)
      .then((response) => {
        const fetchedFields = response.data?.data?.form_schema; // Get the stringified form_schema
        
        if (fetchedFields) {
          // Parse the stringified JSON into an array
          const parsedFields = JSON.parse(fetchedFields);
          setFields(parsedFields); // Set the parsed fields to state
        } else {
          console.error("No form schema data available.");
          // alert("Error: No form schema data available.");
          setFields(defaultFields); // Fallback to default fields
        }
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
        // alert("Error fetching form data. Please try again.");
        setFields(defaultFields); // Fallback to default fields in case of error
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts
  
  return (
    <div>
      <div className="formapp">
        <Side addField={addField}/>
        <div className="canvas-save">
          <FormCanvas
            fields={fields}
            updateField={updateField}
            removeField={removeField}
            disableRequiredCheckbox={true} // Disable the "required" checkbox for default fields
          />
          <div className="registratation_button">
           <GreyBackgroundButton onClick={() => setShowModal(true)}>Preview</GreyBackgroundButton>
           <RedBackgroundButton onClick={saveForm}>Save</RedBackgroundButton>
           <GreyBorderButton onClick={() => setSelectedButton(4)}>Next</GreyBorderButton>
          </div>
        </div>
      </div>

      {/* {/ Form Preview Modal/} */}
      <FormPreview
        formSchema={fields}
        showModal={showModal}
        handleClose={() => setShowModal(false)} // Close modal
      />
    </div>
  );
};



