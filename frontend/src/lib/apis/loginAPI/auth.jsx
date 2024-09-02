import axios from "axios";
import { logout } from "./login";

const refreshInstance = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const refreshAccessToken = async () => {
    try {
        const response = await refreshInstance.post("/auth/reissue");

        const accessToken = response.headers["accessToken"];

        if (!accessToken) {
            console.error("토큰 갱신 실패");
            logout();
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
