import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StoreProvider from "./contexts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <StoreProvider>
        <App />
    </StoreProvider>
);
