import { ArrowForwardIosRounded, AddRounded } from "@mui/icons-material";
import "./style.css";
import { useEffect } from "react";
import { Table } from "../../../components";
import { EquipStatus } from "../../../DummiesData";
import { useEquipments, useEquipTypes, useConditions } from "../../../contexts";
import { getEquipments } from "../../../contexts/equipments/action";
import { getEquipTypes } from "../../../contexts/equipTypes/action";
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

    useEffect(() => {
        getEquipments(dispatchEquipments);
        getEquipTypes(dispatchEquipTypes);
        getConditions(dispatchConditions);
    }, []);
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
    return (
        <div className="equipment">
            <h1 className="equipment__title ws-path">
                Quản lý thiết bị
                <p className="equipment__control--icon">
                    <ArrowForwardIosRounded />
                </p>
            </h1>
            <div className="equipment__control">
                <button className="btn-add">
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
                        rows={pretreatment(equipments)}
                    />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default Equipment;
