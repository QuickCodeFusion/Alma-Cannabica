"use client";
import style from "./menuOpen.module.css";

const MenuOpen = () => {

	return(
		<div>
			<div className={style.menu}>
				<h1>Alma Cannabica</h1>
				<p>Login</p>
				<p>Register</p>
				<p>Compras</p>
				<p>Historial</p>
				<p>Perfil</p>
				<p>About</p>
			</div>
		</div>
	);
};

export default MenuOpen;