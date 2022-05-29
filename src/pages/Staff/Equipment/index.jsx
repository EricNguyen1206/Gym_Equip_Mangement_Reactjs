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
    useExtractions,
} from "../../../contexts";
import { getAreas } from "../../../contexts/areas/action";
import {
    getEquipments,
    putConditionEquipments,
} from "../../../contexts/equipments/action";
import { getEquipTypes } from "../../../contexts/equipTypes/action";
import { getConditions } from "../../../contexts/conditions/action";
import {
    getExtractions,
    rollbackEquipment,
} from "../../../contexts/extractions/action";

function Equipment() {
    const [popUp, setPopUp] = useState(false);
    const [liquidNum, setLiquidNum] = useState(0);
    const [brokeList, setBrokeList] = useState(() => []);
    const [readyBrokeList, setReadyBrokeList] = useState(() => []);
    const [readyRollbackList, setReadyRollbackList] = useState(() => []);
    const [{ user }, dispatchAuth] = useAuth();
    const [{ areas }, dispatchAreas] = useAreas();
    const [{ equipments }, dispatchEquipments] = useEquipments();
    const [{ equipTypes }, dispatchEquipTypes] = useEquipTypes();
    const [{ conditions }, dispatchConditions] = useConditions();
    const [{ extractions }, dispatch] = useExtractions();
    useEffect(() => {
        getAreas(dispatchAreas);
        getEquipments(dispatchEquipments);
        getEquipTypes(dispatchEquipTypes);
        getConditions(dispatchConditions);
        getExtractions(dispatch);
    }, []);
    useEffect(() => {
        const res = [];
        equipments &&
            equipments.forEach((equip) => {
                if (equip.tinhtrangTb === "BHU") res.push(equip.id);
            });
        setBrokeList(res);
    }, [equipments]);
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
    const handleCheckBroken = (id) => {
        const index = readyBrokeList.indexOf(id);
        if (index === -1) {
            setReadyBrokeList([...readyBrokeList, id]);
        } else {
            const newList = [...readyBrokeList];
            newList.splice(index, 1);
            setReadyBrokeList(newList);
        }
    };
    const handleCheckRollback = (id) => {
        const index = readyRollbackList.indexOf(id);
        if (index === -1) {
            setReadyRollbackList([...readyRollbackList, id]);
        } else {
            const newList = [...readyRollbackList];
            newList.splice(index, 1);
            setReadyRollbackList(newList);
        }
    };
    const handleSubmit = () => {
        console.log(readyBrokeList);
        readyBrokeList.forEach((element) =>
            putConditionEquipments(dispatchEquipments, element)
        );

        console.log(readyRollbackList);
        readyRollbackList.forEach((element) => {
            const extraction = extractions.find((extrac) =>
                extrac.chitietPSD.find(
                    (extracDetails) =>
                        extracDetails.matb === element &&
                        extracDetails.ngaytra === null
                )
            );
            if (extraction) {
                rollbackEquipment(dispatch, extraction.mapsd, element);
                alert("Trả thiết bị thành công!");
            }
        });
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
                <button className="btn-add" onClick={handleSubmit}>
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
                                                checked={
                                                    brokeList.includes(
                                                        equip.id
                                                    ) ||
                                                    readyBrokeList.includes(
                                                        equip.id
                                                    )
                                                }
                                                onChange={() =>
                                                    handleCheckBroken(equip.id)
                                                }
                                            />
                                            <p>Bị hỏng</p>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                name="rollback"
                                                className="checkbox"
                                                checked={readyRollbackList.includes(
                                                    equip.id
                                                )}
                                                onChange={() =>
                                                    handleCheckRollback(
                                                        equip.id
                                                    )
                                                }
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
