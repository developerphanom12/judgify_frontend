import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button
import "./FormPreview.css";
import { SubHeading } from "../../../../Global/GlobalText";
import { GreyBorderButton } from "../../../../Global/GlobalButton";

const FormPreview = ({ formSchema, showModal, handleClose }) => {
  const [formData, setFormData] = useState({});

  // Handle input changes for text, email, date, dropdown, etc.
  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  // Handle changes for checkboxes
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

  // Handle changes for radio buttons
  const handleRadioChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  // Function to render individual fields based on their type
  const renderField = (field) => {
    const labelPositionLeft = field.labelPosition === "left"; // Check if label should be to the left

    // Determine the field size width (e.g., '50%' -> '50%' or '75%' -> '75%' or '100%' -> '100%')
    const fieldWidth = field.fieldSize || "100%"; // Default to '100%' if no fieldSize is specified

    const fieldStyle = {
      display: "flex",
      flexDirection: labelPositionLeft ? "row" : "column", // Change layout based on label position
      alignItems: labelPositionLeft ? "center" : "flex-start", // Align items differently for left/right vs top/bottom
      // marginBottom: "15px",
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

        {field.type === "file" && (
          <input
            type="file"
            style={inputStyle}
            onChange={(e) => handleInputChange(field.dataName, e.target.files)}
          />
        )}

<div className="form_preview_radio">
        {field.type === "radio" &&
          field.options.map((option, index) => (
            <div key={index} className="sub_form_preview_radio">
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

</div>


<div className="form_preview_radio">
        {field.type === "checkbox" &&
          field.options.map((option, index) => (
            <div key={index}  className="sub_form_preview_radio">
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

</div>

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

        {/* Add the phone field type handling */}
        {field.type === "tel" && (
          <input
            type="tel"
            placeholder={field.placeholder || "Enter phone number"}
            style={inputStyle}
            value={formData[field.dataName] || ""}
            onChange={(e) => handleInputChange(field.dataName, e.target.value)}
          />
        )}
      </div>
    );
  };

  return (
    <Modal show={showModal} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
     
      </Modal.Header>
      <Modal.Body>
      <div class="form_preview_heading">
          <SubHeading>Entry Form</SubHeading>
      </div>

      <div className="form_preview_section">
          {formSchema.length === 0 ? (
            <p>Loading form...</p> // Display loading message if form schema is empty
          ) : (
            formSchema.map((field) => renderField(field))
          )}
            <div className="formpreview_button" >
          <GreyBorderButton  onClick={handleClose}>
            Close
          </GreyBorderButton>
        </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
       
      </Modal.Footer>
    </Modal>
  );
};

export default FormPreview;
