export const SET_ERROR = "SET_ERROR";
export const setError = error => {
    return { type: SET_ERROR, error };
}

export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const clearErrors = () => {
    return { type: CLEAR_ERRORS };
}