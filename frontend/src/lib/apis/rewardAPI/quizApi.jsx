import instance from "../basis";
import { store } from "~store/store";

export const quizListApi = async (mediaId) => {
    try {
        const response = await instance.get(`/reward/ad/${mediaId}/quiz`);
        return response.data;
    } catch (error) {
        console.error("Error fetching quiz list:", error);
        throw error;
    }
};

export const quizCorrectApi = async (mediaId, enterpriseName) => {
    try {
        const state = store.getState();
        const memberId = state.memberId.memberId;

        const response = await instance.post(`/reward/ad/${mediaId}/quiz`, {
            enterpriseName: enterpriseName,
        });

        return response.data;
    } catch (error) {
        console.error("Error submitting quiz answer:", error);
        throw error;
    }
};
