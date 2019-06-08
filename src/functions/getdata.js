import { API_KEY } from "../resources/api_key";

const baseMovieURL = "https://api.themoviedb.org/3/movie/";
const baseImageURL = "https://image.tmdb.org/t/p/";

export const getImageURL = (size, path) => {
  let url = baseImageURL + size + `/${path}`;
  return url;
};

export const getMovieURL = id => {
  let url = baseMovieURL + id + "?api_key=" + API_KEY + "&language=en-US";
  return url;
};

export const getCastURL = id => {
  let url = baseMovieURL + id + "/credits?api_key=" + API_KEY;
  return url;
};

export const getNowPlayingURL = () => {
  let url =
    baseMovieURL + "now_playing?api_key=" + API_KEY + "&language=en-US&page=1";
  return url;
};

export const getCategoryURL = id => {
  let url =
    "https://api.themoviedb.org/3/discover/movie?api_key=" +
    API_KEY +
    "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=" +
    id;
  return url;
};

export const getSearchResults = query => {
  let url =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_KEY +
    "&language=en-US&query=" +
    query +
    "&page=1&include_adult=false";
  return url;
};
