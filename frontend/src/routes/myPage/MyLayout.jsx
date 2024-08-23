import React from "react";
import { Outlet } from "react-router-dom";

export default function MyLayout() {
    return (
        <div>
            <Outlet />
        </div>
    );
}
