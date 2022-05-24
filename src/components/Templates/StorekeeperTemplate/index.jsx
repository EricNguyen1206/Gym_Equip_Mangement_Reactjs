import "./style.css";
import { useState } from "react";
import Topbar from "../../Topbar";
import Sidebar from "../../Sidebar";
import { User } from "../../../DummiesData";

const LayoutStorekeeper = (props) => {
    const [toggleNav, setToggleNav] = useState(false);
    const routes = [
        {
            title: "Phiếu sử dụng",
            path: "/",
        },
        {
            title: "Nhập hàng",
            path: "/purchase",
        },
        {
            title: "Thiết bị",
            path: "/equipment",
        },
        {
            title: "Thanh lý",
            path: "/liquidate",
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

function StorekeeperTemplate(props) {
    return <LayoutStorekeeper>{props?.children}</LayoutStorekeeper>;
}

export default StorekeeperTemplate;
