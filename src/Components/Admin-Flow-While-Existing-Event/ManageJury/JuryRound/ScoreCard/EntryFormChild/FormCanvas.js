import React, { useState } from "react";
import EditFieldModal from "./EditFieldModal";
import "./FormCanvas.scss";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import { InputLabel, InputType, SelectBorder } from "../../../../../Global/GlobalFormElement";

const FormCanvas = ({ fields, updateField, removeField, onGenerateSchema, titleValue, descriptionValue, updateTitleAndDescription }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const openModal = (field) => {
    setCurrentField(field); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setCurrentField(null); 
  };

  const handleSave = (updatedField) => {
    const updatedFields = fields.map((field) =>
      field.dataName === updatedField.dataName ? updatedField : field
    );
    updateField(updatedFields); 

    closeModal();
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
    e.target.style.opacity = "";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "";
    e.target.style.cursor = "";
  };

  const generateJSONSchema = () => {
    return fields.map((field, index) => {
      const fieldSchema = {
        label: field.label,
        type: field.type,

        criteria: field.criteria || "min/max criteria", // Default to "min" if criteria is not set
        index: index + 1,
        value: field.value || "", // Use the field's value if available
        fields: field.fields
          ? field.fields.map((subField) => {
            // Assign the dynamic title and description values correctly
            if (subField.label === "Title") {
              subField.value = titleValue; // Assign dynamic title value
            } else if (subField.label === "Description") {
              subField.value = descriptionValue; // Assign dynamic description value
            }

            return {
              label: subField.label,
              type: subField.type,
              placeholder: subField.placeholder,
              fieldSize: subField.fieldSize,
              value: subField.value || "", // Ensure subfields have dynamic value
            };
          })
          : [],
      };

      // Ensure the Title and Description values are correctly assigned
      if (field.label === "Title & Description") {
        fieldSchema.fields[0].value = titleValue; // Title field value
        fieldSchema.fields[1].value = descriptionValue; // Description field value
      }

      return fieldSchema;
    });
  };
  // Pass generated schema back to Scorecard component
  const handleGenerateSchema = () => {
    const schema = generateJSONSchema();
    onGenerateSchema(schema); // Pass schema to parent component
  };

  return (
    <div className="form-canvass">
      {fields.length > 0 ? (
        fields.map((field, index) => (
          <div
            key={field.dataName}
            className="field-containerr"

          >
            <div className="field-input-containerr">
              <InputLabel>{index + 1}</InputLabel>
              {field.fields ? (
                <div className="title-description-groupp">
                  {field.fields.map((subField, subIndex) => (
                    <div  key={`${subField.dataName}-${subIndex}`}className="subb-field">
                      <InputLabel>{subField.label}</InputLabel>
                      <InputType
                        type={subField.type}
                        placeholder={subField.placeholder}
                        value={subField.label === "Title" ? titleValue : descriptionValue} // Ensure dynamic values
                        onChange={(e) => {
                          if (subField.label === "Title") {
                            updateTitleAndDescription(e.target.value, descriptionValue); // Update title value
                          } else if (subField.label === "Description") {
                            updateTitleAndDescription(titleValue, e.target.value); // Update description value
                          }
                        }}
                      />

                    </div>
                  ))}
                </div>
              ) : (
                <InputType
                type={field.type}
                placeholder={field.placeholder}
                style={{ width: field.fieldSize }}
              />
              )}
            </div>

            <div className="field-actionss">
              <MdEditSquare className="form_canvass_icon" onClick={() => openModal(field)} />
              <RiDeleteBin4Fill className="form_canvass_icon" onClick={() => removeField(index)} />
            </div>
          </div>
        ))
      ) : (
        <div>No fields available. Please add some fields.</div>
      )}

      {isModalOpen && currentField && (
        <EditFieldModal field={currentField} onSave={handleSave} onClose={closeModal} />
      )}

      {/* Button to generate and pass the schema */}
      {/* <button onClick={handleGenerateSchema}>Generate JSON Schema</button> */}
    </div>
  );
};

export default FormCanvas;
