import api from "../../api";

const getPending = () => ({
    type: "EXTRACTION_GET_PENDING",
});
const getFulfill = (user) => ({
    type: "EXTRACTION_GET_FULFILL",
    payload: user,
});
const getRejected = () => ({
    type: "EXTRACTION_GET_REJECTED",
});

export const getExtractions = async (dispatch) => {
    dispatch(getPending());
    try {
        const res = await api.get("phieusudung");
        dispatch(getFulfill(res.data));
    } catch (err) {
        dispatch(getRejected());
    }
};

export const postExtraction = async (dispatch, psd) => {
    dispatch({
        type: "EXTRACTION_POST_PENDING",
    });
    try {
        const res = await api.post("phieusudung", psd);
        dispatch({
            type: "EXTRACTION_POST_FULFILL",
            payload: res,
        });
        alert("Tạo phiếu thành công!");
    } catch (err) {
        console.log("err");
        dispatch({
            type: "EXTRACTION_POST_REJECTED",
        });
    }
};

export const censorExtraction = async (dispatch, mapsd) => {
    dispatch({
        type: "EXTRACTION_CENSOR_PENDING",
    });
    try {
        const res = await api.post("phieusudung/" + mapsd);
        dispatch({
            type: "EXTRACTION_CENSOR_FULFILL",
            payload: res,
        });
    } catch (err) {
        console.log("err");
        dispatch({
            type: "EXTRACTION_CENSOR_REJECTED",
        });
    }
};

export const rollbackEquipment = async (dispatch, mapsd, equipid) => {
    try {
        const res = await api.put("phieusudung/" + mapsd, { id: equipid });
        dispatch({
            type: "EXTRACTION_ROLLBACK_FULFILL",
            payload: res.data,
        });
    } catch (err) {
        console.log("Ok");
    }
};
