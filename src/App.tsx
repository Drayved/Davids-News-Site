import Layout from "./components/Layout";
import { createContext, useState } from "react"
import { createBrowserRouter, RouterProvider, Route, createRoutesFromChildren, Outlet } from "react-router-dom";
import GetNews from "./components/GetNews";


export const MyContext = createContext({
  category: "", 
  setCategory: (_: string) => {},
  subCategory: "", 
  setSubCategory: (_: string) => {}
});

export default function App() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path={"/"} element={<Layout />}>
       <Route path="/world" element={<GetNews  />} /> {/* Render GetNews for each category */}
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
    <MyContext.Provider value={{ category, setCategory, subCategory, setSubCategory }}>
      <div>
        <RouterProvider router={router} />
        <Outlet />
      </div>
    </MyContext.Provider>
  );
}
