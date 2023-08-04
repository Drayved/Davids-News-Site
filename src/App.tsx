import Layout from "./components/Layout";
import { createContext, useState, useEffect } from "react"
import { createBrowserRouter, RouterProvider, Route, createRoutesFromChildren, Outlet } from "react-router-dom";
import GetNews from "./components/GetNews";


export const MyContext = createContext({
  category: "", 
  setCategory: (_: string) => {},
  subCategory: "", 
  setSubCategory: (_: string) => {},
  sortBy: "publishedAt",
  setSortBy: (_: string) => {}
});

export default function App() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("general");
  const [sortBy, setSortBy] = useState(() => {
    // Get the initial sortBy value from localStorage, or default to "publishedAt"
    const savedSortBy = window.localStorage.getItem("sortBy");
    return savedSortBy || "publishedAt";
  })

  useEffect(() => {
    const storedCategory = window.localStorage.getItem('category')
    const storedSubCategory = window.localStorage.getItem('subCategory')
    if (storedCategory !== null && storedCategory !== "") {
      setCategory(storedCategory);
    }
    if (storedSubCategory !== null && storedSubCategory !== "") {
      setSubCategory(storedSubCategory);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('category', category);
    window.localStorage.setItem('subCategory', subCategory);
  }, [category, subCategory]);

  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path={"/"} element={<Layout />}>
        <Route path="/us-news" element={<GetNews />} />
        <Route path="/sports" element={<GetNews />} />
        {/* Add more routes for each category and sub-category */}
        <Route path="/politics/:subCategory" element={<GetNews />} />
        <Route path="/health" element={<GetNews />} />
        <Route path="/entertainment" element={<GetNews  />} />
        <Route path="/science" element={<GetNews />} />
        <Route path="/climate" element={<GetNews />} />
        <Route path="/tech" element={<GetNews />} />
      </Route>
    )
  );

  return (
    <MyContext.Provider value={{ category, setCategory, subCategory, setSubCategory, sortBy, setSortBy }}>
      <div>
        <RouterProvider router={router} />
        <Outlet />
      </div>
    </MyContext.Provider>
  );
}
