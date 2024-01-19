import Homepage from "../pages/Homepage";
import MovieDetail from "../pages/MovieDetail";
import Movies from "../pages/Movies";
import SearchResult from "../pages/SearchResult";
import TvSeries from "../pages/TvSeries";

const RouterRoutes = [
  {
    url: "/",
    key: "home",
    page: <Homepage></Homepage>,
  },
  {
    url: "/:id",
    key: "mv-detail",
    page: <MovieDetail></MovieDetail>,
  },
  {
    url: "/movies",
    page: <Movies />,
  },
  {
    url: "/tv-series",
    key: "tv-series",
    page: <TvSeries />,
  },
  {
    url: "/search-result",
    key: "search-res",
    page: <SearchResult />,
  },
];

export { RouterRoutes };
