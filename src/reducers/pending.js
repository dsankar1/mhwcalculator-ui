import clone from "clone";
import { createReducer } from "../constants";
import actions from "../actions";

const setPending = (state, action) => {
    return {
        ...clone(state),
        ...action.pending
    }
}

const clearPending = (state, action) => {
    return {}
}

const handlers = {
    [actions.SET_PENDING]: setPending,
    [actions.CLEAR_PENDING]: clearPending
}

export default createReducer({}, handlers);