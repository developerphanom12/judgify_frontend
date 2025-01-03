export const SET_USER_CREDENTIALS = "SET_USER_CREDENTIALS";
export const SET_USER_FLOW_CREDENTIALS = "SET_USER_FLOW_CREDENTIALS";

export const SET_EMAIL = "SET_EMAIL";
export const SET_USER_EMAIL = "SET_USER_EMAIL";

export const SET_EVENT_ID = "SET_EVENT_ID";
export const SET_AWARD_ID = "SET_AWARD_ID";

export const SET_REGISTRATION_FORM_ID = "SET_REGISTRATION_FORM_ID"; // New action type


export const setUserCredentials = (email, password, first_name) => ({
  type: SET_USER_CREDENTIALS,
  payload: { email, password, first_name },
});

export const setUserFlowCredentials = (email, password) => ({
  type: SET_USER_FLOW_CREDENTIALS,
  payload: { email, password },
});

export const UserDetails = (data) => {
  return {
    type: "USER_DETAILS",
    payload: data,
  };
};

export const userDataAction = (data) => {
  return {
    type: "USER_DATA",
    payload: data,
  };
};

export const userFlowDataAction = (data) => {
  return {
    type: "USERFLOW_DATA",
    payload: data,
  };
};

export const userCheckAction = (data) => {
  return {
    type: "USER_CHECK",
    payload: data,
  };
};

export const userFlowCheckAction = (data) => {
  return {
    type: "USER_FLOW_CHECK",
    payload: data,
  };
};

export const LoaderAction = (data) => {
  return {
    type: "LOADING_DATA",
    payload: data,
  };
};

export const setEmail = (email) => ({
  type: "SET_EMAIL",
  payload: email,
});

export const setUserEmail = (email) => ({
  type: "SET_USER_EMAIL",
  payload: email,
});

// export const setEventId = (id) => ({
//   type: "SET_EVENT_ID",
//   payload: id,
//   console.log("id",id),
// });

export const setEventId = (id) => {
  console.log("Dispatched Event ID:", id); // Log the ID
  return {
    type: "SET_EVENT_ID",
    payload: id,
  };
};

export const setEventIdGet = (id) => {
  console.log("Dispatched Event ID:", id); // Log the ID
  return {
    type: "SET_EVENT_ID_GET",
    payload: id,
  };
};

export const setAwardId = (awardId) => ({
  type: "SET_AWARD_ID",
  payload: awardId,
});


// Registration Form ID Actions (New)
export const setRegistrationFormId = (id) => ({
  type: SET_REGISTRATION_FORM_ID,
  payload: id, // Set registrationFormId in the payload
});

