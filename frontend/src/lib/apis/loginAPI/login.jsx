import instance from "../basis";
import { store } from "~store/store";
import { setCredentials } from "~store/memberIdSlice";
import { showToast } from "~components/Toast";

export const logout = async () => {
    try {
        await instance.post("/auth/logout");

        localStorage.removeItem("accessToken");

        return { success: true };
    } catch (error) {
        console.error(
            "Logout failed:",
            error.response?.data?.message || error.message
        );

        localStorage.removeItem("accessToken");
        showToast("error", "로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.");
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

        showToast("success", "로그인 성공!");
        return response.data;
    } catch (error) {
        console.error("Error details:", error);

        if (error.response?.status === 401) {
            showToast("error", "아이디 및 패스워드를 확인해주세요.");
            return { error: "아이디 및 패스워드를 확인해주세요." };
        } else {
            showToast("error", "로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
            return { error: "로그인 중 오류가 발생했습니다. 다시 시도해주세요." };
        }
    }
};
