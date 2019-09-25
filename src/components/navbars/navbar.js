import React, { useRef, useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSearchResults, getImageURL } from "../../functions/getdata";
import axios from "axios";
import UnknownImage from "../../resources/icons8-question-mark-50.png";
import {SidebarContext} from "../../context/SidebarContext";
import styles from "./navbar.module.css";

const Navbar = () => {
  const sidebarContext = useContext(SidebarContext);

  const searchBtn = useRef();
  const input = useRef();
  const searchBox = useRef();
  const queryReturns = useRef();

  const [searchResults, setSearchResults] = useState([]);
  const [timer, setTimer] = useState(null);
  const [changed, setChanged] = useState(0);
  const [btnClicked, setBtnClicked] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const btnTransition = () => {
    if(!btnClicked){
      setBtnClicked(true);
      searchBtn.current.focus();
      searchBox.current.style.background = "rgba(34, 43, 48, 1)";
      input.current.style.display = "block";
      input.current.focus();
    }
    else{
      setBtnClicked(false);
      input.current.style.display = "none";
      queryReturns.current.style.display = "none";
      searchBox.current.style.background = "rgba(34, 43, 48, 0)";
    }
   
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
    if(width >= 620){
      if(searchClicked){
        setSearchClicked(false);
        btnTransition();
      }
    }else{
      if(btnClicked){
        setBtnClicked(false);
        setSearchClicked(true);
        input.current.focus();
      }
    }
  }

  // const hideBg = () => {
  //     setBtnClicked(false);
  //     input.current.style.display = "none";
  //     queryReturns.current.style.display = "none";
  //     searchBox.current.style.background = "rgba(34, 43, 42, 0)";
  // };

  const btnTransitionSmall = () =>{
    setSearchClicked(true);
  }

  const cancelSearch = () => {
    setSearchResults([]);
    setSearchClicked(false);
  }

  const searchMovies = async () => {
    let url = getSearchResults(input.current.value);
    let req = await axios.get(url);
    let data = await req.data;
    console.log(data.results);
    setSearchResults(data.results);
  };

  const movieClicked = () => {
    setSearchResults([]);
    input.current.value = "";
  }

  let results;
  if (changed === 1) {
    
    results = searchResults.slice(0, 5).map(movie => {
      const imgSrc = movie.poster_path ? getImageURL("w45", movie.poster_path) : UnknownImage;
      return(
        <Link to={`/movie/${movie.id}`}>
          <div className={styles.resultRow} onClick={movieClicked}>
            <img src={imgSrc} alt="img" />
            <h6>{movie.title}</h6>
          </div>
        </Link>
      );
    });
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

  const openSidebar = () => {
    sidebarContext.setShowSidebar(true);
  }


  useEffect(() => {
    setChanged(1);
    queryReturns.current.style.height = "auto";
  }, [searchResults]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[width]);

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        {!searchClicked &&
        <ul className={styles.navList}>
          <li className={styles.sidebarBtn}>
            <div className={styles.burgerContainer} onClick={openSidebar}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </li>
          <li className={styles.listItem}>
            <div ref={searchBox} className={styles.searchBox}>
              <input
                ref={input}
                onChange={onSearchChange}
                type="text"
                placeholder="Search Movies..."
              />
              <div ref={queryReturns} className={styles.searchResults}>
                {results}
              </div>
              
              {/* if width > 620px load this button */}
              {width >= 620 && !btnClicked &&
              <button
                ref={searchBtn}
                className={styles.searchBtn}
                onClick={btnTransition}
              >
                <FontAwesomeIcon className={`${styles.icon}`} icon="search" />
              </button>
              }

              {width >= 620 && btnClicked &&
              <button
                ref={searchBtn}
                className={styles.searchBtn}
                onClick={btnTransition}
              >
                <FontAwesomeIcon className={`${styles.icon}`} icon="times" />
              </button>
              }

              {/* else load this button */}
              {width < 620 && <button
                ref={searchBtn}
                className={styles.searchBtn}
                onClick={btnTransitionSmall}
              >
                <FontAwesomeIcon className={`${styles.icon}`} icon="search" />
              </button>
              }

            </div>
          </li>
          <li className={styles.listItem}>
            <FontAwesomeIcon className={styles.icon} icon="bell" />
            
          </li>
          <li className={`${styles.listItem} ${styles.link}`}>
              <h5>Login/Register</h5>
          </li>
        </ul>}
        {searchClicked && 
          <ul className={styles.smallList}>
            <li className={styles.smallListItem}>
                <button
                  className={styles.searchBtn}
                  onClick={cancelSearch}
                >
                  <FontAwesomeIcon className={styles.backIcon} icon="long-arrow-alt-left" />
                </button>
            </li>
            <li className={[styles.smallListItem, styles.searchListItem].join(' ')}>
              <div className={styles.searchContainer}>
                <input  
                  ref={input} 
                  className={styles.searchInput} 
                  onChange={onSearchChange}
                  type="text"
                  placeholder="Search Movies..."
                />
                <div ref={queryReturns} className={styles.searchResults}>
                  {results}
                </div>
              </div>
            </li>
          </ul>
        }
      </nav>
    </div>
  );
};

export default Navbar;
