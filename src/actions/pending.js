export const SET_PENDING = "SET_PENDING";
export const setPending = pending => {
    return { type: SET_PENDING, pending };
}

export const CLEAR_PENDING = "CLEAR_PENDING";
export const clearPending = () => {
    return { type: CLEAR_PENDING };
}