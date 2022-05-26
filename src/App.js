import "./App.css";
import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
    ManagerRoutes,
    StoreKeeperRoutes,
    StaffRoutes,
    PublicRoutes,
} from "./routes";
import {
    ManagerTemplate,
    StorekeeperTemplate,
    StaffTemplate,
} from "./components";

import { PageNotFound, NoPermission } from "./pages";
import { useAuth } from "./contexts";

function App() {
    const [{ user }, dispatch] = useAuth();
    const renderLayoutManager = (routes) => {
        if (routes && routes.length > 0) {
            return routes.map((item, index) => {
                return (
                    <Route
                        key={index}
                        exact={item.exact}
                        path={item.path}
                        element={
                            <ManagerTemplate>{item.element}</ManagerTemplate>
                        }
                    />
                );
            });
        }
    };
    const renderLayoutStorekeeper = (routes) => {
        if (routes && routes.length > 0) {
            return routes.map((item, index) => {
                return (
                    <Route
                        key={index}
                        exact={item.exact}
                        path={item.path}
                        element={
                            <StorekeeperTemplate>
                                {item.element}
                            </StorekeeperTemplate>
                        }
                    />
                );
            });
        }
    };
    const renderLayoutStaff = (routes) => {
        if (routes && routes.length > 0) {
            return routes.map((item, index) => {
                return (
                    <Route
                        key={index}
                        exact={item.exact}
                        path={item.path}
                        element={<StaffTemplate>{item.element}</StaffTemplate>}
                    />
                );
            });
        }
    };

    const renderLayoutPublic = (routes) => {
        if (routes && routes.length > 0) {
            return routes.map((item, index) => {
                return (
                    <Route
                        key={index}
                        exact={item.exact}
                        path={item.path}
                        element={item.element}
                    />
                );
            });
        }
    };

    const switchRenderLayout = (idrole, makv) => {
        switch (idrole) {
            case "QLY":
                return renderLayoutManager(ManagerRoutes);
            case "TKH":
                if (!makv) {
                    return <Route path="/" element={<NoPermission />} />;
                }
                return renderLayoutStorekeeper(StoreKeeperRoutes);
            case "NVI":
                if (!makv) {
                    return <Route path="/" element={<NoPermission />} />;
                }
                return renderLayoutStaff(StaffRoutes);
            default:
                return renderLayoutPublic(PublicRoutes);
        }
    };
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {user && user.trangthai
                        ? switchRenderLayout(user.idrole, user.makv)
                        : renderLayoutPublic(PublicRoutes)}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
