import React from "react";
import { useEffect, useState } from "react";
import './App.css';
import MovieCard from "./MovieCard";
import SearchIcon from './search.svg';

const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    const searchMovies = async (title) => {
        try {
            const response = await fetch(`${API_URL}&s=${title}`);
            const data = await response.json();
            console.log(data);
            

            if (data.Response === "True") {
                setMovies(data.Search);
                setError(null);
            } else {
                setMovies([]);
                setError(data.error);
            }
        } catch (error) {
            setError("Something went wrong. Please try again later.");
            setMovies([]);
        }
    }

    useEffect(() => {
        searchMovies('Batman');
    }, []);

    return (
        <div className="app">
            <h1>MovieMania</h1>
            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
            </div>

            {error && (
                <div className="error">
                    <h2>{error}</h2>
                </div>
            )}

            {movies.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            ) : !error && (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}
        </div>
    );
}

export default App;
