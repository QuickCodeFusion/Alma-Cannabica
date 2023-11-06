'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarItem, Link, Button } from "@nextui-org/react";
import SearchBar from './searchBar/SearchBar'
import style from './navbar.module.css'
import Image from 'next/image'

import { useState } from 'react'
import Cart from '../cart/Cart'

import { useUserSession } from '@/app/userContext'

const NavBar = (): JSX.Element => {
	const [openCart, setOpenCart] = useState(false)
	const { userSession, logOut } = useUserSession()
	const menuItems = [
		"Profile",
		"Dashboard",
		"Activity",
		"Analytics",
		"System",
		"Deployments",
		"My Settings",
		"Team Settings",
		"Help & Feedback",
		"Log Out",
	];

	return (
		<div>
		<Navbar disableAnimation isBordered className={style.NavbarNext}>
			<NavbarContent className="sm:hidden z-1" justify="start">
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarContent className="sm:hidden pr-10 mr-8" justify="center">
				<NavbarBrand>
					<Image src="/logo.png" width={50} height={50} alt="" />
				</NavbarBrand>
			</NavbarContent>
			<div className={style.containerNavBar}>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarBrand>
					<Image src="/logo.png" width={50} height={50} alt="" />

				</NavbarBrand>
			</NavbarContent>
			<div className={style.searchBar}>
				<SearchBar />
			</div>
			<NavbarContent justify="end" >
				<NavbarItem className="hidden sm:flex">
					<Link style={{color: "black"}} href="#">
						Productos
					</Link>
				</NavbarItem>
				<NavbarItem className="hidden sm:flex">
					<Link style={{color: "black"}} href="#">
						Información
					</Link>
				</NavbarItem>
				<NavbarItem className="hidden sm:flex">
					<Link  href="#">
						<Button size="sm" isIconOnly className="bg-white border"  onClick={() => { setOpenCart(!openCart) }}>
							<Image src="/carrito.png" alt="" width={18} height={18}/>
						</Button>
					</Link>
				</NavbarItem>
				<NavbarItem>
				{userSession
					? <Button as={Link}  href="#" variant="flat" color='danger' onClick={logOut}>
					Logout
					</Button>
					: <Button as={Link} color="success" href="#" variant="flat">
                        Login
					</Button>}
				</NavbarItem>
			</NavbarContent>
			</div>
			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							className="w-full"
							color={
								index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
							}
							href="#"
							size="lg"
						>
							{item}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
		<div className={openCart ? style.cart : style.pepe}>
				{
					<Cart />
				}
			</div>
		</div>
	);
}

export default NavBar
