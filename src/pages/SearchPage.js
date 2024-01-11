import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksAPI from "../utils/BooksAPI";
import Book from "../components/Book";
import debounce from "lodash.debounce";

const SearchPage = ({ books, onChangeShelf }) => {
  const [query, setQuery] = useState("");
  const [searchedBooks, setSearchedBooks] = useState(undefined);

  const updateQuery = (query) => {
    setQuery(query);
    handleDebouncedSearch(query);
  };
  const handleDebouncedSearch = useCallback(
    debounce(async (query) => {
      try {
        const results = await BooksAPI.search(query);
        // console.log(results);

        if (!results || results.error === "empty query") {
          setSearchedBooks(undefined);
          return;
        }

        setSearchedBooks(results);
      } catch (error) {
        console.error(error);
      }
    }, 300),
    []
  );

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

SearchPage.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};
export default SearchPage;
