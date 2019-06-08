import React, { useRef, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { getSearchResults, getImageURL } from "../../functions/getdata";
import styles from "./navbar.module.css";

const Navbar = () => {
  const searchBtn = useRef();
  const input = useRef();
  const searchBox = useRef();
  const queryReturns = useRef();

  const [searchResults, setSearchResults] = useState([]);
  const [timer, setTimer] = useState(null);
  const [changed, setChanged] = useState(0);

  const btnTransition = () => {
    searchBtn.current.focus();
    searchBox.current.style.background = "rgba(34, 43, 48, 1)";
    input.current.style.display = "block";
    input.current.focus();
    searchBox.current.style.transition = "background 300ms ease";
    input.current.style.transition = "display 300ms ease";
  };

  // const hideBg = () => {
  //   searchBox.current.style.background = "rgba(34, 43, 48, 0)";
  // };

  const searchMovies = async () => {
    let url = getSearchResults(input.current.value);
    let req = await axios.get(url);
    let data = await req.data;
    console.log(data.results);
    setSearchResults(data.results);
  };

  let results;
  if (changed === 1) {
    results = searchResults.slice(0, 5).map(movie => (
      <Link to={`/movie/${movie.id}`}>
        <div className={styles.resultRow}>
          <img src={getImageURL("w45", movie.poster_path)} alt="img" />
          <h6>{movie.title}</h6>
        </div>
      </Link>
    ));
  }

  const onSearchChange = () => {
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        searchMovies();
      }, 1000)
    );
    if (input.current.value.length > 2) {
      queryReturns.current.style.display = "flex";
    } else {
      queryReturns.current.style.display = "none";
      results = null;
    }
  };

  useEffect(() => {
    setChanged(1);
    queryReturns.current.style.height = "auto";
  }, [searchResults]);

  return (
    <div className={styles.container}>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.listItem}>
            <div ref={searchBox} className={styles.searchBox}>
              <input
                ref={input}
                // onBlur={hideBg}
                onChange={onSearchChange}
                type="text"
                placeholder="Search Movies..."
              />
              <div ref={queryReturns} className={styles.searchResults}>
                {results}
              </div>
              <button
                ref={searchBtn}
                className={styles.searchBtn}
                onClick={btnTransition}
              >
                <FontAwesomeIcon className={`${styles.icon}`} icon="search" />
              </button>
            </div>
          </li>
          <li className={styles.listItem}>
            <FontAwesomeIcon className={styles.icon} icon="bell" />
          </li>
          <li className={`${styles.listItem} ${styles.link}`}>
            <NavLink to="/login">
              <h5>Login/Register</h5>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
