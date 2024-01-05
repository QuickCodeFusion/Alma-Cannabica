import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoriesAPI = createApi({
	reducerPath: 'categoriesAPI',
	baseQuery: fetchBaseQuery({ baseUrl: '/api/category' }),
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: () => '/'
		})
	})
})

export const { useGetCategoriesQuery } = categoriesAPI
