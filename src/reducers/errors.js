import clone from "clone";
import { createReducer } from "../constants";
import actions from "../actions";

const setError = (state, action) => {
    return {
        ...clone(state),
        ...action.error
    }
}

const clearErrors = (state, action) => {
    return {}
}

const handlers = {
    [actions.SET_ERROR]: setError,
    [actions.CLEAR_ERRORS]: clearErrors
}

export default createReducer({}, handlers);