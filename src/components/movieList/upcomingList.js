/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { MovieContext } from "../../context/MovieContext";
import Slider from "react-slick";
import NextArrow from "../arrows/nextArrow";
import PrevArrow from "../arrows/prevArrow";
import axios from "axios";
import "./slick.css";
import Movie from "../movie/movie";
import LoadingIcon from "../../resources/LoadingIcon";

const UpcomingList = () => {
  //Context
  const contextValue = useContext(MovieContext);

  //Movie functions
  let baseURL = "https://api.themoviedb.org/3/movie/";
  const API_KEY = "9bf75e1c2ed3037bbb2ef7b6910103fe";

  const getUpcomingMovies = async () => {
    let url =
      baseURL + "upcoming?api_key=" + API_KEY + "&language=en-US&page=1";
    let res = await axios.get(url);
    let data = await res.data;
    contextValue.setUpcomingMovies(data.results);
  };

  //LifeCycle
  useEffect(() => {
    getUpcomingMovies();
    contextValue.setUpcomingLoading(false);
  }, []);

  //Slider Settings
  var settings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8.2,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1735,
        settings: {
          slidesToShow: 7.2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 6.2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 5.2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1235,
        settings: {
          slidesToShow: 4.2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3.2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 865,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },

      {
        breakpoint: 715,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 625,
        settings: {
          slidesToShow: 3.2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 2.3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (contextValue.upcomingLoading === false) {
    const upcomingList = contextValue.upcomingMovies.map(movie => (
      <Movie
        id={movie.id}
        image={movie.poster_path}
        title={movie.title}
        genreIDs={movie.genre_ids}
        releaseDate={movie.release_date}
        rating={movie.vote_average}
        key={movie.id}
      />
    ));

    return <Slider {...settings}>{upcomingList}</Slider>;
  }

  return <LoadingIcon />
};

export default UpcomingList;
