import type { Movie } from '../types';
import MovieCard from './MovieCard';

export default function Favorites({ favorites, toggleFavorites}: {favorites: Movie[]; toggleFavorites: (value: Movie) => void}) {
    return (
        <>
            {favorites.map((favMovie) => <MovieCard key={favMovie.imdbID} movie={favMovie} toggleFavorites={toggleFavorites} favorites={favorites}/>)}
        </>
    )
}