import { ArrowForwardIosRounded, AddRounded } from "@mui/icons-material";
import "./style.css";
import { ExtractOrders } from "../../../DummiesData";
import { useEffect, useState } from "react";
import { useExtractions } from "../../../contexts";
import {
    getExtractions,
    censorExtraction,
} from "../../../contexts/extractions/action";
function Extract() {
    const [popUp, setPopUp] = useState(false);
    const [currentExtraction, setCurrentExtraction] = useState(0);
    const [{ extractions }, dispatch] = useExtractions();
    useEffect(() => {
        getExtractions(dispatch);
    }, [dispatch]);
    const handleCensor = (extractId) => {
        censorExtraction(dispatch, extractId);
        getExtractions(dispatch);
    };
    return (
        <div className="extract">
            <h1 className="extract__title ws-path">
                Quản lý phiếu sử dụng
                <p className="extract__control--icon">
                    <ArrowForwardIosRounded />
                </p>
            </h1>
            <div className="extract__table">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Mã phiếu sử dụng</th>
                            <th>Mã tài khoản mượn</th>
                            <th>Ngày lập phiếu</th>
                            <th>Hoạt động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(extractions || ExtractOrders).map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <span>{item.mapsd}</span>
                                </td>
                                <td>
                                    <span>{item.matknv}</span>
                                </td>
                                <td>
                                    <span>{item.chitietPSD[0].ngaylay}</span>
                                </td>
                                <td>
                                    {item.matktk ? (
                                        <></>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleCensor(item.mapsd)
                                            }
                                        >
                                            Duyệt
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            setCurrentExtraction(index);
                                            setPopUp(true);
                                        }}
                                    >
                                        Chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="extract__subtable popUp">
                <div
                    id="subtable"
                    className="modal"
                    style={{ display: `${popUp ? "block" : "none"}` }}
                >
                    <form
                        className="modal-content animate"
                        action
                        method="post"
                    >
                        <h3>CHI TIẾT PHIẾU SỬ DỤNG</h3>
                        <div className="container">
                            <table className="tb-form">
                                <thead>
                                    <tr>
                                        <th>Mã phiếu sử dụng</th>
                                        <th>Mã thiết bị</th>
                                        <th>Ngày lập phiếu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {extractions ? (
                                        extractions[
                                            currentExtraction
                                        ].chitietPSD.map((item, i) => (
                                            <tr key={i}>
                                                <td>{item.mapsd} </td>
                                                <td>{item.matb} </td>
                                                <td>{item.ngaylay} </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <></>
                                    )}
                                </tbody>
                            </table>
                            <div className="btn-col">
                                <button
                                    type="button"
                                    onClick={() => setPopUp(false)}
                                    className="cancelbtn btn"
                                >
                                    Hủy
                                </button>
                                <button className="btn" type="submit">
                                    Duyệt
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Extract;
