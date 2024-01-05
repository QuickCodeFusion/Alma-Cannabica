import { type UserResponse, type UsersList } from '@/types/User/types'
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
		setAdmin: builder.mutation<UserResponse, { id: string, admin: boolean }>({
			query: (body) => ({
				url: `/manage/${body.id}`,
				method: 'POST',
				body
			}),
			transformResponse: (response: UserResponse) => response
		}),
		disableUser: builder.mutation<UserResponse, { id: string, disabled: boolean }>({
			query: (body) => ({
				url: `/disable/${body.id}`,
				method: 'POST',
				body
			}),
			transformResponse: (response: UserResponse) => response

		})
	})
})

export const { useGetAllAuthUsersQuery, useSetAdminMutation, useDisableUserMutation } = adminAPI
