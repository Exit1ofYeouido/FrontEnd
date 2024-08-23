// basis.jsx
import axios from "axios";
import { refreshAccessToken } from "./login/auth";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshAccessToken();

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return instance(originalRequest);
            } catch (tokenRefreshError) {
                return Promise.reject(tokenRefreshError);
            }
        }

        if (error.response.status >= 400 && error.response.status < 500) {
            console.error(
                "클라이언트 오류:",
                error.response.data?.message || "요청이 실패했습니다."
            );
        } else if (error.response.status >= 500) {
            console.error(
                "서버 오류:",
                error.response.data?.message || "서버에 문제가 발생했습니다."
            );
        }

        return Promise.reject(error);
    }
);

export default instance;
