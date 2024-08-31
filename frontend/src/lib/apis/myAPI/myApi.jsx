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