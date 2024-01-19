import React, { useContext, useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import logo from "../assets/logo/main-logo-movie-center.png";
import search from "../assets/svg/search.svg";
import navCss from "../styles/navbar.module.css";

import { useNavigate } from "react-router-dom";
export default function Navbar({ param }) {
  const navigate = useNavigate();

  const { setInputKeyWord } = useContext(AppContext);
  const [valInput, setValInput] = useState("");

  const debounceTimerId = useRef();
  const searchInputRef = useRef();
  // hàm xử lý tìm kiếm
  const handleSearch = (e) => {
    setValInput(e.target.value);
    //dùng debounce để tối ưu req gửi lên server

    const agrs = {
      fc1: navigate,
      fc2: setInputKeyWord,
      agr1: `/search-result/${e.target.value}`,
      agr2: e.target.value,
    };
    debounce(2000, agrs);

    // Thực hiện logic tìm kiếm ở đây
  };
  const debounce = (delay, agrs) => {
    if (debounceTimerId.current) {
      //ko clear có khả năng trùng lặp với id tạo ra ở kq tìm kiếm trc đó
      clearTimeout(debounceTimerId.current);
    }
    debounceTimerId.current = setTimeout(() => {
      agrs.fc2(agrs.agr2);
      agrs.fc1(agrs.agr1);
    }, delay);
  };

  const [isClickBarBtn, setIsClickBarBtn] = useState(false);

  //get window size viewport
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (width < 576) {
      setIsClickBarBtn(false);
    } else {
      setIsClickBarBtn(true);
    }
  }, [width]);

  return (
    <nav className={`${navCss.navBar}`}>
      <button
        onClick={() => {
          setIsClickBarBtn(!isClickBarBtn);
        }}
        className={navCss.BarsBtn}
      >
        <FaBars fill="#fff" />
      </button>
      <ul
        className={navCss.ulElement}
        style={isClickBarBtn ? { display: "flex" } : { display: "none" }}
      >
        <li>
          <Link
            to="/"
            className={`${navCss.listElement} ${navCss.moviesHub} ${navCss.hoverElement}`}
          >
            <img
              loading="lazy"
              src={logo}
              width={80}
              alt="logo-movie-center"
            ></img>
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className={`${navCss.listElement} ${navCss.trending}  ${navCss.hoverElement} `}
          >
            <svg
              className={param === "/" && navCss.selecting}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              style={{ width: "22px", height: "22px", marginRight: "6px" }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
              ></path>
            </svg>
            <span className={param === "/" && navCss.selecting}>Trending</span>
          </Link>
        </li>

        <li>
          <Link
            to="/movies"
            className={`${navCss.hoverElement} ${navCss.listElement}`}
          >
            <svg
              className={
                param === "/movies" && `${navCss.selecting} ${navCss.grayCl}`
              }
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              style={{ width: "22px", height: "22px", marginRight: "6px" }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
              ></path>
            </svg>
            <span className={param === "/movies" && navCss.selecting}>
              Movies
            </span>
          </Link>
        </li>

        <li>
          <Link
            to={"/tv-series"}
            className={`${navCss.listElement} ${navCss.hoverElement}`}
          >
            <svg
              className={
                param === "/tv-series" && `${navCss.selecting} ${navCss.grayCl}`
              }
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              style={{ width: "22px", height: "22px", marginRight: "6px" }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
              ></path>
            </svg>
            <span className={param === "/tv-series" && navCss.selecting}>
              TV Series
            </span>
          </Link>
        </li>

        <li className={`${navCss.searchBarContainer}`}>
          <input
            ref={searchInputRef}
            onInput={handleSearch}
            value={valInput}
            type="text"
            className={navCss.searchBarElement}
          />
          <Link
            to={`/search-result/${valInput}`}
            className={navCss.searchBtn}
            onClick={() => setInputKeyWord(valInput)}
          >
            <img style={{ width: "70%" }} src={search} alt="search" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
