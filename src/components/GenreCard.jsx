import React, { useRef } from "react";
import css from "../styles/genreCard.module.css";

import clsx from "clsx";
import { setGenre, updateGenre } from "../reducer/constants";

export default function GenreCard({
  genreName,
  idGenre,
  state,
  dispatch,
  isActive,
}) {
  const { genre, genreList } = state;
  const btnRef = useRef();

  function handleClickCard() {
    //chưa có thì thêm thể loại vào object genreList
    if (Object.keys(genreList).length === 0) {
      dispatch(setGenre(idGenre));
    } else {
      dispatch(updateGenre(idGenre));
    }
  }

  return (
    <button
      ref={btnRef}
      onClick={handleClickCard}
      key={idGenre}
      className={clsx(css.button, { [css.activeGenreCard]: isActive })}
    >
      {genreName}
    </button>
  );
}
