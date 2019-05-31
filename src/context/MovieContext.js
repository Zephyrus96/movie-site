import React, { useState, createContext } from "react";
export const MovieContext = createContext();

export const MovieProvider = props => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [nowPlayingLoading, setNowPlayingLoading] = useState(true);
  const [popularLoading, setPopularLoading] = useState(true);
  const [upcomingLoading, setUpcomingLoading] = useState(true);
  const [movie, setMovie] = useState({});

  const contextValue = {
    popularMovies,
    setPopularMovies,
    upcomingMovies,
    setUpcomingMovies,
    popularLoading,
    setPopularLoading,
    upcomingLoading,
    setUpcomingLoading,
    movie,
    setMovie,
    nowPlayingMovies,
    setNowPlayingMovies,
    nowPlayingLoading,
    setNowPlayingLoading
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {props.children}
    </MovieContext.Provider>
  );
};
