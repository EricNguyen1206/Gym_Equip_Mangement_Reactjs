import api from "../../api";

const getPending = () => ({
    type: "LIQUIDATION_GET_PENDING",
});
const getFulfill = (user) => ({
    type: "LIQUIDATION_GET_FULFILL",
    payload: user,
});
const getRejected = () => ({
    type: "LIQUIDATION_GET_REJECTED",
});

export const getLiquidations = async (dispatch) => {
    dispatch(getPending());
    try {
        const res = await api.get("phieuthanhly");
        dispatch(getFulfill(res.data));
    } catch (err) {
        dispatch(getRejected());
    }
};
