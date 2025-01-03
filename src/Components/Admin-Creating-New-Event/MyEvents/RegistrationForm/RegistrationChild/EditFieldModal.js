import React, { useState, useEffect, useCallback } from "react";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./EditFieldModal.css";
import { SubHeading } from "../../../../Global/GlobalText";
import { InputLabel, InputType, SelectBorder } from "../../../../Global/GlobalFormElement";
import { GreyBorderButton, RedBackgroundButton } from "../../../../Global/GlobalButton";
import { RiDeleteBin4Fill } from "react-icons/ri";

const EditFieldModal = ({ fieldType, field, onSave, onClose, fieldLabels, formData, setFormData, dataNames }) => {
  const [selectedFieldLabel, setSelectedFieldLabel] = useState(field.label);
  const [selectedDataName, setSelectedDataName] = useState(field.dataName);
  const [updatedField, setUpdatedField] = useState({
    ...field,
    options: field.options || [],
    includeOther: field.includeOther || false,
    dataName: field.dataName || `field_${Date.now()}`,
    updaTEDATANEM:dataNames
  });

  const [conditions, setConditions] = useState({
    isRequiredChecked: field.isRequired ?? false,
    isRequiredIf: field.isRequiredIf || false,
    requiredFieldValue: field.requiredFieldValue || "",
    conditionType: field.requiredCondition || "Equals (Default)",
    conditionValue: field.requiredConditionValue || "", 
    isVisibleChecked: field.visible ?? true,
    isVisibleIfChecked: field.isVisibleIf || false,
    visibleFieldValue: field.visibleFieldValue || "",
    visibleCondition: field.visibleCondition || "Equals (Default)",
    visibleConditionValue: field.visibleConditionValue || "",
    toselectedDataName:field.dataName,
    toselectedlabel:field.label
  });

  const [errors, setErrors] = useState({});

  const isAddedField = fieldType === 'added';

  useEffect(() => {
    setUpdatedField({
      ...field,
      options: field.options || [],
      includeOther: field.includeOther || false,
    });

    setConditions({
      isRequiredChecked: field.isRequired ?? false,
      isRequiredIf: field.isRequiredIf || false,
      requiredFieldValue: field.requiredFieldValue || "",
      conditionType: field.requiredCondition || "Equals (Default)",
      conditionValue: field.requiredConditionValue || "", 
      isVisibleChecked: field.visible ?? true,
      isVisibleIfChecked: field.isVisibleIf || false,
      visibleFieldValue: field.visibleFieldValue || "",
      visibleCondition: field.visibleCondition || "Equals (Default)",
      visibleConditionValue: field.visibleConditionValue || "",
      updaTEDATANEM:dataNames
    });
    setSelectedFieldLabel(field.label);
    setSelectedDataName(field.dataName);
  }, [field]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedField((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []); 

  const handleFieldLabelChange = (e) => { 
    const selectedLabel = e.target.value;
    const index = fieldLabels.indexOf(selectedLabel);
    if (index !== -1) {
      setSelectedFieldLabel(selectedLabel); 
      setSelectedDataName(dataNames[index]); 
    }
  };
  
  const handleConditionChange = useCallback((e) => {
    const { name, value } = e.target;
    setConditions((prev) => ({
      ...prev,
      [name]: value, 
    }));
  }, []);

  const addValue = useCallback(() => {
    setUpdatedField((prev) => ({
      ...prev,
      options: [...prev.options, ""],
    }));
  }, []);

  const updateOption = useCallback((index, value) => {
    setUpdatedField((prev) => {
      const options = [...prev.options];
      options[index] = value;
      return { ...prev, options };
    });
  }, []); 

  const removeOption = useCallback((index) => {
    setUpdatedField((prev) => {
      const options = [...prev.options];
      options.splice(index, 1);
      return { ...prev, options };
    });
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
  
    if (!updatedField.dataName) newErrors.dataName = "Data name is required.";
    if (!updatedField.label) newErrors.label = "Label is required.";
  
    if (conditions.isRequiredChecked && !conditions.isRequiredIf) {
      newErrors.requiredFieldValue = "Please select a condition for Required If.";
    } else if (conditions.isRequiredIf && !conditions.requiredFieldValue) {
      newErrors.requiredFieldValue = "Required field value is required.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  }, [updatedField, conditions]);
  
  const handleSave = useCallback(() => {
    console.log("Attempting to save...");
  
    if (!validateForm()) {
      console.log("Validation failed.");
      return;
    }
  
    const fieldPayload = {
      type: updatedField.type, 
      dataName: updatedField.dataName, 
      label: updatedField.label, 
      hoverHint: updatedField.hoverHint, 
      options: updatedField.options, 
      includeOther: updatedField.includeOther, 
      isRequiredIf: conditions.isRequiredIf, 
      requiredFieldValue: conditions.requiredFieldValue, 
      requiredCondition: conditions.conditionType, 
      requiredConditionValue: conditions.conditionValue, 
      visible: conditions.isVisibleChecked, 
      isVisibleIf: conditions.isVisibleIfChecked, 
      visibleFieldValue: conditions.visibleFieldValue, 
      visibleCondition: conditions.visibleCondition, 
      visibleConditionValue: conditions.visibleConditionValue,
      renderlabel: selectedFieldLabel, 
      renderDataName: selectedDataName, 
    };
  
    console.log("Field Payload before save:", fieldPayload); 
  
    onSave(fieldPayload);
  
    onClose();
  }, [
    validateForm,
    updatedField,
    conditions,
    selectedDataName,
    selectedFieldLabel,
    onSave,
    onClose
  ]);
  
  return (
    <Modal show={true} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Field Editor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="registration_edit">
          <div className="registration_edit_heading">
            <SubHeading>
              Form Fields Editor:{" "}
              {updatedField.type.charAt(0).toUpperCase() + updatedField.type.slice(1)}
            </SubHeading>
          </div>
          <form className="registration_edit_form">
            <div className="registration_edit_row">
              <InputLabel>Field Type</InputLabel>
              <InputType type="text" value={updatedField.type || ""} disabled />
            </div>
            <div className="registration_edit_row">
              <InputLabel>Data Name</InputLabel>
              <InputType
                type="text"
                name="dataName"
                value={updatedField.dataName || ""}
                onChange={handleChange}
              />
              {errors.dataName && <div className="error">{errors.dataName}</div>}
            </div>
          <div className="registration_edit_row">
              <InputLabel>Label</InputLabel>
              <InputType
                type="text"
                name="label"
                onChange={handleChange} 
              />
              {errors.label && <div className="error">{errors.label}</div>}
            </div>
            <div className="registration_edit_row">
              <InputLabel>Hover Hint</InputLabel>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="tooltip">{updatedField.hoverHint}</Tooltip>}
              >
                <InputType
                  type="text"
                  name="hoverHint"
                  value={updatedField.hoverHint || ""}
                  onChange={handleChange}
                  placeholder="Enter a hint for the side"
                />
              </OverlayTrigger>
            </div>
            {(updatedField.type === "dropdown" ||
              updatedField.type === "radio" ||
              updatedField.type === "checkbox") && (
              <div>
                <InputLabel>Options</InputLabel>
                {updatedField.options.map((option, index) => (
                  <div key={index} className="registration_edit_option">
                    <InputType
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                    />
                    <RiDeleteBin4Fill
                      className="registration_edit_remove"
                      onClick={() => removeOption(index)}
                    />
                  </div>
                ))}
                <div className="registration_edit_addoption" onClick={addValue}>
                  Add Option
                </div>
              </div>
            )}

          {
            isAddedField &&(
              <>
                {/* Required If Section */}
            <div className="required-field">
              <label>
                <input
                  type="checkbox"
                  checked={conditions.isRequiredChecked}
                  onChange={() =>
                    setConditions((prev) => ({
                      ...prev,
                      isRequiredChecked: !prev.isRequiredChecked,
                    }))
                  }
                />
                Required
              </label>
              {conditions.isRequiredChecked && (
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={conditions.isRequiredIf}
                      onChange={() =>
                        setConditions((prev) => ({
                          ...prev,
                          isRequiredIf: !prev.isRequiredIf,
                        }))
                      }
                    />
                    Required if
                  </label>
                  {conditions.isRequiredIf && (
                    <>
                      <div className="registration_edit_row">
                        <InputLabel>Required Field</InputLabel>
                        <SelectBorder
                          value={selectedFieldLabel || ""}
                          onChange={handleFieldLabelChange}
                          name="requiredFieldValue"
                        >
                          <option value="">Select Field</option>
                            {/* {console.log(fieldLabels)} */}

                          {fieldLabels.map((label, index) => (
                            <option key={index} value={label}>
                              {label}
                            </option>
                          ))}
                        </SelectBorder>
                      </div>
                      <div className="registration_edit_row">
                        <InputLabel>Condition</InputLabel>
                        <SelectBorder
                          value={conditions.conditionType}
                          onChange={handleConditionChange}
                          name="conditionType"
                        >
                          <option value="Equals (Default)">Equals (Default)</option>
                          <option value="Contains">Contains</option>
                          <option value="Is greater than">Is greater than</option>
                          <option value="Is less than">Is less than</option>
                        </SelectBorder>
                      </div>
                      <div className="registration_edit_row">
                        <InputLabel>Condition Value</InputLabel>
                        <InputType
                          type="text"
                          value={conditions.requiredFieldValue  || ""}
                          onChange={handleConditionChange}
                          name="requiredFieldValue"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Visible If Section */}
            <div className="visible-field">
              <label>
                <input
                  type="checkbox"
                  checked={conditions.isVisibleChecked}
                  onChange={() =>
                    setConditions((prev) => ({
                      ...prev,
                      isVisibleChecked: !prev.isVisibleChecked,
                    }))
                  }
                />
                Visible
              </label>
              {conditions.isVisibleChecked && (
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={conditions.isVisibleIfChecked}
                      onChange={() =>
                        setConditions((prev) => ({
                          ...prev,
                          isVisibleIfChecked: !prev.isVisibleIfChecked,
                        }))
                      }
                    />
                    Visible if
                  </label>
                  {conditions.isVisibleIfChecked && (
                    <>
                      <div className="registration_edit_row">
                        <InputLabel>Visible Field</InputLabel>
                        <SelectBorder
                          value={conditions.visibleFieldValue}
                          onChange={handleConditionChange}
                          name="visibleFieldValue"
                        >
                          <option value="">Select Field</option>
                          {fieldLabels.map((label, index) => (
                            <option key={index} value={label}>
                              {label}
                            </option>
                          ))}
                        </SelectBorder>
                      </div>
                      <div className="registration_edit_row">
                        <InputLabel>Condition</InputLabel>
                        <SelectBorder
                          value={conditions.visibleCondition}
                          onChange={handleConditionChange}
                          name="visibleCondition"
                        >
                          <option value="Equals (Default)">Equals (Default)</option>
                          <option value="Contains">Contains</option>
                          <option value="Is greater than">Is greater than</option>
                          <option value="Is less than">Is less than</option>
                        </SelectBorder>
                      </div>
                      <div className="registration_edit_row">
                        <InputLabel>Condition Value</InputLabel>
                        <InputType
                          type="text"
                          value={conditions.visibleConditionValue || ""}
                          onChange={handleConditionChange}
                          name="visibleConditionValue"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
              </>
            )
          }

          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <GreyBorderButton onClick={onClose}>Cancel</GreyBorderButton>
        <RedBackgroundButton onClick={handleSave}>Save</RedBackgroundButton>
      </Modal.Footer>
    </Modal>
  );
};

export default EditFieldModal;
