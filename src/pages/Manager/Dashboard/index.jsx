import { useState, useEffect } from "react";
import "./style.css";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import {
    countMonthlyPhieunhapCreated,
    countMonthlyPhieuthanhlyCreated,
    countMonthlyPhieusudungCreated,
} from "../../../utils/statistical";
import {
    usePurchases,
    useExtractions,
    useLiquidations,
} from "../../../contexts";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Thống kê hoạt động",
        },
    },
};

function Dashboard() {
    const [month, setMonth] = useState(0);
    const [data, setData] = useState(null);
    const [cardBox, setCardBox] = useState(null);
    const [{ purchases }, dispatchPurchases] = usePurchases();
    const [{ extractions }, dispatchExtractions] = useExtractions();
    const [{ liquidations }, dispatchLiquidations] = useLiquidations();
    useEffect(() => {
        const d = new Date();
        const m = d.getMonth();
        setMonth(m);
        const myCardBox = [
            {
                numbers: 0,
                cardName: "Phiếu nhập",
                icon: <AddShoppingCartOutlinedIcon fontSize="large" />,
            },
            {
                numbers: 0,
                cardName: "Phiếu sử dụng",
                icon: <ForumOutlinedIcon fontSize="large" />,
            },
            {
                numbers: 0,
                cardName: "Phiếu thanh lý",
                icon: <LocalAtmOutlinedIcon fontSize="large" />,
            },
        ];
        myCardBox[0].numbers = purchases.length;
        myCardBox[1].numbers = extractions.length;
        myCardBox[2].numbers = liquidations.length;
        setCardBox(myCardBox);
        const dataSet0 = {
            label: "Phiếu nhập",
            data: [1, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(240, 84, 84, 0.5)",
        };
        const dataSet1 = {
            label: "Phiếu thanh lý",
            data: [1, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(48, 71, 94, 0.5)",
        };
        const dataSet2 = {
            label: "Phiếu sử dụng",
            data: [1, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(255, 205, 56, 0.5)",
        };
        if (m < 6) {
            for (let i = 0; i < 6; i++) {
                dataSet0.data[i] = countMonthlyPhieunhapCreated(purchases, i);
                dataSet1.data[i] = countMonthlyPhieuthanhlyCreated(
                    liquidations,
                    i
                );
                dataSet2.data[i] = countMonthlyPhieusudungCreated(
                    extractions,
                    i
                );
            }
            setData({
                labels: [
                    "Tháng 1",
                    "Tháng 2",
                    "Tháng 3",
                    "Tháng 4",
                    "Tháng 5",
                    "Tháng 6",
                ],
                datasets: [dataSet0, dataSet1, dataSet2],
            });
        } else {
            for (let i = 6; i < 12; i++) {
                dataSet0.data[i] = countMonthlyPhieunhapCreated(purchases, i);
                dataSet1.data[i] = countMonthlyPhieuthanhlyCreated(
                    liquidations,
                    i
                );
                dataSet2.data[i] = countMonthlyPhieusudungCreated(
                    extractions,
                    i
                );
            }
            setData({
                labels: [
                    "Tháng 7",
                    "Tháng 8",
                    "Tháng 9",
                    "Tháng 10",
                    "Tháng 11",
                    "Tháng 12",
                ],
                datasets: [dataSet0, dataSet1, dataSet2],
            });
        }
    }, [purchases, extractions, liquidations]);
    return (
        <div className="dashboard">
            <h1 className="dashboard__title">Thống kê hoạt động</h1>
            <div className="dashboard__cards cardBox">
                {cardBox ? (
                    cardBox.map((item, index) => (
                        <div className="card" key={index}>
                            <div>
                                <div className="numbers">{item.numbers}</div>
                                <div className="cardName">{item.cardName}</div>
                            </div>
                            <div className="iconBx">{item.icon}</div>
                        </div>
                    ))
                ) : (
                    <></>
                )}
            </div>
            <div className="dashboard__table">
                {data ? <Bar options={options} data={data} /> : <></>}
            </div>
        </div>
    );
}

export default Dashboard;
