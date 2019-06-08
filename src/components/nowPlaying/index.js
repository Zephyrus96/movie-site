import React, { useEffect, useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import { getNowPlayingURL } from "../../functions/getdata";
import Movie from "../movie/movie";
import axios from "axios";
import styles from "./styles.module.css";

const NowPlaying = () => {
  const contextValue = useContext(MovieContext);

  const url = getNowPlayingURL();

  const getNowPlayingMovies = async () => {
    let res = await axios.get(url);
    let data = await res.data;
    contextValue.setNowPlayingMovies(data.results);
    contextValue.setNowPlayingLoading(false);
  };

  useEffect(() => {
    getNowPlayingMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (contextValue.nowPlayingLoading === false) {
    const nowPlayingList = contextValue.nowPlayingMovies.map(movie => (
      <Movie
        className={styles.movie}
        id={movie.id}
        image={movie.poster_path}
        title={movie.title}
        genreIDs={movie.genre_ids}
        releaseDate={movie.release_date}
        rating={movie.vote_average}
        key={movie.id}
      />
    ));
    return <div className={styles.container}>{nowPlayingList}</div>;
  }
  return <h1 className={styles.loading}>Loading</h1>;
};

export default NowPlaying;
