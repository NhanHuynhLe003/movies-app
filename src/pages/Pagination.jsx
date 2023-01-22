import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../Context/AppContext";
import styles from "./pagination.module.css";
export default function Pagination({ totalPage }) {
  const { setNewPage } = useContext(AppContext);

  const pageContainer = [];
  const maxPage = totalPage;
  const caseDot = useRef();
  const handlePreBtn = () => {
    if (curBtn > 1) {
      setCurBtn(curBtn - 1);
      setCurNumOfPage(curNumOfPage - 1);
    } else {
      setCurBtn(curBtn);
      setCurNumOfPage(curNumOfPage);
    }
  };
  const handleNextBtn = () => {
    if (curBtn < maxPage) {
      setCurBtn(curBtn + 1);
      setCurNumOfPage(curNumOfPage + 1);
    } else {
      setCurBtn(curBtn);
      setCurNumOfPage(curNumOfPage);
    }
  };
  const handleClick = (numPage) => {
    setCurBtn(numPage);
    setCurNumOfPage(numPage);
  };
  for (let page = 1; page <= maxPage; page++) {
    pageContainer.push(page);
  }

  const [curBtn, setCurBtn] = useState(1);
  const [curBtnConainer, setCurBtnConainer] = useState([]);
  const [curIndex, setCurIndex] = useState(0);
  const [curNumOfPage, setCurNumOfPage] = useState(1);

  function handleCaseDot(caseDot) {
    if (curBtn === "...") {
      if (caseDot === "case1") {
        setCurBtn(curBtnConainer[curBtnConainer.length - 6] + 1);
        setCurNumOfPage(curBtnConainer[curBtnConainer.length - 6] + 1);
      } else if (caseDot === "case2") {
        setCurBtn(curBtnConainer[curBtnConainer.length - 6] + 2);
        setCurNumOfPage(curBtnConainer[curBtnConainer.length - 6] + 2);
      } else if (caseDot === "case3") {
        if (curIndex === 3) {
          setCurBtn(curBtnConainer[curBtnConainer.length - 6] - 2);
          setCurNumOfPage(curBtnConainer[curBtnConainer.length - 6] - 2);
        }
        if (curIndex === 7) {
          setCurBtn(curBtnConainer[curBtnConainer.length - 6] + 2);
          setCurNumOfPage(curBtnConainer[curBtnConainer.length - 6] + 2);
        }
      } else if (caseDot === "case4") {
        let curNum =
          curBtnConainer[curBtnConainer.length - (curBtnConainer.length - 5)] -
          2;

        setCurBtn(curNum);
        setCurNumOfPage(curNum);
      }
    }
  }

  useEffect(() => {
    const leftDot = {
      dot: "...",
      type: "leftDot",
    };
    const rightDot = {
      dot: "...",
      type: "rightDot",
    };

    setNewPage(curNumOfPage);

    //handle UI pageNumber
    let tempCurBtnContainer = [...curBtnConainer];
    if (curBtn >= 1 && curBtn <= 2) {
      tempCurBtnContainer = [
        1,
        2,
        3,
        rightDot.dot,
        pageContainer.length - 2,
        pageContainer.length - 1,
        pageContainer.length,
      ];
      caseDot.current = "case1";
    } else if (curBtn >= 3 && curBtn <= 6) {
      const breakPointInit = pageContainer.slice(0, curBtn + 1);

      tempCurBtnContainer = [
        ...breakPointInit,
        rightDot.dot,
        pageContainer.length - 2,
        pageContainer.length - 1,
        pageContainer.length,
      ];
      caseDot.current = "case2";
    } else if (curBtn > 6 && curBtn <= pageContainer.length - 6) {
      const breakPointLeft = pageContainer.slice(curBtn - 2, curBtn); //[6,7]
      const breakPointRight = pageContainer.slice(curBtn, curBtn + 1); //[8]
      tempCurBtnContainer = [
        1,
        2,
        3,
        leftDot.dot,
        ...breakPointLeft,
        ...breakPointRight,
        rightDot.dot,
        pageContainer.length - 2,
        pageContainer.length - 1,
        pageContainer.length,
      ];
      caseDot.current = "case3";
    } else if (
      curBtn > pageContainer.length - 6 &&
      curBtn <= pageContainer.length
    ) {
      const breakPointEnd1 = pageContainer.slice(curBtn - 2);

      tempCurBtnContainer = [1, 2, 3, leftDot.dot, ...breakPointEnd1];
      caseDot.current = "case4";
    }

    setCurBtnConainer(tempCurBtnContainer);
    handleCaseDot(caseDot.current);
  }, [curBtn]);

  return (
    <div>
      <ul className={styles.ulElement}>
        <li>
          <button className={`${styles.btn}`} onClick={handlePreBtn}>
            Prev
          </button>
        </li>
        <div id={styles.pageNumberContainer}>
        {curBtnConainer.map((page, index) => (
          <li key={`${page}_${index}`} className={styles.listItemPageNumber}>
            <button
              className={` ${styles.btn} ${
                curNumOfPage === page ? styles.active : ""
              }`}
              onClick={() => {
                setCurIndex(index);
                handleClick(page);
              }}
            >
              {page}
            </button>
          </li>
        ))}
        </div>
        
        <li>
          <button className={`${styles.btn}`} onClick={handleNextBtn}>
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}
