import { type UserRecord } from 'firebase-admin/auth'

export interface Address {
	id: string
	name: string
	address: string
	city: string
	province: string
	zipCode: string
	country: string
}

export interface User {
	uid: string
	name: string
	email: string
	photoUrl: string
	addresses: Address[]
}

export interface UsersList {
	users: UserRecord[]
	nextPageToken?: string
}

export interface UserAuth {
	email: string
	uid: string
	customClaims: {
		admin: boolean
	}
}

export interface NormalizedUser {
	uid: string
	email: string
	name: string
	photoUrl: string
	claims: {
		admin: boolean
	}
}

export interface CartProduct {
	name: string
	nameToLowerCase: string
	price: string
	quantity: number
	image: string
	category: string[]
	description?: string
	itemId: string
}

export interface UserResponse {
	response: {
		data: {
			user: User
			message: string
		}
	}
}
