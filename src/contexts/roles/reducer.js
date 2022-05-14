const initState = {
    roles: null,
    isFetching: false,
    error: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "ROLE_PENDING":
            return {
                roles: null,
                isFetching: true,
                error: false,
            };
        case "ROLE_FULFILL":
            return {
                roles: action.payload,
                isFetching: false,
                error: false,
            };
        case "ROLE_REJECTED":
            return {
                roles: null,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
};

export { initState };
export default reducer;
