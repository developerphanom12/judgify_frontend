import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FormPreview.css";

const FormPreview = ({ formId }) => {
  const [formSchema, setFormSchema] = useState([]); // State to hold form schema

  // Fetch the form data when the formId changes
  useEffect(() => {
    if (!formId) return; // Exit if formId is not provided
  
    axios
      .get(`http://localhost:5000/api/form/${formId}`)
      .then((response) => {
        console.log("Raw form_schema:", response.data.form_schema);
  
        try {
          let schema = response.data.form_schema;
  
          // Parse only if form_schema is a string
          if (typeof schema === "string") {
            schema = JSON.parse(schema);
          }
  
          // Ensure it's an array before setting the state
          if (Array.isArray(schema)) {
            setFormSchema(schema);
          } else {
            console.warn("form_schema is not an array:", schema);
            setFormSchema([]);
          }
        } catch (error) {
          console.error("Error parsing form schema:", error);
          setFormSchema([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
        setFormSchema([]);
      });
  }, [formId]);

   // Run this effect whenever formId changes
  // Function to render individual fields based on their type
  
  const renderField = (field) => {
    const labelPositionLeft = field.labelPosition === "left"; // Check if label should be to the left

    // Determine the field size width (e.g., '50%' -> '50%' or '75%' -> '75%' or '100%' -> '100%')
    const fieldWidth = field.fieldSize || "100%"; // Default to '100%' if no fieldSize is specified

    // Common styles for the label and input/field container
    const fieldStyle = {
      display: "flex",
      flexDirection: labelPositionLeft ? "row" : "column", // Change layout based on label position
      alignItems: labelPositionLeft ? "center" : "flex-start", // Align items differently for left/right vs top/bottom
      marginBottom: "15px",
    };

    const labelStyle = {
      marginBottom: labelPositionLeft ? "0" : "8px", // No bottom margin if label is on the left
      marginRight: labelPositionLeft ? "10px" : "0", // Add right margin if label is on the left
      width: labelPositionLeft ? "150px" : "auto", // Fixed width for left labels
      textAlign: labelPositionLeft ? "left" : "center", // Align text based on position
    };

    const inputStyle = {
      width: fieldWidth, // Apply fieldSize as width
      marginLeft: labelPositionLeft ? "10px" : "0", // Adjust margin if label is left-aligned
    };

    return (
      <div key={field.dataName} style={fieldStyle}>
        {/* Render label with required asterisk and hover hint */}
        {field.type !== "file" && (
          <label style={labelStyle}>
            {field.label}
            {field.required && <span style={{ color: "red" }}> *</span>}{" "}
            {/* Asterisk for required field */}
            {field.hoverHint && (
              <span className="hover-hint-icon" title={field.hoverHint}>
                &#63; {/* Question mark icon for hover hint */}
              </span>
            )}
          </label>
        )}

        {/* Render fields based on their type */}
        {field.type === "label" && <h1>{field.label}</h1>}
        {field.type === "text" && (
          <input
            type="text"
            placeholder={field.placeholder}
            style={inputStyle}
          />
        )}
        {field.type === "textarea" && (
          <textarea
            placeholder={field.defaultValue}
            style={{ ...inputStyle, height: "100px" }}
          />
        )}
        {field.type === "email" && (
          <input
            type="email"
            placeholder={field.placeholder}
            style={inputStyle}
          />
        )}
        {field.type === "date" && <input type="date" style={inputStyle} />}
        {field.type === "country" && (
          <select style={inputStyle}>
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
              <input type="radio" name={field.dataName} />
              <label>{option}</label>
            </div>
          ))}
        {field.type === "checkbox" &&
          field.options.map((option, index) => (
            <div key={index}>
              <input type="checkbox" name={field.dataName} />
              <label>{option}</label>
            </div>
          ))}
        {field.type === "dropdown" && (
          <select style={inputStyle}>
            {field.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {/* Tooltip for hover hint */}
        {field.hoverHint && field.hoverHint.trim() !== "" && (
          <div className="tooltip-preview">
            <span className="tooltip-text">{field.hoverHint}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="form-preview">
      {formSchema.length === 0 ? (
        <p>Loading form...</p> // Display loading message if form schema is empty
      ) : (
        // Render the fields if the form schema is available
        formSchema.map((field) => renderField(field))
      )}
    </div>
  );
};

export default FormPreview;
