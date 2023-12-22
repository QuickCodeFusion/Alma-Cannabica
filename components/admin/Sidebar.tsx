import { Tabs, Tab } from '@nextui-org/react'
import Users from './Users'
import CreateProduct from '@/components/form/CreateProduct'
import Loading from '@/app/loading'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const AdmProducts = dynamic(async () => await import('./admProducts/AdmProducts'), {
	ssr: false
})
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
					<Suspense fallback={<Loading/>}>
						<Users/>
					</Suspense>
				</Tab>
				<Tab
					key='addProduct'
					title='Añadir producto'
				>
					<CreateProduct/>
				</Tab>
				<Tab
					key='products'
					title='Administrar productos'
				>
					<AdmProducts/>
				</Tab>
			</Tabs>
		</div>
	)
}

export default Sidebar
