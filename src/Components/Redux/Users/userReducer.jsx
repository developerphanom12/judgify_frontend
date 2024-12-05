import { SET_AWARD_ID, SET_EVENT_ID, SET_USER_CREDENTIALS, SET_USER_FLOW_CREDENTIALS } from "./action";

const initialState = {
  user: {},
  userCheck: false,
  userFlowCheck:false,

  role: "",
  eventIdGet: null,
  isLoading: false,

  email: null,
  password: null,
  first_name:null,

  // email: "",
  id: null,
  awardId: "", 
};

const UseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EVENT_ID_GET":
      return { ...state, eventIdGet: action.payload };

    case SET_USER_CREDENTIALS:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        first_name: action.payload.first_name,
      };

      case SET_USER_FLOW_CREDENTIALS:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
      };

      case "USER_DATA":
        return {
          ...state,
          user: action.payload,
        };

        case "USERFLOW_DATA":
          return {
            ...state,
            user: action.payload,
          };


        case "LOADING_DATA":
          return {
            ...state,
            isLoading: action.payload,
          };


      case "USER_CHECK":
        return {
          ...state,
          userCheck: action.payload,
        };

        case "USER_FLOW_CHECK":
          return {
            ...state,
            userFlowCheck: action.payload,
          };

        case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
      };

      case "SET_USER_EMAIL":
        return {
          ...state,
          email: action.payload,
        };

      case SET_EVENT_ID:
        return {
          ...state,
          id: action.payload, // Store the eventId in the state
        };

        case SET_AWARD_ID:
          return {
            ...state,
            awardId: action.payload, // Update awardId in the state
          };

    //   case "APP_DETAILS":
    //     return {
    //       ...state,
    //       appDetails: action.payload,
    //     };

    default:
      return state;
  }
};

export default UseReducer;
