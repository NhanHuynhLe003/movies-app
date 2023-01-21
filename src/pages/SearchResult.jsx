import React, { useContext, useEffect } from 'react'
import { AppContext } from '../Context/AppContext'
import MovieCard from './MovieCard'
import Navbar from './Navbar'
import Pagination from './Pagination'
import style from './searchResult.module.css'
export default function SearchResult() {
    //https://api.themoviedb.org/3/search/movie?api_key=2edf9f02e088272f6ff2eab6bf5fa21a&language=en-US&query=spider&page=1
    const {searchResultStorage, totalPageSearchResult} = useContext(AppContext);
   useEffect(() => {
    console.log(totalPageSearchResult);
   },[totalPageSearchResult])
  return (
    <div id='searchResult' className={style.searchResult}>
      <header><Navbar/></header>
      <section id="content" className={style.contentSection}>
        <div id="movieSearched" className={style.movieSearched}>
            {searchResultStorage.length > 0 ? searchResultStorage.map((movie, index) => {
                return <MovieCard
                key={`${movie}-${index}`}
                title={movie.title}
                vote={movie.vote_average}
                posters={movie.poster_path}
                id={movie.id}/>
            }) : <h1 className={style.movieNotFound}>Movie Not Found</h1>}
        </div>
        <div id="pagination" className={style.pagination}><Pagination totalPage={totalPageSearchResult}/></div>
      </section>
      <footer></footer>
    </div>
  )
}
