import React, { useState, useEffect } from 'react';
import { CheckLabel, InputLabel, InputType } from '../../../../Global/GlobalFormElement';
import { RedBackgroundButton } from '../../../../Global/GlobalButton';

const FormulaValidationField = ({ numFields, onFormulaChange }) => {
  const [formula, setFormula] = useState('');
  const [isValid, setIsValid] = useState(true);

  // Function to generate a regex pattern based on the number of fields
  const generateValidationPattern = (fieldsCount) => {
    const placeholders = Array.from({ length: fieldsCount }, (_, i) => `{${i + 1}}`);
    // Regex to match expressions like {1}, {2}, ({1}+{2})/2
    // Supports + and / operators, and parentheses for grouping
    let pattern = placeholders.map(p => `\\${p}`).join('[\\+\\/]*');
    let fullPattern = `^(${pattern})+$`;  // Base pattern without parenthesis

    // Include handling for parentheses and operators within the formula
    const parenthesesPattern = `\\(([\\d\\+\\/\\*{}]+)\\)`; // Allow groupings with operators inside parentheses
    const finalPattern = `^(${parenthesesPattern}|${fullPattern})+$`;  // Combine

    return new RegExp(finalPattern);
  };


  // Handle input change and validate the formula
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setFormula(inputValue);
    
    // Validate the formula based on the generated pattern
    const validPattern = generateValidationPattern(numFields);
    const isFormulaValid = validPattern.test(inputValue);
    setIsValid(isFormulaValid);
    
    // Call onFormulaChange if the formula is valid
    if (isFormulaValid) {
      onFormulaChange(inputValue);
    }
  };

  return (
    <div className="create_jury_overall">
      <InputLabel>Overall Scorecard Value</InputLabel>
      <CheckLabel>
        This is the calculated overall Scorecard value of a submission
      </CheckLabel>

      <InputType
        type="text"
        value={formula}
        placeholder={`Enter formula using placeholders {1}, {2}, ...`}
        onChange={handleInputChange}
      />

      {/* Disable submit button if formula is invalid */}
      <RedBackgroundButton disabled={!isValid}>
        Submit
      </RedBackgroundButton>
    </div>
  );
};

export default FormulaValidationField;
