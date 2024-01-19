import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [informations, setInformations] = useState({});

  const [genreId, setGenreId] = useState();
  const [genres, setGenres] = useState([]);
  const [newPage, setNewPage] = useState(1);
  const [searchResultStorage, setSearchResultStorage] = useState({});
  const [inputKeyWord, setInputKeyWord] = useState("hello");
  const [totalPageSearchResult, setTotalPageSearchResult] = useState();

  const [isClickThumbnail, setIsClickThumbnail] = useState(false);
  const [maxTotalPageMovies, setMaxTotalPageMovies] = useState();
  const [maxTotalPageTrending, setMaxTotalPageTrending] = useState();
  const [maxTotalPageSearch, setMaxTotalPageSearch] = useState();
  const [moviesGenre, setMoviesGenre] = useState([]);

  // lấy ra toàn bộ phim theo trang
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=${newPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setInformations(data.results);
        setMaxTotalPageTrending(data.total_pages);
      });
  }, [newPage]);

  // lấy ra thể loại phim
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setGenres(data.genres));
  }, []);

  //lấy ra bộ phim đúng với danh sách thể loại
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=e9e9d8da18ae29fc430845952232787c&page=${newPage}&with_genres=${genreId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMoviesGenre(data.results);
        setMaxTotalPageMovies(data.total_pages);
      });
  }, [genreId, newPage]);

  // lay ra danh sach phim theo ket qua tim kiem
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=2edf9f02e088272f6ff2eab6bf5fa21a&language=en-US&query=${inputKeyWord}&page=${newPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTotalPageSearchResult(data.total_pages);
        setMaxTotalPageSearch(data.total_pages);
        setSearchResultStorage(data.results);
      });
  }, [inputKeyWord, newPage]);

  return (
    <AppContext.Provider
      value={{
        informations,

        genres,
        setNewPage,
        newPage,
        searchResultStorage,
        totalPageSearchResult,
        setInputKeyWord,
        inputKeyWord,
        isClickThumbnail,
        setIsClickThumbnail,
        maxTotalPageMovies,
        maxTotalPageSearch,
        maxTotalPageTrending,
        setGenreId,
        moviesGenre,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
