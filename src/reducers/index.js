import { combineReducers } from "redux";
import pending from "./pending";
import errors from "./errors";
import calculator from "./calculator";

export default combineReducers({
    pending,
    errors,
    calculator
})
