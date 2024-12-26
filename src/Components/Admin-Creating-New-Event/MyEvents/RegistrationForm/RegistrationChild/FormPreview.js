import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "./FormPreview.css";
import { GreyBackgroundButton, GreyBorderButton } from "../../../../Global/GlobalButton";
import { SubHeading } from "../../../../Global/GlobalText";

// List of countries for the country dropdown
const countries = [
  "United States", "Canada", "United Kingdom", "Australia", "India", "Germany",
  "France", "Italy", "Spain", "Mexico", "Japan", "South Korea", "Brazil",
  "China", "South Africa", "Russia", "Netherlands", "Sweden", "Switzerland", "Belgium"
];

const FormPreview = ({ formSchema, showModal, handleClose, editFieldModal }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Initialize formData based on formSchema
  useEffect(() => {
    const initialData = formSchema.reduce((acc, field) => {
      acc[field.dataName] = {
        value: field.defaultValue || "",
        isConditionMet: true,
        isRequired: field.required || false,
      };
      return acc;
    }, {});
    
    setFormData(initialData);
  }, [formSchema]);

  // Function to check visibility and required conditions
  const checkConditions = (fieldName) => {
    const field = formSchema.find((field) => field.dataName === fieldName);
    if (field) {
      let conditionMet = true;
      let isFieldRequired = field.isRequired || false; // Default to the field's base required value
  
      // Check visibility condition (visibleIf)
      if (field.visibleIf) {
        const relatedFieldValue = formData[field.visibleIf.field]?.value;
        if (relatedFieldValue !== field.visibleIf.value) {
          conditionMet = false; // Hide field if condition is not met
        }
      }
  
      // Check dynamic required condition (requiredIf)
      if (field.requiredIf) {
        const relatedFieldValue = formData[field.requiredIf.field]?.value;
        if (relatedFieldValue === field.requiredIf.value) {
          isFieldRequired = true; // Make field required if condition is met
        } else {
          isFieldRequired = false; // Make field not required if condition is not met
        }
      }
  
      // Update formData with conditionMet and isRequired status
      setFormData((prevData) => ({
        ...prevData,
        [field.dataName]: {
          ...prevData[field.dataName],
          isConditionMet: conditionMet,
          isRequired: isFieldRequired, // Dynamically update required status
        }
      }));
  
      return conditionMet;
    }
    return true; // If no conditions, the field is always visible
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData };
      updatedData[fieldName].value = value;

      // After input change, check conditions for all fields dynamically
      formSchema.forEach((field) => {
        updatedData[field.dataName].isConditionMet = checkConditions(field.dataName);
      });

      return updatedData;
    });
  };

  const handleCheckboxChange = (fieldName, value) => {
    setFormData((prevData) => {
      const currentValue = prevData[fieldName] || [];
      if (currentValue.includes(value)) {
        return { ...prevData, [fieldName]: currentValue.filter((v) => v !== value) };
      } else {
        return { ...prevData, [fieldName]: [...currentValue, value] };
      }
    });
  };

  const renderField = (field) => {
    const isFieldError = errors[field.dataName]; // Error based on our errors state

    // If the field is not conditionally visible, do not render
    if (!formData[field.dataName]?.isConditionMet) return null;

    return (
      <div key={field.dataName} className="form-field">
        <label>
          {field.label} {field.required && <span style={{ color: "red" }}>*</span>}
        </label>

        {/* Switch-case for field types */}
        {
          (() => {
            switch (field.type) {
              case "text":
                return (
                  <input
                    type="text"
                    placeholder={field.placeholder || ''}
                    value={formData[field.dataName]?.value || ""}
                    onChange={(e) => handleInputChange(field.dataName, e.target.value)}
                    required={formData[field.dataName]?.isRequired}
                  />
                );
              case "textarea":
                return (
                  <textarea
                    placeholder={field.placeholder || field.defaultValue || ''}
                    value={formData[field.dataName]?.value || ""}
                    onChange={(e) => handleInputChange(field.dataName, e.target.value)}
                    required={formData[field.dataName]?.isRequired}
                  />
                );
              case "email":
                return (
                  <input
                    type="email"
                    placeholder={field.placeholder || ''}
                    value={formData[field.dataName]?.value || ""}
                    onChange={(e) => handleInputChange(field.dataName, e.target.value)}
                    required={formData[field.dataName]?.isRequired}
                  />
                );
              case "date":
                return (
                  <input
                    type="date"
                    value={formData[field.dataName]?.value || ""}
                    onChange={(e) => handleInputChange(field.dataName, e.target.value)}
                    required={formData[field.dataName]?.isRequired}
                  />
                );
              case "country":
                return (
                  <select
                    value={formData[field.dataName]?.value || ""}
                    onChange={(e) => handleInputChange(field.dataName, e.target.value)}
                    required={formData[field.dataName]?.isRequired}
                  >
                    <option value="">Select a country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                );
              case "file":
                return (
                  <input
                    type="file"
                    onChange={(e) => handleInputChange(field.dataName, e.target.files)}
                    required={formData[field.dataName]?.isRequired}
                  />
                );
              case "radio":
                return field.options.map((option, index) => (
                  <div key={index} className="sub_form_preview_radio">
                    <input
                      type="radio"
                      name={field.dataName}
                      value={option}
                      checked={formData[field.dataName]?.value === option}
                      onChange={() => handleInputChange(field.dataName, option)}
                      required={formData[field.dataName]?.isRequired}
                    />
                    <label>{option}</label>
                  </div>
                ));
              case "checkbox":
                return field.options.map((option, index) => (
                  <div key={index} className="sub_form_preview_radio">
                    <input
                      type="checkbox"
                      name={field.dataName}
                      value={option}
                      checked={formData[field.dataName]?.value?.includes(option)}
                      onChange={() => handleCheckboxChange(field.dataName, option)}
                      required={formData[field.dataName]?.isRequired}
                    />
                    <label>{option}</label>
                  </div>
                ));
              case "dropdown":
                return (
                  <select
                    value={formData[field.dataName]?.value || ""}
                    onChange={(e) => handleInputChange(field.dataName, e.target.value)}
                    required={formData[field.dataName]?.isRequired}
                  >
                    {field.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                );
              case "tel":
                return (
                  <input
                    type="tel"
                    placeholder={field.placeholder || "Enter phone number"}
                    value={formData[field.dataName]?.value || ""}
                    onChange={(e) => handleInputChange(field.dataName, e.target.value)}
                    required={formData[field.dataName]?.isRequired}
                  />
                );
              default:
                return null;
            }
          })()
        }

        {/* Error Message */}
        {isFieldError && <p style={{ color: "red", fontSize: "12px" }}>{errors[field.dataName]}</p>}
      </div>
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    formSchema.forEach((field) => {
      // Check if field is required and missing value
      if (field.required && !formData[field.dataName]?.value) {
        newErrors[field.dataName] = "This field is required.";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully", formData);
    } else {
      console.log("Form has errors", newErrors);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} size="lg">
      <Modal.Header closeButton />
      <Modal.Body>
        <div className="form_preview_heading">
          <SubHeading>Registration Form</SubHeading>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="form_preview_section">
            {formSchema.length === 0 ? (
              <p>Loading form...</p>
            ) : (
              formSchema.map((field) => renderField(field))
            )}
          </div>
          <div className="form_preview_buttons">
            <GreyBorderButton onClick={handleClose}>Cancel</GreyBorderButton>
            <GreyBackgroundButton type="submit">Submit</GreyBackgroundButton>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FormPreview;