'use client'
import Sidebar from './Sidebar'
import { useUserSession } from '@/app/userContext'
import { useEffect, useState } from 'react'
import { auth } from '@/firebase/config'
import { toast } from 'sonner'
import { Spinner } from '@nextui-org/react'

const Dashboard = (): React.JSX.Element => {
	const { userSession: user } = useUserSession()
	const [loading, setLoading] = useState(true)
	const [isAdmin, setIsAdmin] = useState(false)
	useEffect(() => {
		auth?.currentUser?.getIdTokenResult()
			.then((idTokenResult) => {
				setLoading(false)
				if (idTokenResult.claims.admin) {
					setIsAdmin(true)
				}
			})
			.catch((error) => {
				toast.error('Something went wrong: ' + error)
			})
	}, [user])

	if (loading) {
		return (
			<div className='flex items-center justify-center'>
				<Spinner
					label="Verificando credenciales..."
					labelColor="success"
					color="success"
					aria-label="Loading Spinner"
					size="lg"
				/>
			</div>
		)
	}

	if (isAdmin) {
		return (
			<div>
				<h1>Admin Dashboard</h1>
				<Sidebar/>
			</div>
		)
	} else {
		return (
			<div>
				<h1>RUTA PROTEGIDA</h1>
			</div>
		)
	}
}

export default Dashboard
