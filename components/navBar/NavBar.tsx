'use client'
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarMenuToggle,
	NavbarMenuItem,
	NavbarMenu,
	NavbarItem,
	Button
} from '@nextui-org/react'
import SearchBar from './SearchBar/SearchBar'
import style from './navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useUserSession } from '@/app/userContext'
import { PopoverComponent } from './Popover/Popover'
import { usePathname } from 'next/navigation'

const NavBar = (): JSX.Element => {
	const { userSession, logOut } = useUserSession()
	const pathname = usePathname()

	const menuItems = [
		{ name: 'Inicio', label: '/' },
		{ name: 'Productos', label: 'products' },
		{ name: 'Informacion', label: 'info' }
	]

	return (
		<div>
			<Navbar disableAnimation isBordered className={style.NavbarNext}>
				<NavbarContent className="lg:hidden z-10 " justify="start">
					<NavbarMenuToggle style={{ color: '#18C964' }} />
				</NavbarContent>

				<NavbarContent className="lg:hidden" justify="center">
					<NavbarBrand>
						<Link
							href={'/'}
						>
							<Image src="/logo.png" width={50} height={50} alt="" />
						</Link>
					</NavbarBrand>
				</NavbarContent>
				<div className={style.containerNavBar}>
					<NavbarContent className="hidden lg:flex gap-5" justify="center">
						<NavbarBrand>
							<Link
								href={'/'}
							>
								<Image src="/logo.png" width={50} height={50} alt="" />
							</Link>
						</NavbarBrand>
					</NavbarContent>
					<NavbarContent className={`z-10 ${style.searchBar}`}>
						<SearchBar />
					</NavbarContent>
					<NavbarContent justify="end" >
						<NavbarItem className="hidden lg:flex">
							<Link className={pathname === '/products' ? style.selected : style.notSelected} href={'/products'}>
								Productos
							</Link>
						</NavbarItem>
						<NavbarItem className="hidden lg:flex">
							<Link className={pathname === '/info' ? style.selected : style.notSelected} href={'/info'}>
								Información
							</Link>
						</NavbarItem>
						{userSession?.claims.admin
							? <NavbarItem className="hidden lg:flex">
								<Link className={pathname === '/admin-dashboard' ? style.selected : style.notSelected} href={'/admin-dashboard'}>
								Panel de administrador
								</Link>
							</NavbarItem>
							: null}
						<NavbarItem className="lg:hidden z-10 pr-10 mr-9">
							<PopoverComponent/>
						</NavbarItem>
						<NavbarItem className="hidden lg:flex">
							<PopoverComponent/>
						</NavbarItem>
						<NavbarItem className="hidden lg:flex">
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
				</div>
				<NavbarMenu className={style.menuNavBar}>
					{menuItems.map((item, index) => (
						<NavbarMenuItem key={`${item.name}-${index}`} className="pt-10">
							<Link
								className={
									pathname === `/${item.label}`
										? style.selectedItem
										: style.notSelectedItem
								}
								href={`/${item.label}`}
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
		</div>
	)
}

export default NavBar
