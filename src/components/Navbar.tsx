import React, { useState } from "react";
import { Link } from "react-router-dom";

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

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  return (
    <div className="navbar-container">
      <ul className={`navbar-elements`}>
        {navItems.map((item) => (
          <li key={item.name}>
            {/* Construct the URL with the category parameter */}
            {item.subCategories ? (
              <div>
                <span onClick={toggleMenu}>{item.name}</span>
                <ul className={`navbar-elements-dropdown ${showMenu ? "show" : ""}`}>
                  {item.subCategories.map((subCategory) => (
                    <li key={subCategory}>
                      <Link to={`${item.path}?category=${subCategory}`}>{subCategory}</Link>
                    </li>
                  ))}
                </ul>
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
      {showMenu && (
        <ul className="navbar-elements-dropdown">
          {navItems.map((item) => (
            <li key={item.name}>
              {/* Construct the URL with the category parameter */}
              {item.subCategories ? (
                <div>
                  <span onClick={toggleMenu}>{item.name}</span>
                  <ul className={`navbar-elements-dropdown ${showMenu ? "show" : ""}`}>
                    {item.subCategories.map((subCategory) => (
                      <li key={subCategory}>
                        <Link to={`${item.path}?category=${subCategory}`}>{subCategory}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link to={item.path}>{item.name}</Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
