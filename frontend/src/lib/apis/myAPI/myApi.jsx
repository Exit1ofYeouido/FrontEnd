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

