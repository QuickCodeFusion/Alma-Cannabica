import { type CartProduct } from '@/types/User/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cartAPI = createApi({
	reducerPath: 'cartAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api/users/cart'
	}),
	tagTypes: ['Cart'],
	endpoints: (builder) => ({
		getCart: builder.query<CartProduct[], string>({
			query: (userId) => ({
				url: `?id=${userId}`
			}),
			providesTags: ['Cart']
		}),
		updateCart: builder.mutation<Promise<void>, { userId: string, itemId: string, value: string }>({
			query: ({ userId, itemId, value }) => ({
				url: '/update',
				method: 'PUT',
				body: {
					userId,
					itemId,
					value
				}
			})
		}),
		clearCart: builder.mutation<Promise<void>, { userId: string, itemId: string }>({
			query: ({ userId, itemId }) => ({
				url: '/delete',
				method: 'DELETE',
				body: {
					userId,
					itemId
				}
			}),
			invalidatesTags: ['Cart']
		})
	})
})

export const { useGetCartQuery, useUpdateCartMutation, useClearCartMutation } = cartAPI
