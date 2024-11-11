 

export const SET_USER_CREDENTIALS = "SET_USER_CREDENTIALS";

export const setUserCredentials = (email, password) => ({
  type: SET_USER_CREDENTIALS,
  payload: { email, password }
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
  export const userCheckAction = (data) => {
    return {
      type: "USER_CHECK",
      payload: data,
    };
  };
  export const LoaderAction = (data) => {
    return{
      type:"LOADING_DATA",
      payload: data,
    }
  }
  
