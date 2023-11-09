import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { adminAPI } from './service/adminAPI'
import { productsAPI } from './service/productsAPI'
import { productsFilterAPI } from './service/productsFilterAPI'
import { carouselAPI } from './service/carouselAPI'
import { searchBarSlice } from './feature/searchBarSlice'

export const store = configureStore({
	reducer: {
		[adminAPI.reducerPath]: adminAPI.reducer,
		[productsAPI.reducerPath]: productsAPI.reducer,
		[productsFilterAPI.reducerPath]: productsFilterAPI.reducer,
		[carouselAPI.reducerPath]: carouselAPI.reducer,
		searchBar: searchBarSlice.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			adminAPI.middleware,
			productsAPI.middleware,
			productsFilterAPI.middleware,
			carouselAPI.middleware
		)
})

setupListeners(store.dispatch)
