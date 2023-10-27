'use client'
import SearchBar from './searchBar/SearchBar'
import Menu from './menu/Menu'
import style from './navbar.module.css'
import Image from 'next/image'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

const NavBar = (): React.JSX.Element => {
	return (
		<div className={style.navbar}>
			<div>
				<Image src="/logo.png" alt="Logo" width={55} height={40}></Image>
			</div>
			<div className={style.searchBar}>
				<SearchBar />
			</div>
			<div className={style.buttons}>
				<button >Productos</button>
				<button>Informacion</button>
				<Button size="sm" isIconOnly className="bg-white border">
					<Image src="/carrito.png" alt="Perfil" width={20} height={20}></Image>
				</Button>
				<Button color="success">
					<Link href="/login">Iniciar sesión</Link>
				</Button>
				{/* <div className={style.menu}>
					<Menu />
				</div> */}
			</div>

		</div>
	)
}

export default NavBar
