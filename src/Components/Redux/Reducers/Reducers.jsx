import { combineReducers } from "redux";
import UserReducer from "../Users/UseReducer,jsx";

const rootReducer = combineReducers({
    users: UserReducer,
})

export default rootReducer;