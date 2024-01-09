import React from "react";
import Book from "./Book";

const Bookshelf = ({ title, books }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book
              key={book.id}
              title={book.title}
              authors={book.authors}
              bookCover={book.bookCover}
              shelf={book.shelf}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Bookshelf;
