const initState = {
    extractions: null,
    isFetching: false,
    error: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "EXTRACTION_GET_PENDING":
            return {
                extractions: null,
                isFetching: true,
                error: false,
            };
        case "EXTRACTION_GET_FULFILL":
            return {
                extractions: action.payload,
                isFetching: false,
                error: false,
            };
        case "EXTRACTION_GET_REJECTED":
            return {
                extractions: null,
                isFetching: false,
                error: true,
            };
        case "EXTRACTION_POST_PENDING":
            return {
                extractions: null,
                isFetching: true,
                error: false,
            };
        case "EXTRACTION_POST_FULFILL":
            return { ...state };
        case "EXTRACTION_POST_REJECTED":
            return {
                extractions: null,
                isFetching: false,
                error: true,
            };
        case "EXTRACTION_CENSOR_PENDING":
            return {
                extractions: null,
                isFetching: true,
                error: false,
            };
        case "EXTRACTION_CENSOR_FULFILL":
            return { ...state };
        case "EXTRACTION_CENSOR_REJECTED":
            return {
                extractions: null,
                isFetching: false,
                error: true,
            };
        case "EXTRACTION_ROLLBACK_FULFILL":
            return { ...state };
        default:
            return { ...state };
    }
};

export { initState };
export default reducer;
