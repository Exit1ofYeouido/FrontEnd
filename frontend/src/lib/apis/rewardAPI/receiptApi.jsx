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
