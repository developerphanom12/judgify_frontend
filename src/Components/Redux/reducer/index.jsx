import { combineReducers } from "redux";
import UseReducer from "../Users/userReducer.jsx";

const rootReducer = combineReducers({
    users: UseReducer,
})

export default rootReducer;