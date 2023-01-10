import React from 'react'
import { Link } from 'react-router-dom'
import css from './MovieCard.module.css'
export default function MovieCard({title, vote, posters,id}) {
  return (
    
      <Link to={`/${id}`} className={css.cardContainer}>
        <div className="thumbnail-container">
            <img style={{width: '100%'}} src={`https://image.tmdb.org/t/p/w500${posters}`} alt="hinh anh" />
        </div>
        <p className={css.voteAverage}>{vote} ★</p>
        <h1 className="title">{title}</h1>
      </Link>

  )
}
