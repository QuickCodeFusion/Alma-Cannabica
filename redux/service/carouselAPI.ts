import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Carousel = {

    name: string
	description: string
	price: number
	image: string
	itemId: string
	category: string
};

export const carouselAPI = createApi({
    reducerPath: "carouselAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api"
    }),
    endpoints: (builder) => ({
        createArticule: builder.mutation({
            query: (body) => ({
                url: "/products/carrousel",
                method: "POST",
                body
            })
        }),
        deleteArticule: builder.mutation({
            query: (body) => ({
                url: "/products/carrousel",
                method: "DELETE",
                body
            })
        }),
        getCarousel: builder.query<Carousel[], null>({
            query: () => "products/carrousel",
        })
    })
});

export const { useGetCarouselQuery, useCreateArticuleMutation, useDeleteArticuleMutation } = carouselAPI;
