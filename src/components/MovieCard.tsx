import { useState } from 'react';
import type { Movie } from '../types';

export default function MovieCard({ movie, toggleFavorites, favorites }: {movie: Movie; toggleFavorites: (value: Movie) => void; favorites: Movie[]}) {

    const [imgError, setImgError] = useState<boolean>(false);

    return (
        <div>
            {!imgError && <img src={movie.Poster} alt={movie.Title} onError={() => setImgError(true)}/>}
            <p>{movie.Title}</p>
            <p>{movie.Year}</p>
            {favorites.some((favMovie) => favMovie.imdbID === movie.imdbID) ? 
            <button onClick={() => toggleFavorites(movie)}>Remove from favorites</button> :
            <button onClick={() => toggleFavorites(movie)}>Add to favorites</button>}
            <hr/>
        </div>
    )
}