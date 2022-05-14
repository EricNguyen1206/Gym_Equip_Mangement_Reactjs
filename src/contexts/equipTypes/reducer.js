const initState = {
    equipTypes: null,
    isFetching: false,
    error: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "EQUIPTYPES_GET_PENDING":
            return {
                equipTypes: null,
                isFetching: true,
                error: false,
            };
        case "EQUIPTYPES_GET_FULFILL":
            return {
                equipTypes: action.payload,
                isFetching: false,
                error: false,
            };
        case "EQUIPTYPES_GET_REJECTED":
            return {
                equipTypes: null,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
};

export { initState };
export default reducer;
