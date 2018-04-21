import React from 'react';
import classes from './Welcome.css'

const Home = (props) => {

    return (
        <div className={classes.Welcome}>
            <div className={classes.Dim}>
                <h1>André Glegg</h1>
                <h2>Designer & Developer</h2>
                <button className={classes.Button}>View My Work</button>
            </div>
        </div>
    )
};


export default Home;



