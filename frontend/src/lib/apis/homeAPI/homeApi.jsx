import instance from "../basis";

export const getHome = async () => {
    try {
        const response = await instance.get(`/home/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all data:", error);
        throw error;
    }
};