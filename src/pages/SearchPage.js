import { Link } from "react-router-dom";
import Book from "../components/Book";
import { useEffect, useState } from "react";
import * as BooksAPI from "../utils/BooksAPI";

const SearchPage = ({ books }) => {
  const [query, setQuery] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);

  const updateQuery = (query) => {
    setQuery(query.trim());
  };

  useEffect(() => {
    let unmounted = false;

    const searchBooks = async () => {
      try {
        const results = await BooksAPI.search(query);

        const updatedResults = results.map((resultBook) => {
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
  }, [query]);

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
            <Book
              key={book.id}
              title={book.title}
              authors={book.authors}
              bookCover={book.imageLinks?.thumbnail}
              shelf={book.shelf}
              changeShelf={() => {}}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
