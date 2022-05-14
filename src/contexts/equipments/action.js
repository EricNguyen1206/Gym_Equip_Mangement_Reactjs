import api from "../../api";

const getPending = () => ({
    type: "EQUIPMENTS_GET_PENDING",
});
const getFulfill = (user) => ({
    type: "EQUIPMENTS_GET_FULFILL",
    payload: user,
});
const getRejected = () => ({
    type: "EQUIPMENTS_GET_REJECTED",
});

export const getEquipments = async (dispatch) => {
    dispatch(getPending());
    try {
        const res = await api.get("thietbi");
        dispatch(getFulfill(res.data));
    } catch (err) {
        dispatch(getRejected());
    }
};
