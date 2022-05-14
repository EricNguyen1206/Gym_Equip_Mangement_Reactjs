const initState = {
    employees: null,
    isFetching: false,
    error: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "EMPLOYEES_GET_PENDING":
            return {
                employees: null,
                isFetching: true,
                error: false,
            };
        case "EMPLOYEES_GET_FULFILL":
            return {
                employees: action.payload,
                isFetching: false,
                error: false,
            };
        case "EMPLOYEES_GET_REJECTED":
            return {
                employees: null,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
};

export { initState };
export default reducer;
