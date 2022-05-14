const initState = {
    areas: null,
    isFetching: false,
    error: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "AREAS_GET_PENDING":
            return {
                areas: null,
                isFetching: true,
                error: false,
            };
        case "AREAS_GET_FULFILL":
            return {
                areas: action.payload,
                isFetching: false,
                error: false,
            };
        case "AREAS_GET_REJECTED":
            return {
                areas: null,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
};

export { initState };
export default reducer;
