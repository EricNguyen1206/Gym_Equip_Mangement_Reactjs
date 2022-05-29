import "./style.css";
import { useState } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import man from "../../assets/images/man.jpg";
import storer from "../../assets/images/storer.jpg";
import staff from "../../assets/images/staff.jpg";
import { useAuth } from "../../contexts";
import { logout, updatePassword } from "../../contexts/auth/action";
import encrypt from "../../utils/encript";

function Topbar() {
    const [{ user }, dispatch] = useAuth();
    const [popUpDetail, setPopUpDetail] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const handleLogout = () => {
        logout(dispatch);
    };
    const handleUpdateAccount = () => {
        if (oldPassword === "" || newPassword === "") {
            alert("Vui lòng nhập đầy đủ thông tin!");
        } else if (user.matkhau !== encrypt(oldPassword)) {
            alert("Mật khẩu không chính xác! \nVui lòng kiểm tra lại!");
        } else {
            const data = {
                matkhau: newPassword,
            };
            updatePassword(user.username, data, dispatch);
            setPopUpDetail(false);
            setOldPassword("");
            setNewPassword("");
        }
    };
    return (
        <div className="topbar">
            <div className="topbar__item" onClick={() => handleLogout()}>
                <span>Đăng xuất</span>
                <span className="topbar__item--icon">
                    <LogoutOutlinedIcon />
                </span>
            </div>
            <div className="topbar__item" onClick={() => setPopUpDetail(true)}>
                <span>{user.username}</span>
                <img
                    className="topbar__item--avatar"
                    src={
                        user.idrole === "TKH"
                            ? storer
                            : user.idrole === "QLY"
                            ? man
                            : staff
                    }
                    alt="Avatar"
                />
            </div>
            <div className="popUp">
                <div
                    className="modal"
                    style={{
                        display: `${popUpDetail ? "block" : "none"}`,
                        position: "absolute",
                        width: "100%",
                        height: "100vh",
                    }}
                >
                    <form
                        className="modal-content animate"
                        style={{ width: "560px" }}
                    >
                        <h3>Đặt lại mật khẩu</h3>
                        <div className="container">
                            <table className="tb-form">
                                <tbody>
                                    <tr className="tb-form-row">
                                        <td
                                            className="tb-form-data"
                                            style={{ width: "50%" }}
                                        >
                                            <label
                                                style={{ fontSize: "1.2rem" }}
                                            >
                                                <b>Mật khẩu cũ</b>
                                            </label>
                                            <input
                                                type="text"
                                                value={oldPassword}
                                                onChange={(e) =>
                                                    setOldPassword(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </td>
                                        <td
                                            className="tb-form-data"
                                            style={{ width: "50%" }}
                                        >
                                            <label
                                                style={{ fontSize: "1.2rem" }}
                                            >
                                                <b>Mật khẩu mới</b>
                                            </label>
                                            <input
                                                type="text"
                                                value={newPassword}
                                                onChange={(e) =>
                                                    setNewPassword(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="btn-col">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPopUpDetail(false);
                                    }}
                                    className="cancelbtn btn"
                                >
                                    Hủy
                                </button>
                                <button
                                    className="btn"
                                    type="button"
                                    onClick={() => handleUpdateAccount()}
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Topbar;
