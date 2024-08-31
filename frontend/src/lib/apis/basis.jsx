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
        console.log(token);
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
