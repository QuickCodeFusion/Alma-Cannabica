import { createSlice } from '@reduxjs/toolkit'

export const searchBarSlice = createSlice({
	name: 'searchBar',
	initialState: {
		value: ''
	},
	reducers: {
		search: (state, { payload }) => {
			state.value = payload
		}
	}
})

export const { search } = searchBarSlice.actions
