import instance from "./axiosInstance";

export const login = async (username, password) => {
    try {
        const response = await instance.post("/auth/login", {
            username,
            password,
        });

        const { accessToken, refreshToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        return response.data;
    } catch (error) {
        console.error(
            "Login failed:",
            error.response?.data?.message || error.message
        );
        throw error;
    }
};
