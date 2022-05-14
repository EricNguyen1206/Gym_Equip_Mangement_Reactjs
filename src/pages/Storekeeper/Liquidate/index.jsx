import { ArrowForwardIosRounded, AddRounded } from "@mui/icons-material";
import "./style.css";
import { LiquidOrders } from "../../../DummiesData";
import { useEffect, useState } from "react";
import { useLiquidations } from "../../../contexts";
import { getLiquidations } from "../../../contexts/liquidations/action";

function Liquidate() {
    const [popUp, setPopUp] = useState(false);
    const [liquidNum, setLiquidNum] = useState(0);
    const [{ liquidations }, dispatch] = useLiquidations();
    useEffect(() => {
        getLiquidations(dispatch);
    }, []);
    return (
        <div className="liquidate">
            <h1 className="liquidate__title ws-path">
                Quản lý phiếu thanh lý
                <p className="liquidate__control--icon">
                    <ArrowForwardIosRounded />
                </p>
            </h1>
            <div className="liquidate__table">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Mã phiếu thanh lý</th>
                            <th>Tài khoản thanh lý</th>
                            <th>Ngày thanh lý</th>
                            <th>Hoạt động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(liquidations || LiquidOrders).map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <span>{item.maptl}</span>
                                </td>
                                <td>
                                    <span>{item.matk}</span>
                                </td>
                                <td>
                                    <span>{item.ngaythanhly}</span>
                                </td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setLiquidNum(index);
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

            <div className="liquidate__subtable popUp">
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
                                        <th>Giá thanh lý</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(liquidations
                                        ? liquidations[liquidNum]
                                        : LiquidOrders[liquidNum]
                                    ).chitietPTL.map((item, i) => (
                                        <tr key={i}>
                                            <td>{item.maptl} </td>
                                            <td>{item.matb} </td>
                                            <td>{item.gia} VND</td>
                                        </tr>
                                    ))}
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

export default Liquidate;
