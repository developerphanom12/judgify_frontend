
import React, { useEffect, useState } from "react";
import "../CreateJuryRound/CreateJuryRoundPost.scss";
import { IoMdAddCircleOutline, IoMdInformationCircle } from "react-icons/io";
import TimePicker from "react-time-picker";
import { useNavigate, useParams } from "react-router-dom";
import { TitleBar } from "../../../../Global/TitleBar/TitleBar";
import { TopBar } from "../../../TopBar/TopBar";
import './scoreCard.scss'
import {
  CheckboxInput,
  CheckLabel,
  InputLabel,
  InputType,
  SelectBorder,
} from "../../../../Global/GlobalFormElement";
import {
  GreyBackgroundButton,
  GreyBorderButton,
  RedBackgroundButton,
} from "../../../../Global/GlobalButton";
import { RedMainHeading } from "../../../../Global/GlobalText";
import { MdEditSquare, MdOutlineSettings } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MultiSelect } from "react-multi-select-component";
import { IoCopy } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";
import { EXCHNAGE_URL } from "../../../../../Url/Url";
import FormCanvas from "./EntryFormChild/FormCanvas";
import EditFieldModal from "./EntryFormChild/EditFieldModal";
import CreateScoreCard from "./CreateScoreCard";
import { toast } from "react-toastify";

