import instance from "../basis";

export const idCheck = async (username) => {
    try {
        const response = await instance.get(`/auth/check-username/${username}`);
        return response.data;
    } catch (error) {
        console.error(
            "Logout failed:",
            error.response?.data?.message || error.message
        );
    }
};


export const sendAuth = async (phoneNumber) => {
    try {
        const response = await instance.post(`/auth/phone-verification`,{
            phoneNumber: phoneNumber
        });
        return response.data;
    } catch (error) {
        console.error(
            "Logout failed:",
            error.response?.data?.message || error.message
        );
    }
};

export const verifyCode = async (phoneNumber, code) => {
    try {
        const response = await instance.post(`/auth/phone-verification/verify`,{
            phoneNumber: phoneNumber,
            verificationCode: code
        });
        return response.data;
    } catch (error) {
        console.error(
            "Logout failed:",
            error.response?.data?.message || error.message
        );
    }
};