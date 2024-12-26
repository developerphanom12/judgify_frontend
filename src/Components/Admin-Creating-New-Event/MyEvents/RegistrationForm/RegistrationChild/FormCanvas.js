import React, { useState, useMemo, useCallback } from "react";
import EditFieldModal from "./EditFieldModal";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import { FiCopy } from "react-icons/fi"; // Importing the copy icon
import { InputLabel, InputType, SelectBorder } from "../../../../Global/GlobalFormElement";

const FormCanvas = ({
  fields,
  updateField,
  removeField,
  disableRequiredCheckbox,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [conditionFieldName, setConditionFieldName] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [copiedField, setCopiedField] = useState(null); // State to hold the copied field

  // List of countries for the dropdown
  const countries = useMemo(() => [
    "United States", "Canada", "United Kingdom", "Australia", "India",
    "Germany", "France", "Italy", "Spain", "Mexico", "Japan", "South Korea",
    "Brazil", "China", "South Africa", "Russia", "Netherlands", "Sweden",
    "Switzerland", "Belgium"
  ], []);

  // List of field labels and their corresponding data names
  const fieldLabels = useMemo(() => fields.map(field => field.label), [fields]);

  // Extracting only the data names for reference
  const dataNames = useMemo(() => fields.map(field => field.dataName), [fields]);

  // Opens modal and sets the current field for editing
  const openModal = useCallback((field) => {
    setCurrentField(field);
    let conditionFieldName = null;

    // For required condition
    if (field.requiredCondition && field.requiredFieldValue) {
      const conditionField = fields.find(f => f.dataName === field.requiredFieldValue);
      if (conditionField) {
        conditionFieldName = conditionField.dataName;
      }
    }

    // For visibility condition
    if (field.visibleCondition && field.visibleFieldValue) {
      const conditionField = fields.find(f => f.dataName === field.visibleFieldValue);
      if (conditionField) {
        conditionFieldName = conditionField.dataName;
      }
    }

    setIsModalOpen(true);
    setConditionFieldName(conditionFieldName); // Pass condition-related data
  }, [fields]);

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentField(null);
  };

  const handleSave = (updatedField) => {
    try {
      const updatedFields = fields.map((field) =>
        field.dataName === updatedField.dataName ? { ...field, ...updatedField } : field
      );
      updateField(updatedFields); // Save the updated fields
      closeModal(); // Close the modal after saving
    } catch (error) {
      console.error("Error saving field:", error);
    }
  };

  const handleFileChange = (e, fieldIndex) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const updatedFields = [...fields];
        updatedFields[fieldIndex].value = file;
        updateField(updatedFields);
      } catch (error) {
        console.error("Error handling file change:", error);
      }
    }
  };

  const handleRequiredToggle = (fieldIndex) => {
    const updatedFields = [...fields];
    const field = updatedFields[fieldIndex];
    if (!field.isDefault) {
      if (field.requiredCondition && field.requiredFieldValue) {
        const conditionField = fields.find(f => f.dataName === field.requiredFieldValue);
        field.isConditionMet = conditionField && conditionField.value === field.requiredFieldValue;
        if (field.isConditionMet) {
          field.required = !field.required;
          updateField(updatedFields);
        } else {
          alert(`${field.label} is required based on the selected condition.`);
        }
      } else {
        field.isConditionMet = true; // No condition, so it's considered met
        field.required = !field.required;
        updateField(updatedFields);
      }
    }
  };

  const handleVisibleToggle = (fieldIndex) => {
    const updatedFields = [...fields];
    const field = updatedFields[fieldIndex];
    if (field.visibleCondition && field.visibleFieldValue) {
      const conditionField = fields.find(f => f.dataName === field.visibleFieldValue);
      field.isConditionMet = conditionField && conditionField.value === field.visibleFieldValue;
      if (field.isConditionMet) {
        field.visible = !field.visible;
        updateField(updatedFields);
      } else {
        alert(`${field.label} is not visible based on the selected condition.`);
      }
    } else {
      field.isConditionMet = true; // No condition, so it's considered met
      field.visible = !field.visible;
      updateField(updatedFields);
    }
  };

  const validateForm = () => {
    for (let field of fields) {
      if (field.required && field.requiredFieldValue) {
        const conditionField = fields.find(f => f.label === field.requiredFieldValue);
        if (conditionField) {
          const fieldConditionMet = conditionField.value === field.requiredFieldValue;
          if (!fieldConditionMet) {
            alert(`${field.label} is required based on the selected condition.`);
            return false;
          }
        }
      } else if (field.required && field.type !== "file" && !field.value) {
        alert(`${field.label} is required.`);
        return false;
      }
    }
    return true;
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.target.style.opacity = "0.5";
    e.target.style.cursor = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === dropIndex) return;
    const updatedFields = [...fields];
    const [movedField] = updatedFields.splice(draggedIndex, 1);
    updatedFields.splice(dropIndex, 0, movedField);
    updateField(updatedFields);
    setDraggedIndex(null);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "";
    e.target.style.cursor = "";
  };

  const handleFieldChange = useCallback((index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].value = value; // Update the original field's value
    updateField(updatedFields); // Update the state with the updated field values
    
    // Update the copied field if it's being changed
    const copiedField = updatedFields.find(field => field.dataName === `${updatedFields[index].dataName}_copy`);
    if (copiedField) {
      copiedField.value = value; // Ensure the copied field has the updated value
      updateField(updatedFields); // Update the state again to ensure the copied field is saved
    }
  }, [fields, updateField]);

  const copyField = (index) => {
    const fieldToCopy = fields[index];
    const copiedField = {
      ...fieldToCopy,
      dataName: `${fieldToCopy.dataName}_copy`, // Ensure unique dataName for the copied field
      value: "", // Reset the value for the copied field
    };
    setCopiedField(copiedField); // Save the copied field in state
  };

  const pasteCopiedField = () => {
    if (copiedField) {
      const updatedFields = [...fields, copiedField]; // Append copied field below
      updateField(updatedFields);
      setCopiedField(null); // Clear copied field after pasting
    }
  };

  const TextField = ({ field, index, handleFieldChange }) => (
    <InputType type="text" placeholder={field.label} value={field.value || ""} onChange={(e) => handleFieldChange(index, e.target.value)} />
  );

  const renderField = (field, index) => {
    const fieldProps = {
      style: { width: field.fieldSize },
      value: field.value || "",
      onChange: (e) => handleFieldChange(index, e.target.value),
      ariaLabel: field.label, // Ensure accessibility by adding aria-label
    };
  
    switch (field.type) {
      case "text":
        return <TextField field={field} index={index} handleFieldChange={handleFieldChange} />;
      case "email":
        return <InputType type="email" placeholder={field.label} {...fieldProps} />;
      case "tel":
        return <InputType type="tel" placeholder={field.label} {...fieldProps} />;
      case "date":
        return <InputType type="date" placeholder={field.label} {...fieldProps} />;
      case "textarea":
        return <textarea placeholder={field.label} {...fieldProps} />;
      case "dropdown":
        return (
          <SelectBorder value={field.value || ""} onChange={(e) => handleFieldChange(index, e.target.value)} aria-label={field.label}>
            {fieldLabels.map((label, idx) => (
              <option key={idx} value={dataNames[idx]}>{label}</option>
            ))}
          </SelectBorder>
        );
      case "country":
        return (
          <SelectBorder value={field.value || ""} onChange={(e) => handleFieldChange(index, e.target.value)}>
            {countries.map((country, idx) => (
              <option key={idx} value={country}>
                {country}
              </option>
            ))}
          </SelectBorder>
        );
      case "radio":
        return (
          <div className="radio-btns">
            {field.options.map((option, idx) => (
              <div key={idx} className="input-lbl">
                <input type="radio" name={field.dataName} value={option} checked={field.value === option} onChange={(e) => handleFieldChange(index, e.target.value)} />
                <label>{option}</label>
              </div>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <div className="checkboxes">
            {field.options.map((option, idx) => (
              <div key={idx} className="input-lbl">
                <input type="checkbox" checked={field.value?.includes(option)} onChange={() => {
                  const updatedFields = [...fields];
                  const fieldValue = updatedFields[index].value || [];
                  if (fieldValue.includes(option)) {
                    updatedFields[index].value = fieldValue.filter((val) => val !== option);
                  } else {
                    updatedFields[index].value = [...fieldValue, option];
                  }
                  updateField(updatedFields);
                }} />
                <label>{option}</label>
              </div>
            ))}
          </div>
        );
      case "file":
        return <input type="file" onChange={(e) => handleFileChange(e, index)} />;
      default:
        return null;
    }
  };

  return (
    <div className="form-canvas">
      {fields.map((field, index) => (
        <div
          key={field.dataName}
          className="field-container"
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          style={{
            opacity: draggedIndex === index ? "0.5" : "1",
            transition: "opacity 0.3s ease",
            filter: draggedIndex !== null && draggedIndex !== index ? "blur(2px)" : "none",
          }}
          aria-grabbed={draggedIndex === index}
        >
          <div className="field-input-container">
            <InputLabel>
              {field.label} 
              {(field.required || field.isRequired) && <span style={{ color: "red" }}> *</span>}
              {field.hoverHint && <span className="hover-hint-icon" title={field.hoverHint}>?</span>}
            </InputLabel>
            {renderField(field, index)}
          </div>
          <div className="field-options-container">
            <div className="field-actions">
              <MdEditSquare className="form_canvas_icon" onClick={() => openModal(field)} />
              <RiDeleteBin4Fill className="form_canvas_icon" onClick={() => removeField(index)} />
              <FiCopy className="form_canvas_icon" onClick={() => copyField(index)} />
            </div>
            <div className="required_checkbox">
              <label>Required</label>
              <input
                type="checkbox"
                checked={field.required || field.isRequired}
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
                disabled={field.isDefault}
              />
            </div>
          </div>
        </div>
      ))}
      {copiedField && (
        <div className="paste-button-container">
          <button onClick={pasteCopiedField}>Paste Copied Field</button>
        </div>
      )}
      {isModalOpen && currentField && (
        <EditFieldModal
          field={currentField}
          onSave={handleSave}
          onClose={closeModal}
          fieldLabels={fieldLabels}
          dataNames={dataNames} // Provide dataNames to EditFieldModal
          conditionFieldName={conditionFieldName} // Pass condition-related data
        />
      )}
    </div>
  );
};

export default FormCanvas;
