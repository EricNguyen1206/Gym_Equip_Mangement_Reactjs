const initState = {
    user: null,
    isFetching: false,
    error: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_PENDING":
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_FULFILL":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "LOGIN_REJECTED":
            return {
                user: null,
                isFetching: false,
                error: true,
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false,
            };
        default:
            return { ...state };
    }
};

export { initState };
export default reducer;
