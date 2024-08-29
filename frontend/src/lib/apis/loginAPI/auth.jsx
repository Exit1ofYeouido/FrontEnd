// auth.jsx
import instance from "./axiosInstance";

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    try {
        const response = await instance.post("/auth/refresh", {
            token: refreshToken,
        });

        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);

        return accessToken;
    } catch (error) {
        console.error(
            "Token refresh failed:",
            error.response?.data?.message || error.message
        );

        if (
            error.response?.data?.code === "REFRESH_TOKEN_EXPIRED" ||
            error.response?.data?.message === "Refresh token expired"
        ) {
            logout();
            throw new Error("Refresh token expired, please login again.");
        }

        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
};
