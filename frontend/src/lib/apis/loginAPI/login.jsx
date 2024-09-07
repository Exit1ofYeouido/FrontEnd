import refreshInstance from "./auth";
import store from "~store/store";
import { setCredentials } from "~store/memberIdSlice";
import { showToast } from "~components/Toast";

export const logout = async () => {
    try {
        await instance.post("/auth/logout");

        localStorage.removeItem("accessToken");
        // window.location.href = "/login";
        // showToast(
        //     "error",
        //     "로그아웃 중 오류가 발생했습니다. 다시 시도해주세요."
        // );
        return { success: true };
    } catch (error) {
        console.error(
            "Logout failed:",
            error.response?.data?.message || error.message
        );
    }
};

export const login = async (id, password) => {
    try {
        const response = await refreshInstance.post("/auth/login", {
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
            console.log(error.response.data.message);
            showToast("error", "아이디 및 패스워드를 확인해주세요.");
            return { error: "에러" };
        } else {
            showToast(
                "error",
                "로그인 중 오류가 발생했습니다. 다시 시도해주세요."
            );
            return {
                error: "로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
            };
        }
    }
};
