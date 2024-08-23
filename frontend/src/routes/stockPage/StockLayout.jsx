import React from "react";
import { Outlet } from "react-router-dom";

export default function StockLayout() {
    return (
        <div>
            <Outlet />
        </div>
    );
}
