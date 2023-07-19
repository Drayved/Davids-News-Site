import Layout from "./components/Layout";
import { useEffect, useState, createContext } from "react";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromChildren, Outlet } from "react-router-dom";
import GetNews from "./components/GetNews";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path={"/"} element={<Layout />}>
        {/* Define your nested routes here */}
        <Route path="/world" element={<GetNews />} /> {/* Render GetNews for each category */}
        <Route path="/us-news" element={<GetNews />} />
        <Route path="/sports" element={<GetNews />} />
        {/* Add more routes for each category and sub-category */}
        <Route path="/politics/:subCategory" element={<GetNews />} />
        <Route path="/health" element={<GetNews />} />
        <Route path="/entertainment" element={<GetNews />} />
        <Route path="/science" element={<GetNews />} />
        <Route path="/climate" element={<GetNews />} />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
        <Outlet />
      
    </div>
  );
}
