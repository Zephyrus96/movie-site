import React,{useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import SmallSidebar from "./smallSidebar";
import styles from "./sidebar.module.css";
import { genres } from "../../resources/details";

const Sidebar = () => {

  const [showSmall , setShowSmall] = useState(false);

  const categories = genres.map(genre => (
    <li key={genre.id} className={`${styles.listItem} ${styles.genreClickableItem}`}>
      <NavLink
        to={`/categories/${genre.id}`}
        activeClassName={styles.isActive}
        exact
      >
        <h4>{genre.name}</h4>
      </NavLink>
    </li>
  ));

  const handleResize = () => {
    setShowSmall(window.innerWidth <= 865);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  },[]);

  return (
    <React.Fragment>
    {!showSmall &&
    <div className={styles.container}>
      <nav>
        <ul className={styles.sidebarList}>
          <li className={styles.listItem}>
            <h4 className={styles.listTitle}>Browse</h4>
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
          <li className={`${styles.listItem} ${styles.clickableItem} ${styles.disabledLink}`}>
            <h4>WATCH LATER</h4>
          </li>
        </ul>

        <ul className={styles.sidebarList}>
          <li className={styles.listItem}>
            <h4 className={styles.listTitle}>Categories</h4>
          </li>
          {categories}
        </ul>
      </nav>
    </div>}
    {showSmall && <SmallSidebar/>}
    </React.Fragment>
  );
};

export default Sidebar;
