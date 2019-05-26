import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as EmptyStar } from "@fortawesome/free-regular-svg-icons";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./starRating.module.css";

const StarRating = props => {
  const starRate = (props.rating * 5) / 10;
  const stars = Math.floor(starRate);
  const remainder = starRate - stars;

  var fullStarsArray = [];
  var halfStarArray = [];
  var emptyStarsArray = [];

  for (let i = 0; i < stars; i++) {
    fullStarsArray = [...fullStarsArray, i];
  }
  if (remainder >= 0.5) {
    halfStarArray.push(0);
  } else {
    emptyStarsArray.push(0);
  }

  for (let i = 1; i < 5 - stars; i++) {
    emptyStarsArray = [...emptyStarsArray, i];
  }

  const fullStars = fullStarsArray.map(star => (
    <FontAwesomeIcon className={styles.star} icon={faStar} key={star} />
  ));

  const halfStar = halfStarArray.map(star => (
    <FontAwesomeIcon className={styles.star} icon={faStarHalfAlt} key={star} />
  ));

  const emptyStars = emptyStarsArray.map(star => (
    <FontAwesomeIcon className={styles.star} icon={EmptyStar} key={star} />
  ));

  return (
    <div>
      {fullStars}
      {halfStar}
      {emptyStars}
    </div>
  );
};

export default StarRating;
