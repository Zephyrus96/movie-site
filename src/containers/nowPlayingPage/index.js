import React from "react";
import { MovieProvider } from "../../context/MovieContext";
import NowPlaying from "../../components/nowPlaying/index";
import styles from "./styles.module.css";

const NowPlayingPage = () => {
  return (
    <MovieProvider>
      <div className={styles.container}>
        <h1 className={styles.title}>Now Watching</h1>
        <NowPlaying />
      </div>
    </MovieProvider>
  );
};

export default NowPlayingPage;
