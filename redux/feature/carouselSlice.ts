import { createSlice } from "@reduxjs/toolkit";


export const carouselSlice = createSlice({
    name: 'carousel',
    initialState:{
		data: [],
	},
    reducers: {
        setCarousel: (state, { payload }) => {
            state.data = payload.data
        }
        
    }
})
export const { setCarousel } = carouselSlice.actions