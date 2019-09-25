import React, { useState, useEffect, useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import { getNowPlayingURL } from "../../functions/getdata";
import Movie from "../movie/movie";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";
import LoadingIcon from "../../resources/LoadingIcon";

const NowPlaying = () => {
  const contextValue = useContext(MovieContext);

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);


  const getNowPlayingMovies = async (page = currentPage) => {
    const url = getNowPlayingURL(page);
    console.log(url);
    let res = await axios.get(url);
    let data = await res.data;
    setPageCount(data.total_pages);
    contextValue.setNowPlayingMovies(data.results);
    contextValue.setNowPlayingLoading(false);
  };

  const handlePageClick = data => {
    setCurrentPage(data.selected + 1);
    getNowPlayingMovies(data.selected + 1);
  }

  useEffect(() => {
    getNowPlayingMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
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

  return (
    <React.Fragment>
      {contextValue.nowPlayingLoading && <LoadingIcon/>}
      {!contextValue.nowPlayingLoading && 
        <div className={styles.container}>
          {nowPlayingList}
        </div> 
      }

      <ReactPaginate
        previousLabel={<FontAwesomeIcon icon="arrow-left"/>}
        nextLabel={<FontAwesomeIcon icon="arrow-right"/>}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        forcePage={0}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        pageLinkClassName={'page__link'}
        disabledClassName={'disabled__page'}
        activeClassName={'active__page'}
      />
    </React.Fragment>
  );
};

export default NowPlaying;
