'use client'
import SearchBar from './searchBar/SearchBar'
import Menu from './menu/Menu'
import style from './navbar.module.css'
import Image from 'next/image'
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@nextui-org/react'
import Link from 'next/link'
import { useUserSession } from '@/app/userContext'

const NavBar = (): React.JSX.Element => {
	const { userSession } = useUserSession()
	const menuItems = [
		'Productos',
		'Informacion',
		userSession ? 'Cerrar sesión' : 'Iniciar sesión'
	]
	return (
		<Navbar>
			<NavbarContent>
				<NavbarBrand>
					<Link href='/'>Alma Cannabica</Link>
				</NavbarBrand>
				<NavbarMenu>
					<NavbarMenuToggle />
					<NavbarContent>
						<NavbarItem>
							<SearchBar />
						</NavbarItem>
						<NavbarItem>
							<Menu items={menuItems} />
						</NavbarItem>
					</NavbarContent>
				</NavbarMenu>
			</NavbarContent>
			<NavbarContent>
				<NavbarItem>
					<Register />
				</NavbarItem>
				<NavbarItem>
					<Login />
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	)
}

export default NavBar
