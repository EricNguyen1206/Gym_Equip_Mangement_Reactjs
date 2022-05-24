import { useState, useEffect } from "react";
import "./style.css";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import { Table } from "../../../components";
import {
    Accounts,
    ExtractOrders,
    LiquidOrders,
    PurchaseOrders,
} from "../../../DummiesData";
import {
    countMonthlyPhieunhapCreated,
    countMonthlyPhieuthanhlyCreated,
    countMonthlyPhieusudungCreated,
} from "../../../utils/statistical";
import {
    useAccounts,
    usePurchases,
    useExtractions,
    useLiquidations,
} from "../../../contexts";
import { getPurchases } from "../../../contexts/purchases/action";
import { getAccounts } from "../../../contexts/accounts/action";
import { getLiquidations } from "../../../contexts/liquidations/action";
import { getExtractions } from "../../../contexts/extractions/action";

const AccountsTitle = [
    "Tên tài khoản",
    "Mật khẩu",
    "Trạng thái",
    "Mã nhân viên",
    "Mã khu vực",
    "Quyền",
];
const cardBox = [
    {
        numbers: 0,
        cardName: "Phiếu nhập",
        icon: <AddShoppingCartOutlinedIcon />,
    },
    {
        numbers: 0,
        cardName: "Phiếu sử dụng",
        icon: <ForumOutlinedIcon />,
    },
    {
        numbers: 0,
        cardName: "Phiếu xuất",
        icon: <LocalAtmOutlinedIcon />,
    },
];
function Dashboard() {
    const [month, setMonth] = useState(0);
    const [{ accounts }, dispatchAccounts] = useAccounts();
    const [{ purchases }, dispatchPurchases] = usePurchases();
    const [{ extractions }, dispatchExtractions] = useExtractions();
    const [{ liquidations }, dispatchLiquidations] = useLiquidations();
    useEffect(() => {
        const d = new Date();
        const m = d.getMonth();
        setMonth(m);
        getAccounts(dispatchAccounts);
        getPurchases(dispatchPurchases);
        getLiquidations(dispatchLiquidations);
        getExtractions(dispatchExtractions);
    }, []);
    useEffect(() => {
        cardBox[0].numbers = countMonthlyPhieunhapCreated(
            purchases || PurchaseOrders,
            month
        );
        cardBox[1].numbers = countMonthlyPhieusudungCreated(
            extractions || ExtractOrders,
            month
        );
        cardBox[2].numbers = countMonthlyPhieuthanhlyCreated(
            liquidations || LiquidOrders,
            month
        );
    });
    const pretreatment = (data) => {
        const res = data.map((item) => ({
            ...item,
            trangthai: item.trangthai ? "Hoạt động" : "Khóa",
            idrole:
                item.idrole === "TKH"
                    ? "Thủ kho"
                    : item.idrole === "QLY"
                    ? "Quản lý"
                    : "Nhân viên",
        }));
        return res;
    };
    return (
        <>
            <h1 className="dashboard__title">
                Thống kê hoạt động tháng {month + 1}
            </h1>
            <div className="dashboard__cards cardBox">
                {cardBox.map((item, index) => (
                    <div className="card" key={index}>
                        <div>
                            <div className="numbers">{item.numbers}</div>
                            <div className="cardName">{item.cardName}</div>
                        </div>
                        <div className="iconBx">{item.icon}</div>
                    </div>
                ))}
            </div>
            <div className="dashboard__table">
                <h2>Các tài khoản mới</h2>
                <Table
                    columns={AccountsTitle}
                    rows={pretreatment(accounts || Accounts)}
                />
            </div>
        </>
    );
}

export default Dashboard;
