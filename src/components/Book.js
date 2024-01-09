import { useState } from "react";

const Book = ({ title, authors, bookCover, shelf }) => {
  const [selectShelf, setSelectShelf] = useState(shelf);

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: bookCover,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={selectShelf}
              onChange={(event) => {
                setSelectShelf(event.target.value);
              }}
            >
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    </li>
  );
};

export default Book;
