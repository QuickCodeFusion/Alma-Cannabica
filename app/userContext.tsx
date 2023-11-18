'use client'
import { auth } from '@/firebase/config'
import { type NormalizedUser } from '@/types/User/types'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useState, createContext, useContext, useEffect, type Dispatch } from 'react'
import { toast } from 'sonner'

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
		auth.signOut()
			.then(() => {
				setUserSession(null)
				void fetch('api/auth/logout')
				router.push('/login')
			})
			.catch(error => { toast.error(`Error inesperado al desconectarse: ${error.message}`) })
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				user?.getIdTokenResult()
					.then((idTokenResult) => {
						setUserSession((prevState: NormalizedUser) => ({
							...prevState,
							...user,
							claims: idTokenResult.claims
						}))
					})
					.catch((error) => {
						toast.error(`Error inesperado al recuperar la sesión: ${error.message}. 
									Intente recargar la página o contacte a un administrador`)
					})
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
