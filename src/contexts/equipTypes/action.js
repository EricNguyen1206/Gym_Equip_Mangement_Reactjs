import api from "../../api";

const getPending = () => ({
    type: "EQUIPTYPES_GET_PENDING",
});
const getFulfill = (user) => ({
    type: "EQUIPTYPES_GET_FULFILL",
    payload: user,
});
const getRejected = () => ({
    type: "EQUIPTYPES_GET_REJECTED",
});

export const getEquipTypes = async (dispatch) => {
    dispatch(getPending());
    try {
        const res = await api.get("loaithietbi");
        dispatch(getFulfill(res.data));
    } catch (err) {
        dispatch(getRejected());
    }
};
