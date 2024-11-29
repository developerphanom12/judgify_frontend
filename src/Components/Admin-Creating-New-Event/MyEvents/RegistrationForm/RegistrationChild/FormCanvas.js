import React, { useState } from "react";
import EditFieldModal from "./EditFieldModal";
import "./FormCanvas.css";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import { InputLabel, InputType, SelectBorder } from "../../../../Global/GlobalFormElement";

const FormCanvas = ({
  fields,
  updateField,
  removeField,
  disableRequiredCheckbox,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // Track selected file
  const [draggedIndex, setDraggedIndex] = useState(null); // Track the dragged field

  // Open modal for editing a field
  const openModal = (field) => {
    if (field) {
      setCurrentField(field);
      setIsModalOpen(true);
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentField(null);
  };

  // Save changes from the modal and update fields
  const handleSave = (updatedField) => {
    const updatedFields = fields.map((field) =>
      field.dataName === updatedField.dataName ? updatedField : field
    );
    updateField(updatedFields); // Pass the updated fields array back
    closeModal(); // Close the modal after saving
  };

  // Handle file selection and update preview
  const handleFileChange = (e, fieldIndex) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const updatedFields = [...fields];
      updatedFields[fieldIndex].value = file; // Update the field's value to the selected file
      setSelectedFile(file);
      updateField(updatedFields); // Update the fields with the new file
    }
  };

  // Handle required checkbox toggle
  const handleRequiredToggle = (fieldIndex) => {
    const updatedFields = [...fields];
    if (!updatedFields[fieldIndex].isDefault) {
      updatedFields[fieldIndex].required = !updatedFields[fieldIndex].required;
      updateField(updatedFields);
    }
  };

  // Handle visible checkbox toggle
  const handleVisibleToggle = (fieldIndex) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].visible = !updatedFields[fieldIndex].visible;
    updateField(updatedFields);
  };

  // Validate required fields before submission
  const validateForm = () => {
    for (let field of fields) {
      if (field.required && field.type !== "file" && !field.value) {
        alert(`${field.label} is required.`);
        return false;
      }
    }
    return true;
  };

  // Handle the drag start event
  const handleDragStart = (e, index) => {
    setDraggedIndex(index); // Set the index of the dragged item
    e.target.style.opacity = "0.5"; // Change opacity to indicate drag
    e.target.style.cursor = "move"; // Change cursor to "move" when dragging starts
  };

  // Handle the drag over event (to allow dropping)
  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };

  // Handle the drop event (replace the field under the cursor)
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === dropIndex) return; // If dragged item is dropped in the same place, do nothing

    const updatedFields = [...fields];
    // Move the dragged field to the new position
    const [movedField] = updatedFields.splice(draggedIndex, 1);
    updatedFields.splice(dropIndex, 0, movedField);
    updateField(updatedFields); // Update the field order
    setDraggedIndex(null); // Reset the dragged index

    e.target.style.opacity = ""; // Reset opacity after the drop
  };

  // Handle the drag end event to reset the styles
  const handleDragEnd = (e) => {
    e.target.style.opacity = ""; // Reset opacity after drag ends
    e.target.style.cursor = ""; // Reset cursor back to default
  };

  return (
    <div className="form-canvas">
      {fields.map((field, index) => (
        <div
          key={field.dataName} // Use a unique identifier as the key
          className="field-container"
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd} // Reset opacity after dragging
          style={{
            opacity: draggedIndex === index ? "0.5" : "1", // Make dragged item semi-transparent
            transition: "opacity 0.3s ease", // Smooth transition
            filter:
              draggedIndex !== null && draggedIndex !== index
                ? "blur(2px)"
                : "none", // Blur other fields
          }}
        >
          {/* Display the label and input within a single div in column layout */}
          <div className="field-input-container">
            {/* Display the label for the field with red asterisk if required */}
            {field.type !== "file" && (
              <InputLabel>
                {field.label}
                {field.required && <span style={{ color: "red" }}> *</span>}
                {/* Display question mark if hoverHint exists */}
                {field.hoverHint && (
                  <span className="hover-hint-icon" title={field.hoverHint}>
                    {" "}
                    &#63; {/* Question mark symbol */}{" "}
                  </span>
                )}
              </InputLabel>
            )}

           
          </div>

          <div className="form_canvas_type_fields">
            {/* Field Renderings */}
            {field.type === "label" && (
              <div className="header-container">
                <h1>{field.label}</h1>
              </div>
            )}
            {/* {field.type === "label" && <label>{field.label}</label>} */}
            {field.type === "text" && (
              <InputType
                type="text"
                placeholder={field.defaultValue || field.label}
                style={{ width: field.fieldSize }}
                value={field.value || ""}
                onChange={(e) => {
                  const updatedFields = [...fields];
                  updatedFields[index].value = e.target.value;
                  updateField(updatedFields);
                }} // Update value
              />
            )}
            {field.type === "email" && (
              <InputType
                type="email"
                placeholder={field.defaultValue || "Enter your email"}
                style={{ width: field.fieldSize }}
                value={field.value || ""}
                onChange={(e) => {
                  const updatedFields = [...fields];
                  updatedFields[index].value = e.target.value;
                  updateField(updatedFields);
                }}
              />
            )}
            {field.type === "tel" && (
              <InputType
                type="tel"
                placeholder={field.defaultValue || "Enter your phone number"}
                style={{ width: field.fieldSize }}
                value={field.value || ""}
                onChange={(e) => {
                  const updatedFields = [...fields];
                  updatedFields[index].value = e.target.value;
                  updateField(updatedFields);
                }}
              />
            )}
            {field.type === "date" && (
              <InputType
                type="date"
                placeholder={field.defaultValue || "Select a date"}
                style={{ width: field.fieldSize }}
                value={field.value || ""}
                onChange={(e) => {
                  const updatedFields = [...fields];
                  updatedFields[index].value = e.target.value;
                  updateField(updatedFields);
                }}
              />
            )}
            {field.type === "textarea" && (
              <textarea
                placeholder={field.defaultValue || field.label}
                style={{ width: field.fieldSize, height: "100px" }}
                value={field.value || ""}
                onChange={(e) => {
                  const updatedFields = [...fields];
                  updatedFields[index].value = e.target.value;
                  updateField(updatedFields);
                }}
              />
            )}
            {field.type === "dropdown" && (
              <SelectBorder
                value={field.value || ""}
                onChange={(e) => {
                  const updatedFields = [...fields];
                  updatedFields[index].value = e.target.value;
                  updateField(updatedFields);
                }}
              >
                {field.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </SelectBorder>
            )}
            {field.type === "country" && (
              <SelectBorder
                value={field.value || ""}
                onChange={(e) => {
                  const updatedFields = [...fields];
                  updatedFields[index].value = e.target.value;
                  updateField(updatedFields);
                }}
              >
                {["USA", "Canada", "UK", "Australia", "India"].map(
                  (country, idx) => (
                    <option key={idx} value={country}>
                      {country}
                    </option>
                  )
                )}
              </SelectBorder>
            )}
            {field.type === "radio" && (
              <div className="radio-btns">
                {field.options.map((option, idx) => (
                  <div key={idx} className="input-lbl">
                    <input type="radio" name={field.dataName} />
                    <label>{option}</label>
                  </div>
                ))}
              </div>
            )}
            {field.type === "checkbox" && (
              <div className="checkboxes">
                {field.options.map((option, idx) => (
                  <div key={idx}  className="input-lbl">
                    <input type="checkbox" />
                    <label>{option}</label>
                  </div>
                ))}
              </div>
            )}
            
            {field.type === "file" && (
              <div>
                {/* <InputLabel>
                  {field.label}
                  {field.required && (
                    <span style={{ color: "red" }}> *</span>
                  )}{" "}
              
                  {field.hoverHint && (
                    <span
                      className="hover-hint-icon"
                      title={field.hoverHint} 
                    >
                      &#63; 
                    </span>
                  )}
                </InputLabel> */}
                
                <input
                  type="file"
                  className="file_formcanvas"
                  onChange={(e) => handleFileChange(e, index)}
                />
                {/* {selectedFile && <div>Selected File: {selectedFile.name}</div>} */}
              </div>
            )}

            </div>

          {/* Required and Visible Checkboxes */}
        <div className="field-options-container">

          <div className="field-actions">
              {/* <RedBackgroundButton
                className="reg_button"
                onClick={() => openModal(field)}
              >
                Edit
              </RedBackgroundButton> */}

              <MdEditSquare className="form_canvas_icon" onClick={() => openModal(field)} />

              {/* <RedBackgroundButton>Remove</RedBackgroundButton> */}

              <RiDeleteBin4Fill  className="form_canvas_icon" onClick={() => removeField(index)} />
          </div>

          <div className="required_checkbox">
              <label>Required</label>
              <input
                type="checkbox"
                checked={field.required}
                onChange={() => handleRequiredToggle(index)}
                disabled={disableRequiredCheckbox && field.isDefault}
              />
          </div>

          <div className="visible_checkbox">
              <label>Visible</label>
              <input
                type="checkbox"
                checked={field.visible}
                onChange={() => handleVisibleToggle(index)}
              />
          </div>

        </div>
        
        </div>
      ))}

      {isModalOpen && currentField && (
        <EditFieldModal
          field={currentField}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default FormCanvas;
