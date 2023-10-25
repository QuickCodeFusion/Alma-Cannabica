import Users from "./Users"
import Sidebar from "./Sidebar"

const Dashboard = (): React.JSX.Element => {
	return (
		<div>
			<h1>Admin Dashboard</h1>
            <Sidebar/>
            <Users/>
		</div>
	)
}

export default Dashboard
