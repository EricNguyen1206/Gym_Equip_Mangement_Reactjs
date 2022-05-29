import api from "../../api";
import encrypt from "../../utils/encript";

const loginPending = () => ({
    type: "LOGIN_PENDING",
});
const loginFulfill = (user) => ({
    type: "LOGIN_FULFILL",
    payload: user,
});
const loginRejected = (err) => ({
    type: "LOGIN_REJECTED",
    payload: err,
});

//logout

export const logout = (dispatch) => {
    dispatch({
        type: "LOGOUT",
    });
};

export const login = async (account, dispatch) => {
    dispatch(loginPending());
    try {
        const res = await api.post("login", account);
        const resSessions = res.data;
        resSessions.matkhau = account.matkhau;
        dispatch(loginFulfill(resSessions));
    } catch (err) {
        dispatch(loginRejected(err));
    }
};

export const rememberMe = (user, dispatch) => {
    dispatch(loginFulfill(user));
};

export const updatePassword = async (username, user, dispatch) => {
    try {
        const res = await api.put("taikhoan/" + username, user);
        alert("Đổi mật khẩu thành công!");
        const resSessions = res.data;
        resSessions.matkhau = encrypt(resSessions.matkhau);
        dispatch(loginFulfill(resSessions));
    } catch (err) {
        alert("Lỗi:", err);
    }
};
