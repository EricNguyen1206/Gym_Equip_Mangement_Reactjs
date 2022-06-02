import "./style.css";
import { useEffect, useState } from "react";
import { ArrowForwardIosRounded, AddRounded } from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import { Table } from "../../../components";
import { EquipStatus } from "../../../DummiesData";
import { useEquipments, useEquipTypes, useConditions } from "../../../contexts";
import { getEquipments } from "../../../contexts/equipments/action";
import {
    getEquipTypes,
    createEquipTypes,
} from "../../../contexts/equipTypes/action";
import { getConditions } from "../../../contexts/conditions/action";
const equipmentTypesTitle = ["Tên thiết bị", "Chi tiết", "Mã thiết bị"];
const equipmentsTitle = [
    "Id",
    "Mã phiếu nhập",
    "Mã loại thiết bị",
    "Mã khu vực",
    "Tình trạng",
];
function Equipment() {
    const [{ equipments }, dispatchEquipments] = useEquipments();
    const [{ equipTypes }, dispatchEquipTypes] = useEquipTypes();
    const [{ conditions }, dispatchConditions] = useConditions();
    const [popUp, setPopUp] = useState(false);
    const [equipId, setEquipId] = useState(null);
    const [equipType, setEquipType] = useState(null);
    const [equipDetails, setEquipDetails] = useState(null);
    const [count, setCount] = useState(1);
    const [page, setPage] = useState(1);
    useEffect(() => {
        getEquipments(dispatchEquipments);
        getEquipTypes(dispatchEquipTypes);
        getConditions(dispatchConditions);
    }, []);
    useEffect(() => {
        equipments && setCount(Math.ceil(equipments.length / 10));
    }, [equipments]);
    const transEquipCondition = (condition) => {
        const res = (conditions || EquipStatus).find(
            (element) => element.id === condition
        );
        return res?.tinhtrang;
    };
    const pretreatment = (data) => {
        const res = data.map((item) => ({
            ...item,
            tinhtrangTb: transEquipCondition(item.tinhtrangTb),
        }));
        return res ? res : [];
    };
    const handleEquipIdChange = (e) => {
        if (e.target.value.length > 5) {
            alert("Mã thiết bị phải đúng 5 ký tự");
        } else {
            setEquipId(e.target.value);
        }
    };
    const handleSubmit = () => {
        const data = {
            tentb: equipType,
            chitiet: equipDetails,
            matb: equipId,
        };
        if (data.matb.length !== 5) {
            alert("Mã thiết bị phải đúng 5 ký tự!");
        } else if (data.tentb.length === 0) {
            alert("Tên thiết bị không được để trống!");
        } else {
            createEquipTypes(dispatchEquipTypes, data);
        }
        setPopUp(false);
    };
    const handlePageChange = (e, pg) => {
        setPage(pg);
    };
    return (
        <div className="equipment">
            <h1 className="equipment__title ws-path">
                Quản lý thiết bị
                <p className="equipment__control--icon">
                    <ArrowForwardIosRounded />
                </p>
            </h1>
            <div className="equipment__control">
                <button className="btn-add" onClick={() => setPopUp(true)}>
                    <p className="equipment__control--icon">
                        <AddRounded />
                    </p>
                    Thêm loại thiết bị
                </button>
            </div>
            <div className="equipment__table">
                {equipTypes ? (
                    <Table columns={equipmentTypesTitle} rows={equipTypes} />
                ) : (
                    <></>
                )}
            </div>
            <h2 className="equipment__title ws-path">Danh sách thiết bị</h2>
            <div className="equipment__table">
                {equipments ? (
                    <Table
                        columns={equipmentsTitle}
                        page={page}
                        rows={pretreatment(equipments)}
                    />
                ) : (
                    <></>
                )}
            </div>
            <Pagination
                count={count}
                color="primary"
                onChange={(e, pg) => handlePageChange(e, pg)}
            />
            <div className="liquidate__subtable popUp">
                <div
                    className="modal"
                    style={{ display: `${popUp ? "block" : "none"}` }}
                >
                    <form className="modal-content animate">
                        <h3>TẠO LOẠI THIẾT BỊ</h3>
                        <div className="container">
                            <table className="tb-form">
                                <tbody>
                                    <tr className="tb-form-row">
                                        <td className="tb-form-data">
                                            <label htmlFor="id">
                                                <b>Mã thiết bị</b>
                                            </label>
                                        </td>
                                        <td className="tb-form-data">
                                            <input
                                                type="text"
                                                placeholder="Nhập ID"
                                                name="id"
                                                required
                                                value={equipId}
                                                onChange={(e) =>
                                                    handleEquipIdChange(e)
                                                }
                                            />
                                        </td>
                                        <td className="tb-form-data">
                                            <label htmlFor="time">
                                                <b>Tên thiết bị</b>
                                            </label>
                                        </td>
                                        <td className="tb-form-data">
                                            <input
                                                type="text"
                                                placeholder="Nhập tên"
                                                name="id"
                                                required
                                                value={equipType}
                                                onChange={(e) =>
                                                    setEquipType(e.target.value)
                                                }
                                            />
                                        </td>
                                    </tr>
                                    <tr className="tb-form-row">
                                        <td className="tb-form-data">
                                            <label htmlFor="id">
                                                <b>Chi tiết</b>
                                            </label>
                                        </td>
                                        <td className="tb-form-data">
                                            <input
                                                type="text"
                                                placeholder="Nhập mô tả"
                                                name="uname"
                                                required
                                                value={equipDetails}
                                                onChange={(e) =>
                                                    setEquipDetails(
                                                        e.target.value
                                                    )
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
                                        setEquipDetails("");
                                        setEquipType("");
                                        setEquipId("");
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
        </div>
    );
}

export default Equipment;
