import { type CartProduct } from '@/types/User/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cartAPI = createApi({
	reducerPath: 'cartAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api/users'
	}),
	endpoints: (builder) => ({
		getCart: builder.query<CartProduct[], string>({
			query: (userId) => ({
				url: `/cart?id=${userId}`
			})
		})
	})
})

export const { useGetCartQuery } = cartAPI
