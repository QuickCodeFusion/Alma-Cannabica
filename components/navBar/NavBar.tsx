"use client";
import SearchBar from "./searchBar/SearchBar";
import Menu from "./menu/Menu";
import style from "./navbar.module.css";

const NavBar = () => {
	return (
		<div className={style.navbar}>
			<div>
				<h1>Alma Cannabica</h1>
			</div>
			<div>
				<SearchBar/>
			</div>
			<div className={style.menu}>
				<Menu/>
			</div>
		</div>
	);
};

export default NavBar;