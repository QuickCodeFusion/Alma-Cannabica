import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const createProductAPI = createApi({
    reducerPath: 'createProductAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (body) => ({
                url: '/products/postProduct',
                method: 'POST',
                body,
            }),
        }),
        getAllProducts: builder.query({
            query: () => ('/products')
        })
    }),
})

export const { useCreateProductMutation, useGetAllProductsQuery } = createProductAPI
