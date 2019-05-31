import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.listItem}>
            <div className={styles.searchBox}>
              <input type="text" placeholder="Search Movies..." />
              <a className={styles.searchBtn} href="#">
                <FontAwesomeIcon className={`${styles.icon}`} icon="search" />
              </a>
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
