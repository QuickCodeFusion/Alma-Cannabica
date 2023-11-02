'use client'
import { auth } from '@/firebase/config'
import { type User, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useState, createContext, useContext, useEffect, type Dispatch } from 'react'

interface UserContextType {
	userSession: User | undefined
	logOut: () => void
	setUserSession: Dispatch<any>
}

const Context = createContext<UserContextType>({} as any)

const UserContextProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
	const [userSession, setUserSession] = useState<any>(undefined)

	const router = useRouter()

	const logOut = (): void => {
		auth.signOut().then(() => {
			setUserSession(undefined)
			void fetch('api/auth/logout')
		}).then(async () => {
			await router.push('/login')
		})
			.catch(error => { alert(`Error inesperado al desconectarse: ${error.message}`) })
		setUserSession(undefined)
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserSession(user)
			} else {
				setUserSession(undefined)
			}
		})

		return () => { unsubscribe() }
	}, [])
	return (
		<Context.Provider value={{ userSession, setUserSession, logOut }}>
			{children}
		</Context.Provider>
	)
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useUserSession = () => useContext(Context)

export { useUserSession, UserContextProvider }
