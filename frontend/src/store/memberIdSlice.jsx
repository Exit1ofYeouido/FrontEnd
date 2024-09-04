import { createSlice } from "@reduxjs/toolkit";

const memberIdSlice = createSlice({
    name: "memberId",
    initialState: {
        loginId: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { loginId } = action.payload;
            state.loginId = loginId;
        },
        clearCredentials: (state) => {
            state.loginId = null; 
        },
    },
});

export const { setCredentials, clearCredentials } = memberIdSlice.actions;

export default memberIdSlice.reducer;
