import { Link } from "react-router-dom";
import Book from "../components/Book";
import { useEffect, useState } from "react";
import * as BooksAPI from "../utils/BooksAPI";

const SearchPage = ({ books, onChangeShelf }) => {
  const [query, setQuery] = useState("");
  const [searchedBooks, setSearchedBooks] = useState(undefined);

  const updateQuery = (query) => {
    setQuery(query);
  };

  useEffect(() => {
    let unmounted = false;

    const searchBooks = async () => {
      if (!query) return;

      try {
        const results = await BooksAPI.search(query);

        if (!results || results.error === "empty query") {
          return;
        }

        const updatedResults = results.map((resultBook) => {
          if (resultBook.imageLinks === undefined) {
            resultBook.imageLinks = {
              thumbnail: "",
            };
          }
          const match = books.find((book) => book.id === resultBook.id);
          if (!match) {
            return { ...resultBook, shelf: "none" };
          }
          return resultBook;
        });

        setSearchedBooks(updatedResults);
      } catch (error) {
        console.error(error);
      }
    };

    if (!unmounted) {
      searchBooks();
    }

    return () => {
      unmounted = true;
    };
  }, [query, books]);

  const displayedBooks = searchedBooks || books;

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {displayedBooks.map((book) => (
            <Book key={book.id} book={book} onChangeShelf={onChangeShelf} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
