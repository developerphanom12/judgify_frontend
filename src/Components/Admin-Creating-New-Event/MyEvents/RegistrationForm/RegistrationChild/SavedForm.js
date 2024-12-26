import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FormPreview.css";
import { EXCHNAGE_URL } from "../../../../../Url/Url";

const SavedForm = ({ registrationFormId, eventId }) => {
  const [formData, setFormData] = useState({}); // State to hold form data
  const [formSchema, setFormSchema] = useState([]); // State to hold form schema

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleCheckboxChange = (fieldName, value) => {
    setFormData((prevData) => {
      const currentValue = prevData[fieldName] || [];
      if (currentValue.includes(value)) {
        return {
          ...prevData,
          [fieldName]: currentValue.filter((v) => v !== value),
        };
      } else {
        return {
          ...prevData,
          [fieldName]: [...currentValue, value],
        };
      }
    });
  };

  const handleRadioChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  // Fetch form schema when registrationFormId or eventId changes
  useEffect(() => {
    if (!registrationFormId || !eventId) return; // Exit if formId or eventId is not provided
    
    console.log("registrationFormId:", registrationFormId);
    console.log("eventId:", eventId); 

    axios
      .get(`${EXCHNAGE_URL}/registrationForm/?registrationFormId=${registrationFormId}&eventId=${eventId}`)
      .then((response) => {
        const schema = response.data.data.form_schema;
        
        // Parse the schema if it's a string
        let parsedSchema = [];
        if (typeof schema === "string") {
          try {
            parsedSchema = JSON.parse(schema);
          } catch (error) {
            console.error("Error parsing form_schema:", error);
          }
        } else if (Array.isArray(schema)) {
          parsedSchema = schema;
        }

        // Ensure it's an array before setting the state
        if (Array.isArray(parsedSchema)) {
          setFormSchema(parsedSchema);
        } else {
          console.warn("form_schema is not an array:", schema);
          setFormSchema([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
        setFormSchema([]);
      });
  }, [registrationFormId, eventId]);

  // Render individual fields based on their type
  const renderField = (field) => {
    const labelPositionLeft = field.labelPosition === "left"; // Check if label should be to the left

    // Determine the field size width (e.g., '50%' -> '50%' or '75%' -> '75%' or '100%' -> '100%')
    const fieldWidth = field.fieldSize || "100%"; // Default to '100%' if no fieldSize is specified

    const fieldStyle = {
      display: "flex",
      flexDirection: labelPositionLeft ? "row" : "column", // Change layout based on label position
      alignItems: labelPositionLeft ? "center" : "flex-start", // Align items differently for left/right vs top/bottom
      marginBottom: "15px",
    };

    const labelStyle = {
      marginBottom: labelPositionLeft ? "0" : "8px", // No bottom margin if label is on the left
      marginRight: labelPositionLeft ? "10px" : "0", // Add right margin if label is on the left
      width: labelPositionLeft ? "120px" : "auto", // Fixed width for left labels
      textAlign: labelPositionLeft ? "left" : "center", // Align text based on position
    };

    const inputStyle = {
      width: fieldWidth, // Apply fieldSize as width
      marginLeft: labelPositionLeft ? "10px" : "0", // Adjust margin if label is left-aligned
    };

    return (
      <div key={field.dataName} style={fieldStyle}>
        <label style={labelStyle}>
          {field.label}
          {field.required && <span style={{ color: "red" }}> *</span>}
          {field.hoverHint && (
            <span className="hover-hint-icon" title={field.hoverHint}>
              &#63;
            </span>
          )}
        </label>

        {field.type === "text" && (
          <input
            type="text"
            placeholder={field.placeholder}
            style={inputStyle}
            value={formData[field.dataName] || ""}
            onChange={(e) => handleInputChange(field.dataName, e.target.value)}
          />
        )}

        {field.type === "textarea" && (
          <textarea
            placeholder={field.defaultValue}
            style={{ ...inputStyle, height: "100px" }}
            value={formData[field.dataName] || ""}
            onChange={(e) => handleInputChange(field.dataName, e.target.value)}
          />
        )}

        {field.type === "email" && (
          <input
            type="email"
            placeholder={field.placeholder}
            style={inputStyle}
            value={formData[field.dataName] || ""}
            onChange={(e) => handleInputChange(field.dataName, e.target.value)}
          />
        )}

        {field.type === "date" && (
          <input
            type="date"
            style={inputStyle}
            value={formData[field.dataName] || ""}
            onChange={(e) => handleInputChange(field.dataName, e.target.value)}
          />
        )}

        {field.type === "country" && (
          <select
            style={inputStyle}
            value={formData[field.dataName] || ""}
            onChange={(e) => handleInputChange(field.dataName, e.target.value)}
          >
            {field.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {field.type === "file" && <input type="file" style={inputStyle} />}

        {field.type === "radio" &&
          field.options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                name={field.dataName}
                value={option}
                checked={formData[field.dataName] === option}
                onChange={() => handleRadioChange(field.dataName, option)}
              />
              <label>{option}</label>
            </div>
          ))}

        {field.type === "checkbox" &&
          field.options.map((option, index) => (
            <div key={index}>
              <input
                type="checkbox"
                name={field.dataName}
                value={option}
                checked={formData[field.dataName]?.includes(option)}
                onChange={() => handleCheckboxChange(field.dataName, option)}
              />
              <label>{option}</label>
            </div>
          ))}

        {field.type === "dropdown" && (
          <select
            style={inputStyle}
            value={formData[field.dataName] || ""}
            onChange={(e) => handleInputChange(field.dataName, e.target.value)}
          >
            {field.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  };

  return (
    <div className="form_saved">
      <h3>Saved Form</h3>
      {formSchema.length === 0 ? (
        <p>Loading form...</p>
      ) : (
        formSchema.map((field) => renderField(field))
      )}
    </div>
  );
};

export default SavedForm;
