import { MyContext } from "../App"
import { useContext } from 'react'
import { useState } from 'react'

export default function Header(){
    const {category, setCategory} = useContext(MyContext)
    const [searchInput, setSearchInput] = useState('');

    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>){
        e.preventDefault()
        setCategory(searchInput)
        console.log(category)
    }

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        setSearchInput(e.target.value);
    }

    return(
        <div className="header-container">
            <h1 className="header-text">Keep Up To Date With The Latest News.</h1>
            <h1 className="text-xl font-semibold italic mt-3">{category.toUpperCase()} NEWS </h1>
            <form onSubmit={handleSubmit}>
                <input className="search-bar" type="text" value={searchInput} onChange={handleInput} />
                <button className="search-btn" type="submit">Search</button>
            </form>
            
        </div>
    )
}