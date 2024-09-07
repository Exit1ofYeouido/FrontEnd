import instance from "../basis";

export const getStock = async () => {
    try {
        const response = await instance.get(`/search/stocks`);
        console.log(response.data);
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
