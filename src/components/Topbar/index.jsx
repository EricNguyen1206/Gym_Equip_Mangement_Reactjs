import styles from "./style.css";
import { useState } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import man from "../../assets/images/man.jpg";
import storer from "../../assets/images/storer.jpg";
import staff from "../../assets/images/staff.jpg";

function Topbar({ user }) {
    return (
        <div className="topbar">
            <div className="topbar__item">
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
                        user.idrole === 1
                            ? storer
                            : user.idrole === 2
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