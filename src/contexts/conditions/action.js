import api from "../../api";

const getPending = () => ({
    type: "CONDITIONS_GET_PENDING",
});
const getFulfill = (user) => ({
    type: "CONDITIONS_GET_FULFILL",
    payload: user,
});
const getRejected = () => ({
    type: "CONDITIONS_GET_REJECTED",
});

export const getConditions = async (dispatch) => {
    dispatch(getPending());
    try {
        const res = await api.get("tinhtrang");
        dispatch(getFulfill(res.data));
    } catch (err) {
        dispatch(getRejected());
    }
};
