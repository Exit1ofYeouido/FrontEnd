import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import memberIdReducer from "./memberIdSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
    memberId: memberIdReducer,
});


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['memberId'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export default store;
