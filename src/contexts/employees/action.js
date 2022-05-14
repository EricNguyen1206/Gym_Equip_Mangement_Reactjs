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
