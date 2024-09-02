import instance from "../basis";

export const attendance = async () => {
    try {
        const response = await instance.get(`/reward/attendance`);
        return response.data;
    } catch (error) {
        console.error("Error fetching attendace:", error);
        throw error;
    }
};

export const attendanceCheck = async () => {
    try {
        const response = await instance.post(`/reward/attendance`);
        return response.data;
    } catch (error) {
        console.error("Error submitting quiz answer:", error);
        throw error;
    }
};
