import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsAPI = createApi({
	reducerPath: 'productsAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api/'
	}),
	endpoints: (builder) => ({
		createProduct: builder.mutation({
			query: (body) => ({
				url: '/products',
				method: 'POST',
				body
			})
		}),
		deleteProduct: builder.mutation({
			query: (itemId) => ({
				url: `/?itemId=${itemId}`,
				method: 'DELETE'
			})
		}),
		getAllProducts: builder.query({
			query: () => '/'
		})
	})
})

export const { useCreateProductMutation, useGetAllProductsQuery, useDeleteProductMutation } = productsAPI
