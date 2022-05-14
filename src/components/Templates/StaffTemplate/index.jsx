import "./style.css";
import { useState } from "react";
import Topbar from "../../Topbar";
import Sidebar from "../../Sidebar";
import { User } from "../../../DummiesData";

const LayoutStaff = (props) => {
    const [toggleNav, setToggleNav] = useState(false);
    const routes = [
        {
            title: "Quản lý thiết bị",
            path: "/",
        },
        {
            title: "Mượn thiết bị",
            path: "/liquitation",
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
                <Topbar user={User} />
                {props?.children}
            </div>
        </div>
    );
};

function StaffTemplate(props) {
    return <LayoutStaff>{props?.children}</LayoutStaff>;
}

export default StaffTemplate;
