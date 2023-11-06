'use client'
import style from './SearchBar.module.css'
import Image from 'next/image';

const SearchBar = () => {

    return (
        <div className={style.searchBar}>
            <div>
                <input type="text" onChange={(e) => console.log(e.target.value)} className={style.input} />
            </div>
            <div className={style.button}>
                <Image src="/buscar.png" alt="Buscar" width={20} height={20}></Image>
            </div>
        </div>
    )
}

export default SearchBar;