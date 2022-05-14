const initState = {
    liquidations: null,
    isFetching: false,
    error: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LIQUIDATION_GET_PENDING":
            return {
                liquidations: null,
                isFetching: true,
                error: false,
            };
        case "LIQUIDATION_GET_FULFILL":
            return {
                liquidations: action.payload,
                isFetching: false,
                error: false,
            };
        case "LIQUIDATION_GET_REJECTED":
            return {
                liquidations: null,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
};

export { initState };
export default reducer;
