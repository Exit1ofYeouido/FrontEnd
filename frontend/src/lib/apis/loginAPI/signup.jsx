import instance from "../basis";

export const idCheck = async (username) => {
    try {
        const response = await instance.get(`/auth/check-username/${username}`);
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 400) {
            return {
                error: true,
                message:
                    "아이디가 4글자 미만이거나 숫자로만 이루어져 있습니다.",
            };
        } else {
            return { error: true, message: "오류입니다." };
        }
    } catch (error) {
        console.error("ID check failed:", error);

        return {
            error: true,
            message:
                error.response?.data?.message ||
                "아이디가 4글자 미만이거나 숫자로만 이루어져 있습니다." ||
                error.message ||
                "오류입니다.",
        };
    }
};

export const sendAuth = async (phoneNumber) => {
    try {
        const response = await instance.post(`/auth/phone-verification`, {
            phoneNumber: phoneNumber,
        });
        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error("Unexpected response status: " + response.status);
        }
    } catch (error) {
        console.error(
            "Logout failed:",
            error.response?.data?.message || error.message
        );
    }
};

export const verifyCode = async (phoneNumber, code) => {
    try {
        const response = await instance.post(
            `/auth/phone-verification/verify`,
            {
                phoneNumber: phoneNumber,
                verificationCode: code,
            }
        );
        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error("Unexpected response status: " + response.status);
        }
    } catch (error) {
        console.error(
            "Logout failed:",
            error.response?.data?.message || error.message
        );
    }
};

export const userSignUp = async (signUpData) => {
    try {
        const response = await instance.post(`/my/signup`, {
            name: signUpData.name,
            memberName: signUpData.memberName,
            memberPassword: signUpData.memberPassword,
            phoneNumber: signUpData.phoneNumber,
            email: signUpData.email,
            birth: signUpData.birth,
            sex: signUpData.sex,
        });

        if (response.status === 201) {
            return { success: true, message: "회원가입 성공" };
        } else {
            throw new Error("Unexpected response status: " + response.status);
        }
    } catch (error) {
        console.error(
            "Sign-up failed:",
            error.response?.data?.message || error.message
        );
        return {
            success: false,
            message: error.response?.data?.message || error.message,
        };
    }
};
