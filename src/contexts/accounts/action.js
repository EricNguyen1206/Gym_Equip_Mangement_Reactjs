import api from "../../api";

const getPending = () => ({
    type: "ACCOUNTS_PENDING",
});
const getFulfill = (user) => ({
    type: "ACCOUNTS_FULFILL",
    payload: user,
});
const getRejected = () => ({
    type: "ACCOUNTS_REJECTED",
});

export const getAccounts = async (dispatch) => {
    dispatch(getPending());
    try {
        const res = await api.get("taikhoan");
        dispatch(getFulfill(res.data));
    } catch (err) {
        dispatch(getRejected());
    }
};
