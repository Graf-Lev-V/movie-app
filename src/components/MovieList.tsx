import MovieCard from "./MovieCard";
import type { Movie } from '../types'

export default function MovieList({ movies, toggleFavorites, favorites }: {movies: Array<Movie>; toggleFavorites: (value: Movie) => void; favorites: Movie[] }) {
    return (
        <>
            {movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} toggleFavorites={toggleFavorites} favorites={favorites}/>)}
        </>
    )
}