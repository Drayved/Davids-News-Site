import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import HealthNews from "./HealthNews";

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
  const { subCategory } = useParams(); // Get the subCategory from URL params

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
    console.log('Toggle Menu clicked');
  };


  

  const selectedNavItem = navItems.find((item) => {
    if (item.subCategories) {
      return item.subCategories.includes(subCategory ?? "");
    }
    return item.path === window.location.pathname;
  });

  const renderCategoryComponent = () => {
    if (selectedNavItem) {
      switch (selectedNavItem.name) {
        case "World":
          return <WorldNews />;
        case "US News":
          return <USNews />;
        case "Sports":
          return <SportsNews />;
        case "Health":
          return <HealthNews />;
        // Add other category components here
        default:
          return null;
      }
    }
    return null;
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
                        <Link to={`${item.path}/${subCategoryItem}`}>
                          {subCategoryItem}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link to={item.path}>{item.name}</Link>
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
      {showMenu && window.innerWidth < 750 && (
        <ul className="navbar-elements-dropdown">
          {navItems.map((item) => (
            <li key={item.name}>
              {/* Construct the URL with the category parameter */}
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      )}
      {renderCategoryComponent()}
    </div>
  );
}
