import React, { useEffect, useState } from "react";
import "./Coupans.scss";
import { TitleBar } from "../../Global/TitleBar/TitleBar";
import {
  InputLabel,
  InputType,
  SelectBorder,
} from "../../Global/GlobalFormElement";
import { RedBackgroundButton } from "../../Global/GlobalButton";
import { TopBar } from "../TopBar/TopBar";
import { EXCHNAGE_URL } from "../../../Url/Url";
import { useSelector } from "react-redux";
import axios from "axios";

export const Coupans = () => {

  const [categories, setCategories]= useState([])
  const [loader, setLoader] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const eventIdGet = useSelector((state) => state?.users?.eventIdGet || "");
  const initialEventId = String(eventIdGet);

  const [formValues, SetFormValues] = useState({
    eventId : "",
    category: "",
    coupon_name: "",
    coupon_code: "",
    percent_off: "",
    coupon_amount: "",
    start_date: "",
    end_date: ""
  })
  console.log("Stored eventId showww:", initialEventId);
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
   SetFormValues({...formValues, [e.target.name]:e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const formData = {
        eventId: initialEventId,
        category: formValues.category,
        coupon_name: formValues.coupon_name,
        coupon_code: formValues.coupon_code,
        percent_off: formValues.percent_off,
        coupon_amount: formValues.coupon_amount,
        start_date: formValues.start_date,
        end_date: formValues.end_date,
      };

      const response = await axios.post(
        `${EXCHNAGE_URL}/couponCreate`, 
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Coupon successfully submitted!");
        SetFormValues({
          eventId: "",
          category: "",
          coupon_name: "",
          coupon_code: "",
          percent_off: "",
          coupon_amount: "",
          start_date: "",
          end_date: "",
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
      alert("Error while submitting coupon.");
    } finally {
      setLoader(false);
    }
  };
   
   useEffect(() => {
    getCategories();
  }, [initialEventId, searchTerm, sortOrder]);
  console.log("Categories", categories)
  return (
    <div>
      <div className="coupans_div">
        <TitleBar title="Coupons"/>
      
        <div className="coupans_white_bg">
            <TopBar titleheading="Coupons"/>
          <form className="coupan_form" onSubmit={handleSubmit}>
            <div className="coupans_row">
              <div className="coupans_label_lg">
                <div className="coupans_label_cont">
                  <InputLabel>
                    Select Categories{" "}
                    <span style={{ color: "#c32728" }}>*</span>
                  </InputLabel>
                </div>

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
              <div className="coupans_label_lg">
                <div className="coupans_label_cont">
                  <InputLabel>
                    Coupon Name <span style={{ color: "#c32728" }}>*</span>
                  </InputLabel>
                </div>
                <InputType type="text"  
                  name="coupon_name"
                  placeholder="Enter Coupon Name"
                  value={formValues.coupon_name}
                  onChange={handleChange} />
              </div>
            </div>

            <div className="coupans_row">
              <div className="coupans_label_lg">
                <div className="coupans_label_cont">
                  <InputLabel>
                    Coupon Code <span style={{ color: "#c32728" }}>*</span>
                  </InputLabel>
                </div>
                <InputType 
                  type="text" 
                  name="coupon_code"
                  placeholder="Coupon Code"  
                  value={formValues.coupon_code}
                  onChange={handleChange}/>
              </div>

              <div className="coupans_label_lg">
                <div className="coupans_label_cont">
                  <InputLabel>
                    Coupon Amount <span style={{ color: "#c32728" }}>*</span>
                  </InputLabel>
                </div>
                <div className="coupan_select_input">
                  <SelectBorder   
                    name="percent_off"
                    value={formValues.percent_off}
                    onChange={handleChange}
                    >
                    <option value="">Percentages(%)</option>
                    <option value="Fashion">20%</option>
                    <option value="Skin Care">30%</option>
                    <option value="Beauty">40%</option>
                  </SelectBorder>

                  <InputType  
                    type="number"
                    name="coupon_amount"
                    placeholder="Enter Amount"
                    value={formValues.coupon_amount}
                    onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="coupans_row">
              <div className="coupans_label_lg">
                <div className="coupans_label_cont">
                  <InputLabel>
                    Start Date <span style={{ color: "#c32728" }}>*</span>
                  </InputLabel>
                </div>
                <InputType 
                  type="date"
                  name="start_date"
                  placeholder="Select Date"
                  value={formValues.start_date}
                  onChange={handleChange} />
              </div>

              <div className="coupans_label_lg">
                <div className="coupans_label_cont">
                  <InputLabel>
                    End Date <span style={{ color: "#c32728" }}>*</span>
                  </InputLabel>
                </div>
                <InputType 
                  type="date"
                  name="end_date"
                  placeholder="Select Date"
                  value={formValues.end_date}
                  onChange={handleChange} />
              </div>
            </div>

            <div className="coupans_btndiv">
              <RedBackgroundButton>Submit</RedBackgroundButton>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
