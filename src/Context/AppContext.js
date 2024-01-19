import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [informations, setInformations] = useState({});
  const [cast, setCast] = useState();

  const [genres, setGenres] = useState([]);
  const [newPage, setNewPage] = useState(1);
  const [searchResultStorage, setSearchResultStorage] = useState({});
  const [inputKeyWord, setInputKeyWord] = useState("hello");
  const [totalPageSearchResult, setTotalPageSearchResult] = useState();
  const [movieDetail, setMovieDetail] = useState({});
  const [movieVideo, setMovieVideo] = useState({});
  const [idMovie, setIdMovie] = useState(0);
  const [isClickThumbnail, setIsClickThumbnail] = useState(false);
  const [maxTotalPage, setMaxTotalPage] = useState(1);

  // lấy ra toàn bộ phim theo trang
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=${newPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setInformations(data.results);
        setMaxTotalPage(data.total_pages);
      });
  }, [newPage]);

  // lay ra nhung api user chi tiết
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${idMovie}?api_key=2edf9f02e088272f6ff2eab6bf5fa21a&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieDetail(data);
        setCast(data);
      });

    fetch(
      `https://api.themoviedb.org/3/movie/${idMovie}/credits?api_key=2edf9f02e088272f6ff2eab6bf5fa21a&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setCast(data);
      });

    fetch(
      `https://api.themoviedb.org/3/movie/${idMovie}/videos?api_key=2edf9f02e088272f6ff2eab6bf5fa21a&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieVideo(data.results);
      });
  }, [idMovie]);

  // lấy ra thể loại phim
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setGenres(data.genres));
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=2edf9f02e088272f6ff2eab6bf5fa21a&language=en-US&query=${inputKeyWord}&page=${newPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTotalPageSearchResult(data.total_pages);

        setSearchResultStorage(data.results);
      });
  }, [inputKeyWord, newPage]);

  return (
    <AppContext.Provider
      value={{
        informations,
        movieDetail,
        cast,
        idMovie,
        setIdMovie,

        genres,
        setNewPage,
        newPage,
        searchResultStorage,
        totalPageSearchResult,
        setInputKeyWord,
        movieVideo,
        isClickThumbnail,
        setIsClickThumbnail,
        maxTotalPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
