import { useEffect } from "react";
import { ArrowForwardIosRounded, AddRounded } from "@mui/icons-material";
import "./style.css";
import { Table } from "../../../components";
import { useAccounts } from "../../../contexts";
import { getAccounts } from "../../../contexts/accounts/action";
const AccountsTitle = [
    "Tên tài khoản",
    "Mật khẩu",
    "Trạng thái",
    "Mã nhân viên",
    "Mã khu vực",
    "Quyền",
];
function Account() {
    const [{ accounts }, dispatchAccounts] = useAccounts();
    useEffect(() => {
        getAccounts(dispatchAccounts);
    }, []);
    const pretreatment = (data) => {
        const res = data.map((item) => ({
            ...item,
            trangthai: item.trangthai ? "Hoạt động" : "Khóa",
            makv: item.makv ? item.makv : "Null",
            idrole:
                item.idrole === 1
                    ? "Thủ kho"
                    : item.idrole === 2
                    ? "Quản lý"
                    : "Nhân viên",
        }));
        return res;
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
                <button className="btn-add">
                    <p className="account__control--icon">
                        <AddRounded />
                    </p>
                    Thêm tài khoản
                </button>
            </div>
            <div className="account__table">
                {accounts ? (
                    <Table
                        columns={AccountsTitle}
                        rows={pretreatment(accounts)}
                    />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default Account;
