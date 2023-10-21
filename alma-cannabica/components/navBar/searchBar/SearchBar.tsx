'use client'

const SearchBar = () => {
    
    return (
        <div>
            <input type="text" onChange={(e) => console.log(e.target.value)}/>
            <button>Search</button>
        </div>
    )
}

export default SearchBar