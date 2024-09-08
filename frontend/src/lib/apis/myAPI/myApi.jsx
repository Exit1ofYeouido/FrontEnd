import instance from "../basis";

export const myGetAll = async () => {
    try {
        const response = await instance.get(`/my/page/all`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
    }
};


export const myGetStock = async () => {
    try {
        const response = await instance.get(`/my/stocks-value`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
    }
};

export const getHoldStock = async () => {
    try {
        const response = await instance.get(`/my/stocks`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
    }
};

export const getStockHistory = async (page) => {
    try {
        const response = await instance.get(`/my/stocks-history`, {
            params: {
                index: page,
                size: 6,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching stock history data:", error);
        throw error;
    }
};

export const getStockPendingHistory = async () => {
    try {
        const response = await instance.get(`/my/stocks/pending`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
    }
};

export const cancelStockPending = async (saleId) => {
    try {
        const response = await instance.delete(`/my/stocks/pending/${saleId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
    }
};

export const getPointStock = async () => {
    try {
        const response = await instance.get(`/my/point`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
    }
};

export const getPointHistory = async (page) => {
    try {
        const response = await instance.get(`/my/point-history`, {
            params: {
                index: page,
                size: 6,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
    }
};

export const getTutorialCheck = async (type) => {
    try {
        const response = await instance.get(`/my/page/check`, {
            params: { type },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
    }
};

export const tutorialNoLook = async (type) => {
    try {
        const response = await instance.post(`/my/page/notuto?type=${type}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
    }
};

export const preWithdrawPoint = async () => {
    try {
        const response = await instance.get(`/my/pre-withdrawal`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
    }
};

export const withdrawPoint = async (withdrawalAmount, accountNumber) => {
    try {
        const response = await instance.post(`/my/withdrawal`, {
            withdrawalAmount: withdrawalAmount,
            accountNumber: accountNumber,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
    }
};
