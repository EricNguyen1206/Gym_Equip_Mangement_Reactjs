import { useState, useEffect } from "react";
import "./style.css";
function Table({
    columns,
    rows,
    page = 1,
    limit = 10,
    primary = "white",
    secondary = "white",
}) {
    const [pageItems, setPageItems] = useState([]);
    const [total, setTotal] = useState(1);

    useEffect(() => {
        setTotal(getTotalPage(rows.length, limit));
        setPageItems(getPageItems(rows, page, limit));
    }, []);

    const search = (rows = [], searchValue = "") =>
        rows.filter(
            (
                row // Lọc các rows match với searchValue
            ) =>
                Object.values(row).some(
                    (
                        value // Check nếu ít nhất 1 column match với searchValue
                    ) =>
                        String(value)
                            .toLowerCase()
                            .includes(String(searchValue).toLowerCase()) // Check nếu data chứa searchValue
                )
        );
    const sort = (rows = [], key = "", order = "ASC") => {
        return rows.sort((a, b) => {
            if (a[key] > b[key]) {
                return order === "ASC" ? 1 : -1; // Nếu thứ tự tăng dần thì xếp a trước b và ngược lại
            }
            if (a[key] < b[key]) {
                return order === "ASC" ? -1 : 1; // Nếu thứ tự tăng dần thì xếp b trước a và ngược lại
            }
            return 0;
        });
    };
    const getTotalPage = (length = 0, limit = 10) => Math.ceil(length / limit);
    const getPageItems = (allItems = [], currentPage = 1, limit = 10) =>
        allItems.slice((currentPage - 1) * limit, currentPage * limit);
    return (
        <table className="table">
            <thead>
                <tr>
                    {columns.map((item, index) => (
                        <th key={index}>{item}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows
                    .slice(page * limit - limit, page * limit)
                    .map((item, index) => (
                        <tr key={index}>
                            {Object.keys(item).map((itm, idx) => (
                                <td key={idx}>
                                    <span>{item[itm]}</span>
                                </td>
                            ))}
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}

export default Table;
