import { Link } from "react-router-dom";
import Bookshelf from "../components/Bookshelf";
import { useState } from "react";

const shelfs = [
  { name: "Currently Reading", id: "currentlyReading" },
  { name: "Want to Read", id: "wantToRead" },
  { name: "Read", id: "read" },
];

const dummyBooks = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    authors: "Harper Lee",
    bookCover:
      'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")',
    shelf: "currentlyReading",
  },
  {
    id: 2,
    title: "Ender's Game",
    authors: "Orson Scott Card",
    bookCover:
      'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")',
    shelf: "wantToRead",
  },
  {
    id: 3,
    title: "The Adventures of Tom Sawyer",
    authors: "Mark Twain",
    bookCover:
      'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")',
    shelf: "read",
  },
];
const ListBooksPage = () => {
  const [books, setBooks] = useState(dummyBooks);

  const changeShelf = (updatedShelf, title) => {
    setBooks((books) =>
      books.map((book) =>
        book.title === title ? { ...book, shelf: updatedShelf } : book
      )
    );
  };

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
              changeShelf={changeShelf}
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

export default ListBooksPage;
