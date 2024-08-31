import instance from "../basis";
import { store } from "~store/store";

export const videoListApi = async () => {
    try {
        const state = store.getState();
        const memberId = state.memberId.memberId;

        const response = await instance.get("/reward/ad/info", {
            headers: {
                memberId: memberId,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching videos:", error);
        throw error;
    }
};

export const videoDetailApi = async (mediaId) => {
    try {
        const response = await instance.get(`/reward/ad/${mediaId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching video detail:", error);
        throw error;
    }
};
