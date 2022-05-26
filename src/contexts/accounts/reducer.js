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
        case "ACCOUNTS_CREATE_FULFILL":
            return {
                accounts: [...state.accounts, action.payload],
                isFetching: false,
                error: true,
            };
        case "ACCOUNTS_UPDATE_FULFILL":
            return { ...state };
        default:
            return { ...state };
    }
};

export { initState };
export default reducer;
