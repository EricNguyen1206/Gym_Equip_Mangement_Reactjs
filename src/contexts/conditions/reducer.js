const initState = {
    conditions: null,
    isFetching: false,
    error: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "CONDITIONS_GET_PENDING":
            return {
                conditions: null,
                isFetching: true,
                error: false,
            };
        case "CONDITIONS_GET_FULFILL":
            return {
                conditions: action.payload,
                isFetching: false,
                error: false,
            };
        case "CONDITIONS_GET_REJECTED":
            return {
                conditions: null,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
};

export { initState };
export default reducer;
