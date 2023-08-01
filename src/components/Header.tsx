import { MyContext } from "../App";
import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";


export default function Header() {
  const { category, setCategory, subCategory, setSortBy, sortBy } = useContext(MyContext);
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setCategory(searchInput);
    console.log(category);
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearchInput(e.target.value);
  }

  function handleSortingOption(e: React.ChangeEvent<HTMLSelectElement>) {
    const sortByValue = e.target.value;
    setSortBy(sortByValue);

    // Update the URL query parameter for 'sortBy'
    setSearchParams({ sortBy: sortByValue });
  }

 

  return (
    <div className="header-container">
      <h1 className="header-text">Keep Up To Date With The Latest News.</h1>
      <h1 className="text-xl font-semibold italic mt-3">
        {subCategory ? subCategory.toUpperCase() : category.toUpperCase()} NEWS{" "}
      </h1>
      <form onSubmit={handleSubmit} className="search-container">
        <input className="search-bar" type="text" value={searchInput} onChange={handleInput} />
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
  );
}
