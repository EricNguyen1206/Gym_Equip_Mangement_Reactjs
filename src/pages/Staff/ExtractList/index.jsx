import "./style.css";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useExtractions, useAuth } from "../../../contexts";
import { getExtractions } from "../../../contexts/extractions/action";
function ExtractList() {
    const [popUp, setPopUp] = useState(false);
    const [currentExtraction, setCurrentExtraction] = useState(0);
    const [{ extractions }, dispatchExtractions] = useExtractions();
    const [{ user }, dispatchUser] = useAuth();
    console.log(extractions);
    useEffect(() => {
        getExtractions(dispatchExtractions);
    }, [dispatchExtractions]);
    return (
        <div className="extractList">
            <h1 className="extractList__title ws-path">
                Danh sách phiếu thanh lý
                <p className="extractList__control--icon">
                    <ArrowForwardIosRounded />
                </p>
            </h1>
            <div className="extractList__table">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Mã phiếu sử dụng</th>
                            <th>Mã tài khoản mượn</th>
                            <th>Ngày lập phiếu</th>
                            <th>Trạng thái</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {extractions ? (
                            extractions.map((item, index) => {
                                if (item.matknv === user.username) {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <span>{item.mapsd}</span>
                                            </td>
                                            <td>
                                                <span>{item.matknv}</span>
                                            </td>
                                            <td>
                                                <span>
                                                    {item.chitietPSD[0]
                                                        ? item.chitietPSD[0]
                                                              .ngaylay
                                                        : "Null"}
                                                </span>
                                            </td>
                                            <td>
                                                <span>
                                                    {item.matktk
                                                        ? "Đã duyệt"
                                                        : "Chưa được duyệt"}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        setCurrentExtraction(
                                                            index
                                                        );
                                                        setPopUp(true);
                                                    }}
                                                >
                                                    Chi tiết
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }
                            })
                        ) : (
                            <></>
                        )}
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
                                        <th>Ngày trả</th>
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
                                                {/* <td>abc </td> */}
                                                <td>
                                                    {item.ngaytra
                                                        ? item.ngaytra
                                                        : "Chưa trả"}{" "}
                                                </td>
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
                                    Thoát
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ExtractList;
