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

export const putConditionEquipments = async (dispatch, id) => {
    const condition = {
        tinhtrangTb: "BHU",
    };
    try {
        const res = await api.put("thietbi/" + id, condition);
        dispatch({
            type: "EQUIPMENTS_PUTCONDITION_FULFILL",
            payload: res.data,
        });
        console.log("ok");
    } catch (err) {
        console.log("err:", err);
    }
};
