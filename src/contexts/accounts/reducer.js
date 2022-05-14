const initState = {
    accounts: null,
    isFetching: false,
    error: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "ACCOUNTS_PENDING":
            return {
                accounts: null,
                isFetching: true,
                error: false,
            };
        case "ACCOUNTS_FULFILL":
            return {
                accounts: action.payload,
                isFetching: false,
                error: false,
            };
        case "ACCOUNTS_REJECTED":
            return {
                accounts: null,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
};

export { initState };
export default reducer;
