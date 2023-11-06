'use client'
import { auth } from '@/firebase/config'
import { type NormalizedUser } from '@/types/User/types'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useState, createContext, useContext, useEffect, type Dispatch } from 'react'

interface UserContextType {
	userSession: NormalizedUser | undefined | null
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
			router.push('/login')
		})
			.catch(error => { alert(`Error inesperado al desconectarse: ${error.message}`) })
		setUserSession(undefined)
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserSession((prevState: NormalizedUser) => ({
					...prevState,
					...user
				}))
			} else {
				setUserSession(null)
			}
		})

		return () => {
			unsubscribe()
		}
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
