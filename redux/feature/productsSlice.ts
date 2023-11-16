import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
	name: 'products',
	initialState: {
		products: [],
		isLoading: true,
		isError: false
	},
	reducers: {
		loadProducts: (state, { payload }) => {
			state.products = payload.products
			state.isLoading = payload.isLoading
			state.isError = payload.isError
		}
	}
})

export const { loadProducts } = productSlice.actions
