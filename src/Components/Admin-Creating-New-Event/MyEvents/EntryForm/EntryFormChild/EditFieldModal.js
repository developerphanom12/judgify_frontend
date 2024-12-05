import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import "./EditFieldModal.css";
import { SubHeading } from "../../../../Global/GlobalText";
import {
  InputLabel,
  InputType,
  SelectBorder,
} from "../../../../Global/GlobalFormElement";
import {
  GreyBorderButton,
  RedBackgroundButton,
} from "../../../../Global/GlobalButton";
import { RiDeleteBin4Fill } from "react-icons/ri";


const EditFieldModal = ({ field, onSave, onClose }) => {
  const [updatedField, setUpdatedField] = useState({
    ...field,
    options: field.options || [],
    includeOther: field.includeOther || false,
  });
  const [error, setError] = useState("");

  // Effect hook to update the state whenever the field prop changes
  useEffect(() => {
    setUpdatedField({
      ...field,
      options: field.options || [],
      includeOther: field.includeOther || false,
    });
  }, [field]);

  // Handle form input changes and update the state accordingly
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedField({
      ...updatedField,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addValue = () => {
    setUpdatedField({
      ...updatedField,
      options: [...updatedField.options, ""],
    });
  };

  const updateOption = (index, value) => {
    const options = [...updatedField.options];
    options[index] = value;
    setUpdatedField({ ...updatedField, options });
  };

  const removeOption = (index) => {
    const options = [...updatedField.options];
    options.splice(index, 1);
    setUpdatedField({ ...updatedField, options });
  };

  const handleSave = () => {
    if (!updatedField.dataName || !updatedField.label) {
      setError("Data Name and Label are required fields.");
      return;
    }
    setError("");
    onSave(updatedField); // Pass the updated field back
    onClose(); // Close the modal after saving
  };

  return (
    <Modal show={true} onHide={onClose} size="lg">

      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="registration_edit">
          <div className="registration_edit_heading">
            <SubHeading>
            Form Fields Editor:{" "}
              {updatedField.type.charAt(0).toUpperCase() +
                updatedField.type.slice(1)}
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
            </div>

            <div className="registration_edit_row">
              <InputLabel>Label</InputLabel>
              <InputType
                type="text"
                name="label"
                value={updatedField.label || ""}
                onChange={handleChange}
              />
            </div>

            {/* {/ Hover Hint with Tooltip Preview /} */}
            {/* <Form.Group>
            <Form.Label>Hover Hint</Form.Label>
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="tooltip">{updatedField.hoverHint}</Tooltip>}
            >
              <Form.Control
                type="text"
                name="hoverHint"
                value={updatedField.hoverHint || ''}
                onChange={handleChange}
                placeholder="Enter a hint for the side"
              />
            </OverlayTrigger>
          </Form.Group> */}

            <div className="registration_edit_row">
              <InputLabel>Hover Hint</InputLabel>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip">{updatedField.hoverHint}</Tooltip>
                }
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

            <div className="registration_edit_row">
              <InputLabel>Admin Label</InputLabel>
              <InputType
                type="text"
                name="adminLabel"
                value={updatedField.adminLabel || ""}
                onChange={handleChange}
              />
            </div>

            <div className="registration_edit_row">
              <InputLabel>Label Position</InputLabel>
              <div className="registration_edit_ckeck">
                <Form.Check
                  type="radio"
                  label="Top"
                  name="labelPosition"
                  value="top"
                  checked={updatedField.labelPosition === "top"}
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Left"
                  name="labelPosition"
                  value="left"
                  checked={updatedField.labelPosition === "left"}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="registration_edit_row">
              <InputLabel>Field Size</InputLabel>
              <SelectBorder
                as="select"
                name="fieldSize"
                value={updatedField.fieldSize || "100%"}
                onChange={handleChange}
              >
                <option value="50%">50%</option>
                <option value="75%">75%</option>
                <option value="100%">100%</option>
                <option value="auto">Auto</option>
              </SelectBorder>
            </div>

            {/* {/ Render options for dropdown, radio, and checkbox /} */}
            {(updatedField.type === "dropdown" ||
              updatedField.type === "radio" ||
              updatedField.type === "checkbox") && (
              <div>
                <InputLabel>Options</InputLabel>
                {updatedField.options.map((option, index) => (
                  // <Row key={index} className="mb-2">
                  //   <Col sm={10}>
                  //     <InputType
                  //       type="text"
                  //       value={option}
                  //       onChange={(e) => updateOption(index, e.target.value)}
                  //     />
                  //   </Col>
                  //   <Col sm={2}>
                  //     <div
                  //      className="registration_edit_remove"
                  //       //variant="danger"
                  //       onClick={() => removeOption(index)}
                  //     >
                  //       Remove
                  //     </div>
                  //   </Col>
                  // </Row>

              
                  <div key={index} className="registration_edit_option">

                    <InputType 
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                    />

<RiDeleteBin4Fill  className="registration_edit_remove"onClick={() => removeOption(index)}/>

                    {/* <div
                      className="registration_edit_remove"
                      onClick={() => removeOption(index)}
                    >
                      Remove
                    </div> */}
                  </div>
           
                ))}
                <div
                  //variant="primary"
                  className="registration_edit_addoption"
                  onClick={addValue}
                >
                  Add Option
                </div>
              </div>
            )}
            {/* 
          {/ Option to include "Other" checkbox /} */}
            {(updatedField.type === "radio" ||
              updatedField.type === "checkbox") && (
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label='Include "Other" Option'
                  name="includeOther"
                  checked={updatedField.includeOther}
                  onChange={handleChange}
                />
              </Form.Group>
            )}

            {/* {/ Display error message if validation fails /} */}
            {error && <div className="error-message text-danger">{error}</div>}

            <div className="registration_edit_btn">
              <GreyBorderButton variant="secondary" onClick={onClose}>
                Cancel
              </GreyBorderButton>
              <RedBackgroundButton variant="primary" onClick={handleSave}>
                Save
              </RedBackgroundButton>
            </div>
          </form>
        </div>
      </Modal.Body>

      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default EditFieldModal;
