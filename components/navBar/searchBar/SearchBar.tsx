'use client'
import style from './searchBar.module.css'
import Image from 'next/image';

const SearchBar = () => {
    
    return (
        <div className={style.searchBar}>
            <input type="text" onChange={(e) => console.log(e.target.value)} className={style.input}/>
            <Image src="/buscar.png" alt="Buscar" width={20} height={20}></Image>
        </div>
    )
}

export default SearchBar;