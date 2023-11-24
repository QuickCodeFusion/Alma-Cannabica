import { type CartProduct } from '@/types/User/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	cart: [] as CartProduct[]
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			state.cart.push(action.payload)
		},
		removeFromCart: (state, action) => {
			state.cart = state.cart.filter(item => item.id !== action.payload)
		},
		clearCart: (state) => {
			state.cart = []
		},
		updateQuantity: (state, action) => {
			state.cart = state.cart.map(item => {
				if (item.id === action.payload.id) {
					item.quantity = action.payload.quantity
				}
				return item
			})
		},
		loadCart: (state, action) => {
			state.cart = action.payload
		}
	}
})
