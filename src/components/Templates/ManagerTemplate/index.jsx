import "./style.css";
import { useState } from "react";
import Topbar from "../../Topbar";
import Sidebar from "../../Sidebar";
import { User } from "../../../DummiesData";

const LayoutManager = (props) => {
    const [toggleNav, setToggleNav] = useState(false);
    const routes = [
        {
            title: "Thống kê",
            path: "/",
        },
        {
            title: "Thiết bị",
            path: "/equipment",
        },
        {
            title: "Tài khoản",
            path: "/account",
        },
        {
            title: "Nhân viên",
            path: "/employee",
        },
        {
            title: "Khu vực",
            path: "/area",
        },
    ];
    return (
        <div className="container">
            <Sidebar
                routes={routes}
                toggleNav={toggleNav}
                setToggleNav={setToggleNav}
            />
            {/* ========================= Main ==================== */}
            <div className={`main ${toggleNav ? "active" : ""}`}>
                <Topbar />
                {props?.children}
            </div>
        </div>
    );
};

function ManagerTemplate(props) {
    return <LayoutManager>{props?.children}</LayoutManager>;
}

export default ManagerTemplate;
