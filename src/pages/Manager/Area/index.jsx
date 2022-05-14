import { useEffect } from "react";
import { ArrowForwardIosRounded, AddRounded } from "@mui/icons-material";
import "./style.css";
import { Table } from "../../../components";
import { useAreas } from "../../../contexts";
import { getAreas } from "../../../contexts/areas/action";
const areaTitle = ["Mã khu vực", "Tên khu vực", "Mã tài khoản"];
function Area() {
    const [{ areas }, dispatchAreas] = useAreas();
    useEffect(() => {
        getAreas(dispatchAreas);
    }, []);
    const pretreatment = (data) => {
        const res = data.map((item) => ({
            ...item,
            matk: item.matk ? item.matk : "Null",
        }));
        return res;
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
                <button className="btn-add">
                    <p className="area__control--icon">
                        <AddRounded />
                    </p>
                    Thêm khu vực
                </button>
            </div>
            <div className="area__table">
                {areas ? (
                    <Table columns={areaTitle} rows={pretreatment(areas)} />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default Area;
