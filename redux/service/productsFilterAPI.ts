import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsFilterAPI = createApi({
	reducerPath: 'productsFilterAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api/filters'
	}),
	endpoints: (builder) => ({
		getFilters: builder.query({
			query: ({ name, minPrice, maxPrice, category, order }) => `?name=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}&order=${order}`
		})
	})

})

export const { useGetFiltersQuery } = productsFilterAPI
