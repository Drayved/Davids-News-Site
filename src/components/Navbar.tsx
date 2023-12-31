import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { MyContext } from "../App"

const navItems = [
  { name: "General", path: "" },
  { name: "US News", path: "/us-news" },
  { name: "Sports", path: "/sports" },
  { name: "Health", path: "/health" },
  { name: "Tech", path: "/tech" },
  { name: "Politics", path: "/politics", subCategories: ["Conservative", "Liberal", "Independent"] },
  { name: "Science", path: "/science" },
  { name: "Climate", path: "/climate" },
]

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false)
  const { setCategory, setSubCategory } = useContext(MyContext)
  const [showSubMenu, setShowSubMenu] = useState(false)

  const closeAllMenusOnBigScreen = () => {
    setShowMenu(false)
    setShowSubMenu(false)
  }

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu)
    console.log('Toggle Menu clicked')
  }

  const handleCategoryClick = (category: string) => {
    setCategory(category)
    setSubCategory("") 
    setShowMenu(false) 
    scrollTo(0,0)
    window.localStorage.setItem('category', category)
  }

  const handleSubCategoryClick = (subCategory: string) => {
    setCategory(`politics`)
    setSubCategory(subCategory.toLowerCase())
    setShowMenu(false) 
    setShowSubMenu(false)
    scrollTo(0,0)
    window.localStorage.setItem('subCategory', subCategory)
  }

  const toggleSubMenu = () =>{
    setShowSubMenu((prevShowMenu) => !prevShowMenu)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 700) {
        closeAllMenusOnBigScreen()
      }
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="navbar-container">
      <ul className={`navbar-elements`}>
        {navItems.map((item) => (
          <li className={item.subCategories ? "sub-categories" : "li-elements"} key={item.name}>
            {item.subCategories ? (
              <div className="sub-categories">
                <span className="sub-cat" onClick={toggleMenu}>{item.name}</span>
                {showMenu && (
                  <ul className={`navbar-elements-dropdown `}>
                    {item.subCategories.map((subCategoryItem) => (
                      <li className="sub-list" key={subCategoryItem}>
                        <Link to={`${item.path}/${subCategoryItem}`} onClick={() => handleSubCategoryClick(subCategoryItem)}>
                          {subCategoryItem}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link to={item.path} onClick={() => handleCategoryClick(item.name)}>
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <div className="menu-button hide-on-big-screen" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {showMenu && window.innerWidth < 700 && (
        <ul className="navbar-elements-dropdown">
          {navItems.map((item) => (
            <li className="li-elements" key={item.name}>
             {item.subCategories ? (
              <div className="sub-categories">
                <span onClick={toggleSubMenu}>{item.name}</span>
                {showMenu && showSubMenu &&(
                  <ul className={`navbar-elements-dropdown sub-list-container`}>
                    {item.subCategories.map((subCategoryItem) => (
                      <li className="sub-list " key={subCategoryItem}>
                        <Link to={`${item.path}/${subCategoryItem}`} onClick={() => handleSubCategoryClick(subCategoryItem)}>
                          {subCategoryItem}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link to={item.path} onClick={() => handleCategoryClick(item.name)}>
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
      )}
    </div>
  )
}
