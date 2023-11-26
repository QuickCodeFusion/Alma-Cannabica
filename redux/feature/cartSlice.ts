import { type CartProduct } from '@/types/User/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	cart: [] as CartProduct[]
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, { payload }) => {
			if (state.cart.some(item => item.itemId === payload.itemId)) {
				state.cart = state.cart.map(item => {
					if (item.itemId === payload.itemId) {
						item.quantity = item.quantity + 1
					}
					return item
				})
			} else {
				state.cart.push({ ...payload, quantity: 1 })
			}
		},
		removeFromCart: (state, { payload }) => {
			state.cart = state.cart.filter(item => item.itemId !== payload.itemId)
		},
		clearCart: (state) => {
			state.cart = []
		},
		updateQuantity: (state, { payload }) => {
			if (payload.action === 'add') {
				state.cart = state.cart.map(item => {
					if (item.itemId === payload.itemId) {
						item.quantity = item.quantity + 1
					}
					return item
				})
			} else {
				state.cart = state.cart.filter(item => {
					if (item.itemId === payload.itemId && item.quantity > 1) {
						item.quantity = item.quantity - 1
					} else if (item.itemId === payload.itemId && item.quantity === 1) {
						return false
					}
					return item
				})
			}
		},
		loadCart: (state, { payload }) => {
			state.cart = payload
		}
	}
})

export const {
	addToCart,
	removeFromCart,
	clearCart,
	updateQuantity,
	loadCart
} = cartSlice.actions
