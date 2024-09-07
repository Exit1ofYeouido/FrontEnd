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

export const getHoldStock = async () => {
    try {
        const response = await instance.get(`/my/stocks`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
    }
};

export const getStockHistory = async () => {
    try {
        const response = await instance.get(`/my/stocks-history`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all data:", error);
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

export const getPointStock = async () => {
    try {
        const response = await instance.get(`/my/point`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
    }
};

export const getPointHistory = async () => {
    try {
        const response = await instance.get(`/my/point-history`);
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
