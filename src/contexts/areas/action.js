import api from "../../api";

const getPending = () => ({
    type: "AREAS_GET_PENDING",
});
const getFulfill = (user) => ({
    type: "AREAS_GET_FULFILL",
    payload: user,
});
const getRejected = () => ({
    type: "AREAS_GET_REJECTED",
});

export const getAreas = async (dispatch) => {
    dispatch(getPending());
    try {
        const res = await api.get("khuvuc");
        dispatch(getFulfill(res.data));
    } catch (err) {
        dispatch(getRejected());
    }
};

export const createArea = async (dispatch, data) => {
    try {
        const res = await api.post("khuvuc", data);
        dispatch({
            type: "AREAS_CREATE_FULFILL",
            payload: res.data,
        });
    } catch (err) {
        alert("Lỗi:", err);
    }
};

export const updateArea = async (dispatch, id, data) => {
    try {
        const res = await api.put("khuvuc/" + id, data);
        dispatch({
            type: "AREAS_UPDATE_FULFILL",
            payload: res.data,
        });
        alert("Chỉnh sửa khu vực thành công");
    } catch (err) {
        alert("Lỗi:", err.message);
        console.log(err);
    }
};
