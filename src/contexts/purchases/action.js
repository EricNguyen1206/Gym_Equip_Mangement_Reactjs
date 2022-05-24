import api from "../../api";

const getPending = () => ({
    type: "PURCHASES_GET_PENDING",
});
const getFulfill = (user) => ({
    type: "PURCHASES_GET_FULFILL",
    payload: user,
});
const getRejected = () => ({
    type: "PURCHASES_GET_REJECTED",
});

export const getPurchases = async (dispatch) => {
    dispatch(getPending());
    try {
        const res = await api.get("phieunhap");
        dispatch(getFulfill(res.data));
    } catch (err) {
        dispatch(getRejected());
    }
};

export const createPurchase = async (dispatch, data) => {
    console.log(data);
    try {
        const res = await api.post("phieunhap", data);
        dispatch({
            type: "PURCHASES_CREATE_FULFILL",
        });
    } catch (e) {
        console.log(e);
    }
};
