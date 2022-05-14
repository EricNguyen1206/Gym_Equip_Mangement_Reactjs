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
