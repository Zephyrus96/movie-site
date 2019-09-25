import React, {useRef, useState, useEffect, useContext} from 'react';
import { NavLink } from "react-router-dom";
import Backdrop from "../backdrop/backdrop";
import {SidebarContext} from "../../context/SidebarContext";
import { genres } from "../../resources/details";
import styles from './smallSidebar.module.css';

export default function SmallSidebar() {
    const sidebarContext = useContext(SidebarContext);
    const sidebarRef = useRef(null);
    const [showBackdrop, setShowBackdrop] = useState(false);

    const categories = genres.map(genre => (
        <li className={`${styles.listItem} ${styles.genreClickableItem}`}>
          <NavLink
            to={`/categories/${genre.id}`}
            activeClassName={styles.isActive}
            exact
          >
            <h4>{genre.name}</h4>
          </NavLink>
        </li>
      ));


    const handleSidebar = () => {
        if(sidebarContext.showSidebar){
          sidebarRef.current.style.display = "flex";
          setShowBackdrop(true);
        }
        else{
          sidebarRef.current.style.display = "none";
          setShowBackdrop(false);
        }
      }
    
      const closeSidebar = () => {
        sidebarContext.setShowSidebar(false);
      }
    
      useEffect(() => {
        handleSidebar();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[sidebarContext.showSidebar])
    
    return (
        <React.Fragment>
            <div ref={sidebarRef} className={styles.container}>
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
            </div>

        <Backdrop show={showBackdrop} close={closeSidebar} />
    </React.Fragment>
    )
}
