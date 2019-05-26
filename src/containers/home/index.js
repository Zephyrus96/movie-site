import React from "react";
import PopularList from "../../components/movieList/popularList";
import UpcomingList from "../../components/movieList/upcomingList";
import { MovieProvider } from "../../context/MovieContext";
import styles from "./index.module.css";

const Home = () => {
  return (
    <MovieProvider>
      <div className={styles.popularList}>
        <h3 className={styles.title}>Popular Movies</h3>
        <PopularList className={styles.list} />
      </div>
      <div className={styles.upcomingList}>
        <h3 className={styles.title}>Upcoming Movies</h3>
        <UpcomingList className={styles.list} />
      </div>
    </MovieProvider>
  );
};

export default Home;
