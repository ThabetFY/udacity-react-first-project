import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Bookshelf from "../components/Bookshelf";

const shelfs = [
  { name: "Currently Reading", id: "currentlyReading" },
  { name: "Want to Read", id: "wantToRead" },
  { name: "Read", id: "read" },
];

const ListBooksPage = ({ books, onChangeShelf }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelfs.map((shelf) => (
            <Bookshelf
              key={shelf.id}
              title={shelf.name}
              books={books.filter((book) => book.shelf === shelf.id)}
              onChangeShelf={onChangeShelf}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

ListBooksPage.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};
export default ListBooksPage;
