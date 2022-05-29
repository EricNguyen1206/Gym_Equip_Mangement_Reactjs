import { useEffect, useState } from "react";
import { ArrowForwardIosRounded, AddRounded } from "@mui/icons-material";
import "./style.css";
import { Table } from "../../../components";
import { useAreas, useAccounts } from "../../../contexts";
import {
    getAreas,
    createArea,
    updateArea,
} from "../../../contexts/areas/action";
const areaTitle = ["Mã khu vực", "Tên khu vực", "Mã tài khoản"];
function Area() {
    const [{ areas }, dispatchAreas] = useAreas();
    const [{ accounts }, dispatchAccounts] = useAccounts();
    const [popUp, setPopUp] = useState(false);
    const [areaId, setAreaId] = useState(null);
    const [areaName, setAreaName] = useState(null);
    const [popUpDetail, setPopUpDetail] = useState(false);
    const [curArea, setCurArea] = useState(null);
    useEffect(() => {
        getAreas(dispatchAreas);
    }, []);

    console.log("account:", accounts);

    const preprocessor = (data) => {
        const res = data.map((item) => ({
            ...item,
            matk: item.matk ? item.matk : "Null",
        }));
        return res;
    };
    const handleAreaIdChange = (e) => {
        if (e.target.value.length > 4) {
            alert("Mã thiết bị phải đúng 4 ký tự");
        } else {
            setAreaId(e.target.value);
        }
    };
    const handleSubmit = () => {
        const data = {
            makv: areaId,
            tenkv: areaName,
        };
        if (areaId.length !== 4) {
            alert("Mã khu vực phải đủ 4 ký tự");
        } else if (areaName.length === 0) {
            alert("Tên khu vực không được để trống");
        } else {
            createArea(dispatchAreas, data);
            setPopUp(false);
            setAreaId("");
            setAreaName("");
        }
    };
    const handlePermit = (username) => {
        const data = {
            makv: curArea.makv,
            tenkv: curArea.tenkv,
            matk: username,
        };
        console.log("oki:", data);
        updateArea(dispatchAreas, curArea.makv, data);
        setPopUpDetail(false);
    };
    return (
        <div className="area">
            <h1 className="area__title ws-path">
                Quản lý khu vực
                <p className="area__control--icon">
                    <ArrowForwardIosRounded />
                </p>
            </h1>
            <div className="area__control">
                <button className="btn-add" onClick={() => setPopUp(true)}>
                    <p className="area__control--icon">
                        <AddRounded />
                    </p>
                    Thêm khu vực
                </button>
            </div>
            <div className="area__table">
                {areas ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Mã khu vực</th>
                                <th>Tên khu vực</th>
                                <th>Tài khoản giám sát</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {preprocessor(areas).map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <span>{item.makv}</span>
                                    </td>
                                    <td>
                                        <span>{item.tenkv}</span>
                                    </td>
                                    <td>
                                        <span>{item.matk}</span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-primary"
                                            onClick={() => {
                                                setPopUpDetail(true);
                                                setCurArea(item);
                                            }}
                                        >
                                            Bổ nhiệm người mới
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <></>
                )}
            </div>
            <div className="liquidate__subtable popUp">
                <div
                    className="modal"
                    style={{ display: `${popUp ? "block" : "none"}` }}
                >
                    <form className="modal-content animate">
                        <h3>TẠO PHÒNG TẬP</h3>
                        <div className="container">
                            <table className="tb-form">
                                <tbody>
                                    <tr className="tb-form-row">
                                        <td className="tb-form-data">
                                            <label htmlFor="id">
                                                <b>Mã phòng</b>
                                            </label>
                                        </td>
                                        <td className="tb-form-data">
                                            <input
                                                type="text"
                                                placeholder="Nhập ID"
                                                name="id"
                                                required
                                                value={areaId}
                                                onChange={(e) =>
                                                    handleAreaIdChange(e)
                                                }
                                            />
                                        </td>
                                        <td className="tb-form-data">
                                            <label htmlFor="time">
                                                <b>Tên phòng</b>
                                            </label>
                                        </td>
                                        <td className="tb-form-data">
                                            <input
                                                type="text"
                                                placeholder="Nhập tên khu vưc"
                                                name="name"
                                                required
                                                value={areaName}
                                                onChange={(e) =>
                                                    setAreaName(e.target.value)
                                                }
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="btn-col">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPopUp(false);
                                        setAreaName("");
                                        setAreaId("");
                                    }}
                                    className="cancelbtn btn"
                                >
                                    Hủy
                                </button>
                                <button
                                    className="btn"
                                    type="button"
                                    onClick={() => handleSubmit()}
                                >
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="account__subtable popUp">
                <div
                    className="modal"
                    style={{ display: `${popUpDetail ? "block" : "none"}` }}
                >
                    <form className="modal-content animate">
                        <h3>BỔ NHIỆM NHÂN VIÊN</h3>
                        <div className="container">
                            {accounts ? (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Tên tài khoản</th>
                                            <th>Mã nhân viên</th>
                                            <th>Mã khu vực</th>
                                            <th>Bổ nhiệm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {accounts
                                            .filter(
                                                (item) =>
                                                    item.trangthai &&
                                                    item.idrole !== "QLY"
                                            )
                                            .map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <span>
                                                            {item.username}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span>{item.manv}</span>
                                                    </td>
                                                    <td>
                                                        <span>{item.makv}</span>
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn-primary"
                                                            onClick={() => {
                                                                handlePermit(
                                                                    item.username
                                                                );
                                                            }}
                                                        >
                                                            Chọn
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
                                    onClick={() => {
                                        setPopUpDetail(false);
                                    }}
                                    className="cancelbtn btn"
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Area;
