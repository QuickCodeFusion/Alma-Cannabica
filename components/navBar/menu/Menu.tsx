'use client'
import { useState } from "react"
import MenuOpen from "./menuOpen/MenuOpen"
import style from "./menu.module.css"

const Menu = () => {
    const [menu, setMenu] = useState(false)

    const handleClick = () => {
        setMenu(!menu)
    }

    return(
        <div>
            <div className={style.menu}>
                <button onClick={handleClick}>Menu</button>
                {menu && <MenuOpen />}
            </div>
        </div>
    )
}

export default Menu
