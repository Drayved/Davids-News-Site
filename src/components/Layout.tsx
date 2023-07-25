import Navbar from "./Navbar";
import Header from "./Header";
import GetNews from "./GetNews"
import Landing from "./Landing";
import NewsCard from "./NewsCard";
import HealthNews from "./HealthNews";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";

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

