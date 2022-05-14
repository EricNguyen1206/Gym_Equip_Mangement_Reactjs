const initState = {
    purchases: null,
    isFetching: false,
    error: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "PURCHASES_GET_PENDING":
            return {
                purchases: null,
                isFetching: true,
                error: false,
            };
        case "PURCHASES_GET_FULFILL":
            return {
                purchases: action.payload,
                isFetching: false,
                error: false,
            };
        case "PURCHASES_GET_REJECTED":
            return {
                purchases: null,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
};

export { initState };
export default reducer;
