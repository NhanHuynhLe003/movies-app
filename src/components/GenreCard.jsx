import React, { useRef } from "react";
import css from "../styles/genreCard.module.css";
export default function GenreCard({
  genreName,
  idGenre,
  handleClick,
  getBtnRef,
  indexCard,
  delGenreCard,
}) {
  const btnRef = useRef();

  return (
    <button
      ref={btnRef}
      onClick={() => {
        if (btnRef.current.className.indexOf(css.btnSlected) === -1) {
          // console.log(`the ${genreName} da dc them class`);
          handleClick(idGenre);
        } else {
          // console.log(`the ${genreName} da dc xoa class`);

          delGenreCard(idGenre);
        }

        getBtnRef(btnRef);
      }}
      key={idGenre}
      className={css.button}
    >
      {genreName}
    </button>
  );
}
