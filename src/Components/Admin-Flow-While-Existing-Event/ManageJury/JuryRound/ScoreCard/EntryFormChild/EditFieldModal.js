import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "./EditFieldModal.scss";
import { GreyBorderButton, RedBackgroundButton } from "../../../../../Global/GlobalButton";

const EditFieldModal = ({ field, onSave, onClose }) => {
  const [updatedField, setUpdatedField] = useState({
    ...field,
    criteria: field.criteria || "min", // Default to 'min' criteria
    fields: field.fields || [{ minValue: "", maxValue: "" }],
  });
  const [error, setError] = useState("");

  // Sync the updatedField state when the parent field prop changes
  useEffect(() => {
    setUpdatedField({
      ...field,
      criteria: field.criteria || "min",  // Default to 'min' criteria
      fields: field.fields || [{ minValue: "", maxValue: "" }],
    });
  }, [field]);

  // Handle input field changes
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFields = [...updatedField.fields];
    updatedFields[index][name] = value;
    setUpdatedField({
      ...updatedField,
      fields: updatedFields,
    });
  };

  // Handle criteria change
  const handleCriteriaChange = (e) => {
    const value = e.target.value;
    setUpdatedField({
      ...updatedField,
      criteria: value,
      fields: value === "custom" ? [{ minValue: "", maxValue: "" }] : updatedField.fields,
    });
  };

  // Add a new field for "custom" criteria
  const addField = () => {
    setUpdatedField({
      ...updatedField,
      fields: [
        ...updatedField.fields,
        { minValue: "", maxValue: "", id: Date.now() }, // Unique ID for each field
      ],
    });
  };

  // Remove a field by its unique ID
  const removeField = (id) => {
    const updatedFields = updatedField.fields.filter((field) => field.id !== id);
    setUpdatedField({
      ...updatedField,
      fields: updatedFields,
    });
  };

  // Handle saving the updated field
  const handleSave = () => {
    if (updatedField.criteria === "custom") {
      const hasEmptyFields = updatedField.fields.some(
        (field) => !field.minValue || !field.maxValue
      );

      if (hasEmptyFields) {
        setError("Both Min and Max values are required.");
        return;
      }
    }

    setError("");
    onSave(updatedField);  
    onClose();  
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal show={true} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Form Field Editor</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="registration_edit">
          <form className="registration_edit_form" onSubmit={(e) => e.preventDefault()}>
            <div className="registration_edit_row">
              <label>Criteria</label>
              <select
                name="criteria"
                value={updatedField.criteria}
                onChange={handleCriteriaChange}
                className="form-control"
              >
                <option value="Min/Max Criteria">Min/Max Criteria</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {(updatedField.criteria === "min" || updatedField.criteria === "max" || updatedField.criteria === "Min/Max Criteria") && (
              <>
                <div className="registration_edit_row">
                  <label>Min Value</label>
                  <input
                    type="number"
                    name="minValue"
                    value={updatedField.fields[0].minValue || ""}
                    onChange={(e) => handleChange(e, 0)}
                    className="form-control"
                  />
                </div>

                <div className="registration_edit_row">
                  <label>Max Value</label>
                  <input
                    type="number"
                    name="maxValue"
                    value={updatedField.fields[0].maxValue || ""}
                    onChange={(e) => handleChange(e, 0)}
                    className="form-control"
                  />
                </div>
              </>
            )}

            {updatedField.criteria === "custom" && (
              <>
          {updatedField.fields.map((field, index) => (
  <div key={field.id} className="registration_edit_row">
    <div className="d-flex">
      <input
        type="text"
        name="minValue"
        placeholder="Min Label"
        value={field.minValue}
        onChange={(e) => handleChange(e, index)}
        className="form-control"
      />
      <input
        type="text"
        name="maxValue"
        placeholder="Max Label"
        value={field.maxValue}
        onChange={(e) => handleChange(e, index)}
        className="form-control"
      />
      <button
        type="button"
        className="btn btn-danger ml-2"
        onClick={() => removeField(field.id)}
      >
        Remove
      </button>
    </div>
  </div>
))}


                <div className="registration_edit_row">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={addField}
                  >
                    Add Field
                  </button>
                </div>
              </>
            )}

            {error && <div className="error-message text-danger">{error}</div>}

            <div className="registration_edit_btn">
              <GreyBorderButton variant="secondary" onClick={handleClose}>
                Cancel
              </GreyBorderButton>
              <RedBackgroundButton
                variant="primary"
                onClick={handleSave}
                type="button"
              >
                Save
              </RedBackgroundButton>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );  
};

export default EditFieldModal;
