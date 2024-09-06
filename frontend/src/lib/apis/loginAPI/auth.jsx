import axios from "axios";
import { logout } from "./login";

const refreshInstance = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

refreshInstance.interceptors.request.use(
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

export const refreshAccessToken = async () => {
    try {
        const response = await refreshInstance.post("/auth/reissue");

        const accessToken = response.headers["accsstoken"];

        if (!accessToken) {
            console.error("토큰 시발 실패");
            return null;
        }

        localStorage.setItem("accessToken", accessToken);

        return accessToken;
    } catch (error) {
        console.error(
            "Token refresh failed:",
            error.response?.data?.message || error.message
        );

        if (error.response?.status === 401 || error.response?.status === 403) {
            logout();
            throw new Error("세션이 만료되었습니다. 다시 로그인해주세요.");
        }

        throw error;
    }
};
