import "./style.css";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import man from "../../assets/images/man.jpg";
import storer from "../../assets/images/storer.jpg";
import staff from "../../assets/images/staff.jpg";
import { useAuth } from "../../contexts";
import { logout } from "../../contexts/auth/action";

function Topbar() {
    const [{ user }, dispatch] = useAuth();
    const handleLogout = () => {
        logout(dispatch);
    };
    return (
        <div className="topbar">
            <div className="topbar__item" onClick={() => handleLogout()}>
                <span>Đăng xuất</span>
                <span className="topbar__item--icon">
                    <LogoutOutlinedIcon />
                </span>
            </div>
            <div className="topbar__item">
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
        </div>
    );
}

export default Topbar;
