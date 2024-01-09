import "./App.css";
import SearchPage from "./pages/SearchPage";
import ListBooksPage from "./pages/ListBooksPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<ListBooksPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
