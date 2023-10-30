'use client'

import { NextUIProvider } from '@nextui-org/react'

/* Core */
import { Provider } from 'react-redux'

/* Instruments */
import { store } from '@/redux/store'

/* User context */
import { ContextProvider } from './userContext'

export function Providers ({ children }: { children: React.ReactNode }): React.JSX.Element {
	return (
		<Provider store={store}>
			<ContextProvider>
				<NextUIProvider>
					{children}
				</NextUIProvider>
			</ContextProvider>
		</Provider>
	)
}
