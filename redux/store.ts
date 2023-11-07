import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { adminAPI } from './service/adminAPI'
import { productsAPI } from './service/productsAPI'
import { productsFilterAPI } from './service/productsFilterAPI'

export const store = configureStore({
	reducer: {
		[adminAPI.reducerPath]: adminAPI.reducer,
		[productsAPI.reducerPath]: productsAPI.reducer,
		[productsFilterAPI.reducerPath]: productsFilterAPI.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			adminAPI.middleware,
			productsAPI.middleware,
			productsFilterAPI.middleware
		)
})

setupListeners(store.dispatch)
