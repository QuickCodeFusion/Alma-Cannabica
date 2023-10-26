import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productsAPI } from './service/productsAPI'
import { adminAPI } from './service/adminAPI'

export const store = configureStore({
	reducer: {
		[productsAPI.reducerPath]: productsAPI.reducer,
		[adminAPI.reducerPath]: adminAPI.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			productsAPI.middleware,
			adminAPI.middleware
		)
})

setupListeners(store.dispatch)
