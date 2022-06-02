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
            sessionStorage.setItem("user", JSON.stringify(action.payload));
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "LOGIN_REJECTED":
            alert(action.payload.response.data.message);
            return {
                user: null,
                isFetching: false,
                error: true,
            };
        case "ACCOUNTS_RESETPASSWORD_FULFILL":
            localStorage.setItem("forgetPassword", true);
            return {
                user: null,
                isFetching: false,
                error: false,
            };
        case "LOGOUT":
            sessionStorage.removeItem("user");
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
