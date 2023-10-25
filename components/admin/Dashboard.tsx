import Users from './Users'
import Sidebar from './Sidebar'

const Dashboard = (): React.JSX.Element => {
	const user = {
		uid: '123',
		email: 'Q4U5C@example.com',
		customClaims: {
			admin: true
		}
	}

	if (user?.customClaims?.admin) {
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
				{'NO SE PUEDE PASAR PAPA'}
			</div>
		)
	}
}

export default Dashboard
