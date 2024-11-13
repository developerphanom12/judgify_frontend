import { SET_USER_CREDENTIALS } from "./action";

const initialState = {
  user: {},
  userCheck: false,
  role: "",
  // appDetails: {},
  isLoading: false,
  email: null,
  password: null,
  email: "",
  eventId: "",
};

const UseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_CREDENTIALS:
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

        case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
      };


      case "SET_EVENT_ID":
        return {
          ...state,
          id: action.payload,
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
