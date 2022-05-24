import "./style.css";
import { Link } from "react-router-dom";
function Nopermission() {
    return (
        <div className="nopermission">
            <h1>Tài khoản chưa được cấp quyền</h1>
            <a href="/">
                <button className="btn">Đăng nhập tài khoản khác</button>
            </a>
        </div>
    );
}

export default Nopermission;
