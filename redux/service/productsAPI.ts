import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsAPI = createApi({
	reducerPath: 'productsAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api/products'
	}),
	endpoints: (builder) => ({
		createProduct: builder.mutation({
			query: (body) => ({
				url: '/',
				method: 'POST',
				body
			})
		})
	})
})

export const { useCreateProductMutation } = productsAPI
