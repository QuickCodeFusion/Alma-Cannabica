'use client'

import { NextUIProvider } from '@nextui-org/react'

/* Core */
import { Provider } from 'react-redux'

/* Instruments */
import { store } from '@/redux/store'

/* User context */
import { UserContextProvider } from './userContext'

export function Providers ({ children }: { children: React.ReactNode }): React.JSX.Element {
	return (
		<Provider store={store}>
			<UserContextProvider>
				<NextUIProvider className='w-screen h-screen'>
					{children}
				</NextUIProvider>
			</UserContextProvider>
		</Provider>
	)
}
