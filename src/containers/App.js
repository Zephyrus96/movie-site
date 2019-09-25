import React from "react";
import Home from "./home/index";
import MoviePage from "./moviePage/index";
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
  faBookmark,
  faLongArrowAltLeft,
  faTimes,
  faArrowLeft,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Navbar from "../components/navbars/navbar";
import Sidebar from "../components/navbars/sidebar";
import NowPlayingPage from "./nowPlayingPage/index";
import CategoryPage from "../components/category/index";
import { AuthProvider } from "../context/AuthContext";
import { MovieProvider } from "../context/MovieContext";
import {SidebarProvider} from "../context/SidebarContext";

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
    faBookmark,
    faLongArrowAltLeft,
    faTimes,
    faArrowLeft,
    faArrowRight
  );

  return (
    <Router>
      <Switch>
      <AuthProvider>
        <div className="App">
          <SidebarProvider>
            <Navbar />
            <Sidebar />
          </SidebarProvider>
          <div className="main-container">
            <MovieProvider>
              
                <Route path="/" component={Home} exact />
                <Route path="/movie/:id" component={MoviePage} exact />
                <Route path="/categories/:id" component={CategoryPage} />
                <Route
                  path="/movies/now-watching"
                  component={NowPlayingPage}
                  exact
                />       
                {/* <Route path="/login" component={LoginPage} exact /> */}
                {/* <Route component={NotFoundPage}/> */}
              
            </MovieProvider>
          </div>
        </div>
        </AuthProvider>
      </Switch>
    </Router>
  );
}

export default App;
