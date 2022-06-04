import { useEffect, useState } from "react";
import styles from "./style.module.css";
import logo from "../../assets/images/Logo.png";
import avatar from "../../assets/images/Img_account.jpg";
import { useAuth } from "../../contexts";
import { login, forgetPassword } from "../../contexts/auth/action";
import encrypt from "../../utils/encript";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [manv, setManv] = useState("");
    const [popUp, setPopUp] = useState(false);
    const [{ user }, dispatch] = useAuth();
    useEffect(() => {
        if (user) {
            if (!user.trangthai) {
                alert("Tài khoản này đã bị khóa!");
            }
        }
    }, [user]);
    const handleSubmit = (e) => {
        e.preventDefault();
        login({ username, matkhau: encrypt(password) }, dispatch);
    };
    const handleForgetPass = () => {
        if (username === "" || manv === "" || email === "") {
            alert("Vui lòng nhập đầy đủ thông tin!");
        } else {
            const data = {
                manv,
                email,
            };
            forgetPassword(dispatch, username, data);
        }
        setPopUp(false);
        setUsername("");
        setManv("");
        setEmail("");
    };
    return (
        <div className={styles.loginContainer}>
            <div className={styles.login}>
                <img
                    src={avatar}
                    id="img-acc"
                    className={styles.imgAcc}
                    alt="avatar"
                />
                <div className={styles.loginForm}>
                    <div className={styles.loginForm_logo}>
                        <img
                            src={logo}
                            className={styles.logo}
                            alt="logo"
                            id="logo"
                        />
                        <h3>Master Fitness</h3>
                    </div>
                    <form className={styles.loginFields}>
                        <div className={styles.formGroup}>
                            <label className={styles.labelForm} htmlFor="name">
                                Tài khoản
                            </label>
                            <br />
                            <input
                                className={[styles.loginInput].join(" ")}
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Nhập tài khoản"
                                value={username}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setUsername(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label className={styles.labelForm} htmlFor="pass">
                                Mật khẩu
                            </label>
                            <br />
                            <input
                                className={[styles.loginInput].join(" ")}
                                type="password"
                                id="pass"
                                name="pass"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                        <button
                            type="button"
                            style={{
                                display: "block",
                                backgroundColor: "transparent",
                                color: "blue",
                                textDecoration: "underline",
                                cursor: "pointer",
                            }}
                            onClick={() => setPopUp(true)}
                        >
                            Quên mật khẩu
                        </button>
                        <button
                            className={[styles.btn, styles.btnDark].join(" ")}
                            onClick={(e) => handleSubmit(e)}
                        >
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
            <div className="account__subtable popUp">
                <div
                    className="modal"
                    style={{ display: `${popUp ? "block" : "none"}` }}
                >
                    <form
                        className="modal-content animate"
                        style={{ width: "45%", fontSize: "1.4rem" }}
                    >
                        <h3>ĐẶT LẠI MẬT KHẨU</h3>
                        <div className="container">
                            <table className="tb-form">
                                <tbody>
                                    <tr className="tb-form-row">
                                        <td className="tb-form-data">
                                            <label htmlFor="time">
                                                <b>Tên tài khoản</b>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Nhập tên tài khoản"
                                                required
                                                value={username}
                                                onChange={(e) =>
                                                    setUsername(e.target.value)
                                                }
                                            />
                                        </td>
                                        <td className="tb-form-data">
                                            <label htmlFor="id">
                                                <b>Email</b>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Nhập email"
                                                required
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </td>
                                        <td className="tb-form-data">
                                            <label htmlFor="id">
                                                <b>Mã nhân viên</b>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Nhập ID nhân viên"
                                                required
                                                value={manv}
                                                onChange={(e) =>
                                                    setManv(e.target.value)
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
                                        setPopUp(false);
                                        setUsername("");
                                        setManv("");
                                        setEmail("");
                                    }}
                                    className="cancelbtn btn"
                                >
                                    Thoát
                                </button>
                                <button
                                    className="btn"
                                    type="button"
                                    onClick={() => handleForgetPass()}
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

export default Login;
