import React, { useEffect, useState, useContext } from "react";
import { getCategoryURL } from "../../functions/getdata";
import { MovieContext } from "../../context/MovieContext";
import Movie from "../movie/movie";
import { genres } from "../../resources/details";
import axios from "axios";
import styles from "./category.module.css";
import LoadingIcon from "../../resources/LoadingIcon";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./pagination.css";

const Category = () => {
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [forcePage, setForcePage] = useState(0);
  const [paginationKey, setPaginationKey] = useState(0);
 
  const contextValue = useContext(MovieContext);

  const id = parseInt(
    window.location.pathname.slice(
      window.location.pathname.lastIndexOf("/") + 1
    )
  );
  
  const genre = genres.find(genre => {
    return genre.id === id;
  });


  const getCategoryMovies = async (page = currentPage) => {
    setLoading(true);
    const url = getCategoryURL(id,page);
    let res = await axios.get(url);
    let data = await res.data;
    contextValue.setCategoryMovies(data.results);
    if(pageCount !== data.total_pages) 
      setPageCount(data.total_pages);
    setLoading(false);
  };

  const handlePageClick = data => {
    setCurrentPage(data.selected + 1);
    getCategoryMovies(data.selected + 1);
  }

  useEffect(() => {
    setPaginationKey(Math.random());
    setForcePage(0);
    setCurrentPage(1);
    getCategoryMovies(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[genre]);

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
    <React.Fragment>
      {loading && <LoadingIcon />}
      {!loading && 
      <div className={styles.container}>
        <h1 className={styles.title}>{genre.name} Movies</h1>
        <div className={styles.movieContainer}>{movies}</div>
      </div>
      }
      <ReactPaginate
        key={paginationKey} 
        previousLabel={<FontAwesomeIcon icon="arrow-left"/>}
        nextLabel={<FontAwesomeIcon icon="arrow-right"/>}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        forcePage={forcePage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        disabledClassName={'disabled__page'}
        pageLinkClassName={'page__link'}
        activeClassName={'active__page'}
      />
    </React.Fragment>
  );
};

export default Category;
