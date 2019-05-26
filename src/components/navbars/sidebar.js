import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <nav>
        <ul className={styles.sidebarList}>
          <li className={styles.listItem}>
            <h4 className={styles.listTitle}>Browse</h4>
          </li>
          <li className={`${styles.listItem} ${styles.clickableItem}`}>
            <NavLink
              to="/discover/movie"
              activeClassName={styles.isActive}
              exact
            >
              <h4>DISCOVER</h4>
            </NavLink>
          </li>
          <li className={`${styles.listItem} ${styles.clickableItem}`}>
            <NavLink to="/" activeClassName={styles.isActive} exact>
              <h4>{"TV & MOVIES"}</h4>
            </NavLink>
          </li>
          <li className={`${styles.listItem} ${styles.clickableItem}`}>
            <NavLink
              to="/movies/now-watching"
              activeClassName={styles.isActive}
              exact
            >
              <h4>NOW WATCHING</h4>
            </NavLink>
          </li>
          <li className={`${styles.listItem} ${styles.clickableItem}`}>
            <NavLink
              to="/movies/watch-later"
              activeClassName={styles.isActive}
              exact
            >
              <h4>WATCH LATER</h4>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
