import React from "react";
import Home from "../containers/home/index";
import MoviePage from "../containers/moviePage/index";
import LoginPage from "./login/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faStar as EmptyStar } from "@fortawesome/free-regular-svg-icons";
import {
  faSearch,
  faBell,
  faStar,
  faStarHalfAlt,
  faUser,
  faPlay,
  faBookmark
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Navbar from "../components/navbars/navbar";
import Sidebar from "../components/navbars/sidebar";
import NowPlayingPage from "../containers/nowPlayingPage/index";
import CategoryPage from "../containers/categoryPage/index";

function App() {
  library.add(
    fab,
    faSearch,
    faBell,
    faStar,
    faStarHalfAlt,
    EmptyStar,
    faUser,
    faPlay,
    faBookmark
  );

  return (
    <Router>
      <Switch>
        <div className="App">
          <Navbar />
          <Sidebar />
          <div className="main-container">
            <Route path="/" component={Home} exact />
            <Route path="/movie/:id" component={MoviePage} exact />
            <Route path="/categories/:id" component={CategoryPage} />
            <Route
              path="/movies/now-watching"
              component={NowPlayingPage}
              exact
            />
            <Route path="/login" component={LoginPage} exact />
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
