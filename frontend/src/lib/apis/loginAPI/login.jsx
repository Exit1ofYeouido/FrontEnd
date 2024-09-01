import instance from "../basis";
import { store } from "~store/store";
import { setCredentials } from "~store/memberIdSlice";

export const logout = async () => {
    try {
        await instance.post("/auth/logout");

        localStorage.removeItem("accessToken");
        window.location.href = "/login";
    } catch (error) {
        console.error(
            "Logout failed:",
            error.response?.data?.message || error.message
        );

        localStorage.removeItem("accessToken");
        window.location.href = "/login";
    }
};

export const login = async (id, password) => {
    try {
        const response = await instance.post("/auth/login", {
            memberName: id,
            memberPassword: password,
        });

        const accessToken = response.headers["accesstoken"];

        if (accessToken) {
            store.dispatch(setCredentials({ token: accessToken }));
            localStorage.setItem("accessToken", accessToken);
        }

        return response.data;
    } catch (error) {
        console.error("Error details:", error);

        if (error.response?.status === 401) {
            throw new Error("아이디 및 패스워드를 확인해주세요.");
        } else {
            throw new Error(
                "로그인 중 오류가 발생했습니다. 다시 시도해주세요."
            );
        }
    }
};
