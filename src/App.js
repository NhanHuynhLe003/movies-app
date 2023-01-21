import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import MovieDetail from "./pages/MovieDetail";
import { AppProvider } from "./Context/AppContext";
import Movies from "./pages/Movies";
import SearchResult from "./pages/SearchResult";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <AppProvider>
              <Homepage key={"homepage"} />
            </AppProvider>
          }
        ></Route>
        <Route
          path="/:id"
          element={
            <AppProvider>
              <MovieDetail />
            </AppProvider>
          }
        ></Route>
        <Route
          path="/movies"
          element={
            <AppProvider>
              <Movies/>
            </AppProvider>
          }
        ></Route>
        <Route
          path="/search-result"
          element = {
            <AppProvider>
              <SearchResult/>
            </AppProvider>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
