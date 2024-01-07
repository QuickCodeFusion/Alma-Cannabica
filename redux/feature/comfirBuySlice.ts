import { createSlice } from "@reduxjs/toolkit";

export const comfirBuySlice = createSlice({
    name: 'comfirBuy',
    initialState: {
        data: [],
    },
    reducers: {
        setComfirBuy: (state, { payload }) => {
            state.data = payload.data
        }
    }
})
export const { setComfirBuy } = comfirBuySlice.actions