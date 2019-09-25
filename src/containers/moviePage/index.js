import React, { useState, useEffect } from "react";
import axios from "axios";
import { matchPath } from "react-router-dom";
import { getMovieURL, getImageURL, getCastURL } from "../../functions/getdata";
import StarRating from "../../components/starRating/starRating";
import Cast from "../../components/cast/cast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./index.module.css";
import LoadingIcon from "../../resources/LoadingIcon";

const MoviePage = props => {
  const match = matchPath(props.history.location.pathname, {
    path: "/movie/:id",
    exact: true,
    strict: false
  });

  const [movieDetails, setMovieDetails] = useState({});
  const [movieLoading, setMovieLoading] = useState(true);
  const [castLoading, setCastLoading] = useState(true);
  const [cast, setCast] = useState([]);

  const movieURL = getMovieURL(match.params.id);
  const castURL = getCastURL(match.params.id);

  const getMovieDetails = async () => {
    let res = await axios.get(movieURL);
    let data = await res.data;
    setMovieDetails(data);
    setMovieLoading(false);
  };

  const getCastMembers = async () => {
    let res = await axios.get(castURL);
    let data = await res.data.cast;
    setCast(data);
    setCastLoading(false);
  };

  useEffect(() => {
    getMovieDetails();
    
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieDetails]);

  useEffect(() => {
    getCastMembers();
    
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cast]);

  if (movieLoading === false && castLoading === false) {
    const backdrop = getImageURL("original", movieDetails.backdrop_path);
    const year = movieDetails.release_date.split("-", 1);
    let genre;
    if (movieDetails.genres[0]) {
      genre = movieDetails.genres[0].name;
    } else {
      genre = "?";
    }
    const mainCast = cast.map(person => {
      if (cast.indexOf(person) < 5) {
        return <Cast key={person.profile_path} image={person.profile_path} name={person.name} />;
      }
      return null;
    });

    return (
      <div className={styles.container}>
        <div className={styles.bg}>
          <img className={styles.bgImg} src={backdrop} alt="background" />
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>{movieDetails.original_title}</h1>

          {/* Extra Info */}
          <div className={styles.extraInfo}>
            <div className={styles.ratingGenres}>
              <div className={styles.rating}>
                <StarRating rating={movieDetails.vote_average} />
                <small className={styles.voteCount}>
                  {movieDetails.vote_count}
                </small>
              </div>
              <div className={styles.genres}>
                <p>
                  {genre} . {movieDetails.runtime}min . {year}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          
          <div className={styles.description}>
            {movieDetails.overview ? <p>{movieDetails.overview}</p> : <h4>No description available.</h4>}
          </div>
        

          {/* Buttons */}
          <div className={styles.buttons}>
            <div className={styles.playButtonDiv}>
              <button className={styles.playButton}>
                <FontAwesomeIcon
                  className={styles.playIcon}
                  icon="play"
                  transform="shrink-2 left-6"
                />
                Play Movie
              </button>
            </div>
            <div className={styles.watchLaterDiv}>
              <button className={styles.watchLater}>
                <FontAwesomeIcon
                  className={styles.bookmarkIcon}
                  icon="bookmark"
                  transform="shrink-2 left-6"
                />
                Watch Later
              </button>
            </div>
          </div>

          {/* CAST */}
          {cast.length ?
          <div className={styles.cast}>
            <h5>CAST</h5>
            <div>{mainCast}</div>
          </div> : <div className={styles.cast}><h4>No cast info available.</h4></div>}
        </div>
      </div>
    );
  }

  return <LoadingIcon/>;
};

export default MoviePage;
