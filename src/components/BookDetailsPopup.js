import { useState } from "react";
import PropTypes from "prop-types";

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

BookDetailsPopup.prototype = {
  book: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookDetailsPopup;
