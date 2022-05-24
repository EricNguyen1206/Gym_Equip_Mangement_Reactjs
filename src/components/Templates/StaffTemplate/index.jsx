import "./style.css";
import { useState } from "react";
import Topbar from "../../Topbar";
import Sidebar from "../../Sidebar";
const LayoutStaff = (props) => {
    const [toggleNav, setToggleNav] = useState(false);
    const routes = [
        {
            title: "Quản lý thiết bị",
            path: "/",
        },
        {
            title: "Yêu cầu thiết bị",
            path: "/liquitation",
        },
        {
            title: "Phiếu sử dụng",
            path: "/extractlist",
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

function StaffTemplate(props) {
    return <LayoutStaff>{props?.children}</LayoutStaff>;
}

export default StaffTemplate;
