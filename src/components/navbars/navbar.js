import React from "react";
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
            <a href="#">
              <h5>Login</h5>
            </a>
            <p> &nbsp;|&nbsp; </p>
            <a href="#">
              <h5>Register</h5>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
