'use client'
import Login from '@/components/form/login/Login'
import Register from '@/components/form/register/Register'
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import style from '@/components/form/login/login.module.css'

const LoginPage = (): React.JSX.Element => {
	return (
		<div className={style.container}>
			<Card className="max-w-full">
				<CardBody className="overflow-hidden">
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
