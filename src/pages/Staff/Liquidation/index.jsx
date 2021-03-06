import "./style.css";
import { ArrowForwardIosRounded, AddRounded } from "@mui/icons-material";
import { EquipmentTypes, Equipments } from "../../../DummiesData";
import { useEffect, useState } from "react";
import {
    useEquipments,
    useEquipTypes,
    useConditions,
    useAuth,
    useExtractions,
} from "../../../contexts";
import { getEquipments } from "../../../contexts/equipments/action";
import { getEquipTypes } from "../../../contexts/equipTypes/action";
import { getConditions } from "../../../contexts/conditions/action";
import { postExtraction } from "../../../contexts/extractions/action";

function Liquidation() {
    const [popUp, setPopUp] = useState(false);
    const [readyList, setReadyList] = useState(() => []);
    const [liquidList, setLiquidList] = useState(() => []);
    const [curType, setCurType] = useState(null);
    const [typesMapping, setTypesMapping] = useState(null);
    const [conditionMapping, setConditionMapping] = useState(null);
    const [{ user }, dispatchUser] = useAuth();
    const [{ equipments }, dispatchEquipments] = useEquipments();
    const [{ equipTypes }, dispatchEquipTypes] = useEquipTypes();
    const [{ conditions }, dispatchConditions] = useConditions();
    const [{ extractions }, dispatchExtractions] = useExtractions();

    useEffect(() => {
        getEquipments(dispatchEquipments);
        getEquipTypes(dispatchEquipTypes);
        getConditions(dispatchConditions);
    }, [dispatchEquipments, dispatchEquipTypes, dispatchConditions]);

    useEffect(() => {
        const newObj = {};
        if (equipTypes) {
            for (let i = 0; i < equipTypes.length; i++) {
                newObj[equipTypes[i].matb] = equipTypes[i].tentb;
            }
        }
        setTypesMapping(newObj);
    }, [equipTypes]);
    useEffect(() => {
        const newArr = [];
        if (conditions) {
            for (let i = 0; i < conditions.length; i++) {
                newArr[conditions[i].id] = conditions[i].tinhtrang;
            }
        }
        setConditionMapping(newArr);
    }, [conditions]);
    const equipmentsPreprocessor = function (equips) {
        return equips.map((equip) => ({
            ...equip,
            ltb: typesMapping[equip.maltb],
            tinhtrang: conditionMapping[equip.tinhtrangTb],
        }));
    };
    const handleBorrowEquip = (code) => {
        setCurType(code);
        setPopUp(true);
    };
    const getInventory = (code) => {
        return [...(equipments || Equipments)].filter(
            (element) =>
                element.maltb === code &&
                element.makv === "KHO1" &&
                (element.tinhtrangTb === "CSD" || element.tinhtrangTb === "WSD")
        );
    };
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
    const hanldeExtract = () => {
        setLiquidList(
            readyList.map((item) => equipments.find((e) => e.id === item))
        );
        setPopUp(false);
    };
    const handleSubmit = () => {
        const d = new Date();
        const newExtraction = {};
        newExtraction.matknv = user.username;
        newExtraction.matktk = null;
        newExtraction.chitietPSD = liquidList.map((item) => ({
            matb: item.id,
            ngaylay: `${d.getFullYear()}-${
                d.getMonth() >= 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)
            }-${d.getDate() >= 9 ? d.getDate() : "0" + d.getDate()}`,
            ngaytra: null,
        }));
        postExtraction(dispatchExtractions, newExtraction);
        setReadyList([]);
        setLiquidList([]);
    };
    return (
        <div className="liquidation">
            <h1 className="liquidation__title ws-path">
                T???o phi???u s??? d???ng
                <p className="liquidation__control--icon">
                    <ArrowForwardIosRounded />
                </p>
            </h1>
            <div className="liquidation__control">
                <button
                    className="btn-add"
                    onClick={() => handleSubmit()}
                    style={{
                        display: `${liquidList.length > 0 ? "block" : "none"}`,
                    }}
                >
                    <p className="liquidation__control--icon">
                        <AddRounded />
                    </p>
                    T???o phi???u s??? d???ng
                </button>
            </div>
            {liquidList.length ? (
                <div className="liquidation__table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>M?? thi???t b???</th>
                                <th>Lo???i thi???t b???</th>
                                <th>T??nh tr???ng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipmentsPreprocessor(liquidList).map(
                                (equip, index) => (
                                    <tr key={index}>
                                        <td>{equip.id}</td>
                                        <td>{equip.ltb}</td>
                                        <td>{equip.tinhtrang}</td>
                                    </tr>
                                )
                            )}
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
                            <th>M?? thi???t b???</th>
                            <th>T??n thi???t b???</th>
                            <th>Chi ti???t</th>
                            <th>Y??u c???u</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(equipTypes || EquipmentTypes).map((item, index) => (
                            <tr key={index}>
                                <td>{item.matb}</td>
                                <td>{item.tentb}</td>
                                <td>{item.chitiet}</td>
                                <td>
                                    {getInventory(item.matb).length > 0 ? (
                                        <button
                                            className="btn"
                                            onClick={handleBorrowEquip.bind(
                                                this,
                                                item.matb
                                            )}
                                        >
                                            Th??m v??o phi???u
                                        </button>
                                    ) : (
                                        <button className="btn disable">
                                            H???t
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
                        <h3>CHI TI???T PHI???U S??? D???NG</h3>
                        <div className="container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>M?? thi???t b???</th>
                                        <th>Lo???i thi???t b???</th>
                                        <th>T??nh tr???ng</th>
                                        <th>Y??u c???u</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {equipmentsPreprocessor(
                                        getInventory(curType)
                                    ).map((equip, index) => (
                                        <tr key={index}>
                                            <td>{equip.id}</td>
                                            <td>{equip.ltb}</td>
                                            <td>{equip.tinhtrang}</td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    className="status"
                                                    checked={readyList.includes(
                                                        equip.id
                                                    )}
                                                    onChange={handleCheck.bind(
                                                        this,
                                                        equip.id
                                                    )}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="btn-col">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPopUp(false);
                                        setReadyList([]);
                                    }}
                                    className="cancelbtn btn"
                                >
                                    Tho??t
                                </button>
                                <button
                                    className="btn"
                                    type="button"
                                    onClick={hanldeExtract}
                                >
                                    Ch???n
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
