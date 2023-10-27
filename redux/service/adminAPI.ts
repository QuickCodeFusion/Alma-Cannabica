import { type UsersList } from '@/types/User/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminAPI = createApi({
	reducerPath: 'adminAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api/users/admin'
	}),
	endpoints: (builder) => ({
		getAllAuthUsers: builder.query<UsersList, null>({
			query: () => ('/users')
		}),
		setAdmin: builder.mutation<Promise<void>, { id: string, admin: boolean }>({
			query: (body) => ({
				url: `/manage/${body.id}`,
				method: 'POST',
				body
			})
		}),
		disableUser: builder.mutation<Promise<void>, { id: string, disabled: boolean }>({
			query: (body) => ({
				url: `/disable/${body.id}`,
				method: 'POST',
				body
			})
		})
	})
})

export const { useGetAllAuthUsersQuery, useSetAdminMutation, useDisableUserMutation } = adminAPI
