import instance from "../basis";

export const enterpriseList = async () => {
    try {
        const response = await instance.get(`/reward/receipt/enterprise`);
        return response.data;
    } catch (error) {
        console.error("Error fetching enterprise list:", error);
        throw error;
    }
};

export const uploadReceipt = async (formData) => {
    try {
        const response = await instance.post(
            `/reward/receipt/check`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error uploading receipt:", error);
        throw error;
    }
};


export const getReward = async (receiptData) => {
    try {
        const response = await instance.post(`/reward/receipt/`, receiptData); 
        return response.data;
    } catch (error) {
        console.error("Error submitting receipt for reward:", error);
        throw error;
    }
};