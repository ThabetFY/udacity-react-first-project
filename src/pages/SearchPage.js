import { Link } from "react-router-dom";
import Book from "../components/Book";

const SearchPage = ({ books }) => {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title, author, or ISBN" />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((book) => (
            <Book
              key={book.id}
              title={book.title}
              authors={book.authors}
              bookCover={book.imageLinks.thumbnail}
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
