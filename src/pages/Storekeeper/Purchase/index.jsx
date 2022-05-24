import { ArrowForwardIosRounded, AddRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import "./style.css";
import { usePurchases, useEquipTypes } from "../../../contexts";
import { getEquipTypes } from "../../../contexts/equipTypes/action";
import {
    getPurchases,
    createPurchase,
} from "../../../contexts/purchases/action";

function Purchase() {
    const [popUp, setPopUp] = useState(false);
    const [popUpForm, setPopUpForm] = useState(false);
    const [currentPurchase, setCurrentPurchase] = useState(0);
    const [purchaseDetails, setPurchaseDetails] = useState([]);
    const [priceList, setPriceList] = useState([]);
    const [amountList, setAmountList] = useState([]);
    const [{ equipTypes }, dispatchEquipTypes] = useEquipTypes();
    const [{ purchases }, dispatch] = usePurchases();
    useEffect(() => {
        getPurchases(dispatch);
        getEquipTypes(dispatchEquipTypes);
    }, [dispatch]);
    const handleAddPurchaseDetail = (item) => {
        let index = purchaseDetails.findIndex((detail) => detail === item);
        if (index !== -1) {
            let newAmountList = [...amountList];
            newAmountList[index] = newAmountList[index] * 1 + 1;
            setAmountList(newAmountList);
        } else {
            setPurchaseDetails([...purchaseDetails, item]);
            setPriceList([...priceList, 0]);
            setAmountList([...amountList, 1]);
        }
    };
    const handleChangePrice = (e, index) => {
        let newPriceList = [...priceList];
        newPriceList[index] = e.target.value;
        setPriceList(newPriceList);
    };
    const handleChangeAmound = (e, index) => {
        if (e.target.value == 0) {
            const newAmountList = [...amountList];
            const newPriceList = [...priceList];
            const newPurchageDetails = [...purchaseDetails];
            newAmountList.splice(index, 1);
            newPriceList.splice(index, 1);
            newPurchageDetails.splice(index, 1);
            console.log(
                e.target.value,
                newPurchageDetails,
                newAmountList,
                newPriceList
            );
            setAmountList(newAmountList);
            setPurchaseDetails(newPurchageDetails);
            setPriceList(newPriceList);
        }
        let newAmountList = [...amountList];
        newAmountList[index] = e.target.value;
        setAmountList(newAmountList);
    };
    const handleSubmit = () => {
        setPopUpForm(false);
        const data = {
            chitietPN: purchaseDetails.map((item, index) => ({
                soluong: amountList[index],
                gia: parseFloat(priceList[index]),
                maltb: item,
            })),
        };
        createPurchase(dispatch, data);
    };
    return (
        <div className="purchase">
            <h1 className="purchase__title ws-path">
                Quản lý phiếu nhập hàng
                <p className="purchase__control--icon">
                    <ArrowForwardIosRounded />
                </p>
            </h1>
            <div className="purchase__control">
                <button className="btn-add" onClick={() => setPopUpForm(true)}>
                    <p className="liquidation__control--icon">
                        <AddRounded />
                    </p>
                    Tạo phiếu nhập
                </button>
            </div>
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
            <div className="purchase__subtable popUp">
                <div
                    className="modal"
                    style={{ display: `${popUpForm ? "block" : "none"}` }}
                >
                    <form
                        className="modal-content animate"
                        action
                        method="post"
                    >
                        <h3>TẠO PHIẾU NHẬP</h3>
                        <div className="container purchase__subtable--readyList">
                            {purchaseDetails.length > 0 ? (
                                <table className="tb-form">
                                    <thead>
                                        <tr>
                                            <th>Mã thiết bị</th>
                                            <th>Số lượng</th>
                                            <th>Giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {purchaseDetails.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        required
                                                        min="0"
                                                        value={
                                                            amountList[index]
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeAmound(
                                                                e,
                                                                index
                                                            )
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    VND
                                                    <input
                                                        type="number"
                                                        required
                                                        min="0"
                                                        step="1000"
                                                        value={priceList[index]}
                                                        onChange={(e) =>
                                                            handleChangePrice(
                                                                e,
                                                                index
                                                            )
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="container purchase__subtable--typeList">
                            {equipTypes ? (
                                <table className="tb-form">
                                    <thead>
                                        <tr>
                                            <th>Mã thiết bị</th>
                                            <th>Tên thiết bị</th>
                                            <th>Mô tả</th>
                                            <th>Nhập thêm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {equipTypes.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.matb} </td>
                                                <td>{item.tentb} </td>
                                                <td>{item.chitiet} </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn-primary"
                                                        onClick={() =>
                                                            handleAddPurchaseDetail(
                                                                item.matb
                                                            )
                                                        }
                                                    >
                                                        Thêm
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <></>
                            )}

                            <div className="btn-col">
                                <button
                                    type="button"
                                    onClick={() => setPopUpForm(false)}
                                    className="cancelbtn btn"
                                >
                                    Thoát
                                </button>
                                <button
                                    style={{
                                        display: `${
                                            purchaseDetails.length > 0
                                                ? "block"
                                                : "none"
                                        }`,
                                    }}
                                    type="button"
                                    onClick={() => handleSubmit()}
                                    className="cancelbtn btn"
                                >
                                    Xác nhận
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
