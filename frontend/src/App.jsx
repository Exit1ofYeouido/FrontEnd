import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router"; // createBrowserRouter로 만든 라우터를 임포트

function App() {
    return (
        <div className="app-container">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
