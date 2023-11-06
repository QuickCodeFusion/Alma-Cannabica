'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarItem, Link, Button } from "@nextui-org/react";

import style from './navbar.module.css'
import Image from 'next/image'

import { useState } from 'react'
import Cart from '../cart/Cart'

import { useUserSession } from '@/app/userContext'

const NavBar = (): JSX.Element => {
	const [openCart, setOpenCart] = useState(false)
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
			<NavbarContent className="sm:hidden" justify="start">
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarContent className="sm:hidden pr-3" justify="center">
				<NavbarBrand>
					<Image src="/logo.png" width={50} height={50} alt="" />
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarBrand>
					<Image src="/logo.png" width={50} height={50} alt="" />

				</NavbarBrand>
			</NavbarContent>

			<NavbarContent justify="end">
				<NavbarItem className="hidden sm:flex">
					<Link style={{color: "black"}} href="#">
						Productos
					</Link>
				</NavbarItem>
				<NavbarItem className="hidden sm:flex">
					<Link href="#" aria-current="page" color="warning">
						Información
					</Link>
				</NavbarItem>
				<NavbarItem className="hidden sm:flex">
					<Link  href="#">
						<Button size="sm" isIconOnly className="bg-white border" variant="bordered" onClick={() => { setOpenCart(!openCart) }}>
							<Image src="/carrito.png" alt="" width={18} height={18}/>
						</Button>
					</Link>
				</NavbarItem>
				<NavbarItem className="hidden sm:flex">
					<Link href="#" color="success">Login</Link>
				</NavbarItem>
				<NavbarItem>
					<Button as={Link} color="success" href="#" variant="flat">
						Sign Up
					</Button>
				</NavbarItem>
			</NavbarContent>

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
