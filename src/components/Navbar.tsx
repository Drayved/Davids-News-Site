import { useState, useEffect } from "react"
const navItems = [
    'World',
    'US News',
    'Sports',
    'Health',
    'Politics',
    'Entertainment',
    'Science',
    'Climate',
  ];

export default function Navbar(){
const [showMenu, setShowMenu] = useState<Boolean>(false);

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };



  return (
    <div className="navbar-container">
      {/* Nav items for bigger screens */}
      <ul className={`navbar-elements`}>
        {navItems.map((item) => (
          <li key={item}>{item}</li>
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
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}