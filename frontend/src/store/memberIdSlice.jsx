import { createSlice } from "@reduxjs/toolkit";

const memberIdSlice = createSlice({
    name: "memberId",
    initialState: {
        memberId: null,
        accessToken: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { token } = action.payload;
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            state.memberId = decodedToken.memberId;
            state.accessToken = token;
        },
        clearCredentials: (state) => {
            state.memberId = null;
            state.accessToken = null;
        },
    },
});

export const { setCredentials, clearCredentials } = memberIdSlice.actions;

export default memberIdSlice.reducer;
