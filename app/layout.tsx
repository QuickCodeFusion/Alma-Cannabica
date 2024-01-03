import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'
import { Providers } from './providers'
import NavBar from '@/components/navBar/NavBar'
import Footer from '@/components/footer/Footer'
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
	title: 'Alma Cannabica'
}

const inter = Inter({
	subsets: ['latin'],
	display: 'swap'
})

export default function RootLayout ({
	children
}: {
	children: React.ReactNode
}): React.JSX.Element {
	return (
		<html lang="es" className={inter.className}>
			<body>
				<Providers >
					<Toaster richColors position="top-center" />
					<NavBar />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
