import Navbar from "./Navbar";
import Header from "./Header";
import GetNews from "./GetNews"

import { useParams } from "react-router-dom";


export default function Layout() {
  const { category, subCategory } = useParams(); // Get the category and subCategory from URL params
  console.log("Category from URL:", category);
  console.log("Subcategory from URL:", subCategory);
  return (
    <div className="layout">
      <Navbar />
      <Header />
      <div className="content">
        <GetNews />
      </div>
      <footer className="footer">
        <p>&copy; 2023 Your News Site. All rights reserved.</p>
      </footer>
    </div>
  );
}

