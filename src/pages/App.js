import "../css/App.css";
import SearchPage from "./SearchPage";
import ListBooksPage from "./ListBooksPage";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import * as BooksAPI from "../utils/BooksAPI";

function App() {
  const [books, setBooks] = useState([]);

  const ChangeShelfHanlder = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(() => {
      setBooks([...books.filter((b) => b.id !== book.id), book]);
    });
    // console.log(bookID, shelf);
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
  }, []);

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
