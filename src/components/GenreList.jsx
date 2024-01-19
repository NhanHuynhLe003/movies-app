import React, { useContext, useEffect, useReducer, useRef } from "react";
import { AppContext } from "../Context/AppContext";
import { addGenre, delGenre, initState, setGenre } from "../reducer/constants";
import reducer from "../reducer/reducer";
import GenreCard from "./GenreCard";
import css from "../styles/genreList.module.css";
import genreCardCss from "../styles/genreCard.module.css";
export default function GenreList({ getGenreInfo, getInfo }) {
  const { genres, informations } = useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, initState);
  const historyGenreRef = useRef({});
  const isDeletedRef = useRef(false);
  const { genre, genreList } = state;
  const genreContainerRef = useRef([]);
  useEffect(() => {
    //effect when genreList change;
    handleGenreListContainer();
    getGenreInfo(genreContainerRef.current);
  }, [genreList]);

  useEffect(() => {
    //handle when pagination change
    if (genreContainerRef.current.length === 0) {
      genreContainerRef.current = informations;
    }

    handleGenreListContainer();
    getGenreInfo(genreContainerRef.current);
  }, [informations]);

  useEffect(() => {
    //handleWhen addGenre and isDeleted much be false to add.
    if (genre !== "") {
      dispatch(addGenre(genre));
      isDeletedRef.current = false;
    }
  }, [genre]);

  //handleClickButtonCss
  function getBtnRef(btnRef) {
    let btnClassSelected;
    if (btnRef.current.className.indexOf(`${genreCardCss.btnSlected}`) !== -1) {
      // style when select button
      btnClassSelected = `${genreCardCss.button}`;
    } else {
      //style when delete button
      btnClassSelected = `${genreCardCss.button} ${genreCardCss.btnSlected}`;
    }
    btnRef.current.className = btnClassSelected;
  }

  function handleClick(genreId) {
    dispatch(setGenre(genreId));
  }

  function handleDelGenre(genreId) {
    isDeletedRef.current = true; // change status into delete
    dispatch(delGenre(genreId));
  }

  function handleGenreListContainer() {
    if (genreList.length < 1 && informations.length > 0) {
      //when init movies page, movies page don't have data to render UI so that I have to push data to them
      genreContainerRef.current = [...informations];
    }

    for (let lenGenre = 1; lenGenre <= genreList.length; lenGenre++) {
      if (lenGenre === 1) {
        genreContainerRef.current = [...informations];
      }

      /**
        why you have to use loop for this issue? because when page updated, it have to run from genreListInit to genreList.length. If 
        page don't run from genreListInit, it won't update data in new pagination. it works as a chain-action.
        
        */
      if (isDeletedRef.current === false) {
        //handle when add data
        let tempGenreContainer = [];
        genreContainerRef.current.length > 0 &&
          genreContainerRef.current.forEach((infoMovie) => {
            // nếu trong danh sách id server phim có chứa thể loại phim hiện tại đg nhấn thì sẽ được lưu vào bộ nhớ tạm
            if (infoMovie.genre_ids.indexOf(genreList[lenGenre - 1]) !== -1) {
              tempGenreContainer.push(infoMovie);
            }
          });
        genreContainerRef.current = tempGenreContainer;

        //thêm phim vừa thêm vào bộ nhớ tạm
        historyGenreRef.current[lenGenre] = tempGenreContainer;
      } else {
        //handle when delete data
        genreContainerRef.current = historyGenreRef.current[lenGenre];
        //when you change page, isDeleted still false so that genreContainerRef can't receive data from informations updated => you must set isDeleted = false;
        isDeletedRef.current = false;
      }
    }
    return genreContainerRef.current;
  }

  return (
    <div className={css.genreListItem}>
      {genres.map((genre, index) => {
        return (
          <GenreCard
            indexCard={index}
            getBtnRef={getBtnRef}
            delGenreCard={(prev) => handleDelGenre(prev)}
            handleClick={handleClick}
            idGenre={genre.id}
            genreName={genre.name}
          />
        );
      })}
    </div>
  );
}
