import "./style.css";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import {
    EquipmentTypes,
    Equipments,
    EquipStatus,
    User,
    Areas,
} from "../../../DummiesData";
import { useEffect, useState } from "react";
import {
    useAuth,
    useEquipments,
    useEquipTypes,
    useConditions,
    useAreas,
} from "../../../contexts";
import { getAreas } from "../../../contexts/areas/action";
import { getEquipments } from "../../../contexts/equipments/action";
import { getEquipTypes } from "../../../contexts/equipTypes/action";
import { getConditions } from "../../../contexts/conditions/action";

function Equipment() {
    const [popUp, setPopUp] = useState(false);
    const [liquidNum, setLiquidNum] = useState(0);
    const [{ user }, dispatchAuth] = useAuth();
    const [{ areas }, dispatchAreas] = useAreas();
    const [{ equipments }, dispatchEquipments] = useEquipments();
    const [{ equipTypes }, dispatchEquipTypes] = useEquipTypes();
    const [{ conditions }, dispatchConditions] = useConditions();
    useEffect(() => {
        getAreas(dispatchAreas);
        getEquipments(dispatchEquipments);
        getEquipTypes(dispatchEquipTypes);
        getConditions(dispatchConditions);
    }, []);
    console.log(equipments);
    const getEquipmentType = (code) => {
        const res = (equipTypes || EquipmentTypes).find(
            (type) => (type.matb = code)
        );
        return res?.tentb;
    };
    const getArea = (code) => {
        const res = (areas || Areas).find((area) => (area.makv = code));
        return res?.tenkv;
    };
    const getStatus = (code) => {
        const res = (conditions || EquipStatus).find(
            (status) => (status.id = code)
        );
        return res?.tinhtrang;
    };
    return (
        <div className="equipments">
            <h1 className="equipments__title ws-path">
                Quản lý thiết bị
                <p className="equipments__control--icon">
                    <ArrowForwardIosRounded />
                </p>
            </h1>
            <div className="equipments__control ws-func">
                <button className="btn-add">
                    <p className="equipments__control--icon">
                        <ArrowForwardIosRounded />
                    </p>
                    Lưu thay đổi
                </button>
            </div>
            <div className="equipments__table">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Mã thiết bị</th>
                            <th>Loại thiết bị</th>
                            <th>Khu vực</th>
                            <th>Tình trạng</th>
                            <th>Cập nhật</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(equipments || Equipments)
                            .filter(
                                (equip) => equip.makv === (user || User).makv
                            )
                            .map((equip, index) => (
                                <tr key={index}>
                                    <td>{equip.id}</td>
                                    <td>{getEquipmentType(equip.maltb)}</td>
                                    <td>{getArea(equip.makv)}</td>
                                    <td>{getStatus(equip.tinhtrangTb)}</td>
                                    <td>
                                        <div>
                                            <input
                                                type="checkbox"
                                                name="status"
                                                className="checkbox"
                                            />
                                            <p>Bị hỏng</p>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                name="rollback"
                                                className="checkbox"
                                            />
                                            <p>Trả thiết bị</p>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Equipment;
