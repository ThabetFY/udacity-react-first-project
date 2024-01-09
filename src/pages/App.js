import "../css/App.css";
import SearchPage from "./SearchPage";
import ListBooksPage from "./ListBooksPage";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import * as BooksAPI from "../utils/BooksAPI";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      const result = await BooksAPI.getAll();
      setBooks(result);
    };

    getContacts();
  }, []);
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<ListBooksPage books={books} />} />
        <Route path="/search" element={<SearchPage books={books} />} />
      </Routes>
    </div>
  );
}

export default App;
