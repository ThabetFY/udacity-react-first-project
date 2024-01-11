import { useState } from "react";
import PropTypes from "prop-types";
import BookDetailsPopup from "./BookDetailsPopup";

const Book = ({ book, onChangeShelf }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // The Dragging functionality is done with the help of AI(Pieces).

  const [isDragging, setIsDragging] = useState(false);
  const [isOver, setIsOver] = useState(false);

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", JSON.stringify(book));
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    const droppedBook = JSON.parse(e.dataTransfer.getData("text/plain"));
    onChangeShelf(droppedBook, book.shelf);
  };

  const opacity = isDragging ? 0.5 : 1;
  const backgroundColor = isOver ? "lightgray" : "white";

  return (
    <li
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{ opacity, backgroundColor }}
    >
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`,
            }}
            onClick={handlePopup}
          ></div>
          {isPopupOpen && (
            <BookDetailsPopup book={book} onClose={handlePopup} />
          )}
          <div className="book-shelf-changer">
            <select
              value={book.shelf}
              onChange={(event) => {
                onChangeShelf(book, event.target.value);
              }}
            >
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              {book.shelf !== "none" ? <option value="none">None</option> : ""}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};

export default Book;
