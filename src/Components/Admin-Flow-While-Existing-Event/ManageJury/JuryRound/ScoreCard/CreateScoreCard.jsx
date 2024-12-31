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
import ScoreCardData from "./ScoreCardData";

const CreateScoreCard = ({totalScorecards}) => {

  // const [scorecardValue, setScorecardValue] = useState("0");
  const scorecardValue = 1;
    const [selected, setSelected] = useState([]);
  const [categories, setCategories]= useState([])
  const [loader, setLoader] = useState(false)
  
  const navigate = useNavigate();
      const location = useLocation();
      const { rId } = location.state || {}; 
  
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

  const [scoreCardValue, setScoreCardValue] = useState("")



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
  
  const validateFormula = (formula, fieldsCount) => {
    const tokens = formula.match(/(\{[0-9]+\}|[+\-*/()])/g);
    
    if (!tokens) return false; 
  
    let openParentheses = 0;
    let lastToken = null;
  
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
  
      if (token.match(/\{[0-9]+\}/)) {
        const placeholderIndex = parseInt(token.slice(1, -1), 10);
        if (placeholderIndex < 1 || placeholderIndex > fieldsCount) {
          return false; 
        }
      } 
      else if (token === '(') {
        openParentheses++;
      } 
      else if (token === ')') {
        openParentheses--;
        if (openParentheses < 0) return false; 
      } 
      else if (['+', '-', '*', '/'].includes(token)) {
        if (!lastToken || ['+', '-', '*', '/'].includes(lastToken) || lastToken === '(') {
          return false; 
        }
      } else {
        return false; 
      }
  
      lastToken = token;
    }
    if (openParentheses !== 0) return false;

    if (lastToken === ')' || lastToken === '(') {
      return false;
    }
  
    return true; 
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
      setFormula(''); 
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
      setFormula('');   
    }
  };


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
          return subField.value.trim() !== ""; 
        }
        return true; 
      });
    });
  };

  
  const handelSubmit =  async(e) =>{
    e.preventDefault();
    if (!validateFields()) {
      toast.error("Please fill in all required fields."); // Show error message
      return; 
    }
    if(!isValid){
      toast.error("Please Enter a valid Formula in Overall value");
      return;
    }
    const formData = {
      eventId: initialEventId,
      roundId: roundId, 
      form_schema: generatedSchema || fields,
      scorecard_categories: formValues.category ? [formValues.category] : [],
      overall_value: formula ? formula : "",
    };
    try {
      const response = await axios.post(`${EXCHNAGE_URL}/scorecard`, formData,{
        headers: {
          "Content-Type": "application/json",  // Content type for the request
          "Authorization": `Bearer ${token}`, // Authentication token
        },
      });
      toast.success("Scorecard created successfully!");
      // const data = response.data;
      setScoreCardValue(response.data.data.scoreFormId)
      console.log(response.data.data.scoreFormId,"999999999999")
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
}, [initialEventId, searchTerm, sortOrder, scoreCardValue]);

  return (
    <>
    {totalScorecards === 0 ?
  (
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
        >
        Create
      </RedBackgroundButton>
      <GreyBackgroundButton onClick={() => {
        navigate("/jury-round");
      }}
      >Create & Add New
      </GreyBackgroundButton>
    </div>

  </>
  ) 
:
(
  <ScoreCardData scoreCardValue={scoreCardValue}/>
)
  }
 
    </>
    
    
  )
}

export default CreateScoreCard