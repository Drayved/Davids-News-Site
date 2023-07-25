import Navbar from "./Navbar";

import GetNews from "./GetNews"

import { useParams } from "react-router-dom";


export default function Layout() {
  const { category, subCategory } = useParams(); // Get the category and subCategory from URL params
  console.log("Category from URL:", category);
  console.log("Subcategory from URL:", subCategory);
  return (
    <div>
      <Navbar />
      <GetNews />
    </div>
  );
}

