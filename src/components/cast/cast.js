import React from "react";
import { getImageURL } from "../../functions/getdata";
import styles from "./cast.module.css";

const Cast = props => {
  const imageURL = getImageURL("w92", props.image);
  const name = props.name;

  return (
    <div className={styles.container}>
      <img src={imageURL} alt={name} />
      <h5>{name}</h5>
    </div>
  );
};

export default Cast;
