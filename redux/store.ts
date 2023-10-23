import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import { createProductAPI } from './service/productsAPI';

export const store = configureStore({
	reducer: {
        [createProductAPI.reducerPath]: createProductAPI.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
            createProductAPI.middleware,

		),
});


setupListeners(store.dispatch);