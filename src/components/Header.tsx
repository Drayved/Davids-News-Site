import { MyContext } from "../App"
import { useContext } from 'react'

export default function Header(){
    const {category} = useContext(MyContext)
    return(
        <div className="header-container">
            <h1 className="header-text">Keep Up To Date With The Latest News.</h1>
            <h1 className="text-xl font-semibold italic mt-3">{category.toUpperCase()} NEWS </h1>
        </div>
    )
}