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

export const createAccount = async (dispatch, data) => {
    try {
        const res = await api.post("taikhoan", data);
        dispatch({
            type: "ACCOUNTS_CREATE_FULFILL",
            payload: res.data,
        });
    } catch (err) {
        alert("Lỗi:", err.message);
        console.log(err);
    }
};

export const updateAccount = async (dispatch, id, data) => {
    try {
        const res = await api.put("taikhoan/" + id, data);
        dispatch({
            type: "ACCOUNTS_UPDATE_FULFILL",
            payload: res.data,
        });
        alert("Chỉnh sửa tài khoản thành công");
    } catch (err) {
        alert("Lỗi:", err.message);
        console.log(err);
    }
};
