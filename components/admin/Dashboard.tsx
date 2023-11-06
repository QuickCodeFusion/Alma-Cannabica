'use client'
import Users from './Users'
import Sidebar from './Sidebar'
import { useUserSession } from '@/app/userContext'
import { useEffect, useState } from 'react'
import { auth } from '@/firebase/config'
import { toast } from 'sonner'

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
	}, [])

	if (loading) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		)
	}

	if (isAdmin) {
		return (
			<div>
				<h1>Admin Dashboard</h1>
				<Sidebar/>
				<Users/>
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
