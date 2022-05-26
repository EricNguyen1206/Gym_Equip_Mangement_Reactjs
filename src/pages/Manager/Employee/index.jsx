import { useEffect, useState } from "react";
import {
    ArrowForwardIosRounded,
    AddRounded,
    TenMpOutlined,
} from "@mui/icons-material";
import "./style.css";
import { Table } from "../../../components";
import { useEmployees } from "../../../contexts";
import { getEmployees, postEmployee } from "../../../contexts/employees/action";
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
    const [popUp, setPopUp] = useState(false);
    const [manv, setManv] = useState(null);
    const [ho, setHo] = useState(null);
    const [ten, setTen] = useState(null);
    const [gioitinh, setGioitinh] = useState(false);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        getEmployees(dispatchEmployees);
    }, []);
    const preprocessor = (data) => {
        const res = data.map((item) => ({
            ...item,
            gioitinh: item.gioitinh ? "Nam" : "Nữ",
        }));
        return res;
    };
    const handleSubmit = () => {
        const data = {
            manv,
            ho,
            ten,
            gioitinh,
            phone,
            email,
        };
        if (
            manv === "" ||
            ho === "" ||
            ten === "" ||
            phone === "" ||
            email === ""
        ) {
            alert("Thông tin nhân viên không được phép null");
        }
        console.log(data);
        postEmployee(dispatchEmployees, data);
        setPopUp(false);
        setHo("");
        setTen("");
        setManv("");
        setPhone("");
        setEmail("");
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
                <button className="btn-add" onClick={() => setPopUp(true)}>
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
                        rows={preprocessor(employees)}
                    />
                ) : (
                    <></>
                )}
            </div>
            <div className="liquidate__subtable popUp">
                <div
                    className="modal"
                    style={{ display: `${popUp ? "block" : "none"}` }}
                >
                    <form className="modal-content animate">
                        <h3>THÊM NHÂN VIÊN</h3>
                        <div className="container">
                            <table className="tb-form">
                                <tbody>
                                    <tr className="tb-form-row">
                                        <td className="tb-form-data">
                                            <label htmlFor="id">
                                                <b>Họ</b>
                                            </label>
                                        </td>
                                        <td className="tb-form-data">
                                            <input
                                                type="text"
                                                placeholder="Nhập Họ"
                                                name="id"
                                                required
                                                value={ho}
                                                onChange={(e) =>
                                                    setHo(e.target.value)
                                                }
                                            />
                                        </td>
                                        <td className="tb-form-data">
                                            <label htmlFor="time">
                                                <b>Tên</b>
                                            </label>
                                        </td>
                                        <td className="tb-form-data">
                                            <input
                                                type="text"
                                                placeholder="Nhập tên"
                                                required
                                                value={ten}
                                                onChange={(e) =>
                                                    setTen(e.target.value)
                                                }
                                            />
                                        </td>
                                    </tr>
                                    <tr className="tb-form-row">
                                        <td className="tb-form-data">
                                            <label htmlFor="id">
                                                <b>Mã nhân viên</b>
                                            </label>
                                        </td>
                                        <td className="tb-form-data">
                                            <input
                                                type="text"
                                                placeholder="Nhập mã nhân viên"
                                                required
                                                value={manv}
                                                onChange={(e) =>
                                                    setManv(e.target.value)
                                                }
                                            />
                                        </td>
                                        <td className="tb-form-data">
                                            <label htmlFor="time">
                                                <b>Nam</b>
                                            </label>
                                            <input
                                                type="checkbox"
                                                checked={gioitinh}
                                                onChange={() =>
                                                    setGioitinh(!gioitinh)
                                                }
                                            />
                                        </td>
                                        <td className="tb-form-data">
                                            <label htmlFor="time">
                                                <b>Nữ</b>
                                            </label>
                                            <input
                                                type="checkbox"
                                                checked={!gioitinh}
                                                onChange={() =>
                                                    setGioitinh(!gioitinh)
                                                }
                                            />
                                        </td>
                                    </tr>
                                    <tr className="tb-form-row">
                                        <td className="tb-form-data">
                                            <label htmlFor="id">
                                                <b>Số điện thoại</b>
                                            </label>
                                        </td>
                                        <td className="tb-form-data">
                                            <input
                                                type="text"
                                                placeholder="Nhập Số điện thoại"
                                                required
                                                value={phone}
                                                onChange={(e) =>
                                                    setPhone(e.target.value)
                                                }
                                            />
                                        </td>
                                        <td className="tb-form-data">
                                            <label htmlFor="time">
                                                <b>Email</b>
                                            </label>
                                        </td>
                                        <td className="tb-form-data">
                                            <input
                                                type="email"
                                                placeholder="Nhập Email"
                                                required
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
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
                                        setHo("");
                                        setTen("");
                                        setManv("");
                                        setPhone("");
                                        setEmail("");
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

export default Employee;
