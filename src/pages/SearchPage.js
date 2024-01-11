import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksAPI from "../utils/BooksAPI";
import Book from "../components/Book";

const SearchPage = ({ onChangeShelf }) => {
  const [query, setQuery] = useState("");
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [noBooksFound, setNoBooksFound] = useState(false);

  const updateQuery = (query) => {
    setQuery(query);
    if (query === "") {
      setNoBooksFound(false);
      return;
    }
  };

  const handleSearch = useCallback(async (query) => {
    try {
      const booksInShelves = await BooksAPI.getAll();

      if (!query) {
        setDisplayedBooks([]);
        return;
      }
      const searchReturnedBooks = await BooksAPI.search(query);

      if (!searchReturnedBooks) {
        console.log("not started searching");
        setDisplayedBooks(booksInShelves);
        return;
      }

      if (searchReturnedBooks.error === "empty query") {
        console.log("empty query");
        setNoBooksFound(true);
        return;
      }
      setNoBooksFound(false);

      searchReturnedBooks.forEach((searchBook) => {
        const bookFound = booksInShelves.find(
          (book) => book.id === searchBook.id
        );

        if (bookFound) {
          searchBook.shelf = bookFound.shelf;
        } else {
          searchBook.shelf = "none";
        }

        if (!searchBook.imageLinks) {
          searchBook.imageLinks = {
            thumbnail: "",
          };
        }
      });

      setDisplayedBooks(searchReturnedBooks);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const Timer = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(Timer);
  }, [query, handleSearch]);

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
          {noBooksFound ? (
            <p>No books found</p>
          ) : (
            displayedBooks.map((book) => (
              <Book key={book.id} book={book} onChangeShelf={onChangeShelf} />
            ))
          )}
        </ol>
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};
export default SearchPage;
