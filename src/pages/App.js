import "../css/App.css";
import SearchPage from "./SearchPage";
import ListBooksPage from "./ListBooksPage";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import * as BooksAPI from "../utils/BooksAPI";

function App() {
  const [books, setBooks] = useState([]);

  const ChangeShelfHanlder = (bookID, shelf) => {
    setBooks((books) =>
      books.map((book) => {
        if (book.id === bookID) {
          book.shelf = shelf;
        }
        return book;
      })
    );
    console.log(bookID, shelf);
    BooksAPI.update(bookID, shelf);
  };

  useEffect(() => {
    let unmounted = false;

    const getContacts = async () => {
      const result = await BooksAPI.getAll();
      setBooks(result);
    };

    if (!unmounted) {
      getContacts();
    }
    return () => {
      unmounted = true;
    };
  }, [books]);
  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ListBooksPage books={books} onChangeShelf={ChangeShelfHanlder} />
          }
        />
        <Route
          path="/search"
          element={
            <SearchPage books={books} onChangeShelf={ChangeShelfHanlder} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
