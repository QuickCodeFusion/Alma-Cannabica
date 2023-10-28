'use client'
import SearchBar from './searchBar/SearchBar'
// import Menu from './menu/Menu'
import style from './navbar.module.css'
import Image from 'next/image'
import { Button } from '@nextui-org/react'
import { useState } from 'react'
import Cart from '../cart/Cart'

const NavBar = (): JSX.Element => {
	const [openCart, setOpenCart] = useState(false)

	return (
		<div className={style.navbar}>
			<div>
				<Image src="/logo.png" alt="Logo" width={70} height={70} className={style.logo}></Image>
			</div>
			<div className={style.searchBar}>
				<SearchBar />
			</div>
			<div className={style.buttons}>
				<button >Productos</button>
				<button>Informacion</button>
				<Button size="sm" isIconOnly className="bg-white border" onClick={() => { setOpenCart(!openCart) }}>
					<Image src="/carrito.png" alt="Perfil" width={20} height={20}></Image>
				</Button>
				<Button color="success">
                        Login
				</Button>
			</div>

			<div className={openCart ? style.cart : style.pepe}>
				{
					<Cart />
				}
			</div>

		</div>
	)
}

export default NavBar
