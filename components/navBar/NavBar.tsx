"use client";
import SearchBar from "./searchBar/SearchBar";
import Menu from "./menu/Menu";
import style from "./navbar.module.css";
import Image from "next/image";

const NavBar = () => {
    return (
        <div className={style.navbar}>
            <div>
                <Image src="/logo.png" alt="Logo" width={55} height={40}></Image>
            </div>
            <div className={style.searchBar}>
                <SearchBar/>
            </div>
            <div className={style.buttons}>
                <button>Productos</button>
                <button>Informacion</button>
                <button>Login</button>
            <div className={style.menu}>
                <Menu/>
            </div>
            </div>

        </div>
    )
}

export default NavBar;