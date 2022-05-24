const initState = {
    equipments: null,
    isFetching: false,
    error: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "EQUIPMENTS_GET_PENDING":
            return {
                equipments: null,
                isFetching: true,
                error: false,
            };
        case "EQUIPMENTS_GET_FULFILL":
            return {
                equipments: action.payload,
                isFetching: false,
                error: false,
            };
        case "EQUIPMENTS_GET_REJECTED":
            return {
                equipments: null,
                isFetching: false,
                error: true,
            };
        case "EQUIPMENTS_PUTCONDITION_FULFILL":
            return { ...state };
        default:
            return { ...state };
    }
};

export { initState };
export default reducer;
