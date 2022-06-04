import { useEffect, useState } from "react";
import { ArrowForwardIosRounded, AddRounded } from "@mui/icons-material";
import "./style.css";
import { Table } from "../../../components";
import { useAccounts, useEmployees, useAuth } from "../../../contexts";
import {
    getAccounts,
    createAccount,
    updateAccount,
} from "../../../contexts/accounts/action";
function Account() {
    const [{ accounts }, dispatchAccounts] = useAccounts();
    const [{ employees }, dispatchEmployees] = useEmployees();
    const [{ user }, dispatchUser] = useAuth();
    const [popUp, setPopUp] = useState(false);
    const [username, setUsername] = useState("");
    const [manv, setManv] = useState("");
    useEffect(() => {
        getAccounts(dispatchAccounts);
    }, [dispatchAccounts]);
    const preprocessor = (data) => {
        const res = data.map((item) => ({
            ...item,
            trangthai: item.trangthai ? "Hoạt động" : "Khóa",
            makv: item.makv ? item.makv : "Null",
            idrole:
                item.idrole === "TKH"
                    ? "Thủ kho"
                    : item.idrole === "QLY"
                    ? "Quản lý"
                    : "Nhân viên",
        }));
        return res;
    };

    const handleSubmit = () => {
        const regex = /^[A-Za-z0-9 ]{3,20}/g;
        const data = {
            username,
            manv,
        };

        const accountFound = accounts.findIndex(
            (acc) => acc.username === username
        );
        const employeeFound = employees.findIndex((em) => em.manv === manv);
        if (username.length < 3 || username.length > 20) {
            alert(
                "Độ dài tên không hợp lệ!\nĐộ dài yêu cầu tối thiểu 3 ký tự, tối đa 20 ký tự!"
            );
        } else if (!regex.test(data.username)) {
            alert("Tên tài khoản có ký tự không hợp lệ!");
            console.log(data, regex.test(data.username));
        } else if (accountFound !== -1) {
            alert("Tên tài khoản đã tồn tại! Vui lòng nhập lại!");
        } else if (employeeFound === -1) {
            alert("Mã nhân viên không tồn tại! Vui lòng nhập lại!");
        } else {
            createAccount(dispatchAccounts, data);
        }
    };
    const handleChangeTrangthai = (username, status) => {
        const data = {
            trangthai: status === "Khóa",
        };
        updateAccount(dispatchAccounts, username, data);
        setTimeout(getAccounts(dispatchAccounts), 500);
    };
    return (
        <div className="account">
            <h1 className="account__title ws-path">
                Quản lý tài khoản
                <p className="account__control--icon">
                    <ArrowForwardIosRounded />
                </p>
            </h1>
            <div className="account__control">
                <button className="btn-add" onClick={() => setPopUp(true)}>
                    <p className="account__control--icon">
                        <AddRounded />
                    </p>
                    Thêm tài khoản
                </button>
            </div>
            <div className="account__table">
                {accounts ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Tên tài khoản</th>
                                <th>Trạng thái</th>
                                <th>Mã nhân viên</th>
                                <th>Mã khu vực</th>
                                <th>Quyền</th>
                                <th>Chỉnh sửa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {preprocessor(accounts).map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <span>{item.username}</span>
                                    </td>
                                    <td>
                                        <span>{item.trangthai}</span>
                                    </td>
                                    <td>
                                        <span>{item.manv}</span>
                                    </td>
                                    <td>
                                        <span>{item.makv}</span>
                                    </td>
                                    <td>
                                        <span>{item.idrole}</span>
                                    </td>
                                    <td>
                                        {user.username === item.username ? (
                                            <></>
                                        ) : (
                                            <button
                                                type="button"
                                                className="btn-primary"
                                                onClick={() => {
                                                    handleChangeTrangthai(
                                                        item.username,
                                                        item.trangthai
                                                    );
                                                }}
                                            >
                                                {item.trangthai === "Khóa"
                                                    ? "Bật"
                                                    : "Khóa"}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <></>
                )}
            </div>
            <div className="account__subtable popUp">
                <div
                    className="modal"
                    style={{ display: `${popUp ? "block" : "none"}` }}
                >
                    <form className="modal-content animate">
                        <h3>TẠO TÀI KHOẢN</h3>
                        <div className="container">
                            <table className="tb-form">
                                <tbody>
                                    <tr className="tb-form-row">
                                        <td className="tb-form-data">
                                            <label htmlFor="time">
                                                <b>Tên tài khoản</b>
                                            </label>
                                        </td>
                                        <td className="tb-form-data">
                                            <input
                                                type="text"
                                                placeholder="Nhập tên tài khoản"
                                                required
                                                value={username}
                                                onChange={(e) =>
                                                    setUsername(e.target.value)
                                                }
                                            />
                                        </td>
                                        <td className="tb-form-data">
                                            <label htmlFor="id">
                                                <b>Mã nhân viên</b>
                                            </label>
                                        </td>
                                        <td className="tb-form-data">
                                            <input
                                                type="text"
                                                placeholder="Nhập ID nhân viên"
                                                required
                                                value={manv}
                                                onChange={(e) =>
                                                    setManv(e.target.value)
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
                                        setUsername("");
                                        setManv("");
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

export default Account;
