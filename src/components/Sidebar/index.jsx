import { useLocation } from "react-router-dom";
import "./style.css";
import logo from "../../assets/images/Logo.png";
import { Link } from "react-router-dom";

function Sidebar({ routes, toggleNav, setToggleNav }) {
    const location = useLocation();
    return (
        <div className="remote-control">
            <div id="logo">
                <img
                    src={logo}
                    style={{ maxWidth: "50%", maxHeight: "50%" }}
                    alt="logo"
                />
                <br /> Master Fitness
            </div>
            <div className="func-ctrl">
                <ul>
                    {routes.map((item, index) => (
                        <Link key={index} to={item.path}>
                            <li
                                key={index}
                                className={`func-ctrl_items ${
                                    location.pathname === item.path
                                        ? "active"
                                        : ""
                                }`}
                            >
                                <span className="func-ctrl_link">
                                    {item.title}
                                </span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
