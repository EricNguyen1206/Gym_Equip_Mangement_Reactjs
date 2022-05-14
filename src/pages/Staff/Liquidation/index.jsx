import "./style.css";
import { ArrowForwardIosRounded, AddRounded } from "@mui/icons-material";
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

function Liquidation() {
    const [popUp, setPopUp] = useState(false);
    const [liquidCode, setLiquidCode] = useState("");
    const [listItems, setListItems] = useState([]);
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
    const handleBorrowEquip = (code) => {
        console.log(code);
        console.log(
            (equipments || Equipments).filter(
                (equip) => equip.maltb === liquidCode
            )
        );

        setLiquidCode(code);
        setPopUp(true);
    };
    const getEquipLeftInStore = (code) => {
        return (equipments || Equipments).filter(
            (element) =>
                element.maltb === code &&
                element.makv === "KHO1" &&
                (element.tinhtrangTb === 3 || element.tinhtrangTb === 4)
        ).length;
    };
    return (
        <div className="liquidation">
            <h1 className="liquidation__title ws-path">
                Tạo phiếu sử dụng
                <p className="liquidation__control--icon">
                    <ArrowForwardIosRounded />
                </p>
            </h1>
            <div className="liquidation__control">
                <button className="btn-add" onClick={() => setPopUp(true)}>
                    <p className="liquidation__control--icon">
                        <AddRounded />
                    </p>
                    Yêu cầu thiết bị
                </button>
            </div>
            {listItems ? (
                <div className="liquidation__table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Mã thiết bị</th>
                                <th>Loại thiết bị</th>
                                <th>Khu vực</th>
                                <th>Tình trạng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listItems.map((equip, index) => (
                                <tr key={index}>
                                    <td>{equip.id}</td>
                                    <td>{getEquipmentType(equip.maltb)}</td>
                                    <td>{getArea(equip.makv)}</td>
                                    <td>{getStatus(equip.tinhtrangTb)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <></>
            )}
            <div className="liquidation__table">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Mã thiết bị</th>
                            <th>Tên thiết bị</th>
                            <th>Chi tiết</th>
                            <th>Yêu cầu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(equipTypes || EquipmentTypes).map((item, index) => (
                            <tr key={index}>
                                <td>{item.matb}</td>
                                <td>{item.tentb}</td>
                                <td>{item.chitiet}</td>
                                <td>
                                    {getEquipLeftInStore(item.matb) > 0 ? (
                                        <button
                                            className="btn"
                                            onClick={() =>
                                                handleBorrowEquip(item.matb)
                                            }
                                        >
                                            Thêm vào phiếu
                                        </button>
                                    ) : (
                                        <button className="btn disable">
                                            Hết
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="extract__subtable popUp">
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
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Mã thiết bị</th>
                                        <th>Loại thiết bị</th>
                                        <th>Khu vực</th>
                                        <th>Tình trạng</th>
                                        <th>Yêu cầu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(equipments || Equipments)
                                        .filter(
                                            (equip) =>
                                                equip.maltb === liquidCode
                                        )
                                        .map((equip, index) => (
                                            <tr key={index}>
                                                <td>{equip.id}</td>
                                                <td>
                                                    {getEquipmentType(
                                                        equip.maltb
                                                    )}
                                                </td>
                                                <td>{getArea(equip.makv)}</td>
                                                <td>
                                                    {getStatus(
                                                        equip.tinhtrangTb
                                                    )}
                                                </td>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        name="status"
                                                        className="status"
                                                    />
                                                </td>
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
                                <button className="btn" type="submit">
                                    Chọn
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Liquidation;
