const User = {
    username: "TK02",
    matkhau: "123",
    trangthai: true,
    manv: "NV01",
    makv: "CA01",
    idrole: 1,
};

const Accounts = [
    {
        username: "TK01",
        matkhau: "123",
        trangthai: true,
        manv: "NV01",
        makv: null,
        idrole: 3,
    },
    {
        username: "TK02",
        matkhau: "123",
        trangthai: true,
        manv: "NV01",
        makv: "CA01",
        idrole: 1,
    },
    {
        username: "TK03",
        matkhau: "123",
        trangthai: true,
        manv: "NV02",
        makv: "KHO1",
        idrole: 1,
    },
    {
        username: "TK04",
        matkhau: "123",
        trangthai: false,
        manv: "NV03",
        makv: null,
        idrole: 1,
    },
    {
        username: "TK05",
        matkhau: "123",
        trangthai: true,
        manv: "NV04",
        makv: "CA02",
        idrole: 3,
    },
    {
        username: "TK06",
        matkhau: "123",
        trangthai: true,
        manv: "NV05",
        makv: null,
        idrole: 3,
    },
    {
        username: "TK07",
        matkhau: "123",
        trangthai: true,
        manv: "NV06",
        makv: null,
        idrole: 3,
    },
    {
        username: "TK08",
        matkhau: "123",
        trangthai: true,
        manv: "NV07",
        makv: null,
        idrole: 3,
    },
    {
        username: "TK09",
        matkhau: "123",
        trangthai: false,
        manv: "NV08",
        makv: null,
        idrole: 3,
    },
    {
        username: "TK10",
        matkhau: "123",
        trangthai: true,
        manv: "NV02",
        makv: null,
        idrole: 3,
    },
];

const PurchaseOrders = [
    {
        mapn: "TEST1",
        ngaynhap: "2022-05-10",
        matk: "TK03",
        chitietPN: [
            {
                mapn: "PN001",
                soluong: 2,
                gia: 1000000.0,
                matb: "MCB01",
            },
            {
                mapn: "PN001",
                soluong: 10,
                gia: 500000.0,
                matb: "TA10K",
            },
        ],
    },
];

const ExtractOrders = [
    {
        mapsd: "TEST1",
        matknv: "TEST",
        matktk: "TEST",
        chitietPSD: [
            {
                mapsd: "TEST1",
                matb: 194067,
                ngaylay: "2022-05-11",
                ngaytra: "2022-05-12",
            },
            {
                mapsd: "PSD01",
                matb: 194068,
                ngaylay: "2022-05-11",
                ngaytra: "2022-05-12",
            },
        ],
    },
];

const LiquidOrders = [
    {
        maptl: "TEST1",
        ngaythanhly: "2022-01-01",
        matk: "TEST",
        chitietPTL: [
            {
                maptl: "TEST1",
                matb: 99999,
                gia: 9999.0,
            },
        ],
    },
];

const Areas = [
    {
        makv: "TEST",
        tenkv: "TEST 1",
        matk: null,
    },
    {
        makv: "KHO1",
        tenkv: "KHO",
        matk: "TK03",
    },
];

const EquipmentTypes = [
    {
        tentb: "TEST",
        chitiet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        matb: "TEST1",
    },
];

const Equipments = [
    {
        id: 99999,
        mapn: "TEST1",
        maltb: "TEST1",
        makv: "KHO1",
        tinhtrangTb: 6,
    },
    {
        id: 99999,
        mapn: "TEST2",
        maltb: "TEST1",
        makv: "TEST",
        tinhtrangTb: 6,
    },
];

const EquipStatus = [
    {
        id: 3,
        tinhtrang: "Chua su dung",
    },
    {
        id: 4,
        tinhtrang: "Đã từng sử dụng",
    },
    {
        id: 5,
        tinhtrang: "Đang sử dụng",
    },
    {
        id: 6,
        tinhtrang: "Bị hư",
    },
    {
        id: 7,
        tinhtrang: "Đã thanh lý",
    },
];

const Employees = [
    {
        manv: "TEST",
        ho: "TEST",
        ten: "TEST",
        gioitinh: false,
        phone: "000000000",
        email: "test@gmail.com",
    },
];

export {
    User,
    Areas,
    Accounts,
    Employees,
    Equipments,
    EquipStatus,
    ExtractOrders,
    LiquidOrders,
    PurchaseOrders,
    EquipmentTypes,
};
