'use client'
import { style } from './searchBar.module.css'

const SearchBar = () => {
    
    return (
        <div>
            <input type="text" onChange={(e) => console.log(e.target.value)} className={style.input}/>
            <button>Search</button>
        </div>
    )
}

export default SearchBar