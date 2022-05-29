import { ArrowForwardIosRounded, AddRounded } from "@mui/icons-material";
import "./style.css";
import { Table } from "../../../components";
import { EquipStatus } from "../../../DummiesData";
import { LiquidOrders } from "../../../DummiesData";
import { useEffect, useState } from "react";
import {
    useLiquidations,
    useEquipments,
    useConditions,
} from "../../../contexts";
import { getLiquidations } from "../../../contexts/liquidations/action";

const equipmentsTitle = [
    "Id",
    "Mã phiếu nhập",
    "Mã loại thiết bị",
    "Mã khu vực",
    "Tình trạng",
];
function Liquidate() {
    const [popUpDetail, setPopUpDetail] = useState(false);
    const [popUpForm, setPopUpForm] = useState(false);
    const [liquidNum, setLiquidNum] = useState(0);
    const [readyList, setReadyList] = useState(() => []);
    const [{ conditions }, dispatchConditions] = useConditions();
    const [{ equipments }, dispatchEquipments] = useEquipments();
    const [{ liquidations }, dispatch] = useLiquidations();
    useEffect(() => {
        getLiquidations(dispatch);
    }, [dispatch]);
    console.log("check", liquidations);
    const handleCheck = (id) => {
        const index = readyList.indexOf(id);
        if (index === -1) {
            setReadyList([...readyList, id]);
        } else {
            const newList = [...readyList];
            newList.splice(index, 1);
            setReadyList(newList);
        }
    };
    const transEquipCondition = (condition) => {
        const res = (conditions || EquipStatus).find(
            (element) => element.id === condition
        );
        return res?.tinhtrang;
    };
    const preprocessor = (data) => {
        const res = data.map((item) => ({
            ...item,
            tinhtrangTb: transEquipCondition(item.tinhtrangTb),
        }));
        return res;
    };
    const handleLiquid = () => {
        setPopUpForm(true);
    };
    return (
        <div className="liquidate">
            <h1 className="liquidate__title ws-path">
                Quản lý phiếu thanh lý
                <p className="liquidate__control--icon">
                    <ArrowForwardIosRounded />
                </p>
            </h1>
            <div className="liquidate__control">
                <button className="btn-add" onClick={() => handleLiquid()}>
                    <p className="liquidation__control--icon">
                        <AddRounded />
                    </p>
                    Tạo phiếu thanh lý
                </button>
            </div>
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
                                            setPopUpDetail(true);
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
                    className="modal"
                    style={{ display: `${popUpForm ? "block" : "none"}` }}
                >
                    <form
                        className="modal-content animate"
                        action
                        method="post"
                    >
                        <h3>TẠO PHIẾU THANH LÝ</h3>
                        <div className="container">
                            <div className="content">
                                <h3>Phiếu thanh lý: PTL01</h3>
                                <h3>Ngày lập phiếu: 12/06/2001</h3>
                                <h3>Tài khoản lập phiếu: TK02</h3>
                            </div>
                            {equipments ? (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Mã thiết bị</th>
                                            <th>Loại thiết bị</th>
                                            <th>Tình trạng</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {equipments.map((equip, index) =>
                                            equip.tinhtrangTb !== 5 &&
                                            equip.tinhtrangTb !== 7 ? (
                                                <tr key={index}>
                                                    <td>{equip.id}</td>
                                                    <td>{equip.maltb}</td>
                                                    <td>{equip.tinhtrangTb}</td>
                                                    <td>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                justifyContent:
                                                                    "center",
                                                            }}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name="status"
                                                                className="status"
                                                                onChange={() =>
                                                                    handleCheck(
                                                                        equip.id
                                                                    )
                                                                }
                                                            />
                                                            <p
                                                                style={{
                                                                    marginLeft:
                                                                        "8px",
                                                                }}
                                                            >
                                                                Thanh lý
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                <></>
                                            )
                                        )}
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
                                    type="button"
                                    onClick={() => setPopUpForm(false)}
                                    className="cancelbtn btn"
                                >
                                    Tạo phiếu
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div
                    id="subtable"
                    className="modal"
                    style={{ display: `${popUpDetail ? "block" : "none"}` }}
                >
                    <form
                        className="modal-content animate"
                        action
                        method="post"
                    >
                        <h3>CHI TIẾT PHIẾU THANH LÝ</h3>
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
                                    {liquidations && liquidations.length ? (
                                        liquidations[liquidNum].chitietPTL.map(
                                            (item, i) => (
                                                <tr key={i}>
                                                    <td>{item.maptl} </td>
                                                    <td>{item.matb} </td>
                                                    <td>{item.gia} VND</td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <></>
                                    )}
                                </tbody>
                            </table>
                            <div className="btn-col">
                                <button
                                    type="button"
                                    onClick={() => setPopUpDetail(false)}
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
