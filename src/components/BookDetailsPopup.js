import { useState } from "react";

const BookDetailsPopup = ({ book, onClose }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const description = showFullDescription
    ? book.description
    : book.description.trim().split(/\s+/).slice(0, 15).join(" ");

  return (
    <div className="popup">
      <div className="popup-close" onClick={onClose} />
      <h2 className="book-title">{book.title}</h2>
      <h3 className="book-authors">{book.authors}</h3>
      <p className="book-details">
        {description}
        {!showFullDescription && description !== book.description && (
          <span onClick={toggleDescription}> Read More</span>
        )}
      </p>
    </div>
  );
};

export default BookDetailsPopup;
