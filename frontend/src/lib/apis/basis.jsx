import axios from "axios";
import { refreshAccessToken } from "./loginAPI/auth";

const instance = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
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

        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return instance(originalRequest);
                } else {
                    console.error("토큰 갱신 실패");
                    return Promise.reject(error);
                }
            } catch (tokenRefreshError) {
                console.error("토큰 갱신 중 오류 발생", tokenRefreshError);
                return Promise.reject(tokenRefreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
