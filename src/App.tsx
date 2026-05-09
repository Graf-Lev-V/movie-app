import { useEffect, useState } from "react";
import type { Movie } from './types';
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import Favorites from "./components/Favorites";

export default function App() {

  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : []
  });
  const [view, setView] = useState<'search' | 'favorites'>('search')

  function fetchMovies(query: string, controller: AbortController): void {
    setLoading(true);
    setError(null);
    setMovies([]);
    (async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=8db4a259&s=${query.trim()}`, {signal: controller.signal});
        if (!response.ok) throw new Error ('Error');
        const data = await response.json();
        if (data.Response === 'False') setError(data.Error);
        else setMovies(data.Search);
      }
      catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          setError(error.message);
        }
      }
      finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    })();
  }

  useEffect(() => {
    if (query !== '') {
      const controller = new AbortController();
      const timer = setTimeout(() => fetchMovies(query, controller), 1000)
    return () => { clearTimeout(timer);  controller.abort(); }
    }
  }, [query])

  function toggleFavorites(movie: Movie): void {
    if (favorites.some((favMovie) => favMovie.imdbID === movie.imdbID)) {
      setFavorites(favorites.filter((favMovie) => favMovie.imdbID !== movie.imdbID))
    }
    else {
      setFavorites([...favorites, movie])
    }
  }

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites])

  return (
    <>
      <button onClick={() => setView('search')}>Search</button>
      <button onClick={() => setView('favorites')}>Favorites</button>
      <hr/>
      {view === 'search' ? 
      <>
      <SearchBar query={query} setQuery={setQuery}/>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <MovieList movies={movies} toggleFavorites={toggleFavorites} favorites={favorites}/>}
      </> :
      <Favorites favorites={favorites} toggleFavorites={toggleFavorites}/>}
    </>
  )
}