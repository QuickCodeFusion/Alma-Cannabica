import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsFilterAPI = createApi({
	reducerPath: 'productsFilterAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api/filters'
	}),
	endpoints: (builder) => ({
		getFilters: builder.query({
			query: ({ name, minPrice, maxPrice, category, order, firstProductId, lastProductId }: { name: string, minPrice: string, maxPrice: string, category: string, order: string, firstProductId: string, lastProductId: string }) => `?name=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}&order=${order}&firstProductId=${firstProductId}&lastProductId=${lastProductId}`
		})
	})

})

export const { useGetFiltersQuery } = productsFilterAPI
