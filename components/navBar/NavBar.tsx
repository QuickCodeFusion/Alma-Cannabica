'use client'
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarMenuToggle,
	NavbarMenuItem,
	NavbarMenu,
	NavbarItem,
	Button,
	Image
} from '@nextui-org/react'
import SearchBar from './SearchBar/SearchBar'
import style from './navbar.module.css'
import NextImage from 'next/image'
import Link from 'next/link'
import { useUserSession } from '@/app/userContext'
import { PopoverComponent } from './Popover/Popover'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NavBar = (): JSX.Element => {
	const { userSession, logOut } = useUserSession()
	const pathname = usePathname()

	const [menuItems, setMenuItems] = useState([
		{
			name: 'Inicio',
			label: '/'
		},
		{
			name: 'Productos',
			label: '/products'
		},
		{
			name: 'Información',
			label: '/info'
		}
	])

	useEffect(() => {
		if (userSession?.claims.admin) {
			setMenuItems((prev) => [
				...prev,
				{
					name: 'Panel de administrador',
					label: '/admin-dashboard'
				}
			])
		}
	}, [userSession?.uid])

	return (
		<>
			<Navbar maxWidth='full' disableAnimation isBordered classNames={{
				item: [
					'data-[active=true]:text-green-400',
					'data-[active=true]:font-medium',
					'flex',
					'w-full'
				],
				brand: 'min-w-[50px]',
				menuItem: [
					'data-[active=true]:text-green-400'
				]
			}}>

				<NavbarContent justify="start">
					<NavbarContent className="lg:hidden z-10" justify="start">
						<NavbarMenuToggle style={{ color: '#18C964' }} />
					</NavbarContent>
					<NavbarBrand className="hidden sm:flex items-center">
						<Link href="/">
							<Image as={NextImage} classNames={{ img: 'object-cover' }} src="/logo.png" alt="Logo" width={50} height={50}/>
						</Link>
					</NavbarBrand>
				</NavbarContent>
				<NavbarContent justify='center'>
					<NavbarContent className='sm:ml-10 gap-0' justify='center'>
						<SearchBar />
					</NavbarContent>
				</NavbarContent>
				<NavbarContent justify="end">
					{menuItems.map((item, index) => (
						<NavbarItem className="hidden lg:flex" key={index} isActive={pathname === item.label} as={Link} href={item.label}>
							{item.name}
						</NavbarItem>
					))}
						<PopoverComponent/>
					<NavbarItem className="hidden sm:flex ">
						{userSession === undefined
							? (
								<Button isLoading color="success" isDisabled variant="flat" />
							)
							: userSession !== null
								? (
									<Button
										as={Link}
										href={'#'}
										variant="flat"
										color="danger"
										onClick={logOut}
									>
                  Logout
									</Button>
								)
								: (
									<Button
										as={Link}
										color="success"
										href={'/login'}
										variant="flat"
									>
                  Login
									</Button>
								)}
					</NavbarItem>
				</NavbarContent>

				<NavbarMenu className={style.menuNavBar}>
					{menuItems.map((item, index) => (
						<NavbarMenuItem key={`${item.name}-${index}`} className="pt-10">
							<Link
								className={
									pathname === `${item.label}`
										? style.selectedItem
										: style.notSelectedItem
								}
								href={`${item.label}`}
							>
								{item.name}
							</Link>
						</NavbarMenuItem>
					))}
					<NavbarMenuItem className="pt-10 ">
						{userSession === undefined
							? (
								<Button isLoading color="success" isDisabled variant="flat" />
							)
							: userSession !== null
								? (
									<Button
										as={Link}
										href={'#'}
										variant="flat"
										color="danger"
										onClick={logOut}
									>
                Logout
									</Button>
								)
								: (
									<Button as={Link} color="success" href={'/login'} variant="flat">
                Login
									</Button>
								)}
					</NavbarMenuItem>
				</NavbarMenu>
			</Navbar>
		</>
	)
}

export default NavBar
