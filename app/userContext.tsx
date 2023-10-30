'use client'
import { auth } from '@/firebase/config'
import { type User, onAuthStateChanged } from 'firebase/auth'
import { redirect } from 'next/navigation'
import { useState, createContext, useContext, useEffect } from 'react'

const Context = createContext({
	userSession: undefined,
	logOut: () => {}
})

const UserContextProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
	const [userSession, setUserSession] = useState<any>(undefined)
    const cookies = useCookies()

	const logOut = () => {
		auth.signOut().then(() => {
			setUserSession(undefined)
		}).then(() => {
			redirect('/login')
		})
		setUserSession(undefined)
		cookies().delete('session')
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
		<Context.Provider value={{ userSession, logOut }}>
			{children}
		</Context.Provider>
	)
}

const useUserSession = () => useContext(Context)

export { useUserSession, UserContextProvider }
