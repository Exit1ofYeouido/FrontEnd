import { configureStore } from "@reduxjs/toolkit";
import memberIdReducer from "./memberIdSlice";

export const store = configureStore({
    reducer: {
        memberId: memberIdReducer,
    },
});
