import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../App";

const navItems = [
  { name: "World", path: "/world" },
  { name: "US News", path: "/us-news" },
  { name: "Sports", path: "/sports" },
  { name: "Health", path: "/health" },
  { name: "Politics", path: "/politics", subCategories: ["conservative", "liberal", "independent"] },
  { name: "Entertainment", path: "/entertainment" },
  { name: "Science", path: "/science" },
  { name: "Climate", path: "/climate" },
];

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const { setCategory, setSubCategory } = useContext(MyContext);

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
    console.log('Toggle Menu clicked');
  };

  const handleCategoryClick = (category: string) => {
    setCategory(category);
    setSubCategory(""); 
    setShowMenu(false); 
  };

  const handleSubCategoryClick = (subCategory: string) => {
    setCategory(subCategory)
    
    setShowMenu(false); 
  };

  return (
    <div className="navbar-container">
      <ul className={`navbar-elements`}>
        {navItems.map((item) => (
          <li key={item.name}>
            {item.subCategories ? (
              <div className="sub-categories">
                {/* Show the Politics button with the onClick to toggle subcategories */}
                <span onClick={toggleMenu}>{item.name}</span>
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

      {/* Menu button for smaller screens */}
      <div className="menu-button hide-on-big-screen" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Dropdown menu for smaller screens */}
      {showMenu && window.innerWidth < 1000 && (
        <ul className="navbar-elements-dropdown">
          {navItems.map((item) => (
            <li className="li-elements" key={item.name}>
             {item.subCategories ? (
              <div className="sub-categories">
                {/* Show the Politics button with the onClick to toggle subcategories */}
                <span onClick={toggleMenu}>{item.name}</span>
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
      )}
    </div>
  );
}
