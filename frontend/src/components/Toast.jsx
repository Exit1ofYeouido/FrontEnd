import React from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (type, message) => {
    const options = {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    };

    switch (type) {
        case "success":
            toast.success(message, options);
            break;
        case "error":
            toast.error(message, options);
            break;
        case "info":
            toast.info(message, options);
            break;
        case "warning":
            toast.warning(message, options);
            break;
        default:
            toast(message, options);
            break;
    }
};

const Toast = () => {
    return (
        <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
    );
};

export default Toast;
