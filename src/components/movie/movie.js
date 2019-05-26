import React from "react";
import "../../functions/getdata";
import styles from "./movie.module.css";
import StarRating from "../starRating/starRating";
import { Link } from "react-router-dom";
import { genres } from "../../resources/details";

const Movie = props => {
  const getMovieImage = (imageURL, size) => {
    let url = "https://image.tmdb.org/t/p/" + size + imageURL;
    return url;
  };

  const getReleaseYear = date => {
    return date.split("-", 1);
  };

  const url = getMovieImage(props.image, "w154");
  let genre;

  genre = genres.find(genre => {
    return genre.id === props.genreIDs[0];
  });

  if (genre === undefined) {
    genre = {
      name: "?"
    };
  }

  console.log(genre);

  const year = getReleaseYear(props.releaseDate);

  return (
    <div className={styles.container}>
      <Link to={`/movie/${props.id}`}>
        <img className={styles.image} src={url} alt={props.title} />
        <h5 className={styles.title}>{props.title}</h5>
        <div className={styles.info}>
          <p>
            {genre.name} - {year}
          </p>
          <StarRating className={styles.rating} rating={props.rating} />
        </div>
      </Link>
    </div>
  );
};

export default Movie;
