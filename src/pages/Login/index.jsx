import { useState } from "react";
import styles from "./style.module.css";
import logo from "../../assets/images/Logo.png";
import avatar from "../../assets/images/Img_account.jpg";
import { useAuth } from "../../contexts";
import { login } from "../../contexts/auth/action";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [state, dispatch] = useAuth();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ username, password });
        login({ username, password }, dispatch);
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
                        {/* <div className={styles.formGroup}>
                            <label className={styles.labelForm} htmlFor="pos">
                                Chức vụ
                            </label>
                            <br />
                            <select
                                className={[
                                    styles.pos,
                                    styles.select,
                                    styles.loginInput,
                                ].join(" ")}
                                id="pos"
                                name="pos"
                            >
                                <option value="manager">Quản lý</option>
                                <option value="employee">Nhân viên</option>
                                <option value="storekeeper">Thủ kho</option>
                            </select>
                        </div> */}
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
                        {/* <div className={styles.login_subform}>
                            <div className={styles.subForm}>
                                <input
                                    type="checkbox"
                                    defaultChecked="checked"
                                    name="check"
                                    defaultValue="remember"
                                />
                                <label htmlFor="check">Lưu tài khoản</label>
                            </div>
                            <a href="#" className={styles.forget}>
                                Quên mật khẩu?
                            </a>
                        </div> */}
                        <button
                            className={[styles.btn, styles.btnDark].join(" ")}
                            onClick={(e) => handleSubmit(e)}
                        >
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
