import instance from "../basis";

export const getStock = async () => {
    try {
        const response = await instance.get(`/search/stocks`);
        return response.data;
    } catch (error) {
        console.error("Error fetching attendace:", error);
        throw error;
    }
};

export const getStockPrice = async (code) => {
    try {
        const response = await instance.get(`/search/stock/${code}`);
        return response.data;
    } catch (error) {
        console.error("Error submitting quiz answer:", error);
        throw error;
    }
};

export const getStockChart = async (code, period) => {
    try {
        const response = await instance.get(`/search/stockPriceList/${code}`, {
            params: { period },
        });
        return response.data;
    } catch (error) {
        console.error("Error submitting quiz answer:", error);
        throw error;
    }
};

export const getSearchStock = async (query) => {
    try {
        const response = await instance.get(`/search/stocks/keyword`, {
            params: { query },
        });
        return response.data;
    } catch (error) {
        console.error("Error submitting quiz answer:", error);
        throw error;
    }
};

export const getLink = async () => {
    try {
        const response = await instance.post(`/my/stocks/purchase`);
        return response.data;
    } catch (error) {
        console.error("Error Link", error);
        throw error;
    }
};

export const getDetail = async (enterpriseName) => {
    try {
        const response = await instance.get(`/reward/detail`, {
            params: {
                enterpriseName: enterpriseName,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error detail", error);
        throw error;
    }
};
