import { createSlice } from '@reduxjs/toolkit'

export interface queryState {
	query: {
		category: string
		order: string
		name: string
		minPrice: string
		maxPrice: string
	}
}

const initialState: queryState = {
	query: {
		category: '',
		order: '',
		name: '',
		minPrice: '',
		maxPrice: ''
	}
}

export const searchBarSlice = createSlice({
	name: 'searchBar',
	initialState,
	reducers: {
		search: (state, { payload }) => {
			state.query.name = payload
		},
		setQuery: (state, { payload }) => {
			state.query = {
				...state.query,
				...payload
			}
		}
	}
})

export const { search, setQuery } = searchBarSlice.actions
