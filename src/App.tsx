import Layout from "./components/Layout";

import { createBrowserRouter, RouterProvider, Route, createRoutesFromChildren, Outlet } from "react-router-dom";
import GetNews from "./components/GetNews";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path={"/"} element={<Layout />}>
       <Route path="/world" element={<GetNews category="world" />} /> {/* Render GetNews for each category */}
        <Route path="/us-news" element={<GetNews category="us-news" />} />
        <Route path="/sports" element={<GetNews category="sports" />} />
        {/* Add more routes for each category and sub-category */}
        <Route path="/politics/:subCategory" element={<GetNews />} />
        <Route path="/health" element={<GetNews category="health" />} />
        <Route path="/entertainment" element={<GetNews category="entertainment" />} />
        <Route path="/science" element={<GetNews category="science" />} />
        <Route path="/climate" element={<GetNews category="climate" />} />
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
