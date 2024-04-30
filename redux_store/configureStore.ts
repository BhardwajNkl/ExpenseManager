import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";

import { fetchData } from "./slice";

const store = configureStore({
    reducer: rootReducer,
});

/*
    loading the previously stored data
*/
store.dispatch(fetchData());

export default store;