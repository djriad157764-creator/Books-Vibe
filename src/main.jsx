import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout/RootLayout";
import { RouterProvider } from "react-router/dom";
import Banner from "./page/Banner/Banner";
import ListedBooks from "./page/ListedBooks/ListedBooks";
import PageToRead from "./page/PageToRead/PageToRead";
import HomePage from "./page/Home/HomePage";


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'listed', Component: ListedBooks },
      { path: 'read', Component:PageToRead}

    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
