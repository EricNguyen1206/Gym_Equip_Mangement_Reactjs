import React from "react";
const Login = React.lazy(() => import("../pages/Login"));

const ManagerArea = React.lazy(() => import("../pages/Manager/Area"));
const ManagerEmployee = React.lazy(() => import("../pages/Manager/Employee"));
const ManagerEquipment = React.lazy(() => import("../pages/Manager/Equipment"));
const ManagerDashboard = React.lazy(() => import("../pages/Manager/Dashboard"));
const ManagerAccount = React.lazy(() => import("../pages/Manager/Account"));

const StorekeeperExtract = React.lazy(() =>
    import("../pages/Storekeeper/Extract")
);
const StorekeeperPurchase = React.lazy(() =>
    import("../pages/Storekeeper/Purchase")
);
const StorekeeperLiquidate = React.lazy(() =>
    import("../pages/Storekeeper/Liquidate")
);
const StorekeeperEquipment = React.lazy(() =>
    import("../pages/Storekeeper/Equipment")
);

const StaffEquipment = React.lazy(() => import("../pages/Staff/Equipment"));
const StaffLiquidation = React.lazy(() => import("../pages/Staff/Liquidation"));
const StaffExtractList = React.lazy(() => import("../pages/Staff/ExtractList"));

const ManagerRoutes = [
    {
        exact: true,
        path: "/",
        element: <ManagerDashboard />,
    },
    {
        exact: true,
        path: "/area",
        element: <ManagerArea />,
    },
    {
        exact: true,
        path: "/employee",
        element: <ManagerEmployee />,
    },
    {
        exact: true,
        path: "/account",
        element: <ManagerAccount />,
    },
    {
        exact: true,
        path: "/equipment",
        element: <ManagerEquipment />,
    },
];

const StoreKeeperRoutes = [
    {
        exact: true,
        path: "/",
        element: <StorekeeperExtract />,
    },
    {
        exact: true,
        path: "/purchase",
        element: <StorekeeperPurchase />,
    },
    {
        exact: true,
        path: "/liquidate",
        element: <StorekeeperLiquidate />,
    },
    {
        exact: true,
        path: "/equipment",
        element: <StorekeeperEquipment />,
    },
];

const StaffRoutes = [
    {
        exact: true,
        path: "/",
        element: <StaffEquipment />,
    },
    {
        exact: true,
        path: "/liquitation",
        element: <StaffLiquidation />,
    },
    {
        exact: true,
        path: "/extractlist",
        element: <StaffExtractList />,
    },
];

const PublicRoutes = [
    {
        exact: true,
        path: "/",
        element: <Login />,
    },
];

export { ManagerRoutes, StoreKeeperRoutes, StaffRoutes, PublicRoutes };
