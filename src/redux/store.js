import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import contactsReducer from "./contacts/slice.js"
import filtersReducer from "./filters/slice.js"
import authReducer from "./auth/slice.js";

const persistAuthConfig = {
    key: "auth",
    version: 1,
    storage,
    whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        contacts: contactsReducer,
        filters: filtersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export const persistor = persistStore(store);

export default store;