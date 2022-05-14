import api from "../../api";

const loginPending = () => ({
    type: "LOGIN_PENDING",
});
const loginFulfill = (user) => ({
    type: "LOGIN_FULFILL",
    payload: user,
});
const loginRejected = () => ({
    type: "LOGIN_REJECTED",
});

//logout

export const logout = () => {
    return {
        type: "LOGOUT",
    };
};

export const login = async (account, dispatch) => {
    dispatch(loginPending());
    try {
        const res = await api.post("register", account);
        dispatch(loginFulfill(res.data));
    } catch (err) {
        dispatch(loginRejected());
    }
};
