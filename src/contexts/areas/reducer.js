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
        case "AREAS_CREATE_FULFILL":
            return {
                areas: [...state.areas, action.payload],
                isFetching: false,
                error: true,
            };
        case "AREAS_UPDATE_FULFILL":
            return { ...state };
        default:
            return { ...state };
    }
};

export { initState };
export default reducer;
