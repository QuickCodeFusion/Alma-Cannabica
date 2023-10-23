'use client'
import { useState } from "react"
import MenuOpen from "./menuOpen/MenuOpen"

const Menu = () => {
    const [menu, setMenu] = useState(false)

    const handleClick = () => {
        setMenu(!menu)
    }

    return(
        <div>
            <div>
                <button onClick={handleClick}> Menu</button>
                {menu && <MenuOpen/>}
            </div>
        </div>
    )
}

export default Menu