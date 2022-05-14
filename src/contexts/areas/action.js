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
