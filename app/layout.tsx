import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import NavBar from '@/components/navBar/NavBar'
import Footer from '@/components/footer/Footer'

export const metadata: Metadata = {
	title: 'Alma Cannabica'
}

export default function RootLayout ({
	children
}: {
	children: React.ReactNode
}): React.JSX.Element {
	return (
		<html lang="en" className='dark'>
			<body>
				<Providers>
					<NavBar/>
					{children}
					<Footer/>
				</Providers>
			</body>
		</html>
	)
}
