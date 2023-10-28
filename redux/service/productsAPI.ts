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
		}),
		getAllProducts: builder.query({
			query: () => '/'
		})
	})
})

export const { useCreateProductMutation, useGetAllProductsQuery } = productsAPI
