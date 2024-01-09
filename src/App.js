import "./App.css";
import { useState } from "react";
import SearchPage from "./pages/SearchPage";
import ListBooksPage from "./pages/ListBooksPage";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchPage
          showSearchPage={showSearchPage}
          setShowSearchpage={setShowSearchpage}
        />
      ) : (
        <ListBooksPage
          showSearchPage={showSearchPage}
          setShowSearchpage={setShowSearchpage}
        />
      )}
    </div>
  );
}

export default App;
