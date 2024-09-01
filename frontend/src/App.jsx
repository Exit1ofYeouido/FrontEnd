import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Toast from "~components/Toast";

function App() {
    return (
        <Provider store={store}>
            <div className="app-container">
                <Toast />
                <RouterProvider router={router} />
            </div>
        </Provider>
    );
}

export default App;
