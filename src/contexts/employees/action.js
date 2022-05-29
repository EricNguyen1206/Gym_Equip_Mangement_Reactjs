import api from "../../api";

const getPending = () => ({
    type: "EMPLOYEES_GET_PENDING",
});
const getFulfill = (user) => ({
    type: "EMPLOYEES_GET_FULFILL",
    payload: user,
});
const getRejected = () => ({
    type: "EMPLOYEES_GET_REJECTED",
});

export const getEmployees = async (dispatch) => {
    dispatch(getPending());
    try {
        const res = await api.get("nhanvien");
        dispatch(getFulfill(res.data));
    } catch (err) {
        dispatch(getRejected());
    }
};

export const postEmployee = async (dispatch, data) => {
    try {
        const res = await api.post("nhanvien", data);
        dispatch({
            type: "EMPLOYEES_POST_FULFILL",
            payload: res.data,
        });
        alert("Tạo nhân viên thành công!");
    } catch (err) {
        console.log(err);
        alert("Lỗi:", err.response.data.message);
    }
};
