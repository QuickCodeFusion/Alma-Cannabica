import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
	name: 'products',
	initialState: {
		productos: []
	},
	reducers: {
		loadProducts: (state, { payload }) => {
			state.productos = payload
		}
	}
})

export const { loadProducts } = productSlice.actions
