const parseMonth = (stringDate) => {
    return parseInt(stringDate.slice(5, 7));
};

const countMonthlyPhieunhapCreated = (data, month) => {
    let count = 0;
    data.forEach(
        (item) =>
            (count = parseMonth(item.ngaynhap) === month + 1 ? ++count : count)
    );
    return count;
};

const countMonthlyPhieuthanhlyCreated = (data, month) => {
    let count = 0;
    data.forEach(
        (item) =>
            (count =
                parseMonth(item.ngaythanhly) === month + 1 ? ++count : count)
    );
    return count;
};

const countMonthlyPhieusudungCreated = (data, month) => {
    let count = 0;
    console.log(data);
    data.forEach((item) => {
        count =
            parseMonth(item.chitietPSD[0].ngaylay) === month + 1
                ? ++count
                : count;
    });
    return count;
};

export {
    countMonthlyPhieunhapCreated,
    countMonthlyPhieuthanhlyCreated,
    countMonthlyPhieusudungCreated,
};