const ScoreCardData = ({ ScoreCardValue, totalScorecards }) => {

  const eventIdGet = useSelector((state) => state?.users?.eventIdGet || "");
  const initialEventId = String(eventIdGet);
  const { roundId } = useParams();

  const [selected, setSelected] = useState([]);
  const [scorecardData, setScorecardData] = useState([]);
  const [singleScoreCardData, setSingleScoreCardData] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [fields, setFields] = useState([]); 
  const [numFields, setNumFields] = useState(fields.length);
  const [isValid, setIsValid] = useState(true);
  const [formula, setFormula] = useState('');
  const [loader, setLoader] = useState(false)
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [generatedSchema, setGeneratedSchema] = useState(null);
  const [currentField, setCurrentField] = useState(null);
    const [formValues, setFormValues] = useState({
      category:""
    })
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [selectedScorecard, setSelectedScorecard] = useState(null); 
  const [mode, setMode] = useState(''); 




  const [isShowDivVisible, setIsShowDivVisible] = useState(false);
  const [filters, setFilters] = useState([{ id: 1 }]);
  const token = localStorage.getItem("token")
 const navigate = useNavigate();


  const toggleShowDiv = () => {
    setIsShowDivVisible((prev) => !prev);
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

  const handleCategoryChange = (e) => {
    setFormValues({ ...formValues, category: e.target.value });
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


  const getCategories = async () => {
    setLoader(true)
    try {
      let apiUrl = `${EXCHNAGE_URL}/allAwards?eventId=${initialEventId}&sortOrder=${sortOrder}`;
      if (searchTerm) {
        apiUrl += `&search=${searchTerm}`;
      }
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "Application/json",
          authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setAllCategories(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
        ...prevValues,
        [name]: value,
    }));
};


const handleUpdate = async () => {
  if (!selectedScorecard) return; // If no scorecard is selected, do nothing

  try {
    const updatedData = {
      eventId: initialEventId,
      scoreFormId: selectedScorecard.scoreFormId,
      form_schema: generatedSchema || fields,
      scorecard_categories: formValues.category ? [formValues.category] : [],
      overall_value: formula ? formula : "",
    };
    console.log(updatedData,"adsdsdadasdasdasdasd")
    const scoreFormId = selectedScorecard.scoreFormId;

    const response = await axios.put(`${EXCHNAGE_URL}/scorecard?eventId=${eventIdGet}&scoreFormId=${scoreFormId}&roundId=${roundId}`, updatedData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    console.log('Scorecard updated successfully:', response.data);
    setIsShowDivVisible(false); 
  } catch (error) {
    console.error('Error updating scorecard:', error);
  }
};


  const handelSubmit = (e) =>{
    e.preventDefault();
  }

  const handleEditButtonClick = (scoreFormId) => {
    setMode('edit');
    const scorecard = scorecardData.find(item => item.scoreFormId === scoreFormId);
    if (scorecard) {
      // Load the selected scorecard data
      setSelectedScorecard(scorecard);
      setIsShowDivVisible(true); // Show the form when a scorecard is selected
      const formSchema = JSON.parse(scorecard.form_schema);
      setFields(formSchema[0]?.fields || []);
      setFormula(scorecard.scorecard_categories?.[0]?.formula || '');
      setCategories(scorecard.scorecard_categories.ScoreCardCategory || []);

    }
  };


  const handleCancel =() =>{
    setMode('')
    setIsShowDivVisible(false);
  }

  const handleAddNewClick = () => {
    setMode('add'); 
    setIsShowDivVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${EXCHNAGE_URL}/allScorecard?eventId=${eventIdGet}&roundId=${roundId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        const data = response.data.data;
        setScorecardData(data);
        console.log(data, "scorecardData")
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])

  const handleDeleteScoreCard = async (scoreFormId) => {
    const scorecard = scorecardData.find(item => item.scoreFormId === scoreFormId);
    if (scorecard) {
    
      try {
      const scoreFormId = scorecard.scoreFormId;
      const response = await axios.delete(`${EXCHNAGE_URL}/scorecard/?scoreFormId=${scoreFormId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        toast.success('Scorecard deleted successfully');
        setScorecardData((prevData) => prevData.filter(scorecard => scorecard.scoreFormId !== scoreFormId));
        
        setSelectedScorecard(null);
        
        setIsShowDivVisible(false);
      } else {
        toast.error('Failed to delete scorecard');
      }
    } catch (error) {
      toast.error('Error deleting scorecard');
    }
    }
   
  
  };
  

  useEffect (()=>{
    if (selectedScorecard && selectedScorecard.scoreFormId) {
      const scoreCardFetchData = async () => {
        const scoreFormId = selectedScorecard.scoreFormId;
        try {
          const response = await axios.get(`${EXCHNAGE_URL}/scorecard?eventId=${eventIdGet}&scoreFormId=${scoreFormId}&roundId=${roundId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          });
          const data = response.data.data;
          setSingleScoreCardData(data);
          setTitleValue(data.title); 
          setDescriptionValue(data.description);  
          setFields(data.form_schema ? JSON.parse(data.form_schema) : []); 
          setFormula(data.overall_value || ''); 
          setCategories(data.scorecard_categories || []); 
          console.log(categories, "categoriesssssssssss")
          
          console.log(data, "scorecardData")
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      scoreCardFetchData();
    }
    else{
      console.log('No selected scorecard or scoreFormId is missing');
    }
  },[eventIdGet, roundId, selectedScorecard, token]) 

  useEffect(() => {
    console.log(categories, "Updated Categories");
  }, [categories]);
    
  useEffect(() => {
    if (scorecardData.length > 0) {
      const allFormFields = [];
      // Iterate over each scorecard and extract the form fields
      scorecardData.forEach((scorecard) => {
        if (scorecard.form_schema) {
          try {
            const parsedFormSchema = JSON.parse(scorecard.form_schema);

            parsedFormSchema.forEach((form) => {
              if (Array.isArray(form.fields)) {
                const extractedFields = form.fields.map((field) => ({
                  title: field.label === 'Title' ? field.value : null,
                  description: field.label === 'Description' ? field.value : null,
                  maxValue: field.maxValue || 'N/A',
                  minValue: field.minValue || 'N/A',
                }));

                allFormFields.push(...extractedFields.filter((field) => field.title || field.description));
              }
            });
          } catch (error) {
            console.error('Error parsing form schema:', error);
          }
        }
      });

      setFormFields(allFormFields);
    }
  }, [scorecardData]);

  useEffect(() => {
    setFields([...defaultFields]); 
    getCategories();
  }, [initialEventId, searchTerm, sortOrder]);
  


  

  return (
    <div className="create_jury_content_two">
      <div className="create_new_jury_button">
      <button onClick={handleAddNewClick} className="addNewButton">
          Add New ScoreCard 
        </button>
      </div>

        {isShowDivVisible && mode == 'add' &&(
         <>
         <div className="create_jury_content_two">
           <div className="create_jury_heading">
             <RedMainHeading>ScoreCard {totalScorecards+1}</RedMainHeading>
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
           <GreyBorderButton
           onClick={handleCancel}
           >Cancel</GreyBorderButton>
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
        )}
    {isShowDivVisible && selectedScorecard && (
        <div className="create_jury_edit_form">
          <div className="create_jury_heading">
            <RedMainHeading>Edit Scorecard {selectedScorecard.scoreFormId}</RedMainHeading>
          </div>

          <div className="create_jury_select_div">
            <InputLabel>Scorecard criteria</InputLabel>

            <div>
              <FormCanvas
                fields={fields}
                updateField={updateField} // Your field updating logic
                removeField={removeField} // Your field removal logic
                onGenerateSchema={setGeneratedSchema} // Schema generation logic
                titleValue={selectedScorecard.title}
                descriptionValue={selectedScorecard.description}
              />
              <div className="registratation_button">
                <RedBackgroundButton onClick={() => {}}>Add New Fields</RedBackgroundButton>
              </div>
            </div>
          </div>

          <div className="create_jury_select_div">
            <div className="create_jury_overall">
              <InputLabel>Overall Scorecard Value</InputLabel>
              <CheckLabel>
                This is the calculated overall Scorecard value of a submission
              </CheckLabel>
              <InputType
                type="text"
                value={formula}
                placeholder="Enter formula using placeholders {1}, {2}, ..."
                onChange={(e) => setFormula(e.target.value)}
              />
            </div>

            <div className="create_jury_overall">
              <InputLabel>Use this scorecard for the following Categories</InputLabel>
              <SelectBorder
                name="category"
                value={categories.ScoreCardCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select a Category</option>
                {allCategories.map((category) => (
                  <option key={category.awardId} value={category.category_name}>
                    {category.category_name}
                  </option>
                ))}
              </SelectBorder>
            </div>
          </div>

          <div className="create_jury_btndiv">
            <GreyBorderButton onClick={() => setIsShowDivVisible(false)}>Cancel</GreyBorderButton>
            <RedBackgroundButton onClick={handleUpdate}>Update</RedBackgroundButton>
          </div>
        </div>
      )}

 

      <div className="create_jury_get_div">
        {scorecardData.map((scorecard, index) => (
          <div key={index} className="create_jury_gettwo_main">
            <div className="create_jury_heading">
              <RedMainHeading>Scorecard {index + 1}</RedMainHeading>
            </div>
            <div className="create_jury_gettwo_div">
              {scorecard.scorecard_categories.map((category, categoryIndex) => (
                <CheckLabel key={categoryIndex}>
                  {category.ScoreCardCategory}
                </CheckLabel>
              ))}
              <div className="create_jury_gettwo_sub">
              <MdEditSquare
                onClick={() => handleEditButtonClick(scorecard.scoreFormId)}
              />
                <IoCopy />
                <RiDeleteBin6Fill onClick={() => handleDeleteScoreCard(scorecard.scoreFormId)}/>
              </div>
            </div>


            <div className="create_jury_getthree_div">
              {JSON.parse(scorecard.form_schema).map((schema, schemaIndex) => (
                <div key={schemaIndex}>
                  {schema.fields.map((field, fieldIndex) => (
                    <CheckLabel key={fieldIndex}>
                      <div>
                        {field.label === 'Title' && (
                          <p>Title: {field.value}</p>
                        )}
                        {field.maxValue && <p>Max Value: {field.maxValue}</p>}
                        {field.minValue && <p>Min Value: {field.minValue}</p>}
                      </div>
                    </CheckLabel>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* {scorecardData.length > 0 && scorecardData.map((scorecard, scorecardIndex) => (
  <div className="scorecard" key={scorecardIndex}>
    <div className="scorecard-categories">
      {scorecard.scorecard_categories &&
        scorecard.scorecard_categories.map(
          (category, categoryIndex) => (
            <CheckLabel key={categoryIndex}>
              {category.ScoreCardCategory}
            </CheckLabel>
          )
        )}
    </div>

    <div className="scorecard-form-fields">
      {scorecard.form_schema && (
        <div className="form-fields">
          {JSON.parse(scorecard.form_schema).map(
            (form, formIndex) => (
              <div key={formIndex}>
                {form.fields &&
                  form.fields.map((field, fieldIndex) => (
                    <div className="field-item" key={fieldIndex}>
                      {field.label === 'Title' && (
                        <p>Title: {field.value}</p>
                      )}
                      <p>Max Value: {field.maxValue || 'N/A'}</p>
                      <p>Min Value: {field.minValue || 'N/A'}</p>
                    </div>
                  ))}
              </div>
            )
          )}
        </div>
      )}
    </div>
  </div>
))} */}

      <div className="create_jury_btndiv">
        <GreyBorderButton
          onClick={() => {
            navigate("/jury-round");
          }}
        >
          Back to Jury Rounds
        </GreyBorderButton>

        {isShowDivVisible && (
          <RedBackgroundButton
            onClick={() => {
              navigate(`/successfully-created-judge-round`);
            }}
          >
            {" "}
            Update{" "}
          </RedBackgroundButton>
        )}
      </div>
    </div>
  )
}

export default ScoreCardData

