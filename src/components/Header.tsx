import { MyContext } from "../App"
import { useContext, useState } from "react"

export default function Header() {
  const { category, setCategory, subCategory, setSortBy, sortBy } = useContext(MyContext)
  const [searchInput, setSearchInput] = useState("")
  
  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    setCategory(searchInput)
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  function handleSortingOption(e: React.ChangeEvent<HTMLSelectElement>) {
    const sortByValue = e.target.value
    setSortBy(sortByValue)
  }

  const headerTitle = subCategory
  ? subCategory.toUpperCase()
  : category.toUpperCase()

  return (
    <div className="header-container">
      <h1 className="header-text">Keep Up To Date With The Latest News.</h1>
      <h1 className="header-title">
        {headerTitle !== "" ? headerTitle : "NEWS"}
      </h1>
      <form onSubmit={handleSubmit} className="search-container">
        <input placeholder="Search for news articles..." className="search-bar" type="text" value={searchInput} onChange={handleInput} />
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>
      <select className="sort-options" onChange={handleSortingOption} value={sortBy}>
        <option value="publishedAt">Newest</option>
        <option value="relevancy">Relevancy</option>
        <option value="popularity">Popular</option>
      </select>
    </div>
  )
}
