import { Tabs, Tab } from '@nextui-org/react'
import Users from './Users'
import CreateProduct from '@/components/form/CreateProduct'
import AdmProducts from './admProducts/AdmProducts'
const Sidebar = (): React.JSX.Element => {
	return (
		<div className="flex w-full flex-col">
			<Tabs
				aria-label="Options"
				color="success"
				variant="underlined"
				classNames={{
					tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
					cursor: 'w-full',
					tab: 'max-w-fit px-0 h-8'
				}}
			>
				<Tab
					key="users"
					title='Usuarios'
				>
					<Users/>
				</Tab>
				<Tab
					key='addProduct'
					title='Añadir producto'
				>
					<CreateProduct/>
				</Tab>
				<Tab
					key='favorites'
					title='Administrar favoritos'
				>
			Administrar favoritos...
				</Tab>
				<Tab
					key='products'
					title='Administrar productos'
				>
					<AdmProducts></AdmProducts>
				</Tab>
			</Tabs>
		</div>
	)
}

export default Sidebar
