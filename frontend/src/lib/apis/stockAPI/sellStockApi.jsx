import instance from "../basis";

export const sellStock = async (code, name, amount) => {
    try {
        const response = await instance.post(`/my/stocks/sell`, {
            stockCode: code,
            stockName: name,
            sellAmount: amount,
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching attendace:", error);
        throw error;
    }
};

export const preSellStock = async (stockCode) => {
    try {
        const response = await instance.get(`/my/stocks/pre-sell/${stockCode}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching attendace:", error);
        throw error;
    }
};
