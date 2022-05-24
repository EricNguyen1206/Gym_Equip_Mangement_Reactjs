import { ArrowForwardIosRounded, AddRounded } from "@mui/icons-material";
import "./style.css";
import { Table } from "../../../components";
import { EquipStatus, EquipmentTypes } from "../../../DummiesData";
import { useEffect, useState } from "react";
import {
    useEquipTypes,
    useEquipments,
    useConditions,
    useLiquidations,
} from "../../../contexts";
import { getEquipments } from "../../../contexts/equipments/action";
import { getEquipTypes } from "../../../contexts/equipTypes/action";
import { getConditions } from "../../../contexts/conditions/action";
import {
    createLiquidation,
    getLiquidations,
} from "../../../contexts/liquidations/action";

function Equipment() {
    const [readyList, setReadyList] = useState([]);
    const [priceList, setPriceList] = useState([]);
    const [typeList, setTypeList] = useState([]);
    const [{ equipTypes }, dispatchEquipTypes] = useEquipTypes();
    const [{ equipments }, dispatchEquipment] = useEquipments();
    const [{ conditions }, dispatchConditions] = useConditions();
    const [{ liquidations }, dispatchLiquidation] = useLiquidations();
    useEffect(() => {
        getConditions(dispatchConditions);
        getEquipTypes(dispatchEquipTypes);
        getEquipments(dispatchEquipment);
        getLiquidations(dispatchLiquidation);
    }, []);
    const transEquipCondition = (condition) => {
        const res = (conditions || EquipStatus).find(
            (element) => element.id === condition
        );
        return res?.tinhtrang;
    };
    const transEquipType = (type) => {
        const res = (equipTypes || EquipmentTypes).find(
            (element) => element.matb === type
        );
        return res ? res.tentb : null;
    };
    const preprocessor = (data) => {
        const res = data.map((item) => ({
            ...item,
            tentb: transEquipType(item.maltb),
            tinhtrangTb: transEquipCondition(item.tinhtrangTb),
        }));
        return res;
    };
    const addItem = (item) => {
        const index = readyList.findIndex((x) => x === item.id);
        console.log(index);
        if (index === -1) {
            setReadyList([...readyList, item.id]);
            setPriceList([...priceList, 0]);
            setTypeList([...typeList, item.tentb]);
        }
    };
    const handleChangePrice = (e, index) => {
        let newPriceList = [...priceList];
        newPriceList[index] = e.target.value;
        setPriceList(newPriceList);
    };
    const deleteItem = (index) => {
        const newreadyList = [...readyList];
        const newPriceList = [...priceList];
        const newTypeList = [...typeList];
        newreadyList.splice(index, 1);
        newPriceList.splice(index, 1);
        newTypeList.splice(index, 1);
        setReadyList(newreadyList);
        setPriceList(newPriceList);
        setTypeList(newTypeList);
    };
    const handleSubmit = () => {
        const data = {
            chitietPTL: readyList.map((item, index) => ({
                gia: parseFloat(priceList[index]),
                matb: parseInt(item),
            })),
        };
        console.log(data);
        createLiquidation(dispatchLiquidation, data);
    };
    return (
        <div className="equipment">
            <h1 className="equipment__title ws-path">
                Danh sách thiết bị trong kho
                <p className="equipment__control--icon">
                    <ArrowForwardIosRounded />
                </p>
            </h1>
            <div className="equipment__control">
                <button
                    type="button"
                    className="btn-add"
                    onClick={() => handleSubmit()}
                >
                    <p className="equipment__control--icon">
                        <AddRounded />
                    </p>
                    Tạo phiếu thanh lý
                </button>
            </div>
            <div className="equipment__table">
                {readyList.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Loại thiết bị</th>
                                <th>Giá</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {readyList.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <span>{item}</span>
                                    </td>
                                    <td>
                                        <span>{typeList[index]}</span>
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
                                                handleChangePrice(e, index)
                                            }
                                        />
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn-primary"
                                            onClick={() => deleteItem(index)}
                                        >
                                            Bỏ
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
            <div className="equipment__table">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Loại thiết bị</th>
                            <th>Tình trạng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipments ? (
                            preprocessor(equipments).map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <span>{item.id}</span>
                                    </td>
                                    <td>
                                        <span>{item.tentb}</span>
                                    </td>
                                    <td>
                                        <span>{item.tinhtrangTb}</span>
                                    </td>
                                    <td>
                                        {item.tinhtrangTb === "Đã thanh lý" ? (
                                            "Đã thanh lý"
                                        ) : (
                                            <button
                                                type="button"
                                                className="btn-primary"
                                                onClick={() => addItem(item)}
                                            >
                                                Thêm vào phiếu
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <></>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Equipment;
