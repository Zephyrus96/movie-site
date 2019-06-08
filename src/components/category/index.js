import React, { useEffect, useState, useContext } from "react";
import { getCategoryURL } from "../../functions/getdata";
import { MovieContext } from "../../context/MovieContext";
import Movie from "../../components/movie/movie";
import { genres } from "../../resources/details";
import axios from "axios";
import styles from "./category.module.css";

const Category = () => {
  const id = parseInt(
    window.location.pathname.slice(
      window.location.pathname.lastIndexOf("/") + 1
    )
  );

  const genre = genres.find(genre => {
    return genre.id === id;
  });

  const contextValue = useContext(MovieContext);
  const [loading, setLoading] = useState(true);

  const url = getCategoryURL(id);

  const getCategoryMovies = async () => {
    let res = await axios.get(url);
    let data = await res.data;
    contextValue.setCategoryMovies(data.results);
    setLoading(false);
  };

  useEffect(() => {
    getCategoryMovies();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre]);

  console.log(contextValue.categoryMovies);

  if (loading === false) {
    const movies = contextValue.categoryMovies.map(movie => (
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

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{genre.name} Movies</h1>
        <div className={styles.movieContainer}>{movies}</div>
      </div>
    );
  }

  return <h1>Loading...</h1>;
};

export default Category;
