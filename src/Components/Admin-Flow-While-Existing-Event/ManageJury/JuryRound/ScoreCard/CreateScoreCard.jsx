import React, { useEffect, useState } from "react";
import './scoreCard.scss'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  CreateButton,
  GreyBackgroundButton,
  GreyBorderButton,
  RedBackgroundButton,
} from "../../../../Global/GlobalButton";
import {
  CheckLabel,
  InputLabel,
  InputType,
  SelectBorder,
} from "../../../../Global/GlobalFormElement";
import { MultiSelect } from "react-multi-select-component";
import {  RedMainHeading } from "../../../../Global/GlobalText";
import axios from "axios";
import { EXCHNAGE_URL } from "../../../../../Url/Url";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import FormCanvas from './EntryFormChild/FormCanvas';
import EditFieldModal from './EntryFormChild/EditFieldModal';
import FormulaValidationField from "./FormulaValidationField";

const CreateScoreCard = () => {

  const [selected, setSelected] = useState([]);
  const [categories, setCategories]= useState([])
  const [loader, setLoader] = useState(false)
  
  const navigate = useNavigate();
      const location = useLocation();
      const { rId } = location.state || {}; 
  
  const options = [
    { label: "BEST B2B ECOMMERCE", value: "grapes" },
    { label: "BEST DIGITAL AGENCY OF THE YEAR", value: "mango" },
    { label: "BEST ECOMMERCE TECHNOLOGY INNOVATION", value: "strawberry" },
    {
      label: "BEST INNOVATION IN ECOMMERCE DELIVERY/LOGISTICS",
      value: "strawberry",
    },
  ];
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fields, setFields] = useState([]); // Your fields state
  const [currentField, setCurrentField] = useState(null);
  const [generatedSchema, setGeneratedSchema] = useState(null);
  const [isValid, setIsValid] = useState(true);
    const [formula, setFormula] = useState('');
  
  const [titleValue, setTitleValue] = useState(""); 
  const [descriptionValue, setDescriptionValue] = useState(""); 
  const [numFields, setNumFields] = useState(fields.length);
  const [formValues, SetFormValues] = useState({
    category:""
  })



  useEffect(() => {
    setNumFields(fields.length);
  }, [fields]);


  
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");
  const eventIdGet = useSelector((state) => state?.users?.eventIdGet);
  const initialEventId = String(eventIdGet);
  const eventId = initialEventId;
  const { roundId } = useParams();

  const [criteriaList, setCriteriaList] = useState([
    { id: 1, value: '' }
  ]);
  const openModal = (field) => {
    setCurrentField(field); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setCurrentField(null); 
  };

  // const generateValidationPattern = (fieldsCount) => {
  //   // // Handle the case when fieldsCount is between 1 and 20
  //   if (fieldsCount >= 1 && fieldsCount <= 20) {
  //     // If there's only one field, ensure that only {1} is allowed and disallow ending with a number or operator after a parentheses
  //     if (fieldsCount === 1) {
  //       const pattern = `^(\\{1\\}[\\+\\-\\*\\/\\d]*)*$`;  // Only allow {1} and arithmetic operations
  //       return new RegExp(pattern);
  //     }
  
  //     // Create valid placeholders (e.g., {1}, {2}, ..., {fieldsCount})
  //     const validPlaceholders = Array.from({ length: fieldsCount }, (_, i) => `{${i + 1}}`);
  //     const placeholderPattern = validPlaceholders.map(p => `\\${p}`).join('[\\+\\-\\*\\/]*');
  
  //     // Pattern for handling parentheses: Allow expressions like ({1}+{2}) but not just ({1}+{2})
  //     const parenthesesPattern = `\\([\\d\\+\\-\\*\\/\\{\\d+\\}]+\\)`;
  
  //     // Pattern for trailing operators or numbers after parentheses, e.g., ({1}+{2})/2
  //     const trailingNumberPattern = `([\\+\\-\\*\\/]*\\d+)$`; // Match trailing operators or numbers after parentheses
  
  //     // Final pattern to make sure parentheses are valid only when followed by an operator or number
  //     const formulaPattern = `^(${parenthesesPattern}|(${placeholderPattern})+)$|^(${parenthesesPattern})*([\\+\\-\\*\\/]*\\d+)$`;
  
  //     // This part disallows formulas like '({1}+{2})' by adding a condition that requires operators or numbers after parentheses
  //     const disallowSimpleParentheses = `\\([\\d\\+\\-\\*\\/\\{\\d+\\}]+\\)`;
  
  //     // Now combine everything and make sure parentheses without operations are invalid
  //     const finalPattern = `^(?!${disallowSimpleParentheses}$)${formulaPattern}`;
  
  //     // Ensure that no formula ends with a number after parentheses like ({1}+{2})/2
  //     const completePattern = `^(${finalPattern})(?!.*\\/${trailingNumberPattern})$`;
  
  //     return new RegExp(completePattern);
  //   }
  
  //   // For cases with more than 20 fields, return an invalid pattern (or adjust as needed)
  //   return /^$/;  // Default: invalid if fieldsCount > 20 (or adjust as needed)
  // };
  
  // const generateValidationPattern = (fieldsCount) => {
  //   if (fieldsCount >= 1 && fieldsCount <= 20) {
  //     // Create valid placeholders (e.g., {1}, {2}, ..., {fieldsCount})
  //     const validPlaceholders = Array.from({ length: fieldsCount }, (_, i) => `{${i + 1}}`);
  //     const placeholderPattern = validPlaceholders.join('|');
  
  //     // Pattern for valid expressions
  //     const expressionPattern = `(${placeholderPattern})([\\+\\-\\*\\/]*(${placeholderPattern}))*`;
  
  //     // Pattern for handling parentheses
  //     const parenthesesPattern = `\\(${expressionPattern}\\)`; // Match valid expressions inside parentheses
  
  //     // Final pattern to ensure valid expressions
  //     const finalPattern = `^(${expressionPattern}|${parenthesesPattern})$`;
  
  //     // Ensure that the formula can end with a number only if preceded by a `/`
  //     const completePattern = `^(${finalPattern})(?!.*[\\+\\-\\*]$)(?!.*[^/][\\d]$)`;
  
  //     return new RegExp(completePattern);
  //   }
  
  //   // For cases with more than 20 fields, return an invalid pattern
  //   return /^$/;  // Default: invalid if fieldsCount > 20
  // };

  
  const validateFormula = (formula, fieldsCount) => {
    const tokens = formula.match(/(\{[0-9]+\}|[+\-*/()])/g);
    
    if (!tokens) return false; // If no tokens found, return false

    let openParentheses = 0;
    let lastToken = null;

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      // Check for valid placeholders
      if (token.match(/\{[0-9]+\}/)) {
        const placeholderIndex = parseInt(token.slice(1, -1), 10);
        if (placeholderIndex < 1 || placeholderIndex > fieldsCount) {
          return false; // Invalid placeholder
        }
      } else if (token === '(') {
        openParentheses++;
      } else if (token === ')') {
        openParentheses--;
        if (openParentheses < 0) return false; // Unmatched closing parenthesis
      } else if (['+', '-', '*', '/'].includes(token)) {
        // Check for valid operator placement
        if (!lastToken || ['+', '-', '*', '/'].includes(lastToken) || lastToken === '(') {
          return false; // Invalid operator placement
        }
      } else {
        return false; // Invalid token
      }

      lastToken = token;
    }

    // Check for unmatched parentheses and valid ending
    if (openParentheses !== 0 || (lastToken === '+' || lastToken === '-' || lastToken === '*' || lastToken === '/')) {
      return false; // Unmatched parentheses or invalid ending
    }

    return true; // Valid formula
  };
  
 const handleFormulaInput = (e) => {
    const inputValue = e.target.value;
    setFormula(inputValue);

    const isFormulaValid = validateFormula(inputValue, numFields);
    setIsValid(isFormulaValid); // Button enabled/disabled based on formula validity
  };

  const addDefaultFields = () => {
    setFields((prevFields) => {
      const updatedFields = [...prevFields, ...defaultFields];
      return updatedFields;
    });
  };

  const removeField = (index) => {
    const fieldToRemove = fields[index];
    if (fieldToRemove.isDefault) {
      alert("This field cannot be removed.");
    } else {
      const updatedFields = fields.filter((_, i) => i !== index);
      setFields(updatedFields);
    }
  };

  // const handleFormulaInput = (e) => {
  //   const inputValue = e.target.value;
  //   setFormula(inputValue);
  
  //   if (inputValue === '') {
  //     setIsValid(true); // Empty formula is valid
  //     return;
  //   }
  
  //   const validPattern = generateValidationPattern(numFields);
  //   const isFormulaValid = validPattern.test(inputValue);
  //   setIsValid(isFormulaValid); // Button enabled/disabled based on formula validity
  // };
  
  

  // const addDefaultFields = () => {
  //   setFields((prevFields) => {
  //     const updatedFields = [...prevFields, ...defaultFields];
  //     const validPattern = generateValidationPattern(updatedFields.length);
  //     const isFormulaValid = validPattern.test(formula);
  //     setIsValid(isFormulaValid); 
  //     return updatedFields;
  //   });
  // };


  //   const removeField = (index) => {
  //   const fieldToRemove = fields[index];
  //   if (fieldToRemove.isDefault) {
  //     alert("This field cannot be removed.");
  //   } else {
  //     const updatedFields = fields.filter((_, i) => i !== index);
  //     setFields(updatedFields);
      
  //     const validPattern = generateValidationPattern(updatedFields.length);
  //     const isFormulaValid = validPattern.test(formula);
  //     setIsValid(isFormulaValid);  
  //   }
  // };

  const defaultFields = [
    {
      fields: [
        {
          type: "text",
          label: "Title",
          dataName: `title-${Date.now()}`,
          placeholder: "Enter title...",
          value: "", 
          minValue: "", 
          maxValue: "", 
          required: true
        },
        {
          type: "textarea",
          label: "Description",
          dataName: `description-${Date.now()}`,
          placeholder: "Enter description...",
          value: "", 
          required: true
        },
      ],
    },
  ];

  const updateField = (updatedFields) => {
    setFields(updatedFields);
  };

  const updateTitleAndDescription = (title, description) => {
    setTitleValue(title);
    setDescriptionValue(description);
  };

 
  const validateFields = () => {
    return fields.every(field => {
      return field.fields.every(subField => {
        if (subField.required) {
          return subField.value.trim() !== ""; // Check if required fields are not empty
        }
        return true; // If not required, return true
      });
    });
  };

  
  const handelSubmit =  async(e) =>{
    e.preventDefault();

    if (!validateFields()) {
      toast.error("Please fill in all required fields."); // Show error message
      return; 
    }

    // if (currentField) {
    //   const hasEmptyFields = currentField.fields.some(field => 
    //     !field.minValue || !field.maxValue
    //   );
  
    //   if (hasEmptyFields) {
    //     toast.error("Please fill in all required fields in the modal.");
    //     setIsModalOpen(true);
    //     return; 
    //   }
    // } else {
    //   toast.error("Click on action button to fill in all required fields. ");
    //   return; 
    // }
  

    const formData = {
      eventId: initialEventId,
      roundId: roundId, 
      // form_schema: fields.map(field => ({
      //   [field.fields[0].dataName]: field.fields[0].value,
      //   [field.fields[1].dataName]: field.fields[1].value
      // })),
      form_schema: generatedSchema || fields,
      scorecard_categories: formValues.category ? [formValues.category] : [], // Use the selected category
    };

    console.log(formData.form_schema,"hihihhihi")
    console.log(formData,"1111111111111")

    try {
      const response = await axios.post(`${EXCHNAGE_URL}/scorecard`, formData);
      toast.success("Scorecard created successfully!");
      navigate("/jury-round"); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to create scorecard.");
    }
  };

  const token = localStorage.getItem("token")

  const getCategories = async() =>{
    setLoader(true)
     try {
      let apiUrl = `${EXCHNAGE_URL}/allAwards?eventId=${initialEventId}&sortOrder=${sortOrder}`;
      if (searchTerm) {
        apiUrl += `&search=${searchTerm}`;
      }
      const response = await axios.get(apiUrl,{
        headers:{
          "Content-Type":"Application/json",
          authorization: `Bearer ${token}`,
        },
      });
      if(response.status === 200){
        setCategories(response.data.data)
      }
     } catch (error) {
      console.log(error)
     }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetFormValues(prevValues => ({
        ...prevValues,
        [name]: value,
    }));
};


  useEffect(() => {
    setFields([...defaultFields]); 
    getCategories();
  }, [initialEventId, searchTerm, sortOrder]);

  return (
    <>
      <div className="create_jury_content_two">
        <div className="create_jury_heading">
          <RedMainHeading>Scorecard 1</RedMainHeading>
        </div>

        <div className="create_jury_select_div">
          <InputLabel> Scorecard criteria </InputLabel>

          
          <div>
      <div className="formappp">
        <div className="canvas-savee">
          <FormCanvas
             fields={fields}
             updateField={updateField}
             removeField={removeField}
             onGenerateSchema={setGeneratedSchema}
             titleValue={titleValue} 
             descriptionValue={descriptionValue} 
             updateTitleAndDescription={updateTitleAndDescription} 
          />
          <div className="registratation_button">
            <RedBackgroundButton onClick={addDefaultFields}>Add New Fields</RedBackgroundButton>
          </div>
        </div>
      </div>

      {/* Modal for editing fields */}
      {currentField && (
        <EditFieldModal
          field={currentField}
          onSave={(updatedField) => {
            const updatedFields = fields.map((field) =>
              field.dataName === updatedField.dataName ? updatedField : field
            );
            setFields(updatedFields);
            setCurrentField(null);
          }}
          onClose={() => setCurrentField(null)}
        />
      )}
    </div> 
        </div>

        <div className="create_jury_select_div">
          <div className="create_jury_overall">
            <div className="create_juryoverall_head">
              <InputLabel> Overall Scorecard Value </InputLabel>
              <CheckLabel>
                This is the calculated overall Scorecard value of a
                submission
              </CheckLabel>
            </div>
            <InputType type="text" 
             value={formula}
             placeholder={`Enter formula using placeholders {1}, {2}, ...`}
             onChange={handleFormulaInput}
            />
          </div>

          <div className="create_jury_overall">
            <InputLabel>
              Use this scorecard for the following Categories
            </InputLabel>
             <SelectBorder 
                            name="category"
                            value={formValues.category}
                            onChange={handleChange}>
                            <option value="">Select a Category</option>
                            {categories.map((category) => (
                        <option key={category.awardId} value={category.category_name}>
                          {category.category_name}
                        </option>
                      ))}
                            </SelectBorder>
          </div>
        </div>




      </div>

      <div className="create_jury_btndiv">
        <GreyBorderButton>Cancel</GreyBorderButton>
        <RedBackgroundButton
          onClick={handelSubmit}
          disabled={!isValid}
        >
          Create
        </RedBackgroundButton>
        <GreyBackgroundButton onClick={() => {
          navigate("/jury-round");
        }}
        disabled={!isValid}
        >Create & Add New</GreyBackgroundButton>
      </div>

    </>
  )
}

export default CreateScoreCard