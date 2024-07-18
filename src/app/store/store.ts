import { configureStore } from "@reduxjs/toolkit";
import DataDetails from "./slices/Data";
const store = configureStore({
	reducer: DataDetails,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
