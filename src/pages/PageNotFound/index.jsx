import "./style.css";
import { Link } from "react-router-dom";

function PageNotFound() {
    return (
        <div className="page-not-found">
            <h1>Không tìm thấy trang bạn cần</h1>
            <Link to="/">
                <button className="btn">Quay lại trang chủ</button>
            </Link>
        </div>
    );
}

export default PageNotFound;
