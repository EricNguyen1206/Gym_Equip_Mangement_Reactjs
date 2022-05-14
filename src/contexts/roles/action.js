import api from "../../api";

const getRolePending = () => ({
    type: "ROLE_PENDING",
});
const getRoleFulfill = (user) => ({
    type: "ROLE_FULFILL",
    payload: user,
});
const getRoleRejected = () => ({
    type: "ROLE_REJECTED",
});

export const getRole = async (dispatch) => {
    dispatch(getRolePending());
    try {
        const res = await api.get("roles");
        dispatch(getRoleFulfill(res.data));
    } catch (err) {
        dispatch(getRoleRejected());
    }
};
