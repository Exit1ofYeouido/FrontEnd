import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router";
import { Provider } from "react-redux";
import Toast from "~components/Toast";
import store, { persistor } from "./store/store";
import { PersistGate } from 'redux-persist/integration/react';
function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className="app-container">
                    <Toast />
                    <RouterProvider router={router} />
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
