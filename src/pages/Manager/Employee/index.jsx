import { useEffect } from "react";
import { ArrowForwardIosRounded, AddRounded } from "@mui/icons-material";
import "./style.css";
import { Table } from "../../../components";
import { useEmployees } from "../../../contexts";
import { getEmployees } from "../../../contexts/employees/action";
const employeeTitle = [
    "Mã nhân viên",
    "Họ",
    "Tên",
    "Giới tính",
    "Số điện thoại",
    "Email",
];
function Employee() {
    const [{ employees }, dispatchEmployees] = useEmployees();
    useEffect(() => {
        getEmployees(dispatchEmployees);
    }, []);
    const pretreatment = (data) => {
        const res = data.map((item) => ({
            ...item,
            gioitinh: item.gioitinh ? "Nam" : "Nữ",
        }));
        return res;
    };
    return (
        <div className="employee">
            <h1 className="employee__title ws-path">
                Quản lý nhân viên
                <p className="employee__control--icon">
                    <ArrowForwardIosRounded />
                </p>
            </h1>
            <div className="employee__control">
                <button className="btn-add">
                    <p className="employee__control--icon">
                        <AddRounded />
                    </p>
                    Thêm nhân viên
                </button>
            </div>
            <div className="employee__table">
                {employees ? (
                    <Table
                        columns={employeeTitle}
                        rows={pretreatment(employees)}
                    />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default Employee;
