'use client'
import Login from '@/components/form/login/Login'
import Register from '@/components/form/register/Register'
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'

const LoginPage = (): React.JSX.Element => {
	return (
		<div className='h-screen md:h-full w-full flex flex-col justify-between items-center p-4'>
			<Card className="w-full md:w-1/3">
				<CardBody>
					<Tabs className='justify-center' disableAnimation
					>
						<Tab key="login" title="Ingresar">
							<Login />
						</Tab>
						<Tab key="register" title="Registrarse">
							<Register />
						</Tab>
					</Tabs>

				</CardBody>
			</Card>

		</div>
	)
}

export default LoginPage
