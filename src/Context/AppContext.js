import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [informations, setInformations] = useState({});

  const [genreId, setGenreId] = useState();
  const [genres, setGenres] = useState([]);
  const [searchResultStorage, setSearchResultStorage] = useState({});
  const [inputKeyWord, setInputKeyWord] = useState("hello");
  const [totalPageSearchResult, setTotalPageSearchResult] = useState();

  const [isClickThumbnail, setIsClickThumbnail] = useState(false);

  // quản lý chuyển trang pagination
  const [newPage, setNewPage] = useState({
    trending: 1,
    movies: 1,
    searchPage: 1,
  });

  //lấy ra số trang tổng mỗi trang
  const [maxTotal, setMaxTotal] = useState({
    trending: 1,
    movies: 1,
    searchPage: 1,
  });

  const [moviesGenre, setMoviesGenre] = useState([]);

  // lấy ra toàn bộ phim theo trang
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=${newPage.trending}`
    )
      .then((res) => res.json())
      .then((data) => {
        setInformations(data.results);

        // setMaxTotal((prev) => ({ ...prev, trending: data.total_pages }));
        setMaxTotal((prev) => ({ ...prev, trending: 500 }));
      });
  }, [newPage.trending]);

  // lấy ra thể toàn bộ loại phim
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
      `https://api.themoviedb.org/3/discover/movie?api_key=e9e9d8da18ae29fc430845952232787c&page=${newPage.movies}&with_genres=${genreId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMoviesGenre(data.results);

        // setMaxTotal((prev) => ({ ...prev, movies: data.total_pages }));
        if (data.total_pages <= 500) {
          setMaxTotal((prev) => ({ ...prev, movies: data.total_pages }));
          return;
        }
        setMaxTotal((prev) => ({ ...prev, movies: 500 }));
      });
  }, [genreId, newPage.movies]);

  // lay ra danh sach phim theo ket qua tim kiem
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=2edf9f02e088272f6ff2eab6bf5fa21a&language=en-US&query=${inputKeyWord}&page=${newPage.searchPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTotalPageSearchResult(data.total_pages);
        // setMaxTotal((prev) => ({ ...prev, searchPage: data.total_pages }));
        setMaxTotal((prev) => ({ ...prev, searchPage: 500 }));

        setSearchResultStorage(data.results);
      });
  }, [inputKeyWord, newPage.searchPage]);

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
        maxTotal,
        setGenreId,
        moviesGenre,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
