import { ArrowForwardIosRounded, AddRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import "./style.css";
import { usePurchases } from "../../../contexts";
import { getPurchases } from "../../../contexts/purchases/action";

function Purchase() {
    const [popUp, setPopUp] = useState(false);
    const [currentPurchase, setCurrentPurchase] = useState(0);
    const [{ purchases }, dispatch] = usePurchases();
    useEffect(() => {
        getPurchases(dispatch);
    }, []);
    return (
        <div className="purchase">
            <h1 className="purchase__title ws-path">
                Quản lý phiếu nhập hàng
                <p className="purchase__control--icon">
                    <ArrowForwardIosRounded />
                </p>
            </h1>
            <div className="purchase__table">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Mã phiếu nhập hàng</th>
                            <th>Mã tài khoản nhập hàng</th>
                            <th>Ngày lập phiếu</th>
                            <th>Hoạt động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(purchases ? purchases : []).map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <span>{item.mapn}</span>
                                </td>
                                <td>
                                    <span>{item.matk}</span>
                                </td>
                                <td>
                                    <span>{item.ngaynhap}</span>
                                </td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setCurrentPurchase(index);
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

            <div className="purchase__subtable popUp">
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
                        <h3>CHI TIẾT PHIẾU NHẬP</h3>
                        <div className="container">
                            <table className="tb-form">
                                <thead>
                                    <tr>
                                        <th>Mã phiếu nhập</th>
                                        <th>Mã thiết bị</th>
                                        <th>Số lượng</th>
                                        <th>Đơn giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchases
                                        ? purchases[
                                              currentPurchase
                                          ].chitietPN.map((item, i) => (
                                              <tr key={i}>
                                                  <td>{item.mapn} </td>
                                                  <td>{item.matb} </td>
                                                  <td>{item.soluong} </td>
                                                  <td>{item.gia} </td>
                                              </tr>
                                          ))
                                        : ""}
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

export default Purchase;
