'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarItem, Button } from "@nextui-org/react";
import SearchBar from './SearchBar/SearchBar'
import style from './navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Cart from '../cart/Cart'

import { useUserSession } from '@/app/userContext'

const NavBar = (): JSX.Element => {
	const [openCart, setOpenCart] = useState(false)
	const { userSession, logOut } = useUserSession()
	const [selectedMenuItem, setSelectedMenuItem] = useState("");
	console.log(selectedMenuItem);


	const handleMenuItemClick = (select: string) => {
		setSelectedMenuItem(select);
	};
	const menuItems = [
		{name:"Inicio", label:"/"},
		{name:"Productos", label:"products"},
		{name:"Informacion", label:"info"},
	];

	return (
		<div>
			<Navbar disableAnimation isBordered className={style.NavbarNext}>
				<NavbarContent className="sm:hidden z-10" justify="start">
					<NavbarMenuToggle />
				</NavbarContent>

				<NavbarContent className="sm:hidden pr-10 mr-8" justify="center">
					<NavbarBrand>
						<Link onClick={() => handleMenuItemClick("")} href={'/'}>
							<Image src="/logo.png" width={50} height={50} alt="" />
						</Link>
					</NavbarBrand>
				</NavbarContent>
				<div className={style.containerNavBar}>
					<NavbarContent className="hidden sm:flex gap-4" justify="center">
						<NavbarBrand>
							<Link onClick={() => handleMenuItemClick("")} href={'/'}>
								<Image src="/logo.png" width={50} height={50} alt="" />
							</Link>


						</NavbarBrand>
					</NavbarContent>
					<div className={style.searchBar}>
						<SearchBar />
					</div>
					<NavbarContent justify="end" >
						<NavbarItem className="hidden sm:flex">
							<Link onClick={() => handleMenuItemClick("products")} className={selectedMenuItem === "products" ? style.selected : style.notSelected} href={"/products"}>
								Productos
							</Link>
						</NavbarItem>
						<NavbarItem className="hidden sm:flex">
							<Link onClick={() => handleMenuItemClick("products")} className={selectedMenuItem === "info" ? style.selected : style.notSelected}  href={"#"}>
								Información
							</Link>
						</NavbarItem>
						<NavbarItem className="hidden sm:flex">

							<Button size="sm" isIconOnly className="bg-white border" onClick={() => { setOpenCart(!openCart) }}>
								<Image src="/carrito.png" alt="" width={18} height={18} />
							</Button>

						</NavbarItem>
						<NavbarItem>
							{userSession
								? <Button as={Link} href={"#"} variant="flat" color='danger' onClick={logOut}>
									Logout
								</Button>
								: <Button as={Link} color="success" href="#" variant="flat">
									Login
								</Button>}
						</NavbarItem>
					</NavbarContent>
				</div>
				<NavbarMenu className={style.menuNavBar}>
					{menuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								className={selectedMenuItem === item.label ? style.selectedItem : style.notSelectedItem}
								onClick={() => handleMenuItemClick(item.label)}
								href={`/${item.label}`}

							>
								{item.name}
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
