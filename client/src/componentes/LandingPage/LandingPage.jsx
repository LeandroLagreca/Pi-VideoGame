import React from 'react';
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css';



export default function LandingPage() {
    return (
        <>
        <div className={styles.container}>
            <div alt = 'Background' className={styles.img_background} /> 
            <Link to='/home' className={styles.link} >
                <div className={styles.buttonContainer} >
                    <button className={styles.btn}>Press Start</button>

                </div>
                </Link>
        </div>
        </>
    )
} 
