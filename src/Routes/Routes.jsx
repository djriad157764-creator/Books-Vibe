import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import HomePage from "../page/Home/HomePage";
import ListedBooks from "../page/ListedBooks/ListedBooks";
import PageToRead from "../page/PageToRead/PageToRead";
import PageNotFound from "../page/PageNotFound/NotFoundPage";
import BooksDetails from "../page/BooksDetails/BooksDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,

    children: [
      { index: true, Component: HomePage },
      { path: "listed", Component: ListedBooks },
      { path: "read", Component: PageToRead },
      {
        path: "bookDetails/:id",
        loader: () => fetch("/booksData.json"),
        Component: BooksDetails,
      },
    ],
    errorElement: <PageNotFound></PageNotFound>,
  },
]);
