import React from 'react'
import styles from "./backdrops.module.css";

export default function backdrop(props) {
    return (
        props.show ? <div className={styles.container} onClick={props.close}>
            
        </div>: null
    )
}
