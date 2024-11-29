import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import './EditFieldModal.css';

const EditFieldModal = ({ field, onSave, onClose }) => {
  const [updatedField, setUpdatedField] = useState({
    ...field,
    options: field.options || [],
    includeOther: field.includeOther || false,
  });
  const [error, setError] = useState('');

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
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const addValue = () => {
    setUpdatedField({
      ...updatedField,
      options: [...updatedField.options, ''],
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
      setError('Data Name and Label are required fields.');
      return;
    }
    setError('');
    onSave(updatedField); // Pass the updated field back
    onClose(); // Close the modal after saving
  };

  return (
    <Modal show={true} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Field: {updatedField.type.charAt(0).toUpperCase() + updatedField.type.slice(1)}</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Form>
          <Form.Group>
            <Form.Label>Field Type</Form.Label>
            <Form.Control
              type="text"
              value={updatedField.type || ''}
              disabled
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Data Name</Form.Label>
            <Form.Control
              type="text"
              name="dataName"
              value={updatedField.dataName || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Label</Form.Label>
            <Form.Control
              type="text"
              name="label"
              value={updatedField.label || ''}
              onChange={handleChange}
            />
          </Form.Group>

          {/* {/ Hover Hint with Tooltip Preview /} */}
          <Form.Group>
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
          </Form.Group>

          <Form.Group>
            <Form.Label>Admin Label</Form.Label>
            <Form.Control
              type="text"
              name="adminLabel"
              value={updatedField.adminLabel || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Label Position</Form.Label>
            <div>
              <Form.Check
                type="radio"
                label="Top"
                name="labelPosition"
                value="top"
                checked={updatedField.labelPosition === 'top'}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Left"
                name="labelPosition"
                value="left"
                checked={updatedField.labelPosition === 'left'}
                onChange={handleChange}
              />
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label>Field Size</Form.Label>
            <Form.Control
              as="select"
              name="fieldSize"
              value={updatedField.fieldSize || '100%'}
              onChange={handleChange}
            >
              <option value="50%">50%</option>
              <option value="75%">75%</option>
              <option value="100%">100%</option>
              <option value="auto">Auto</option>
            </Form.Control>
          </Form.Group>

          {/* {/ Render options for dropdown, radio, and checkbox /} */}
          {(updatedField.type === 'dropdown' || updatedField.type === 'radio' || updatedField.type === 'checkbox') && (
            <div>
              <Form.Label>Options</Form.Label>
              {updatedField.options.map((option, index) => (
                <Row key={index} className="mb-2">
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                    />
                  </Col>
                  <Col sm={2}>
                    <Button variant="danger" onClick={() => removeOption(index)}>Remove</Button>
                  </Col>
                </Row>
              ))}
              <Button variant="primary" onClick={addValue}>Add Option</Button>
            </div>
          )}
{/* 
          {/ Option to include "Other" checkbox /} */}
          {(updatedField.type === 'radio' || updatedField.type === 'checkbox') && (
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
        </Form>
        
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditFieldModal;
