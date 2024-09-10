import instance from "../basis";

export const getStatisticMember = async (memberId, year, month) => {
    try {
        const response = await instance.get(
            `/search/admin/search-history/member`,
            {
                params: { memberId, year, month },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching enterprise list:", error);
        throw error;
    }
};

export const getStatisticMemberStock = async (
    memberId,
    enterpriseName,
    year,
    month
) => {
    try {
        const response = await instance.get(
            `/search/admin/search-history/member-stock`,
            {
                params: { memberId, enterpriseName, year, month },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error uploading receipt:", error);
        throw error;
    }
};

export const getStatisticStock = async (enterpriseName, year, month) => {
    try {
        const response = await instance.get(
            `/search/admin/search-history/stock`,
            {
                params: { enterpriseName, year, month },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error submitting receipt for reward:", error);
        throw error;
    }
};

export const getAdmin = async () => {
    try {
        const response = await instance.get(`/search/admin`);
        return response.data;
    } catch (error) {
        console.error("Error submitting receipt for reward:", error);
        throw error;
    }
};
