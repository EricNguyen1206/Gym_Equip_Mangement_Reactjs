import { ArrowForwardIosRounded, AddRounded } from "@mui/icons-material";
import "./style.css";
import { Table } from "../../../components";
import { EquipStatus, Equipments, EquipmentTypes } from "../../../DummiesData";
import { useEffect } from "react";
import { useEquipTypes, useEquipments, useConditions } from "../../../contexts";
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
    const [{ equipTypes }, dispatchEquipTypes] = useEquipTypes();
    const [{ equipments }, dispatchEquipment] = useEquipments();
    const [{ conditions }, dispatchConditions] = useConditions();
    useEffect(() => {
        getConditions(dispatchConditions);
        getEquipTypes(dispatchEquipTypes);
        getEquipments(dispatchEquipment);
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
        return res;
    };
    return (
        <div className="equipment">
            <h1 className="equipment__title ws-path">
                Quản lý kho thiết bị
                <p className="equipment__control--icon">
                    <ArrowForwardIosRounded />
                </p>
            </h1>
            <div className="equipment__table">
                <Table
                    columns={equipmentTypesTitle}
                    rows={equipTypes ? equipTypes : EquipmentTypes}
                />
            </div>
            <h2 className="equipment__title ws-path">
                Danh sách thiết bị trong kho
            </h2>
            <div className="equipment__table">
                <Table
                    columns={equipmentsTitle}
                    rows={pretreatment(
                        (equipments ? equipments : Equipments).filter(
                            (item) => (item.makv = "KHO1")
                        )
                    )}
                />
            </div>
        </div>
    );
}

export default Equipment;
