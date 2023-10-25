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
	// TODO: Add type for users list
}
